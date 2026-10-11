import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/** Serializable action shape used by content files. */
export interface Action {
  label: string;
  href: string;
  variant?: ButtonVariant;
}

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/90",
  secondary: "border border-border bg-surface text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};

export const buttonClasses = (variant: ButtonVariant = "primary", className?: string): string =>
  cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-control px-5 text-sm font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variants[variant],
    className,
  );

export function ButtonLink({ href, variant, className, children }: ButtonLinkProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a
        href={href}
        className={buttonClasses(variant, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

export function Actions({ actions, className }: { actions?: Action[]; className?: string }) {
  if (!actions?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {actions.map((action, i) => (
        <ButtonLink
          key={`${action.href}-${i}`}
          href={action.href}
          variant={action.variant ?? (i === 0 ? "primary" : "secondary")}
        >
          {action.label}
        </ButtonLink>
      ))}
    </div>
  );
}
