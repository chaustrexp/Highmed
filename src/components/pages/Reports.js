import React from 'react';
import { useData } from '../../contexts/DataContext';
import StatCard from '../common/StatCard';
import Table from '../common/Table';

function Reports() {
  const { appointments, medications, formatSpecialty } = useData();

  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'pendiente').length;
  const approvedAppointments = appointments.filter(apt => apt.status === 'aprobada').length;
  const rejectedAppointments = appointments.filter(apt => apt.status === 'rechazada').length;

  const stats = [
    {
      title: 'Total de Citas',
      value: totalAppointments,
      subtitle: 'En el sistema',
      color: 'blue'
    },
    {
      title: 'Citas Pendientes',
      value: pendingAppointments,
      subtitle: `${totalAppointments > 0 ? ((pendingAppointments/totalAppointments)*100).toFixed(1) : 0}% del total`,
      color: 'yellow'
    },
    {
      title: 'Citas Aprobadas',
      value: approvedAppointments,
      subtitle: `${totalAppointments > 0 ? ((approvedAppointments/totalAppointments)*100).toFixed(1) : 0}% del total`,
      color: 'green'
    },
    {
      title: 'Citas Rechazadas',
      value: rejectedAppointments,
      subtitle: `${totalAppointments > 0 ? ((rejectedAppointments/totalAppointments)*100).toFixed(1) : 0}% del total`,
      color: 'red'
    }
  ];

  // Generate specialty report
  const generateSpecialtyReport = () => {
    const specialties = {};
    
    appointments.forEach(apt => {
      if (!specialties[apt.specialty]) {
        specialties[apt.specialty] = {
          total: 0,
          pendiente: 0,
          aprobada: 0,
          rechazada: 0
        };
      }
      
      specialties[apt.specialty].total++;
      specialties[apt.specialty][apt.status]++;
    });
    
    return Object.entries(specialties).map(([specialty, stats]) => ({
      specialty: formatSpecialty(specialty),
      total: stats.total,
      pendiente: stats.pendiente,
      aprobada: stats.aprobada,
      rechazada: stats.rechazada
    }));
  };

  const specialtyColumns = [
    { key: 'specialty', label: 'Especialidad' },
    { key: 'total', label: 'Total Citas' },
    { key: 'pendiente', label: 'Pendientes' },
    { key: 'aprobada', label: 'Aprobadas' },
    { key: 'rechazada', label: 'Rechazadas' }
  ];

  // Medication statistics
  const medicationStats = {
    total: medications.length,
    disponible: medications.filter(med => med.status === 'disponible').length,
    recetado: medications.filter(med => med.status === 'recetado').length,
    asignado: medications.filter(med => med.status === 'asignado').length,
    reclamado: medications.filter(med => med.status === 'reclamado').length
  };

  const medicationStatsCards = [
    {
      title: 'Total Medicamentos',
      value: medicationStats.total,
      subtitle: 'En el sistema',
      color: 'blue'
    },
    {
      title: 'Disponibles',
      value: medicationStats.disponible,
      subtitle: 'Para reclamar',
      color: 'green'
    },
    {
      title: 'Recetados',
      value: medicationStats.recetado,
      subtitle: 'Pendientes',
      color: 'yellow'
    },
    {
      title: 'Asignados',
      value: medicationStats.asignado,
      subtitle: 'En tratamiento',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Appointment Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Estadísticas de Citas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Specialty Report */}
      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Reporte por Especialidad</h2>
          <p className="text-gray-600 mt-2">
            Distribución de citas por especialidad médica
          </p>
        </div>
        <Table
          columns={specialtyColumns}
          data={generateSpecialtyReport()}
          emptyMessage="No hay datos de especialidades disponibles"
        />
      </div>

      {/* Medication Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Estadísticas de Medicamentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicationStatsCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Resumen del Sistema</h3>
          <div className="space-y-2 text-blue-800">
            <p>• <strong>{appointments.length}</strong> citas registradas en total</p>
            <p>• <strong>{medications.length}</strong> medicamentos recetados</p>
            <p>• <strong>{Object.keys(generateSpecialtyReport()).length}</strong> especialidades activas</p>
            <p>• <strong>{((approvedAppointments / totalAppointments) * 100 || 0).toFixed(1)}%</strong> tasa de aprobación</p>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
          <h3 className="text-lg font-bold text-green-900 mb-4">Indicadores de Rendimiento</h3>
          <div className="space-y-2 text-green-800">
            <p>• <strong>{pendingAppointments}</strong> citas pendientes de revisión</p>
            <p>• <strong>{medicationStats.disponible}</strong> medicamentos listos para entrega</p>
            <p>• <strong>{medicationStats.reclamado}</strong> medicamentos ya reclamados</p>
            <p>• <strong>{medicationStats.asignado}</strong> tratamientos en curso</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;