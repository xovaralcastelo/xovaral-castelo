import { MapPin, Clock, MessageCircle, Phone, Navigation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { UNIT, whatsappUrl, googleMapsRouteUrl } from "@/lib/constants";

export default function LocationBlock() {
  const embedSrc = UNIT.address.googleMapsEmbed;

  return (
    <section id="localizacao" className="relative bg-white py-20 sm:py-28">
      <Container size="lg">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-xv-gray-200 shadow-md">
            <iframe
              src={embedSrc}
              className="aspect-square w-full sm:aspect-video lg:aspect-auto lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa — ${UNIT.name}`}
              allowFullScreen
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">
              Visite a unidade
            </span>
            <h2 className="mt-3 text-4xl font-black leading-tight text-xv-navy sm:text-5xl">
              Estamos pertinho de você.
            </h2>
            <p className="mt-4 text-xv-gray-700">
              No Comercial JL Mall, no coração do Castelo. Vaga exclusiva de estacionamento na porta —
              você nem precisa procurar onde estacionar.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl bg-xv-gray-50 p-6">
              <InfoLine
                icon={MapPin}
                label="Endereço"
                value={`${UNIT.address.street} — ${UNIT.address.neighborhood}, ${UNIT.address.city}/${UNIT.address.state}`}
              />
              <InfoLine icon={Clock} label="Funcionamento" value={UNIT.hours.summary} />
              <InfoLine
                icon={Phone}
                label="Atendimento"
                value={UNIT.contact.whatsappDisplay}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={googleMapsRouteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light"
              >
                <Navigation size={16} />
                Traçar rota
              </a>
              <a
                href={whatsappUrl("localizacao")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md hover:brightness-110"
              >
                <MessageCircle size={16} />
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InfoLine({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="mt-0.5 flex-shrink-0 text-xv-cyan" />
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-xv-gray-500">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-bold text-xv-navy">{value}</div>
      </div>
    </div>
  );
}
