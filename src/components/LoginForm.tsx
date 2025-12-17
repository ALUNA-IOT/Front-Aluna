'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthService } from '@/services/AuthService';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bypass login: ir directo al dashboard de usuarios
    router.push('/Users');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="w-full max-w-md px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/img/luna.png"
            alt="ALUNA" 
            className="h-16 drop-shadow-[0_0_12px_hsl(195_100%_50%/0.5)]"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-josefin font-light mb-2 text-foreground">
          Inicia Sesión
        </h1>
        <p className="text-muted-foreground font-poppins text-sm uppercase tracking-wider font-semibold">
          ACCEDE A TU CUENTA DE ALUNA
        </p>
      </motion.div>

      {/* Form */}
      <motion.form onSubmit={handleSubmit} className="space-y-5" variants={itemVariants}>
        {/* Email Input */}
        <motion.div variants={itemVariants} className="relative">
          <label htmlFor="email" className="block text-sm font-inter uppercase tracking-wider text-muted-foreground mb-2">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/10 border border-border hover:border-primary/50 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
              required
              disabled={isLoading}
            />
          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div variants={itemVariants} className="relative">
          <label htmlFor="password" className="block text-sm font-inter uppercase tracking-wider text-muted-foreground mb-2">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 rounded-lg bg-secondary/10 border border-border hover:border-primary/50 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            variants={itemVariants}
            className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Remember & Forgot Password */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded bg-secondary/10 border border-border cursor-pointer accent-primary"
            />
            <span className="text-sm text-muted-foreground font-inter">Recuérdame</span>
          </label>
          <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors font-inter">
            ¿Olvidaste tu contraseña?
          </a>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </motion.div>
      </motion.form>

      {/* Sign Up Link */}
      <motion.p variants={itemVariants} className="text-center mt-8 text-muted-foreground font-inter text-sm">
        ¿No tienes cuenta?{' '}
        <a href="/register" className="text-primary hover:text-primary/80 transition-colors font-semibold">
          Regístrate aquí
        </a>
      </motion.p>
    </motion.div>
  );
}
