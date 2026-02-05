import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

function Header({ pageTitle, user, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) {
  const { logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
  };

  const handleMenuOption = (option) => {
    setUserMenuOpen(false);
    // Aquí puedes agregar la lógica para cada opción
    switch(option) {
      case 'profile':
        alert('Función de Perfil - Próximamente');
        break;
      case 'notifications':
        alert('Función de Notificaciones - Próximamente');
        break;
      case 'settings':
        alert('Función de Configuración - Próximamente');
        break;
      default:
        break;
    }
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

          {/* User Menu Dropdown */}
          <div className="relative" ref={userMenuRef}>
            {/* User info button - Desktop */}
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="hidden md:flex items-center space-x-3 px-3 py-2 bg-medical-50 rounded-xl hover:bg-medical-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-health-500"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-health-400 to-health-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-soft">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-medical-900">{user.name}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'administrador' 
                    ? 'bg-accent-100 text-accent-800' 
                    : 'bg-health-100 text-health-800'
                }`}>
                  {user.role === 'administrador' ? 'Administrador' : 'Paciente'}
                </span>
              </div>
              <svg 
                className={`w-5 h-5 text-medical-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User avatar button - Mobile */}
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="md:hidden w-10 h-10 bg-gradient-to-br from-health-400 to-health-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-soft focus:outline-none focus:ring-2 focus:ring-health-500"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-strong border border-medical-200 overflow-hidden z-50 animate-slide-up">
                {/* User Info Header */}
                <div className="px-4 py-4 bg-gradient-to-r from-health-50 to-medical-50 border-b border-medical-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-health-400 to-health-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-soft">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-medical-900 truncate">{user.name}</p>
                      <p className="text-xs text-medical-600 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="py-2">
                  {/* Perfil */}
                  <button
                    onClick={() => handleMenuOption('profile')}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-medical-50 transition-colors duration-150 text-left group"
                  >
                    <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center group-hover:bg-health-100 transition-colors duration-150">
                      <svg className="w-5 h-5 text-medical-600 group-hover:text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-medical-700 group-hover:text-medical-900">Perfil</span>
                  </button>

                  {/* Notificaciones */}
                  <button
                    onClick={() => handleMenuOption('notifications')}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-medical-50 transition-colors duration-150 text-left group"
                  >
                    <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center group-hover:bg-health-100 transition-colors duration-150">
                      <svg className="w-5 h-5 text-medical-600 group-hover:text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-medical-700 group-hover:text-medical-900">Notificaciones</span>
                  </button>

                  {/* Configuración */}
                  <button
                    onClick={() => handleMenuOption('settings')}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-medical-50 transition-colors duration-150 text-left group"
                  >
                    <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center group-hover:bg-health-100 transition-colors duration-150">
                      <svg className="w-5 h-5 text-medical-600 group-hover:text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-medical-700 group-hover:text-medical-900">Configuración</span>
                  </button>

                  {/* Divider */}
                  <div className="my-2 border-t border-medical-200"></div>

                  {/* Cerrar Sesión */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50 transition-colors duration-150 text-left group"
                  >
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-150">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-red-600 group-hover:text-red-700">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;