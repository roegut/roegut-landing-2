import type { MetadataRoute } from "next"
import { SITIO } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITIO.url}/sitemap.xml`,
    host: SITIO.url,
  }
}
