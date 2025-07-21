import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [isOnLightSection, setIsOnLightSection] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Calculer la progression de la transition
      const heroHeight = window.innerHeight
      const transitionStart = heroHeight * 0.6 // Commencer la transition à 60% de la hauteur du hero
      const transitionEnd = heroHeight * 0.9   // Finir la transition à 90% de la hauteur du hero
      
      let progress = 0
      if (currentScrollY >= transitionStart) {
        progress = Math.min((currentScrollY - transitionStart) / (transitionEnd - transitionStart), 1)
      }
      
      setTransitionProgress(progress)
      setIsOnLightSection(progress > 0.5) // Basculer à 50% de la transition
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Appel initial

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { isOnLightSection, scrollY, transitionProgress }
} 