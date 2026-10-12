"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { LivingForest } from "./LivingForest";

function subscribeViewport(listener: () => void) {
  window.addEventListener("resize", listener);
  return () => window.removeEventListener("resize", listener);
}
function sourceForViewport() {
  const density = window.devicePixelRatio || 1;
  if (window.innerWidth >= 900 || density > 1) return "/media/forest-coherent-4k.mp4";
  // Use the portrait crop only when it contains the entire visible image.
  if (window.innerWidth < 600 && window.innerWidth / window.innerHeight <= 0.5)
    return "/media/forest-coherent-mobile.mp4";
  return "/media/forest-coherent-tablet.mp4";
}

/** One continuous, full-resolution renderer. Video is only a WebGL fallback. */
export function ForestBackdrop({
  gust,
  windClockRef,
}: {
  gust: number;
  windClockRef: RefObject<number>;
}) {
  const source = useSyncExternalStore(
    subscribeViewport,
    sourceForViewport,
    () => "/media/forest-coherent-mobile.mp4",
  );
  const video = useRef<HTMLVideoElement>(null);
  const [readySource, setReadySource] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [fallback, setFallback] = useState(false);
  const useVideoFallback = useCallback(() => setFallback(true), []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let frame = 0;
    const clock = () => {
      windClockRef.current = element.currentTime;
      frame = requestAnimationFrame(clock);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      if (document.hidden) element.pause();
      else {
        void element.play().catch(() => {});
        frame = requestAnimationFrame(clock);
      }
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      element.pause();
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", update);
    };
  }, [source, failed, fallback, windClockRef]);
  return (
    <>
      {fallback && !failed && (
        <video
          ref={video}
          src={source}
          className={`forest-loop ${readySource === source ? "is-ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setReadySource(source)}
          onError={() => setFailed(true)}
        />
      )}
      {!fallback && (
        <LivingForest gust={gust} windClockRef={windClockRef} onUnavailable={useVideoFallback} />
      )}
    </>
  );
}
