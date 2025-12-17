'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Aquí iría la llamada a tu API
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      console.log('Email enviado:', email);
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative bg-background border-t border-primary/20">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      {/* Animated background circles - Visible in corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right large circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/60 rounded-full blur-3xl" />
        {/* Bottom left large circle */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Two Column Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 items-start"
          >
            {/* Center Column - Logo and Social */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-8">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="relative w-48 h-48"
              >
                <Image
                  src="/img/logo.png"
                  alt="Aluna Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Divider Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-0.5 w-16 bg-linear-to-r from-primary/0 via-primary to-primary/0 origin-center"
              />

              {/* Social Links */}
              
            </motion.div>

            {/* Right Column - Newsletter */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="text-sm font-poppins font-semibold text-foreground uppercase tracking-widest">
                Contáctanos
              </h3>
              <p className="text-xs text-muted-foreground">
                Suscríbete para recibir actualizaciones y noticias.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-primary/10 transition-all duration-300 text-sm"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2.5 rounded-lg bg-linear-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary/80 font-semibold text-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar
                    </>
                  )}
                </motion.button>
                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-primary/80 text-center"
                  >
                    ¡Gracias! Te contactaremos pronto.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent origin-center mb-4"
          />

          {/* Bottom Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.p variants={itemVariants} className="text-xs text-muted-foreground">
              © {currentYear} Aluna. Todos los derechos reservados. | 
              <span className="mx-2">
                <Link href="mailto:aluna.ia.iot@gmail.com" className="hover:text-primary transition-colors">
                  aluna.ia.iot@gmail.com
                </Link>
              </span>
              |
              <span className="ml-2">
                <Link href="tel:+573001234567" className="hover:text-primary transition-colors">
                  +57 300 123 4567
                </Link>
              </span>
            </motion.p>
            <motion.p variants={itemVariants} className="text-xs text-muted-foreground mt-4">
              Aluna | Medellín, Colombia
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-5 w-24 h-24 bg-primary/3 rounded-full blur-2xl" />
      </div>
    </footer>
  );
}
