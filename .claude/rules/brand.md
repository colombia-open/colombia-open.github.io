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
- El modo oscuro se controla con `data-theme` en `<html>` (ver
  `components/ThemeToggle.tsx`) + `prefers-color-scheme` como default —
  no agregues un segundo mecanismo de dark mode.
- Las marcas SVG viven en dos formas que deben mantenerse idénticas:
  `components/BrandMark.tsx` (inline, para color dinámico vía
  `var(--token)`) y `public/brand/*.svg` (archivos estáticos, para
  favicon/OG). Si cambia una, cambia la otra.
