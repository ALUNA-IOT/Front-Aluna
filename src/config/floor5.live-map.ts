import type { ZoneId } from "@/types/floor";


export const LIVE_ZONE_MAP: Partial<
  Record<ZoneId, { backendZoneId?: string; deviceId?: string }>
> = {
  Classrooms_East: {
   
    deviceId: "TU_DEVICE_ID_REAL_DEL_AULA_ORIENTAL",
  },
};

export const isLiveZone = (id: ZoneId) => Boolean(LIVE_ZONE_MAP[id]);
