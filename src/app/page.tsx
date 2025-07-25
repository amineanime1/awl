'use client'

import { useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import CommitmentsSection from '@/components/CommitmentsSection'
import CommitmentsTowardsEnvironmentSection from '@/components/CommitmentsTowardsEnvironmentSection'
import TransportAvailabilitySection from '@/components/TransportAvailabilitySection'
import CTASection from '@/components/CTASection'
import Faq from '@/components/faq'
import CoverageAreaSection from '@/components/CoverageAreaSection'
import MissionSection from '@/components/MissionSection'
import FleetSection from '@/components/FleetSection'
import { useSectionTransition } from '@/hooks/useSectionTransition'

export default function Home() {
  const { 
    isTransitioning, 
    heroClass, 
    missionClass, 
    startTransition, 
    heroRef, 
    missionRef 
  } = useSectionTransition()

  // Empêcher le scroll pendant la transition
  useEffect(() => {
    if (isTransitioning) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isTransitioning])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Container Hero avec animation */}
      {/* <div 
        ref={heroRef}
        className={`hero-container ${heroClass} will-change-transform`}
      > */}
        <HeroSection />
      {/* </div> */}
      
      {/* Container Mission avec révélation */}
      {/* <div 
        ref={missionRef}
        className={`mission-container ${missionClass} will-change-opacity`}
      > */}
        <MissionSection />
      {/* </div> */}
      
      {/* Sections suivantes */}
      <ServicesSection />
      <FleetSection />
  
      <CommitmentsTowardsEnvironmentSection />
      <TransportAvailabilitySection /> 
      <CTASection />
      <Faq />
    </main>
  )
} 