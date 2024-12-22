export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'principal' | 'teacher' | 'coordinator' | 'parent' | 'student' | 'guest';
  created_at: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: string;
  user_id: string;
}

export interface School {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
}

export interface Attendance {
  id: string;
  user_id: string;
  school_id: string;
  date: string;
  is_present: boolean;
  location?: Location;
}