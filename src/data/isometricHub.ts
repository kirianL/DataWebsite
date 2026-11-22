export type BuildingKind =
  | "tower"
  | "dots"
  | "silo"
  | "stepped"
  | "stripedCube"
  | "plainLow"
  | "kiosk"
  | "trees";

export type FlowRole = "all" | "in" | "core" | "out";

export interface IsoNodeInfo {
  id: string;
  title: string;
  role: Exclude<FlowRole, "all">;
  roleLabel: string;
  metric: string;
  metricLabel: string;
  description: string;
}

export interface GridTileSpec {
  u: number;
  v: number;
  kind: BuildingKind;
  nodeId: string;
}

export const ISOMETRIC_KPIS = [
  { value: "34B+", label: "mensajes activados al año" },
  { value: "5.4B+", label: "webhooks enviados en tiempo real" },
  { value: "41s", label: "para el primer evento en vivo" },
] as const;

export const ISOMETRIC_CALLOUT = "Tu hub de datos Customerup";

export const ISO_NODES: Record<string, IsoNodeInfo> = {
  hub: {
    id: "hub",
    title: "Hub central Customerup",
    role: "core",
    roleLabel: "Núcleo de activación",
    metric: "99.55%",
    metricLabel: "disponibilidad operativa",
    description:
      "Recibe señales por la entrada IN, unifica perfiles en milisegundos y dispara recorridos multicanal por la salida OUT sin duplicar tablas.",
  },
  ingress: {
    id: "ingress",
    title: "Ingesta SINPE, Hacienda y web",
    role: "in",
    roleLabel: "Entrada IN",
    metric: "<1 s",
    metricLabel: "latencia de captura",
    description:
      "Conecta pagos por SINPE Móvil, facturación electrónica de Hacienda y eventos de tu sitio o app directo al flujo principal.",
  },
  warehouse: {
    id: "warehouse",
    title: "Silos de warehouse nativos",
    role: "core",
    roleLabel: "Almacenamiento",
    metric: "0 copias",
    metricLabel: "sincronización directa",
    description:
      "Integración nativa con BigQuery, Snowflake y Postgres para leer audiencias actualizadas sin pipelines duplicados.",
  },
  segmentation: {
    id: "segmentation",
    title: "Segmentación y gobernanza Ley 8968",
    role: "in",
    roleLabel: "Identidad y reglas",
    metric: "3×3",
    metricLabel: "matrices de perfilado",
    description:
      "Cruza atributos propios, permisos de contacto y comportamiento reciente para definir audiencias listas para activar.",
  },
  channels: {
    id: "channels",
    title: "Despacho a correo, WhatsApp y webhooks",
    role: "out",
    roleLabel: "Salida OUT",
    metric: "34B+",
    metricLabel: "mensajes entregados",
    description:
      "Entrega alertas transaccionales, campañas por correo, WhatsApp, notificaciones push y webhooks con observabilidad completa.",
  },
  telemetry: {
    id: "telemetry",
    title: "Nodos de telemetría y observabilidad",
    role: "out",
    roleLabel: "Monitoreo",
    metric: "24/5",
    metricLabel: "soporte desde San José",
    description:
      "Supervisa cada entrega, reintento y tasa de conversión en tiempo real con trazabilidad desde tu equipo técnico.",
  },
};

/**
 * Exact 5×5 isometric layout mapped 1:1 from references/isometric-reference.png
 * u: 0..4 (top-left -> bottom-right)
 * v: 0..4 (top-right -> bottom-left)
 */
export const CITY_TILES: GridTileSpec[] = [
  // Row v = 0 (top-right outer edge)
  { u: 0, v: 0, kind: "trees", nodeId: "telemetry" },
  { u: 1, v: 0, kind: "dots", nodeId: "segmentation" },
  { u: 2, v: 0, kind: "dots", nodeId: "channels" },
  { u: 3, v: 0, kind: "trees", nodeId: "telemetry" },
  { u: 4, v: 0, kind: "stepped", nodeId: "channels" },

  // Row v = 1
  { u: 0, v: 1, kind: "trees", nodeId: "telemetry" },
  { u: 1, v: 1, kind: "kiosk", nodeId: "hub" },
  { u: 2, v: 1, kind: "dots", nodeId: "channels" },
  { u: 3, v: 1, kind: "stripedCube", nodeId: "channels" },
  { u: 4, v: 1, kind: "silo", nodeId: "warehouse" },

  // Row v = 2 (central row)
  { u: 0, v: 2, kind: "stepped", nodeId: "ingress" },
  { u: 1, v: 2, kind: "stepped", nodeId: "ingress" },
  { u: 2, v: 2, kind: "tower", nodeId: "hub" },
  { u: 3, v: 2, kind: "dots", nodeId: "channels" },
  { u: 4, v: 2, kind: "trees", nodeId: "telemetry" },

  // Row v = 3
  { u: 0, v: 3, kind: "silo", nodeId: "warehouse" },
  { u: 1, v: 3, kind: "trees", nodeId: "ingress" },
  { u: 2, v: 3, kind: "trees", nodeId: "ingress" },
  { u: 3, v: 3, kind: "dots", nodeId: "segmentation" },
  { u: 4, v: 3, kind: "dots", nodeId: "segmentation" },

  // Row v = 4 (bottom-left outer edge)
  { u: 0, v: 4, kind: "dots", nodeId: "ingress" },
  { u: 1, v: 4, kind: "silo", nodeId: "warehouse" },
  { u: 2, v: 4, kind: "trees", nodeId: "telemetry" },
  { u: 3, v: 4, kind: "silo", nodeId: "warehouse" },
  { u: 4, v: 4, kind: "trees", nodeId: "telemetry" },
];
