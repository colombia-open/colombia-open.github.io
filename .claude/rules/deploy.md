# Deploy

`.github/workflows/deploy.yml` construye con `next build` (static
export, `output: "export"` en `next.config.ts` → sale a `out/`) y
publica a GitHub Pages vía `actions/deploy-pages`. No hay servidor: todo
el sitio es HTML/CSS/JS estático generado en build-time.

## Disparadores

- `push` a `main` — cambios en este repo (diseño, componentes).
- `schedule` (cron diario) — el contenido real cambia en la librería, no
  aquí, así que el sitio se reconstruye solo para no quedar
  desactualizado más de ~24h. Ver `.claude/rules/data-source.md`.
- `repository_dispatch` tipo `library-release` — pensado para que
  `davidcasr/colombia-open` dispare un rebuild inmediato al publicar
  release. No está wireado del otro lado todavía.
- `workflow_dispatch` — manual.

## Dominio

El repo se llama exactamente `colombia-open.github.io` (convención de
GitHub Pages para el "sitio de organización": sin ese nombre exacto,
Pages publicaría en una subruta en vez de la raíz). Si en algún momento
se compra un dominio propio, se configura en Settings → Pages de este
repo (registro `CNAME`), sin tocar el nombre del repo.

## Antes de fusionar un cambio de deploy

Corre `npm run build` localmente — si el fetch al catálogo falla (red,
release caído), el build falla igual que en CI; es el comportamiento
esperado, no un bug del workflow.
