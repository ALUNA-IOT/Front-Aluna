"use client";

import { useEffect, useState } from "react";
import type { ZoneId, ZoneState } from "@/types/floor";
import { ZONE_LABELS } from "@/types/floor";
import { getZoneLiveState } from "@/services/iot/iot.service";
import { isLiveZone } from "@/config/floor5.live-map";

function buildMockZone(id: ZoneId): ZoneState & { isMock: true } {
  return {
    id,
    label: ZONE_LABELS[id],
    status: "off",
    temperature: 24,
    humidity: 55,
    fanSpeed: 0,
    lightLevel: 0,
    isMock: true,
  };
}

export function useZoneLive(selectedId: ZoneId | null) {
  const [zone, setZone] = useState<(ZoneState & { isMock?: boolean }) | null>(
    null
  );

  useEffect(() => {
    let mounted = true;

    const loadZone = async () => {
      if (!selectedId) {
        if (mounted) setZone(null);
        return;
      }

      // 🟡 Zona NO conectada a IoT → mock
      if (!isLiveZone(selectedId)) {
        if (mounted) setZone(buildMockZone(selectedId));
        return;
      }

      // 🟢 Zona LIVE (Aula Oriental)
      const live = await getZoneLiveState(selectedId);

      if (mounted) setZone(live);
    };

    loadZone();

    return () => {
      mounted = false;
    };
  }, [selectedId]);

  return zone;
}
