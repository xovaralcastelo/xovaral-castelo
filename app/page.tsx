import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import WhatToBring from "@/components/WhatToBring";
import WhySection from "@/components/WhySection";
import UnitDifferentials from "@/components/UnitDifferentials";
import GaleriaFotos from "@/components/GaleriaFotos";
import Testimonials from "@/components/Testimonials";
import ClubHighlight from "@/components/ClubHighlight";
import PartnersCarousel from "@/components/PartnersCarousel";
import PartnersTeaser from "@/components/PartnersTeaser";
import LocationBlock from "@/components/LocationBlock";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Pricing />
      <WhatToBring />
      <WhySection />
      <UnitDifferentials />
      <GaleriaFotos />
      <Testimonials />
      <ClubHighlight />
      <PartnersCarousel />
      <PartnersTeaser />
      <LocationBlock />
      <FAQ limit={9} />
      <CTABanner />
    </>
  );
}
