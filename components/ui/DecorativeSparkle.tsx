import { Sparkle } from "lucide-react";
import type { CSSProperties } from "react";

interface Props {
  className?: string;
  size?: number;
  style?: CSSProperties;
}

/**
 * Estrela 4-pontas decorativa. Substitui o caractere "✦" usado anteriormente.
 * Use posicionada absolutamente com classes `text-xv-orange/cyan/yellow` + `opacity-*`.
 */
export function DecorativeSparkle({ className = "", size = 24, style }: Props) {
  return (
    <Sparkle
      className={className}
      size={size}
      style={style}
      aria-hidden
      fill="currentColor"
      strokeWidth={0}
    />
  );
}
