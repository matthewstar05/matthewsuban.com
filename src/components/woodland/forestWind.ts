/** One 16-second wind cycle for the painting and collectible leaves. */
export const FOREST_LOOP_SECONDS = 16;
export function forestBreeze(seconds: number) {
  const phase = (seconds / FOREST_LOOP_SECONDS) * Math.PI * 2;
  return Math.sin(phase) * 0.6 + Math.sin(phase * 2 + 1.2) * 0.4;
}
