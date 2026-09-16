'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  order_id: string;
  villa_name: string;
  item_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial orders
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  // Update Status in Supabase
  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Status updated to ${newStatus}`);
      fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to Realtime Updates
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#D4AF37]">Supplier Admin Operations</h1>
            <p className="text-neutral-400 text-sm">Real-time incoming procurement requests</p>
          </div>
          <button 
            onClick={fetchOrders}
            className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-800 text-xs font-medium"
          >
            Refresh Orders
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 border border-neutral-900 rounded-2xl text-neutral-500">
            No live orders found in Database. Place an order from Marketplace.
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900 text-xs text-[#D4AF37] uppercase font-semibold">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Villa Name</th>
                  <th className="p-4">Items Requested</th>
                  <th className="p-4">Total ($)</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="p-4 font-mono text-neutral-300">{order.order_id}</td>
                    <td className="p-4 font-medium text-white">{order.villa_name}</td>
                    <td className="p-4 text-neutral-300">{order.item_name}</td>
                    <td className="p-4 font-semibold text-white">${order.total_amount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : order.status === 'Dispatched' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-neutral-900 border border-neutral-700 text-xs text-white rounded-lg p-2 focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}