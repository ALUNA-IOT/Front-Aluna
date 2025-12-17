'use client';

import { useEffect, useMemo, useState } from 'react';
import { telemetrySocket, TelemetryState } from '@/services/ws/telemetry-socket';
import { Button } from '@/components/UI/Button';
import { Thermometer, Droplets, Lightbulb, Wind, Fan } from 'lucide-react';

type Floor = { floor_id: number; floor_number: number; floor_name: string };
type Zone = {
  zone_id: number;
  floor_id: number;
  zone_name: string;
  zone_type: string;
  description: string;
  ideal_temperature?: number;
};
type Schedule = {
  class_id: number;
  zone_id: number;
  teacher_name: string;
  group_name: string;
  start_time: string;
  end_time: string;
};

type ZonesResponse = {
  floors: Floor[];
  zones: Zone[];
  schedules: Schedule[];
};

const deviceIdAuditorio = 'nano-esp32-01';

export function ZonesMap() {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [telemetry, setTelemetry] = useState<Map<string, TelemetryState>>(new Map());

  useEffect(() => {
    fetchZones();
    const onLatest = (arr: TelemetryState[]) => {
      const m = new Map<string, TelemetryState>();
      arr.forEach((t) => m.set(t.deviceId, t));
      setTelemetry(m);
    };
    const onUpdate = (t: TelemetryState) => {
      setTelemetry((prev) => {
        const m = new Map(prev);
        m.set(t.deviceId, t);
        return m;
      });
    };
    telemetrySocket.onLatest(onLatest);
    telemetrySocket.onUpdate(onUpdate);
    return () => {
      telemetrySocket.off('telemetry:latest', onLatest);
      telemetrySocket.off('telemetry:update', onUpdate);
    };
  }, []);

  const zonesByFloor = useMemo(() => {
    return zones.reduce<Record<number, Zone[]>>((acc, z) => {
      acc[z.floor_id] = acc[z.floor_id] ? [...acc[z.floor_id], z] : [z];
      return acc;
    }, {});
  }, [zones]);

  const auditorioTelemetry = telemetry.get(deviceIdAuditorio);
  const auditorioSchedule = schedules.filter(
    (s) => selectedZone?.zone_name === 'Auditorio' && s.zone_id === selectedZone.zone_id,
  );

  async function fetchZones() {
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const res = await fetch(`${base}/api/zones`);
      const data: ZonesResponse = await res.json();
      setFloors(data.floors);
      setZones(data.zones);
      setSchedules(data.schedules);
      if (data.floors.length && selectedFloor === null) {
        setSelectedFloor(data.floors[0].floor_id);
      }
    } catch (err) {
      console.error('Failed to load zones', err);
    }
  }

  function selectZone(zone: Zone) {
    setSelectedZone(zone);
    setSelectedFloor(zone.floor_id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {floors.map((f) => (
          <Button
            key={f.floor_id}
            variant={selectedFloor === f.floor_id ? 'primary' : 'outline'}
            onClick={() => setSelectedFloor(f.floor_id)}
          >
            Piso {f.floor_number}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(zonesByFloor[selectedFloor ?? -1] ?? []).map((z) => (
          <div
            key={z.zone_id}
            onClick={() => selectZone(z)}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              selectedZone?.zone_id === z.zone_id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/40'
            }`}
          >
            <div className="text-sm text-muted-foreground">{z.zone_type}</div>
            <div className="text-xl font-semibold">{z.zone_name}</div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {z.description}
            </div>
          </div>
        ))}
      </div>

      {selectedZone?.zone_name === 'Auditorio' && (
        <div className="p-4 rounded-xl border border-primary/40 bg-primary/5 space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-semibold">Auditorio</h3>
            <div className="text-sm text-muted-foreground">Dispositivo: {deviceIdAuditorio}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Thermometer className="w-5 h-5" />}
              label="Temperatura"
              value={
                auditorioTelemetry ? `${auditorioTelemetry.temperature.toFixed(1)} °C` : '—'
              }
            />
            <StatCard
              icon={<Droplets className="w-5 h-5" />}
              label="Humedad"
              value={auditorioTelemetry ? `${auditorioTelemetry.humidity}%` : '—'}
            />
            <StatCard
              icon={<Lightbulb className="w-5 h-5" />}
              label="Luz principal (relay)"
              value={auditorioTelemetry ? (auditorioTelemetry.relay ? 'ON' : 'OFF') : '—'}
            />
            <StatCard
              icon={<Wind className="w-5 h-5" />}
              label="Botón"
              value={auditorioTelemetry ? (auditorioTelemetry.button ? 'ON' : 'OFF') : '—'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ControlCard
              title="Luz principal"
              icon={<Lightbulb className="w-4 h-4" />}
              actions={[
                { label: 'Encender', onClick: () => telemetrySocket.sendRelay({ deviceId: deviceIdAuditorio, command: 'ON' }) },
                { label: 'Apagar', onClick: () => telemetrySocket.sendRelay({ deviceId: deviceIdAuditorio, command: 'OFF' }) },
              ]}
            />
            <ControlCard
              title="Ventilador"
              icon={<Fan className="w-4 h-4" />}
              actions={[
                { label: 'Encender', onClick: () => telemetrySocket.sendFan({ deviceId: deviceIdAuditorio, command: 'toggle' }) },
                { label: 'Subir velocidad', onClick: () => telemetrySocket.sendFan({ deviceId: deviceIdAuditorio, command: 'up' }) },
                { label: 'Bajar velocidad', onClick: () => telemetrySocket.sendFan({ deviceId: deviceIdAuditorio, command: 'down' }) },
              ]}
            />
            <ControlCard
              title="Luz del ventilador"
              icon={<Lightbulb className="w-4 h-4" />}
              actions={[
                { label: 'Encender/Toggle', onClick: () => telemetrySocket.sendLight({ deviceId: deviceIdAuditorio, command: 'toggle' }) },
                { label: 'Subir intensidad', onClick: () => telemetrySocket.sendLight({ deviceId: deviceIdAuditorio, command: 'up' }) },
                { label: 'Bajar intensidad', onClick: () => telemetrySocket.sendLight({ deviceId: deviceIdAuditorio, command: 'down' }) },
              ]}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Horarios programados (Auditorio)</h4>
            <div className="space-y-2">
              {auditorioSchedule.length === 0 && (
                <div className="text-sm text-muted-foreground">Sin clases programadas.</div>
              )}
              {auditorioSchedule.map((s) => (
                <div
                  key={s.class_id}
                  className="p-3 rounded-lg border border-border bg-background/50"
                >
                  <div className="font-semibold">{s.group_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {s.teacher_name} · {new Date(s.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                    {new Date(s.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-border bg-background/70 flex items-center gap-3">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}

function ControlCard({
  title,
  icon,
  actions,
}: {
  title: string;
  icon: React.ReactNode;
  actions: { label: string; onClick: () => void }[];
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-background/70 space-y-2">
      <div className="flex items-center gap-2 font-semibold">
        <div className="text-primary">{icon}</div>
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <Button key={a.label} variant="outline" size="sm" onClick={a.onClick}>
            {a.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
