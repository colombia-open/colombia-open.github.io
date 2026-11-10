export interface ReusePolicy {
  status: string;
  license: string;
  license_url?: string;
  attribution_required?: boolean;
  redistribution_ok?: boolean;
  summary?: string;
}

export interface DatasetEntry {
  dataset: string;
  description: string;
  source_name: string;
  source_url?: string;
  source_mode: "live" | "fallback";
  refreshed_at_utc: string;
  record_count: number;
  join_keys?: string[];
  reuse_policy: ReusePolicy;
  validation_status: string;
  errors: string[];
  warnings: string[];
  outputs: Record<string, string>;
  documentation?: string;
}

export interface DatasetCatalog {
  generated_at_utc: string;
  datasets: DatasetEntry[];
}

export interface CatalogDisplayEntry {
  titulo: string;
  grupo: string;
}

export interface CatalogDisplay {
  grupos: string[];
  datasets: Record<string, CatalogDisplayEntry>;
}

export interface RoadmapRowImplemented {
  dominio: string;
  datasets: string[];
}

export interface RoadmapRowPending {
  dominio: string;
  fuente: string;
  estado: string;
}

export type RoadmapRow = RoadmapRowImplemented | RoadmapRowPending;

export interface Roadmap {
  filas: RoadmapRow[];
}

export interface RegistryEntry {
  description: string;
  source_name: string;
}

export type Registry = Record<string, RegistryEntry>;

export interface CatalogGroup {
  grupo: string;
  entries: Array<{ entry: DatasetEntry; titulo: string }>;
}

export interface RoadmapDisplayRow {
  dominio: string;
  fuente: string;
  restricted: boolean;
}
