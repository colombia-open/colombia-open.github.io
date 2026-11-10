import type { NextConfig } from "next";

// Sitio estático publicado en GitHub Pages en la raíz de colombia-open.github.io
// (el repo se llama exactamente así por convención de GitHub Pages) — sin
// basePath porque no hay sufijo de ruta.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
