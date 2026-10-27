export const WHATSAPP_NUMBER = "51923126396"

/** El numero para mostrar en pantalla: "51923126396" -> "+51 923 126 396". */
export function formatWhatsAppNumber() {
  const n = WHATSAPP_NUMBER
  return `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}`
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
