"use client"

import { SITIO } from "@/lib/site"
import { buildWhatsAppLink } from "@/lib/whatsapp"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full px-4 md:px-12 py-12 border-t border-border bg-background">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-4">
          <h2 className="font-serif text-4xl mb-4">Hablemos</h2>
          <p className="text-muted-foreground max-w-xs">
            Estudio privado de <strong className="font-normal text-foreground">Javier Roeder</strong> en Cercado
            de Lima, Perú. Retrato, moda editorial y fotografía comercial, con sesiones por cita previa.
          </p>
        </div>

        <div className="col-span-1 md:col-span-4 md:col-start-6 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Contacto</span>
          <a
            href={buildWhatsAppLink("Hola Roegut Lab, quiero más información sobre una sesión.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:italic transition-all"
          >
            WhatsApp
          </a>
          <a href={`mailto:${SITIO.email}`} className="text-lg hover:italic transition-all">
            {SITIO.email}
          </a>
        </div>

        <div className="col-span-1 md:col-span-2 md:col-start-11 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Redes</span>
          <a
            href="https://instagram.com/roegut.lab"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@roegut.lab"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            TikTok
          </a>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Roegut Lab. Todos los derechos reservados.</p>
        <button
          onClick={scrollToTop}
          className="text-xs uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
          type="button"
        >
          Volver arriba ↑
        </button>
      </div>
    </footer>
  )
}
