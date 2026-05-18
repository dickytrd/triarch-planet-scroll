export default function FirstLayerSection() {
  return (
    <section id="section-first-layer" className="section" style={{ zIndex: 10 }}>
      <div
        style={{
          position: 'absolute',
          left: 52,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: '40vw',
        }}
      >
        {/* Layer tag */}
        <div
          id="fl-tag"
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, opacity: 0 }}
        >
          <span className="label-text" style={{ color: 'var(--grey-dim)' }}>
            LAYER 01
          </span>
          <span
            style={{
              width: 32,
              height: 1,
              background: 'var(--border)',
              display: 'block',
            }}
          />
          <span className="label-text" style={{ color: 'var(--grey-dim)' }}>
            SURFACE
          </span>
        </div>

        {/* Heading */}
        <div style={{ overflow: 'hidden', marginBottom: 24 }}>
          <h2
            className="heading-section"
            id="fl-heading"
            style={{ opacity: 0, transform: 'translateY(80px)' }}
          >
            FIRST
            LAYER
          </h2>
        </div>

        {/* Body */}
        <div style={{ overflow: 'hidden' }}>
          <p
            className="body-text"
            id="fl-body"
            style={{ opacity: 0, transform: 'translateY(30px)', }}
          >
            A crust of memory and time. Where silence meets
            the sky. The outermost shell of Konemex S69 —
            scarred by aeons of cosmic radiation and impact
            events, yet perfectly preserved.
          </p>
        </div>

        {/* Data points */}
        <div
          id="fl-data"
          style={{
            marginTop: 48,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            opacity: 0,
          }}
        >
          {[
            { label: 'DEPTH', value: '0 — 42 KM' },
            { label: 'TEMP', value: '−60°C' },
            { label: 'COMPOSITION', value: 'SILICATE + IRON OXIDE' },
          ].map((d) => (
            <div
              key={d.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border)',
                paddingBottom: 10,
              }}
            >
              <span className="label-text">{d.label}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'var(--white)',
                }}
              >
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
