import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import Table from '../common/Table';
import AppointmentModal from '../modals/AppointmentModal';

function MyAppointments() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { appointments, formatSpecialty, formatDate } = useData();

  const userAppointments = appointments.filter(apt => apt.userId === user.userId);

  const columns = [
    { key: 'specialty', label: 'Especialidad', render: (value) => formatSpecialty(value) },
    { key: 'date', label: 'Fecha', render: (value) => formatDate(value) },
    { key: 'time', label: 'Hora' },
    { 
      key: 'status', 
      label: 'Estado', 
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          {value}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      label: 'Solicitada', 
      render: (value) => formatDate(value.split('T')[0])
    }
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Mis Citas</h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Solicitar Cita
          </button>
        </div>
        
        <Table
          columns={columns}
          data={userAppointments}
          emptyMessage="No tienes citas programadas. ¡Solicita tu primera cita!"
        />
      </div>

      {showModal && (
        <AppointmentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MyAppointments;