# Contrato de la fuente de datos

Este sitio no tiene base de datos propia. Todo el contenido que describe
un dataset real (qué existe, cuántas filas tiene, su licencia, su fuente
oficial) viene de **davidcasr/colombia-open** (otro repo), leído en
build-time por `lib/catalog.ts`.

## Qué se lee y de dónde

1. **`dataset_catalog.json` del último GitHub Release** de
   `davidcasr/colombia-open` (`fetchLatestCatalog()`) — la verdad sobre
   qué datasets están publicados hoy: descripción, `record_count`,
   `source_name`, `source_url`, `reuse_policy`, `refreshed_at_utc`.
2. **`data/registry/datasets.json` de la rama `main`** del mismo repo
   (`fetchRegistry()`) — el registro completo (publicados y no), usado
   solo para resolver la fuente oficial de los datasets del roadmap que
   todavía no están en un release.

Ninguno de los dos se cachea entre builds ni se versiona en este repo —
se vuelve a pedir en cada build (`cache: "no-store"` en los fetch de
`lib/catalog.ts`), así el sitio siempre refleja el último release al
reconstruirse.

## Qué sí vive en este repo: solo presentación

`content/catalogo.json` y `content/roadmap.json` — mapean cada
`dataset` (el slug) a un título bonito y un grupo/orden de visualización.
**Nunca** llevan un dato que ya esté en el catálogo publicado (conteo de
filas, licencia, fuente, fecha) — eso siempre se toma del catálogo real,
nunca de estos archivos.

Si agregas un dataset nuevo a `content/catalogo.json`/`roadmap.json` que
no existe en el catálogo publicado, el build falla con un mensaje claro
(`SiteBuildError` en `lib/catalog.ts`) — es intencional, replica el mismo
gate que tiene `scripts/build_site.py` en el repo de la librería.

## Por qué el build falla fuerte si el fetch falla

No hay fallback embebido aquí. Si `fetchLatestCatalog()` o
`fetchRegistry()` no pueden completarse (release caído, GitHub con
problemas, release sin el asset esperado), el build de Next.js falla —
GitHub Actions no llega al paso de deploy, y el sitio publicado
anteriormente se queda en línea sin cambios. Eso es preferible a:

- publicar un catálogo vacío o parcial,
- o inventar datos de relleno para que el build "pase".

Ver el comentario en `.github/workflows/deploy.yml`.

## Mantener el sitio actualizado sin que cambie este repo

El contenido real cambia cuando la librería publica un release, no
cuando cambia código de este repo. Por eso `.github/workflows/deploy.yml`
no solo se dispara por push a `main`: también corre a diario (`schedule`)
y escucha `repository_dispatch` tipo `library-release`.

**Wiring hecho** en `davidcasr/colombia-open`: `.github/workflows/release.yml`
de ese repo dispara `repository_dispatch` (`type: library-release`)
contra este repo justo después de publicar el release, usando el secret
`LANDING_DISPATCH_TOKEN` (PAT con permiso `repo`) configurado allá — no
aquí. Si ese secret no está configurado en ese repo (o el PAT vence), ese
paso falla solo, sin romper el release de datos, y el cron diario de
este repo sigue siendo el mecanismo de respaldo — con hasta ~24h de
retraso en vez de ser inmediato.
