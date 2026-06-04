"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MascotName = "meia" | "globinho" | "espuma" | "estrela";
type MascotSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<MascotSize, { className: string; px: number }> = {
  sm: { className: "h-16 w-16", px: 64 },
  md: { className: "h-28 w-28", px: 112 },
  lg: { className: "h-44 w-44", px: 176 },
  xl: { className: "h-64 w-64", px: 256 },
};

const MASCOT_SRCS: Record<MascotName, string> = {
  meia: "/mascotes/meia-t.png",
  globinho: "/mascotes/globinho-t.png",
  espuma: "/mascotes/espuma-t.png",
  estrela: "/mascotes/estrela-t.png",
};

const MASCOT_ALTS: Record<MascotName, string> = {
  meia: "Puffy pensativo, mascote da Xô Varal",
  globinho: "Clocky, mascote do tempo da Xô Varal",
  espuma: "Puffy, mascote da espuma da Xô Varal",
  estrela: "Luma, mascote da Xô Varal",
};

interface MascotProps {
  name: MascotName;
  size?: MascotSize;
  animate?: boolean;
  className?: string;
}

export function Mascot({ name, size = "md", animate = true, className }: MascotProps) {
  const { className: sizeClass, px } = SIZES[size];
  const baseAnimation = animate
    ? {
        animate: { y: [0, -8, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  return (
    <motion.div
      className={cn(sizeClass, "relative flex items-center justify-center", className)}
      {...baseAnimation}
    >
      <Image
        src={MASCOT_SRCS[name]}
        alt={MASCOT_ALTS[name]}
        width={px}
        height={px}
        className="h-full w-full object-contain"
        priority={false}
      />
    </motion.div>
  );
}
