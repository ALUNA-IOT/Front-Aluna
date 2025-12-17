'use client';

import { motion } from 'framer-motion';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Left Panel - Welcome Section */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary/20 via-primary/10 to-transparent flex-col items-center justify-center p-12 relative overflow-hidden"
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
        <div className="relative z-10 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-josefin font-light text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ¡Únete a nosotros!
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 font-inter mb-8 max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Crea tu cuenta y comienza a disfrutar de todas las funcionalidades de ALUNA
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel - Register Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background relative overflow-hidden pt-32"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-fade opacity-10" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          <RegisterForm />
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
