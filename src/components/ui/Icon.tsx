import {
  ArrowRight,
  Bot,
  Check,
  Heart,
  Layers,
  type LucideIcon,
  Palette,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

/**
 * Icons available to content files by name. Add an entry here to make a new
 * lucide icon usable from src/content without importing React in data files.
 */
const icons = {
  "arrow-right": ArrowRight,
  bot: Bot,
  check: Check,
  heart: Heart,
  layers: Layers,
  palette: Palette,
  rocket: Rocket,
  shield: Shield,
  sparkles: Sparkles,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden className={className} />;
}
