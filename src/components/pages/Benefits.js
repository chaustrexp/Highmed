import React, { useState } from 'react';
import SupportModal from '../modals/SupportModal';
import TermsModal from '../modals/TermsModal';

function Benefits() {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const benefits = [
    {
      icon: '🏥',
      title: 'Atención Prioritaria',
      description: 'Acceso preferencial a citas médicas y especialistas. Reducción de tiempos de espera para consultas urgentes.'
    },
    {
      icon: '💊',
      title: 'Medicamentos Subsidiados',
      description: 'Descuentos especiales en medicamentos recetados. Cobertura del 80% en medicamentos de alto costo.'
    },
    {
      icon: '🔬',
      title: 'Exámenes Gratuitos',
      description: 'Laboratorios clínicos sin costo adicional. Incluye análisis de sangre, orina y exámenes básicos.'
    },
    {
      icon: '👨‍⚕️',
      title: 'Telemedicina 24/7',
      description: 'Consultas médicas virtuales disponibles las 24 horas. Atención inmediata para consultas no urgentes.'
    },
    {
      icon: '🏃‍♂️',
      title: 'Programas de Bienestar',
      description: 'Acceso a programas de ejercicio, nutrición y bienestar mental. Talleres gratuitos de prevención.'
    },
    {
      icon: '👶',
      title: 'Atención Familiar',
      description: 'Cobertura extendida para familiares directos. Programas especiales de pediatría y geriatría.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Beneficios Exclusivos</h1>
        <p className="text-lg text-gray-600">
          Disfruta de todos los beneficios que tenemos para ti como usuario de HighMed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="card border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{benefit.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="card bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Necesitas más información?
          </h2>
          <p className="text-blue-700 mb-6">
            Nuestro equipo de atención al cliente está disponible para resolver todas tus dudas
            sobre los beneficios y servicios disponibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn btn-primary"
              onClick={() => setShowSupportModal(true)}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Contactar Soporte
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowTermsModal(true)}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ver Términos y Condiciones
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSupportModal && (
        <SupportModal
          isOpen={showSupportModal}
          onClose={() => setShowSupportModal(false)}
        />
      )}

      {showTermsModal && (
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        />
      )}
    </div>
  );
}

export default Benefits;