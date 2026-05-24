import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

export function Container({ children, size = "lg", className }: ContainerProps) {
  return (
    <div className={cn(SIZES[size], "mx-auto px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}
