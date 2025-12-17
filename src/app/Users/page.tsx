'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb,
  Fan,
  Gauge,
  Activity,
  Sparkles,
  SunMoon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { telemetrySocket, TelemetryState } from '@/services/ws/telemetry-socket';
import { Button } from '@/components/UI/Button';

const deviceId = 'nano-esp32-01';

export default function UsersDashboard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [telemetry, setTelemetry] = useState<TelemetryState | null>(null);
  const [lastCommand, setLastCommand] = useState<string>('—');

  useEffect(() => {
    const onLatest = (arr: TelemetryState[]) => {
      const found = arr.find((t) => t.deviceId === deviceId);
      if (found) setTelemetry(found);
    };
    const onUpdate = (t: TelemetryState) => {
      if (t.deviceId === deviceId) setTelemetry(t);
    };
    telemetrySocket.onLatest(onLatest);
    telemetrySocket.onUpdate(onUpdate);
    return () => {
      telemetrySocket.off('telemetry:latest', onLatest);
      telemetrySocket.off('telemetry:update', onUpdate);
    };
  }, []);

  const send = (action: () => void, label: string) => {
    action();
    setLastCommand(`${label} @ ${new Date().toLocaleTimeString()}`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      className="min-h-screen"
    >
      <motion.div variants={cardVariants} className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-2 bg-gradient-text bg-clip-text text-transparent">
          Control de Auditorio (Piso 3)
        </h1>
        <p className="text-muted-foreground">
          Telemetría en vivo y control directo vía WebSocket → MQTT → dispositivo.
        </p>
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
      >
        <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-background/80 space-y-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Zona</div>
              <div className="text-xl font-semibold">Auditorio (Piso 3)</div>
              <div className="text-xs text-muted-foreground">
                Dispositivo: {deviceId}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Temperatura" value={telemetry ? `${telemetry.temperature.toFixed(1)} °C` : '—'} />
            <Stat label="Humedad" value={telemetry ? `${telemetry.humidity}%` : '—'} />
            <Stat label="Relay (luz)" value={telemetry ? (telemetry.relay ? 'ON' : 'OFF') : '—'} />
            <Stat label="Botón" value={telemetry ? (telemetry.button ? 'ON' : 'OFF') : '—'} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <SwitchCard
              icon={<Lightbulb className="w-4 h-4" />}
              label="Luces del espacio"
              checked={!!telemetry?.relay}
              onToggle={() => {
                const next = telemetry?.relay ? 'OFF' : 'ON';
                setTelemetry((prev) =>
                  prev
                    ? {
                        ...prev,
                        relay: !prev.relay,
                      }
                    : prev,
                );
                send(
                  () =>
                    telemetrySocket.sendRelay({
                      deviceId,
                      command: next,
                    }),
                  `Relay ${next}`,
                );
              }}
            />
            <SwitchCard
              icon={<Fan className="w-4 h-4" />}
              label="Ventilador"
              checked={false} // toggle-only; estado no reportado, usamos false fijo
              onToggle={() =>
                send(() => telemetrySocket.sendFan({ deviceId, command: 'toggle' }), 'Fan toggle')
              }
            />
            <SwitchCard
              icon={<Sparkles className="w-4 h-4" />}
              label="Luz ventilador"
              checked={false} // toggle-only; estado no reportado, usamos false fijo
              onToggle={() =>
                send(
                  () => telemetrySocket.sendLight({ deviceId, command: 'toggle' }),
                  'Fan light toggle',
                )
              }
            />
            <ControlButton
              icon={<Gauge className="w-4 h-4" />}
              label="Subir velocidad ventilador"
              onClick={() =>
                send(() => telemetrySocket.sendFan({ deviceId, command: 'up' }), 'Fan up')
              }
            />
            <ControlButton
              icon={<Gauge className="w-4 h-4" />}
              label="Bajar velocidad ventilador"
              onClick={() =>
                send(() => telemetrySocket.sendFan({ deviceId, command: 'down' }), 'Fan down')
              }
            />
            <ControlButton
              icon={<SunMoon className="w-4 h-4" />}
              label="Subir intensidad luces"
              onClick={() =>
                send(
                  () => telemetrySocket.sendLight({ deviceId, command: 'up' }),
                  'Fan light up',
                )
              }
            />
            <ControlButton
              icon={<SunMoon className="w-4 h-4" />}
              label="Bajar intensidad luces"
              onClick={() =>
                send(
                  () => telemetrySocket.sendLight({ deviceId, command: 'down' }),
                  'Fan light down',
                )
              }
            />
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-background/80 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="w-4 h-4 text-primary" />
            <span>Estado</span>
          </div>
          <div className="text-sm">Último comando:</div>
          <div className="text-base font-semibold">{lastCommand}</div>
          <div className="text-sm text-muted-foreground">
            Telemetría: {telemetry ? 'Recibiendo' : '—'}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-border bg-background/70">
      <div className="text-xs text-muted-foreground uppercase">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function ControlButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full p-3 rounded-lg border border-border bg-secondary/20 hover:border-primary/60 hover:bg-primary/5 transition"
    >
      <span className="text-primary">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

function SwitchCard({
  icon,
  label,
  checked,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="p-3 rounded-lg border border-border bg-background/70 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          checked ? 'bg-primary' : 'bg-secondary/40'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
