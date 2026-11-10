# colombia-open.github.io

Sitio web de [colombia-open](https://github.com/davidcasr/colombia-open) —
la librería que vive en otro repo. Este repo es solo presentación: una
app Next.js exportada como sitio estático y publicada en GitHub Pages en
`https://colombia-open.github.io`.

## Cómo funciona

El sitio **no tiene su propia base de datos**. En cada build (`next
build`, corre en GitHub Actions — ver `.github/workflows/deploy.yml`) lee,
en build-time:

1. El último [GitHub Release](https://github.com/davidcasr/colombia-open/releases)
   de la librería → `dataset_catalog.json` (qué datasets existen, su
   licencia, su conteo de filas, su fuente).
2. `data/registry/datasets.json` de `main` de la librería → fuente oficial
   de los datasets aún no publicados (para el roadmap).
3. `content/catalogo.json` y `content/roadmap.json` de **este** repo →
   solo decoración de presentación (título, grupo, orden) — nunca el dato
   en sí.

Si el release no se puede leer, el build falla a propósito — ver
`.claude/rules/data-source.md`.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export estático -> out/
```

## Estructura

```
app/            # App Router de Next.js — layout, page, estilos globales
components/     # Secciones de la landing (Header, Hero, Catalog, …)
lib/            # Fetch del catálogo + tipos + formateo
content/        # Metadata de presentación mantenida a mano (ver arriba)
public/         # Favicon, OG image, marcas de marca
```
