/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Driver } from '../types';
import { User, ShieldAlert, Award, TrendingUp, Search, Dot } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface DriverSafetyProps {
  drivers: Driver[];
}

const Sparkline = ({ data }: { data: number[] }) => {
  const chartData = data.slice(-30).map((v, i) => ({ value: v, id: i }));
  return (
    <div className="w-24 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#10b981" 
            strokeWidth={1.5} 
            dot={false} 
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function DriverSafety({ drivers }: DriverSafetyProps) {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold tracking-tight">Operator Behavior</h2>
          <div className="bg-emerald-50 px-3 py-1 rounded border border-emerald-100 flex items-center gap-2">
            <Award size={14} className="text-emerald-600" />
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-tighter">1,240km Accident Free</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Safety Protocols</div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 grid grid-cols-12 gap-4">
        {/* Statistics Rail */}
        <div className="col-span-3 space-y-4">
          <div className="card-hd">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Top Safety Rating</h3>
            <div className="space-y-3">
              {drivers.sort((a, b) => b.safetyScore - a.safetyScore).slice(0, 5).map((driver, i) => (
                <div key={driver.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-300">#0{i+1}</span>
                    <span className="text-xs font-bold text-slate-900">{driver.name.split(' ')[0]}</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-emerald-500">{driver.safetyScore}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Drive Log */}
        <div className="col-span-9 border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase tracking-wider">
              <tr className="h-10">
                <th className="px-4">Operator Name</th>
                <th className="px-4 text-center">Overspeed Events</th>
                <th className="px-4 text-center">G-Force Warning</th>
                <th className="px-4 text-center">Trend (30d)</th>
                <th className="px-4 text-center">Safety Metric</th>
                <th className="px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {drivers.map((driver) => (
                <tr key={driver.id} className="h-12 hover:bg-slate-50 transition-colors">
                  <td className="px-4">
                    <div className="font-bold text-slate-900">{driver.name}</div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">LIC: {driver.licenseNumber}</div>
                  </td>
                  <td className="px-4 text-center font-mono font-bold">
                    <span className={driver.speedingEvents > 5 ? 'text-red-500' : 'text-slate-700'}>{driver.speedingEvents}</span>
                  </td>
                  <td className="px-4 text-center font-mono font-bold text-slate-700">
                    {driver.brakingEvents}
                  </td>
                  <td className="px-4 flex justify-center py-2">
                    <Sparkline data={driver.safetyTrend} />
                  </td>
                  <td className="px-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-sm font-black ${driver.safetyScore > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{driver.safetyScore}</span>
                      <div className="w-16 bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className={`h-full ${driver.safetyScore > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${driver.safetyScore}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="flex justify-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        driver.status === 'on-duty' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {driver.status}
                      </span>
                    </div>
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
