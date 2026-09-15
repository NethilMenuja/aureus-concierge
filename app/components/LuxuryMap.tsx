'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Default Leaflet Marker Icons
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const vendorIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const sampleVendors = [
  { id: 1, name: 'Royal Ceylon Fine Wine Cellar', category: 'Vintage Wine', lat: 6.9271, lng: 79.8612 },
  { id: 2, name: 'Artisan Gourmet Truffles & Cheese', category: 'High-End Gourmet', lat: 6.9011, lng: 79.8522 },
  { id: 3, name: 'Oceanic Caviar & Seafood Reserve', category: 'Luxury Seafood', lat: 6.8833, lng: 79.8650 }
];

export default function LuxuryMap() {
  const villaPosition: [number, number] = [6.9147, 79.8540];

  return (
    <div className="w-full h-[320px] md:h-[450px] rounded-md overflow-hidden border border-[#2A2A2A] shadow-2xl relative z-0">
      <MapContainer center={villaPosition} zoom={12} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <Marker position={villaPosition} icon={defaultIcon}>
          <Popup>
            <div className="text-black font-sans">
              <strong className="text-xs uppercase tracking-wider block">Your Location</strong>
              <span className="text-sm font-semibold">Grand Reserve Villa</span>
            </div>
          </Popup>
        </Marker>

        <Circle center={villaPosition} radius={15000} pathOptions={{ color: '#D4AF37', fillColor: '#D4AF37', fillOpacity: 0.1 }} />

        {sampleVendors.map((vendor) => (
          <Marker key={vendor.id} position={[vendor.lat, vendor.lng]} icon={vendorIcon}>
            <Popup>
              <div className="text-black font-sans">
                <span className="text-[10px] bg-black text-[#D4AF37] px-2 py-0.5 rounded uppercase font-bold">{vendor.category}</span>
                <h4 className="text-sm font-bold mt-1">{vendor.name}</h4>
                <p className="text-xs text-gray-600 font-medium">Verified Ultra-Luxury Supplier</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}