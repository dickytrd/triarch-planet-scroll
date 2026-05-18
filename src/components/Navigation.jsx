'use client'

import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'section-hero',         label: 'HERO' },
  { id: 'section-intro',        label: 'INTRO' },
  { id: 'section-first-layer',  label: 'FIRST LAYER' },
  { id: 'section-middle-layer', label: 'MIDDLE LAYER' },
  { id: 'section-the-center',   label: 'THE CENTER' },
  { id: 'section-quote',        label: 'QUOTE' },
  { id: 'section-gallery',      label: 'GALLERY' },
  { id: 'section-cta',          label: 'CTA' },
]

export default function Navigation() {
  const [active, setActive] = useState(0)
  const [showLabel, setShowLabel] = useState(null)

  useEffect(() => {
    const observers = []

    SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.id)
      if (!el) return

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(i)
          })
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      // Use lenis if available, fallback to native
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        right: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        alignItems: 'flex-end',
      }}
    >
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          onMouseEnter={() => setShowLabel(i)}
          onMouseLeave={() => setShowLabel(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {showLabel === i && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: active === i ? '#f5f5f5' : '#555',
                fontFamily: 'Satoshi, sans-serif',
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </span>
          )}
          <span
            style={{
              width: active === i ? 7 : 5,
              height: active === i ? 7 : 5,
              borderRadius: '50%',
              background: active === i ? '#f5f5f5' : '#333',
              display: 'block',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          />
        </button>
      ))}
    </nav>
  )
}
