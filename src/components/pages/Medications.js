import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import StatCard from '../common/StatCard';
import Table from '../common/Table';

function Medications() {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { medications, claimMedication, formatDate } = useData();

  const userMedications = medications.filter(med => med.userId === user.userId);

  // Categorizar medicamentos
  const disponibles = userMedications.filter(med => med.status === 'disponible');
  const recetados = userMedications.filter(med => med.status === 'recetado');
  const asignados = userMedications.filter(med => med.status === 'asignado');
  const reclamados = userMedications.filter(med => med.status === 'reclamado');

  // Filtrar por búsqueda
  const filterMedications = (meds) => {
    if (!searchTerm) return meds;
    return meds.filter(med =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const stats = [
    {
      title: 'Disponibles',
      value: disponibles.length,
      subtitle: 'Para reclamar',
      color: 'blue'
    },
    {
      title: 'Recetados',
      value: recetados.length,
      subtitle: 'Pendientes de farmacia',
      color: 'yellow'
    },
    {
      title: 'Asignados',
      value: asignados.length,
      subtitle: 'En tratamiento',
      color: 'purple'
    },
    {
      title: 'Reclamados',
      value: reclamados.length,
      subtitle: 'Ya obtenidos',
      color: 'green'
    }
  ];

  const createColumns = (showActions = false) => [
    { 
      key: 'name', 
      label: 'Medicamento', 
      render: (value) => <strong>{value}</strong>
    },
    { 
      key: 'category', 
      label: 'Categoría', 
      render: (value) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          {value}
        </span>
      )
    },
    { key: 'dosage', label: 'Dosificación' },
    { key: 'doctor', label: 'Médico' },
    { key: 'prescribedDate', label: 'Fecha Receta', render: (value) => formatDate(value) },
    ...(showActions ? [{
      key: 'actions',
      label: 'Acciones',
      render: (_, row) => (
        <button
          onClick={() => handleClaimMedication(row.id)}
          className="btn btn-primary text-xs"
        >
          Reclamar
        </button>
      )
    }] : [{
      key: 'status',
      label: 'Estado',
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          {getStatusText(value)}
        </span>
      )
    }])
  ];

  const getStatusText = (status) => {
    const statusTexts = {
      'disponible': 'Disponible',
      'recetado': 'Recetado',
      'asignado': 'Asignado',
      'reclamado': 'Reclamado'
    };
    return statusTexts[status] || status;
  };

  const handleClaimMedication = (medicationId) => {
    if (window.confirm('¿Estás seguro de que quieres reclamar este medicamento?')) {
      claimMedication(medicationId);
      alert('Medicamento reclamado exitosamente. Ya puedes recogerlo en farmacia.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="card">
        <input
          type="text"
          placeholder="Buscar medicamentos por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Medicamentos Disponibles */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">💊 Medicamentos Disponibles</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Listos para reclamar en farmacia
          </span>
        </div>
        <Table
          columns={createColumns(true)}
          data={filterMedications(disponibles)}
          emptyMessage="No tienes medicamentos disponibles para reclamar."
        />
      </div>

      {/* Medicamentos Recetados */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">📋 Medicamentos Recetados</h2>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            Pendientes de preparación en farmacia
          </span>
        </div>
        <Table
          columns={createColumns()}
          data={filterMedications(recetados)}
          emptyMessage="No tienes medicamentos recetados pendientes."
        />
      </div>

      {/* Medicamentos Asignados */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">🏥 Medicamentos Asignados</h2>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            En tratamiento continuo
          </span>
        </div>
        <Table
          columns={createColumns()}
          data={filterMedications(asignados)}
          emptyMessage="No tienes medicamentos asignados actualmente."
        />
      </div>

      {/* Historial de Medicamentos Reclamados */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">✅ Historial - Medicamentos Reclamados</h2>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Ya obtenidos
          </span>
        </div>
        <Table
          columns={createColumns()}
          data={filterMedications(reclamados)}
          emptyMessage="No has reclamado medicamentos aún."
        />
      </div>
    </div>
  );
}

export default Medications;