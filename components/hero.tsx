"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { TubesBackground } from "@/components/ui/neon-flow"
import { buildWhatsAppLink } from "@/lib/whatsapp"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <TubesBackground className="absolute inset-0 h-full w-full min-h-screen">
        {/* Logo positioned near the top so it doesn't sit under a big empty ceiling */}
        <div className="absolute inset-0 flex items-start justify-center px-4 pt-[13vh] md:pt-[11vh]">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/images/roegut-lab-logo.png"
              alt="Roegut Lab"
              width={720}
              height={720}
              priority
              className="w-[min(70vw,370px)] md:w-[min(38vw,450px)] h-auto drop-shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </div>

        <div className="relative z-10 min-h-screen w-full flex flex-col justify-end items-center px-4 md:px-12 pt-24 pb-24 md:pb-28">
          <motion.div
            className="pointer-events-auto w-full max-w-md mx-auto flex flex-col items-center text-center gap-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-sm md:text-base font-light text-white/80 max-w-md leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Estudio privado de fotografía de autor. Retrato, moda editorial y fotografía comercial en Cercado de
              Lima, sin fórmulas genéricas.
            </p>
            <div className="h-[1px] w-24 bg-white/30" />
            <p className="text-xs uppercase tracking-widest text-white/60">Cercado de Lima, Perú</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
              <a
                href="#precios"
                className="text-xs uppercase tracking-widest border border-white/30 px-5 py-3 text-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-black/20"
              >
                Ver precios
              </a>
              <a
                href={buildWhatsAppLink("Hola Roegut Lab, quiero más información sobre una sesión.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest px-5 py-3 text-center bg-white text-black hover:bg-white/90 transition-colors"
              >
                Escríbeme por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="text-[10px] uppercase tracking-widest text-white">Descubre</span>
          <div className="w-[1px] h-10 bg-white" />
        </motion.div>
      </TubesBackground>
    </section>
  )
}
