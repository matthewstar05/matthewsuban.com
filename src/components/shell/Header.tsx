import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { getNavLinks } from "@/lib/pages";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const links = getNavLinks();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-(--header-height) items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Main" className="-mx-3 ml-auto flex min-w-0 overflow-x-auto">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <ThemeToggle />
        {site.headerCta && (
          <ButtonLink href={site.headerCta.href} className="hidden h-9 px-4 sm:inline-flex">
            {site.headerCta.label}
          </ButtonLink>
        )}
      </Container>
    </header>
  );
}
