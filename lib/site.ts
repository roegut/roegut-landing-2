import { WHATSAPP_NUMBER } from "@/lib/whatsapp"

/**
 * Datos del negocio en un solo lugar. Los usan el <head>, los datos
 * estructurados que lee Google y el sitemap. Si cambia la direccion o el
 * telefono, se cambia aqui y se propaga solo.
 */
export const SITIO = {
  nombre: "Roegut Lab",
  nombreLargo: "Roegut Lab — Estudio de fotografía",
  url: "https://roegut.com",
  fundador: "Javier Roeder",
  descripcion:
    "Estudio privado de fotografía de autor en Cercado de Lima. Retrato, sesiones familiares, mascotas, producto, gastronomía y exteriores, con reserva directa por WhatsApp.",
  // A proposito solo a nivel de distrito: la direccion exacta se da al reservar.
  // Para publicarla, agregar `calle` aqui y `streetAddress` abajo.
  direccion: {
    ciudad: "Cercado de Lima",
    region: "Lima",
    pais: "PE",
  },
  telefono: `+${WHATSAPP_NUMBER}`,
  email: "roegutlab@gmail.com",
  redes: [
    "https://www.instagram.com/roegut.lab/",
    "https://www.tiktok.com/@roegut.lab",
  ],
  // Perfiles personales de Javier. Google ya los conoce —salen al buscar su
  // nombre— pero no sabe que son la misma persona detras de este estudio.
  // Declararlos aqui es exactamente lo que une las dos cosas.
  perfilesFundador: [
    "https://pe.linkedin.com/in/javier-roeder",
    "https://www.instagram.com/roegut/",
    "https://linktr.ee/javierroeder",
    "https://javierroederg.myportfolio.com",
  ],
  // Lo que ofrece el estudio, en las mismas categorias que la web y el bot.
  servicios: [
    "Sesión de retrato",
    "Sesión familiar",
    "Sesión de mascotas",
    "Fotografía de producto y e-commerce",
    "Fotografía gastronómica",
    "Sesión en exteriores",
  ],
} as const

/**
 * Lo que Google lee para saber quien eres y donde estas.
 *
 * Son dos fichas enlazadas, no una: el estudio y la persona. Separarlas
 * importa porque "Roegut Lab" es un nombre inventado que Google todavia lee
 * como error de escritura, mientras que "Javier Roeder" ya existe en su indice
 * via LinkedIn y Behance. La ficha de la persona, con sus perfiles en
 * `sameAs`, es el puente entre lo que ya conoce y lo que no.
 */
export function datosEstructurados() {
  const negocio = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITIO.url}/#estudio`,
    name: SITIO.nombre,
    alternateName: SITIO.nombreLargo,
    description: SITIO.descripcion,
    url: SITIO.url,
    telephone: SITIO.telefono,
    email: SITIO.email,
    image: `${SITIO.url}/images/portafolio/01%20Retrato/01.jpg`,
    founder: { "@id": `${SITIO.url}/#javier` },
    employee: { "@id": `${SITIO.url}/#javier` },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITIO.direccion.ciudad,
      addressRegion: SITIO.direccion.region,
      addressCountry: SITIO.direccion.pais,
    },
    areaServed: { "@type": "City", name: "Lima" },
    knowsLanguage: "es",
    sameAs: SITIO.redes,
    makesOffer: SITIO.servicios.map((servicio) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: servicio },
    })),
  }

  const persona = {
    "@type": "Person",
    "@id": `${SITIO.url}/#javier`,
    name: SITIO.fundador,
    jobTitle: "Fotógrafo",
    url: SITIO.url,
    worksFor: { "@id": `${SITIO.url}/#estudio` },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITIO.direccion.ciudad,
        addressRegion: SITIO.direccion.region,
        addressCountry: SITIO.direccion.pais,
      },
    },
    sameAs: SITIO.perfilesFundador,
  }

  return { "@context": "https://schema.org", "@graph": [negocio, persona] }
}
