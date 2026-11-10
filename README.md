# colombia-open.github.io

[![Deploy](https://github.com/colombia-open/colombia-open.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/colombia-open/colombia-open.github.io/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Static export](https://img.shields.io/badge/output-static%20export-C9A227)](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

Sitio web de **[colombia-open](https://github.com/davidcasr/colombia-open)** — datos
públicos de Colombia, curados y listos para usar en Python. La librería vive en
otro repo; este es **solo la landing**: una app Next.js exportada como sitio
estático y publicada en GitHub Pages en **https://colombia-open.github.io**.

## La idea

Los datos públicos de Colombia existen, pero cada uno en su portal, con su
propio formato y sin una fuente clara de licencia. `colombia-open` (la
librería) los normaliza y publica un catálogo versionado. Este sitio es el
escaparate de ese catálogo: presenta qué hay disponible, cómo instalarlo y
hacia dónde va el roadmap — nunca inventa ni cachea el dato en sí.

## Cómo funciona

Este repo **no tiene base de datos propia**. En cada build (`next build`,
corre en GitHub Actions — ver [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
se lee, en build-time y server-side:

1. El último [GitHub Release](https://github.com/davidcasr/colombia-open/releases)
   de la librería → `dataset_catalog.json` (qué datasets existen hoy, su
   licencia, su conteo de filas, su fuente oficial).
2. `data/registry/datasets.json` de `main` de la librería → fuente oficial de
   los datasets del roadmap que aún no están publicados.
3. `content/catalogo.json` y `content/roadmap.json` **de este repo** → solo
   presentación (título, grupo, orden de cada tarjeta) — nunca el dato real.

Si el release no se puede leer, **el build falla a propósito**: no hay
fallback embebido, y un build fallido deja el sitio anterior en línea en vez
de publicar un catálogo inventado o vacío. Detalle completo en
[`.claude/rules/data-source.md`](.claude/rules/data-source.md).

## Desarrollo local

Requiere Node 18+.

```bash
npm install
npm run dev      # http://localhost:3000 — necesita salida a internet para leer el release de GitHub
npm run build    # next build --> export estático en out/
npm run lint      # eslint
```

`npm run build` falla igual que en CI si no logra leer el catálogo (red,
release caído) — es el comportamiento esperado, no un bug.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- `output: "export"` — sin servidor, sin API routes: todo el sitio sale como
  HTML/CSS/JS estático para GitHub Pages
- Tipografía: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display),
  [Inter](https://fonts.google.com/specimen/Inter) (UI),
  [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (código/datos)
- Despliegue: GitHub Actions → `actions/deploy-pages`, disparado por push a
  `main`, cron diario y `workflow_dispatch` (detalle en
  [`.claude/rules/deploy.md`](.claude/rules/deploy.md))

## Estructura

```
app/            # App Router — layout.tsx (metadata, fuentes), page.tsx (orquesta el fetch), globals.css
components/     # Una sección de la landing por archivo (Header, Hero, Catalog, Roadmap, Contribute, Footer)
lib/            # catalog.ts (fetch + validación del catálogo real), format.ts, types.ts
content/        # catalogo.json / roadmap.json — presentación a mano, nunca el dato real
docs/brand/     # design-system.html — fuente de verdad de la marca (paleta, tipografía, logomarca)
public/         # favicon, og-image, marcas SVG
```

## Marca y diseño

Los tokens de marca (`app/globals.css`) implementan
[`docs/brand/design-system.html`](docs/brand/design-system.html), que es la
fuente de verdad del diseño — si cambia uno, cambia el otro en el mismo PR.
Ver [`.claude/rules/brand.md`](.claude/rules/brand.md) para las reglas
completas (logomarca, dark mode, SVGs duplicados).

## Contribuir

Este repo solo controla **presentación** (diseño, componentes, orden del
catálogo/roadmap en `content/*.json`). Para proponer un dataset nuevo, picar
en una fuente pendiente o reportar un bug de datos, ve al repo de la
librería: [`davidcasr/colombia-open`](https://github.com/davidcasr/colombia-open),
sigue su [guía de contribución](https://github.com/davidcasr/colombia-open/blob/main/.github/CONTRIBUTING.md)
y su [Código de Conducta](https://github.com/davidcasr/colombia-open/blob/main/.github/CODE_OF_CONDUCT.md).
Para cambios de diseño o de esta landing, abre un PR aquí directamente.
