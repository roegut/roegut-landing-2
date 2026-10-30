@AGENTS.md

# Roegut Lab — web del estudio

Landing en Next.js del estudio de fotografía de Javier Roeder, en Cercado de
Lima. Publicada en **https://roegut.com**. Aloja además **Espectros**, su
herramienta para poner figuras de neón sobre fotos.

Forma parte de un proyecto más grande junto al **bot de WhatsApp**, que vive en
`~/Documents/Roegut Bot` y tiene su propio `CLAUDE.md`. Los dos se tocan: la web
manda los clientes al bot.

## Publicación

GitHub (`roegut/roegut-landing-2`) → Vercel (proyecto `roegutlab`) reconstruye
sola con cada empujón a `main`. El DNS está en Cloudflare.

| Registro | Valor | Proxy |
|---|---|---|
| A `@` | `76.76.21.21` | **DNS only** |
| CNAME `www` | `cname.vercel-dns.com` | **DNS only** |

**El proxy de Cloudflare debe quedar desactivado** (nubecita gris). Con él
encendido, Vercel no puede emitir ni renovar el certificado: la web anda unos
días y después empieza a dar errores de seguridad sin motivo aparente.

**Vercel solo emite certificado para dominios vinculados a un proyecto.** Costó
encontrarlo: el DNS estaba perfecto y el sitio no cargaba porque el dominio raíz
figuraba en Vercel pero sin conectar a `roegutlab`. Si algún día `https` falla
mientras el DNS resuelve bien, mirar eso primero.

## Portafolio: la carpeta es la base de datos

`lib/portafolio.ts` arma el portafolio leyendo `public/images/portafolio/`. Cada
subcarpeta es una serie. **Para agregar trabajo se crea una carpeta y se sueltan
las fotos** — no se toca código.

- Un número al inicio ordena las series y no se muestra: `07 Atilio` sale como
  «Atilio».
- Las fotos se ordenan por nombre de archivo, así que numerarlas manda.
- Una imagen llamada `portada` va primera.
- Un `descripcion.txt` dentro de la carpeta se muestra bajo el título.
- **Las carpetas sin imágenes se ignoran**, así se dejan preparadas de antemano.

Hay ocho carpetas creadas esperando fotos, cada una con un `LEEME.txt` que
repite estas reglas.

## Precios: fuera a propósito

La web publicaba tarifas (S/150, S/250, S/450…). **Se quitaron por decisión de
Javier**: ahora se cotiza en la conversación de WhatsApp.

No se borró el código. En `components/ui/pricing.tsx` la propiedad `price` quedó
opcional, y cuando falta la tarjeta muestra la duración en su lugar. **Para
volver a publicarlos basta con devolverle `price` a cada paquete.**

Las tarjetas son ahora las **seis categorías del bot** —retrato, familiar,
mascotas, producto, gastronomía, exteriores— con duración y nivel de producción.
Cada botón abre WhatsApp con un mensaje redactado para que el bot reconozca el
tipo de sesión y se salte el menú inicial.

Al pasar de tres paquetes a seis categorías **se perdió el detalle de lo que
incluía cada uno** (fotos entregadas, cambios de look, licencia comercial). Está
en el historial de Git si se quiere recuperar.

## SEO

- `lib/site.ts` concentra nombre, teléfono, correo y redes. Cambiar ahí se
  propaga al `<head>`, a los datos estructurados y al pie.
- Datos estructurados de **negocio local** con los seis servicios.
- `app/sitemap.ts` y `app/robots.ts` generan sus archivos solos.
- Verificado en Search Console por DNS (propiedad de dominio: cubre `www` y la
  raíz de una vez). Sitemap enviado.

Dos cosas que eran fallos reales y conviene no repetir:

**El hero no se renderizaba en el servidor.** Devolvía `null` hasta montar en el
navegador, así que el HTML que recibía Google llegaba sin título, sin
descripción y sin botones. La guarda era innecesaria: el fondo de tubos ya
espera al navegador por su cuenta.

**No había ningún `h1`.** La marca es una imagen, así que no existía encabezado
del que deducir el tema del sitio. Ahora hay uno con `sr-only`: invisible, pero
presente para los buscadores.

**La dirección exacta se omite a propósito.** Solo se publica el distrito;
Javier la da al reservar. En `lib/site.ts` está comentado cómo activarla.
El teléfono y el correo sí son públicos, y él lo sabe.

## Hero

- El logo es un **WebP animado** de once variantes, 267 KB. `unoptimized` es
  obligatorio: el optimizador de Next reencoda el archivo y se lleva por delante
  la animación.
- Late con ritmo de corazón —dos pulsos y descanso— y lleva halo fucsia.
- **Las variantes del logo están diseñadas para fondo blanco.** Sobre el hero
  oscuro las letras negras se pierden; el resplandor fucsia de atrás es lo que
  les da contraste. Si algún día se reexportan para fondo oscuro, ese halo
  podría quitarse.
- Las sombras de radio corto se evitaron: a pocos píxeles se leen como un borde
  recortado y no como luz.
- El fondo de tubos **orbita el logo hasta que alguien mueve el ratón**. La
  librería no expone forma de posicionarlo, así que se emiten eventos
  `pointermove` sintéticos trazando un círculo, y se cede el control al primer
  evento real (`isTrusted`).
- Todas las animaciones se apagan con `prefers-reduced-motion`.

## Espectros

`public/espectros/index.html`. Servido en **/espectros** y en
**espectros.roegut.com**. Público, sin protección.

Nació como artifact de Claude, que no admite dominio propio. El HTML es
autocontenido y se trajo tal cual, con **un solo parche**: guardar el video
usaba el sistema de descargas de Claude, que existe porque ese entorno bloquea
las descargas normales. Fuera de ahí no hay tal bloqueo, así que se cambió por
una descarga de navegador corriente.

Las fórmulas no necesitaron nada: ya usaban el almacenamiento del navegador y la
base de datos de Claude solo las sincronizaba entre dispositivos. Sigue habiendo
llamadas a `window.claude.use`, todas protegidas, que simplemente no hacen nada
fuera de claude.ai.

**La regla del subdominio va en `beforeFiles`** (ver `next.config.mjs`). Los
rewrites devueltos como arreglo se aplican después de resolver páginas, y `/` ya
existe, así que ahí nunca entraría.

## Pendientes

- Subir las fotos de las ocho series que esperan en sus carpetas.
- Convertir cada serie en su propia página (`/portafolio/atargatis`). La
  estructura de carpetas ya sirve para eso sin mover ningún archivo.
- `www.roegut.com` sirve el sitio en vez de redirigir a la versión sin www.
  Funciona, pero divide la señal para Google. Se arregla en Vercel.
- El **Perfil de Empresa de Google** sigue sin verificar. Es, con diferencia, lo
  que más pesa para un negocio local. Javier tiene reparos por la exposición de
  la dirección en Maps; existe la opción de negocio con área de servicio, que la
  oculta.
- Si Espectros crece, moverlo a su propio repositorio y proyecto en Vercel.
