import { Actions, type Action } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: Action[];
  align?: "left" | "center";
}

export function Hero({ eyebrow, title, subtitle, actions, align = "center" }: HeroProps) {
  const centered = align === "center";
  return (
    <Container className={cn("py-section-lg", centered && "text-center")}>
      <div className={cn("max-w-3xl", centered && "mx-auto")}>
        {eyebrow && (
          <p className="mb-4 text-sm font-medium tracking-wide text-accent uppercase">{eyebrow}</p>
        )}
        <h1 className="text-display text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">{subtitle}</p>
        )}
        <Actions actions={actions} className={cn("mt-10", centered && "justify-center")} />
      </div>
    </Container>
  );
}
