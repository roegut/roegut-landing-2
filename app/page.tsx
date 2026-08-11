import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <Portfolio />
      <Pricing />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
