export default function MiddleLayerSection() {
  return (
    <section id="section-middle-layer" className="section" style={{ zIndex: 10 }}>
      <div
        style={{
          position: 'absolute',
          right: 52,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: '40vw',
          textAlign: 'right',
        }}
      >
        {/* Layer tag */}
        <div
          id="ml-tag"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, marginBottom: 28, opacity: 0 }}
        >
          <span className="label-text" style={{ color: 'var(--grey-dim)' }}>LAYER 02</span>
          <span style={{ width: 32, height: 1, background: 'var(--border)', display: 'block' }} />
          <span className="label-text" style={{ color: 'var(--grey-dim)' }}>MANTLE</span>
        </div>

        {/* Heading */}
        <div style={{ overflow: 'hidden', marginBottom: 24 }}>
          <h2
            className="heading-section"
            id="ml-heading"
            style={{ opacity: 0, transform: 'translateY(80px)' }}
          >
            MIDDLE
            <br />
            LAYER
          </h2>
        </div>

        {/* Body */}
        <div style={{ overflow: 'hidden' }}>
          <p
            className="body-text"
            id="ml-body"
            style={{ opacity: 0, transform: 'translateY(30px)', maxWidth: '100%', marginLeft: 'auto' }}
          >
            Beneath the shell, geometry breathes. A skeleton
            of light. Semi-molten rock and crystalline
            formations stretch for thousands of kilometers —
            a structure as precise as mathematics itself.
          </p>
        </div>

        {/* Data points */}
        <div
          id="ml-data"
          style={{
            marginTop: 48,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            opacity: 0,
            alignItems: 'flex-end',
          }}
        >
          {[
            { label: 'DEPTH', value: '42 — 2,890 KM' },
            { label: 'TEMP', value: '1,300 — 3,700°C' },
            { label: 'STATE', value: 'SEMI-PLASTIC SOLID' },
          ].map((d) => (
            <div
              key={d.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border)',
                paddingBottom: 10,
                width: 320,
                gap: 20,
              }}
            >
              <span className="label-text">{d.label}</span>
              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--white)' }}>
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
