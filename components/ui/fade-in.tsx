"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/** Aparicion suave al entrar en pantalla. Existe para que los componentes de
 *  servidor puedan animar sin volverse de cliente enteros. */
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
