/**
 * Custom GLSL shaders for the Konemex S69 sphere.
 *
 * Features:
 *  - 3D Simplex noise for organic surface displacement
 *  - Fresnel rim lighting for sci-fi edge glow
 *  - uTime for subtle idle breathing animation
 *  - uNoiseStrength to morph from smooth → rough surface
 *  - uOpacity for transparent transitions
 *  - uEmissive for warm core glow
 */

export const sphereVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uNoiseStrength;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  // ── Simplex 3D Noise ─────────────────────────────────────
  vec3 mod289v3(vec3 x) { return x - floor(x*(1./289.))*289.; }
  vec4 mod289v4(vec4 x) { return x - floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x)  { return mod289v4(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1./6., 1./3.);
    const vec4 D = vec4(0., 0.5, 1., 2.);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1. - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289v3(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0., i1.z, i2.z, 1.))
      + i.y + vec4(0., i1.y, i2.y, 1.))
      + i.x + vec4(0., i1.x, i2.x, 1.));

    float n_ = .142857142857;
    vec3  ns  = n_ * D.wyz - D.xzx;

    vec4 j  = p - 49. * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7. * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1. - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.+1.;
    vec4 s1 = floor(b1)*2.+1.;
    vec4 sh = -step(h, vec4(0.));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.);
    m = m * m;
    return 42. * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  // ─────────────────────────────────────────────────────────

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;

    vec3 pos = position;

    // Layered noise for organic surface
    float n1 = snoise(pos * 2.0  + uTime * 0.12);
    float n2 = snoise(pos * 4.5  + uTime * 0.08) * 0.4;
    float n3 = snoise(pos * 10.0 + uTime * 0.05) * 0.15;
    float noise = (n1 + n2 + n3) * uNoiseStrength;

    pos += normal * noise;
    vPosition = (modelMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const sphereFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform vec3  uColor;
  uniform vec3  uEmissive;
  uniform float uEmissiveStrength;
  uniform float uFresnelStrength;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    // View direction for Fresnel
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.5);

    // Base surface color with subtle variation
    vec3 col = uColor;

    // Fresnel rim — cool blue sci-fi edge
    col += fresnel * uFresnelStrength * vec3(0.25, 0.45, 1.0);

    // Emissive (used for core glow bleed)
    col += uEmissive * uEmissiveStrength;

    // Subtle pulsing brightness
    float pulse = 1.0 + sin(uTime * 0.8) * 0.03;
    col *= pulse;

    gl_FragColor = vec4(col, uOpacity);
  }
`

export const coreFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.0);

    // Warm core gradient: deep orange center → gold edge
    vec3 innerCol = vec3(1.0, 0.35, 0.05);
    vec3 outerCol = vec3(1.0, 0.65, 0.1);
    vec3 col = mix(innerCol, outerCol, fresnel);

    // Add fresnel glow halo
    col += fresnel * vec3(1.0, 0.8, 0.2) * 0.6;

    // Pulsing energy
    float pulse = 1.0 + sin(uTime * 2.0) * 0.08;
    col *= pulse;

    gl_FragColor = vec4(col, uOpacity);
  }
`

export const coreVertexShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
