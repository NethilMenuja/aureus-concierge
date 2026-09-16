'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { generatePDFInvoice } from '../lib/generateInvoice';
import { supabase } from '../lib/supabaseClient';

const products = [
  { id: 1, name: 'Wagyu Beef A5 Ribeye', category: 'Gourmet Ingredients', price: 320, image: '🥩' },
  { id: 2, name: 'Dom Pérignon Vintage 2012', category: 'Fine Wine & Spirits', price: 280, image: '🍾' },
  { id: 3, name: 'Fresh Caspian Caviar 100g', category: 'Bespoke Amenities', price: 450, image: '🥣' },
];

export default function ProductCatalog() {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleCheckout = async (product: typeof products[0]) => {
    setLoadingId(product.id);
    const orderId = 'KVR-' + Math.floor(100000 + Math.random() * 900000);
    const villaName = 'Royal Villa Bentota';
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const toastId = toast.loading('Processing Procurement & Saving to Database...');

    try {
      // 1. Save Order to Supabase Real-time Database
      const { error: dbError } = await supabase.from('orders').insert([
        {
          order_id: orderId,
          villa_name: villaName,
          item_name: product.name,
          total_amount: product.price,
          status: 'Pending',
        },
      ]);

      if (dbError) {
        console.error('Supabase Error Details:', JSON.stringify(dbError, null, 2));
        toast.error(`Database Error: ${dbError.message || 'Check Supabase Keys'}`, { id: toastId });
        return;
      }

      // 2. Trigger Email Notification via Resend API
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId,
          villaName: villaName,
          items: product.name,
          totalAmount: product.price,
          customerEmail: 'manager@luxuryvilla.com',
        }),
      });

      // 3. Generate PDF Invoice
      generatePDFInvoice({
        orderId: orderId,
        villaName: villaName,
        itemName: product.name,
        price: product.price,
        date: currentDate,
      });

      toast.success(`Order Placed & Live Saved to Database!`, {
        id: toastId,
        duration: 4000,
      });

    } catch (error) {
      console.error('Checkout Error:', error);
      toast.error('Failed to process order.', { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((item) => (
        <div key={item.id} className="border border-neutral-800 bg-neutral-900/40 hover:border-[#D4AF37]/50 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="text-6xl mb-6 text-center">{item.image}</div>
            <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20">
              {item.category}
            </span>
            <h3 className="text-xl font-semibold mt-3 mb-1 text-white">{item.name}</h3>
            <p className="text-2xl font-bold mb-6 text-neutral-200">${item.price} <span className="text-xs text-neutral-400 font-normal">/ unit</span></p>
          </div>

          <button
            onClick={() => handleCheckout(item)}
            disabled={loadingId === item.id}
            className="w-full bg-[#D4AF37] text-black font-semibold py-3 px-4 rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 shadow-lg shadow-[#D4AF37]/10 cursor-pointer"
          >
            {loadingId === item.id ? 'Saving Order...' : 'Instant Procure'}
          </button>
        </div>
      ))}
    </div>
  );
}