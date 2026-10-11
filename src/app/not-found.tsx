import { Hero } from "@/components/sections/Hero";

export default function NotFound() {
  return (
    <Hero
      eyebrow="404"
      title="Page not found"
      subtitle="The page you're looking for doesn't exist or has moved."
      actions={[{ label: "Back home", href: "/" }]}
    />
  );
}
