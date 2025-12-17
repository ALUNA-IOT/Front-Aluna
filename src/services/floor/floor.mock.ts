// src/services/floor/floor.mock.ts
import type { FloorState, ZoneState, ZoneId } from "@/types/floor";

const Z = (z: ZoneState) => z;

export const FLOOR5_MOCK: FloorState = {
  id: "floor-5",
  label: "Floor 5",
  zones: [
    Z({
      id: "Classrooms_East",
      label: "Aula Oriental (MVP)",
      status: "warning",
    }),

    Z({
      id: "Classrooms_Western",
      label: "Aula Occidental",
      temperature: 25,
      humidity: 62,
      fanPower: 45,
      fanSpeed: 3,
      lightLevel: 3,
      status: "on",
    }),

    Z({
      id: "Blackbird_1",
      label: "Blackbird 1",
      temperature: 27,
      humidity: 70,
      fanPower: 75,
      fanSpeed: 5,
      lightLevel: 2,
      status: "warning",
    }),

    Z({
      id: "Blackbird_2",
      label: "Blackbird 2",
      temperature: 24,
      humidity: 55,
      fanPower: 20,
      fanSpeed: 1,
      lightLevel: 4,
      status: "on",
    }),

    Z({
      id: "Air",
      label: "Zona Aire / HVAC",
      temperature: 23,
      humidity: 50,
      status: "off",
    }),

    Z({
      id: "Play_area",
      label: "Zona de Juegos",
      temperature: 26,
      humidity: 58,
      lightLevel: 2,
      status: "on",
    }),

    Z({
      id: "Bathrooms_area",
      label: "Baños",
      temperature: 24,
      humidity: 65,
      lightLevel: 1,
      status: "off",
    }),

    Z({
      id: "Stairs",
      label: "Escaleras",
      status: "off",
    }),

    Z({
      id: "Emergency_exit",
      label: "Salida Emergencia 1",
      status: "emergency",
    }),

    Z({
      id: "Emergency_exit2",
      label: "Salida Emergencia 2",
      status: "emergency",
    }),
  ],
};

export const floor5ZoneMap = new Map<ZoneId, ZoneState>(
  FLOOR5_MOCK.zones.map((z) => [z.id, z])
);
