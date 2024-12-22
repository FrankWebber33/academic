import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface AttendanceStatusProps {
  status: 'present' | 'absent' | 'late';
  className?: string;
}

export function AttendanceStatus({ status, className = '' }: AttendanceStatusProps) {
  const statusConfig = {
    present: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      label: 'Present'
    },
    absent: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      label: 'Absent'
    },
    late: {
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      label: 'Late'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${config.bg} ${config.color} ${className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.label}
    </div>
  );
}