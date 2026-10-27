import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { SITIO, datosEstructurados } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

const PORTADA = "/images/portafolio/01 Retrato/01.jpg"

export const metadata: Metadata = {
  // Hace que las rutas relativas de abajo se resuelvan contra el dominio real.
  metadataBase: new URL(SITIO.url),
  title: {
    default: `${SITIO.nombre} — Estudio de fotografía en Cercado de Lima`,
    template: `%s — ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  applicationName: SITIO.nombre,
  authors: [{ name: SITIO.fundador }],
  creator: SITIO.fundador,
  publisher: SITIO.nombre,
  keywords: [
    "estudio de fotografía Lima",
    "fotógrafo Cercado de Lima",
    "sesión de fotos Lima",
    "fotografía de retrato Lima",
    "fotos para LinkedIn Lima",
    "fotografía de producto Lima",
    "fotografía gastronómica Lima",
    "sesión de mascotas Lima",
    "Roegut Lab",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITIO.url,
    siteName: SITIO.nombre,
    title: `${SITIO.nombre} — Estudio de fotografía en Cercado de Lima`,
    description: SITIO.descripcion,
    images: [{ url: PORTADA, width: 1080, height: 1350, alt: `Retrato por ${SITIO.nombre}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITIO.nombre} — Estudio de fotografía en Cercado de Lima`,
    description: SITIO.descripcion,
    images: [PORTADA],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "photography",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-PE" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <script
          type="application/ld+json"
          // Contenido propio y estatico, no entra nada del usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados()) }}
        />
      </body>
    </html>
  )
}
