export default function IntroSection() {
  const lines = [
    'Beyond the stars,',
    'a sphere waits.',
    'Silent. Ancient.',
    'Alive.',
  ]

  return (
    <section
      id="section-intro"
      className="relative w-full min-h-screen flex items-center justify-center text-white"
      // HAPUS inline zIndex, justifyContent, alignItems → biarkan GSAP handle pinning
    >
      <div className="text-center px-6 md:px-12 max-w-[900px] mx-auto">
        <div id="intro-lines" className="flex flex-col gap-2">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                className="intro-line heading-manifesto text-3xl md:text-5xl font-bold tracking-tight"
                data-index={i}
                style={{
                  color: i < 2 ? 'white' : 'rgba(255,255,255,0.45)',
                  // HAPUS opacity & transform inline! Biarkan GSAP yang set
                }}
              >
                {line}
              </p>
            </div>
          ))}
        </div>

        <div
          id="intro-label"
          className="mt-16 flex items-center justify-center gap-5 opacity-0"
        >
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/50">
            KONEMEX S69 — EXPLORATION LOG
          </span>
          <span className="w-8 h-[1px] bg-white/20" />
        </div>
      </div>
    </section>
  )
}