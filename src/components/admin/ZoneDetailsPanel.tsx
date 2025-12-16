// src/components/admin/ZoneDetailsPanel.tsx
"use client";

import type { ZoneState } from "@/types/floor";
import { Thermometer, Wind, Lightbulb, Users, Cpu, Eye } from "lucide-react";

function pill(status: ZoneState["status"]) {
  if (status === "on") return "bg-cyan-500/15 text-cyan-200 border-cyan-400/30";
  if (status === "warning")
    return "bg-amber-500/15 text-amber-200 border-amber-400/30";
  if (status === "emergency")
    return "bg-orange-500/15 text-orange-200 border-orange-400/30";
  return "bg-zinc-500/10 text-zinc-200 border-zinc-400/20";
}

function card() {
  return "rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur";
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
        <div className="text-white/80 font-semibold">Selecciona una zona</div>
        <p className="mt-2 text-sm text-white/55">
          Haz click en el mapa para ver telemetría, estado y controles rápidos.
        </p>
      </aside>
    );
  }
  return (
    <aside className="h-full rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-white">{zone.label}</div>
          <div className="mt-1 text-xs text-white/45">Zone ID: {zone.id}</div>
        </div>

        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${pill(
            zone.status
          )}`}
        >
          {loading ? "Loading" : zone.status.toUpperCase()}
        </span>
      </div>

      {/* STATUS */}
      <div className="mt-5 text-sm text-white/60">Status</div>

      {/* METRICS */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        {/* TEMPERATURE */}
        <div className={card()}>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Thermometer className="h-4 w-4" />
            Temperature
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-200">
            {zone.temperature ?? "—"}°C
          </div>
        </div>

        {/* AIR / FAN */}
        <div className={card()}>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Wind className="h-4 w-4" />
            Air
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-200">
            {zone.humidity ?? zone.fanPower ?? "—"}%
          </div>
          <div className="mt-1 text-xs text-white/45">
            {zone.fanSpeed != null ? `Speed ${zone.fanSpeed}/7` : "—"}
          </div>
        </div>

        {/* PEOPLE (UI DEMO) */}
        <div className={card()}>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Users className="h-4 w-4" />
            People
          </div>
          <div className="mt-2 text-2xl font-bold text-white">
            {/* quemado para UI demo */}
            32
          </div>
        </div>

        {/* LIGHT */}
        <div className={card()}>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Lightbulb className="h-4 w-4" />
            Light
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-200">
            {zone.lightLevel ?? "—"}
          </div>
          <div className="mt-1 text-xs text-white/45">Level 0–4</div>
        </div>

        {/* DEVICES / CPU */}
        <div className={card()}>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Cpu className="h-4 w-4" />
            Devices
          </div>
          <div className="mt-2 text-2xl font-bold text-violet-200">
            {/* quemado para UI demo */}
            12
          </div>
          <div className="mt-1 text-xs text-white/45">Controllers online</div>
        </div>
      </div>

      {/* QUICK CONTROLS */}
      <div className="mt-6 text-sm text-white/60">Quick Controls</div>
      <div className="mt-3 flex gap-2">
        <button className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
          Lights
        </button>
        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          HVAC
        </button>
        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Power
        </button>
      </div>

      {/* 360 VIEW */}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
        <Eye className="h-4 w-4" />
        View 360°
      </button>
    </aside>
  );
}
