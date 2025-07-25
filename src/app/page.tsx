'use client'

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
import { defaultPageData } from '@/lib/default-data'

// Types pour les données
interface MissionData {
  quote_text: string
  image_url: string
  image_alt: string
}

interface ServiceData {
  id: number
  title: string
  description: string
  icon_name: string
  color_class: string
  display_order: number
  is_active: boolean
}

interface FleetVehicleData {
  id: number
  name: string
  description: string
  image_url: string
  image_alt: string
  display_order: number
  is_active: boolean
}

interface EnvironmentalCommitmentData {
  id: number
  title: string
  description: string
  details: string
  emoji: string
  image_alt: string
  display_order: number
  is_active: boolean
}

interface FaqItemData {
  id: number
  question: string
  answer: string
  display_order: number
  is_active: boolean
}

// Props pour la page
interface HomePageProps {
  missionData: MissionData
  servicesData: ServiceData[]
  fleetData: FleetVehicleData[]
  environmentalData: EnvironmentalCommitmentData[]
  faqData: FaqItemData[]
}

// Revalidation ISR toutes les 5 minutes (300 secondes)
export const revalidate = 300

// Server Component async pour récupérer les données
async function getPageData(): Promise<HomePageProps> {
  try {
    // Utiliser l'API route côté serveur
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/page-data`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Erreur API')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
    
    // Retourner les données par défaut en cas d'erreur
    return defaultPageData
  }
}

// Client Component pour la logique interactive
function HomeClient({ 
  missionData, 
  servicesData, 
  fleetData, 
  environmentalData, 
  faqData 
}: HomePageProps) {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Section Hero */}
      <HeroSection />
      
      {/* Section Mission */}
      <MissionSection 
        quoteText={missionData.quote_text}
        imageUrl={missionData.image_url}
        imageAlt={missionData.image_alt}
      />
      
      {/* Sections suivantes */}
      <ServicesSection services={servicesData} />
      <FleetSection vehicles={fleetData} />
      <CommitmentsTowardsEnvironmentSection commitments={environmentalData} />
      <TransportAvailabilitySection /> 
      <CTASection />
      <Faq items={faqData} />
    </main>
  )
}

// Server Component principal
export default async function Home() {
  // Récupération des données côté serveur (SEO-friendly)
  const pageData = await getPageData()
  
  return <HomeClient {...pageData} />
} 