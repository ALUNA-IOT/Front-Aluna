"use client";

import { useState } from "react";
import { Wind, Zap, Lightbulb, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fanSpeed, setFanSpeed] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(3);
  const [tempMode, setTempMode] = useState<"heat" | "cool" | "auto">("auto");
  const [lightLevel, setLightLevel] = useState(7);
  const [isLightOn, setIsLightOn] = useState(true);
  const [isFanLightOn, setIsFanLightOn] = useState(false);

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

  async function handleFanSpeed(speed: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
    if (!isLive || !meta?.deviceId) return;
    setLoading(true);
    setFanSpeed(speed);
    await setFans(meta.deviceId, speed === 0 ? "OFF" : "ON");
    setLoading(false);
  }

  async function handleLightToggle() {
    const newState = !isLightOn;
    setIsLightOn(newState);
    await handleLight(newState ? "ON" : "OFF");
  }

  async function handleFanLightToggle() {
    const newState = !isFanLightOn;
    setIsFanLightOn(newState);
    // Aquí puedes conectar con el servicio IoT para controlar las luces del ventilador
    // await setFanLights(meta.deviceId, newState ? "ON" : "OFF");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur overflow-y-auto max-h-[90vh]">
              {/* Welcome Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 p-4 mb-8"
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">
                    {zone.label}
                  </h2>
                  <div className="mt-1 text-xs text-white/45">Bienvenido</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                 
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>

              {isLive ? (
                <>
                  {/* Horizontal Grid - Air Conditioner & Energy */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Air Conditioner Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-cyan-500/20">
                            <Wind className="h-5 w-5 text-cyan-400" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">Ventiladores</div>
                            <div className="text-xs text-white/50">Humedad: {zone.humidity ?? "—"}%</div>
                            <div className="text-xs text-white/50">Modo: Auto / Eco</div>
                          </div>
                        </div>
                      </div>

                      {/* Temperature Display - Large */}
                      <div className="flex items-center justify-center my-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-white mb-2">
                            {zone.temperature ?? "—"}
                            <span className="text-2xl text-white/60">°C</span>
                          </div>
                          <div className="text-sm text-white/60">Temperatura Actual</div>
                        </div>
                      </div>

                      {/* Fan Speed Control with +/- buttons */}
                      <div className="mb-4">
                        <label className="block text-xs text-white/70 mb-3">Velocidad del Ventilador</label>
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading || fanSpeed === 0}
                            onClick={() => setFanSpeed(Math.max(0, fanSpeed - 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6)}
                            className="shrink-0 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition flex items-center justify-center disabled:opacity-50"
                          >
                            −
                          </motion.button>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-sm font-semibold text-white">
                                {fanSpeed === 0 ? "OFF" : `Nivel ${fanSpeed}`}
                              </div>
                            </div>
                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                              <motion.div
                                className="h-full bg-linear-to-r from-cyan-400 to-blue-400 rounded-full"
                                animate={{ width: `${(fanSpeed / 6) * 100}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading || fanSpeed === 6}
                            onClick={() => setFanSpeed(Math.min(6, fanSpeed + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6)}
                            className="shrink-0 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition flex items-center justify-center disabled:opacity-50"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>

                      {/* Fan Power Info */}
                      <div className="mt-4 text-center">
                        <div className="text-xs text-white/50">Velocidad: Medio</div>
                        <div className="text-sm font-semibold text-cyan-200">2.5 kWh/h</div>
                      </div>

                      {/* Fan Lights Toggle */}
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white">Encender Luces del Ventilador</div>
                            <div className="text-xs text-white/50 mt-1">Iluminación del ventilador</div>
                          </div>
                          <motion.button
                            onClick={handleFanLightToggle}
                            disabled={loading}
                            className="w-12 h-6 rounded-full relative cursor-pointer border border-white/30 transition"
                            style={{
                              backgroundColor: isFanLightOn ? 'rgb(34 197 94)' : 'rgb(255 255 255 / 0.2)',
                            }}
                          >
                            <motion.div
                              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                              animate={{ x: isFanLightOn ? 20 : 2 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Energy Usage Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-500/20">
                            <Lightbulb className="h-5 w-5 text-amber-400" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">Uso de Energía</div>
                            <div className="text-xs text-white/50 mt-1">Luz Sala Piso 5</div>
                            <div className="text-xs text-white/50">Luz Cálida</div>
                          </div>
                        </div>
                        {/* Toggle switch */}
                        <motion.button
                          onClick={handleLightToggle}
                          disabled={loading}
                          className="w-12 h-6 rounded-full relative cursor-pointer border border-white/30 transition"
                          style={{
                            backgroundColor: isLightOn ? 'rgb(251 146 60)' : 'rgb(255 255 255 / 0.2)',
                          }}
                        >
                          <motion.div
                            className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                            animate={{ x: isLightOn ? 20 : 2 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        </motion.button>
                      </div>

                      {/* Light Bulb Illustration */}
                      <div className="flex justify-center my-6">
                        <div className="relative w-24 h-32">
                          <div className="absolute inset-0 bg-gradient-radial from-amber-300/40 to-transparent rounded-full blur-2xl" />
                          <div className="relative flex flex-col items-center justify-center h-full">
                            <Lightbulb className="w-20 h-20 text-amber-300 fill-amber-300" />
                          </div>
                        </div>
                      </div>

                      {/* Usage stats - Horizontal layout */}
                      <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <div className="text-xs text-white/50">Ahora</div>
                            <div className="text-sm font-semibold text-white">0.12 kWh</div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50">Diario</div>
                            <div className="text-sm font-semibold text-white">3.4 kWh</div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50">Este mes</div>
                            <div className="text-sm font-semibold text-white">78 kWh</div>
                          </div>
                        </div>
                      </div>

                      {/* Usage percentage with +/- controls */}
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={loading || lightLevel === 0}
                          onClick={() => setLightLevel(Math.max(0, lightLevel - 1))}
                          className="shrink-0 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition flex items-center justify-center disabled:opacity-50"
                        >
                          −
                        </motion.button>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-sm font-semibold text-white">{Math.round((lightLevel / 15) * 100)}%</div>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              className="h-full bg-linear-to-r from-amber-300 to-yellow-400 rounded-full"
                              animate={{ width: `${(lightLevel / 15) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={loading || lightLevel === 15}
                          onClick={() => setLightLevel(Math.min(15, lightLevel + 1))}
                          className="shrink-0 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition flex items-center justify-center disabled:opacity-50"
                        >
                          +
                        </motion.button>
                      </div>

                      {/* Usage pattern visualization */}
                      <div className="mt-4">
                        <div className="text-xs text-white/50 mb-2">Patrón de Uso</div>
                        <div className="flex gap-1 h-8">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-linear-to-t from-amber-400 to-amber-300 rounded-sm opacity-70 hover:opacity-100 transition"
                              style={{
                                height: `${Math.random() * 100}%`,
                                alignSelf: 'flex-end',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30"
                >
                  <p className="text-sm text-amber-200 text-center">
                    ⚠️ This zone is not connected to IoT yet.
                  </p>
                </motion.div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
