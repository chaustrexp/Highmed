import React, { useState } from 'react';

function TermsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('terms');

  if (!isOpen) return null;

  const termsContent = {
    terms: {
      title: 'Términos y Condiciones',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">1. Aceptación de los Términos</h3>
            <p className="text-medical-700 leading-relaxed">
              Al utilizar los servicios de HighMed, usted acepta estar sujeto a estos términos y condiciones. 
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">2. Servicios Médicos</h3>
            <p className="text-medical-700 leading-relaxed mb-3">
              HighMed proporciona una plataforma digital para la gestión de citas médicas y servicios de salud. 
              Nuestros servicios incluyen:
            </p>
            <ul className="list-disc list-inside text-medical-700 space-y-1 ml-4">
              <li>Programación y gestión de citas médicas</li>
              <li>Acceso a recetas y medicamentos</li>
              <li>Consultas de telemedicina</li>
              <li>Programas de bienestar y prevención</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">3. Responsabilidades del Usuario</h3>
            <p className="text-medical-700 leading-relaxed mb-3">
              Como usuario de HighMed, usted se compromete a:
            </p>
            <ul className="list-disc list-inside text-medical-700 space-y-1 ml-4">
              <li>Proporcionar información precisa y actualizada</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso</li>
              <li>Utilizar los servicios de manera responsable y ética</li>
              <li>Cumplir con las citas programadas o cancelarlas con anticipación</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">4. Privacidad y Confidencialidad</h3>
            <p className="text-medical-700 leading-relaxed">
              Nos comprometemos a proteger su información médica personal de acuerdo con las leyes de 
              privacidad aplicables. Su información será utilizada únicamente para proporcionar 
              servicios médicos y mejorar la calidad de atención.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">5. Limitación de Responsabilidad</h3>
            <p className="text-medical-700 leading-relaxed">
              HighMed no será responsable por daños indirectos, incidentales o consecuentes que 
              puedan surgir del uso de nuestros servicios. Nuestros servicios se proporcionan 
              "tal como están" sin garantías expresas o implícitas.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">6. Modificaciones</h3>
            <p className="text-medical-700 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Las modificaciones entrarán en vigor inmediatamente después de su publicación 
              en nuestra plataforma.
            </p>
          </section>
        </div>
      )
    },
    privacy: {
      title: 'Política de Privacidad',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Recopilación de Información</h3>
            <p className="text-medical-700 leading-relaxed mb-3">
              Recopilamos información que usted nos proporciona directamente, incluyendo:
            </p>
            <ul className="list-disc list-inside text-medical-700 space-y-1 ml-4">
              <li>Información personal (nombre, dirección, teléfono, email)</li>
              <li>Información médica (historial, síntomas, medicamentos)</li>
              <li>Información de citas y consultas</li>
              <li>Preferencias de comunicación</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Uso de la Información</h3>
            <p className="text-medical-700 leading-relaxed mb-3">
              Utilizamos su información para:
            </p>
            <ul className="list-disc list-inside text-medical-700 space-y-1 ml-4">
              <li>Proporcionar servicios médicos y de atención sanitaria</li>
              <li>Programar y gestionar citas</li>
              <li>Comunicarnos con usted sobre su atención médica</li>
              <li>Mejorar nuestros servicios y experiencia del usuario</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Protección de Datos</h3>
            <p className="text-medical-700 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para 
              proteger su información personal contra acceso no autorizado, alteración, 
              divulgación o destrucción.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Compartir Información</h3>
            <p className="text-medical-700 leading-relaxed">
              No vendemos, alquilamos o compartimos su información personal con terceros, 
              excepto cuando sea necesario para proporcionar servicios médicos o cuando 
              la ley lo requiera.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Sus Derechos</h3>
            <p className="text-medical-700 leading-relaxed mb-3">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-medical-700 space-y-1 ml-4">
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Limitar el procesamiento de su información</li>
            </ul>
          </section>
        </div>
      )
    },
    benefits: {
      title: 'Términos de Beneficios',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Elegibilidad para Beneficios</h3>
            <p className="text-medical-700 leading-relaxed mb-3">
              Los beneficios de HighMed están disponibles para todos los usuarios registrados. 
              La elegibilidad específica puede variar según:
            </p>
            <ul className="list-disc list-inside text-medical-700 space-y-1 ml-4">
              <li>Tipo de membresía o plan contratado</li>
              <li>Duración de la membresía</li>
              <li>Cumplimiento de requisitos específicos</li>
              <li>Disponibilidad geográfica</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Beneficios Incluidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-health-50 border border-health-200 rounded-lg p-4">
                <h4 className="font-semibold text-health-800 mb-2">🏥 Atención Prioritaria</h4>
                <p className="text-sm text-health-700">Acceso preferencial a citas y reducción de tiempos de espera</p>
              </div>
              <div className="bg-health-50 border border-health-200 rounded-lg p-4">
                <h4 className="font-semibold text-health-800 mb-2">💊 Medicamentos Subsidiados</h4>
                <p className="text-sm text-health-700">Descuentos especiales y cobertura en medicamentos</p>
              </div>
              <div className="bg-health-50 border border-health-200 rounded-lg p-4">
                <h4 className="font-semibold text-health-800 mb-2">🔬 Exámenes Gratuitos</h4>
                <p className="text-sm text-health-700">Laboratorios clínicos sin costo adicional</p>
              </div>
              <div className="bg-health-50 border border-health-200 rounded-lg p-4">
                <h4 className="font-semibold text-health-800 mb-2">👨‍⚕️ Telemedicina 24/7</h4>
                <p className="text-sm text-health-700">Consultas médicas virtuales disponibles</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Limitaciones y Exclusiones</h3>
            <p className="text-medical-700 leading-relaxed mb-3">
              Los siguientes servicios pueden tener limitaciones o no estar cubiertos:
            </p>
            <ul className="list-disc list-inside text-medical-700 space-y-1 ml-4">
              <li>Procedimientos cosméticos o estéticos</li>
              <li>Tratamientos experimentales no aprobados</li>
              <li>Servicios fuera de la red de proveedores</li>
              <li>Emergencias médicas fuera del área de cobertura</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-medical-900 mb-3">Modificaciones de Beneficios</h3>
            <p className="text-medical-700 leading-relaxed">
              HighMed se reserva el derecho de modificar, suspender o discontinuar beneficios 
              con previo aviso de 30 días. Los cambios no afectarán servicios ya programados 
              o en proceso.
            </p>
          </section>
        </div>
      )
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh]">
          <div className="bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-health-500 to-health-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    {termsContent[activeTab].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">HighMed - Documentos Legales</h3>
                    <p className="text-health-100 text-sm">by HIGHSOFT</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-health-100 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {Object.entries(termsContent).map(([key, content]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === key
                        ? 'border-health-500 text-health-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 ${activeTab === key ? 'text-health-600' : 'text-gray-400'}`}>
                        {content.icon}
                      </div>
                      <span>{content.title}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-96 overflow-y-auto modal-scroll">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-medical-900 mb-2">
                  {termsContent[activeTab].title}
                </h2>
                <p className="text-medical-500">
                  Última actualización: {new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              {termsContent[activeTab].content}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  © 2026 HighMed by HIGHSOFT. Todos los derechos reservados.
                </div>
                <button
                  onClick={onClose}
                  className="btn btn-primary"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;