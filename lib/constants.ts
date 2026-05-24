// ============================================================
// UNIT — fonte única da verdade para a unidade Castelo
// ============================================================
export const UNIT = {
  name:      'Xô Varal Castelo',
  unit:      'Castelo',
  tagline:   'Lavanderia self-service moderna no Castelo',
  url:       'https://castelo.xovaral.com',
  whatsapp:  '5531993328775',
  instagram: 'https://instagram.com/xovaralcastelo',
  facebook:  'https://facebook.com/xovaralcastelo',
  phone:     '(31) 9 9332-8775',
  hours:     { summary: '6h às 23h, todos os dias', full: '6h às 23h — todos os dias, inclusive feriados' },
  address: {
    street:          'R. Castelo da Beira, 271',
    complement:      'Comercial JL Mall',
    neighborhood:    'Castelo',
    city:            'Belo Horizonte',
    state:           'MG',
    zip:             '31330-370',
    full:            'R. Castelo da Beira, 271 — Castelo, Belo Horizonte/MG',
    fullComplement:  'Comercial JL Mall — R. Castelo da Beira, 271 — Castelo, BH/MG',
    googleMapsUrl:   'https://maps.google.com/?q=R.+Castelo+da+Beira,271,Castelo,Belo+Horizonte,MG',
    googleMapsEmbed: 'https://maps.google.com/maps?q=R.+Castelo+da+Beira,271,Castelo,Belo+Horizonte,MG&hl=pt-BR&z=16&output=embed',
  },
  pricing: {
    wash:     { label: 'R$ 17,00', cents: 1700 },
    dry:      { label: 'R$ 16,99', cents: 1699 },
    complete: { label: 'R$ 33,99', cents: 3399 },
    cycleMinutes: 45,
  },
  equipment: { machines: 3, brand: 'SpeedQueen', capacity: '10,5 kg' },
  inauguration: '08 de setembro de 2025',
}

// backward compat alias
export const SITE = {
  name:      UNIT.name,
  tagline:   UNIT.tagline,
  url:       UNIT.url,
  phone:     UNIT.whatsapp,
  whatsapp:  `https://wa.me/${UNIT.whatsapp}`,
  instagram: UNIT.instagram,
  facebook:  UNIT.facebook,
  address: {
    ...UNIT.address,
    googleMapsUrl:   UNIT.address.googleMapsUrl,
    googleMapsEmbed: UNIT.address.googleMapsEmbed,
  },
  hours:       UNIT.hours.full,
  inauguration: UNIT.inauguration,
}

export function whatsappUrl(source = 'site') {
  return `https://wa.me/${UNIT.whatsapp}?text=Olá!+Vim+pelo+site+(${source})`
}

// ============================================================
// CLUB_LEVELS — 4 níveis igual ao Buritis
// ============================================================
export const CLUB_LEVELS = [
  {
    key:        'bronze',
    level:      'Bronze',
    icon:       'Trophy',
    cyclesMin:  8,
    cyclesMax:  11,
    cyclesLabel:'8 a 11 ciclos/mês',
    discountPct: 5,
    discount:   '5%',
    color:      '#CD7F32',
    colorEnd:   '#8B4513',
    ringColor:  'rgba(205,127,50,0.4)',
    bg:         '#FDF4ED',
    perks: ['5% de desconto em todos os ciclos', 'Acesso ao clube', 'Notificações de promoções'],
  },
  {
    key:        'prata',
    level:      'Prata',
    icon:       'Medal',
    cyclesMin:  12,
    cyclesMax:  19,
    cyclesLabel:'12 a 19 ciclos/mês',
    discountPct: 10,
    discount:   '10%',
    color:      '#9E9E9E',
    colorEnd:   '#616161',
    ringColor:  'rgba(158,158,158,0.4)',
    bg:         '#F5F5F5',
    perks: ['10% de desconto em todos os ciclos', 'Tudo do Bronze', 'Prioridade em promoções'],
  },
  {
    key:        'ouro',
    level:      'Ouro',
    icon:       'Crown',
    cyclesMin:  20,
    cyclesMax:  29,
    cyclesLabel:'20 a 29 ciclos/mês',
    discountPct: 15,
    discount:   '15%',
    color:      '#D4A013',
    colorEnd:   '#B8860B',
    ringColor:  'rgba(255,215,0,0.5)',
    bg:         '#FFFAE0',
    highlight:  true,
    perks: ['15% de desconto em todos os ciclos', 'Tudo do Prata', 'Acesso VIP a benefícios especiais'],
  },
  {
    key:        'diamante',
    level:      'Diamante',
    icon:       'Gem',
    cyclesMin:  30,
    cyclesMax:  Infinity,
    cyclesLabel:'30+ ciclos/mês',
    discountPct: 20,
    discount:   '20%',
    color:      '#01B3DC',
    colorEnd:   '#0097BC',
    ringColor:  'rgba(1,179,220,0.4)',
    bg:         '#E5F7FF',
    perks: ['20% de desconto em todos os ciclos', 'Tudo do Ouro', 'Máximo desconto disponível'],
  },
]

