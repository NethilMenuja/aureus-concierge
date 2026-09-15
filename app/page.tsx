'use client';

import Navbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import dynamic from 'next/dynamic';
import { Sparkles, Compass, Shield, Zap, MapPin } from 'lucide-react';

const LuxuryMap = dynamic(() => import('./components/LuxuryMap'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans w-full max-w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-10 pb-8 max-w-7xl mx-auto text-center w-full overflow-hidden">
        <div className="inline-flex items-center space-x-2 border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-1 rounded-full text-[#F3E5AB] text-[10px] sm:text-xs tracking-widest uppercase mb-4 max-w-full truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="truncate">Ultra-Luxury B2B Micro-Concierge</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-snug max-w-4xl mx-auto break-words">
          Automated Gourmet Procurement for <span className="text-[#D4AF37] italic">Boutique Villas & Estates</span>
        </h1>

        <p className="mt-3 text-gray-400 text-xs sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
          Instantly source high-end gourmet food, rare fine wines, and bespoke concierge services with hyper-local geolocation auto-matching and automated USD checkouts.
        </p>
      </section>

      {/* OpenStreetMap Section */}
      <section id="auto-match" className="px-4 sm:px-6 py-6 max-w-7xl mx-auto border-t border-[#2A2A2A]/50 w-full overflow-hidden">
        <div className="flex flex-col items-start justify-between mb-4 gap-1">
          <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 shrink-0" /> Real-time OpenStreetMap Engine
          </div>
          <h2 className="text-lg sm:text-2xl font-serif font-bold text-white">Hyper-Local Villa Matching</h2>
        </div>

        <div className="w-full max-w-full overflow-hidden">
          <LuxuryMap />
        </div>
      </section>

      {/* Gourmet Products Section */}
      <section className="border-t border-[#2A2A2A]/50 bg-[#0F0F0F] w-full overflow-hidden">
        <ProductCatalog />
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#2A2A2A]/50 bg-[#121212]/50 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-[#1E1E1E] border border-[#2A2A2A] rounded-sm">
            <Compass className="w-7 h-7 text-[#D4AF37] mb-3" />
            <h3 className="text-base font-serif text-white font-semibold mb-2">Hyper-Local Auto Matching</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              OpenStreetMap integration matches your villa coordinates with nearby luxury gourmet suppliers instantly.
            </p>
          </div>
          <div className="p-5 bg-[#1E1E1E] border border-[#2A2A2A] rounded-sm">
            <Zap className="w-7 h-7 text-[#D4AF37] mb-3" />
            <h3 className="text-base font-serif text-white font-semibold mb-2">Micro-Concierge Automation</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              No manual quotes required. Instant orders and automated USD settlement.
            </p>
          </div>
          <div className="p-5 bg-[#1E1E1E] border border-[#2A2A2A] rounded-sm">
            <Shield className="w-7 h-7 text-[#D4AF37] mb-3" />
            <h3 className="text-base font-serif text-white font-semibold mb-2">Artisan Verification</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Exclusively curated private vendors and verified Michelin-standard suppliers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}