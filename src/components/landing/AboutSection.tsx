'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Cpu, Database, Smartphone, Network, Cog, Wifi, Lightbulb } from 'lucide-react';

export default function AboutSection() {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const benefits = [
    {
      icon: Zap,
      title: 'Eficiencia Energética',
      description: 'Implementación de reglas de apagado automático basadas en presencia y horarios, reduciendo significativamente el consumo eléctrico.',
    },
    {
      icon: Network,
      title: 'Monitoreo 24/7',
      description: 'Control y visualización remota en tiempo real del estado de cada piso, permitiendo supervisión proactiva y remota.',
    },
    {
      icon: Brain,
      title: 'Operación Optimizada',
      description: 'Automatización de procesos operativos que libera recursos humanos para tareas estratégicas.',
    },
  ];

  const architecture = [
    {
      layer: 'Capa Física',
      component: 'Arduino Giga R1',
      description: 'Gestiona la interacción con sensores y actuadores en tiempo real.',
      icon: Cpu,
    },
    {
      layer: 'Capa de Transporte',
      component: 'MQTT Broker',
      description: 'Comunicación asíncrona de baja latencia entre hardware y lógica de negocio.',
      icon: Network,
    },
    {
      layer: 'Capa de Lógica',
      component: 'n8n (Orquestador)',
      description: 'Procesa mensajes, aplica reglas de automatización y gestiona el flujo de datos.',
      icon: Brain,
    },
    {
      layer: 'Capa de Datos',
      component: 'PostgreSQL & MongoDB',
      description: 'Almacenamiento híbrido: datos estructurados y telemetría en tiempo real.',
      icon: Database,
    },
    {
      layer: 'Capa de Aplicación',
      component: 'Next.js Dashboard',
      description: 'Interfaz web para visualización y control del sistema completo.',
      icon: Smartphone,
    },
  ];

  const technologies = [
    { 
      name: 'Arduino Giga R1', 
      category: 'Hardware',
      details: 'Microcontrolador de última generación que gestiona la recopilación de datos de sensores (temperatura, luminosidad, presencia) y controla actuadores (luces, climatización). Opera en tiempo real con conexión WiFi integrada para comunicarse directamente con el broker MQTT.'
    },
    { 
      name: 'MQTT', 
      category: 'Protocolo',
      details: 'Protocolo de mensajería ligero basado en publicador/suscriptor. Facilita la comunicación asíncrona de baja latencia entre el hardware y la lógica de negocio. Optimizado para dispositivos IoT con bajo ancho de banda.'
    },
    { 
      name: 'n8n', 
      category: 'Orquestación',
      details: 'Plataforma de automatización que actúa como el cerebro del sistema. Procesa mensajes MQTT, aplica reglas de negocio (automatización condicional), gestiona flujos de trabajo y orquesta la comunicación entre capas del sistema.'
    },
    { 
      name: 'PostgreSQL', 
      category: 'Base de Datos',
      details: 'Base de datos relacional que almacena datos estructurados y críticos: usuarios, zonas, reservas, configuraciones del sistema. Proporciona integridad de datos, transacciones ACID y consultas complejas.'
    },
    { 
      name: 'MongoDB', 
      category: 'NoSQL',
      details: 'Base de datos documental dedicada a almacenar telemetría masiva, histórico de sensores y logs del sistema. Escalable horizontalmente para manejar millones de registros de sensores sin afectar el rendimiento.'
    },
    { 
      name: 'Next.js', 
      category: 'Frontend',
      details: 'Framework React moderno que proporciona el dashboard de gestión. Permite a administradores visualizar datos en tiempo real, históricos, y enviar comandos de control manual al sistema con SSR y optimizaciones de rendimiento.'
    },
  ];

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-fade opacity-10" />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(195 100% 50% / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-josefin font-light mb-4 text-foreground">
            Aluna: Automatización e IoT
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-3xl mx-auto">
            Sistema Inteligente de Automatización e Internet de las Cosas diseñado para transformar la operatividad 
            y centralizar el control y monitoreo de espacios inteligentes.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/30 to-transparent h-px top-0" />
            <h3 className="text-center text-2xl md:text-3xl font-inter font-semibold text-foreground py-6">
              <span className="relative inline-block">
                Beneficios de la Solución
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-8 rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 to-primary/1 backdrop-blur-md hover:border-primary/50 hover:from-primary/10 transition-all duration-500 cursor-pointer"
                >
                  <motion.div 
                    className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"
                    whileHover={{ scale: 1.5 }}
                  />
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Icon className="w-10 h-10 text-primary mb-4 relative z-10" />
                  </motion.div>
                  <h4 className="text-lg font-inter font-semibold mb-3 text-foreground relative z-10">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Architecture Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/30 to-transparent h-px top-0" />
            <h3 className="text-center text-2xl md:text-3xl font-inter font-semibold text-foreground py-6">
              <span className="relative inline-block">
                Arquitectura del Sistema
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </h3>
          </div>

          {/* Flow Summary with Interactive Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/5 via-primary/2 to-primary/5 backdrop-blur-md"
          >
            <div className="text-center mb-8">
              <h4 className="text-lg font-inter font-semibold text-foreground mb-3">
                Flujo Integrado de Datos
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                La arquitectura en capas asegura una comunicación eficiente entre componentes. Cada capa tiene una responsabilidad clara, permitiendo escalabilidad, mantenimiento y evolución del sistema sin afectar otros componentes.
              </p>
            </div>

            {/* Interactive Flow Timeline */}
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4">
              {[
                { 
                  icon: Cog, 
                  label: 'Física', 
                  color: 'from-primary/10',
                  details: 'Arduino Giga R1 - Microcontrolador que gestiona la recopilación en tiempo real de datos de sensores (temperatura, luminosidad, presencia) y controla actuadores (luces, aire acondicionado).'
                },
                { 
                  icon: Wifi, 
                  label: 'Transporte', 
                  color: 'from-primary/10',
                  details: 'MQTT Broker - Protocolo de mensajería ligero basado en publicador/suscriptor. Facilita comunicación asincrónica de baja latencia entre dispositivos.'
                },
                { 
                  icon: Brain, 
                  label: 'Lógica', 
                  color: 'from-primary/10',
                  details: 'n8n (Orquestador) - Plataforma de automatización que actúa como el cerebro del sistema. Procesa mensajes MQTT, aplica reglas de negocio, dispara acciones y orquesta flujos de trabajo.'
                },
                { 
                  icon: Database, 
                  label: 'Datos', 
                  color: 'from-primary/10',
                  details: 'PostgreSQL & MongoDB - Enfoque híbrido de base de datos: PostgreSQL almacena datos estructurados críticos, MongoDB gestiona telemetría e historial de sensores a escala.'
                },
                { 
                  icon: Smartphone, 
                  label: 'Aplicación', 
                  color: 'from-primary/10',
                  details: 'Next.js Dashboard - Framework React moderno que proporciona interfaz de visualización y control. Visualización de datos en tiempo real, análisis y ejecución de comandos manuales.'
                },
              ].map((step, idx) => {
                const IconComponent = step.icon;
                return (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`relative px-4 py-2 rounded-full bg-linear-to-r ${step.color} to-transparent border border-primary/30 text-primary/80 font-semibold text-sm font-poppins flex items-center gap-2 cursor-pointer transition-all duration-300 hover:border-primary/60 hover:bg-primary/20`}
                  >
                    <motion.div whileHover={{ scale: 1.15, rotate: 10 }}>
                      <IconComponent size={20} />
                    </motion.div>
                    {step.label}

                    {/* Tooltip on hover - using state */}
                    {hoveredStep === idx && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50"
                        style={{ pointerEvents: 'none' }}
                      >
                        <div className="bg-background border border-primary/40 rounded-lg p-4 shadow-lg shadow-primary/20 w-56 md:w-72">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {step.details}
                          </p>
                          {/* Arrow pointing up */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-0.5">
                            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-background" />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {idx < 4 && (
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                      className="text-primary/50 hidden md:inline"
                    >
                      →
                    </motion.span>
                  )}
                  {idx === 4 && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-primary/50 text-xl"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

        {/* Action button */}
    </section>
  );
}
