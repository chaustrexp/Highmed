import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import StatCard from '../common/StatCard';
import Table from '../common/Table';
import AppointmentModal from '../modals/AppointmentModal';

function HomePage() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const { user } = useAuth();
  const { appointments, medications, getUserName, formatSpecialty, formatDate } = useData();

  if (user.role === 'usuario') {
    const userAppointments = appointments.filter(apt => apt.userId === user.userId);
    const userMedications = medications.filter(med => med.userId === user.userId);

    const stats = [
      {
        title: 'Citas Pendientes',
        value: userAppointments.filter(apt => apt.status === 'pendiente').length,
        subtitle: 'Esperando aprobación médica',
        color: 'amber',
        trend: { direction: 'neutral', value: 'Sin cambios' },
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: 'Citas Confirmadas',
        value: userAppointments.filter(apt => apt.status === 'aprobada').length,
        subtitle: 'Próximas consultas médicas',
        color: 'health',
        trend: { direction: 'up', value: '+2 esta semana' },
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: 'Medicamentos',
        value: userMedications.filter(med => med.status === 'disponible').length,
        subtitle: 'Listos para recoger en farmacia',
        color: 'accent',
        trend: { direction: 'neutral', value: 'Disponibles' },
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      }
    ];

    const appointmentColumns = [
      { 
        key: 'specialty', 
        label: 'Especialidad', 
        render: (value) => (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-health-500 rounded-full"></div>
            <span className="font-medium text-medical-900">{formatSpecialty(value)}</span>
          </div>
        )
      },
      { 
        key: 'date', 
        label: 'Fecha', 
        render: (value) => (
          <span className="text-medical-700">{formatDate(value)}</span>
        )
      },
      { 
        key: 'time', 
        label: 'Hora',
        render: (value) => (
          <span className="font-mono text-medical-700 bg-medical-100 px-2 py-1 rounded-lg text-sm">
            {value}
          </span>
        )
      },
      { 
        key: 'status', 
        label: 'Estado', 
        render: (value) => (
          <span className={`status-badge status-${value}`}>
            {value === 'pendiente' ? 'Pendiente' : value === 'aprobada' ? 'Confirmada' : 'Rechazada'}
          </span>
        )
      }
    ];

    return (
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card-elevated bg-gradient-health animate-enter">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-health-900 mb-2">
                ¡Bienvenido de vuelta, {user.name.split(' ')[0]}!
              </h2>
              <p className="text-health-700">
                Aquí tienes un resumen de tu actividad médica reciente
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-enter-delayed">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Appointments */}
        <div className="card animate-enter-delayed-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-medical-900">Próximas Citas</h3>
              <p className="text-medical-500 mt-1">Tus consultas médicas programadas</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAppointmentModal(true)}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Cita
            </button>
          </div>
          <Table
            columns={appointmentColumns}
            data={userAppointments.slice(0, 5)}
            emptyMessage="No tienes citas programadas"
          />
        </div>

        {/* Appointment Modal */}
        {showAppointmentModal && (
          <AppointmentModal
            isOpen={showAppointmentModal}
            onClose={() => setShowAppointmentModal(false)}
          />
        )}
      </div>
    );
  }

  // Admin view
  const stats = [
    {
      title: 'Total de Citas',
      value: appointments.length,
      subtitle: 'Citas registradas en el sistema',
      color: 'accent',
      trend: { direction: 'up', value: '+12% este mes' },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Citas Pendientes',
      value: appointments.filter(apt => apt.status === 'pendiente').length,
      subtitle: 'Requieren atención médica',
      color: 'amber',
      trend: { direction: 'down', value: '-5% esta semana' },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Citas Confirmadas',
      value: appointments.filter(apt => apt.status === 'aprobada').length,
      subtitle: 'Consultas programadas',
      color: 'health',
      trend: { direction: 'up', value: '+8% este mes' },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Medicamentos',
      value: medications.length,
      subtitle: 'Recetas médicas emitidas',
      color: 'purple',
      trend: { direction: 'up', value: '+15% este mes' },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  const appointmentColumns = [
    { 
      key: 'userId', 
      label: 'Paciente', 
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-health-100 rounded-full flex items-center justify-center">
            <span className="text-health-700 font-semibold text-sm">
              {getUserName(value).charAt(0)}
            </span>
          </div>
          <span className="font-medium text-medical-900">{getUserName(value)}</span>
        </div>
      )
    },
    { 
      key: 'specialty', 
      label: 'Especialidad', 
      render: (value) => (
        <span className="text-medical-700">{formatSpecialty(value)}</span>
      )
    },
    { 
      key: 'date', 
      label: 'Fecha', 
      render: (value) => (
        <span className="text-medical-700">{formatDate(value)}</span>
      )
    },
    { 
      key: 'status', 
      label: 'Estado', 
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          {value === 'pendiente' ? 'Pendiente' : value === 'aprobada' ? 'Confirmada' : 'Rechazada'}
        </span>
      )
    }
  ];

  return (
    <div className="section-spacing">
      {/* Admin Welcome Section */}
      <div className="card-elevated bg-gradient-accent animate-enter">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-accent-900 mb-2">
              Panel de Administración
            </h2>
            <p className="text-accent-700">
              Gestiona el sistema médico y supervisa la actividad general
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-enter-delayed">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card animate-enter-delayed-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-medical-900">Actividad Reciente</h3>
            <p className="text-medical-500 mt-1">Últimas citas registradas en el sistema</p>
          </div>
          <button className="btn btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>
        <Table
          columns={appointmentColumns}
          data={appointments.slice(0, 5)}
          emptyMessage="No hay actividad reciente"
        />
      </div>
    </div>
  );
}

export default HomePage;