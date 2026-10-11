"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./ThemeScript";

type Theme = "system" | "light" | "dark";

const order: Theme[] = ["system", "light", "dark"];
const icons = { system: Monitor, light: Sun, dark: Moon } as const;

const listeners = new Set<() => void>();

function readTheme(): Theme {
  const value = document.documentElement.getAttribute("data-theme");
  return value === "light" || value === "dark" ? value : "system";
}

function writeTheme(theme: Theme): void {
  const root = document.documentElement;
  try {
    if (theme === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the attribute still applies for this visit.
  }
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);
  const next = order[(order.indexOf(theme) + 1) % order.length];
  const Icon = icons[theme];
  return (
    <button
      type="button"
      onClick={() => writeTheme(next)}
      className="inline-flex size-9 items-center justify-center rounded-control text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      title={`Theme: ${theme}`}
      data-theme-toggle={theme}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
