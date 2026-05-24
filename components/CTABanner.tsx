import { MessageCircle, Navigation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Mascot } from "@/components/brand/Mascot";
import { whatsappUrl, googleMapsRouteUrl, UNIT } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-xv-navy py-20 text-white sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(at 80% 50%, rgba(238,117,49,0.3) 0px, transparent 50%), radial-gradient(at 20% 50%, rgba(1,179,220,0.2) 0px, transparent 50%)",
        }}
      />

      <Container size="md" className="relative text-center">
        <div className="flex justify-center">
          <Mascot name="globinho" size="lg" />
        </div>
        <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
          Quer testar a Xô Varal <br />
          <span className="text-xv-orange">no próximo sábado</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
          Manda uma mensagem que a gente te orienta passo a passo. Ou vem direto —
          estamos abertos {UNIT.hours.summary.toLowerCase()}.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl("home")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-green-700/30 hover:brightness-110"
          >
            <MessageCircle size={18} />
            Chamar no WhatsApp
          </a>
          <a
            href={googleMapsRouteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-xv-navy shadow-lg hover:bg-xv-gray-50"
          >
            <Navigation size={18} />
            Como chegar
          </a>
        </div>
      </Container>
    </section>
  );
}
