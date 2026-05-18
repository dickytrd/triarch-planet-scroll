export default function HeroSection() {
  return (
    <section id="section-hero" className="section" style={{ zIndex: 10 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: 32,
            pointerEvents: 'auto',
          }}
        >
          <span className="label-text" style={{ letterSpacing: '0.2em' }}>
            KMX
          </span>
          <div style={{ display: 'flex', gap: 40 }}>
            <span className="label-text">EXPLORE</span>
            <span className="label-text">LAB</span>
            <span className="label-text">LOG</span>
          </div>
        </div>

        {/* Hero heading — centered */}
        <div
          id="hero-heading"
          style={{
            position: 'absolute',
            left: '50%',
            top: '25%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            padding: '0 20px',
            pointerEvents: 'none',
            mixBlendMode: 'difference',
          }}
        >
          <h1 className="heading-hero" id="hero-title">
            TRIARCH -01
          </h1>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: 40,
            pointerEvents: 'auto',
          }}
        >
          {/* Left — subtext */}
          <div style={{ maxWidth: 300 }}>
            <p className="body-text" id="hero-subtext">
              A new world beyond the void.
              <br />
              Discover the layers of an uncharted planet.
            </p>
          </div>

          {/* Right — CTAs */}
          <div style={{ display: 'flex', gap: 16 }}>
            <button className="btn-outline" id="hero-cta-1">
              Begin Descent
            </button>
            <button
              className="btn-outline"
              id="hero-cta-2"
              style={{ borderColor: 'transparent', color: 'var(--grey)' }}
            >
              Explore Map
            </button>
          </div>
        </div>

        {/* Coordinates badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <span className="coord-badge">39.4°N · 127.2°E · ALT 0</span>
        </div>
      </div>
    </section>
  )
}
