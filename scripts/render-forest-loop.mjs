// Offline renderer using the same shader as the live wind reactions.
// Usage: FFMPEG=/path/to/ffmpeg node scripts/render-forest-loop.mjs
// Output: 3840x2160, 24 fps, 16-second cyclic original-art animation.
import { chromium } from "@playwright/test";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { vertexSource, fragmentSource } from "../src/components/woodland/forestShader.ts";
import { forestBreeze, FOREST_LOOP_SECONDS } from "../src/components/woodland/forestWind.ts";
const output = "/tmp/matthew-video-tools/coherent-loop-frames";
await mkdir(output, { recursive: true });
const art = await readFile("public/media/forest-coherent-4k.webp");
const browser = await chromium.launch({
  args: process.platform === "darwin" ? ["--use-angle=metal"] : [],
});
try {
  const page = await browser.newPage({ viewport: { width: 3840, height: 2160 } });
  await page.setContent('<canvas width="3840" height="2160"></canvas>');
  await page.evaluate(
    async ({ vertexSource, fragmentSource, art }) => {
      const canvas = document.querySelector("canvas");
      const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        preserveDrawingBuffer: true,
      });
      if (!gl) throw new Error("WebGL unavailable");
      const compile = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
          throw new Error(gl.getShaderInfoLog(shader));
        return shader;
      };
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const pos = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      for (const [key, value] of [
        [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
        [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE],
        [gl.TEXTURE_MIN_FILTER, gl.LINEAR],
        [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
      ])
        gl.texParameteri(gl.TEXTURE_2D, key, value);
      const image = new Image();
      image.src = art;
      await image.decode();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.viewport(0, 0, 3840, 2160);
      gl.uniform2f(gl.getUniformLocation(program, "u_cover"), 1, 1);
      gl.uniform2f(gl.getUniformLocation(program, "u_pointer"), -2, -2);
      gl.uniform1f(gl.getUniformLocation(program, "u_pointerWind"), 0);
      gl.uniform1f(gl.getUniformLocation(program, "u_gust"), 0);
      window.renderFrame = (phase, breeze) => {
        gl.uniform1f(gl.getUniformLocation(program, "u_time"), phase);
        gl.uniform1f(gl.getUniformLocation(program, "u_breeze"), breeze);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.finish();
        return canvas.toDataURL("image/png").split(",")[1];
      };
    },
    { vertexSource, fragmentSource, art: `data:image/webp;base64,${art.toString("base64")}` },
  );
  const fps = 24,
    count = FOREST_LOOP_SECONDS * fps;
  for (let i = 0; i < count; i++) {
    const seconds = i / fps;
    const png = await page.evaluate(({ phase, breeze }) => window.renderFrame(phase, breeze), {
      phase: (seconds / FOREST_LOOP_SECONDS) * Math.PI * 2,
      breeze: forestBreeze(seconds),
    });
    await writeFile(`${output}/${String(i + 1).padStart(5, "0")}.png`, Buffer.from(png, "base64"));
    if (i % 24 === 0) console.log(`Rendered ${i}/${count}`);
  }
} finally {
  await browser.close();
}
async function encode(args) {
  const proc = spawn(
    process.env.FFMPEG || "ffmpeg",
    ["-hide_banner", "-loglevel", "warning", ...args],
    { stdio: "inherit" },
  );
  await new Promise((resolve, reject) => {
    proc.on("error", reject);
    proc.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`FFmpeg exit ${code}`))));
  });
}
await encode([
  "-framerate",
  "24",
  "-i",
  `${output}/%05d.png`,
  "-an",
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "22",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "-y",
  "public/media/forest-coherent-4k.mp4",
]);
await encode([
  "-i",
  "public/media/forest-coherent-4k.mp4",
  "-an",
  "-vf",
  "scale=1920:1080:flags=lanczos",
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "24",
  "-movflags",
  "+faststart",
  "-y",
  "public/media/forest-coherent-tablet.mp4",
]);
await encode([
  "-i",
  "public/media/forest-coherent-4k.mp4",
  "-an",
  "-vf",
  "crop=1080:2160,scale=720:1440:flags=lanczos",
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "23",
  "-movflags",
  "+faststart",
  "-y",
  "public/media/forest-coherent-mobile.mp4",
]);
console.log("Rendered and encoded all three matching loops.");
