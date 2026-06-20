/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Vehicle } from '../types';
import { Truck, Activity, Fuel, Navigation } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface MapViewProps {
  vehicles: Vehicle[];
}

export default function MapView({ vehicles }: MapViewProps) {
  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-50 text-center">
        <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Navigation size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Google Maps API Key Required</h2>
          <p className="text-slate-600 mb-6">To enable real-time GPS tracking, please configure your Google Maps Platform API Key.</p>
          <div className="text-left space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
            <p><strong>1. Get an API Key:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start" className="text-blue-600 hover:underline" target="_blank">Google Cloud Console</a></p>
            <p><strong>2. Profile Settings:</strong> Click the Gear icon (top right) → Secrets</p>
            <p><strong>3. Add Secret:</strong> <code>GOOGLE_MAPS_PLATFORM_KEY</code></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: -23.5505, lng: -46.6333 }}
          defaultZoom={12}
          mapId="WETRACK_FLEET_MAP"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          className="w-full h-full"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {vehicles.map((vehicle) => (
            <VehicleMarker key={vehicle.id} vehicle={vehicle} />
          ))}
        </Map>
      </APIProvider>

      {/* Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
        <div className="bg-white/90 backdrop-blur p-4 rounded shadow-lg border border-slate-200 pointer-events-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Live Fleet Telemetry</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[11px] font-bold text-slate-700 font-mono">{vehicles.filter(v => v.status === 'active').length} TRANSIT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span className="text-[11px] font-bold text-slate-700 font-mono">{vehicles.filter(v => v.status === 'idle').length} IDLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleMarker({ vehicle }: { vehicle: Vehicle }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  // Status-based colors
  const bgColor = vehicle.status === 'active' ? '#3b82f6' : vehicle.status === 'maintenance' ? '#f59e0b' : '#64748b';

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={vehicle.location}
        onClick={() => setOpen(true)}
        title={vehicle.name}
      >
        <div className="relative cursor-pointer">
          <div className="bg-white border border-slate-300 px-1.5 py-0.5 rounded-sm shadow-md flex items-center gap-1.5 transition-transform hover:scale-110 active:scale-95">
             <div className="w-2 h-2 rounded-full" style={{ background: bgColor }} />
             <span className="text-[9px] font-black text-slate-900 font-mono uppercase tracking-tighter whitespace-nowrap">{vehicle.name}</span>
          </div>
        </div>
      </AdvancedMarker>

      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)} disableAutoPan={false}>
          <div className="p-1 min-w-[180px] font-sans">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-wider">{vehicle.name}</h3>
              <span className="text-[9px] font-mono text-slate-400">{vehicle.vin.slice(-6)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100">
              <div>
                <div className="text-[8px] text-slate-400 font-black uppercase mb-0.5 tracking-tighter">Velocity</div>
                <div className="text-[11px] font-mono font-bold text-slate-700">{vehicle.speed} km/h</div>
              </div>
              <div>
                <div className="text-[8px] text-slate-400 font-black uppercase mb-0.5 tracking-tighter">Fuel</div>
                <div className={`text-[11px] font-mono font-bold ${vehicle.fuelPercent < 20 ? 'text-red-500' : 'text-slate-700'}`}>{vehicle.fuelPercent}%</div>
              </div>
            </div>
            
            <button className="w-full mt-2 bg-slate-900 text-white text-[9px] font-black py-1.5 rounded-sm hover:bg-slate-800 uppercase tracking-widest">
              Telematics Data
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
