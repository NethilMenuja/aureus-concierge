'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';
import ProductCatalog from './components/ProductCatalog';
import { Crown, MapPin, Zap } from 'lucide-react';

const LuxuryMap = dynamic(() => import('./components/LuxuryMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-neutral-900 animate-pulse rounded-2xl" />,
});

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-neutral-100 selection:bg-[#D4AF37]/20">
      
      {/* 👑 Luxury Hero Section */}
      <motion.section 
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-neutral-900 bg-[#0C0C0C]"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-4 py-1.5 rounded-full mb-6">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
              Kavaro Concierge • Ultra-Luxury Procurement
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
            Autonomous Provisioning <br /> for <span className="text-[#D4AF37]">Private Estates</span>.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
            Welcome to Kavaro Concierge. Instant, high-end procurement for world-class villas. Zero manual quoting, automated matching, and instant global payments.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex gap-4 justify-center">
            <a href="#marketplace" className="bg-[#D4AF37] text-black font-semibold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors flex items-center gap-2 group">
              Explore Marketplace
              <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/admin" className="bg-neutral-900 border border-neutral-800 text-white font-medium px-8 py-4 rounded-xl hover:bg-neutral-800 transition-colors">
              Supplier Admin
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* 🗺️ Floating Map & Feature Section */}
      <section className="py-20 md:py-28 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          
          <motion.div 
            className="md:col-span-3 h-[450px] md:h-[600px] rounded-3xl overflow-hidden border border-neutral-900 shadow-2xl shadow-black/30 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-4 left-4 z-50 inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-neutral-800 px-3 py-1.5 rounded-full shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs text-neutral-200 font-medium">Hyper-Local Supplier Matching</span>
            </div>
            <LuxuryMap />
          </motion.div>
          
          <motion.div 
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Real-time Spatial Matching.
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Our advanced geospatial engine auto-matches your villa's coordinates with verified luxury suppliers within a specific radius, ensuring immediate availability and rapid logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🛍️ Animated Product Catalog Section */}
      <section id="marketplace" className="py-20 md:py-28 bg-[#0C0C0C] border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
              Kavaro B2B Marketplace.
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Direct access to the world's finest ingredients, spirits, and luxury amenities for Sri Lankan hospitality.
            </p>
          </motion.div>
          
          <ProductCatalog />
        </div>
      </section>

    </main>
  );
}