# CLAUDE.md — colombia-open.github.io

> Sitio web de **colombia-open** (la librería vive en
> [davidcasr/colombia-open](https://github.com/davidcasr/colombia-open),
> otro repo). Next.js (App Router), exportado estático, publicado en
> GitHub Pages en `https://colombia-open.github.io`.

## La regla que domina todo lo demás: este repo nunca inventa un dato

Este repo es **solo presentación**. Ningún dataset, conteo de filas,
licencia o fuente se escribe a mano aquí — todo eso viene del catálogo
publicado por la librería (`dataset_catalog.json` del último GitHub
Release) y de `data/registry/datasets.json` de su rama `main`, leídos en
build-time. Lo único que vive en este repo es *cómo se presenta* ese
contenido: título, grupo, orden, diseño. Ver `.claude/rules/data-source.md`.

Si alguna vez hace falta mostrar un dato que no viene de ese catálogo,
la respuesta correcta es "no lo mostramos todavía" — nunca "lo escribimos
a mano aquí mientras tanto". El build debe fallar fuerte antes que
publicar un catálogo inventado — ver el comentario en
`.github/workflows/deploy.yml`.

## Mapa de carpetas

```
app/            # App Router — layout.tsx (metadata, fuentes), page.tsx (orquesta el fetch), globals.css
components/     # Una sección de la landing por archivo (Header, Hero, Catalog, Roadmap, Contribute, Footer)
lib/            # catalog.ts (fetch + validación), format.ts, types.ts
content/        # catalogo.json / roadmap.json — presentación a mano, nunca el dato real
public/         # favicon, og-image, marcas SVG
```

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # next build --> export estático en out/
npm run lint      # eslint
```

## Reglas duras (no negociables)

1. **Nunca hardcodear un dataset, conteo, licencia o fuente en
   componentes o contenido.** Esos campos SIEMPRE se leen en build-time
   desde el catálogo de la librería (`lib/catalog.ts`). `content/*.json`
   solo lleva título/grupo/orden — ver `.claude/rules/data-source.md`.
2. **Si el fetch del catálogo falla, el build falla.** No hay fallback
   embebido aquí (a diferencia de la librería, que sí tiene uno para
   desarrollo offline) — este repo no tiene datos propios que mostrar en
   su lugar. Un build fallido deja el sitio anterior en línea; eso es
   preferible a publicar un catálogo inventado o desactualizado.
3. **Los tokens de marca (`app/globals.css`) deben mantenerse en sync con
   `docs/brand/design-system.md`** del repo de la librería — ese doc es
   la fuente de verdad del diseño, no este CSS. Si cambia uno, cambia el
   otro.
4. **Nunca remover el link a la librería ni a la fuente oficial de cada
   dataset** en las tarjetas del catálogo — es lo que hace auditable la
   procedencia del dato, igual que en la librería.
5. **Todo el sitio se exporta estático (`output: "export"`)** — nada de
   rutas de servidor, API routes ni SSR dinámico: GitHub Pages solo sirve
   archivos estáticos. El fetch de datos ocurre una sola vez, en
   build-time, en Server Components.

## Dónde ir según tu tarea

| Quiero... | Ir a |
|---|---|
| Entender de dónde sale el contenido | `.claude/rules/data-source.md` |
| Agregar/reordenar una tarjeta del catálogo o una fila del roadmap | `content/catalogo.json` / `content/roadmap.json` (nunca el dato: eso lo decide la librería) |
| Tocar diseño/marca | `.claude/rules/brand.md` + `app/globals.css` |
| Entender el pipeline de deploy | `.claude/rules/deploy.md` + `.github/workflows/deploy.yml` |
| Agregar una sección nueva a la landing | `components/` (un componente por sección) + enlazarlo en `app/page.tsx` |
