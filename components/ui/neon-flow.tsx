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
}

export function TubesBackground({ children, className, enableClickInteraction = true }: TubesBackgroundProps) {
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
