'use client';

import { ShoppingBag, Crown, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-[#121212] border-b border-[#2A2A2A] sticky top-0 z-50 px-4 sm:px-6 py-4 flex items-center justify-between w-full max-w-full overflow-hidden">
      <div className="flex items-center space-x-2 min-w-0">
        <Crown className="w-5 h-5 text-[#D4AF37] shrink-0" />
        <span className="font-serif font-bold text-base sm:text-xl text-white tracking-wider truncate">
          AUREUS
        </span>
        <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded uppercase hidden sm:inline-block shrink-0">
          Concierge B2B
        </span>
      </div>

      <div className="flex items-center space-x-3 shrink-0">
        <a
          href="#marketplace"
          className="text-xs text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 bg-[#1E1E1E] px-3 py-1.5 rounded border border-[#2A2A2A]"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Marketplace</span>
        </a>

        <a
          href="/admin"
          className="text-xs text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-1.5 bg-[#1E1E1E] px-3 py-1.5 rounded border border-[#D4AF37]/40 font-medium"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Supplier Admin</span>
        </a>
      </div>
    </nav>
  );
}