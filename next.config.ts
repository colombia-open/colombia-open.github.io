import type { NextConfig } from "next";

// Sitio estático publicado en GitHub Pages en la raíz de colombia-open.github.io
// (el repo se llama exactamente así por convención de GitHub Pages) — sin
// basePath porque no hay sufijo de ruta.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Con rutas propias además de "/" (ej. /proyectos), GitHub Pages necesita
  // carpeta + index.html para que la URL "limpia" (sin .html) funcione.
  trailingSlash: true,
};

export default nextConfig;
