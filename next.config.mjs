/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Espectros vive como archivo suelto en public/. Next no resuelve indices de
  // carpeta en archivos estaticos, asi que hay que indicarle las dos rutas.
  async rewrites() {
    return {
      // Tiene que ir aqui y no en la lista normal: devolviendo un arreglo, los
      // rewrites se aplican DESPUES de resolver archivos y paginas, y "/" ya
      // existe como pagina, asi que la regla del subdominio nunca entraria.
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: 'espectros.roegut.com' }],
          destination: '/espectros/index.html',
        },
      ],
      afterFiles: [
        {
          source: '/espectros',
          destination: '/espectros/index.html',
        },
      ],
      fallback: [],
    }
  },
}

export default nextConfig
