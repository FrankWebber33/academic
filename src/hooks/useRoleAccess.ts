import { useAuth } from './useAuth';
import { ROLE_PERMISSIONS, UserRole } from '@/types/roles';

export function useRoleAccess() {
  const { user } = useAuth();
  
  const hasPermission = (permission: string): boolean => {
    if (!user?.role) return false;
    return ROLE_PERMISSIONS[user.role as UserRole].includes(permission);
  };

  const canManageUsers = () => hasPermission('manage_users');
  const canManageSchool = () => hasPermission('manage_school');
  const canViewReports = () => hasPermission('generate_reports');
  const canMarkAttendance = () => hasPermission('mark_attendance');

  return {
    hasPermission,
    canManageUsers,
    canManageSchool,
    canViewReports,
    canMarkAttendance
  };
}