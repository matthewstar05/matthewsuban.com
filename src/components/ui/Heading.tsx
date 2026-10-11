import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title?: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

/** Standard title + intro block used at the top of most sections. */
export function SectionHeading({ title, intro, align = "left", className }: SectionHeadingProps) {
  if (!title && !intro) return null;
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {title && <h2 className="text-heading text-balance">{title}</h2>}
      {intro && <p className="mt-4 text-lg text-pretty text-muted-foreground">{intro}</p>}
    </div>
  );
}
