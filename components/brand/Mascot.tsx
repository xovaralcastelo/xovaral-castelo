"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MascotName = "meia" | "globinho" | "espuma";
type MascotSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<MascotSize, string> = {
  sm: "h-16 w-16",
  md: "h-28 w-28",
  lg: "h-44 w-44",
  xl: "h-64 w-64",
};

interface MascotProps {
  name: MascotName;
  size?: MascotSize;
  animate?: boolean;
  className?: string;
}

export function Mascot({ name, size = "md", animate = true, className }: MascotProps) {
  const Component = MASCOT_MAP[name];
  const baseAnimation = animate
    ? {
        animate: { y: [0, -6, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  return (
    <motion.div className={cn(SIZES[size], "flex items-center justify-center", className)} {...baseAnimation}>
      <Component />
    </motion.div>
  );
}

const Meia = () => (
  <svg viewBox="0 0 200 240" className="h-full w-full" aria-label="Meia, mascote da Xô Varal">
    {/* Corpo da meia (laranja) */}
    <path
      d="M70 30 L130 30 L132 90 Q132 95 130 100 L125 130 Q123 145 120 165 Q117 185 100 195 Q80 200 65 195 Q50 190 50 175 Q50 160 55 145 Q60 130 65 115 L68 95 Q70 88 70 80 Z"
      fill="#EE7531"
    />
    {/* Listras do punho */}
    <g stroke="#1A2B6B" strokeWidth="2.5" strokeLinecap="round">
      <line x1="74" y1="40" x2="74" y2="60" />
      <line x1="82" y1="40" x2="82" y2="60" />
      <line x1="90" y1="40" x2="90" y2="60" />
      <line x1="98" y1="40" x2="98" y2="60" />
      <line x1="106" y1="40" x2="106" y2="60" />
      <line x1="114" y1="40" x2="114" y2="60" />
      <line x1="122" y1="40" x2="122" y2="60" />
      <line x1="130" y1="40" x2="130" y2="60" />
    </g>
    {/* Contorno do corpo */}
    <path
      d="M70 30 L130 30 L132 90 Q132 95 130 100 L125 130 Q123 145 120 165 Q117 185 100 195 Q80 200 65 195 Q50 190 50 175 Q50 160 55 145 Q60 130 65 115 L68 95 Q70 88 70 80 Z"
      fill="none"
      stroke="#1A2B6B"
      strokeWidth="3"
    />
    {/* Olhos */}
    <circle cx="86" cy="105" r="3" fill="#1A2B6B" />
    <circle cx="110" cy="105" r="3" fill="#1A2B6B" />
    {/* Sobrancelhas */}
    <path d="M80 95 L92 97" stroke="#1A2B6B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M104 97 L116 95" stroke="#1A2B6B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Boca */}
    <ellipse cx="100" cy="125" rx="14" ry="8" fill="#1A2B6B" />
    <ellipse cx="103" cy="128" rx="4" ry="3" fill="#FF8FA3" />
    {/* Braços cruzados */}
    <path
      d="M60 145 Q80 150 100 152 Q120 154 140 148"
      stroke="#1A2B6B"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M65 160 Q85 158 100 158 Q115 158 135 160"
      stroke="#1A2B6B"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    {/* Pernas */}
    <rect x="78" y="195" width="10" height="40" fill="white" stroke="#1A2B6B" strokeWidth="2.5" />
    <rect x="112" y="195" width="10" height="40" fill="white" stroke="#1A2B6B" strokeWidth="2.5" />
  </svg>
);

const Globinho = () => (
  <svg viewBox="0 0 200 240" className="h-full w-full" aria-label="Globinho, mascote da Xô Varal">
    {/* Corpo bolha (cyan) */}
    <circle cx="100" cy="100" r="70" fill="#01B3DC" />
    {/* Reflexo */}
    <ellipse cx="80" cy="78" rx="22" ry="14" fill="rgba(255,255,255,0.35)" transform="rotate(-25 80 78)" />
    {/* Contorno */}
    <circle cx="100" cy="100" r="70" fill="none" stroke="#1A2B6B" strokeWidth="3" />
    {/* Olhos */}
    <circle cx="86" cy="95" r="3" fill="#1A2B6B" />
    <circle cx="118" cy="95" r="3" fill="#1A2B6B" />
    {/* Sobrancelhas */}
    <path d="M78 85 L94 88" stroke="#1A2B6B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M110 88 L126 85" stroke="#1A2B6B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Boca sorrindo */}
    <path d="M88 115 Q102 130 116 115" stroke="#1A2B6B" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Braço esquerdo segurando relógio */}
    <path d="M55 130 Q70 135 80 142" stroke="#1A2B6B" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Relógio no pulso */}
    <rect x="48" y="125" width="14" height="10" rx="2" fill="white" stroke="#1A2B6B" strokeWidth="2" />
    <rect x="51" y="127" width="2" height="2" fill="#EE7531" />
    <circle cx="55" cy="130" r="3" fill="none" stroke="#1A2B6B" strokeWidth="1" />
    {/* Braço direito */}
    <path d="M145 130 Q155 138 152 150" stroke="#1A2B6B" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Pernas */}
    <rect x="85" y="170" width="10" height="40" fill="white" stroke="#1A2B6B" strokeWidth="2.5" />
    <rect x="105" y="170" width="10" height="40" fill="white" stroke="#1A2B6B" strokeWidth="2.5" />
  </svg>
);

