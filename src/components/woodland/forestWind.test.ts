import { describe, expect, it } from "vitest";
import { advanceForestSpring } from "./forestWind";

function sway(seconds: number, rate = 60) {
  const spring = { position: 0, velocity: 1.4 };
  for (let frame = 0; frame < seconds * rate; frame++) advanceForestSpring(spring, 1 / rate);
  return spring;
}

describe("forest gust inertia", () => {
  it("bends gradually, lingers, and rebounds before settling", () => {
    expect(sway(0.1).position).toBeLessThan(0.15);
    expect(sway(1.5).position).toBeGreaterThan(0.9);
    expect(sway(3).position).toBeGreaterThan(0.3);
    expect(sway(5).position).toBeLessThan(-0.25);
    expect(Math.abs(sway(16).position)).toBeLessThan(0.02);
  });

  it("keeps the same timing across display refresh rates", () => {
    const slow = sway(3, 30);
    const fast = sway(3, 120);
    expect(slow.position).toBeCloseTo(fast.position, 10);
    expect(slow.velocity).toBeCloseTo(fast.velocity, 10);
  });

  it("preserves the bend when another impulse arrives", () => {
    const spring = sway(2);
    const before = spring.position;
    spring.velocity += 1.4;
    advanceForestSpring(spring, 1 / 60);
    expect(Math.abs(spring.position - before)).toBeLessThan(0.03);
  });
});
