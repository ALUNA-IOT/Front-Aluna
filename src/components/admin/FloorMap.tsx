"use client";

import { useEffect, useMemo, useState } from "react";
import type { ZoneId, ZoneState } from "@/types/floor";
import Floor5Svg from "./Floor5Svg";
import ZoneDetailsPanel from "./ZoneDetailsPanel";
import { getFloor5State, getZoneState } from "@/services/floor/floor.service";

export default function FloorMap() {
  const [zones, setZones] = useState<ZoneState[]>([]);
  const [selectedId, setSelectedId] = useState<ZoneId | null>(null);
  const [fetchedZone, setFetchedZone] = useState<ZoneState | null>(null);
  const [loadingZone, setLoadingZone] = useState(false);

  // 1️⃣ Cargar zonas (mock base)
  useEffect(() => {
    let mounted = true;

    (async () => {
      const floor = await getFloor5State();

      if (!mounted || !floor?.zones?.length) return;

      setZones(floor.zones);
      setSelectedId(floor.zones[0].id);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const zoneById = useMemo(() => new Map(zones.map((z) => [z.id, z])), [zones]);

  // 2️⃣ Cargar datos dinámicos de la zona seleccionada
  useEffect(() => {
    if (!selectedId) return;

    let mounted = true;

    (async () => {
      setLoadingZone(true);

      const z = await getZoneState(selectedId);

      if (mounted) {
        setFetchedZone(z);
        setLoadingZone(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [selectedId]);

  // 3️⃣ Zona final a mostrar
  const selectedZone = useMemo<ZoneState | null>(() => {
    if (!selectedId) return null;
    return fetchedZone ?? zoneById.get(selectedId) ?? null;
  }, [selectedId, fetchedZone, zoneById]);

  return (
    <section className="grid h-[calc(100vh-110px)] grid-cols-12 gap-4">
      {/* MAPA */}
      <div className="col-span-8 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <div className="h-full w-full rounded-2xl border border-white/10 bg-black/20">
          <Floor5Svg
            zones={zones}
            selectedId={selectedId}
            onSelect={(id) => {
              //  blindaje: solo aceptar ids válidos
              if (!zoneById.has(id)) return;
              setSelectedId(id);
            }}
          />
        </div>
      </div>

      {/* PANEL */}
      <div className="col-span-4">
        <ZoneDetailsPanel zone={selectedZone} loading={loadingZone} />
      </div>
    </section>
  );
}
