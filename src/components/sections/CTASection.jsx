export default function CTASection() {
  return (
    <section
      id="section-cta"
      className="section"
      style={{
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        padding: '0 0 60px',
      }}
    >
      {/* Main CTA text — bottom */}
      <div
        style={{
          padding: '0 52px',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {/* Tag */}
        <div
          id="cta-tag"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
            opacity: 0,
          }}
        >
          <span className="label-text" style={{ color: 'var(--grey-dim)' }}>
            END OF DESCENT
          </span>
          <span style={{ width: 40, height: 1, background: 'var(--border)', display: 'block' }} />
          <span className="label-text" style={{ color: 'var(--grey-dim)' }}>
            KONEMEX S69
          </span>
        </div>

        {/* Massive CTA heading */}
        <div style={{ overflow: 'hidden' }}>
          <h2
            className="heading-hero"
            id="cta-heading"
            style={{
              fontSize: 'clamp(44px, 8.5vw, 130px)',
              opacity: 0,
              transform: 'translateY(120px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.88,
            }}
          >
            LIVE LIKE
            <br />
            HEAVEN
            <br />
            <span style={{ color: 'var(--grey-dim)', WebkitTextStroke: '1px var(--grey-dim)', WebkitTextFillColor: 'transparent' }}>
              START HERE
            </span>
          </h2>
        </div>

        {/* Subtext + button row */}
        <div
          id="cta-sub"
          style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            opacity: 0,
          }}
        >
          <div>
            <p className="body-text" style={{ maxWidth: 300, marginBottom: 20 }}>
              You have reached the center. The planet has been
              fully traversed. Begin your ascent — or descend
              again.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-outline">Begin Again</button>
              <button
                className="btn-outline"
                style={{ borderColor: 'transparent', color: 'var(--grey)' }}
              >
                Exit Konemex
              </button>
            </div>
          </div>

          {/* Coordinates block */}
          <div style={{ textAlign: 'right' }}>
            <div className="coord-badge" style={{ marginBottom: 8 }}>
              39.4°N · 127.2°E
            </div>
            <div className="coord-badge">ALT −5,400 KM · CORE DEPTH</div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: 'var(--grey)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'Satoshi, sans-serif',
                }}
                onClick={() => {
                  if (window.__lenis) {
                    window.__lenis.scrollTo(0)
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
              >
                KEEP SCROLL
                <span
                  style={{
                    display: 'inline-block',
                    width: 24,
                    height: 1,
                    background: 'var(--grey)',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        id="cta-footer"
        style={{
          marginTop: 40,
          padding: '20px 52px 0',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 0,
        }}
      >
        <span className="label-text">© 2024 KONEMEX EXPLORATION PROJECT</span>
        <span className="label-text" style={{ color: 'var(--grey-dim)' }}>
          ALL RIGHTS RESERVED
        </span>
      </div>
    </section>
  )
}
