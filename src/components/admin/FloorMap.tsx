"use client";

import { useEffect, useMemo, useState } from "react";
import type { ZoneId, ZoneState } from "@/types/floor";

import Floor5Svg from "./Floor5Svg";
import ZoneControlModal from "./ZoneControlModal";

import { getFloor5State } from "@/services/floor/floor.service";
import { useZoneLive } from "@/hooks/useZoneLive";

export default function FloorMap() {
  const [zones, setZones] = useState<ZoneState[]>([]);
  const [selectedId, setSelectedId] = useState<ZoneId | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ================================
  //  Zonas base (layout del mapa)
  // ================================
  useEffect(() => {
    let mounted = true;

    const loadFloor = async () => {
      const floor = await getFloor5State();
      if (!mounted || !floor?.zones?.length) return;

      setZones(floor.zones);
    };

    loadFloor();
    return () => {
      mounted = false;
    };
  }, []);

  // ================================
  //  Estado LIVE / MOCK por zona
  // ================================
  const liveZone = useZoneLive(selectedId);

  const zonesWithLiveData = useMemo(() => {
    return zones.map((z) => (z.id === selectedId && liveZone ? liveZone : z));
  }, [zones, selectedId, liveZone]);

  return (
    <>
      {/* ============== MAPA ============== */}
      <section className="h-[calc(100vh-110px)] rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <div className="h-full w-full rounded-2xl border border-white/10 bg-black/20">
          <Floor5Svg
            zones={zonesWithLiveData}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setModalOpen(true); //  click → modal
            }}
          />
        </div>
      </section>

      {/* ============== MODAL ============== */}
      <ZoneControlModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        zoneId={selectedId}
        zone={liveZone || zones.find((z) => z.id === selectedId) || null}
      />
    </>
  );
}
