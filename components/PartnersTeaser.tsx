import Link from "next/link";
import { ArrowRight, Handshake, Store, GraduationCap, Dumbbell, Building, Utensils } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Mascot } from "@/components/brand/Mascot";

const PARTNER_TYPES = [
  { icon: Dumbbell, label: "Academias" },
  { icon: GraduationCap, label: "Faculdades" },
  { icon: Building, label: "Condomínios" },
  { icon: Utensils, label: "Restaurantes" },
  { icon: Store, label: "Comércio local" },
];

export default function PartnersTeaser() {
  return (
    <section id="parceiros" className="relative bg-xv-gray-50 py-20 sm:py-28">
      <Container size="lg">
        <div className="grid items-center gap-10 rounded-[2rem] bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-[1fr_1.2fr] lg:p-16">
          <div className="order-2 flex justify-center lg:order-1">
            <Mascot name="meia" size="xl" />
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-xv-cyan-bg px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-xv-cyan">
              <Handshake size={14} />
              Para parceiros locais
            </div>
            <h2 className="mt-5 text-4xl font-black leading-tight text-xv-navy sm:text-5xl">
              Conecte seu negócio aos moradores do Castelo.
            </h2>
            <p className="mt-4 text-xv-gray-700">
              Academias, faculdades, condomínios, restaurantes e comércio local:
              ofereça benefícios aos seus clientes e ganhe visibilidade entre
              centenas de moradores que frequentam a Xô Varal toda semana.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {PARTNER_TYPES.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-xv-gray-50 px-3 py-1.5 text-xs font-bold text-xv-navy"
                >
                  <p.icon size={14} className="text-xv-cyan" />
                  {p.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/parceiros/cadastro"
                className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-xv-navy-light"
              >
                Quero ser parceiro
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/parceiros/entrar"
                className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/15 bg-white px-6 py-3 text-sm font-bold text-xv-navy hover:border-xv-navy/40"
              >
                Acessar painel
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
