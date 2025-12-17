'use client';

import { motion } from 'framer-motion';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel - Welcome Section */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 lg:bg-linear-to-br lg:from-primary/20 lg:via-primary/10 lg:to-transparent lg:flex-col lg:items-center lg:justify-center p-12 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-fade opacity-20" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(195 100% 50% / 0.2) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center w-full flex flex-col items-center justify-center">
          <motion.h2
            className="text-4xl md:text-5xl font-josefin font-light text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ¡Bienvenido de vuelta!
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 font-inter mb-8 max-w-sm leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Para mantener conectado contigo, por favor inicia sesión con tu información personal
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center pt-32 md:p-12 pb-12 bg-background relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-fade opacity-10" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          <LoginForm />
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
