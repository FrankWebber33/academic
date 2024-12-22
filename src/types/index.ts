export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child' | 'teacher' | 'admin';
  createdAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: Date;
  userId: string;
}

export interface School {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // Radius in meters for geofencing
}

export interface Attendance {
  id: string;
  userId: string;
  schoolId: string;
  date: Date;
  isPresent: boolean;
  location?: Location;
}