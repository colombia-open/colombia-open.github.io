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
  release. Wireado desde `release.yml` de la librería (secret
  `LANDING_DISPATCH_TOKEN` allá) — ver `.claude/rules/data-source.md`.
- `workflow_dispatch` — manual.

## Si el deploy falla

El job `notify-failure` abre un issue "Deploy de la landing fallando" al
primer fallo (y comenta en él en los siguientes). Ciérralo a mano cuando
el deploy vuelva a pasar. Causa más común: un dataset nuevo en el último
release de la librería sin entrada en `content/catalogo.json`.

El build ya no usa `api.github.com` para el caso normal: el catálogo se
baja de `releases/latest/download/dataset_catalog.json` y el tag sale de
la redirección (la API queda solo como respaldo para releases sin
`dataset_catalog.json`).

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
