/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle } from '../types';
import { Activity, Fuel, Gauge, PenTool as Tool, Search, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold tracking-tight">Diagnostics Hub</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search VIN/Unit..." 
              className="pl-8 pr-4 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 min-w-[240px]"
            />
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-600 shadow-sm">
          + Add Asset
        </button>
      </header>

      <div className="flex-1 overflow-auto p-4">
        <div className="border border-slate-200 rounded shadow-sm overflow-hidden">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase tracking-wider">
              <tr className="h-10">
                <th className="px-4">Vehicle ID & VIN</th>
                <th className="px-4 text-center">Engine Health</th>
                <th className="px-4">Fuel Usage</th>
                <th className="px-4 text-center">Last Service</th>
                <th className="px-4 text-center">Status</th>
                <th className="px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((v) => (
                <tr key={v.id} className="h-12 hover:bg-slate-50 transition-colors">
                  <td className="px-4">
                    <div className="font-bold text-slate-900">{v.name}</div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">{v.vin}</div>
                  </td>
                  <td className="px-4">
                    <div className="flex justify-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        v.engineHealth === 'good' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {v.engineHealth}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 w-[120px]">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between font-mono font-bold text-[9px]">
                        <span>{v.fuelPercent}%</span>
                        <Fuel size={8} />
                      </div>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${v.fuelPercent < 20 ? 'bg-red-500' : 'bg-blue-500'}`} 
                          style={{ width: `${v.fuelPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 text-center">
                    <div className="font-mono text-slate-600">{new Date(v.lastMaintenance).toLocaleDateString(undefined, { dateStyle: 'short' })}</div>
                  </td>
                  <td className="px-4">
                    <div className="flex justify-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        v.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 text-right">
                    <button className="text-slate-300 hover:text-slate-600">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
