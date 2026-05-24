import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import UnitDifferentials from '@/components/UnitDifferentials'
import Pricing from '@/components/Pricing'
import WhatToBring from '@/components/WhatToBring'
import GaleriaFotos from '@/components/GaleriaFotos'
import WhySection from '@/components/WhySection'
import Testimonials from '@/components/Testimonials'
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
      <UnitDifferentials />
      <Pricing />
      <WhatToBring />
      <GaleriaFotos />
      <WhySection />
      <Testimonials />
      <ClubHighlight />
      <PartnersTeaser />
      <LocationBlock />
      <FAQ />
      <CTABanner />
    </>
  )
}
