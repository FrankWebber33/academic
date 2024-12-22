export type UserRole = 
  | 'admin' 
  | 'principal' 
  | 'teacher' 
  | 'coordinator' 
  | 'parent' 
  | 'student' 
  | 'guest';

export interface Role {
  id: string;
  name: UserRole;
  description: string;
  created_at: string;
}

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'System administrator with full access',
  principal: 'School principal with administrative access',
  teacher: 'Teacher with class management access',
  coordinator: 'Pedagogical coordinator',
  parent: 'Parent/Guardian of students',
  student: 'Student user',
  guest: 'Limited access visitor'
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['manage_users', 'manage_roles', 'manage_schools', 'view_all_data'],
  principal: ['manage_school', 'manage_teachers', 'view_school_data'],
  teacher: ['manage_class', 'view_student_data', 'mark_attendance'],
  coordinator: ['view_school_data', 'generate_reports', 'manage_attendance'],
  parent: ['view_children', 'receive_notifications'],
  student: ['view_own_data', 'update_location'],
  guest: ['view_public_info']
};