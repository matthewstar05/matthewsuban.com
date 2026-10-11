import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  size?: "prose" | "default" | "wide";
  className?: string;
}

const sizes = {
  prose: "max-w-prose",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({ children, size = "default", className }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-gutter", sizes[size], className)}>{children}</div>;
}
