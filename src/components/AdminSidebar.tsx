'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, Users, Settings, BarChart3, MapPin } from 'lucide-react';
import { AuthService } from '@/services/AuthService';

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Admin navigation items
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-6 h-6" /> },
    { label: 'Floor Map', href: '/admin/floor-map', icon: <MapPin className="w-6 h-6" /> },
    { label: 'Users', href: '/admin/users', icon: <Users className="w-6 h-6" /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-6 h-6" /> },
    { label: 'Settings', href: '/admin/settings', icon: <Settings className="w-6 h-6" /> },
  ];

  const isActive = (href: string) => {
    const normalizedPathname = pathname.replace(/\/$/, '');
    const normalizedHref = href.replace(/\/$/, '');
    return normalizedPathname === normalizedHref || normalizedPathname.startsWith(normalizedHref + '/');
  };

  const handleLogout = () => {
    try {
      AuthService.logout();
      localStorage.removeItem('user');
      sessionStorage.removeItem('hasShownSplashThisSession');
      router.push('/login');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      initial={{ x: -128 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full w-32 bg-background border-r border-primary/20 shadow-2xl shadow-primary/20 z-40 overflow-visible flex flex-col items-center pt-6"
    >
      {/* Logo Section */}
      <motion.div
        className="mb-12 flex justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <img 
          src="/img/logo.png"
          alt="ALUNA" 
          className="h-12 w-auto drop-shadow-[0_0_10px_hsl(195_100%_50%/0.5)]"
        />
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex flex-col items-center gap-6 w-full px-6 pb-8 overflow-visible">
        {navItems.map((item, index) => {
          const active = isActive(item.href);
          const hovered = hoveredItem === item.href;
          
          return (
            <motion.div
              key={item.href}
              className="relative w-full flex justify-center"
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.a
                href={item.href}
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
              </motion.a>
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
            onClick={handleLogout}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 cursor-pointer bg-slate-800/50 text-slate-400 hover:bg-red-900/50 hover:text-red-400 border border-slate-700/50 hover:border-red-400/30 shadow-lg shadow-red-500/0 hover:shadow-red-500/20"
          >
            <LogOut className="w-6 h-6" />

            {/* Tooltip on Hover */}
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
                  <div className="px-5 py-3 rounded-lg font-medium text-sm bg-slate-900 text-red-400 border border-red-400/30 shadow-lg shadow-red-500/20">
                    Log Out
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
  );
}
