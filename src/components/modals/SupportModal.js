import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function SupportModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'media',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const categories = [
    { value: 'citas', label: 'Problemas con Citas' },
    { value: 'medicamentos', label: 'Medicamentos y Recetas' },
    { value: 'beneficios', label: 'Consultas sobre Beneficios' },
    { value: 'tecnico', label: 'Problemas Técnicos' },
    { value: 'facturacion', label: 'Facturación y Pagos' },
    { value: 'general', label: 'Consulta General' }
  ];

  const priorities = [
    { value: 'baja', label: 'Baja', color: 'text-green-600' },
    { value: 'media', label: 'Media', color: 'text-yellow-600' },
    { value: 'alta', label: 'Alta', color: 'text-red-600' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.subject || !formData.category || !formData.message) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }

      // Simular envío de ticket de soporte
      const ticketId = `HM-${Date.now().toString().slice(-6)}`;
      
      // Aquí normalmente enviarías los datos a un servidor
      console.log('Ticket de soporte creado:', {
        ticketId,
        userId: user.userId,
        userName: user.name,
        userEmail: user.email,
        ...formData,
        createdAt: new Date().toISOString()
      });

      alert(`¡Ticket de soporte creado exitosamente!

📋 Número de ticket: ${ticketId}
📧 Recibirás una respuesta en tu correo electrónico
⏱️ Tiempo estimado de respuesta: 24-48 horas

Nuestro equipo de soporte se pondrá en contacto contigo pronto.`);

      onClose();
      setFormData({ subject: '', category: '', priority: 'media', message: '' });
    } catch (error) {
      alert('Error al enviar el ticket de soporte. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="w-full">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-health-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-medical-900">Contactar Soporte</h3>
                    <p className="text-medical-500">Estamos aquí para ayudarte con cualquier consulta</p>
                  </div>
                </div>

                {/* User Info */}
                <div className="bg-health-50 border border-health-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-health-800">
                    <strong>Usuario:</strong> {user.name} ({user.email})
                  </p>
                  <p className="text-sm text-health-800">
                    <strong>Tipo:</strong> {user.role === 'usuario' ? 'Paciente' : 'Administrador'}
                  </p>
                </div>
                
                {/* Quick Help Section */}
                <div className="bg-gradient-to-r from-health-50 to-medical-50 border border-health-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-health-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Ayuda Rápida
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="font-medium text-health-800">📅 Problemas con Citas</p>
                      <p className="text-health-700 text-xs mt-1">Cancelaciones, reprogramaciones, confirmaciones</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="font-medium text-health-800">💊 Medicamentos</p>
                      <p className="text-health-700 text-xs mt-1">Recetas, disponibilidad, efectos secundarios</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="font-medium text-health-800">🔧 Problemas Técnicos</p>
                      <p className="text-health-700 text-xs mt-1">Login, navegación, errores del sistema</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="font-medium text-health-800">💳 Facturación</p>
                      <p className="text-health-700 text-xs mt-1">Pagos, seguros, reembolsos</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-medical-700 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Describe brevemente tu consulta"
                      required
                    />
                  </div>

                  {/* Category and Priority */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-medical-700 mb-2">
                        Categoría *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-medical-700 mb-2">
                        Prioridad
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        {priorities.map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-medical-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Describe detalladamente tu consulta o problema..."
                      required
                    />
                  </div>

                  {/* Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-2">Tiempos de respuesta estimados:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="bg-white/50 rounded-lg p-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="font-medium">Alta:</span>
                            </div>
                            <p className="text-xs mt-1">2-4 horas</p>
                          </div>
                          <div className="bg-white/50 rounded-lg p-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="font-medium">Media:</span>
                            </div>
                            <p className="text-xs mt-1">24-48 horas</p>
                          </div>
                          <div className="bg-white/50 rounded-lg p-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="font-medium">Baja:</span>
                            </div>
                            <p className="text-xs mt-1">3-5 días</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center btn btn-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar Ticket
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center btn btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SupportModal;