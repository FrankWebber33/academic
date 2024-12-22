import React from 'react';
import { User } from '@/types';

interface LayoutProps {
  user?: User;
  children: React.ReactNode;
}

export function Layout({ user, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold">School Monitor</span>
            </div>
            {user && (
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Welcome, {user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}