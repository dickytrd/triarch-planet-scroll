import './globals.css'

export const metadata = {
  title: 'TRIARCH -01 — Planet Exploration',
  description: 'A new world beyond the void. Discover the layers of an uncharted planet.',
  keywords: 'triarch, planet, exploration, sci-fi, space',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
