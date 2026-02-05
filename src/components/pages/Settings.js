import React, { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    medicationReminders: true,
    marketingEmails: false,
    language: 'es',
    theme: 'light',
    autoSave: true
  });

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const handleSelectChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    alert('Configuración guardada correctamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-health-500 to-health-600 rounded-2xl p-8 text-white shadow-medium">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Configuración</h1>
            <p className="text-health-100 text-lg">Personaliza tu experiencia en HighMed</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-white rounded-2xl shadow-soft border border-medical-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-medical-50 to-health-50 border-b border-medical-200">
          <h2 className="text-xl font-bold text-medical-900">Notificaciones</h2>
          <p className="text-sm text-medical-600 mt-1">Gestiona cómo y cuándo recibes notificaciones</p>
        </div>
        <div className="p-6 space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-health-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-medical-900">Notificaciones por Email</p>
                <p className="text-sm text-medical-500">Recibe actualizaciones por correo electrónico</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.emailNotifications ? 'bg-health-500' : 'bg-medical-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-medical-900">Notificaciones por SMS</p>
                <p className="text-sm text-medical-500">Recibe mensajes de texto importantes</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('smsNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.smsNotifications ? 'bg-health-500' : 'bg-medical-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Appointment Reminders */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-health-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-medical-900">Recordatorios de Citas</p>
                <p className="text-sm text-medical-500">Recibe recordatorios antes de tus citas</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('appointmentReminders')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.appointmentReminders ? 'bg-health-500' : 'bg-medical-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.appointmentReminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Medication Reminders */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-medical-900">Recordatorios de Medicamentos</p>
                <p className="text-sm text-medical-500">Recibe alertas para tomar tus medicamentos</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('medicationReminders')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.medicationReminders ? 'bg-health-500' : 'bg-medical-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.medicationReminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Marketing Emails */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-medical-900">Emails de Marketing</p>
                <p className="text-sm text-medical-500">Recibe ofertas y novedades</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('marketingEmails')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.marketingEmails ? 'bg-health-500' : 'bg-medical-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preferencias */}
      <div className="bg-white rounded-2xl shadow-soft border border-medical-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-medical-50 to-health-50 border-b border-medical-200">
          <h2 className="text-xl font-bold text-medical-900">Preferencias</h2>
          <p className="text-sm text-medical-600 mt-1">Personaliza la apariencia y comportamiento</p>
        </div>
        <div className="p-6 space-y-6">
          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-medical-700 mb-2">
              Idioma
            </label>
            <select
              name="language"
              value={settings.language}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-medical-700 mb-2">
              Tema
            </label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>

          {/* Auto Save */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-medical-900">Guardado Automático</p>
              <p className="text-sm text-medical-500">Guarda cambios automáticamente</p>
            </div>
            <button
              onClick={() => handleToggle('autoSave')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.autoSave ? 'bg-health-500' : 'bg-medical-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-health-500 to-health-600 text-white rounded-xl font-semibold hover:from-health-600 hover:to-health-700 transition-all duration-200 shadow-soft hover:shadow-medium"
        >
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}

export default Settings;
