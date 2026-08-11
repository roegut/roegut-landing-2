"use client"

import { motion } from "framer-motion"
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel"

const slides: CoverflowSlide[] = [
  { src: "/images/retrato-1.jpg", alt: "Retrato 1" },
  { src: "/images/retrato-2.jpg", alt: "Retrato 2" },
  { src: "/images/retrato-3.jpg", alt: "Retrato 3" },
  { src: "/images/retrato-4.jpg", alt: "Retrato 4" },
  { src: "/images/retrato-5.jpg", alt: "Retrato 5" },
  { src: "/images/retrato-6.jpg", alt: "Retrato 6" },
  { src: "/images/artistica-2.jpg", alt: "Serie Artística 2" },
  { src: "/images/artistica-3.jpg", alt: "Serie Artística 3" },
  { src: "/images/artistica-4.jpg", alt: "Serie Artística 4" },
  { src: "/images/artistica-5.jpg", alt: "Serie Artística 5" },
  { src: "/images/atargatis-3.jpg", alt: "Serie Atargatis 3" },
  { src: "/images/atargatis-4.jpg", alt: "Serie Atargatis 4" },
  { src: "/images/santeria-1.jpg", alt: "Serie Santería 1" },
  { src: "/images/santeria-3.jpg", alt: "Serie Santería 3" },
  { src: "/images/santeria-4.jpg", alt: "Serie Santería 4" },
]

export function Portfolio() {
  return (
    <section id="portafolio" className="w-full py-24 scroll-mt-24 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto mb-12 md:mb-16 px-4 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground">Portafolio</h2>
      </motion.div>

      <CoverflowCarousel
        slides={slides}
        aspectRatio={4 / 5}
        cardWidth="clamp(220px, 30vw, 380px)"
        showNavigation
        label="Portafolio Roegut Lab"
      />
    </section>
  )
}
