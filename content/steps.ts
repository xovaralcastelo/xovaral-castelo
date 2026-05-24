export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: 1,
    title: "Chegue na loja",
    description:
      "Vaga exclusiva de estacionamento na porta no Comercial JL Mall. Nenhum drama de chegar.",
    icon: "MapPin",
  },
  {
    number: 2,
    title: "Escolha lavar ou secar",
    description:
      "3 SpeedQueens profissionais de 10,5 kg, com OMO e Comfort já inclusos.",
    icon: "Sparkles",
  },
  {
    number: 3,
    title: "Pague pelo app ou totem",
    description:
      "Pix, cartão de crédito ou débito. Você controla tudo do seu celular.",
    icon: "Smartphone",
  },
  {
    number: 4,
    title: "Aguarde com conforto",
    description:
      "Bistrô com Wi-Fi, área kids, ar-condicionado e TV. 45 minutos do seu jeito.",
    icon: "Coffee",
  },
  {
    number: 5,
    title: "Saia com tudo pronto",
    description:
      "Mesa de dobra ampla e cabides. Vai embora com a roupa limpa, seca e organizada.",
    icon: "CheckCircle2",
  },
];
