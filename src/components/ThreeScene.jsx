'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { sphereProxy } from '@/lib/sphereProxy'
import {
  sphereVertexShader,
  sphereFragmentShader,
  coreVertexShader,
  coreFragmentShader,
} from '@/lib/shaders'

export default function ThreeScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // ── Renderer ────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // ── Scene & Camera ──────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Lights ──────────────────────────────────────────────
    const dirLight = new THREE.DirectionalLight(0xbbd4ff, 1.8)
    dirLight.position.set(4, 6, 5)
    scene.add(dirLight)

    scene.add(new THREE.AmbientLight(0x0a0a1a, 0.3))

    const pointLight = new THREE.PointLight(0x4433cc, 1.2, 20)
    pointLight.position.set(-4, 2, 3)
    scene.add(pointLight)

    const rimLight = new THREE.DirectionalLight(0x223366, 0.6)
    rimLight.position.set(-3, -2, -5)
    scene.add(rimLight)

    // ── Geometry ─────────────────────────────────────────────
    const geo = new THREE.SphereGeometry(1, 96, 96)

    // ── Solid Sphere Material ────────────────────────────────
    const solidMat = new THREE.ShaderMaterial({
      vertexShader: sphereVertexShader,
      fragmentShader: sphereFragmentShader,
      uniforms: {
        uTime:             { value: 0 },
        uNoiseStrength:    { value: 0.04 },
        uOpacity:          { value: 1.0 },
        uColor:            { value: new THREE.Color(0x8899aa) },
        uEmissive:         { value: new THREE.Color(0x000000) },
        uEmissiveStrength: { value: 0.0 },
        uFresnelStrength:  { value: 0.6 },
      },
      transparent: true,
      depthWrite: false,
    })
    const solidMesh = new THREE.Mesh(geo, solidMat)

    // ── Wireframe Overlay ────────────────────────────────────
    const wireGeo = new THREE.WireframeGeometry(geo)
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x5577aa,
      opacity: 0,
      transparent: true,
      depthWrite: false,
    })
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat)

    // ── Sphere Group ─────────────────────────────────────────
    const sphereGroup = new THREE.Group()
    sphereGroup.add(solidMesh)
    sphereGroup.add(wireMesh)
    scene.add(sphereGroup)

    // ── Core Sphere ──────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(1, 64, 64)
    const coreMat = new THREE.ShaderMaterial({
      vertexShader: coreVertexShader,
      fragmentShader: coreFragmentShader,
      uniforms: {
        uTime:    { value: 0 },
        uOpacity: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.scale.setScalar(0.001)
    scene.add(coreMesh)

    // ── INTERNAL LERP STATE ──────────────────────────────────
    // GSAP mutates sphereProxy (the TARGET values).
    // ThreeScene lerps these INTERNAL values toward the proxy each frame.
    // This is the key fix — eliminates ALL positional/morph glitches.
    const L = {
      posX: 0, posY: 0, posZ: 0,
      scale: 0.85,
      opacity: 1,
      noiseStrength: 0.04,
      wireOpacity: 0,
      coreScale: 0,
      coreOpacity: 0,
      mouseX: 0,
      mouseY: 0,
    }

    // Lerp factors
    const LF       = 0.10  // sphere position/morph — smooth but responsive
    const LF_MOUSE = 0.05  // mouse parallax — deliberately floaty

    const clock = new THREE.Clock()
    let raf
    let isFirstRender = true

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      solidMat.uniforms.uTime.value = t
      coreMat.uniforms.uTime.value  = t

      // ── Lerp every visual property ───────────────────────
      L.posX        += (sphereProxy.posX             - L.posX)        * LF
      L.posY        += (sphereProxy.posY             - L.posY)        * LF
      L.posZ        += (sphereProxy.posZ             - L.posZ)        * LF
      L.scale       += (sphereProxy.scale            - L.scale)       * LF
      L.opacity     += (sphereProxy.opacity          - L.opacity)     * LF
      L.noiseStrength += (sphereProxy.noiseStrength  - L.noiseStrength) * LF
      L.wireOpacity += (sphereProxy.wireframeOpacity - L.wireOpacity) * LF
      L.coreScale   += (sphereProxy.coreScale        - L.coreScale)   * LF
      L.coreOpacity += (sphereProxy.coreOpacity      - L.coreOpacity) * LF
      L.mouseX      += (sphereProxy.targetMouseX     - L.mouseX)      * LF_MOUSE
      L.mouseY      += (sphereProxy.targetMouseY     - L.mouseY)      * LF_MOUSE

      // ── Float + parallax ─────────────────────────────────
      const floatY   = Math.sin(t * 0.45) * 0.10
      const parallaxX = sphereProxy.mouseParallax ? L.mouseX * 0.35 : 0
      const parallaxY = sphereProxy.mouseParallax ? L.mouseY * 0.20 : 0

      // ── Apply to group ────────────────────────────────────
      sphereGroup.position.set(L.posX + parallaxX, L.posY + floatY + parallaxY, L.posZ)
      sphereGroup.scale.setScalar(Math.max(0.001, L.scale))
      sphereGroup.rotation.y += 0.0015 * sphereProxy.rotSpeed
      sphereGroup.rotation.x += 0.0003 * sphereProxy.rotSpeed

      // ── Uniforms ─────────────────────────────────────────
      solidMat.uniforms.uOpacity.value       = Math.max(0, L.opacity)
      solidMat.uniforms.uNoiseStrength.value = L.noiseStrength
      wireMat.opacity                        = Math.max(0, L.wireOpacity)

      // ── Visibility guards ─────────────────────────────────
      solidMesh.visible = sphereProxy.visible && L.opacity > 0.005
      wireMesh.visible  = sphereProxy.visible && L.wireOpacity > 0.005

      // ── Core sphere ───────────────────────────────────────
      coreMesh.scale.setScalar(Math.max(0.001, L.coreScale))
      coreMat.uniforms.uOpacity.value = Math.max(0, L.coreOpacity)
      coreMesh.visible = L.coreOpacity > 0.005
      if (coreMesh.visible) {
        coreMesh.position.set(L.posX + parallaxX, L.posY + floatY + parallaxY, L.posZ)
        coreMesh.rotation.y -= 0.002
        coreMesh.rotation.z += 0.001
      }

      renderer.render(scene, camera)

      // Notify loader that Three.js is live
      if (isFirstRender) {
        isFirstRender = false
        window.dispatchEvent(new CustomEvent('three-ready'))
      }
    }

    animate()

    // ── Mouse tracking ───────────────────────────────────────
    const onMouseMove = (e) => {
      sphereProxy.targetMouseX =  (e.clientX / window.innerWidth  - 0.5) * 2
      sphereProxy.targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ──────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geo.dispose(); solidMat.dispose()
      wireGeo.dispose(); wireMat.dispose()
      coreGeo.dispose(); coreMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 1, pointerEvents: 'none',
      }}
    />
  )
}
