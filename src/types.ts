/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Location {
  lat: number;
  lng: number;
}

export type VehicleStatus = 'active' | 'maintenance' | 'idle' | 'offline';
export type EngineHealth = 'good' | 'warning' | 'critical';

export interface Vehicle {
  id: string;
  name: string;
  status: VehicleStatus;
  location: Location;
  fuelPercent: number;
  engineHealth: EngineHealth;
  speed: number;
  lastMaintenance: string;
  nextMaintenance: string;
  vin: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  safetyScore: number;
  safetyTrend: number[];
  speedingEvents: number;
  brakingEvents: number;
  status: 'on-duty' | 'off-duty' | 'on-break';
}

export interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  type: 'oil_change' | 'engine_check' | 'tire_rotation' | 'brake_inspection';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: any; // Firestore Timestamp
  description: string;
}

export type ViewType = 'dashboard' | 'map' | 'vehicles' | 'drivers' | 'maintenance' | 'compliance';
