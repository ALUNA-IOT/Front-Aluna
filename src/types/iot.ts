// src/types/iot.ts

export interface IoTTelemetryEntry {
  deviceId: string;
  temperature?: number;
  humidity?: number;
  timestamp?: number;
}

export interface IoTStateResponse {
  telemetry: Record<string, IoTTelemetryEntry>;
  acks: Record<string, unknown>;
  pending: Record<string, unknown>;
}