const Espuma = () => (
  <svg viewBox="0 0 200 240" className="h-full w-full" aria-label="Espuma, mascote da Xô Varal">
    {/* Nuvem azul */}
    <ellipse cx="60" cy="60" rx="22" ry="20" fill="#01B3DC" />
    <ellipse cx="140" cy="60" rx="20" ry="18" fill="#01B3DC" />
    <path
      d="M40 100 Q40 70 70 65 Q85 50 105 55 Q125 45 140 60 Q170 60 170 100 Q170 140 100 145 Q40 140 40 100 Z"
      fill="#01B3DC"
    />
    {/* Contorno */}
    <path
      d="M40 100 Q40 70 70 65 Q85 50 105 55 Q125 45 140 60 Q170 60 170 100 Q170 140 100 145 Q40 140 40 100 Z"
      fill="none"
      stroke="#1A2B6B"
      strokeWidth="3"
    />
    {/* Olhos fechados (feliz) */}
    <path d="M76 92 Q83 86 90 92" stroke="#1A2B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M108 92 Q115 86 122 92" stroke="#1A2B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Sorriso amplo */}
    <path d="M75 110 Q100 130 125 110" stroke="#1A2B6B" strokeWidth="3" fill="white" strokeLinecap="round" />
    <line x1="92" y1="111" x2="92" y2="125" stroke="#1A2B6B" strokeWidth="1.5" />
    <line x1="108" y1="111" x2="108" y2="125" stroke="#1A2B6B" strokeWidth="1.5" />
    {/* Polegar pra cima */}
    <ellipse cx="155" cy="105" rx="10" ry="14" fill="white" stroke="#1A2B6B" strokeWidth="2" />
    <line x1="155" y1="100" x2="155" y2="110" stroke="#1A2B6B" strokeWidth="1.5" />
    {/* Pernas */}
    <rect x="85" y="145" width="10" height="40" fill="white" stroke="#1A2B6B" strokeWidth="2.5" />
    <rect x="105" y="145" width="10" height="40" fill="white" stroke="#1A2B6B" strokeWidth="2.5" />
    {/* Bolhinhas */}
    <circle cx="25" cy="50" r="6" fill="#01B3DC" opacity="0.7" />
    <circle cx="180" cy="40" r="5" fill="#01B3DC" opacity="0.6" />
    <circle cx="15" cy="80" r="4" fill="#01B3DC" opacity="0.5" />
  </svg>
);

const MASCOT_MAP: Record<MascotName, () => React.ReactElement> = {
  meia: Meia,
  globinho: Globinho,
  espuma: Espuma,
};
