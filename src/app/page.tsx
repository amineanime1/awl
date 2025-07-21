'use client'

import { useEffect, useState } from 'react'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import CommitmentsSection from '@/components/CommitmentsSection'
import CommitmentsTowardsEnvironmentSection from '@/components/CommitmentsTowardsEnvironmentSection'
import CoverageAreaSection from '@/components/CoverageAreaSection'
import MissionSection from '@/components/MissionSection'
import { useSectionTransition } from '@/hooks/useSectionTransition'

export default function Home() {
  const { isTransitioning, heroClass, missionClass, startTransition } = useSectionTransition()
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const heroHeight = window.innerHeight
      
      // Déclencher la transition quand on scrolle au-delà de 50% de la hauteur du hero
      if (scrollPosition > heroHeight * 0.5 && !hasScrolled) {
        setHasScrolled(true)
        startTransition()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled, startTransition])

  return (
    <main className="flex min-h-screen flex-col">
      <div className={`section-overlap ${heroClass} section-transition`}>
        <HeroSection onTransitionTrigger={startTransition} />
      </div>
      <div className={`section-under ${missionClass} section-transition`}>
        <MissionSection />
      </div>
      <ServicesSection />
      <CommitmentsSection />
      <CommitmentsTowardsEnvironmentSection />
      <CoverageAreaSection />
    </main>
  )
} 