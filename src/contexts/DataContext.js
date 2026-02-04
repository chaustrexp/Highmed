import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);

  const availableMedications = [
    { name: 'Ibuprofeno 400mg', category: 'Analgésico', dosage: '1 tableta cada 8 horas' },
    { name: 'Paracetamol 500mg', category: 'Analgésico', dosage: '1 tableta cada 6 horas' },
    { name: 'Amoxicilina 500mg', category: 'Antibiótico', dosage: '1 cápsula cada 12 horas' },
    { name: 'Azitromicina 250mg', category: 'Antibiótico', dosage: '1 tableta al día' },
    { name: 'Loratadina 10mg', category: 'Antihistamínico', dosage: '1 tableta al día' },
    { name: 'Cetirizina 10mg', category: 'Antihistamínico', dosage: '1 tableta al día' },
    { name: 'Omeprazol 20mg', category: 'Protector gástrico', dosage: '1 cápsula antes del desayuno' },
    { name: 'Ranitidina 150mg', category: 'Protector gástrico', dosage: '1 tableta cada 12 horas' },
    { name: 'Metformina 850mg', category: 'Antidiabético', dosage: '1 tableta con cada comida' },
    { name: 'Glibenclamida 5mg', category: 'Antidiabético', dosage: '1 tableta antes del desayuno' },
    { name: 'Atorvastatina 20mg', category: 'Hipolipemiante', dosage: '1 tableta por la noche' },
    { name: 'Simvastatina 40mg', category: 'Hipolipemiante', dosage: '1 tableta por la noche' },
    { name: 'Enalapril 10mg', category: 'Antihipertensivo', dosage: '1 tableta cada 12 horas' },
    { name: 'Losartán 50mg', category: 'Antihipertensivo', dosage: '1 tableta al día' },
    { name: 'Salbutamol 100mcg', category: 'Broncodilatador', dosage: '2 inhalaciones cada 6 horas' }
  ];

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    // Initialize appointments
    let storedAppointments = localStorage.getItem('highmed_appointments');
    if (!storedAppointments) {
      const defaultAppointments = [
        {
          id: 1,
          userId: 2,
          specialty: 'medicina-general',
          date: '2026-02-10',
          time: '09:00',
          status: 'pendiente',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          userId: 2,
          specialty: 'cardiologia',
          date: '2026-02-15',
          time: '14:00',
          status: 'aprobada',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('highmed_appointments', JSON.stringify(defaultAppointments));
      setAppointments(defaultAppointments);
    } else {
      setAppointments(JSON.parse(storedAppointments));
    }

    // Initialize medications
    let storedMedications = localStorage.getItem('highmed_medications');
    if (!storedMedications) {
      const defaultMedications = [
        {
          id: 1,
          userId: 2,
          name: 'Ibuprofeno 400mg',
          dosage: '1 tableta cada 8 horas',
          status: 'disponible',
          prescribedDate: '2026-02-01',
          doctor: 'Dr. García',
          category: 'Analgésico'
        },
        {
          id: 2,
          userId: 2,
          name: 'Amoxicilina 500mg',
          dosage: '1 cápsula cada 12 horas',
          status: 'reclamado',
          prescribedDate: '2026-01-28',
          doctor: 'Dr. Martínez',
          category: 'Antibiótico'
        },
        {
          id: 3,
          userId: 2,
          name: 'Loratadina 10mg',
          dosage: '1 tableta al día',
          status: 'disponible',
          prescribedDate: '2026-02-03',
          doctor: 'Dr. López',
          category: 'Antihistamínico'
        },
        {
          id: 4,
          userId: 2,
          name: 'Omeprazol 20mg',
          dosage: '1 cápsula antes del desayuno',
          status: 'recetado',
          prescribedDate: '2026-02-05',
          doctor: 'Dr. Rodríguez',
          category: 'Protector gástrico'
        },
        {
          id: 5,
          userId: 2,
          name: 'Metformina 850mg',
          dosage: '1 tableta con cada comida',
          status: 'asignado',
          prescribedDate: '2026-01-30',
          doctor: 'Dr. Fernández',
          category: 'Antidiabético'
        },
        {
          id: 6,
          userId: 2,
          name: 'Atorvastatina 20mg',
          dosage: '1 tableta por la noche',
          status: 'asignado',
          prescribedDate: '2026-01-25',
          doctor: 'Dr. Morales',
          category: 'Hipolipemiante'
        }
      ];
      localStorage.setItem('highmed_medications', JSON.stringify(defaultMedications));
      setMedications(defaultMedications);
    } else {
      setMedications(JSON.parse(storedMedications));
    }
  };

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('highmed_appointments', JSON.stringify(updatedAppointments));
    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('highmed_appointments', JSON.stringify(updatedAppointments));
  };

  const addMedications = (medicationsData) => {
    const newMedications = medicationsData.map(med => ({
      id: Date.now() + Math.random(),
      ...med,
      prescribedDate: new Date().toISOString().split('T')[0]
    }));

    const updatedMedications = [...medications, ...newMedications];
    setMedications(updatedMedications);
    localStorage.setItem('highmed_medications', JSON.stringify(updatedMedications));
    return newMedications;
  };

  const claimMedication = (medicationId) => {
    const updatedMedications = medications.map(med =>
      med.id === medicationId ? { ...med, status: 'reclamado' } : med
    );
    setMedications(updatedMedications);
    localStorage.setItem('highmed_medications', JSON.stringify(updatedMedications));
  };

  const getUserName = (userId) => {
    const users = JSON.parse(localStorage.getItem('highmed_users') || '[]');
    const user = users.find(u => u.id === userId);
    return user ? user.name : `Usuario #${userId}`;
  };

  const formatSpecialty = (specialty) => {
    const specialties = {
      'medicina-general': 'Medicina General',
      'cardiologia': 'Cardiología',
      'dermatologia': 'Dermatología',
      'neurologia': 'Neurología',
      'pediatria': 'Pediatría'
    };
    return specialties[specialty] || specialty;
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const value = {
    appointments,
    medications,
    availableMedications,
    addAppointment,
    updateAppointmentStatus,
    addMedications,
    claimMedication,
    getUserName,
    formatSpecialty,
    formatDate
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}