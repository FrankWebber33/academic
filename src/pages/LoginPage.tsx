import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { LoginForm } from '@/components/auth/LoginForm';
import { LogIn } from 'lucide-react';

export function LoginPage() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <LogIn className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <LoginForm />
          <div className="text-sm text-center">
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Don't have an account? Register
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}