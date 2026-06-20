/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutDashboard, Map as MapIcon, Truck, Users, Wrench, ShieldCheck, LogOut } from 'lucide-react';
import { ViewType } from '../types';
import { motion } from 'motion/react';
import { logout } from '../lib/firebase';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'map', label: 'Real-time Map', icon: MapIcon },
  { id: 'vehicles', label: 'Fleet Status', icon: Truck },
  { id: 'drivers', label: 'Driver Safety', icon: Users },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 flex flex-col shrink-0 h-screen">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white tracking-tighter">WT</div>
        <span className="text-xl font-bold text-white tracking-tight lowercase">wetrack</span>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors text-sm font-medium ${
              activeView === item.id 
                ? 'bg-slate-800/50 text-blue-400 border-r-2 border-blue-500' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <item.icon size={18} className="opacity-80" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Fleet Connectivity</div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mb-2">
            <div className="bg-blue-500 w-3/4 h-1.5 rounded-full"></div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">98.2% Signals Active</div>
        </div>
        <button 
          onClick={logout}
          className="mt-4 w-full flex items-center gap-3 text-slate-500 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <LogOut size={16} />
          <span>Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}
