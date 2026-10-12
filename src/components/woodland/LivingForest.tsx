"use client";

import { useEffect, useRef, type RefObject } from "react";
import { forestBreeze, FOREST_LOOP_SECONDS } from "./forestWind";

import { vertexSource, fragmentSource } from "./forestShader";

/** A high-resolution living painting. All movement uses the original artwork,
 * so its style, camera and landmarks remain consistent with the scene assets. */
export function LivingForest({
  gust,
  windClockRef,
  onUnavailable,
}: {
  gust: number;
  windClockRef: RefObject<number>;
  onUnavailable: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const latestGust = useRef(gust);
  useEffect(() => {
    latestGust.current = gust;
  }, [gust]);

  useEffect(() => {
    const surface = canvas.current;
    const scene = surface?.parentElement;
    if (!surface || !scene) return;
    const gl = surface.getContext("webgl", { alpha: false, antialias: false });
    if (!gl || gl.getParameter(gl.MAX_TEXTURE_SIZE) < 3840) {
      onUnavailable();
      return;
    }
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      if (program) gl.deleteProgram(program);
      onUnavailable();
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      onUnavailable();
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const uniforms = Object.fromEntries(
      ["u_cover", "u_pointer", "u_pointerWind", "u_time", "u_breeze", "u_gust"].map((name) => [
        name,
        gl.getUniformLocation(program, name),
      ]),
    );
    let bounds = scene.getBoundingClientRect();
    let imageAspect = 1;
    let loaded = false;
    let disposed = false;
    let frame = 0;
    let last = 0;
    let seconds = 0;
    let visible = true;
    let lastReport = 0;
    let presented = false;
    let previousGust = latestGust.current;
    let burst = 0;
    let pointerWind = 0;
    let pointer = { x: -2, y: -2, time: 0 };
    function resize() {
      bounds = scene!.getBoundingClientRect();
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        4096 / bounds.width,
        4096 / bounds.height,
        Math.sqrt((3840 * 2160) / (bounds.width * bounds.height)),
      );
      surface!.width = Math.round(bounds.width * ratio);
      surface!.height = Math.round(bounds.height * ratio);
      gl!.viewport(0, 0, surface!.width, surface!.height);
      const aspect = bounds.width / bounds.height;
      gl!.uniform2f(
        uniforms.u_cover,
        Math.min(1, aspect / imageAspect),
        Math.min(1, imageAspect / aspect),
      );
    }
    function move(event: PointerEvent) {
      bounds = scene!.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const dt = event.timeStamp - pointer.time;
      if (dt > 0 && dt < 180)
        pointerWind = Math.max(-2, Math.min(2, ((x - pointer.x) * 1600) / dt));
      pointer = { x, y, time: event.timeStamp };
    }
    function tick(now: number) {
      frame = 0;
      if (!loaded || document.hidden || !visible || disposed) return;
      const dt = Math.min((now - (last || now)) / 1000, 0.1);
      last = now;
      seconds += dt;
      if (previousGust !== latestGust.current) {
        burst = 1;
        previousGust = latestGust.current;
      }
      burst *= Math.exp(-dt * 1.2);
      pointerWind *= Math.exp(-dt * 2);
      windClockRef.current = seconds;
      gl!.uniform1f(uniforms.u_time, (seconds / FOREST_LOOP_SECONDS) * Math.PI * 2);
      gl!.uniform1f(uniforms.u_breeze, forestBreeze(seconds));
      gl!.uniform1f(uniforms.u_gust, burst);
      gl!.uniform2f(uniforms.u_pointer, pointer.x, pointer.y);
      gl!.uniform1f(uniforms.u_pointerWind, pointerWind);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      if (!presented) {
        surface!.classList.add("is-ready");
        presented = true;
      }
      if (now - lastReport > 100) {
        surface!.dataset.gust = burst.toFixed(3);
        lastReport = now;
      }
      frame = requestAnimationFrame(tick);
    }
    function updateActivity() {
      if (document.hidden || !visible) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (loaded && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    }
    const artwork = new window.Image();
    artwork.onload = () => {
      if (disposed) return;
      imageAspect = artwork.width / artwork.height;
      surface.dataset.sourceWidth = String(artwork.width);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, artwork);
      loaded = true;
      resize();
      updateActivity();
    };
    artwork.onerror = onUnavailable;
    artwork.src = "/media/forest-coherent-4k.webp";
    const observer = new ResizeObserver(resize);
    observer.observe(scene);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateActivity();
    });
    visibility.observe(scene);
    document.addEventListener("visibilitychange", updateActivity);
    scene.addEventListener("pointermove", move, { passive: true });
    const contextLost = () => {
      loaded = false;
      cancelAnimationFrame(frame);
      surface.classList.remove("is-ready");
      onUnavailable();
    };
    surface.addEventListener("webglcontextlost", contextLost);
    return () => {
      disposed = true;
      artwork.onload = null;
      artwork.onerror = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", updateActivity);
      scene.removeEventListener("pointermove", move);
      surface.removeEventListener("webglcontextlost", contextLost);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [windClockRef, onUnavailable]);

  return <canvas ref={canvas} className="living-forest" aria-hidden="true" />;
}
