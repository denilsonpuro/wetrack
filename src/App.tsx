/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, login, useAuth, AuthProvider, testConnection } from './lib/firebase.tsx';
import { Vehicle, Driver, MaintenanceAlert, ViewType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import VehicleList from './components/VehicleList';
import DriverSafety from './components/DriverSafety';
import MaintenanceSchedule from './components/MaintenanceSchedule';
import { Navigation, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { seedDatabase } from './lib/mockData';

function MainApp() {
  const { user, loading: authLoading } = useAuth();
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    if (!user) return;

    const vQuery = query(collection(db, 'vehicles'));
    const dQuery = query(collection(db, 'drivers'));
    const aQuery = query(collection(db, 'maintenance_alerts'));

    const unsubV = onSnapshot(vQuery, (snapshot) => {
      setVehicles(snapshot.docs.map(doc => ({ ...doc.data() } as Vehicle)));
    });
    const unsubD = onSnapshot(dQuery, (snapshot) => {
      setDrivers(snapshot.docs.map(doc => ({ ...doc.data() } as Driver)));
    });
    const unsubA = onSnapshot(aQuery, (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as MaintenanceAlert)));
      setLoading(false);
    });

    return () => {
      unsubV();
      unsubD();
      unsubA();
    };
  }, [user]);

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 overflow-hidden relative font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.15),transparent)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 p-10 bg-white rounded shadow-2xl border border-slate-200 text-center max-w-sm w-full mx-4"
        >
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500 rounded flex items-center justify-center font-bold text-white tracking-tighter text-xl">WT</div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter lowercase">wetrack</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Fleet Intelligence Terminal</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Authorized Access Required</p>
          </div>
          
          <button 
            onClick={login}
            className="w-full bg-slate-900 text-white py-3 rounded text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            Authenticate Session
          </button>
          
          <div className="mt-10 pt-8 border-t border-slate-50 flex justify-between px-2">
            <div className="text-center">
              <div className="text-sm font-mono font-bold text-slate-900">142</div>
              <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Assets</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-mono font-bold text-slate-900">Active</div>
              <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Network</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-mono font-bold text-slate-900">Realtime</div>
              <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Latency</div>
            </div>
          </div>
        </motion.div>
        
        <button 
          onClick={seedDatabase}
          className="absolute bottom-10 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
        >
          Initialize Live Environment
        </button>
      </div>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard vehicles={vehicles} drivers={drivers} alerts={alerts} />;
      case 'map': return <MapView vehicles={vehicles} />;
      case 'vehicles': return <VehicleList vehicles={vehicles} />;
      case 'drivers': return <DriverSafety drivers={drivers} />;
      case 'maintenance': return <MaintenanceSchedule alerts={alerts} vehicles={vehicles} />;
      default: return <div className="p-8 text-slate-400 font-mono">Module Coming Soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.25, ease: 'circOut' }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
