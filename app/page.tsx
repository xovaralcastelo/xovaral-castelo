import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import WhySection from '@/components/WhySection'
import Amenities from '@/components/Amenities'
import Pricing from '@/components/Pricing'
import ClubHighlight from '@/components/ClubHighlight'
import Testimonials from '@/components/Testimonials'
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
      <Amenities />
      <Pricing />
      <ClubHighlight />
      <Testimonials />
      <PartnersTeaser />
      <LocationBlock />
      <FAQ />
      <CTABanner />
    </>
  )
}
