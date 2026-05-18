const GALLERY_ITEMS = [
  { id: 'g1', title: 'Terrain Alpha', tag: 'Atmospheric Study', description: 'Cinematic surface vista with a layered editorial palette and deep contrast.', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80' },
  { id: 'g2', title: 'Void Sea', tag: 'Night Exploration', description: 'A compressed vertical panel that reveals an immersive subterranean horizon.', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80' },
  { id: 'g3', title: 'Crystal Basin', tag: 'Specular Reflection', description: 'A premium art direction frame with cinematic tension and glass-like depth.', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=1920&q=80' },
  { id: 'g4', title: 'Core Edge', tag: 'Interior Dimension', description: 'A strong editorial composition anchored by rich saturation and tactile shadow.', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80' },
]

export default function GallerySection() {
  return (
    // Section TINGGI untuk scroll distance. GSAP akan handle pinning.
    <section id="section-gallery" className="relative bg-[#050505] text-white min-h-screen">
      
      {/* WRAPPER: JANGAN pakai position: sticky! GSAP akan ubah jadi fixed/absolute saat pin */}
      <div className="gallery-sticky-wrapper relative w-full h-screen overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_15%_15%,rgba(70,120,255,0.07),transparent_28%)] pointer-events-none" />

        {/* Header */}
        <div className="absolute top-8 left-6 md:top-10 md:left-10 z-20 flex items-center gap-4 pointer-events-none">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-white/60">Gallery</span>
          <span className="h-[1px] w-8 md:w-12 bg-white/20" />
          <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-white/40">04 Environments</span>
        </div>

        {/* Gallery Container */}
        <div id="gallery-container" className="relative z-10 flex items-center justify-center w-full h-full px-2 md:px-4 lg:px-0" style={{ gap: '12px' }}>
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              className="gallery-card relative overflow-hidden rounded-lg flex-shrink-0"
              style={{ height: '100%', flex: '20 20 auto' }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div id={`${item.id}-image`} className="absolute inset-0 bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.95)_100%)]" />
              </div>

              <div id={`${item.id}-caption`} className="absolute bottom-0 left-0 p-6 md:p-8 z-10">
                <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/50 mb-2">{item.tag}</div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">{item.title}</h3>
                <p className="text-xs md:text-sm text-white/60 max-w-[180px] md:max-w-[220px] leading-relaxed">{item.description}</p>
              </div>

              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white/5 z-10 pointer-events-none">0{index + 1}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-6 md:bottom-10 md:right-10 z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
            <div className="w-[1px] h-6 bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  )
}