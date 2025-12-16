'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { Mail, Lock, User, Eye, EyeOff, Check, X, Phone, Calendar } from 'lucide-react';
import DatePickerInput from '@/components/DatePickerInput';
import { AuthService } from '@/services/AuthService';

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    role: 'user',
    adminKey: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  // Validación de contraseña
  const passwordValidation = {
    hasMinLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setError('El nombre completo es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('El teléfono es requerido');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep2 = () => {
    if (!isPasswordValid) {
      setError('La contraseña no cumple con los requisitos');
      return false;
    }
    if (!passwordsMatch) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (!formData.dateOfBirth.trim()) {
      setError('La fecha de nacimiento es requerida');
      return false;
    }
    if (!agreedToTerms) {
      setError('Debes aceptar los términos y condiciones');
      return false;
    }
    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      // Consumir el servicio de registro
      const result = await AuthService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        roleId: formData.role !== 'user' ? formData.role : undefined,
      });

      if (result.ok) {
        // Registro exitoso - redirigir al login
        router.push('/login?registered=true');
      } else {
        setError(result.error || 'Error al registrarse. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error durante el registro:', err);
      setError('Error al conectar con el servidor. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
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
      className="w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-6" variants={itemVariants}>
        <div className="flex items-center justify-center mb-3">
          <img 
            src="/img/luna.png"
            alt="ALUNA" 
            className="h-12 drop-shadow-[0_0_10px_hsl(195_100%_50%/0.5)]"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-josefin font-light mb-2 text-foreground">
          Crear Cuenta
        </h1>
        <p className="text-muted-foreground font-inter text-sm">
          Paso {step} de 2
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div className="flex gap-2 mb-5" variants={itemVariants}>
        {[1, 2].map(num => (
          <div
            key={num}
            className={`h-1 flex-1 rounded-full transition-all ${
              num <= step ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </motion.div>

      {/* Form */}
      <motion.form onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          {/* Step 1: Credentials */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Full Name Input */}
              <motion.div variants={itemVariants} className="relative">
                <label htmlFor="fullName" className="block text-sm font-inter uppercase tracking-wider text-muted-foreground mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/10 border border-border hover:border-primary/50 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/10 border border-border hover:border-primary/50 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              {/* Phone Input */}
              <motion.div variants={itemVariants} className="relative">
                <label htmlFor="phone" className="block text-sm font-inter uppercase tracking-wider text-muted-foreground mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+57 312345678"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/10 border border-border hover:border-primary/50 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              {/* Error Message Step 1 */}
              {error && (
                <motion.div
                  variants={itemVariants}
                  className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Personal Info & Role */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Password Input */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-inter uppercase tracking-wider text-muted-foreground mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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

                {/* Password Requirements */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {passwordValidation.hasMinLength ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={passwordValidation.hasMinLength ? 'text-green-500' : 'text-muted-foreground'}>
                        Mínimo 8 caracteres
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordValidation.hasUpperCase ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={passwordValidation.hasUpperCase ? 'text-green-500' : 'text-muted-foreground'}>
                        Una mayúscula
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordValidation.hasLowerCase ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={passwordValidation.hasLowerCase ? 'text-green-500' : 'text-muted-foreground'}>
                        Una minúscula
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordValidation.hasNumber ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={passwordValidation.hasNumber ? 'text-green-500' : 'text-muted-foreground'}>
                        Un número
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-inter uppercase tracking-wider text-muted-foreground mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-lg bg-secondary/10 border border-border hover:border-primary/50 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {passwordsMatch ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Las contraseñas coinciden</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">Las contraseñas no coinciden</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Date of Birth Input */}
              <div className="relative">
                <label htmlFor="dateOfBirth" className="block text-sm font-inter uppercase tracking-wider text-muted-foreground mb-2">
                  Fecha de Nacimiento
                </label>
                <DatePickerInput
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
                >
                  {error}
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 rounded bg-secondary/10 border border-border cursor-pointer accent-primary mt-1"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground font-inter cursor-pointer leading-relaxed">
                  Acepto los{' '}
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    términos y condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    política de privacidad
                  </a>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-4">
          {step === 2 && (
            <Button
              type="button"
              variant="outline"
              size="xl"
              className="flex-1"
              onClick={() => {
                setStep(1);
                setError('');
              }}
              disabled={isLoading}
            >
              Atrás
            </Button>
          )}
          <Button
            type={step === 1 ? 'button' : 'submit'}
            variant="hero"
            size="xl"
            className={step === 1 ? 'flex-1' : 'w-full'}
            onClick={step === 1 ? handleNextStep : undefined}
            disabled={isLoading || (step === 2 && !agreedToTerms)}
          >
            {isLoading ? (step === 1 ? 'Continuando...' : 'Creando cuenta...') : (step === 1 ? 'Siguiente' : 'Crear Cuenta')}
          </Button>
        </motion.div>
      </motion.form>

      {/* Login Link */}
      <motion.p variants={itemVariants} className="text-center mt-8 text-muted-foreground font-inter text-sm">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-primary hover:text-primary/80 transition-colors font-semibold">
          Inicia sesión
        </a>
      </motion.p>
    </motion.div>
  );
}