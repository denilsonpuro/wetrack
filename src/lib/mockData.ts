/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, setDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from './firebase.tsx';
import { Vehicle, Driver, MaintenanceAlert } from '../types';

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'TRUCK-01',
    status: 'active',
    location: { lat: -23.5505, lng: -46.6333 },
    fuelPercent: 78,
    engineHealth: 'good',
    speed: 82,
    lastMaintenance: '2026-01-15',
    nextMaintenance: '2026-06-15',
    vin: '1ABCD234567EFG890'
  },
  {
    id: 'v2',
    name: 'VAN-08',
    status: 'active',
    location: { lat: -23.5596, lng: -46.6580 },
    fuelPercent: 45,
    engineHealth: 'warning',
    speed: 42,
    lastMaintenance: '2025-12-10',
    nextMaintenance: '2026-05-28',
    vin: '2BCDE345678FGH901'
  },
  {
    id: 'v3',
    name: 'TRUCK-12',
    status: 'idle',
    location: { lat: -23.6000, lng: -46.7000 },
    fuelPercent: 92,
    engineHealth: 'good',
    speed: 0,
    lastMaintenance: '2026-02-20',
    nextMaintenance: '2026-08-20',
    vin: '3CDEF456789GHI012'
  },
  {
    id: 'v4',
    name: 'LOG-TRUCK-04',
    status: 'active',
    location: { lat: -23.5850, lng: -46.6400 },
    fuelPercent: 18,
    engineHealth: 'critical',
    speed: 68,
    lastMaintenance: '2025-11-05',
    nextMaintenance: '2026-05-25',
    vin: '4DEFG567890HIJ123'
  },
  {
    id: 'v5',
    name: 'SPRINTER-05',
    status: 'maintenance',
    location: { lat: -23.5400, lng: -46.6200 },
    fuelPercent: 65,
    engineHealth: 'good',
    speed: 0,
    lastMaintenance: '2026-05-20',
    nextMaintenance: '2026-11-20',
    vin: '5EFGH678901IJK234'
  }
];

const MOCK_DRIVERS: Driver[] = [
  {
    id: 'd1',
    name: 'Roberto Silva',
    licenseNumber: 'ABC-123456',
    safetyScore: 94,
    safetyTrend: [85, 87, 86, 88, 89, 90, 88, 89, 91, 92, 90, 91, 93, 94, 92, 93, 95, 96, 94, 93, 95, 96, 97, 95, 94, 95, 96, 95, 94, 94],
    speedingEvents: 2,
    brakingEvents: 5,
    status: 'on-duty'
  },
  {
    id: 'd2',
    name: 'Maria Oliveira',
    licenseNumber: 'DEF-654321',
    safetyScore: 82,
    safetyTrend: [70, 72, 71, 73, 75, 74, 76, 78, 77, 79, 80, 78, 81, 82, 80, 81, 83, 84, 82, 81, 83, 84, 85, 83, 82, 83, 84, 83, 82, 82],
    speedingEvents: 8,
    brakingEvents: 12,
    status: 'on-duty'
  },
  {
    id: 'd3',
    name: 'Carlos Santos',
    licenseNumber: 'GHI-987654',
    safetyScore: 98,
    safetyTrend: [92, 93, 94, 93, 95, 96, 97, 96, 98, 97, 98, 99, 98, 97, 98, 99, 100, 99, 98, 99, 100, 99, 98, 97, 98, 99, 100, 99, 98, 98],
    speedingEvents: 0,
    brakingEvents: 1,
    status: 'on-duty'
  },
  {
    id: 'd4',
    name: 'Ana Pereira',
    licenseNumber: 'JKL-159357',
    safetyScore: 75,
    safetyTrend: [60, 62, 61, 63, 65, 64, 66, 68, 67, 69, 70, 68, 71, 72, 70, 71, 73, 74, 72, 71, 73, 74, 75, 73, 72, 73, 74, 73, 72, 75],
    speedingEvents: 14,
    brakingEvents: 20,
    status: 'off-duty'
  }
];

const MOCK_ALERTS: MaintenanceAlert[] = [
  {
    id: 'a1',
    vehicleId: 'v2',
    type: 'engine_check',
    severity: 'high',
    status: 'pending',
    createdAt: Timestamp.now(),
    description: 'Abnormal vibration detected in engine block.'
  },
  {
    id: 'a2',
    vehicleId: 'v4',
    type: 'brake_inspection',
    severity: 'critical',
    status: 'pending',
    createdAt: Timestamp.now(),
    description: 'Brake pad wear sensors reporting < 10% remaining life.'
  }
];

export async function seedDatabase() {
  try {
    for (const v of MOCK_VEHICLES) {
      await setDoc(doc(db, 'vehicles', v.id), v);
    }
    for (const d of MOCK_DRIVERS) {
      await setDoc(doc(db, 'drivers', d.id), d);
    }
    for (const a of MOCK_ALERTS) {
      await setDoc(doc(db, 'maintenance_alerts', a.id), a);
    }
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
