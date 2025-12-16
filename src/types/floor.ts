// src/types/floor.ts

export type ZoneId =
  | "Classrooms_East"
  | "Classrooms_Western"
  | "Blackbird_1"
  | "Blackbird_2"
  | "Air"
  | "Play_area"
  | "Bathrooms_area"
  | "Stairs"
  | "Emergency_exit"
  | "Emergency_exit2";

export type ZoneStatus = "on" | "off" | "warning" | "emergency";

export interface ZoneState {
  id: ZoneId;
  label: string;

  temperature?: number; // °C
  humidity?: number; // %
  fanPower?: number; // 0–100
  fanSpeed?: number; // 0–7
  lightLevel?: number; // 0–4

  status: ZoneStatus;
}

export interface FloorState {
  id: string;
  label: string;
  zones: ZoneState[];
}

export type ZoneLabelPos = Record<
  ZoneId,
  { x: number; y: number; align?: "start" | "middle" | "end" }
>;

/**
 * IMPORTANTÍSIMO:
 * Coordenadas basadas en el viewBox REAL del SVG:
 * viewBox="0 0 1920 1080"
 *
 * Estos valores se ajustan UNA SOLA VEZ visualmente.
 */
export const FLOOR5_LABEL_POS: ZoneLabelPos = {
  // Floor 5
  Classrooms_East: { x: 445, y: 747, align: "middle" },
  Classrooms_Western: { x: 1439, y: 750, align: "middle" },

  Blackbird_1: { x: 1315, y: 456, align: "middle" },
  Blackbird_2: { x: 1526, y: 416, align: "middle" },

  Air: { x: 951, y: 580, align: "middle" },
  Play_area: { x: 504, y: 304, align: "middle" },
  Bathrooms_area: { x: 434, y: 553, align: "middle" },
  Stairs: { x: 1312, y: 302, align: "middle" },

  Emergency_exit: { x: 265, y: 145, align: "start" },
  Emergency_exit2: { x: 1663, y: 175, align: "end" },
};

export const ZONE_LABELS: Record<ZoneId, string> = {
  Classrooms_East: "Aula Oriental",
  Classrooms_Western: "Aula Occidental",
  Blackbird_1: "Blackbird 1",
  Blackbird_2: "Blackbird 2",
  Air: "HVAC",
  Play_area: "Zona de Juegos",
  Bathrooms_area: "Baños",
  Stairs: "Escaleras",
  Emergency_exit: "Salida",
  Emergency_exit2: "Salida",
};
