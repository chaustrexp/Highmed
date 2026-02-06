import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import HomePage from '../components/pages/HomePage';
import MyAppointments from '../components/pages/MyAppointments';
import Medications from '../components/pages/Medications';
import Benefits from '../components/pages/Benefits';
import AppointmentManagement from '../components/pages/AppointmentManagement';
import Reports from '../components/pages/Reports';
import Profile from '../components/pages/Profile';
import Notifications from '../components/pages/Notifications';
import Settings from '../components/pages/Settings';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <HomePage />;
      case 'mis-citas':
        return <MyAppointments />;
      case 'medicamentos':
        return <Medications />;
      case 'beneficios':
        return <Benefits />;
      case 'gestion-citas':
        return <AppointmentManagement />;
      case 'reportes':
        return <Reports />;
      case 'perfil':
        return <Profile />;
      case 'notificaciones':
        return <Notifications />;
      case 'configuracion':
        return <Settings />;
      default:
        return <HomePage />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      'inicio': 'Dashboard',
      'mis-citas': 'Mis Citas',
      'medicamentos': 'Medicamentos',
      'beneficios': 'Beneficios',
      'gestion-citas': 'Gestión de Citas',
      'reportes': 'Reportes y Estadísticas',
      'perfil': 'Mi Perfil',
      'notificaciones': 'Notificaciones',
      'configuracion': 'Configuración'
    };
    return titles[currentPage] || 'Dashboard';
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/fondo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay sutil para el dashboard - solo en el fondo */}
      <div className="fixed inset-0 bg-white bg-opacity-90 -z-10"></div>
      
      {/* Layout principal sin z-index conflictivos */}
      <div className="flex h-screen">
        {/* Sidebar - Sin backdrop-filter que afecte el contenido */}
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          userRole={user.role}
        />

        {/* Contenido Principal - Completamente independiente */}
        <div className="flex-1 flex flex-col overflow-hidden main-content">
          {/* Header */}
          <Header
            pageTitle={getPageTitle()}
            user={user}
            setSidebarOpen={setSidebarOpen}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            setCurrentPage={setCurrentPage}
          />

          {/* Contenido del Dashboard */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto main-content">
            <div className="max-w-6xl mx-auto px-6 py-8">
              <div className="animate-enter">
                {renderPage()}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay - SOLO para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;