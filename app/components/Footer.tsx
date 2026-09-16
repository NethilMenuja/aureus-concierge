'use client';

import { Crown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-neutral-900 py-12 px-6 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-serif font-bold text-white tracking-wider">AUREUS CONCIERGE</span>
        </div>
        <p className="text-xs text-neutral-500">
          © 2026 Aureus B2B Procurement Engine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}