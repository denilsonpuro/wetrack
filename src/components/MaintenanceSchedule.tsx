/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MaintenanceAlert, Vehicle } from '../types';
import { Calendar, Wrench, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface MaintenanceScheduleProps {
  alerts: MaintenanceAlert[];
  vehicles: Vehicle[];
}

export default function MaintenanceSchedule({ alerts, vehicles }: MaintenanceScheduleProps) {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-sans">
      <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold tracking-tight">Maintenance Ops</h2>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-100">
            Log Archive
          </button>
          <button className="bg-slate-900 text-white px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-sm">
            + Schedule Order
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 grid grid-cols-4 gap-4">
        {/* Alerts Rail */}
        <div className="col-span-1 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Critical Faults</h3>
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded border ${alert.severity === 'critical' ? 'bg-red-50 border-red-100' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${
                  alert.severity === 'critical' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {alert.severity}
                </span>
                <span className="text-[9px] font-mono text-slate-400">Unit #{alert.vehicleId.toUpperCase()}</span>
              </div>
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-tight mb-1">{alert.type.replace('_', ' ')}</div>
              <p className="text-[10px] text-slate-500 leading-tight mb-3 line-clamp-3">{alert.description}</p>
              <button className="w-full py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-slate-800">
                Acknowledge
              </button>
            </div>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="col-span-3 border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase tracking-wider">
              <tr className="h-10">
                <th className="px-4">Asset Identification</th>
                <th className="px-4">Service Required</th>
                <th className="px-4 text-center">Due Window</th>
                <th className="px-4 text-center">Priority</th>
                <th className="px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((v) => (
                <tr key={v.id} className="h-12 hover:bg-slate-50 transition-colors">
                  <td className="px-4">
                    <div className="font-bold text-slate-900 uppercase tracking-tight">{v.name}</div>
                    <div className="text-[9px] font-mono text-slate-300">VIN: {v.vin.slice(-8)}</div>
                  </td>
                  <td className="px-4">
                    <div className="flex items-center gap-2 font-medium text-slate-600">
                      <Wrench size={12} className="text-blue-500" />
                      Standard Inspection
                    </div>
                  </td>
                  <td className="px-4 text-center">
                    <div className="font-mono font-bold text-slate-700">{new Date(v.nextMaintenance).toLocaleDateString(undefined, { dateStyle: 'short' })}</div>
                  </td>
                  <td className="px-4">
                    <div className="flex justify-center">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px] font-black uppercase">Standard</span>
                    </div>
                  </td>
                  <td className="px-4 text-right">
                    <button className="text-slate-300 hover:text-blue-600">
                      <ExternalLink size={14} />
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
