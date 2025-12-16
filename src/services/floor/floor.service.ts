// src/services/floor/floor.service.ts
import type { FloorState, ZoneId, ZoneState } from "@/types/floor";
import { FLOOR5_MOCK, floor5ZoneMap } from "./floor.mock";

type LatestTelemetryResponse = {
  // Ajusta a tu backend real cuando ya lo tengas definido
  temperature?: number;
  humidity?: number;
  fanPower?: number;
  fanSpeed?: number;
  lightLevel?: number;
};

export async function getFloor5State(): Promise<FloorState> {
  // Reemplazo futuro: aquí podrías traer /api/floors + /api/zones
  // Por ahora devolvemos la base mock.
  return FLOOR5_MOCK;
}

export async function getZoneState(zoneId: ZoneId): Promise<ZoneState> {
  // MVP ZONE: lista para endpoint (sin tocar vista)
  if (zoneId === "Classrooms_East") {
    const base = floor5ZoneMap.get(zoneId)!;

    try {
      // EJEMPLO: cámbialo a tu endpoint real cuando lo conecten.
      // Si tu backend usa zoneId numérico, aquí haces el mapping.
      const res = await fetch(`/api/telemetry/latest?zoneId=${zoneId}`, {
        cache: "no-store",
      });

      if (!res.ok) return base;

      const data = (await res.json()) as LatestTelemetryResponse;

      return {
        ...base,
        temperature: data.temperature ?? base.temperature,
        humidity: data.humidity ?? base.humidity,
        fanPower: data.fanPower ?? base.fanPower,
        fanSpeed: data.fanSpeed ?? base.fanSpeed,
        lightLevel: data.lightLevel ?? base.lightLevel,
        status: "on",
      };
    } catch {
      return base;
    }
  }

  // Otras zonas: quemadas
  return floor5ZoneMap.get(zoneId)!;
}
