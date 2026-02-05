import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Table from '../common/Table';
import PrescriptionModal from '../modals/PrescriptionModal';

function AppointmentManagement() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const { appointments, updateAppointmentStatus, getUserName, formatSpecialty, formatDate } = useData();
  const { user } = useAuth();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleApproveAndPrescribe = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPrescriptionModal(true);
  };

  const handleReject = (appointmentId) => {
    if (window.confirm('¿Estás seguro de que quieres rechazar esta cita?')) {
      updateAppointmentStatus(appointmentId, 'rechazada');
      alert('Cita rechazada exitosamente. El paciente recibirá una notificación.');
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointmentStatus(appointmentId, newStatus);
    const statusMessages = {
      'pendiente': 'Cita marcada como pendiente',
      'aprobada': 'Cita aprobada exitosamente',
      'rechazada': 'Cita rechazada'
    };
    alert(`${statusMessages[newStatus] || 'Estado actualizado'}. El paciente recibirá una notificación.`);
  };

  const columns = [
    { key: 'id', label: 'ID', render: (value) => `#${value}`, width: 'w-20' },
    { key: 'userId', label: 'Usuario', render: (value) => getUserName(value), width: 'w-32' },
    { key: 'specialty', label: 'Especialidad', render: (value) => formatSpecialty(value), width: 'w-36' },
    { key: 'date', label: 'Fecha', render: (value) => formatDate(value), width: 'w-32' },
    { key: 'time', label: 'Hora', width: 'w-20' },
    { 
      key: 'status', 
      label: 'Estado', 
      width: 'w-28',
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      width: 'w-32',
      render: (_, row) => (
        <div className="flex items-center justify-center gap-2 min-w-max">
          {row.status === 'pendiente' ? (
            <>
              {/* Botón Aprobar - Icono de Chulito */}
              <button
                onClick={() => handleApproveAndPrescribe(row)}
                className="group relative p-2.5 bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-green-200 hover:border-green-300"
                title="Aprobar cita y recetar medicamentos"
                aria-label="Aprobar cita"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Aprobar
                </span>
              </button>

              {/* Botón Rechazar - Icono de Equis */}
              <button
                onClick={() => handleReject(row.id)}
                className="group relative p-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-red-200 hover:border-red-300"
                title="Rechazar cita"
                aria-label="Rechazar cita"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Rechazar
                </span>
              </button>
            </>
          ) : row.status === 'aprobada' ? (
            <button
              onClick={() => handleStatusChange(row.id, 'pendiente')}
              className="group relative px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 hover:text-yellow-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-yellow-200 hover:border-yellow-300 text-xs font-medium"
              title="Marcar como pendiente"
            >
              <div className="flex items-center space-x-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pendiente</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => handleStatusChange(row.id, 'pendiente')}
              className="group relative px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 hover:text-yellow-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-yellow-200 hover:border-yellow-300 text-xs font-medium"
              title="Reactivar cita"
            >
              <div className="flex items-center space-x-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reactivar</span>
              </div>
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Gestión de Citas - IPS</h2>
          <p className="text-gray-600 mt-2">
            Administra todas las citas médicas del sistema
          </p>
        </div>
        
        {/* Contenedor con scroll horizontal mejorado */}
        <div className="relative">
          <div className="overflow-x-auto border border-medical-200 rounded-xl">
            <Table
              columns={columns}
              data={appointments}
              emptyMessage="No hay citas en el sistema"
              className="min-w-[1100px]"
            />
          </div>
          {/* Indicador de scroll horizontal */}
          <div className="md:hidden absolute top-4 right-4 bg-health-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            ← Desliza →
          </div>
        </div>
      </div>

      {showPrescriptionModal && selectedAppointment && (
        <PrescriptionModal
          isOpen={showPrescriptionModal}
          onClose={() => {
            setShowPrescriptionModal(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
          doctorName={user.name}
        />
      )}
    </div>
  );
}

export default AppointmentManagement;