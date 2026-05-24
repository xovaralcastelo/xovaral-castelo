import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import WhySection from '@/components/WhySection'
import UnitDifferentials from '@/components/UnitDifferentials'
import ClubHighlight from '@/components/ClubHighlight'
import PartnersTeaser from '@/components/PartnersTeaser'
import LocationBlock from '@/components/LocationBlock'
import FAQ from '@/components/FAQ'
import CTABanner from '@/components/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhySection />
      <UnitDifferentials />
      <ClubHighlight />
      <PartnersTeaser />
      <LocationBlock />
      <FAQ limit={9} />
      <CTABanner />
    </>
  )
}
