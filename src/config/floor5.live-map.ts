import type { ZoneId } from "@/types/floor";

/**
 * Aquí defines qué zonas YA están conectadas (REAL)
 * y a qué deviceId o zoneId del backend apuntan.
 *
 * Por ahora solo el MVP: Aula Oriental
 */
export const LIVE_ZONE_MAP: Partial<
  Record<ZoneId, { backendZoneId?: string; deviceId?: string }>
> = {
  Classrooms_East: {
    // usa UNA de estas dos según lo que tengas:
    // backendZoneId: "3",
    deviceId: "TU_DEVICE_ID_REAL_DEL_AULA_ORIENTAL",
  },
};

export const isLiveZone = (id: ZoneId) => Boolean(LIVE_ZONE_MAP[id]);
