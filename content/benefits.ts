export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export const SELF_SERVICE_BENEFITS: Benefit[] = [
  {
    title: "Economia de tempo",
    description: "45 minutos contra 3h em casa toda semana.",
    icon: "Clock",
  },
  {
    title: "Máquinas profissionais",
    description: "SpeedQueen — o padrão de hotéis e hospitais.",
    icon: "Award",
  },
  {
    title: "Secagem rápida",
    description: "Roupa 100% seca em 45 minutos — sem varal.",
    icon: "Wind",
  },
  {
    title: "Ideal para apartamentos",
    description: "Sem área de serviço? Sem problema.",
    icon: "Building2",
  },
  {
    title: "Praticidade para famílias",
    description: "Volume grande resolvido de uma vez.",
    icon: "Users",
  },
  {
    title: "Solução para dias chuvosos",
    description: "Não depende de sol nem varanda livre.",
    icon: "CloudRain",
  },
  {
    title: "Menos trabalho doméstico",
    description: "Recupere seu fim de semana.",
    icon: "Heart",
  },
  {
    title: "Mais qualidade na lavagem",
    description: "Resultado profissional que dura mais.",
    icon: "Sparkles",
  },
];

export const UNIT_DIFFERENTIALS = [
  { label: "Bistrô com Wi-Fi gratuito", icon: "Wifi" },
  { label: "Área kids", icon: "Baby" },
  { label: "Ar-condicionado", icon: "Wind" },
  { label: "TV", icon: "Tv" },
  { label: "Vaga exclusiva na porta", icon: "Car" },
  { label: "Mesa de dobra ampla", icon: "LayoutGrid" },
  { label: "Cabides disponíveis", icon: "Shirt" },
  { label: "Ambiente moderno e limpo", icon: "Sparkles" },
  { label: "Aberta 24 horas, todos os dias", icon: "Clock" },
  { label: "Pagamento por Pix, cartão e app", icon: "CreditCard" },
] as const;
