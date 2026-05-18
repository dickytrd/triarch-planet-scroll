'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const ThreeScene      = dynamic(() => import('@/components/ThreeScene'),      { ssr: false })
const ScrollController = dynamic(() => import('@/components/ScrollController'), { ssr: false })
const Navigation      = dynamic(() => import('@/components/Navigation'),      { ssr: false })
const Loader          = dynamic(() => import('@/components/Loader'),          { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Three.js canvas — renders immediately, provides three-ready event */}
      <ThreeScene />

      {/* Main content — always mounted so GSAP can wire up on load */}
      <Navigation />
      <ScrollController />

      {/* Loader sits on top, fades out once everything is ready */}
      <Loader onComplete={() => setLoaded(true)} />
    </>
  )
}
