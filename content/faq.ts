export interface FAQItem {
  question: string;
  answer: string;
  category?: "uso" | "preco" | "estrutura" | "clube" | "outros";
}

export const FAQS: FAQItem[] = [
  {
    question: "Preciso levar sabão ou amaciante?",
    answer:
      "Não. OMO e Comfort profissionais já estão inclusos no preço. Você só precisa trazer suas roupas.",
    category: "uso",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Você paga direto pelo aplicativo Xô Varal ou no totem interativo da loja. Aceitamos Pix, cartão de crédito e cartão de débito.",
    category: "preco",
  },
  {
    question: "Preciso agendar horário?",
    answer:
      "Não. Você chega, verifica no app quais máquinas estão livres em tempo real e usa na hora. Sem fila, sem agendamento.",
    category: "uso",
  },
  {
    question: "Quanto tempo demora?",
    answer:
      "Até 45 minutos por etapa. O ciclo completo (lavagem + secagem) fica pronto em até 90 minutos. O app avisa no seu celular quando termina.",
    category: "uso",
  },
  {
    question: "Posso lavar edredom, cobertor ou roupa de cama?",
    answer:
      "Sim! As SpeedQueen profissionais têm capacidade de 10,5 kg — aceitam edredom de casal, cobertor pesado, almofadões, jogos completos de cama. Tudo que a máquina de apartamento não consegue.",
    category: "uso",
  },
  {
    question: "A loja tem atendente?",
    answer:
      "Sim, durante o horário comercial. Mas é tudo autosserviço — você opera a máquina sozinho seguindo o passo a passo do app. É rápido e simples.",
    category: "estrutura",
  },
  {
    question: "É seguro? Minha roupa pode misturar com a de outros?",
    answer:
      "Não mistura. Cada máquina é de uso exclusivo — só a sua roupa entra. As SpeedQueen passam por limpeza diária com checklist. Ambiente monitorado e iluminado.",
    category: "estrutura",
  },
  {
    question: "Como funciona a secagem?",
    answer:
      "Secadora semi-industrial SpeedQueen — em 45 minutos sua roupa sai 100% seca, cheirosa e pronta pra dobrar. Diferente do varal ou da máquina de prédio que devolve roupa úmida.",
    category: "uso",
  },
  {
    question: "O que é o Clube de Vantagens?",
    answer:
      "Programa de fidelidade automático: Bronze (8–11 ciclos/mês, 5% off), Prata (12–19 ciclos, 10% off), Ouro (20–29 ciclos, 15% off), Diamante (30+ ciclos, 20% off). O desconto é aplicado direto no app no mês seguinte.",
    category: "clube",
  },
  {
    question: "Tem vaga pra estacionar?",
    answer:
      "Sim, vaga exclusiva na porta da unidade no Comercial JL Mall. Você não dá voltas procurando lugar.",
    category: "estrutura",
  },
  {
    question: "Tem Wi-Fi e lugar pra trabalhar?",
    answer:
      "Sim. Bistrô com Wi-Fi gratuito, mesa, banquetas e tomadas. Ideal pra trabalhar, estudar ou só descansar enquanto a máquina trabalha.",
    category: "estrutura",
  },
  {
    question: "Posso ir com criança pequena?",
    answer:
      "Sim. Temos área kids com mesinha infantil. As crianças brincam enquanto você resolve a lavagem.",
    category: "estrutura",
  },
];
