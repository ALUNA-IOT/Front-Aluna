'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import Footer from "@/components/landing/Footer";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"loading" | "logo" | "exit">("loading");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("logo"), 500);
    const timer2 = setTimeout(() => setPhase("exit"), 2800);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          
          {/* Animated Glow */}
          <motion.div
            className="absolute w-150 h-150 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(195 100% 50% / 0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Scan Line Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent"
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Logo Container */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: phase === "logo" ? 1 : 0, 
              scale: phase === "logo" ? 1 : 0.8 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Glitch Effect Container */}
            <motion.div
              className="relative"
              animate={phase === "logo" ? {
                x: [0, -3, 3, -2, 2, 0],
                filter: [
                  "hue-rotate(0deg) brightness(1)",
                  "hue-rotate(10deg) brightness(1.2)",
                  "hue-rotate(-10deg) brightness(0.9)",
                  "hue-rotate(5deg) brightness(1.1)",
                  "hue-rotate(0deg) brightness(1)",
                ],
              } : {}}
              transition={{
                duration: 0.4,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                delay: 0.3,
              }}
            >
              {/* Main Logo Image */}
              <motion.div
                className="w-100 md:w-125 lg:w-150 h-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: phase === "logo" ? 1 : 0, 
                  y: phase === "logo" ? 0 : 20 
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src="/img/logo.png"
                  alt="ALUNA Logo"
                  className="w-full h-auto drop-shadow-[0_0_30px_hsl(195_100%_50%/0.8)]"
                />
              </motion.div>

              {/* Glitch Layer 1 - Offset */}
              <motion.div
                className="absolute inset-0 w-100 md:w-125 lg:w-150 h-auto opacity-50"
                animate={{
                  x: [0, 4, -4, 0],
                  opacity: [0, 0.5, 0.5, 0],
                }}
                transition={{
                  duration: 0.15,
                  delay: 0.6,
                  repeat: 3,
                  repeatDelay: 0.3,
                }}
                style={{ 
                  clipPath: "inset(0 0 50% 0)",
                }}
              >
                <img
                  src="/img/logo.png"
                  alt=""
                  className="w-full h-auto"
                  style={{
                    filter: "hue-rotate(90deg)"
                  }}
                />
              </motion.div>
              
              {/* Glitch Layer 2 - Offset */}
              <motion.div
                className="absolute inset-0 w-100 md:w-125 lg:w-150 h-auto opacity-50"
                animate={{
                  x: [0, -4, 4, 0],
                  opacity: [0, 0.5, 0.5, 0],
                }}
                transition={{
                  duration: 0.15,
                  delay: 0.7,
                  repeat: 3,
                  repeatDelay: 0.3,
                }}
                style={{ 
                  clipPath: "inset(50% 0 0 0)",
                }}
              >
                <img
                  src="/img/logo.png"
                  alt=""
                  className="w-full h-auto"
                  style={{
                    filter: "hue-rotate(-90deg)"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Underline Animation */}
            <motion.div
              className="mt-8 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0 }}
              animate={{ width: phase === "logo" ? "80%" : 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-6 font-inter text-sm md:text-lg tracking-[0.15em] md:tracking-[0.3em] text-muted-foreground uppercase text-white px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === "logo" ? 1 : 0, y: phase === "logo" ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              IoT Intelligence Platform
            </motion.p>
          </motion.div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // En la carga inicial, verificar si es la primera vez usando sessionStorage
    // sessionStorage se limpia cuando cierras la pestaña
    const hasShownSplashThisSession = sessionStorage.getItem('hasShownSplashThisSession');
    
    if (!hasShownSplashThisSession) {
      // Primera vez en esta sesión - mostrar splash screen
      setShowSplash(true);
      sessionStorage.setItem('hasShownSplashThisSession', 'true');
    } else {
      // Ya lo vio en esta sesión - no mostrar splash screen
      setShowSplash(false);
    }
    
    setIsInitialLoad(false);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (isInitialLoad) {
    return null; // O un loading component si quieres
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && (
        <>
          <HeroSection />
          <AboutSection />
          <Footer />
        </>
      )}
    </>
  );
}
