"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { forestBreeze } from "./forestWind";

const positions = [
  [12, 48],
  [27, 65],
  [41, 41],
  [53, 81],
  [64, 55],
  [72, 73],
  [86, 43],
  [91, 85],
  [34, 88],
];
interface LivingLeavesProps {
  motion: boolean;
  windClockRef: RefObject<number>;
  collected: number[];
  gust: number;
  onCollect: (id: number) => void;
}

/** Nine actual leaf sprites, not a particle video. Pointer speed imparts wind
 * to nearby leaves. DOM updates avoid rerendering the world every frame. */
export function LivingLeaves({
  motion,
  collected,
  gust,
  onCollect,
  windClockRef,
}: LivingLeavesProps) {
  const layer = useRef<HTMLDivElement>(null);
  const nodes = useRef(new Map<number, HTMLButtonElement>());
  const gustRef = useRef(gust);
  useEffect(() => {
    gustRef.current = gust;
  }, [gust]);

  useEffect(() => {
    const root = layer.current;
    const scene = root?.parentElement;
    if (!root || !scene || !motion) return;
    let bounds = scene.getBoundingClientRect();
    let previousGust = gustRef.current;
    const particles = positions.map(([x, y], i) => ({
      x: (bounds.width * x) / 100,
      y: (bounds.height * y) / 100,
      vx: 0,
      vy: 0,
      angle: i * 43,
      phase: i * 1.9,
    }));
    let pointer = { x: -1000, y: -1000, time: 0 };
    function move(event: PointerEvent) {
      bounds = scene!.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const elapsed = Math.max(16, event.timeStamp - pointer.time);
      if (elapsed < 180) {
        const speedX = Math.max(-400, Math.min(400, ((x - pointer.x) / elapsed) * 1000));
        const speedY = Math.max(-300, Math.min(300, ((y - pointer.y) / elapsed) * 1000));
        for (const p of particles) {
          const distance = Math.hypot(p.x - x, p.y - y);
          if (distance < 150) {
            const influence = (1 - distance / 150) * 0.18;
            p.vx += speedX * influence;
            p.vy += speedY * influence;
          }
        }
      }
      pointer = { x, y, time: event.timeStamp };
    }
    function resize() {
      const next = scene!.getBoundingClientRect();
      for (const p of particles) {
        p.x *= next.width / bounds.width;
        p.y *= next.height / bounds.height;
      }
      bounds = next;
    }
    scene.addEventListener("pointermove", move, { passive: true });
    const observer = new ResizeObserver(resize);
    observer.observe(scene);
    let frame = 0;
    let previous = 0;
    function tick(now: number) {
      const dt = Math.min((now - (previous || now)) / 1000, 0.035);
      previous = now;
      if (previousGust !== gustRef.current) {
        for (const p of particles) {
          p.vx += 150;
          p.vy -= 85;
        }
        previousGust = gustRef.current;
      }
      particles.forEach((p, i) => {
        const node = nodes.current.get(i);
        if (!node || node.matches(":focus-visible")) return;
        p.vx *= Math.exp(-dt * 1.5);
        p.vy *= Math.exp(-dt * 1.5);
        p.x +=
          (p.vx + forestBreeze(windClockRef.current) * 12 + Math.sin(now / 1800 + p.phase) * 3) *
          dt;
        p.y += (p.vy + 5 + Math.cos(now / 2100 + p.phase) * 3) * dt;
        p.angle += (6 + p.vx * 0.15) * dt;
        if (p.y > bounds.height - 65) p.y = bounds.height * 0.4;
        if (p.y < 80) p.y = 80;
        if (p.x > bounds.width - 12) p.x = 12;
        if (p.x < -20) p.x = bounds.width - 25;
        node.style.left = "0";
        node.style.top = "0";
        node.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg)`;
      });
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", move);
      observer.disconnect();
    };
  }, [motion, windClockRef]);

  return (
    <div ref={layer} className="living-leaves" aria-label="Nine hidden leaf keepsakes">
      {positions.map(
        ([x, y], i) =>
          !collected.includes(i) && (
            <button
              key={i}
              ref={(node) => {
                if (node) nodes.current.set(i, node);
                else nodes.current.delete(i);
              }}
              type="button"
              className={`living-leaf leaf-color-${i % 3}`}
              style={
                { left: `${x}%`, top: `${y}%`, "--leaf-turn": `${i * 43}deg` } as CSSProperties
              }
              onClick={() => onCollect(i)}
              aria-label={`Keep leaf ${i + 1}`}
            >
              <svg viewBox="0 0 50 60" aria-hidden="true">
                <path d="M26 5C4 15 1 40 23 51 44 42 45 19 26 5Z" />
                <path d="m24 16-1 42m0-29-10-8m11 17 10-10" />
              </svg>
              <span className="leaf-spark">✧</span>
            </button>
          ),
      )}
    </div>
  );
}
