"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { LivingForest } from "./LivingForest";

function subscribeViewport(listener: () => void) {
  window.addEventListener("resize", listener);
  return () => window.removeEventListener("resize", listener);
}
function sourceForViewport() {
  if (window.innerWidth >= 900) return "/media/forest-coherent-4k.mp4";
  // Use the portrait crop only when it contains the entire visible image.
  if (window.innerWidth < 600 && window.innerWidth / window.innerHeight <= 0.5)
    return "/media/forest-coherent-mobile.mp4";
  return "/media/forest-coherent-tablet.mp4";
}

/** The ambient loop and live reactions use the same art, shader and clock. */
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
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const update = () => {
      if (document.hidden) element.pause();
      else void element.play().catch(() => {});
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      element.pause();
      document.removeEventListener("visibilitychange", update);
    };
  }, [source, failed]);
  return (
    <>
      {!failed && (
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
          onTimeUpdate={() => {
            if (video.current) windClockRef.current = video.current.currentTime;
          }}
          onError={() => setFailed(true)}
        />
      )}
      <LivingForest gust={gust} video={video} windClockRef={windClockRef} />
    </>
  );
}
