'use client';

import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar el email
    console.log("Formulario enviado:", formData);
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      content: "aluna.ia.iot@gmail.com",
      href: "mailto:aluna.ia.iot@gmail.com",
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+57 300 123 4567",
      href: "tel:+573001234567",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Medellín, Colombia",
      href: "#",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen flex items-center">
        <section className="relative w-full py-12 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left Section */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-center"
              >
                <motion.span
                  className="inline-block font-inter text-sm tracking-[0.3em] uppercase text-primary mb-4 w-fit"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Ponte en Contacto
                </motion.span>

                <h2 className="font-josefin text-4xl md:text-5xl font-light mb-6 tracking-wide">
                  <span className="text-foreground">Hablemos de tu </span>
                  <span className="gradient-text">Proyecto</span>
                </h2>

                <p className="font-inter text-lg text-muted-foreground mb-12 font-light">
                  ¿Tienes preguntas? Nos encantaría escucharte y ayudarte a implementar Aluna en tu organización.
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-10">
                  {[
                    "Soporte Técnico Dedicado",
                    "Implementación Personalizada",
                    "Capacitación Completa",
                    "Consultoría Estratégica",
                    "Integración Seamless",
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-foreground font-inter">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-3"
                >
                  <div className="text-xs font-medium text-muted-foreground mb-3">General Contact Info</div>
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.a
                        key={method.title}
                        href={method.href}
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                        whileHover={{ x: 5 }}
                      >
                        <Icon className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">
                            {method.title}
                          </div>
                          <div className="font-inter text-sm">
                            {method.content}
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Right Section - Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative p-6 rounded-3xl bg-foreground/5 backdrop-blur-xl border border-foreground/10 hover:border-primary/30 transition-all duration-500">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* First Name & Last Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium mb-3 text-muted-foreground">
                          Nombre
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-xl border border-foreground/20 bg-foreground/3 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-foreground/5 transition-all duration-300 text-sm"
                          placeholder="Tu nombre"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium mb-3 text-muted-foreground">
                          Apellido
                        </label>
                        <input
                          type="text"
                          name="apellido"
                          className="w-full px-4 py-2 rounded-xl border border-foreground/20 bg-foreground/3 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-foreground/5 transition-all duration-300 text-sm"
                          placeholder="Tu apellido"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium mb-3 text-muted-foreground">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-foreground/20 bg-foreground/3 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-foreground/5 transition-all duration-300 text-sm"
                        placeholder="tu@email.com"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium mb-3 text-muted-foreground">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        className="w-full px-4 py-2 rounded-xl border border-foreground/20 bg-foreground/3 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-foreground/5 transition-all duration-300 text-sm"
                        placeholder="Tu empresa"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium mb-3 text-muted-foreground">
                        ¿Cuál es tu rol?
                      </label>
                      <select
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange as any}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-foreground/20 bg-foreground/3 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-foreground/5 transition-all duration-300 appearance-none cursor-pointer text-sm"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="empresa">Empresa</option>
                        <option value="desarrollador">Desarrollador</option>
                        <option value="consultor">Consultor</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium mb-3 text-muted-foreground">
                        Mensaje
                      </label>
                      <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 rounded-xl border border-foreground/20 bg-foreground/3 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-foreground/5 transition-all duration-300 resize-none text-sm"
                        placeholder="Tu mensaje..."
                      />
                    </div>                    {/* Terms Checkbox */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="w-4 h-4 rounded border border-foreground/20 bg-foreground/3 cursor-pointer accent-primary"
                      />
                      <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                        Acepto los{" "}
                        <span className="text-foreground hover:text-primary transition-colors">
                          Términos de Uso
                        </span>{" "}
                        y la{" "}
                        <span className="text-foreground hover:text-primary transition-colors">
                          Política de Privacidad
                        </span>
                        {" "}*
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-2 rounded-xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_hsl(195_100%_50%/0.3)] transition-all duration-300"
                    >
                      Enviar Mensaje
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
