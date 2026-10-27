import { CoverflowCarousel } from "@/components/ui/coverflow-carousel"
import { FadeIn } from "@/components/ui/fade-in"
import { leerPortafolio } from "@/lib/portafolio"

export function Portfolio() {
  const series = leerPortafolio()

  if (series.length === 0) return null

  return (
    <section id="portafolio" className="w-full py-24 scroll-mt-24 overflow-hidden">
      <FadeIn className="max-w-7xl mx-auto mb-12 md:mb-16 px-4 md:px-12">
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground">Portafolio</h2>
      </FadeIn>

      <div className="flex flex-col gap-20 md:gap-28">
        {series.map((serie) => (
          <div key={serie.slug}>
            <FadeIn className="max-w-7xl mx-auto mb-8 px-4 md:px-12">
              <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-foreground">{serie.titulo}</h3>
              {serie.descripcion && (
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground text-balance">{serie.descripcion}</p>
              )}
            </FadeIn>

            <CoverflowCarousel
              slides={serie.fotos}
              aspectRatio={4 / 5}
              cardWidth="clamp(220px, 30vw, 380px)"
              showNavigation
              label={`Serie ${serie.titulo} — Roegut Lab`}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
