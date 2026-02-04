import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

function Header({ pageTitle, user, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <header className="header-clean border-b border-medical-200 shadow-soft">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-medical-400 hover:text-medical-600 hover:bg-medical-100 focus:outline-none focus:ring-2 focus:ring-health-500 transition-colors duration-200"
          >
            <span className="sr-only">Abrir menú</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop hamburger menu button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 rounded-xl text-medical-400 hover:text-medical-600 hover:bg-medical-100 focus:outline-none focus:ring-2 focus:ring-health-500 transition-colors duration-200"
          >
            <span className="sr-only">{sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}</span>
            {sidebarCollapsed ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
              </svg>
            )}
          </button>
          
          <div className="animate-enter">
            <h1 className="text-lg sm:text-xl font-bold text-medical-900 truncate">{pageTitle}</h1>
            <p className="text-xs sm:text-sm text-medical-500 mt-0.5">
              {getGreeting()}, {user.name.split(' ')[0]}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <NotificationDropdown />

          {/* User info - Solo en desktop */}
          <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-medical-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-health-400 to-health-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-medical-900">{user.name}</p>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'administrador' 
                    ? 'bg-accent-100 text-accent-800' 
                    : 'bg-health-100 text-health-800'
                }`}>
                  {user.role === 'administrador' ? 'Admin' : 'Paciente'}
                </span>
              </div>
            </div>
          </div>
          
          {/* User avatar - Solo en móvil */}
          <div className="md:hidden w-8 h-8 bg-gradient-to-br from-health-400 to-health-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="btn btn-ghost text-medical-600 hover:text-red-600 hover:bg-red-50 text-xs sm:text-sm"
          >
            <svg className="w-4 h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;