// ============================================================
// PRICING (cards)
// ============================================================
export const PRICING = [
  {
    label:       'Lavagem',
    price:       'R$ 17,00',
    description: 'Ciclo completo — 10,5 kg com OMO + Comfort',
    time:        '~45 min',
    icon:        'Waves',
    color:       '#01B3DC',
    bg:          '#E5F7FF',
  },
  {
    label:       'Secagem',
    price:       'R$ 16,99',
    description: 'Secagem profissional — 100% seca',
    time:        '~45 min',
    icon:        'Wind',
    color:       '#EE7531',
    bg:          '#FFF3EA',
  },
  {
    label:       'Lavagem + Secagem',
    price:       'R$ 33,99',
    description: 'Combo completo — roupa limpa e seca',
    time:        '~1 hora',
    icon:        'Sparkles',
    color:       '#FBC132',
    bg:          '#FFFAE0',
    highlight:   true,
  },
]

// ============================================================
// HOW IT WORKS
// ============================================================
export const HOW_IT_WORKS = [
  {
    step:        1,
    icon:        'MapPin',
    title:       'Chegue na loja',
    description: 'Traga suas roupas em qualquer horário. Sem agendamento, sem fila, sem burocracia.',
    color:       '#01B3DC',
    bg:          '#E5F7FF',
  },
  {
    step:        2,
    icon:        'WashingMachine',
    title:       'Escolha e coloque',
    description: 'Separe as roupas, coloque na SpeedQueen e selecione o ciclo desejado.',
    color:       '#EE7531',
    bg:          '#FFF3EA',
  },
  {
    step:        3,
    icon:        'Smartphone',
    title:       'Pague pelo app ou totem',
    description: 'Pix, débito ou crédito. Rápido, sem complicação.',
    color:       '#FBC132',
    bg:          '#FFFAE0',
  },
  {
    step:        4,
    icon:        'Coffee',
    title:       'Descanse no bistrô',
    description: 'Wi-Fi, TV e ambiente climatizado enquanto a máquina trabalha por você.',
    color:       '#253163',
    bg:          '#EDF0FF',
  },
]

// ============================================================
// BENEFITS
// ============================================================
export const BENEFITS = [
  { icon: 'Clock',       title: 'Economize tempo',          description: '45 min vs. horas em casa. Resolva a semana de uma vez.' },
  { icon: 'Building2',   title: 'Ideal para apartamentos',  description: 'Sem varal, sem espaço comprometido, sem roupa pendurada.' },
  { icon: 'Wind',        title: 'Secagem real',             description: 'Secadora profissional — roupa 100% seca, não "quase seca".' },
  { icon: 'BedDouble',   title: 'Edredons e cama',          description: '10,5 kg que lava o que a máquina do condomínio não aguenta.' },
  { icon: 'Users',       title: 'Solução pra famílias',     description: 'Volume grande resolvido em uma única visita.' },
  { icon: 'CloudRain',   title: 'Dias chuvosos',            description: 'Secadora resolve em 45 min o que o sol levaria dias.' },
  { icon: 'FlaskConical','title': 'Insumos profissionais', description: 'OMO e Comfort em dosagem ideal. Não precisa trazer sabão.' },
  { icon: 'ShieldCheck', title: 'Total autonomia',          description: 'Você opera. Você controla. Self-service de verdade.' },
]

// ============================================================
// AMENITIES
// ============================================================
export const AMENITIES = [
  { icon: 'Coffee',    label: 'Área de bistrô' },
  { icon: 'Baby',      label: 'Espaço kids' },
  { icon: 'Wifi',      label: 'Wi-Fi gratuito' },
  { icon: 'Tv',        label: 'TV' },
  { icon: 'AirVent',   label: 'Ar-condicionado' },
  { icon: 'ParkingCircle', label: 'Estacionamento na porta' },
  { icon: 'Ruler',     label: 'Mesa de dobrar roupas' },
  { icon: 'Shirt',     label: 'Cabides disponíveis' },
  { icon: 'Lock',      label: 'Ambiente seguro' },
]

