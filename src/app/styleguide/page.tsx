import type { Metadata } from "next";
import { Section } from "@/components/sections/registry";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { sectionSamples } from "@/content/samples";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const swatches = [
  "background",
  "foreground",
  "surface",
  "muted",
  "muted-foreground",
  "border",
  "accent",
  "accent-foreground",
];

/** Living styleguide: every token and every section, for visual review by humans and agents. */
export default function StyleguidePage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-display">Styleguide</h1>
        <p className="mt-4 text-muted-foreground">
          Tokens live in src/app/globals.css. Section samples live in src/content/samples.ts.
        </p>

        <h2 className="mt-16 mb-6 text-heading">Color tokens</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {swatches.map((name) => (
            <li key={name} className="text-sm">
              <div
                className="mb-2 h-16 rounded-card border border-border"
                style={{ background: `var(--${name})` }}
              />
              <code>--{name}</code>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 mb-6 text-heading">Type</h2>
        <p className="text-display">Display</p>
        <p className="mt-4 text-heading">Heading</p>
        <p className="mt-4 text-lg">Body large</p>
        <p className="mt-2">Body</p>
        <p className="mt-2 text-sm text-muted-foreground">Small muted</p>

        <h2 className="mt-16 mb-6 text-heading">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <button key={variant} type="button" className={buttonClasses(variant)}>
              {variant}
            </button>
          ))}
        </div>
      </Container>

      {Object.values(sectionSamples).map((section) => (
        <div key={section.type} className="border-t border-dashed border-border">
          <Container>
            <p className="pt-4 font-mono text-xs text-muted-foreground">
              type: &quot;{section.type}&quot;
            </p>
          </Container>
          <Section section={section} />
        </div>
      ))}
    </>
  );
}
