export default function QuoteSection() {
  return (
    <section
      id="section-quote"
      className="section"
      style={{ zIndex: 10, justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ textAlign: 'center', padding: '0 48px', maxWidth: 900, width: '100%' }}>
        {/* Quote mark */}
        <div
          id="quote-mark"
          className="quote-mark"
          style={{
            marginBottom: 32,
            opacity: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          "
        </div>

        {/* Main quote */}
        <blockquote
          id="quote-text"
          className="quote-heading"
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
          }}
        >
          To know a world,
          <br />
          you must enter it.
        </blockquote>

        {/* Attribution */}
        <div
          id="quote-attr"
          style={{
            marginTop: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            opacity: 0,
          }}
        >
          <span className="h-line" />
          <span className="label-text">EXPLORATION LOG — ENTRY 001</span>
          <span className="h-line" />
        </div>
      </div>
    </section>
  )
}
