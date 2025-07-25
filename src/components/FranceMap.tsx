"use client"

import React, { useState, useRef, useEffect } from 'react'

interface TooltipData {
  x: number
  y: number
  name: string
  visible: boolean
  position: 'top' | 'bottom'
}

const FranceMap: React.FC = () => {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipData>({ x: 0, y: 0, name: '', visible: false, position: 'top' })
  const [showInstructions, setShowInstructions] = useState(true)
  const svgRef = useRef<HTMLDivElement>(null)

  // Fonction pour calculer la position du tooltip
  const calculateTooltipPosition = (mouseX: number, mouseY: number) => {
    const containerRect = svgRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: 0, y: 0, position: 'top' as const }

    // Dimensions du tooltip
    const tooltipWidth = 200
    const tooltipHeight = 60
    const offset = 15

    // Position initiale du tooltip (à droite de la souris)
    let tooltipX = mouseX + offset
    let tooltipY = mouseY - tooltipHeight / 2
    let tooltipPosition: 'top' | 'bottom' = 'top'

    // Vérifier si le tooltip dépasse à droite
    if (tooltipX + tooltipWidth > window.innerWidth - 10) {
      tooltipX = mouseX - tooltipWidth - offset
    }

    // Vérifier si le tooltip dépasse à gauche
    if (tooltipX < 10) {
      tooltipX = 10
    }

    // Vérifier si le tooltip dépasse en haut
    if (tooltipY < 10) {
      tooltipY = mouseY + offset
      tooltipPosition = 'bottom'
    }

    // Vérifier si le tooltip dépasse en bas
    if (tooltipY + tooltipHeight > window.innerHeight - 10) {
      tooltipY = window.innerHeight - tooltipHeight - 10
    }

    return { x: tooltipX, y: tooltipY, position: tooltipPosition }
  }

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
              path.style.transition = 'fill 0.3s ease, stroke 0.3s ease'
              path.style.fill = '#0C91DF' // Bleu de base
              path.style.stroke = '#0A7BC7'
              path.style.strokeWidth = '1'
              path.style.vectorEffect = 'non-scaling-stroke'

              // Événements avec debouncing pour le tooltip
              let tooltipTimeout: NodeJS.Timeout

              path.addEventListener('mouseenter', (e) => {
                clearTimeout(tooltipTimeout)
                tooltipTimeout = setTimeout(() => {
                  const tooltipPos = calculateTooltipPosition(e.clientX, e.clientY)
                  
                  setTooltip({
                    x: tooltipPos.x,
                    y: tooltipPos.y,
                    name: deptName,
                    visible: true,
                    position: tooltipPos.position as 'top' | 'bottom'
                  })
                  setHoveredDept(deptName)
                  path.style.fill = '#ffffff' // Blanc au hover
                  path.style.stroke = '#0C91DF'
                }, 50)
              })

              path.addEventListener('mouseleave', () => {
                clearTimeout(tooltipTimeout)
                setTooltip(prev => ({ ...prev, visible: false }))
                setHoveredDept(null)
                if (deptName !== selectedDept) {
                  path.style.fill = '#0C91DF' // Retour au bleu de base
                  path.style.stroke = '#0A7BC7'
                }
              })

              // Ajouter un événement mousemove pour suivre la souris
              path.addEventListener('mousemove', (e) => {
                if (hoveredDept === deptName) {
                  const tooltipPos = calculateTooltipPosition(e.clientX, e.clientY)
                  
                  setTooltip(prev => ({
                    ...prev,
                    x: tooltipPos.x,
                    y: tooltipPos.y,
                    position: tooltipPos.position as 'top' | 'bottom'
                  }))
                }
              })

              path.addEventListener('click', () => {
                setSelectedDept(deptName)
                console.log(`Département sélectionné: ${deptName}`)
                
                // Mettre à jour la couleur de tous les départements
                paths.forEach(p => {
                  const name = p.getAttribute('title')
                  if (name === deptName) {
                    p.style.fill = '#0A7BC7' // Bleu foncé pour sélectionné
                    p.style.stroke = '#085A8F'
                  } else {
                    p.style.fill = '#0C91DF' // Bleu de base pour les autres
                    p.style.stroke = '#0A7BC7'
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

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div 
        ref={svgRef}
        className="w-full h-full"
      />
      
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-xl pointer-events-none border border-gray-700"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            whiteSpace: 'nowrap',
            maxWidth: '200px',
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'none'
          }}
        >
          <div className="font-medium text-center">{tooltip.name}</div>
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



      {/* Instructions */}
      {showInstructions && (
        <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-lg shadow-lg border border-gray-200/50 max-w-[calc(100%-1rem)] md:max-w-xs z-10">
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
            🖱️ Cliquez pour sélectionner un département
          </p>
        </div>
      )}
    </div>
  )
}

export default FranceMap 