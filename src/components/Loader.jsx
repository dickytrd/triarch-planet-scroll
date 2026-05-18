'use client'

import { useEffect, useState, useRef } from 'react'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState('loading') // loading | done | hidden
  const progressRef             = useRef(0)
  const intervalRef             = useRef(null)

  useEffect(() => {
    let threeReady  = false
    let fontsReady  = false
    let minTimePassed = false

    // Simulate progress up to 85% while waiting
    intervalRef.current = setInterval(() => {
      const increment = Math.random() * 12 + 4
      progressRef.current = Math.min(progressRef.current + increment, 85)
      setProgress(Math.floor(progressRef.current))
    }, 220)

    const tryComplete = () => {
      if (!threeReady || !fontsReady || !minTimePassed) return

      clearInterval(intervalRef.current)

      // Rush to 100%
      let p = progressRef.current
      const rush = setInterval(() => {
        p = Math.min(p + 8, 100)
        progressRef.current = p
        setProgress(Math.floor(p))
        if (p >= 100) {
          clearInterval(rush)
          // Short pause at 100% before fade
          setTimeout(() => {
            setPhase('done')
            setTimeout(() => {
              setPhase('hidden')
              onComplete?.()
            }, 700)
          }, 400)
        }
      }, 40)
    }

    // Minimum display time — avoids flash on fast machines
    const minTimer = setTimeout(() => {
      minTimePassed = true
      tryComplete()
    }, 1800)

    // Wait for fonts
    document.fonts.ready.then(() => {
      fontsReady = true
      tryComplete()
    })

    // Wait for Three.js first render
    const onThreeReady = () => {
      threeReady = true
      tryComplete()
    }
    window.addEventListener('three-ready', onThreeReady, { once: true })

    // Safety fallback — never block the user forever
    const fallback = setTimeout(() => {
      threeReady = true
      fontsReady = true
      minTimePassed = true
      tryComplete()
    }, 5000)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(minTimer)
      clearTimeout(fallback)
      window.removeEventListener('three-ready', onThreeReady)
    }
  }, [])

  if (phase === 'hidden') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 52px',
        transition: phase === 'done' ? 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        opacity: phase === 'done' ? 0 : 1,
        pointerEvents: phase === 'done' ? 'none' : 'all',
      }}
    >
      {/* Top — logo */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'Satoshi, sans-serif',
          }}
        >
          KMX
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: 'Satoshi, sans-serif',
          }}
        >
          INITIALIZING
        </span>
      </div>

      {/* Center — main loader visual */}
      <div style={{ textAlign: 'center' }}>
        {/* Animated sphere-like ring */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.5)',
            margin: '0 auto 40px',
            animation: 'loaderSpin 1.2s linear infinite',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 'clamp(28px, 6vw, 72px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            fontFamily: 'Satoshi, sans-serif',
            marginBottom: 24,
          }}
        >
          KONEMEX
          <br />
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>S69</span>
        </div>

        {/* Status text */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: 'Satoshi, sans-serif',
            marginBottom: 32,
          }}
        >
          {progress < 30  && 'INITIALIZING SYSTEMS'}
          {progress >= 30 && progress < 60 && 'CALIBRATING PLANET LAYERS'}
          {progress >= 60 && progress < 85 && 'LOADING EXPLORATION DATA'}
          {progress >= 85 && 'PREPARING DESCENT'}
        </div>
      </div>

      {/* Bottom — progress */}
      <div>
        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(255,255,255,0.08)',
            marginBottom: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0, top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'rgba(255,255,255,0.6)',
              transition: 'width 0.15s ease',
            }}
          />
        </div>

        {/* Progress number + coordinates */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Satoshi, sans-serif',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(progress).padStart(3, '0')}%
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.15)',
              fontFamily: 'Satoshi, sans-serif',
            }}
          >
            39.4°N · 127.2°E · ALT 0
          </span>
        </div>
      </div>

      <style>{`
        @keyframes loaderSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
