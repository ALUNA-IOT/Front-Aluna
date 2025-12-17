"use client";

import { useState } from "react";
import type { ZoneId, ZoneState } from "@/types/floor";
import { isLiveZone, LIVE_ZONE_MAP } from "@/config/floor5.live-map";
import { setLights, setFans } from "@/services/iot/iot.service";

type Props = {
  open: boolean;
  onClose: () => void;
  zoneId: ZoneId | null;
  zone: ZoneState | null;
};

export default function ZoneControlModal({
  open,
  onClose,
  zoneId,
  zone,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!open || !zoneId || !zone) return null;

  const meta = LIVE_ZONE_MAP[zoneId];
  const isLive = isLiveZone(zoneId);

  async function handleLight(value: "ON" | "OFF") {
    if (!isLive || !meta?.deviceId) return;
    setLoading(true);
    await setLights(meta.deviceId, value);
    setLoading(false);
  }

  async function handleFan(value: "ON" | "OFF") {
    if (!isLive || !meta?.deviceId) return;
    setLoading(true);
    await setFans(meta.deviceId, value);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[420px] rounded-2xl border border-white/10 bg-[#0b0f14] p-6 text-white">
        <h2 className="mb-4 text-xl font-semibold">{zone.label}</h2>

        <div className="mb-4 text-sm opacity-80">
          Temperature: {zone.temperature ?? "--"} °C
          <br />
          Humidity: {zone.humidity ?? "--"} %
        </div>

        {isLive ? (
          <div className="flex flex-col gap-3">
            <button
              disabled={loading}
              onClick={() => handleLight("ON")}
              className="rounded-lg bg-cyan-500/80 px-4 py-2 hover:bg-cyan-500"
            >
              Turn lights ON
            </button>

            <button
              disabled={loading}
              onClick={() => handleLight("OFF")}
              className="rounded-lg bg-cyan-500/30 px-4 py-2 hover:bg-cyan-500/40"
            >
              Turn lights OFF
            </button>

            <button
              disabled={loading}
              onClick={() => handleFan("ON")}
              className="rounded-lg bg-indigo-500/80 px-4 py-2 hover:bg-indigo-500"
            >
              Turn fan ON
            </button>

            <button
              disabled={loading}
              onClick={() => handleFan("OFF")}
              className="rounded-lg bg-indigo-500/30 px-4 py-2 hover:bg-indigo-500/40"
            >
              Turn fan OFF
            </button>
          </div>
        ) : (
          <p className="text-sm opacity-60">
            This zone is not connected to IoT yet.
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10"
        >
          Close
        </button>
      </div>
    </div>
  );
}
