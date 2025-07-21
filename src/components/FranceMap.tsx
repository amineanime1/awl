"use client"

import React, { useState, useRef, useEffect } from 'react'

interface TooltipData {
  x: number
  y: number
  name: string
  visible: boolean
}

const FranceMap: React.FC = () => {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipData>({ x: 0, y: 0, name: '', visible: false })
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showInstructions, setShowInstructions] = useState(true)
  const svgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Charger le SVG et le rendre interactif
    const loadSvg = async () => {
      try {
        const response = await fetch('/svg/france-departments.svg')
        const svgText = await response.text()
        
        if (svgRef.current) {
          svgRef.current.innerHTML = svgText
          
          // Rendre tous les paths interactifs
          const paths = svgRef.current.querySelectorAll('path')
          paths.forEach((path) => {
            const deptName = path.getAttribute('title')
            if (deptName) {
              // Style initial
              path.style.cursor = 'pointer'
              path.style.transition = 'fill 0.2s ease, stroke 0.2s ease'
              path.style.fill = '#f3f4f6' // Gris plus clair par défaut
              path.style.stroke = '#d1d5db'
              path.style.strokeWidth = '0.8'
              path.style.vectorEffect = 'non-scaling-stroke'

              // Événements avec debouncing pour le tooltip
              let tooltipTimeout: NodeJS.Timeout

              path.addEventListener('mouseenter', (e) => {
                clearTimeout(tooltipTimeout)
                tooltipTimeout = setTimeout(() => {
                  const rect = path.getBoundingClientRect()
                  const containerRect = svgRef.current?.getBoundingClientRect()
                  
                  if (containerRect) {
                    // Calculer la position relative au conteneur
                    const relativeX = rect.left - containerRect.left + rect.width / 2
                    const relativeY = rect.top - containerRect.top - 10 // Plus proche du département
                    
                    setTooltip({
                      x: relativeX,
                      y: relativeY,
                      name: deptName,
                      visible: true
                    })
                  }
                  setHoveredDept(deptName)
                  path.style.fill = '#3b82f6' // Bleu au hover
                  path.style.stroke = '#1d4ed8'
                }, 50) // Réduit le délai pour plus de réactivité
              })

              path.addEventListener('mouseleave', () => {
                clearTimeout(tooltipTimeout)
                setTooltip(prev => ({ ...prev, visible: false }))
                setHoveredDept(null)
                if (deptName !== selectedDept) {
                  path.style.fill = '#f3f4f6' // Retour au gris
                  path.style.stroke = '#d1d5db'
                }
              })

              // Ajouter un événement mousemove pour suivre la souris
              path.addEventListener('mousemove', (e) => {
                if (hoveredDept === deptName) {
                  const rect = path.getBoundingClientRect()
                  const containerRect = svgRef.current?.getBoundingClientRect()
                  
                  if (containerRect) {
                    const relativeX = e.clientX - containerRect.left
                    const relativeY = e.clientY - containerRect.top - 10
                    
                    setTooltip(prev => ({
                      ...prev,
                      x: relativeX,
                      y: relativeY
                    }))
                  }
                }
              })

              path.addEventListener('click', () => {
                setSelectedDept(deptName)
                console.log(`Département sélectionné: ${deptName}`)
                
                // Mettre à jour la couleur de tous les départements
                paths.forEach(p => {
                  const name = p.getAttribute('title')
                  if (name === deptName) {
                    p.style.fill = '#1d4ed8' // Bleu foncé pour sélectionné
                    p.style.stroke = '#1e40af'
                  } else {
                    p.style.fill = '#f3f4f6' // Gris pour les autres
                    p.style.stroke = '#d1d5db'
                  }
                })
              })
            }
          })
          
          // Ajuster la taille du SVG pour qu'il s'adapte au conteneur
          const svgElement = svgRef.current.querySelector('svg')
          if (svgElement) {
            svgElement.style.width = '100%'
            svgElement.style.height = '100%'
            svgElement.style.maxWidth = '100%'
            svgElement.style.maxHeight = '100%'
            svgElement.style.overflow = 'visible'
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du SVG:', error)
      }
    }

    loadSvg()
    
    // Cleanup function
    return () => {
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path')
        paths.forEach((path) => {
          path.removeEventListener('mouseenter', () => {})
          path.removeEventListener('mouseleave', () => {})
          path.removeEventListener('mousemove', () => {})
          path.removeEventListener('click', () => {})
        })
      }
    }
  }, [selectedDept])

  // Gestion du zoom avec la molette
  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    
    // Calculer le point de zoom (centre de la souris)
    const rect = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    
    // Calculer la nouvelle échelle avec un zoom plus sensible
    const zoomFactor = event.deltaY > 0 ? 0.85 : 1.15
    const newScale = Math.max(0.3, Math.min(4, scale * zoomFactor))
    
    // Calculer la nouvelle position pour zoomer vers la souris
    const scaleChange = newScale / scale
    const newX = mouseX - (mouseX - position.x) * scaleChange
    const newY = mouseY - (mouseY - position.y) * scaleChange
    
    setScale(newScale)
    setPosition({ x: newX, y: newY })
  }

  // Gestion du drag
  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === 0) { // Clic gauche seulement
      setIsDragging(true)
      setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y })
      ;(event.currentTarget as HTMLElement).style.cursor = 'grabbing'
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const newX = event.clientX - dragStart.x
      const newY = event.clientY - dragStart.y
      
      // Limiter la position pour éviter l'overflow excessif
      const containerRect = event.currentTarget.getBoundingClientRect()
      const maxOffsetX = Math.max(0, (scale - 1) * containerRect.width / 2)
      const maxOffsetY = Math.max(0, (scale - 1) * containerRect.height / 2)
      
      setPosition({
        x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newX)),
        y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newY))
      })
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      if (svgRef.current) {
        svgRef.current.style.cursor = 'grab'
      }
    }
  }

  // Gestion du drag global
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const newX = event.clientX - dragStart.x
        const newY = event.clientY - dragStart.y
        
        // Limiter la position pour éviter l'overflow excessif
        const containerRect = svgRef.current?.getBoundingClientRect()
        if (containerRect) {
          const maxOffsetX = Math.max(0, (scale - 1) * containerRect.width / 2)
          const maxOffsetY = Math.max(0, (scale - 1) * containerRect.height / 2)
          
          setPosition({
            x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newX)),
            y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newY))
          })
        }
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        if (svgRef.current) {
          svgRef.current.style.cursor = 'grab'
        }
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStart, scale])

  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <div 
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center',
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-20 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-xl pointer-events-none border border-gray-700"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%) translateY(-100%)',
            whiteSpace: 'nowrap',
            maxWidth: '200px'
          }}
        >
          <div className="font-medium text-center">{tooltip.name}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {/* Info panel */}
      {selectedDept && (
        <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white p-3 md:p-4 rounded-lg shadow-lg border max-w-[calc(100%-1rem)] md:max-w-xs z-10">
          <h3 className="font-semibold text-xs md:text-sm text-gray-800 mb-1 md:mb-2">
            Département sélectionné
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-2">{selectedDept}</p>
          <button
            onClick={() => {
              setSelectedDept(null)
              // Remettre tous les départements en gris
              const paths = svgRef.current?.querySelectorAll('path')
              paths?.forEach(path => {
                path.style.fill = '#f3f4f6'
                path.style.stroke = '#d1d5db'
              })
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col space-y-1 md:space-y-2">
        <button
          onClick={() => {
            const newScale = Math.min(4, scale + 0.25)
            setScale(newScale)
            // Ajuster la position pour éviter l'overflow
            const maxOffset = (newScale - 1) * 100
            setPosition(prev => ({
              x: Math.max(-maxOffset, Math.min(maxOffset, prev.x)),
              y: Math.max(-maxOffset, Math.min(maxOffset, prev.y))
            }))
          }}
          className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-md md:rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 text-xs md:text-sm font-bold"
        >
          +
        </button>
        <button
          onClick={() => {
            const newScale = Math.max(0.3, scale - 0.25)
            setScale(newScale)
            // Ajuster la position pour éviter l'overflow
            const maxOffset = (newScale - 1) * 100
            setPosition(prev => ({
              x: Math.max(-maxOffset, Math.min(maxOffset, prev.x)),
              y: Math.max(-maxOffset, Math.min(maxOffset, prev.y))
            }))
          }}
          className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-md md:rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 text-xs md:text-sm font-bold"
        >
          −
        </button>
        <button
          onClick={() => { 
            setScale(1); 
            setPosition({ x: 0, y: 0 });
            setSelectedDept(null);
            // Remettre tous les départements en gris
            const paths = svgRef.current?.querySelectorAll('path')
            paths?.forEach(path => {
              path.style.fill = '#f3f4f6'
              path.style.stroke = '#d1d5db'
            })
          }}
          className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-md md:rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 text-xs"
          title="Réinitialiser la vue"
        >
          ⌂
        </button>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-white p-2 md:p-3 rounded-lg shadow-lg border max-w-[calc(100%-1rem)] md:max-w-xs z-10">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <h4 className="font-semibold text-gray-800 text-xs md:text-sm">
              Carte interactive
            </h4>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-gray-400 hover:text-gray-600 text-xs ml-2 font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-1">
            🖱️ Survolez et cliquez sur les départements
          </p>
          <p className="text-xs text-gray-500">
            🔍 Molette pour zoomer • 🖱️ Glisser pour déplacer
          </p>
        </div>
      )}
    </div>
  )
}

export default FranceMap 