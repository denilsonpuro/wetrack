/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle, Driver, MaintenanceAlert } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Line } from 'recharts';
import { AlertCircle, CheckCircle2, Clock, Fuel, Activity, Navigation, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  alerts: MaintenanceAlert[];
}

const efficiencyData = [
  { name: 'Mon', fuel: 450, miles: 2800 },
  { name: 'Tue', fuel: 520, miles: 3100 },
  { name: 'Wed', fuel: 480, miles: 2950 },
  { name: 'Thu', fuel: 610, miles: 3800 },
  { name: 'Fri', fuel: 550, miles: 3400 },
  { name: 'Sat', fuel: 300, miles: 1900 },
  { name: 'Sun', fuel: 200, miles: 1200 },
];

export default function Dashboard({ vehicles, drivers, alerts }: DashboardProps) {
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status === 'pending').length;
  const avgFuel = vehicles.reduce((acc, v) => acc + v.fuelPercent, 0) / (vehicles.length || 1);
  const avgSafety = drivers.reduce((acc, d) => acc + d.safetyScore, 0) / (drivers.length || 1);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-100 font-sans">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-bold tracking-tight">Fleet Intelligence</h1>
          <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase font-black tracking-widest border border-slate-200">
            <span>Network:</span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>ACTIVE
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex flex-col items-end">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Server Latency</span>
             <span className="text-xs font-mono font-bold text-slate-900">24ms</span>
           </div>
           <div className="w-px h-8 bg-slate-100" />
           <div className="flex items-center gap-3">
             <div className="text-right">
                <div className="text-xs font-bold text-slate-900 leading-none">Admin Terminal</div>
                <div className="text-[9px] font-mono text-slate-400 uppercase">Ops Manager</div>
             </div>
             <div className="w-8 h-8 rounded bg-slate-200 border border-slate-300" />
           </div>
        </div>
      </header>

      <div className="flex-1 p-4 grid grid-cols-4 grid-rows-[auto_1fr_auto] gap-4 overflow-hidden">
        {/* Row 1: KPI Grid */}
        <div className="col-span-1 bg-white p-4 border border-slate-200 rounded shadow-sm">
          <div className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-widest italic opacity-80">Connected Assets</div>
          <div className="text-3xl font-mono font-bold tracking-tighter flex items-baseline gap-2">
            {vehicles.length.toString().padStart(3, '0')}
            <span className="text-xs font-normal text-emerald-500 font-sans px-1 bg-emerald-50 rounded">98% UP</span>
          </div>
        </div>

        <div className="col-span-1 bg-white p-4 border border-slate-200 rounded shadow-sm">
          <div className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-widest italic opacity-80">Fuel Compliance</div>
          <div className="text-3xl font-mono font-bold tracking-tighter">
            {Math.round(avgFuel)}<span className="text-sm font-normal text-slate-400 opacity-50 ml-1">%</span>
          </div>
        </div>

        <div className="col-span-1 bg-white p-4 border border-slate-200 rounded shadow-sm">
          <div className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-widest italic opacity-80">Safety Rating</div>
          <div className="text-3xl font-mono font-bold tracking-tighter text-blue-500">
            {Math.round(avgSafety)}
          </div>
        </div>

        <div className="col-span-1 bg-white p-4 border border-slate-200 rounded shadow-sm">
          <div className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-widest italic opacity-80">System Alerts</div>
          <div className="text-3xl font-mono font-bold tracking-tighter">
            {alerts.length.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] font-bold text-red-500 uppercase mt-1 tracking-tighter">{criticalAlerts} Critical faults require intervention</div>
        </div>

        {/* Row 2: Efficiency Trends */}
        <div className="col-span-3 bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col">
          <div className="p-3 border-b bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex justify-between items-center">
            <span>Fleet Efficiency: Fuel Consumption vs Distance</span>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="opacity-60 lowercase">Fuel (Ltr)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span className="opacity-60 lowercase">Miles</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                <Tooltip 
                  contentStyle={{borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 'bold'}}
                />
                <Bar dataKey="fuel" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={20} />
                <Line type="monotone" dataKey="miles" stroke="#0f172a" strokeWidth={2} dot={{fill: '#0f172a', r: 3}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 bg-white border border-slate-200 rounded shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 border-b bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500">Real-time Pulse</div>
          <div className="flex-1 overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between font-black text-[9px] tracking-tight mb-1">
                  <span className="text-slate-900">{alert.type.toUpperCase()}</span>
                  <span className={alert.severity === 'critical' ? 'text-red-500 animate-pulse' : 'text-blue-500'}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <div className="text-[10px] leading-tight text-slate-500 font-medium italic">"{alert.description}"</div>
                <div className="text-[8px] text-slate-400 mt-2 font-mono uppercase">Unit #{alert.vehicleId.toUpperCase()} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Active Fleet Map Preview */}
        <div className="col-span-4 bg-white border border-slate-200 rounded shadow-sm overflow-hidden h-32 flex items-center px-12 gap-12">
            <div className="shrink-0 flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Fleet Velocity</span>
              <span className="text-2xl font-mono font-bold tracking-tighter">82 <span className="text-xs font-sans text-slate-400 lowercase">avg km/h</span></span>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex-1 overflow-hidden pointer-events-none opacity-40 select-none flex items-center justify-around">
               {vehicles.map((v, i) => (
                 <div key={v.id} className="flex flex-col items-center gap-1">
                    <div className="w-4 bg-blue-500 rounded-sm" style={{height: `${v.speed * 0.4 + 10}px`}} />
                    <span className="text-[8px] font-mono text-slate-900 font-bold">{v.name.slice(-2)}</span>
                 </div>
               ))}
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Operational Health</div>
                <div className="text-emerald-500 font-bold text-sm tracking-tight uppercase">OPTIMIZED</div>
              </div>
              <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded">
                <Activity size={16} />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, subValue, icon: Icon, color }: any) {
  const colors: any = {
    blue: 'text-blue-600 bg-blue-50',
    amber: 'text-amber-600 bg-amber-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    indigo: 'text-indigo-600 bg-indigo-50',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
          <span className="text-xs text-slate-400 font-medium">{subValue}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
