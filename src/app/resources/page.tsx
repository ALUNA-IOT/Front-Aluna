"use client";

import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { BookOpen, Zap, GraduationCap, Lightbulb } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function RecursosPage() {
  const resources = [
    {
      title: "Documentación",
      description: "Guías completas y documentación técnica del sistema",
      icon: BookOpen,
    },
    {
      title: "API Reference",
      description: "Referencia completa de la API REST de Aluna",
      icon: Zap,
    },
    {
      title: "Tutoriales",
      description: "Tutoriales paso a paso para configurar y usar el sistema",
      icon: GraduationCap,
    },
    {
      title: "Casos de Uso",
      description: "Ejemplos reales de implementación en diferentes contextos",
      icon: Lightbulb,
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Duplicar recursos para efecto seamless infinito
  const duplicatedResources = [...resources, ...resources];

  return (
    <>
      <main className="pt-20 min-h-screen">
        <section className="relative py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

          <div className="container mx-auto px-6 relative z-10 max-w-6xl">
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
                Herramientas y Documentación
              </motion.span>
              <h2 className="font-josefin text-3xl md:text-5xl font-light mb-6 tracking-wide">
                <span className="text-foreground">Recursos que </span>
                <span className="gradient-text">Empoderan</span>
              </h2>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                Accede a toda la documentación, APIs y tutoriales necesarios
                para implementar y maximizar Aluna
              </p>
            </motion.div>

            {/* Circular Carousel Slider */}
            <div
              className="relative w-full flex items-center justify-center py-8"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Slider Wrapper - Shows two cards at a time */}
              <div className="relative w-full max-w-4xl overflow-hidden px-4">
                {/* Cards Container - Continuous animation with Framer Motion */}
                <motion.div
                  ref={sliderRef}
                  className="flex gap-8"
                  animate={{ x: isHovering ? 0 : -1000 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Duplicated resources for seamless loop */}
                  {duplicatedResources.map((resource, index) => {
                    const Icon = resource.icon;
                    const bgColors = [
                      "bg-foreground/5 backdrop-blur-xl border border-foreground/10",
                      "bg-foreground/5 backdrop-blur-xl border border-foreground/10",
                      "bg-foreground/5 backdrop-blur-xl border border-foreground/10",
                      "bg-foreground/5 backdrop-blur-xl border border-foreground/10",
                    ];
                    const borderColors = [
                      "from-foreground/20 to-foreground/10",
                      "from-foreground/20 to-foreground/10",
                      "from-foreground/20 to-foreground/10",
                      "from-foreground/20 to-foreground/10",
                    ];
                    const textColors = [
                      "text-foreground",
                      "text-foreground",
                      "text-foreground",
                      "text-foreground",
                    ];
                    const badgeBgColors = [
                      "bg-foreground/10 backdrop-blur-md border-foreground/20 text-foreground",
                      "bg-foreground/10 backdrop-blur-md border-foreground/20 text-foreground",
                      "bg-foreground/10 backdrop-blur-md border-foreground/20 text-foreground",
                      "bg-foreground/10 backdrop-blur-md border-foreground/20 text-foreground",
                    ];

                    return (
                      <motion.div
                        key={`${resource.title}-${index}`}
                        className="group cursor-pointer flex flex-col items-center shrink-0 w-1/2 px-4 h-96"
                        style={{
                          filter:
                            "drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))",
                        }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        {/* Top Card - Icon Section */}
                        <motion.div
                          className="w-full max-w-sm rounded-t-3xl bg-foreground/5 backdrop-blur-xl border-t border-x border-foreground/10 p-8 flex flex-col items-center justify-center shadow-lg h-1/2"
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Icon Container - Outlined Circle */}
                          <motion.div
                            className="w-24 h-24 rounded-full border-2 border-primary/60 flex items-center justify-center mb-6"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon className="w-12 h-12 text-primary/70" />
                          </motion.div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-foreground text-center">
                            {resource.title}
                          </h3>
                        </motion.div>

                        {/* Divider Line */}
                        <div
                          className={`w-full max-w-sm h-1 bg-linear-to-r ${borderColors[index]}`}
                        />

                        {/* Bottom Card - Content Section */}
                        <motion.div
                          className={`w-full max-w-sm rounded-b-3xl ${bgColors[index]} p-8 relative overflow-hidden shadow-lg h-1/2 flex flex-col justify-between`}
                          whileHover={{ y: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Content */}
                          <p
                            className={`text-sm ${textColors[index]} leading-relaxed mb-6 font-inter`}
                          >
                            {resource.description}
                          </p>

                          {/* Bottom Tags/Info */}
                          <div className="flex gap-3 justify-center items-center">
                            <span
                              className={`text-xs font-semibold uppercase tracking-wider ${badgeBgColors[index]} px-3 py-1 rounded-full border`}
                            >
                              {index === 0
                                ? "Guías"
                                : index === 1
                                ? "API"
                                : index === 2
                                ? "Tutorial"
                                : "Ejemplos"}
                            </span>
                            <span
                              className={`text-xs font-semibold ${badgeBgColors[index]} px-3 py-1 rounded-full border`}
                            >
                              ∞
                            </span>
                          </div>

                          {/* CTA Arrow */}
                          <motion.div
                            className={`absolute bottom-6 right-6 text-primary opacity-80 group-hover:opacity-100 transition-opacity`}
                            whileHover={{ x: 3 }}
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-20 flex gap-2">
                {Array.from({ length: resources.length }).map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index % 2 === 0
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
