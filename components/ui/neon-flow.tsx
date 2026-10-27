"use client"

import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface TubesApp {
  tubes: {
    setColors: (colors: string[]) => void
    setLightsColors: (colors: string[]) => void
  }
  dispose?: () => void
}

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"))
}

interface TubesBackgroundProps {
  children?: React.ReactNode
  className?: string
  enableClickInteraction?: boolean
  /** Mientras nadie mueva el raton, los tubos giran alrededor de este elemento. */
  orbitAround?: React.RefObject<HTMLElement | null>
}

/** Segundos que tarda en dar una vuelta completa. */
const VUELTA = 9

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
  orbitAround,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tubesRef = useRef<TubesApp | null>(null)
  const [, setIsLoaded] = useState(false)

  useEffect(() => {
    let mounted = true

    const initTubes = async () => {
      if (!canvasRef.current) return

      try {
        // Bundled locally (not fetched from a CDN at runtime) so the hero
        // background doesn't depend on a third-party host being up.
        // @ts-expect-error — no type declarations ship with this subpath
        const module = await import("threejs-components/build/cursors/tubes1.min.js")
        const TubesCursor = module.default

        if (!mounted || !canvasRef.current) return

        const app: TubesApp = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        })

        tubesRef.current = app
        setIsLoaded(true)
      } catch (error) {
        console.error("Failed to load TubesCursor:", error)
      }
    }

    initTubes()

    return () => {
      mounted = false
      tubesRef.current?.dispose?.()
      tubesRef.current = null
    }
  }, [])

  // La libreria sigue al cursor escuchando "pointermove" en el cuerpo del
  // documento. No expone forma de posicionar los tubos, asi que mientras nadie
  // toque el raton emitimos nosotros ese evento trazando una orbita alrededor
  // del logo. Al primer movimiento real cedemos el control: los eventos que
  // fabricamos llegan con isTrusted en falso y los del visitante en verdadero.
  useEffect(() => {
    if (!orbitAround) return

    const colocar = (x: number, y: number) => {
      try {
        document.body.dispatchEvent(
          new PointerEvent("pointermove", {
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
            pointerType: "mouse",
            isPrimary: true,
          }),
        )
      } catch {
        document.body.dispatchEvent(
          new MouseEvent("pointermove", { clientX: x, clientY: y, bubbles: true }),
        )
      }
    }

    const centro = () => {
      const el = orbitAround.current
      if (!el) return null
      const caja = el.getBoundingClientRect()
      return { x: caja.left + caja.width / 2, y: caja.top + caja.height / 2, radio: caja.width * 0.5 }
    }

    // Si pidio menos movimiento, se deja el halo quieto detras del logo.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const c = centro()
      if (c) colocar(c.x, c.y)
      return
    }

    let animacion = 0
    let girando = true
    const arranque = performance.now()

    const girar = (ahora: number) => {
      if (!girando) return
      const c = centro()
      if (c) {
        const angulo = ((ahora - arranque) / 1000 / VUELTA) * Math.PI * 2
        // El eje vertical va achatado para que la orbita se lea en perspectiva
        // y no como un circulo plano.
        colocar(c.x + Math.cos(angulo) * c.radio, c.y + Math.sin(angulo) * c.radio * 0.72)
      }
      animacion = requestAnimationFrame(girar)
    }

    const cederControl = (evento: PointerEvent) => {
      if (!evento.isTrusted) return
      girando = false
      cancelAnimationFrame(animacion)
      window.removeEventListener("pointermove", cederControl, true)
    }

    window.addEventListener("pointermove", cederControl, true)
    animacion = requestAnimationFrame(girar)

    return () => {
      girando = false
      cancelAnimationFrame(animacion)
      window.removeEventListener("pointermove", cederControl, true)
    }
  }, [orbitAround])

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return

    tubesRef.current.tubes.setColors(randomColors(3))
    tubesRef.current.tubes.setLightsColors(randomColors(4))
  }

  return (
    <div
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-background", className)}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ touchAction: "none" }} />

      <div className="relative z-10 w-full h-full pointer-events-none">{children}</div>
    </div>
  )
}

export default TubesBackground
