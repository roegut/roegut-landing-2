"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WHATSAPP_NUMBER, buildWhatsAppLink, formatWhatsAppNumber } from "@/lib/whatsapp"
import { SITIO } from "@/lib/site"

const sessionTypes = [
  "Retrato de autor",
  "Marca personal – Profesional",
  "Moda y lookbooks",
  "Fotografía comercial",
  "Retrato de mascotas",
  "Producción de campaña",
]

const channels = [
  { label: "WhatsApp", value: formatWhatsAppNumber(), href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "Correo", value: SITIO.email, href: `mailto:${SITIO.email}` },
  { label: "Instagram", value: "@roegut.lab", href: "https://instagram.com/roegut.lab" },
]

export function Contact() {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [sessionType, setSessionType] = useState("")
  const [details, setDetails] = useState("")

  const handleSend = () => {
    const message = [
      `Hola Roegut Lab. Soy ${name || "—"}.`,
      `Me interesa: ${sessionType || "—"}.`,
      `Contacto: ${contact || "—"}.`,
      `Detalles: ${details || "—"}`,
    ].join(" ")

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contacto" className="w-full px-4 md:px-12 py-24 scroll-mt-24 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Canales directos */}
        <motion.div
          className="col-span-1 md:col-span-5 flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground">Iniciar tu sesión</h2>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Cuéntame qué necesitas y coordinamos los detalles. WhatsApp es la vía más rápida para responderte.
            </p>
          </div>

          <div className="flex flex-col border-t border-border">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 py-4 border-b border-border font-mono text-sm hover:text-primary transition-colors"
              >
                <span className="text-muted-foreground">{channel.label}</span>
                <span>{channel.value}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Formulario que arma un mensaje de WhatsApp */}
        <motion.div
          className="col-span-1 md:col-span-6 md:col-start-7 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-muted-foreground">
              Nombre
            </label>
            <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-info" className="text-xs uppercase tracking-widest text-muted-foreground">
              Teléfono o correo
            </label>
            <Input
              id="contact-info"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Cómo te contactamos"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-type" className="text-xs uppercase tracking-widest text-muted-foreground">
              Tipo de sesión
            </label>
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger id="contact-type" className="w-full">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {sessionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-details" className="text-xs uppercase tracking-widest text-muted-foreground">
              Detalles del proyecto
            </label>
            <Textarea
              id="contact-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Cuéntame sobre tu proyecto, fecha tentativa, referencias..."
              className="min-h-32"
            />
          </div>

          <button
            type="button"
            onClick={handleSend}
            className="mt-2 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest bg-primary text-primary-foreground px-6 py-3.5 hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar por WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  )
}
