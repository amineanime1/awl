import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useScrollPosition() {
  const [isOnLightSection, setIsOnLightSection] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const pathname = usePathname()
  
  // Pages qui doivent être en mode light direct
  const lightPages = ['/services', '/not-found']
  const isLightPage = lightPages.includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Si on est sur une page light, forcer le mode light
      if (isLightPage) {
        setIsOnLightSection(true)
        setTransitionProgress(1)
        return
      }
      
      // Calculer la progression de la transition (0 à 1)
      const maxScroll = 300 // Hauteur de la section hero
      const progress = Math.min(currentScrollY / maxScroll, 1)
      setTransitionProgress(progress)
      
      // Déterminer si on est sur une section claire
      setIsOnLightSection(progress > 0.5)
    }

    // Initialiser avec la position actuelle
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLightPage])

  return { isOnLightSection, scrollY, transitionProgress, isInvertedPage: isLightPage }
} 