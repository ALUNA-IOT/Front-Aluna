'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/UI/Button";
import { Menu, X, User } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Beneficios", href: "/benefits" },
  { label: "Seguridad", href: "/security" },
  { label: "Recursos", href: "/resources" },
  { label: "Contacto", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <nav className="py-6 flex flex-col gap-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-inter text-lg tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="nav" size="sm" className="mt-4 w-fit">
              Iniciar Sesión
            </Button>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;