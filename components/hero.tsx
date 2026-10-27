"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { TubesBackground } from "@/components/ui/neon-flow"
import { buildWhatsAppLink } from "@/lib/whatsapp"

// Latido del logo: dos pulsos seguidos y luego descanso, como un corazon.
// Los tiempos estan repartidos para que el segundo golpe caiga pegado al primero
// y el resto del ciclo quede quieto.
const LATIDO = {
  escala: [1, 1.045, 1.015, 1.055, 1, 1],
  momentos: [0, 0.08, 0.15, 0.23, 0.38, 1],
  resplandor: [0.45, 0.9, 0.6, 1, 0.45, 0.45],
  duracion: 3.6,
}

// Texto del hero. Cada punto corta una linea, como un subtitulo.
const SUBTITULOS = [
  "Estudio privado de fotografía de autor.",
  "Retrato, moda editorial y fotografía comercial en Cercado de Lima.",
  "Sin fórmulas genéricas.",
]

function Subtitulos() {
  return (
    <div className="flex flex-col items-center gap-1.5 max-w-md">
      {SUBTITULOS.map((linea) => (
        <p
          key={linea}
          className="text-sm md:text-base font-light text-white/80 leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
        >
          {linea}
        </p>
      ))}
    </div>
  )
}

function TextoConHalo({ texto, quieto }: { texto: string; quieto: boolean | null }) {
  if (quieto) {
    return <p className="text-xs uppercase tracking-widest text-white/60">{texto}</p>
  }

  return (
    <p className="text-xs uppercase tracking-widest text-white/60" aria-label={texto}>
      {texto.split("").map((caracter, i) => (
        <motion.span
          key={`${caracter}-${i}`}
          aria-hidden
          className="inline-block whitespace-pre"
          animate={{
            textShadow: [
              "0 0 0px rgba(255,45,149,0)",
              "0 0 14px rgba(255,45,149,0.95)",
              "0 0 0px rgba(255,45,149,0)",
            ],
            color: ["rgba(255,255,255,0.6)", "rgba(255,255,255,1)", "rgba(255,255,255,0.6)"],
          }}
          transition={{
            duration: 1.5,
            // El desfase por letra es lo que hace que el brillo viaje en vez
            // de encenderse todo a la vez.
            delay: i * 0.07,
            repeatDelay: 2.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {caracter}
        </motion.span>
      ))}
    </p>
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const menosMovimiento = useReducedMotion()
  // Centro de la orbita del fondo mientras nadie mueve el raton.
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <TubesBackground className="absolute inset-0 h-full w-full min-h-screen" orbitAround={logoRef}>
        {/* Logo positioned near the top so it doesn't sit under a big empty ceiling */}
        <div className="absolute inset-0 flex items-start justify-center px-4 pt-[13vh] md:pt-[11vh]">
          <motion.div
            ref={logoRef}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Resplandor ambiental detras del logo. Late con el, y como solo
                anima opacidad y escala no cuesta nada de rendimiento. */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[175%] aspect-square rounded-full blur-[90px] motion-reduce:hidden"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,45,149,0.40) 0%, rgba(214,31,165,0.20) 38%, rgba(160,20,140,0.08) 60%, rgba(255,255,255,0) 76%)",
              }}
              animate={
                menosMovimiento
                  ? { opacity: 0.5 }
                  : { opacity: LATIDO.resplandor, scale: LATIDO.escala }
              }
              transition={
                menosMovimiento
                  ? undefined
                  : {
                      duration: LATIDO.duracion,
                      times: LATIDO.momentos,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
              }
            />

            <motion.div
              animate={menosMovimiento ? undefined : { scale: LATIDO.escala }}
              transition={
                menosMovimiento
                  ? undefined
                  : {
                      duration: LATIDO.duracion,
                      times: LATIDO.momentos,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
              }
            >
              {/* unoptimized es obligatorio: el optimizador de imagenes de Next
                  reencoda el archivo y se lleva por delante la animacion. */}
              <Image
                src="/images/roegut-lab-logo.webp"
                alt="Roegut Lab"
                width={900}
                height={900}
                priority
                unoptimized
                // Sin sombras de radio corto: a pocos pixeles se leen como un
                // borde recortado y no como luz. Solo halos anchos en fucsia,
                // que ademas separan del negro las variantes de letra oscura.
                style={{
                  filter:
                    "drop-shadow(0 0 14px rgba(255,45,149,0.55)) drop-shadow(0 0 40px rgba(255,45,149,0.35)) drop-shadow(0 0 90px rgba(236,0,140,0.28))",
                }}
                className="relative w-[min(70vw,370px)] md:w-[min(38vw,450px)] h-auto motion-reduce:hidden"
              />
            </motion.div>

            {/* Para quien pidio menos animacion en su sistema, el logo fijo. */}
            <Image
              src="/images/roegut-lab-logo.png"
              alt="Roegut Lab"
              width={720}
              height={720}
              className="hidden motion-reduce:block w-[min(70vw,370px)] md:w-[min(38vw,450px)] h-auto drop-shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
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
            <Subtitulos />
            <div className="h-[1px] w-24 bg-white/30" />
            <TextoConHalo texto="Cercado de Lima, Perú" quieto={menosMovimiento} />

            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
              <a
                href="#precios"
                className="text-xs uppercase tracking-widest border border-white/30 px-5 py-3 text-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-black/20"
              >
                Ver paquetes
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
