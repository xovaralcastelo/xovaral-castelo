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
import { getContentMap } from "@/lib/content";
import { getActiveTestimonials, getActivePartners } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [c, testimonials, partners] = await Promise.all([
    getContentMap(),
    getActiveTestimonials(),
    getActivePartners(),
  ]);

  return (
    <>
      <Hero content={c} />
      <HowItWorks />
      <Pricing />
      <WhatToBring />
      <WhySection />
      <UnitDifferentials content={c} />
      <GaleriaFotos />
      <Testimonials items={testimonials} content={c} />
      <ClubHighlight content={c} />
      <PartnersCarousel partners={partners} />
      <PartnersTeaser />
      <LocationBlock content={c} />
      <FAQ limit={9} />
      <CTABanner />
    </>
  );
}
