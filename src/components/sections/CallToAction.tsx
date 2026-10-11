import { Actions, type Action } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export interface CallToActionProps {
  title: string;
  body?: string;
  actions: Action[];
}

export function CallToAction({ title, body, actions }: CallToActionProps) {
  return (
    <Container className="py-section text-center">
      <h2 className="mx-auto max-w-2xl text-heading text-balance">{title}</h2>
      {body && <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{body}</p>}
      <Actions actions={actions} className="mt-8 justify-center" />
    </Container>
  );
}
