import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    birthDate: '',
    bloodType: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    alert('Perfil actualizado correctamente');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-health-500 to-health-600 rounded-2xl p-8 text-white shadow-medium">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-4xl font-bold backdrop-blur-sm shadow-soft">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
            <p className="text-health-100 text-lg">{user?.email}</p>
            <div className="mt-3">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
                user?.role === 'administrador' 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'bg-white bg-opacity-20 text-white'
              }`}>
                {user?.role === 'administrador' ? 'Administrador' : 'Paciente'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 bg-white text-health-600 rounded-xl font-semibold hover:bg-health-50 transition-colors duration-200 shadow-soft"
          >
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>
      </div>

      {/* Información Personal */}
      <div className="bg-white rounded-2xl shadow-soft border border-medical-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-medical-50 to-health-50 border-b border-medical-200">
          <h2 className="text-xl font-bold text-medical-900">Información Personal</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Completo */}
            <div>
              <label className="block text-sm font-semibold text-medical-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-medical-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="juan@email.com"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-semibold text-medical-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="+57 300 123 4567"
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block text-sm font-semibold text-medical-700 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            {/* Dirección */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-medical-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="Calle 123 #45-67, Bogotá"
              />
            </div>

            {/* Tipo de Sangre */}
            {user?.role === 'usuario' && (
              <div>
                <label className="block text-sm font-semibold text-medical-700 mb-2">
                  Tipo de Sangre
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-select"
                >
                  <option value="">Seleccionar</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 bg-medical-100 text-medical-700 rounded-xl font-semibold hover:bg-medical-200 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-gradient-to-r from-health-500 to-health-600 text-white rounded-xl font-semibold hover:from-health-600 hover:to-health-700 transition-all duration-200 shadow-soft"
              >
                Guardar Cambios
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas (solo para pacientes) */}
      {user?.role === 'usuario' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-soft border border-medical-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-health-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-medical-900">12</p>
                <p className="text-sm text-medical-500">Citas Totales</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-medical-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-medical-900">5</p>
                <p className="text-sm text-medical-500">Recetas Activas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-medical-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-health-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-medical-900">8</p>
                <p className="text-sm text-medical-500">Beneficios Usados</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
