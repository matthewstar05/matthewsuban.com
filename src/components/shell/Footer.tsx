import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  const links = [...site.footer.links, ...site.socials];
  return (
    <footer className="site-footer mt-auto border-t border-border">
      <Container className="flex flex-col gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.name}. {site.footer.note}
        </p>
        {links.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  );
}
