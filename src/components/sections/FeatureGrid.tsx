import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export interface FeatureGridProps {
  title?: string;
  intro?: string;
  columns?: 2 | 3 | 4;
  items: { icon?: IconName; title: string; body: string }[];
}

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function FeatureGrid({ title, intro, columns = 3, items }: FeatureGridProps) {
  return (
    <Container className="py-section">
      <SectionHeading title={title} intro={intro} />
      <ul className={cn("grid gap-6", columnClasses[columns])}>
        {items.map((item) => (
          <li key={item.title} className="rounded-card border border-border bg-surface p-6">
            {item.icon && (
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-control bg-accent/10 text-accent">
                <Icon name={item.icon} className="size-5" />
              </div>
            )}
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
