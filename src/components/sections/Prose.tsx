import { Container } from "@/components/ui/Container";

export interface ProseProps {
  title?: string;
  /** Each string renders as one paragraph. */
  body: string[];
}

export function Prose({ title, body }: ProseProps) {
  return (
    <Container size="prose" className="py-section">
      {title && <h2 className="mb-6 text-heading text-balance">{title}</h2>}
      <div className="space-y-5 text-lg leading-relaxed text-pretty">
        {body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
}
