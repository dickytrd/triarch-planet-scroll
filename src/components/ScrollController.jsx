'use client'

import { useEffect } from 'react'
import HeroSection from './sections/HeroSection'
import IntroSection from './sections/IntroSection'
import FirstLayerSection from './sections/FirstLayerSection'
import MiddleLayerSection from './sections/MiddleLayerSection'
import TheCenterSection from './sections/TheCenterSection'
import QuoteSection from './sections/QuoteSection'
import GallerySection from './sections/GallerySection'
import CTASection from './sections/CTASection'
import { sphereProxy } from '@/lib/sphereProxy'

export default function ScrollController() {
  useEffect(() => {
    let gsapInst, STInst, lenisInst, lenisRafFn

    const init = async () => {
      const gsapMod  = await import('gsap')
      const stMod    = await import('gsap/ScrollTrigger')
      const lenisMod = await import('lenis')

      const gsap          = gsapMod.default
      const ScrollTrigger = stMod.ScrollTrigger
      const Lenis         = lenisMod.default

      gsapInst = gsap
      STInst   = ScrollTrigger

      gsap.registerPlugin(ScrollTrigger)
      const cinematicEase = 'cubic-bezier(0.22, 1, 0.36, 1)'

      // ─ LENIS (Smooth Scroll) ──────────────────────────────
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
      })
      window.__lenis = lenis
      lenisInst = lenis

      lenis.on('scroll', ScrollTrigger.update)
      const lenisRaf = (time) => lenis.raf(time * 1000)
      lenisRafFn = lenisRaf
      gsap.ticker.add(lenisRaf)
      gsap.ticker.lagSmoothing(0)

      // ── INITIAL SPHERE STATE ────────────────────────────────
      sphereProxy.posX             = 0
      sphereProxy.posY             = 0
      sphereProxy.posZ             = 0
      sphereProxy.scale            = 1.5
      sphereProxy.opacity          = 1
      sphereProxy.noiseStrength    = 0.04
      sphereProxy.wireframeOpacity = 0
      sphereProxy.coreScale        = 0
      sphereProxy.coreOpacity      = 0
      sphereProxy.mouseParallax    = true
      sphereProxy.rotSpeed         = 0.8
      sphereProxy.visible          = true

      // ✅ Snappy scrub: 1.0 = smooth tapi cepat. Ganti ke `true` jika ingin 1:1 instant
      const sphereScrub = 1.0

      // ────────────────────────────────────────────────────────
      // S1 — HERO (time-based entrance)
      // ────────────────────────────────────────────────────────
      gsap.set(['#hero-title', '#hero-subtext', '#hero-cta-1', '#hero-cta-2'], {
        opacity: 0, y: 40,
      })
      gsap.to('#hero-title',   { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.4 })
      gsap.to('#hero-subtext', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.75 })
      gsap.to(['#hero-cta-1', '#hero-cta-2'], {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 1.0,
      })

      // ────────────────────────────────────────────────────────
      // S2 — INTRO (PINNED + STAGGER REVEAL)
      // ────────────────────────────────────────────────────────
      if (ScrollTrigger.getById('intro-st')) return

      gsap.set('.intro-line', { opacity: 0, y: 60 })
      gsap.set('#intro-label', { opacity: 0 })

      const introTl = gsap.timeline({
        scrollTrigger: {
          id: 'intro-st',
          trigger: '#section-intro',
          start: 'top+=25 top',
          end: '+=220%',
          pin: true,
          pinSpacing: true,
          pinType: 'transform',
          scrub: 1.6,
          anticipatePin: 0.35,
          invalidateOnRefresh: true,
        },
      })

      introTl.from('#section-intro', { opacity: 0.97, scale: 0.998, duration: 0.25, ease: 'power2.out' }, 0)

      document.querySelectorAll('.intro-line').forEach((line, i) => {
        introTl.to(line, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i * 0.25)
      })

      introTl.to('#intro-label', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.15')

      gsap.to(sphereProxy, {
        noiseStrength: 0.06,
        rotSpeed: 0.9,
        scrollTrigger: { trigger: '#section-intro', start: 'top bottom', end: 'top 30%', scrub: sphereScrub },
      })

      // ────────────────────────────────────────────────────────
      // S3 — FIRST LAYER
      // ────────────────────────────────────────────────────────
      gsap.set(['#fl-tag', '#fl-heading', '#fl-body', '#fl-data'], { opacity: 0, y: 40 })
      gsap.to('#fl-tag',     { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-first-layer', start: 'top 72%', end: 'top 50%', scrub: 1.5 } })
      gsap.to('#fl-heading', { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-first-layer', start: 'top 68%', end: 'top 44%', scrub: 1.5 } })
      gsap.to('#fl-body',    { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-first-layer', start: 'top 62%', end: 'top 38%', scrub: 1.5 } })
      gsap.to('#fl-data',    { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-first-layer', start: 'top 55%', end: 'top 30%', scrub: 1.5 } })

      // ✅ SPHERE: Move to RIGHT (fast & snappy)
      gsap.to(sphereProxy, {
        posX: 2.3,
        scale: 2,
        noiseStrength: 0.12,
        rotSpeed: 1.0,
        scrollTrigger: {
          trigger: '#section-first-layer',
          start: 'top 80%',  // Mulai gerak pas section masuk
          end: 'top 30%',    // Sampai posisi pas section center
          scrub: sphereScrub,
        },
      })

      // ────────────────────────────────────────────────────────
      // S4 — MIDDLE LAYER
      // ────────────────────────────────────────────────────────
      gsap.set(['#ml-tag', '#ml-heading', '#ml-body', '#ml-data'], { opacity: 0, y: 40 })
      gsap.to('#ml-tag',     { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-middle-layer', start: 'top 72%', end: 'top 50%', scrub: 1.5 } })
      gsap.to('#ml-heading', { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-middle-layer', start: 'top 68%', end: 'top 44%', scrub: 1.5 } })
      gsap.to('#ml-body',    { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-middle-layer', start: 'top 62%', end: 'top 38%', scrub: 1.5 } })
      gsap.to('#ml-data',    { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-middle-layer', start: 'top 55%', end: 'top 30%', scrub: 1.5 } })

      // ✅ SPHERE: Move to LEFT
      gsap.to(sphereProxy, {
        posX: -2.3,
        scale: 2,
        wireframeOpacity: 0.5,
        opacity: 0.25,
        noiseStrength: 0.08,
        rotSpeed: 0.7,
        overwrite: false,
        scrollTrigger: {
          trigger: '#section-middle-layer',
          start: 'top 85%',
          end: 'top 30%',
          scrub: sphereScrub,
          invalidateOnRefresh: false,
        },
      })

      // ────────────────────────────────────────────────────────
      // S5 — THE CENTER
      // ────────────────────────────────────────────────────────
      gsap.set(['#tc-tag', '#tc-heading', '#tc-body', '#tc-temp'], { opacity: 0, y: 40 })
      gsap.to('#tc-tag',     { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-the-center', start: 'top 72%', end: 'top 50%', scrub: 1.5 } })
      gsap.to('#tc-heading', { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-the-center', start: 'top 68%', end: 'top 44%', scrub: 1.5 } })
      gsap.to('#tc-body',    { opacity: 1,       scrollTrigger: { trigger: '#section-the-center', start: 'top 62%', end: 'top 38%', scrub: 1.5 } })
      gsap.to('#tc-temp',    { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-the-center', start: 'top 52%', end: 'top 28%', scrub: 1.5 } })

      gsap.to('#core-glow-container', {
        opacity: 1,
        scrollTrigger: { trigger: '#section-the-center', start: 'top 55%', end: 'top 20%', scrub: sphereScrub },
      })

      // ✅ SPHERE: Move back to RIGHT
      gsap.to(sphereProxy, {
        posX: 2.3,
        scale: 2,
        wireframeOpacity: 0.1,
        opacity: 0.15,
        rotSpeed: 0.6,
        overwrite: false,
        scrollTrigger: {
          trigger: '#section-the-center',
          start: 'top 75%',
          end: 'top 30%',
          scrub: sphereScrub,
          invalidateOnRefresh: false,
        },
      })

      gsap.to(sphereProxy, {
        coreScale: 0.9,
        coreOpacity: 1,
        overwrite: false,
        scrollTrigger: { trigger: '#section-the-center', start: 'top 40%', end: 'top 10%', scrub: sphereScrub },
      })

      // ────────────────────────────────────────────────────────
      // S6 — QUOTE (PINNED)
      // ────────────────────────────────────────────────────────
      if (ScrollTrigger.getById('quote-st')) return

      gsap.set(['#quote-mark', '#quote-text', '#quote-attr'], { opacity: 0, y: 40 })

      const quoteTl = gsap.timeline({
        scrollTrigger: {
          id: 'quote-st',
          trigger: '#section-quote',
          start: 'top+=25 top',
          end: '+=120%',
          pin: true,
          pinSpacing: true,
          pinType: 'transform',
          scrub: 1.6,
          anticipatePin: 0.35,
          invalidateOnRefresh: true,
        },
      })

      quoteTl.from('#section-quote', { opacity: 0.97, scale: 0.998, duration: 0.25, ease: 'power2.out' }, 0)
      quoteTl
        .to('#quote-mark', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .to('#quote-text', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.15)
        .to('#quote-attr', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.35)

      // ✅ SPHERE: Return to CENTER
      gsap.to(sphereProxy, {
        posX: 0,
        scale: 1.5,
        coreScale: 0,
        opacity: 1,
        noiseStrength: 0.04,
        rotSpeed: 0.5,
        overwrite: false,
        scrollTrigger: {
          trigger: '#section-quote',
          start: 'top 75%',
          end: 'top 10%',
          scrub: sphereScrub,
          invalidateOnRefresh: false,
        },
      })

      gsap.to('#core-glow-container', {
        opacity: 0,
        scrollTrigger: { trigger: '#section-quote', start: 'top 80%', end: 'top 50%', scrub: sphereScrub },
      })

      // ────────────────────────────────────────────────────────
      // S7 — GALLERY (CINEMATIC ACCORDION + HOLD ZONE)
      // ────────────────────────────────────────────────────────
      if (ScrollTrigger.getById('gallery-st')) return

      gsap.set('#g1', { width: '60%', filter: 'grayscale(0) blur(0px)', opacity: 1 })
      gsap.set(['#g2', '#g3', '#g4'], { width: '10%', filter: 'grayscale(1) blur(2px)', opacity: 0.25 })
      gsap.set(['#g1-image', '#g2-image', '#g3-image', '#g4-image'], { scale: 1.05 })
      gsap.set(['#g1-caption', '#g2-caption', '#g3-caption', '#g4-caption'], { opacity: 0, y: 30 })
      gsap.set('#g1-caption', { opacity: 1, y: 0 })

      const galleryTl = gsap.timeline({
        scrollTrigger: {
          id: 'gallery-st',
          trigger: '#section-gallery',
          start: 'top top',
          end: '+=500%',
          pin: true,
          pinSpacing: true,
          pinType: 'transform',
          scrub: 1.6,
          anticipatePin: 0.35,
          invalidateOnRefresh: true,
        },
      })

      // ✅ HOLD ZONE
      galleryTl.to({}, { duration: 0.4 }, 0)
      galleryTl.from('.gallery-sticky-wrapper', { opacity: 1, scale: 0.998, duration: 0.25, ease: 'power2.out' }, 0)

      // Transition 1
      galleryTl.to('#g1', { width: '10%', filter: 'grayscale(1) blur(2px)', opacity: 0.25, duration: 1.2, ease: cinematicEase }, 0.4)
               .to('#g2', { width: '60%', filter: 'grayscale(0) blur(0px)', opacity: 1, duration: 1.2, ease: cinematicEase }, 0.4)
               .to('#g1-image', { scale: 1.05, duration: 1.2, ease: cinematicEase }, 0.4)
               .to('#g2-image', { scale: 1.15, duration: 1.2, ease: cinematicEase }, 0.4)
               .to('#g1-caption', { opacity: 0, y: 20, duration: 0.6, ease: cinematicEase }, 0.4)
               .to('#g2-caption', { opacity: 1, y: 0, duration: 0.7, ease: cinematicEase }, 1.2)

      // Transition 2
      galleryTl.to('#g2', { width: '10%', filter: 'grayscale(1) blur(2px)', opacity: 0.25, duration: 1.2, ease: cinematicEase }, 2.2)
               .to('#g3', { width: '60%', filter: 'grayscale(0) blur(0px)', opacity: 1, duration: 1.2, ease: cinematicEase }, 2.2)
               .to('#g2-image', { scale: 1.05, duration: 1.2, ease: cinematicEase }, 2.2)
               .to('#g3-image', { scale: 1.15, duration: 1.2, ease: cinematicEase }, 2.2)
               .to('#g2-caption', { opacity: 0, y: 20, duration: 0.6, ease: cinematicEase }, 2.2)
               .to('#g3-caption', { opacity: 1, y: 0, duration: 0.7, ease: cinematicEase }, 2.6)

      // Transition 3
      galleryTl.to('#g3', { width: '10%', filter: 'grayscale(1) blur(2px)', opacity: 0.25, duration: 1.2, ease: cinematicEase }, 3.6)
               .to('#g4', { width: '60%', filter: 'grayscale(0) blur(0px)', opacity: 1, duration: 1.2, ease: cinematicEase }, 3.6)
               .to('#g3-image', { scale: 1.05, duration: 1.2, ease: cinematicEase }, 3.6)
               .to('#g4-image', { scale: 1.15, duration: 1.2, ease: cinematicEase }, 3.6)
               .to('#g3-caption', { opacity: 0, y: 20, duration: 0.6, ease: cinematicEase }, 3.6)
               .to('#g4-caption', { opacity: 1, y: 0, duration: 0.7, ease: cinematicEase }, 4.0)

      galleryTl.to({}, { duration: 0.6 }, 5.2)

      // ✅ SPHERE: Return to CENTER
      gsap.to(sphereProxy, {
        posX: 0,
        scale: 5,
        coreScale: 0,
        opacity: 1,
        noiseStrength: 0.04,
        rotSpeed: 0.5,
          overwrite: false,
        scrollTrigger: {
          trigger: '#section-gallery',
          start: 'top 90%',
          end: 'top 30%',
          scrub: sphereScrub,
          invalidateOnRefresh: false,

        },
      })

      // ────────────────────────────────────────────────────────
      // S8 — CTA (sphere rebirth)
      // ───────────────────────────────────────────────────────
      gsap.set(['#cta-tag', '#cta-heading', '#cta-sub', '#cta-footer'], { opacity: 0, y: 40 })
      gsap.to('#cta-tag',     { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-cta', start: 'top 70%', end: 'top 50%', scrub: 1.5 } })
      gsap.to('#cta-heading', { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-cta', start: 'top 65%', end: 'top 35%', scrub: 1.5 } })
      gsap.to('#cta-sub',     { opacity: 1, y: 0, scrollTrigger: { trigger: '#section-cta', start: 'top 50%', end: 'top 20%', scrub: 1.5 } })
      gsap.to('#cta-footer',  { opacity: 1,       scrollTrigger: { trigger: '#section-cta', start: 'top 40%', end: 'top 15%', scrub: 1.5 } })

      gsap.to(sphereProxy, {
        scale: 1.5,
        opacity: 1,
        rotSpeed: 1.0,
        noiseStrength: 0.04,
        overwrite: false,
        scrollTrigger: {
          trigger: '#section-cta',
          start: 'top 60%',
          end: 'top 20%',
          scrub: sphereScrub,
            invalidateOnRefresh: false,
          onEnter: () => { sphereProxy.visible = true; sphereProxy.mouseParallax = true },
          onLeaveBack: () => { sphereProxy.visible = true; sphereProxy.mouseParallax = true },
        },
      })

      // ── Refresh after all triggers registered ──────────────
      setTimeout(() => ScrollTrigger.refresh(), 100)
    }

    init()

    return () => {
      gsapInst?.ticker?.remove(lenisRafFn)
      lenisInst?.destroy()
      STInst?.getAll().forEach((t) => t.kill())
      delete window.__lenis
    }
  }, [])

  return (
    <main id="main" style={{ position: 'relative', zIndex: 10 }}>
      <HeroSection />
      <IntroSection />
      <FirstLayerSection />
      <MiddleLayerSection />
      <TheCenterSection />
      <QuoteSection />
      <GallerySection />
      <CTASection />
    </main>
  )
}