import React from 'react';
import { ROLE_DESCRIPTIONS, UserRole } from '@/types/roles';

interface RoleSelectProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}

export function RoleSelect({ value, onChange, disabled }: RoleSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        User Role
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as UserRole)}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
      >
        {Object.entries(ROLE_DESCRIPTIONS).map(([role, description]) => (
          <option key={role} value={role} title={description}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}