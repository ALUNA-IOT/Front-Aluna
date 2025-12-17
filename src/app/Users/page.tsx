'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Home, User, Settings } from 'lucide-react';

export default function UsersDashboard() {
  const [userName, setUserName] = useState<string>('Usuario');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);
    
    // Obtener el nombre del usuario del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        const name = userData.fullName || userData.name || 'Usuario';
        setUserName(name);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserName('Usuario');
      }
    } else {
      setUserName('Usuario');
    }
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Home',
      description: 'Accede a tu panel principal y resumen de actividades',
      href: '/Users',
    },
    {
      icon: <User className="w-8 h-8" />,
      title: 'Account',
      description: 'Gestiona tu perfil y información personal',
      href: '/Users/profile',
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Settings',
      description: 'Configura tus preferencias y opciones',
      href: '/Users/reservations',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      className="min-h-screen"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-foreground font-poppins mb-3 bg-gradient-text bg-clip-text text-transparent">
          ¡Bienvenido, {userName}!
        </h1>
        <p className="text-muted-foreground text-lg font-inter">
          Aquí puedes gestionar tu cuenta y acceder a todas tus opciones
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        variants={cardVariants}
      >
        {features.map((feature, index) => (
          <Link key={feature.href} href={feature.href}>
            <motion.div
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`group relative p-8 rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 to-primary/1 backdrop-blur-md hover:border-primary/50 hover:from-primary/10 transition-all duration-500 cursor-pointer h-full`}
            >
              {/* Background grid effect */}
              <div className="absolute inset-0 bg-grid-fade opacity-5" />
              
              <div className="relative z-10">
                <div className={`text-primary mb-4 group-hover:scale-110 transition-transform text-glow w-fit`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 font-poppins">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed font-inter">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Info Section */}
      <motion.div
        variants={cardVariants}
        className="p-8 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/5 via-primary/2 to-primary/5 backdrop-blur-md"
      >
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-fade opacity-5" />
        
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-primary mb-2 font-poppins text-glow">
            💡 Consejo
          </h3>
          <p className="text-muted-foreground font-inter">
            Utiliza el menú lateral para navegar fácilmente entre tus diferentes opciones. 
            Puedes acceder a tu perfil, revisar tus reservas o explorar el mapa en cualquier momento.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
