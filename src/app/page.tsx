import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import CommitmentsSection from '@/components/CommitmentsSection'
import CommitmentsTowardsEnvironmentSection from '@/components/CommitmentsTowardsEnvironmentSection'
import TransportAvailabilitySection from '@/components/TransportAvailabilitySection'
import CTASection from '@/components/CTASection'
import Faq from '@/components/faq'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ServicesSection />
      <CommitmentsSection />
      <CommitmentsTowardsEnvironmentSection />
      <TransportAvailabilitySection />
      <CTASection />
      <Faq />
    </main>
  )
} 