// ============================================================
// TESTIMONIALS
// ============================================================
export const TESTIMONIALS = [
  {
    name:   'Claudia Erminia',
    role:   'Moradora do Castelo',
    text:   'Que ambiente incrível! Vim com minha filha na primeira vez e ela adorou a área kids. Agora é programa nosso de sábado.',
    avatar: 'C',
    stars:  5,
  },
  {
    name:   'Pedro Artur',
    role:   'Universitário — UniBH',
    text:   'Primeiro apartamento, primeira vez na lavanderia. Em 45 minutos estava tudo resolvido. Nunca mais voltei para a máquina do prédio.',
    avatar: 'P',
    stars:  5,
  },
  {
    name:   'Leandro Caique',
    role:   'Profissional de TI',
    text:   '45 minutos vs. 3 horas em casa. O cálculo é óbvio. Virei Prata em menos de um mês.',
    avatar: 'L',
    stars:  5,
  },
  {
    name:   'Juliana Ferreira',
    role:   'Mãe — Castelo',
    text:   'Ele brincou. Eu respirei. A roupa lavou. "Semana que vem a gente volta, mãe?" — foi o que ele disse saindo.',
    avatar: 'J',
    stars:  5,
  },
  {
    name:   'Matheus Lima',
    role:   'Personal Trainer',
    text:   'Roupas de academia toda semana. Depois do treino, passo na Xô Varal. Quando aviso terminou, pego e vou embora. Perfeito.',
    avatar: 'M',
    stars:  5,
  },
  {
    name:   'Rafael Moura',
    role:   'Morador do Castelo',
    text:   'Moro em apartamento e nunca tive solução boa pra lavagem. Aqui em 45 minutos sai tudo limpo e seco. Venho toda semana.',
    avatar: 'R',
    stars:  5,
  },
]

// ============================================================
// FAQ
// ============================================================
export const FAQ = [
  {
    question: 'Preciso levar sabão e amaciante?',
    answer:   'Não. Os insumos profissionais OMO e Comfort já estão inclusos no ciclo. Você não precisa trazer nada além das suas roupas.',
  },
  {
    question: 'Como faço o pagamento?',
    answer:   'Pelo aplicativo ou pelo totem digital na loja. Aceitamos Pix, cartão de débito e crédito. Rápido e sem complicação.',
  },
  {
    question: 'Preciso agendar horário?',
    answer:   'Não. A Xô Varal Castelo funciona no modelo self-service: você chega, verifica a disponibilidade das máquinas no app e começa. Sem agendamento.',
  },
  {
    question: 'Quanto tempo demora?',
    answer:   'Cada ciclo (lavagem ou secagem) dura aproximadamente 45 minutos. Lavagem + secagem completa: cerca de 1h a 1h30.',
  },
  {
    question: 'Posso lavar edredom e roupa de cama?',
    answer:   'Sim! Nossas máquinas SpeedQueen de 10,5 kg foram feitas pra isso. Edredom, jogo de cama, cobertores e toalhas — tudo cabe e sai impecável.',
  },
  {
    question: 'A loja tem atendente?',
    answer:   'A Xô Varal Castelo é self-service — você opera com total autonomia pelo app ou totem. O ambiente é monitorado e seguro. Em dúvida, o suporte está no WhatsApp.',
  },
  {
    question: 'É seguro para roupas delicadas e de academia?',
    answer:   'Sim. As SpeedQueens permitem selecionar o programa ideal para cada tipo de peça. Tecidos técnicos, roupas delicadas e peças especiais são tratados com cuidado.',
  },
  {
    question: 'Como funciona o Clube de Vantagens?',
    answer:   'Quanto mais ciclos você usa no mês, maior o desconto no mês seguinte: Bronze (8-11 ciclos → 5%), Prata (12-19 → 10%), Ouro (20-29 → 15%), Diamante (30+ → 20%).',
  },
  {
    question: 'Minha roupa pode misturar com a de outros clientes?',
    answer:   'Não. Cada máquina é de uso individual e exclusivo por ciclo. Apenas as suas roupas entram na máquina. Higiene e privacidade garantidas.',
  },
  {
    question: 'Como funciona a secagem?',
    answer:   'Coloque as roupas lavadas na secadora, selecione o ciclo, pague e aguarde. Em ~45 min as roupas saem 100% secas — não "quase secas" como em secadoras domésticas.',
  },
]
