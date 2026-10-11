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
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex min-h-(--header-height) flex-wrap items-center gap-x-4 py-2 sm:h-(--header-height) sm:flex-nowrap sm:gap-4 sm:py-0">
        <Link href="/" className="shrink-0 font-semibold tracking-tight whitespace-nowrap">
          {site.name}
        </Link>
        <nav
          aria-label="Main"
          className="order-last -mx-3 flex w-full min-w-0 overflow-x-auto sm:order-none sm:ml-auto sm:w-auto"
        >
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="ml-auto shrink-0 sm:ml-0">
          <ThemeToggle />
        </div>
        {site.headerCta && (
          <ButtonLink href={site.headerCta.href} className="hidden h-9 px-4 sm:inline-flex">
            {site.headerCta.label}
          </ButtonLink>
        )}
      </Container>
    </header>
  );
}
