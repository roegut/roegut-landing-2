import fs from "node:fs"
import path from "node:path"

export interface FotoSerie {
  src: string
  alt: string
}

export interface Serie {
  /** Lo que se muestra en la web: el nombre de la carpeta sin el numero de orden. */
  titulo: string
  slug: string
  descripcion?: string
  fotos: FotoSerie[]
}

const CARPETA = path.join(process.cwd(), "public", "images", "portafolio")
const EXTENSIONES = [".jpg", ".jpeg", ".png", ".webp", ".avif"]

function aSlug(nombre: string) {
  return nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * El portafolio se arma leyendo carpetas, no editando codigo: cada subcarpeta de
 * public/images/portafolio es una serie, y las imagenes que tenga dentro son sus
 * fotos. Para agregar una serie se crea una carpeta y se sueltan los archivos.
 *
 * Convenciones:
 *   - Un numero al inicio del nombre ordena las series y no se muestra.
 *     "01 Retrato" aparece como "Retrato".
 *   - Las fotos se ordenan por nombre de archivo, asi que numerarlas manda.
 *   - Una imagen llamada "portada" va primera, sin importar el orden.
 *   - Un "descripcion.txt" dentro de la carpeta se muestra bajo el titulo.
 *   - Las carpetas sin imagenes se ignoran, asi que se pueden dejar preparadas.
 */
export function leerPortafolio(): Serie[] {
  if (!fs.existsSync(CARPETA)) return []

  return fs
    .readdirSync(CARPETA, { withFileTypes: true })
    .filter((entrada) => entrada.isDirectory() && !entrada.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name, "es", { numeric: true }))
    .map((carpeta) => {
      const ruta = path.join(CARPETA, carpeta.name)

      const archivos = fs
        .readdirSync(ruta)
        .filter((f) => !f.startsWith(".") && EXTENSIONES.includes(path.extname(f).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))

      const portada = archivos.find((f) => path.parse(f).name.toLowerCase() === "portada")
      const ordenadas = portada ? [portada, ...archivos.filter((f) => f !== portada)] : archivos

      const titulo = carpeta.name.replace(/^\d+\s*[-_.]?\s*/, "") || carpeta.name

      const rutaDescripcion = path.join(ruta, "descripcion.txt")
      const descripcion = fs.existsSync(rutaDescripcion)
        ? fs.readFileSync(rutaDescripcion, "utf8").trim() || undefined
        : undefined

      return {
        titulo,
        slug: aSlug(titulo),
        descripcion,
        fotos: ordenadas.map((archivo, i) => ({
          // encodeURI para que los acentos y espacios del nombre de carpeta
          // no rompan la ruta en el navegador.
          src: encodeURI(`/images/portafolio/${carpeta.name}/${archivo}`),
          alt: `${titulo} — foto ${i + 1}`,
        })),
      }
    })
    .filter((serie) => serie.fotos.length > 0)
}
