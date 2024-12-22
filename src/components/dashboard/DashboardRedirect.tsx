import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ParentDashboard } from '@/pages/dashboard/ParentDashboard';
import { StudentDashboard } from '@/pages/dashboard/StudentDashboard';
import { AdminDashboard } from '@/pages/dashboard/AdminDashboard';

export function DashboardRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  switch (user.role) {
    case 'parent':
      return <ParentDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'admin':
    case 'principal':
    case 'teacher':
    case 'coordinator':
      return <AdminDashboard />;
    default:
      window.location.href = '/login';
      return null;
  }
}