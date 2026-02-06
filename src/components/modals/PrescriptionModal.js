import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';

function PrescriptionModal({ isOpen, onClose, appointment, doctorName }) {
  const [medications, setMedications] = useState([{
    id: Date.now(),
    name: '',
    category: '',
    dosage: '',
    status: 'recetado'
  }]);
  const [loading, setLoading] = useState(false);

  const { availableMedications, addMedications, updateAppointmentStatus, getUserName, formatSpecialty, formatDate } = useData();

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;

    // Auto-fill category and dosage when medication is selected
    if (field === 'name' && value) {
      const selectedMed = availableMedications.find(med => med.name === value);
      if (selectedMed) {
        updatedMedications[index].category = selectedMed.category;
        updatedMedications[index].dosage = selectedMed.dosage;
      }
    }

    setMedications(updatedMedications);
  };

  const addMedicationRow = () => {
    setMedications([...medications, {
      id: Date.now() + Math.random(),
      name: '',
      category: '',
      dosage: '',
      status: 'recetado'
    }]);
  };

  const removeMedicationRow = (index) => {
    if (medications.length > 1) {
      const updatedMedications = medications.filter((_, i) => i !== index);
      setMedications(updatedMedications);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate medications
      const validMedications = medications.filter(med => med.name && med.dosage);
      
      if (validMedications.length === 0) {
        alert('Por favor agrega al menos un medicamento válido');
        return;
      }

      // Prepare medication data
      const medicationData = validMedications.map(med => ({
        userId: appointment.userId,
        name: med.name,
        dosage: med.dosage,
        status: med.status,
        doctor: doctorName,
        category: med.category
      }));

      // Add medications
      addMedications(medicationData);

      // Approve appointment
      updateAppointmentStatus(appointment.id, 'aprobada');

      alert(`¡Proceso completado exitosamente!
      
✅ Cita aprobada para ${getUserName(appointment.userId)}
💊 ${validMedications.length} medicamento(s) recetado(s)
📋 Los medicamentos estarán disponibles en farmacia

El paciente recibirá una notificación automática.`);
      onClose();
    } catch (error) {
      alert('Error al procesar la prescripción');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recetar Medicamentos
                </h3>
                
                {/* Patient Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Paciente:</strong> {getUserName(appointment.userId)}
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Cita:</strong> {formatSpecialty(appointment.specialty)} - {formatDate(appointment.date)} {appointment.time}
                  </p>
                </div>

                {/* Medications Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Seleccionar Medicamentos</h4>
                    <button
                      type="button"
                      onClick={addMedicationRow}
                      className="btn btn-secondary text-sm"
                    >
                      + Agregar Medicamento
                    </button>
                  </div>

                  {medications.map((medication, index) => (
                    <div key={medication.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medicamento
                          </label>
                          <select
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                            className="form-select text-sm"
                            required
                          >
                            <option value="">Seleccionar medicamento</option>
                            {availableMedications.map((med) => (
                              <option key={med.name} value={med.name}>
                                {med.name} ({med.category})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dosificación
                          </label>
                          <input
                            type="text"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                            placeholder="Ej: 1 tableta cada 8 horas"
                            className="form-input text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado
                          </label>
                          <select
                            value={medication.status}
                            onChange={(e) => handleMedicationChange(index, 'status', e.target.value)}
                            className="form-select text-sm"
                            required
                          >
                            <option value="recetado">Recetado</option>
                            <option value="disponible">Disponible</option>
                            <option value="asignado">Asignado</option>
                          </select>
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeMedicationRow(index)}
                            disabled={medications.length === 1}
                            className="btn btn-danger text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center btn btn-success sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Recetar y Aprobar Cita'}
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

export default PrescriptionModal;