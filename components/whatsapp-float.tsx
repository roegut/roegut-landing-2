"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { buildWhatsAppLink } from "@/lib/whatsapp"

export function WhatsAppFloat() {
  return (
    <motion.a
      href={buildWhatsAppLink("Hola Roegut Lab, quiero más información sobre una sesión.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-5 py-3 shadow-lg hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium">WhatsApp</span>
    </motion.a>
  )
}
