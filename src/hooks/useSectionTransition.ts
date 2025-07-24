import { useState, useEffect, useRef, useCallback } from 'react'

export const useSectionTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [heroClass, setHeroClass] = useState('hero-visible')
  const [missionClass, setMissionClass] = useState('mission-hidden')
  const [hasTriggered, setHasTriggered] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const scrollDirection = useRef<'up' | 'down'>('down')
  const lastScrollY = useRef(0)

  // Fonction pour déclencher la transition
  const triggerTransition = useCallback(() => {
    if (isTransitioning || hasTriggered) return
    
    setIsTransitioning(true)
    setHasTriggered(true)
    
    // Animation de la Hero qui glisse vers le haut
    setHeroClass('hero-slide-up')
    
    // La Mission reste statique et se révèle naturellement
    setMissionClass('mission-visible')
    
    // Réinitialiser après l'animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1200)
  }, [isTransitioning, hasTriggered])

  // Gestion du scroll avec wheel event
  const handleWheel = useCallback((e: WheelEvent) => {
    if (hasTriggered || isTransitioning) return
    
    const currentScrollY = window.scrollY
    const heroHeight = window.innerHeight
    
    // Vérifier si on est dans la zone de la Hero
    if (currentScrollY < heroHeight) {
      scrollDirection.current = e.deltaY > 0 ? 'down' : 'up'
      
      // Déclencher la transition au premier scroll vers le bas
      if (scrollDirection.current === 'down' && currentScrollY > 50) {
        e.preventDefault()
        triggerTransition()
      }
    }
  }, [hasTriggered, isTransitioning, triggerTransition])

  // Gestion du scroll avec touch pour mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (hasTriggered || isTransitioning) return
    lastScrollY.current = e.touches[0].clientY
  }, [hasTriggered, isTransitioning])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (hasTriggered || isTransitioning) return
    
    const currentScrollY = window.scrollY
    const heroHeight = window.innerHeight
    
    if (currentScrollY < heroHeight) {
      const currentY = e.touches[0].clientY
      const deltaY = lastScrollY.current - currentY
      
      if (deltaY > 10 && currentScrollY > 50) { // Scroll vers le bas
        e.preventDefault()
        triggerTransition()
      }
    }
  }, [hasTriggered, isTransitioning, triggerTransition])

  // Intersection Observer pour détecter quand la Hero devient visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            // Reset quand la Hero redevient visible
            setHasTriggered(false)
            setHeroClass('hero-visible')
            setMissionClass('mission-hidden')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px'
      }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [hasTriggered])

  // Event listeners
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove])

  // Fonction manuelle pour déclencher la transition
  const startTransition = useCallback(() => {
    triggerTransition()
  }, [triggerTransition])

  return {
    isTransitioning,
    heroClass,
    missionClass,
    startTransition,
    heroRef,
    missionRef
  }
} 