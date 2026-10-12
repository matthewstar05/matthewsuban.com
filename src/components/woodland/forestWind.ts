/** One 16-second wind cycle for the painting and collectible leaves. */
export const FOREST_LOOP_SECONDS = 16;
export function forestBreeze(seconds: number) {
  const phase = (seconds / FOREST_LOOP_SECONDS) * Math.PI * 2;
  return Math.sin(phase) * 0.6 + Math.sin(phase * 2 + 1.2) * 0.4;
}

export interface ForestSpring {
  position: number;
  velocity: number;
}

/** Exact damped spring step: a roughly seven-second sway with a long, soft tail.
 * Impulses change velocity, never position, so repeated gusts cannot teleport
 * the painting. The exact solution also behaves consistently at 60 or 120 Hz. */
export function advanceForestSpring(spring: ForestSpring, dt: number, target = 0) {
  const decay = 0.32;
  const frequency = 0.85;
  const offset = spring.position - target;
  const momentum = (spring.velocity + decay * offset) / frequency;
  const fade = Math.exp(-decay * dt);
  const cosine = Math.cos(frequency * dt);
  const sine = Math.sin(frequency * dt);
  spring.position = target + fade * (offset * cosine + momentum * sine);
  spring.velocity =
    fade *
    ((momentum * frequency - decay * offset) * cosine -
      (offset * frequency + decay * momentum) * sine);
}
