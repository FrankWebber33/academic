import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardRedirect } from './components/dashboard/DashboardRedirect';
import { AuthProvider } from './components/providers/AuthProvider';

function App() {
  const path = window.location.pathname;

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {path === '/dashboard' ? (
          <DashboardRedirect />
        ) : path === '/register' ? (
          <RegisterPage />
        ) : (
          <LoginPage />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;