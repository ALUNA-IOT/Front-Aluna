import { motion } from "framer-motion";
import { Zap, BarChart3, Building2, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Eficiencia Energética",
    description:
      "Apagado automático basado en lógica inteligente de n8n y sensores de presencia. Reduce consumo energético hasta 40% en espacios desocupados.",
  },
  {
    icon: BarChart3,
    title: "Monitoreo en Tiempo Real",
    description:
      "Dashboard Next.js interactivo con métricas en vivo: consumo energético, ocupación de espacios, temperatura y estado de dispositivos.",
  },
  {
    icon: Building2,
    title: "Optimización de Espacios",
    description:
      "Gestiona eficientemente aulas, coworking y oficinas. Visualiza ocupación, temperatura y disponibilidad en tiempo real.",
  },
  {
    icon: Lightbulb,
    title: "Automatización Inteligente",
    description:
      "Flujos automáticos sencillos: Sin presencia después de las 6 PM → Apagar luces y AC. Configurable sin código.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

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
            Features / Beneficios
          </motion.span>
          <h2 className="font-josefin text-3xl md:text-5xl font-light mb-6 tracking-wide">
            <span className="text-foreground">Funcionalidades que </span>
            <span className="gradient-text">Transforman</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Detalles de cómo el sistema resuelve problemas operativos y proporciona beneficios directos para tu infraestructura.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
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

        {/* Decorative Elements */}
        <motion.div
          className="absolute -left-20 top-1/2 w-40 h-40 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(195 100% 50% / 0.1) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-20 bottom-1/4 w-60 h-60 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(220 100% 60% / 0.1) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default FeaturesSection;