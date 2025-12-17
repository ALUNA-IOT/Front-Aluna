'use client';

import { motion } from "framer-motion";
import { Zap, TrendingUp, Activity } from "lucide-react";

export default function AnalyticsPage() {
  // Datos simulados de consumo energético
  const energyData = [
    { hour: "00:00", consumption: 2.1 },
    { hour: "04:00", consumption: 1.8 },
    { hour: "08:00", consumption: 3.2 },
    { hour: "12:00", consumption: 4.1 },
    { hour: "16:00", consumption: 3.8 },
    { hour: "20:00", consumption: 4.5 },
    { hour: "23:00", consumption: 2.9 },
  ];

  const maxConsumption = Math.max(...energyData.map(d => d.consumption));

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <p className="text-sm font-semibold tracking-widest text-primary/80 mb-4 uppercase">
          ANÁLISIS / ENERGÍA
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins mb-6">
          Consumo Energético
        </h1>
        <p className="text-muted-foreground text-lg font-inter max-w-3xl mx-auto">
          Visualiza el consumo energético en tiempo real y analiza los patrones de uso para optimizar tu infraestructura.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6"
        >
          {/* Card: Total Consumption */}
          <motion.div
            variants={cardVariants}
            className="bg-linear-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 rounded-lg p-3 backdrop-blur"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1 rounded-lg bg-cyan-500/20">
                <Zap className="h-3 w-3 text-cyan-400" />
              </div>
              <p className="text-xs text-green-400 flex items-center gap-0.5">
                <TrendingUp className="h-2 w-2" />
                +2.3%
              </p>
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">Consumo Hoy</p>
            <h3 className="text-lg font-bold text-white">24.4 kWh</h3>
          </motion.div>

          {/* Card: Average Consumption */}
          <motion.div
            variants={cardVariants}
            className="bg-linear-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-3 backdrop-blur"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1 rounded-lg bg-blue-500/20">
                <Activity className="h-3 w-3 text-blue-400" />
              </div>
              <p className="text-xs text-muted-foreground">Por hora</p>
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">Consumo Promedio</p>
            <h3 className="text-lg font-bold text-white">3.49 kW</h3>
          </motion.div>

          {/* Card: Peak Consumption */}
          <motion.div
            variants={cardVariants}
            className="bg-linear-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-lg p-3 backdrop-blur"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1 rounded-lg bg-orange-500/20">
                <Zap className="h-3 w-3 text-orange-400" />
              </div>
              <p className="text-xs text-muted-foreground">Máximo</p>
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">Pico de Consumo</p>
            <h3 className="text-lg font-bold text-white">4.5 kW</h3>
          </motion.div>
        </motion.div>

        {/* Energy Consumption Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900/40 border border-primary/20 rounded-xl p-6 backdrop-blur mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Consumo por Hora (Hoy)</h2>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between h-32 gap-2 mb-4">
            {energyData.map((data, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${(data.consumption / maxConsumption) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-1 bg-linear-to-t from-cyan-500 to-blue-400 rounded-t-lg hover:from-cyan-400 hover:to-blue-300 transition-all cursor-pointer group relative"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {data.consumption} kW
                </div>
              </motion.div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-muted-foreground">
            {energyData.map((data, index) => (
              <span key={index}>{data.hour}</span>
            ))}
          </div>
        </motion.div>

        {/* Daily Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-900/40 border border-primary/20 rounded-xl p-6 backdrop-blur"
        >
          <h2 className="text-lg font-bold text-white mb-4">Estadísticas Semanales</h2>
          
          <div className="space-y-3">
            {[
              { day: "Lunes", usage: 24.2, percentage: 92 },
              { day: "Martes", usage: 23.8, percentage: 90 },
              { day: "Miércoles", usage: 25.1, percentage: 95 },
              { day: "Jueves", usage: 24.4, percentage: 93 },
              { day: "Viernes", usage: 26.3, percentage: 100 },
              { day: "Sábado", usage: 21.5, percentage: 82 },
              { day: "Domingo", usage: 20.8, percentage: 79 },
            ].map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">{stat.day}</span>
                  <span className="text-sm text-primary">{stat.usage} kWh</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
