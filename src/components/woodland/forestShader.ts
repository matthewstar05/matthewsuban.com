export const vertexSource = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * .5 + .5;
  gl_Position = vec4(a_position, 0., 1.);
}`;

// Displace only painted foliage and meadow regions. The mountains, path and
// large trunks stay anchored. No camera zoom or whole-image drift.
export const fragmentSource = `
precision highp float;
uniform sampler2D u_art;
uniform vec2 u_cover;
uniform vec2 u_pointer;
uniform float u_pointerWind;
uniform float u_time;
uniform float u_breeze;
uniform float u_gust;
varying vec2 v_uv;
void main() {
  vec2 screen = vec2(v_uv.x, 1. - v_uv.y);
  vec2 p = (screen - .5) * u_cover + .5;
  float crown = 1. - smoothstep(.15, .39, p.y);
  float meadow = smoothstep(.62, .88, p.y);
  float trunkLeft = 1. - smoothstep(.055, .15, abs(p.x - (.19 - p.y * .17)));
  float trunkRight = smoothstep(.86, .96, p.x) * smoothstep(.15, .45, p.y);
  float anchored = 1. - max(trunkLeft, trunkRight);
  // Smooth spatial masks keep neighboring painted pixels together. Color-keyed
  // per-pixel masks made leaf edges tear and shimmer when displaced.
  float foliage = crown * anchored;
  float pathCenter = 1.30 - p.y * .72;
  float path = 1. - smoothstep(.045, .15, abs(p.x - pathCenter));
  float grass = meadow * anchored * (1. - path);
  float nearPointer = exp(-dot(screen - u_pointer, screen - u_pointer) * 28.);
  float wind = u_breeze + u_gust * 2.4 + nearPointer * u_pointerWind;
  float branchWave = sin(u_time + p.x * 9. + p.y * 4.);
  float leafFlutter = sin(u_time * 3. + p.x * 42. + p.y * 27.);
  vec2 shift = vec2(
    foliage * (.0025 * branchWave + .0018 * wind + .0004 * leafFlutter),
    foliage * (.0011 * sin(u_time * 2. + p.x * 10.) + .0003 * wind)
  );
  shift.x += grass * (.0011 * sin(u_time * 2. + p.y * 30. + p.x * 16.) + .001 * wind);
  shift.y += grass * .00035 * sin(u_time * 3. + p.x * 24.);
  vec3 painted = texture2D(u_art, clamp(p + shift, .001, .999)).rgb;
  gl_FragColor = vec4(painted, 1.);
}`;
