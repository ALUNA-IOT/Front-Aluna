import axios from "axios";
import type { ZoneId, ZoneState } from "@/types/floor";
import type { IoTStateResponse, IoTTelemetryEntry } from "@/types/iot";
import { DEVICE_ZONE_MAP } from "@/services/iot/deviceZoneMap";
import { ZONE_LABELS } from "@/types/floor";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

/* =========================
   READ – live zone state
========================= */
export async function getZoneLiveState(
  zoneId: ZoneId
): Promise<ZoneState | null> {
  const { data } = await axios.get<IoTStateResponse>(
    `${API_BASE}/api/iot/state`
  );

  const telemetry: IoTTelemetryEntry[] = Object.values(data.telemetry);

  const device = telemetry.find((t) => DEVICE_ZONE_MAP[t.deviceId] === zoneId);

  if (!device) return null;

  return {
    id: zoneId,
    label: ZONE_LABELS[zoneId],
    temperature: device.temperature ?? undefined,
    humidity: device.humidity ?? undefined,
    status:
      device.temperature !== undefined && device.temperature > 28
        ? "warning"
        : "on",
  };
}

/* =========================
   WRITE – lights control
========================= */
export async function setLights(deviceId: string, value: "ON" | "OFF") {
  return axios.post(`${API_BASE}/api/devices/${deviceId}/lights`, { value });
}

/* =========================
   WRITE – fan control
========================= */
export async function setFans(
  deviceId: string,
  value: "ON" | "OFF",
  speed?: number
) {
  return axios.post(`${API_BASE}/api/devices/${deviceId}/fans`, {
    value,
    speed,
  });
}
