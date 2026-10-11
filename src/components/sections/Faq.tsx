import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Heading";

export interface FaqProps {
  title?: string;
  intro?: string;
  items: { question: string; answer: string }[];
}

export function Faq({ title, intro, items }: FaqProps) {
  return (
    <Container size="prose" className="py-section">
      <SectionHeading title={title} intro={intro} />
      <div className="divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {item.question}
              <span
                aria-hidden
                className="text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
