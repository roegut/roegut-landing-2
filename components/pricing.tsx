import { PricingSection, type PricingPlan } from "@/components/ui/pricing"
import { buildWhatsAppLink } from "@/lib/whatsapp"

// Las categorias son las mismas ramas del cuestionario del bot de WhatsApp.
// El mensaje de cada boton esta redactado para que el bot reconozca el tipo de
// sesion y se salte el menu inicial: el cliente llega al chat ya encaminado.
// Los montos no se publican; se cotizan en la conversacion.
const plans: PricingPlan[] = [
  {
    name: "Retrato",
    priceSuffix: "1 a 3 horas",
    nivel: "Sencilla a con producción",
    description: "Perfil profesional, marca personal, músicos y actores.",
    buttonText: "Escríbenos",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero un retrato."),
    isPopular: true,
  },
  {
    name: "Familiar",
    priceSuffix: "3 a 4 horas",
    nivel: "Con producción",
    description: "En el estudio o en tu casa, con toda la familia.",
    buttonText: "Escríbenos",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero una sesión familiar."),
  },
  {
    name: "Mascotas",
    priceSuffix: "1 a 2 horas",
    nivel: "Sencilla",
    description: "Perros, gatos y quien haga falta. Con su tiempo y su ritmo.",
    buttonText: "Escríbenos",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero una sesión para mi mascota."),
  },
  {
    name: "Producto / e-commerce",
    priceSuffix: "Según catálogo",
    nivel: "Variable",
    description: "Fondo blanco o ambientado, para tienda online y redes.",
    buttonText: "Escríbenos",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero fotos de mis productos para vender por internet."),
  },
  {
    name: "Gastronomía",
    priceSuffix: "Media jornada",
    nivel: "Con producción",
    description: "Carta, delivery o redes. Platos que den ganas.",
    buttonText: "Escríbenos",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero fotos de mis platos."),
  },
  {
    name: "En exteriores",
    priceSuffix: "3 a 4 horas",
    nivel: "Producción completa",
    description: "Fuera del estudio, en la locación que tengas en mente.",
    buttonText: "Escríbenos",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero una sesión en exteriores."),
  },
]

export function Pricing() {
  return (
    <section id="precios" className="w-full scroll-mt-24">
      <PricingSection
        plans={plans}
        title="Tipos de sesión"
        description={
          "Cada sesión se arma según lo que necesitas: la duración y el nivel de producción son el punto de partida, no una tarifa cerrada."
        }
      />

      <div className="w-full px-4 md:px-12 pb-20 md:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-foreground text-balance">
            ¿No encaja en ninguna?
          </h3>
          <p className="mt-3 text-sm md:text-base text-muted-foreground text-balance">
            Escríbenos y cuéntanos tu proyecto. Te hacemos unas preguntas cortas y Javier te arma la propuesta.
          </p>
          <a
            href={buildWhatsAppLink("Hola Roegut Lab, quiero contarte mi proyecto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-xs uppercase tracking-widest border border-border px-6 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Cuéntanos tu proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
