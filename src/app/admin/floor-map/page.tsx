'use client';

import { motion } from "framer-motion";
import FloorMap from "@/components/admin/FloorMap";

export default function FloorMapPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <p className="text-sm font-semibold tracking-widest text-primary/80 mb-4 uppercase">
          PISO 5 / MAPA INTERACTIVO
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-poppins mb-6">
          Mapa del Piso
        </h1>
        <p className="text-muted-foreground text-lg font-inter max-w-3xl mx-auto">
          Visualiza de forma interactiva el mapa del piso 5 con los dispositivos IoT integrados y listos para conexiones MQTT.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">

      {/* Floor Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-slate-900/40 border border-primary/20 rounded-xl p-6"
      >
        <FloorMap />
      </motion.div>
      </div>
    </main>
  );
}
