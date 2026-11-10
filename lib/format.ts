const BOGOTA_OFFSET_HOURS = -5;
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]; // fmt: skip

export function formatCount(n: number): string {
  return n.toLocaleString("es-CO");
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "sin fecha";
  const utcMs = new Date(iso).getTime();
  const bogota = new Date(utcMs + BOGOTA_OFFSET_HOURS * 60 * 60 * 1000);
  return `${bogota.getUTCDate()} de ${MESES[bogota.getUTCMonth()]} de ${bogota.getUTCFullYear()}`;
}

/** El endpoint JSON de Socrata no se lee bien en un navegador: enlaza la vista. */
export function humanSourceUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.replace(
    /^(https:\/\/www\.datos\.gov\.co\/resource\/[a-z0-9]{4}-[a-z0-9]{4})\.json$/,
    "$1"
  );
}
