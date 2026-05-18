/**
 * sphereProxy — shared mutable state object
 *
 * GSAP animates these values via ScrollTrigger scrub.
 * ThreeScene reads them every RAF frame.
 * No React state — direct mutation for max performance.
 */
export const sphereProxy = {
  // ── World position (Three.js units) ──────────────────────
  posX: 0,
  posY: 0,
  posZ: 0,

  // ── Uniform scale of entire sphere group ─────────────────
  scale: 0.85,

  // ── Solid mesh opacity ────────────────────────────────────
  opacity: 1.0,

  // ── Surface noise displacement strength ──────────────────
  noiseStrength: 0.04,

  // ── Wireframe overlay opacity (0 = off, 1 = full wires) ──
  wireframeOpacity: 0.0,

  // ── Inner core sphere ─────────────────────────────────────
  coreScale: 0.0,
  coreOpacity: 0.0,

  // ── Mouse parallax (lerped internally in ThreeScene) ──────
  mouseX: 0,
  mouseY: 0,
  targetMouseX: 0,
  targetMouseY: 0,

  // ── Feature flags ─────────────────────────────────────────
  visible: true,
  mouseParallax: true,

  // ── Rotation speed multiplier ─────────────────────────────
  rotSpeed: 1.0,
}
