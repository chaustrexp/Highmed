import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import Table from '../common/Table';
import AppointmentModal from '../modals/AppointmentModal';
import MedicalCertificate from '../MedicalCertificate';
import html2canvas from 'html2canvas';

function MyAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);
  const certificateRef = useRef(null);
  const { user } = useAuth();
  const { appointments, formatSpecialty, formatDate } = useData();

  const userAppointments = appointments.filter(apt => apt.userId === user.userId);

  const handleDownloadCertificate = async () => {
    if (userAppointments.length === 0) {
      alert('No tienes citas registradas para generar un certificado.');
      return;
    }

    setIsGeneratingCertificate(true);

    try {
      // Esperar un momento para que el componente se renderice
      await new Promise(resolve => setTimeout(resolve, 100));

      const certificateElement = certificateRef.current;
      
      if (!certificateElement) {
        throw new Error('No se pudo encontrar el elemento del certificado');
      }

      // Generar el canvas con alta calidad
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Mayor resolución
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      // Convertir a PNG y descargar
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Certificado_Medico_${user.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
      link.href = image;
      link.click();

      // Mensaje de éxito
      alert('¡Certificado descargado exitosamente!');
    } catch (error) {
      console.error('Error al generar el certificado:', error);
      alert('Hubo un error al generar el certificado. Por favor, intenta de nuevo.');
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Mis Citas</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadCertificate}
              disabled={isGeneratingCertificate || userAppointments.length === 0}
              className="btn bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              title={userAppointments.length === 0 ? 'No hay citas para generar certificado' : 'Descargar certificado médico'}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              {isGeneratingCertificate ? 'Generando...' : 'Descargar Certificado'}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
            >
              Solicitar Cita
            </button>
          </div>
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

      {/* Certificado oculto para generación */}
      <div style={{ position: 'absolute', left: '-9999px', top: '0' }}>
        {isGeneratingCertificate && (
          <div ref={certificateRef}>
            <MedicalCertificate
              patient={user}
              appointments={userAppointments}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;