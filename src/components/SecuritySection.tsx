import { motion } from "framer-motion";
import { Lock, Database, Shield, RefreshCw } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Seguridad de Datos",
    description: "Políticas de logging en MongoDB con cifrado de datos en tránsito. PostgreSQL asegura la integridad de información estructurada crítica con transacciones ACID.",
  },
  {
    icon: Database,
    title: "Respaldo y Uptime",
    description: "Garantía de 99.9% Uptime con infraestructura redundante. Respaldos automáticos diarios de la instancia única y recuperación ante desastres.",
  },
  {
    icon: RefreshCw,
    title: "Mantenimiento Remoto",
    description: "Actualizaciones de firmware del Arduino Giga R1 sin tiempo de inactividad. Middleware n8n actualizable remotamente con control de versiones.",
  },
  {
    icon: Shield,
    title: "Confiabilidad del Sistema",
    description: "Monitoreo 24/7 con alertas en tiempo real. Detección automática de fallos y recuperación automática de servicios críticos.",
  },
];

const SecuritySection = () => {
  return (
    <section id="security" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(195 100% 50% / 0.1) 0%, transparent 70%)" }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block font-inter text-sm tracking-[0.3em] uppercase text-primary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Seguridad & Confiabilidad
          </motion.span>
          <h2 className="font-josefin text-3xl md:text-5xl font-light mb-6 tracking-wide">
            <span className="text-foreground">Tu Infraestructura </span>
            <span className="gradient-text">Protegida</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            En soluciones IoT que manejan infraestructura física, la seguridad de datos y la confiabilidad del sistema son nuestras prioridades principales.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card/80 group-hover:shadow-[0_0_30px_hsl(195_100%_50%/0.1)]">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="font-josefin text-xl font-light text-foreground mb-3 group-hover:text-glow-sm transition-all duration-300 tracking-wide">
                  {feature.title}
                </h3>
                <p className="font-inter text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-px h-8 bg-linear-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-8 h-px bg-linear-to-l from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 p-8 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/5 via-primary/2 to-primary/5 backdrop-blur-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
              <p className="text-muted-foreground font-inter">Uptime Garantizado</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <p className="text-muted-foreground font-inter">Monitoreo Continuo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">∞</div>
              <p className="text-muted-foreground font-inter">Respaldos Automáticos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;
