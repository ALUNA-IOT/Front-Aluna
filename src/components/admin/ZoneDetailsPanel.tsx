// src/components/admin/ZoneDetailsPanel.tsx
"use client";

import type { ZoneState } from "@/types/floor";
import { Thermometer, Wind, Lightbulb, Users, Cpu, Eye, Power } from "lucide-react";
import { motion } from "framer-motion";

function pill(status: ZoneState["status"]) {
  if (status === "on") return "bg-cyan-500/15 text-cyan-200 border-cyan-400/30";
  if (status === "warning")
    return "bg-amber-500/15 text-amber-200 border-amber-400/30";
  if (status === "emergency")
    return "bg-orange-500/15 text-orange-200 border-orange-400/30";
  return "bg-zinc-500/10 text-zinc-200 border-zinc-400/20";
}

function card() {
  return "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur";
}

export default function ZoneDetailsPanel({
  zone,
  loading,
}: {
  zone: ZoneState | null;
  loading?: boolean;
}) {
  if (!zone) {
    return (
      <aside className="h-full rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <div className="text-white/80 font-semibold">Select a zone</div>
        <p className="mt-2 text-sm text-white/55">
          Click on the map to view telemetry, status and quick controls.
        </p>
      </aside>
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      {/* HEADER with Avatar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 p-4 mb-6"
      >
        <div className="flex-1">
          <div className="text-lg font-semibold text-white">{zone.label}</div>
          <div className="mt-1 text-xs text-white/45">Welcome home</div>
        </div>
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">{zone.label.charAt(0)}</span>
        </div>
      </motion.div>

      {/* MAIN CARDS - Grid Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-1 gap-4 mb-6"
      >
        {/* AIR CONDITIONER CARD */}
        <div className={`${card()} col-span-1`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Wind className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-white font-semibold">Ventiladores</div>
                <div className="text-xs text-white/50">Humedad: {zone.humidity ?? "—"}%</div>
                <div className="text-xs text-white/50">Mode: Auto / Eco</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Power</div>
              <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer border border-white/30 mt-1">
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                  animate={{ x: zone.status === "on" ? 24 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Temperature Dial */}
          <div className="flex items-center justify-center mt-4">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute" viewBox="0 0 120 120" width="140" height="140">
                {/* Background circle */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="8"
                  strokeDasharray={`${Math.PI * 100 * ((zone.temperature ?? 20) / 32)} ${Math.PI * 100}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                {/* Temperature range labels */}
                <text x="20" y="70" fontSize="10" fill="rgba(255,255,255,0.3)" textAnchor="middle">16</text>
                <text x="100" y="70" fontSize="10" fill="rgba(255,255,255,0.3)" textAnchor="middle">32</text>
              </svg>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{zone.temperature ?? "—"}°</div>
                <div className="text-xs text-white/60 mt-1">Cold</div>
                <div className="text-xs text-white/50">Fan: Medium</div>
              </div>
            </div>
          </div>

          {/* AC Controls */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <button className="p-3 rounded-lg bg-white/10 hover:bg-white/15 transition text-white/70 hover:text-white text-xs">☀️</button>
            <button className="p-3 rounded-lg bg-white/10 hover:bg-white/15 transition text-white/70 hover:text-white text-xs">💨</button>
            <button className="p-3 rounded-lg bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-semibold">❄️</button>
            <button className="p-3 rounded-lg bg-white/10 hover:bg-white/15 transition text-white/70 hover:text-white text-xs">💧</button>
          </div>

          {/* Fan Power */}
          <div className="mt-4 text-right">
            <div className="text-xs text-white/50">Velocidad: {zone.fanSpeed ?? "—"}/7</div>
            <div className="text-sm font-semibold text-cyan-200">{zone.fanPower ?? "—"} kWh/h</div>
          </div>
        </div>

        {/* ENERGY USAGE CARD */}
        <div className={`${card()} col-span-1`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Lightbulb className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-white font-semibold">Energy Usage</div>
                <div className="text-xs text-white/50 mt-1">Living Room Light</div>
                <div className="text-xs text-white/50">Warm Light</div>
              </div>
            </div>
            <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer border border-white/30">
              <motion.div
                className="absolute top-0.5 right-0.5 w-5 h-5 bg-amber-400 rounded-full"
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
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
                <div className="text-xs text-white/50">Using now</div>
                <div className="text-sm font-semibold text-white">0.12 kWh</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Daily usage</div>
                <div className="text-sm font-semibold text-white">3.4 kWh</div>
              </div>
              <div>
                <div className="text-xs text-white/50">This month</div>
                <div className="text-sm font-semibold text-white">78 kWh</div>
              </div>
            </div>
          </div>

          {/* Usage percentage with +/- controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition flex items-center justify-center"
            >
              −
            </motion.button>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-semibold text-white">{zone.lightLevel ?? "—"}%</div>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-amber-300 to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${zone.lightLevel ?? 0}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition flex items-center justify-center"
            >
              +
            </motion.button>
          </div>

          {/* Usage pattern visualization */}
          <div className="mt-4">
            <div className="text-xs text-white/50 mb-2">Usage Pattern</div>
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
        </div>
      </motion.div>

      {/* STATUS METRICS - Original Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-6"
      >
        <div className="text-sm text-white/60 mb-3">System Status</div>
        <div className="grid grid-cols-2 gap-3">
          {/* TEMPERATURE */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Thermometer className="h-3 w-3" />
              Temperature
            </div>
            <div className="mt-2 text-xl font-bold text-amber-200">
              {zone.temperature ?? "—"}°C
            </div>
          </div>

          {/* PEOPLE */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Users className="h-3 w-3" />
              People
            </div>
            <div className="mt-2 text-xl font-bold text-white">32</div>
          </div>

          {/* DEVICES */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Cpu className="h-3 w-3" />
              Devices
            </div>
            <div className="mt-2 text-xl font-bold text-violet-200">12</div>
            <div className="mt-1 text-xs text-white/45">Controllers online</div>
          </div>

          {/* STATUS PILL */}
          <div className="flex items-center justify-end">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${pill(
                zone.status
              )}`}
            >
              {loading ? "Loading" : zone.status.toUpperCase()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* QUICK CONTROLS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="text-sm text-white/60 mb-3">Quick Controls</div>
        <div className="flex gap-2 mb-4">
          <button className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/20 transition">
            Lights
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 transition">
            HVAC
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 transition">
            Power
          </button>
        </div>

        {/* 360 VIEW */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10 transition"
        >
          <Eye className="h-4 w-4" />
          View 360°
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}
