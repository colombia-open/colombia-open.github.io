# Marca y diseño

Los tokens de marca de este sitio (`app/globals.css`, bloque `:root`) son
una copia de `docs/brand/design-system.md` del repo de la librería
(`davidcasr/colombia-open`) — ese doc es la fuente de verdad, no este
CSS. Si cambia uno, cambia el otro en el mismo PR; no diverjan.

Reglas:

- No introduzcas un color, fuente o radio nuevo sin que primero exista en
  `docs/brand/design-system.md` de la librería.
- El modo oscuro se controla con `data-theme` en `<html>` (ver
  `components/ThemeToggle.tsx`) + `prefers-color-scheme` como default —
  no agregues un segundo mecanismo de dark mode.
- Las marcas SVG (`components/BrandMark.tsx`, `public/brand/*.svg`) deben
  ser idénticas a las del repo de la librería (`site/assets/brand/` ahí,
  mientras exista; después de la migración completa, ese será el único
  lugar donde vivan).
