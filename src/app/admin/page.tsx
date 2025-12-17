'use client';

import { motion } from "framer-motion";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-primary/80 mb-4 uppercase">
            PANEL / ADMINISTRACIÓN
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins mb-6">
            Herramientas de Gestión
          </h1>
          <p className="text-muted-foreground text-lg font-inter max-w-3xl mx-auto">
            Controla y supervisa tus zonas, dispositivos IoT y configuraciones desde un panel centralizado para optimizar tu infraestructura.
          </p>
        </motion.div>

      {/* Dashboard Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
      >
        {/* Card: Floor Map */}
        <motion.a
          href="/admin/floor-map"
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-900/40 border border-primary/20 rounded-xl p-6 cursor-pointer hover:border-primary/40 transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 17.618V6.382a1 1 0 00-1.447-.894L15 8m0 13V8m0 0L9 5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Mapa del Piso</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Ver y administrar el mapa interactivo del piso con ubicaciones de dispositivos IoT
          </p>
        </motion.a>

        {/* Card: Users Management */}
        <motion.a
          href="/admin/users"
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-900/40 border border-primary/20 rounded-xl p-6 cursor-pointer hover:border-primary/40 transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Usuarios</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Administra cuentas de usuario, roles y permisos
          </p>
        </motion.a>

        {/* Card: Analytics */}
        <motion.a
          href="/admin/analytics"
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-900/40 border border-primary/20 rounded-xl p-6 cursor-pointer hover:border-primary/40 transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Análisis</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Ver estadísticas del sistema y análisis de uso
          </p>
        </motion.a>

        {/* Card: Settings */}
        <motion.a
          href="/admin/settings"
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-900/40 border border-primary/20 rounded-xl p-6 cursor-pointer hover:border-primary/40 transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Configuración</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Configura los ajustes del sistema y preferencias
          </p>
        </motion.a>
      </motion.div>
      </div>
    </main>
  );
}
