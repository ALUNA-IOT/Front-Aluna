'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building, Edit, Shield, Bell, Calendar } from 'lucide-react';
import { AuthService } from '@/services/AuthService';

interface UserProfile {
  fullName: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  company?: string;
  avatar?: string;
}

interface NotificationSettings {
  reservationReminders: boolean;
  emailConfirmations: boolean;
  availabilityAlerts: boolean;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Usuario',
    name: 'Usuario',
    role: 'Usuario',
    email: 'usuario@email.com',
    phone: '+57 312345678',
    dateOfBirth: '',
    company: 'Empresa',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    reservationReminders: true,
    emailConfirmations: true,
    availabilityAlerts: false,
  });

  const [formData, setFormData] = useState(profile);

  // Obtener datos de la sesión al cargar
  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Primero intentar obtener del localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setProfile((prev) => ({
            ...prev,
            fullName: userData.fullName || userData.name || prev.fullName,
            name: userData.fullName || userData.name || prev.name,
            email: userData.email || prev.email,
            phone: userData.phone || prev.phone,
            role: userData.role || prev.role,
            dateOfBirth: userData.dateOfBirth || prev.dateOfBirth,
          }));
          setFormData((prev) => ({
            ...prev,
            fullName: userData.fullName || userData.name || prev.fullName,
            name: userData.fullName || userData.name || prev.name,
            email: userData.email || prev.email,
            phone: userData.phone || prev.phone,
            role: userData.role || prev.role,
            dateOfBirth: userData.dateOfBirth || prev.dateOfBirth,
          }));
        } else {
          // Si no hay en localStorage, intentar obtener de la sesión
          const session = await AuthService.getSession();
          if (session?.user) {
            setProfile((prev) => ({
              ...prev,
              fullName: session.user.name || prev.fullName,
              name: session.user.name || prev.name,
              email: session.user.email || prev.email,
              role: session.user.role || prev.role,
              phone: session.user.phone || prev.phone,
              dateOfBirth: session.user.dateOfBirth || prev.dateOfBirth,
            }));
            setFormData((prev) => ({
              ...prev,
              fullName: session.user.name || prev.fullName,
              name: session.user.name || prev.name,
              email: session.user.email || prev.email,
              role: session.user.role || prev.role,
              phone: session.user.phone || prev.phone,
              dateOfBirth: session.user.dateOfBirth || prev.dateOfBirth,
            }));
          }
        }
      } catch (error) {
        console.error('Error al obtener la sesión:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormData(profile);
    }
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    
    // Guardar los cambios en localStorage
    const userData = {
      fullName: formData.fullName || formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      dateOfBirth: formData.dateOfBirth,
    };
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Mi </span>
            <span className="gradient-text">perfil</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Gestiona tu información personal y preferencias de cuenta.
          </p>
        </div>

        {/* Sección de Avatar y Nombre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary/40 to-accent/40 flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/30">
                <User size={64} className="text-primary" />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-black p-3 rounded-full shadow-lg shadow-primary/50 hover:bg-primary/90 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">{profile.fullName || profile.name}</h2>
          <p className="text-slate-400 text-lg mb-2">{profile.role}</p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Shield size={18} />
            <span className="font-semibold">Cuenta verificada</span>
          </div>
        </motion.div>

        {/* Sección de Información Personal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-linear-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/30 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">Información personal</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEditClick}
              className="flex items-center gap-2 px-6 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-colors font-semibold"
            >
              <Edit size={18} />
              {isEditing ? 'CANCELAR' : 'EDITAR'}
            </motion.button>
          </div>

          {isEditing ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Nombre Completo */}
                <div>
                  <label className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <User size={16} />
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-primary/30 text-foreground px-4 py-3 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <Mail size={16} />
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-primary/30 text-foreground px-4 py-3 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <Phone size={16} />
                    TELÉFONO
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-primary/30 text-foreground px-4 py-3 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                  <label className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <Calendar size={16} />
                    FECHA DE NACIMIENTO
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-primary/30 text-foreground px-4 py-3 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <Building size={16} />
                    EMPRESA
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-primary/30 text-foreground px-4 py-3 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="w-full bg-primary text-black py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                GUARDAR CAMBIOS
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nombre Completo */}
              <div>
                <p className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <User size={16} />
                  NOMBRE COMPLETO
                </p>
                <p className="text-foreground text-lg font-semibold">{profile.fullName || profile.name}</p>
              </div>

              {/* Email */}
              <div>
                <p className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <Mail size={16} />
                  CORREO ELECTRÓNICO
                </p>
                <p className="text-foreground text-lg font-semibold">{profile.email}</p>
              </div>

              {/* Teléfono */}
              <div>
                <p className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <Phone size={16} />
                  TELÉFONO
                </p>
                <p className="text-foreground text-lg font-semibold">{profile.phone}</p>
              </div>

              {/* Fecha de Nacimiento */}
              <div>
                <p className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <Calendar size={16} />
                  FECHA DE NACIMIENTO
                </p>
                <p className="text-foreground text-lg font-semibold">{profile.dateOfBirth || 'No especificada'}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Sección de Notificaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-linear-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Bell className="text-primary" size={28} />
            <h3 className="text-2xl font-bold text-foreground">Notificaciones</h3>
          </div>

          <div className="space-y-6">
            {/* Recordatorios de Reservas */}
            <div className="flex items-center justify-between pb-6 border-b border-primary/20">
              <div>
                <p className="text-foreground font-semibold">Recordatorios de reservas</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleNotification('reservationReminders')}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  notifications.reservationReminders ? 'bg-primary' : 'bg-slate-700'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                  animate={{
                    x: notifications.reservationReminders ? 32 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Confirmaciones por Email */}
            <div className="flex items-center justify-between pb-6 border-b border-primary/20">
              <div>
                <p className="text-foreground font-semibold">Confirmaciones por email</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleNotification('emailConfirmations')}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  notifications.emailConfirmations ? 'bg-primary' : 'bg-slate-700'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                  animate={{
                    x: notifications.emailConfirmations ? 32 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Alertas de Disponibilidad */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-semibold">Alertas de disponibilidad</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleNotification('availabilityAlerts')}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  notifications.availabilityAlerts ? 'bg-primary' : 'bg-slate-700'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                  animate={{
                    x: notifications.availabilityAlerts ? 32 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
