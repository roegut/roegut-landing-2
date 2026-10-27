"use client"

import { motion } from "framer-motion"
import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Check, Star as LucideStar } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// --- MEDIA QUERY HOOK ---

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener("change", onChange)
    setValue(result.matches)

    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}

// --- INTERACTIVE STARFIELD ---

/**
 * Azar reproducible. Math.random() da numeros distintos en el servidor y en el
 * navegador, y React se queja de que el HTML no coincide. Derivando todo del
 * numero de estrella, ambos lados calculan lo mismo.
 */
function azar(semilla: number) {
  const x = Math.sin(semilla) * 10000
  return x - Math.floor(x)
}

function Star({
  index,
  mousePosition,
  containerRef,
}: {
  index: number
  mousePosition: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const initialPos = React.useMemo(() => {
    const r = (k: number) => azar(index * 13.73 + k * 4.21)
    // Redondeado a proposito: sin una precision fija, el servidor y el navegador
    // escriben el mismo numero con distinta cantidad de decimales y React lo
    // reporta como desajuste de hidratacion.
    return {
      top: `${(r(1) * 100).toFixed(3)}%`,
      left: `${(r(2) * 100).toFixed(3)}%`,
      tamano: Number((1 + r(3) * 2).toFixed(3)),
      duracion: Number((2 + r(4) * 3).toFixed(3)),
      retraso: Number((r(5) * 5).toFixed(3)),
    }
  }, [index])

  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current || mousePosition.x === null || mousePosition.y === null) {
      setOffset({ x: 0, y: 0 })
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const starX = containerRect.left + (parseFloat(initialPos.left) / 100) * containerRect.width
    const starY = containerRect.top + (parseFloat(initialPos.top) / 100) * containerRect.height

    const deltaX = mousePosition.x - starX
    const deltaY = mousePosition.y - starY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    const radius = 600

    if (distance < radius) {
      const force = 1 - distance / radius
      setOffset({ x: deltaX * force * 0.5, y: deltaY * force * 0.5 })
    } else {
      setOffset({ x: 0, y: 0 })
    }
  }, [mousePosition, initialPos, containerRef])

  return (
    <motion.div
      className="absolute bg-foreground rounded-full"
      style={{
        top: initialPos.top,
        left: initialPos.left,
        width: `${initialPos.tamano}px`,
        height: `${initialPos.tamano}px`,
      }}
      animate={{ x: offset.x, y: offset.y, opacity: [0, 1, 0] }}
      transition={{
        x: { type: "spring", stiffness: 100, damping: 15, mass: 0.1 },
        y: { type: "spring", stiffness: 100, damping: 15, mass: 0.1 },
        opacity: {
          duration: initialPos.duracion,
          repeat: Number.POSITIVE_INFINITY,
          delay: initialPos.retraso,
        },
      }}
    />
  )
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: 150 }).map((_, i) => (
        <Star key={`star-${i}`} index={i} mousePosition={mousePosition} containerRef={containerRef} />
      ))}
    </div>
  )
}

// --- PRICING ---

export interface PricingPlan {
  name: string
  /** Opcional: si no hay monto, la tarjeta muestra la duracion en su lugar. */
  price?: string
  priceSuffix: string
  /** Nivel de produccion. Reemplaza al precio como segunda senal de alcance. */
  nivel?: string
  features?: string[]
  description: string
  buttonText: string
  href: string
  isPopular?: boolean
}

interface PricingSectionProps {
  plans: PricingPlan[]
  title?: string
  description?: string
}

export function PricingSection({
  plans,
  title = "Precios",
  description = "Elige el paquete que mejor se ajuste a tu proyecto.",
}: PricingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event
    setMousePosition({ x: clientX, y: clientY })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: null, y: null })}
      className="relative w-full bg-background py-20 sm:py-24"
    >
      <InteractiveStarfield mousePosition={mousePosition} containerRef={containerRef} />
      <div className="relative z-10 container mx-auto px-4 md:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground text-balance">{title}</h2>
          <p className="text-muted-foreground text-base md:text-lg whitespace-pre-line text-balance">{description}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -20 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
        // Con seis tarjetas, un escalonado largo hace esperar demasiado la ultima.
        delay: Math.min(index, 3) * 0.08,
      }}
      className={cn(
        "rounded-2xl p-8 flex flex-col relative bg-background/70 backdrop-blur-sm",
        plan.isPopular ? "border-2 border-primary shadow-xl" : "border border-border",
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-primary py-1.5 px-4 rounded-full flex items-center gap-1.5">
            <LucideStar className="text-primary-foreground h-4 w-4 fill-current" />
            <span className="text-primary-foreground text-sm font-semibold">Más elegido</span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className="font-serif text-2xl text-foreground">{plan.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground text-balance">{plan.description}</p>
        <div className="mt-6 flex items-baseline justify-center gap-x-1">
          {plan.price ? (
            <span className="text-5xl font-bold tracking-tight text-foreground">{plan.price}</span>
          ) : (
            <span className="font-serif text-2xl text-foreground">{plan.priceSuffix}</span>
          )}
        </div>
        {plan.price && (
          <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">{plan.priceSuffix}</p>
        )}
        {plan.nivel && (
          <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest">{plan.nivel}</p>
        )}

        {plan.features && plan.features.length > 0 && (
          <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-left text-muted-foreground">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <Link
            href={plan.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                variant: plan.isPopular ? "default" : "outline",
                size: "lg",
              }),
              "w-full",
            )}
          >
            {plan.buttonText}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
