'use client';

import UserSidebar from '@/components/UserSidebar';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function UsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Gradient Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-fade opacity-10" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(195 100% 50% / 0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(195 100% 50% / 0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex">
        {/* Sidebar - Always visible on desktop, toggle on mobile */}
        <div className="fixed left-0 top-0 z-40">
          <UserSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full lg:ml-32">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
