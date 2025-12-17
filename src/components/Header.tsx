'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/UI/Button";
import { Menu, X, User, Home, Gift, Shield, Book, Mail } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Beneficios", href: "/benefits", icon: Gift },
  { label: "Seguridad", href: "/security", icon: Shield },
  { label: "Recursos", href: "/resources", icon: Book },
  { label: "Contacto", href: "/contact", icon: Mail },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => {
              // Limpiar sessionStorage para mostrar el splash screen
              sessionStorage.removeItem('hasShownSplashThisSession');
            }}
          >
          
            <img 
              src="/img/logo.png"
              alt="ALUNA" 
              className="h-10 w-auto drop-shadow-[0_0_10px_hsl(195_100%_50%/0.5)]"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 px-6 py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative font-inter text-sm tracking-wider uppercase text-muted-foreground transition-colors group px-3 py-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.08, color: "#7dd1fe" }}
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-0 left-0 h-px bg-primary" 
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute inset-0 rounded-lg bg-primary/15 -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.1, color: "#FF7F00" }}
                className="p-2 text-foreground hover:text-[#FF7F00] transition-colors"
              >
                <User size={24} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Right Sidebar */}
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 md:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <motion.nav
          className="fixed top-0 right-0 h-full w-24 md:hidden z-50 pt-24 px-3 border-l border-cyan-500/30 bg-slate-950/40 backdrop-blur-2xl flex flex-col items-center"
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex-1 flex flex-col gap-4 mb-6">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setHoveredTooltip(item.label)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <motion.a
                    href={item.href}
                    className="p-3 rounded-lg text-white bg-linear-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-400/60 hover:from-slate-800/70 hover:to-slate-700/70 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(34, 211, 238, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-cyan-600/90 text-white text-xs font-inter whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, x: 10 }}
                    animate={hoveredTooltip === item.label ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Divider */}
          <div className="w-8 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent mb-4" />
          
          {/* Login Button */}
          <motion.div 
            className="relative group"
            onMouseEnter={() => setHoveredTooltip("login")}
            onMouseLeave={() => setHoveredTooltip(null)}
          >
            <motion.a
              href="/login"
              className="p-3 rounded-lg text-white bg-linear-to-r from-cyan-600/80 to-cyan-500/60 border border-cyan-400/50 hover:border-cyan-300 hover:from-cyan-600 hover:to-cyan-500 transition-all duration-300 backdrop-blur-sm mb-3 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={20} />
            </motion.a>
            
            {/* Tooltip */}
            <motion.div
              className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-cyan-600/90 text-white text-xs font-inter whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              animate={hoveredTooltip === "login" ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              Iniciar Sesión
            </motion.div>
          </motion.div>
          
          {/* Close Button */}
          <motion.div 
            className="relative group"
            onMouseEnter={() => setHoveredTooltip("close")}
            onMouseLeave={() => setHoveredTooltip(null)}
          >
            <motion.button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-lg text-white bg-linear-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-400/60 hover:from-slate-800/70 hover:to-slate-700/70 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(34, 211, 238, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>
            
            {/* Tooltip */}
            <motion.div
              className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-cyan-600/90 text-white text-xs font-inter whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              animate={hoveredTooltip === "close" ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              Cerrar
            </motion.div>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;