import { motion } from "framer-motion";
import { Button } from "@/components/UI/Button";
import { ArrowRight, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-fade" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(195 100% 50% / 0.2) 0%, transparent 70%)" }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(220 100% 60% / 0.15) 0%, transparent 70%)" }}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
        

          {/* Main Heading */}
          <motion.h1
            className="font-josefin text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="text-foreground">Conecta tu </span>
            <span className="gradient-text text-glow">mañana</span>
            <br />
            <span className="text-foreground">hoy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-inter text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            ALUNA transforma la manera en que interactúas con tus dispositivos. 
            Inteligencia artificial y automatización al servicio de tu hogar y negocio.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
              <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 hover:bg-[#FF7F00]/10 hover:border-[#FF7F00]/50 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4 text-primary group-hover:text-[#FF7F00] transition-colors" />
            <span className="font-inter text-sm tracking-wider uppercase text-[#FF7F00]">
              Descubre Aluna
            </span>
          </motion.div>
            {/* <Button variant="hero" size="xl" className="group">
              Descubre ALUNA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button> */}
           
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 pt-8 md:pt-10 border-t border-border/50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { value: "20+", label: "Dispositivos Conectados" },
              { value: "99%", label: "Uptime Garantizado" },
              { value: "<100ms", label: "Latencia Promedio" },
            ].map((stat, index) => (
              <div key={index} className={`text-center ${index === 2 ? 'col-span-2 md:col-span-1 md:text-left lg:text-center' : ''}`}>
                <motion.div
                  className="font-josefin text-2xl md:text-3xl lg:text-4xl font-light gradient-text tracking-wide"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p className="font-inter text-xs md:text-sm text-muted-foreground mt-1 md:mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
