export default function TheCenterSection() {
  return (
    <section id="section-the-center" className="section" style={{ zIndex: 10 }}>
      {/* CSS glow rings — purely decorative, positioned to match sphere */}
      <div
        id="core-glow-container"
        style={{
          position: 'absolute',
          right: '25%',
          top: '50%',
          transform: 'translate(50%, -50%)',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 2,
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,140,0,0.18) 0%, rgba(255,80,0,0.06) 50%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            animation: 'pulseGlow 3s ease-in-out infinite',
          }}
        />
        {/* Mid ring */}
        <div
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,160,0,0.25) 0%, rgba(255,80,0,0.1) 50%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            animation: 'pulseGlow 2.4s ease-in-out infinite 0.4s',
          }}
        />
      </div>

      {/* CSS animation keyframes */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50%       { transform: translate(-50%, -50%) scale(1.08); opacity: 0.7; }
        }
      `}</style>

      {/* Text content — left side */}
      <div
        style={{
          position: 'absolute',
          left: 52,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: '40vw',
          zIndex: 20,
        }}
      >
        {/* Tag */}
        <div
          id="tc-tag"
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, opacity: 0 }}
        >
          <span className="label-text" style={{ color: 'var(--grey-dim)' }}>LAYER 03</span>
          <span style={{ width: 32, height: 1, background: 'var(--border)', display: 'block' }} />
          <span className="label-text" style={{ color: 'var(--core-gold)' }}>CORE</span>
        </div>

        {/* Heading */}
        <div style={{ overflow: 'hidden', marginBottom: 24 }}>
          <h2
            className="heading-section"
            id="tc-heading"
            style={{ opacity: 0, transform: 'translateY(80px)', color: 'var(--white)' }}
          >
            THE
            <br />
            <span style={{ color: 'var(--core-gold)' }}>CENTER</span>
          </h2>
        </div>

        {/* Body */}
        <p
          className="body-text"
          id="tc-body"
          style={{ opacity: 0, maxWidth: '100%' }}
        >
          The heart untouched. A sun imprisoned in stone.
          Konemex S69's core burns at temperatures that
          rival stellar interiors — a preserved fragment of
          its original formation, perfectly intact.
        </p>

        {/* Temperature readout */}
        <div
          id="tc-temp"
          style={{
            marginTop: 48,
            padding: '24px 28px',
            border: '1px solid rgba(255, 140, 0, 0.2)',
            background: 'rgba(255, 100, 0, 0.04)',
            opacity: 0,
            maxWidth: 280,
          }}
        >
          <div className="label-text" style={{ color: 'var(--grey-dim)', marginBottom: 8 }}>
            CORE TEMPERATURE
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--core-gold)',
            }}
          >
            5,400°C
          </div>
          <div className="label-text" style={{ marginTop: 6, color: 'var(--grey-dim)' }}>
            SOLID IRON-NICKEL ALLOY
          </div>
        </div>
      </div>
    </section>
  )
}
