// src/app/admin/page.tsx
import FloorMap from "@/components/admin/FloorMap";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050B14] via-[#061425] to-[#05070C] p-6">
      <header className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">ALUNA Admin</h1>
          <p className="mt-1 text-sm text-white/55">
            Floor 5 · Interactive IoT Map (SVG inline) · Ready for
            endpoints/MQTT
          </p>
        </div>
      </header>

      <FloorMap />
    </main>
  );
}
