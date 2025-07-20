import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import CommitmentsSection from '@/components/CommitmentsSection'
import CoverageAreaSection from '@/components/CoverageAreaSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ServicesSection />
      <CommitmentsSection />
      <CoverageAreaSection />
    </main>
  )
} 