# Design system — colombia-open

> Qué es este archivo: la fuente de verdad de la identidad visual del
> proyecto (paleta, tipografía, logomarca, voz) que usa esta landing
> (`app/globals.css`, `app/layout.tsx`, `public/`). Si en el futuro hay
> más material de marca (slides, redes, badges), también se guía por este
> documento. Si cambias un token aquí, cámbialo también en
> `app/globals.css` en el mismo PR — no hay generación automática todavía,
> ver `.claude/rules/brand.md`.
>
> La librería ([davidcasr/colombia-open](https://github.com/davidcasr/colombia-open))
> no tiene ningún doc de marca — vivía ahí hasta que se separó la landing
> a este repo.

## Logomarca — "constelación"

Un punto central dorado (el dataset ya curado) con puntos grises alrededor
(fuentes todavía sueltas) conectados por líneas finas. Se lee de afuera
hacia el centro: cada fuente oficial empieza dispersa, con su propio
formato, y converge en un único dataset validado.

- Vive en `public/brand/mark-gold.svg` (punto central dorado, para fondos
  oscuros/índigo) y `public/brand/mark-indigo.svg` (punto central índigo,
  para fondos claros/hueso) — ver `components/BrandMark.tsx` para el SVG
  inline que usan `SiteHeader`, `Hero` y `SiteFooter`.
- **Regla dura**: el punto central es la única señal de "dato ya
  consolidado" — nunca se usa ese color para otra cosa (alertas, enlaces
  genéricos, etc.).
- El favicon (32px) se reduce al punto central solo, sin los puntos
  dispersos — ver `public/favicon.svg`.

## Paleta

| Token | Rol | Hex (claro) | Hex (oscuro) |
|---|---|---|---|
| `--bg` | Fondo primario | `#F4F1EA` (hueso) | `#17233D` (índigo) |
| `--bg-alt` | Superficie de tarjeta | `#FFFFFF` | `#1F2E4E` |
| `--fg` | Texto primario | `#1B2A4A` | `#F4F1EA` |
| `--fg-muted` | Texto secundario, puntos dispersos del logo | `#5B6578` | `#AEB6C4` |
| `--accent` | Acento de dato — "esto ya está consolidado" | `#C9A227` | `#D9B544` |
| `--alert` | Alerta — fuente caída, validación fallida | `#B5542E` | `#E0825A` |

`--accent` y `--alert` nunca se mezclan: oro es siempre "dato bueno /
reciente", terracota es siempre "algo falló". No hay un tercer color
semántico todavía.

**Regla dura**: nada de hex crudo fuera de `app/globals.css` (los `:root` /
`@media (prefers-color-scheme: dark)` / `[data-theme]`) y de este archivo.
Cualquier componente nuevo consume `var(--token)`, nunca un literal.

## Tipografía

- **Display** (wordmark, títulos de sección): [Fraunces](https://fonts.google.com/specimen/Fraunces),
  italic, peso 560.
- **Cuerpo / UI**: [Inter](https://fonts.google.com/specimen/Inter), 400/500/600.
- **Código / datos** (hex, nombres de columna, snippets): [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).

Las tres se cargan desde Google Fonts en `app/layout.tsx` — ver el
`<link>` de `fonts.googleapis.com` ahí.

## Temas

El sitio respeta `prefers-color-scheme` por defecto, con un botón para
forzar el tema (`components/ThemeToggle.tsx`, guardado en
`localStorage`, por viewer, no compartido). La estructura de tokens en
`app/globals.css` sigue siempre este patrón: valores claros en `:root`,
valores oscuros repetidos en `@media (prefers-color-scheme: dark)` y en
`[data-theme="dark"]` — nunca un color definido solo dentro de un bloque
condicional.

## Voz

Calmada, precisa, nombra la fuente y la fecha de vigencia del dato, nunca
promete "en vivo" cuando es un snapshot cacheado. Vocabulario ancla:
*fuente, vigencia, capa, procedencia, validado*. Evitar: "en tiempo real",
"garantizado", "oficial" sin matizar — colombia-open no es el DANE, es una
capa encima del DANE. Sin signos de exclamación cerca de datos o cifras.

## Dónde vive cada cosa

```
app/
├── globals.css     # implementación real de los tokens (debe igualar la tabla de arriba)
└── layout.tsx       # <meta> de OG/Twitter, carga de fuentes de Google Fonts
public/
├── favicon.svg       # versión reducida del mark para el tab del navegador
├── og-image.png      # 1200×630, usado en <meta property="og:image">
└── brand/
    ├── mark-gold.svg
    └── mark-indigo.svg
components/
├── BrandMark.tsx     # SVG inline del mark + ícono de GitHub
└── ThemeToggle.tsx   # botón de modo claro/oscuro
```

`og-image.png` es la vista previa que muestran Twitter/X, Slack, WhatsApp,
LinkedIn, etc. al compartir la URL del sitio (`openGraph.images` /
`twitter.images` en `app/layout.tsx`). Se regenera con el script ad-hoc
que generó la versión actual (fondo `--bg` oscuro, mark dorado escalado,
wordmark en Fraunces itálica, tagline en Inter) — no hay pipeline
automatizado todavía; si cambia el wordmark o la paleta, regenerar a mano
y mantener 1200×630.
