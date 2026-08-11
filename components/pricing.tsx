import { PricingSection, type PricingPlan } from "@/components/ui/pricing"
import { buildWhatsAppLink } from "@/lib/whatsapp"

const plans: PricingPlan[] = [
  {
    name: "Básico",
    price: "S/ 150",
    priceSuffix: "sesión de 1 hora",
    description: "Para LinkedIn, actores y redes profesionales.",
    features: [
      "1 cambio de vestuario",
      "10 fotos finales con retoque",
      "Todas las tomas originales",
      "Entrega en galería privada en 48–72 h",
    ],
    buttonText: "Reservar por WhatsApp",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero reservar el paquete Básico."),
  },
  {
    name: "Profesional",
    price: "S/ 250",
    priceSuffix: "sesión de 2 a 3 horas",
    description: "Marca personal completa. El más pedido.",
    features: [
      "Hasta 3 horas de sesión",
      "3 cambios de look, fondos o iluminación",
      "25 fotos finales con retoque",
      "Dirección de pose",
      "Archivos listos para impresión y prensa",
      "Plazo de entrega coordinado al reservar",
    ],
    buttonText: "Reservar por WhatsApp",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero reservar el paquete Profesional."),
    isPopular: true,
  },
  {
    name: "Producción",
    price: "S/ 450",
    priceSuffix: "desde, media jornada (4 h)",
    description: "Catálogo, campaña, editorial.",
    features: [
      "4 horas de producción",
      "Dirección de arte y concepto previo",
      "50+ fotos listas para catálogo y pauta",
      "Todas las tomas originales",
      "Licencia de uso comercial",
    ],
    buttonText: "Cotizar por WhatsApp",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero cotizar una Producción."),
  },
]

const extraServices = [
  {
    name: "Retrato de mascotas",
    price: "desde S/ 120",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero información sobre una sesión de retrato de mascotas."),
  },
  {
    name: "Fotografía comercial / e-commerce",
    price: "a cotizar según proyecto",
    href: buildWhatsAppLink("Hola Roegut Lab, quiero cotizar fotografía comercial / e-commerce."),
  },
]

const addOns = [
  { name: "Foto editada adicional", price: "S/ 15" },
  { name: "Entrega express (24 h)", price: "S/ 25 / foto" },
  { name: "Cambio de look adicional", price: "S/ 40" },
]

export function Pricing() {
  return (
    <section id="precios" className="w-full scroll-mt-24">
      <PricingSection
        plans={plans}
        title="Precios claros, sin rodeos"
        description={
          "Así sabes qué esperar antes de escribir.\nCada paquete se puede ajustar a tu proyecto — cuéntame qué necesitas por WhatsApp."
        }
      />

      <div className="w-full px-4 md:px-12 pb-20 md:pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Servicios sueltos</span>
            <ul className="mt-6 space-y-1">
              {extraServices.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-baseline gap-4 py-3 border-b border-border group hover:text-primary transition-colors"
                  >
                    <span className="text-foreground group-hover:italic transition-all">{service.name}</span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{service.price}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Complementos</span>
            <ul className="mt-6 space-y-1">
              {addOns.map((addOn) => (
                <li
                  key={addOn.name}
                  className="flex justify-between items-baseline gap-4 py-3 border-b border-border"
                >
                  <span className="text-foreground">{addOn.name}</span>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{addOn.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="max-w-5xl mx-auto mt-10 text-center text-xs md:text-sm text-muted-foreground">
          Reserva con S/ 40 de adelanto — el saldo se cancela el día de la sesión.
        </p>
      </div>
    </section>
  )
}
