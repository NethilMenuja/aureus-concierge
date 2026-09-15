'use client';

import { useState } from 'react';
import { ShoppingBag, CheckCircle, Zap } from 'lucide-react';

const products = [
  { id: 1, name: 'Château Margaux Premier Grand Cru 2015', category: 'Fine Wine', price: 1250, unit: 'Bottle', vendor: 'Royal Ceylon Cellar' },
  { id: 2, name: 'Black Winter Truffles (Fresh Périgord)', category: 'Gourmet', price: 850, unit: '500g Pack', vendor: 'Artisan Gourmet' },
  { id: 3, name: 'Beluga Caviar Reserve (Amasia)', category: 'Luxury Seafood', price: 2100, unit: '250g Tin', vendor: 'Oceanic Caviar' },
];

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInstantOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedProduct(null);
    }, 3000);
  };

  return (
    <div id="marketplace" className="py-12 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <span className="text-[#D4AF37] text-xs uppercase font-semibold tracking-widest block mb-1">
            Instant B2B Procurement
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Curated Gourmet Catalog</h2>
        </div>
      </div>

      {/* Responsive Grid: Mobile 1 Column, Desktop 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-[#121212] border border-[#2A2A2A] p-6 rounded-sm flex flex-col justify-between hover:border-[#D4AF37]/50 transition">
            <div>
              <span className="text-[10px] bg-[#2A2A2A] text-[#D4AF37] px-2.5 py-1 rounded-full uppercase font-medium">
                {item.category}
              </span>
              <h3 className="text-lg font-serif font-bold text-white mt-3 mb-1">{item.name}</h3>
              <p className="text-xs text-gray-400 mb-4">Artisan: {item.vendor}</p>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-[#D4AF37]">${item.price}</span>
                <span className="text-xs text-gray-500 ml-1">USD / {item.unit}</span>
              </div>
              <button
                onClick={() => setSelectedProduct(item)}
                className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black px-4 py-2 text-xs font-bold uppercase rounded-sm flex items-center gap-1.5 transition"
              >
                <Zap className="w-3.5 h-3.5" /> Instant Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Automated B2B Order Checkout Modal (Mobile Friendly) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#D4AF37]/40 w-full max-w-md p-6 rounded-sm shadow-2xl relative">
            {!orderSuccess ? (
              <>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Automated USD Checkout</h3>
                <p className="text-xs text-gray-400 mb-4">Direct B2B micro-concierge placement for luxury estates.</p>

                <div className="bg-[#1E1E1E] p-4 rounded border border-[#2A2A2A] mb-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Product:</span>
                    <span className="font-semibold text-white">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Unit Price:</span>
                    <span className="font-semibold text-[#D4AF37]">${selectedProduct.price} USD</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Auto-Matched Dispatch:</span>
                    <span className="text-xs text-green-400">Instant Automated</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-1/2 border border-[#2A2A2A] text-gray-300 py-2.5 text-xs font-semibold uppercase hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInstantOrder}
                    className="w-1/2 bg-[#D4AF37] text-black py-2.5 text-xs font-bold uppercase hover:bg-[#AA7C11]"
                  >
                    Confirm USD Pay
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 animate-bounce" />
                <h4 className="text-lg font-serif font-bold text-white mb-1">Order Dispatched Automatically!</h4>
                <p className="text-xs text-gray-400">Direct notice sent to vendor. USD Invoice generated.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}