'use client';

import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import SecuritySection from "@/components/SecuritySection";

export default function SeguridadPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <SecuritySection />
      </main>
      <Footer />
    </>
  );
}
