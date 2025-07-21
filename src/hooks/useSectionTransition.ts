import { useState, useEffect } from 'react'

export const useSectionTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [heroClass, setHeroClass] = useState('hero-slide-down')
  const [missionClass, setMissionClass] = useState('mission-slide-out')

  const triggerTransition = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    // Déclencher la transition avec les nouvelles animations
    setHeroClass('hero-slide-up')
    setMissionClass('mission-slide-in')
    
    // Faire défiler automatiquement vers la section Mission après un délai
    setTimeout(() => {
      const missionSection = document.querySelector('[data-section="mission"]')
      if (missionSection) {
        missionSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 600)
    
    // Réinitialiser après l'animation complète
    setTimeout(() => {
      setHeroClass('hero-slide-down')
      setMissionClass('mission-slide-out')
      setIsTransitioning(false)
    }, 1200)
  }

  const startTransition = () => {
    if (!isTransitioning) {
      triggerTransition()
    }
  }

  return {
    isTransitioning,
    heroClass,
    missionClass,
    startTransition
  }
} 