import React, { useEffect } from 'react';
import { ParentDashboard } from '../pages/dashboard/ParentDashboard';
import { StudentDashboard } from '../pages/dashboard/StudentDashboard';
import { AdminDashboard } from '../pages/dashboard/AdminDashboard';

export function DashboardRedirect() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user || !user.role) {
      window.location.href = '/login';
    }
  }, [user]);

  switch (user.role) {
    case 'parent':
      return <ParentDashboard />;
    case 'child':
      return <StudentDashboard />;
    case 'admin':
    case 'teacher':
      return <AdminDashboard />;
    default:
      return null;
  }
}