# Marca y diseño

Los tokens de marca de este sitio (`app/globals.css`, bloque `:root`) son
la implementación de `docs/brand/design-system.html` **de este mismo
repo** — esa página (HTML autocontenido, sin pipeline de build) es la
fuente de verdad. Si cambia uno, cambia el otro en el mismo PR; no
diverjan.

La librería ([davidcasr/colombia-open](https://github.com/davidcasr/colombia-open))
no tiene ningún doc ni asset de marca — todo esto vive solo aquí.

Reglas:

- No introduzcas un color, fuente o radio nuevo sin que primero exista en
  `docs/brand/design-system.html`.
- El sitio publica **solo modo oscuro** (decisión de producto) — los tokens
  viven directo en `:root` de `app/globals.css`, sin `prefers-color-scheme`
  ni `data-theme`, y no hay componente de toggle. El modo claro sigue
  documentado en `docs/brand/design-system.html` como referencia del
  sistema; si algún día se reintroduce un selector de tema, que viva ahí
  primero — no agregues un segundo mecanismo de dark mode por tu cuenta.
- Las marcas SVG viven en dos formas que deben mantenerse idénticas:
  `components/BrandMark.tsx` (inline, para color dinámico vía
  `var(--token)`) y `public/brand/*.svg` (archivos estáticos, para
  favicon/OG). Si cambia una, cambia la otra.
