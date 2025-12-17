'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Folder, User, DollarSign, LogOut, Menu, X } from 'lucide-react';
import { AuthService } from '@/services/AuthService';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Reserva',
    href: '/Users/reservations',
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    label: 'Agenda',
    href: '/Users/agenda',
    icon: <Folder className="w-6 h-6" />,
  },
  {
    label: 'Perfil',
    href: '/Users/profile',
    icon: <User className="w-6 h-6" />,
  },
  {
    label: 'Precios',
    href: '/Users/pricing',
    icon: <DollarSign className="w-6 h-6" />,
  },
];

export default function UserSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    const normalizedPathname = pathname.replace(/\/$/, '');
    const normalizedHref = href.replace(/\/$/, '');
    return normalizedPathname === normalizedHref || normalizedPathname.startsWith(normalizedHref + '/');
  };

  const handleLogout = async () => {
    try {
      // Consumir el servicio de logout
      await AuthService.logout();
      // Siempre redirigir al login, sin importar si hay error o no
      router.push('/login');
    } catch (error) {
      console.error('Error durante logout:', error);
      // Aún así redirigir al login
      router.push('/login');
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden bg-slate-900 text-primary p-2 rounded-lg shadow-lg shadow-primary/50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 z-30 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 w-32 h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl shadow-primary/20 z-40 overflow-visible flex flex-col items-center pt-6 lg:relative lg:z-auto lg:shadow-lg lg:shadow-primary/10 lg:translate-x-0 border-r border-primary/20"
        initial={false}
        animate={{
          x: isOpen ? 0 : -128,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-12 flex justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <a href="/" onClick={() => sessionStorage.removeItem('hasShownSplashThisSession')}>
            <img 
              src="/img/logo.png"
              alt="ALUNA" 
              className="h-12 w-auto drop-shadow-[0_0_10px_hsl(195_100%_50%/0.5)]"
            />
          </a>
        </motion.div>

        <nav className="flex flex-col items-center gap-6 w-full px-6 pb-8 overflow-visible">
          {/* Navigation Items */}
          {navItems.map((item, index) => {
            const active = isActive(item.href);
            const hovered = hoveredItem === item.href;

            return (
              <motion.div
                key={item.href}
                className="relative w-full flex justify-center"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={item.href}>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 cursor-pointer group ${
                      active
                        ? 'bg-primary/40 text-primary shadow-lg shadow-primary/70 border border-primary/70'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-primary border border-slate-700/50 hover:border-primary/30'
                    }`}
                  >
                    {item.icon}

                    {/* Tooltip on Hover - appears on the right */}
                    <AnimatePresence>
                      {hovered && !active && (
                        <motion.div
                          variants={tooltipVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ duration: 0.2 }}
                          className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap z-50"
                        >
                          <div className="px-5 py-3 rounded-lg font-medium text-sm bg-slate-900 text-primary border border-primary/30 shadow-lg shadow-primary/20">
                            {item.label}
                            {/* Arrow pointing left */}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}

          {/* Divider */}
          <div className="w-12 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent my-6" />

          {/* Logout Button */}
          <motion.div
            className="relative w-full flex justify-center"
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 border ${
                hoveredItem === 'logout'
                  ? 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-red-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-red-500/30'
              }`}
            >
              <LogOut className="w-6 h-6" />

              {/* Logout Tooltip - appears on the right */}
              <AnimatePresence>
                {hoveredItem === 'logout' && (
                  <motion.div
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                    className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap z-50"
                  >
                    <div className="px-5 py-3 rounded-lg font-medium text-sm bg-slate-900 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/20">
                      Logout
                      {/* Arrow pointing left */}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </nav>
      </motion.aside>

      {/* Main Content Offset - only on desktop */}
      <div className="hidden lg:block w-32" />
    </>
  );
}

