import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useData } from './DataContext';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const { user } = useAuth();
  const { appointments, medications } = useData();

  // Generar notificaciones automáticamente basadas en los datos
  useEffect(() => {
    if (!user || initialized) return;

    const generateNotifications = () => {
      const newNotifications = [];
      const now = new Date();

      if (user.role === 'usuario') {
        // Notificaciones para pacientes
        
        // Citas pendientes
        const pendingAppointments = appointments.filter(
          apt => apt.userId === user.userId && apt.status === 'pendiente'
        );
        
        if (pendingAppointments.length > 0) {
          newNotifications.push({
            id: 'pending-appointments',
            type: 'info',
            title: 'Citas Pendientes',
            message: `Tienes ${pendingAppointments.length} cita${pendingAppointments.length > 1 ? 's' : ''} pendiente${pendingAppointments.length > 1 ? 's' : ''} de aprobación`,
            timestamp: now.toISOString(),
            read: false,
            icon: 'clock'
          });
        }

        // Citas aprobadas próximas (próximos 7 días)
        const upcomingAppointments = appointments.filter(apt => {
          if (apt.userId !== user.userId || apt.status !== 'aprobada') return false;
          const appointmentDate = new Date(apt.date);
          const diffTime = appointmentDate - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays <= 7;
        });

        upcomingAppointments.forEach(apt => {
          const appointmentDate = new Date(apt.date);
          const diffDays = Math.ceil((appointmentDate - now) / (1000 * 60 * 60 * 24));
          
          newNotifications.push({
            id: `upcoming-${apt.id}`,
            type: 'success',
            title: 'Cita Próxima',
            message: `Tienes una cita de ${formatSpecialty(apt.specialty)} ${diffDays === 0 ? 'hoy' : `en ${diffDays} día${diffDays > 1 ? 's' : ''}`} a las ${apt.time}`,
            timestamp: now.toISOString(),
            read: false,
            icon: 'calendar'
          });
        });

        // Medicamentos disponibles
        const availableMeds = medications.filter(
          med => med.userId === user.userId && med.status === 'disponible'
        );
        
        if (availableMeds.length > 0) {
          newNotifications.push({
            id: 'available-medications',
            type: 'warning',
            title: 'Medicamentos Listos',
            message: `Tienes ${availableMeds.length} medicamento${availableMeds.length > 1 ? 's' : ''} listo${availableMeds.length > 1 ? 's' : ''} para recoger en farmacia`,
            timestamp: now.toISOString(),
            read: false,
            icon: 'pill'
          });
        }

      } else {
        // Notificaciones para administradores
        
        // Citas pendientes de revisión
        const pendingReview = appointments.filter(apt => apt.status === 'pendiente');
        
        if (pendingReview.length > 0) {
          newNotifications.push({
            id: 'admin-pending-review',
            type: 'warning',
            title: 'Citas por Revisar',
            message: `Hay ${pendingReview.length} cita${pendingReview.length > 1 ? 's' : ''} pendiente${pendingReview.length > 1 ? 's' : ''} de revisión médica`,
            timestamp: now.toISOString(),
            read: false,
            icon: 'clipboard'
          });
        }

        // Citas de hoy
        const todayAppointments = appointments.filter(apt => {
          const appointmentDate = new Date(apt.date);
          const today = new Date();
          return appointmentDate.toDateString() === today.toDateString() && apt.status === 'aprobada';
        });

        if (todayAppointments.length > 0) {
          newNotifications.push({
            id: 'admin-today-appointments',
            type: 'info',
            title: 'Citas de Hoy',
            message: `Hay ${todayAppointments.length} cita${todayAppointments.length > 1 ? 's' : ''} programada${todayAppointments.length > 1 ? 's' : ''} para hoy`,
            timestamp: now.toISOString(),
            read: false,
            icon: 'calendar'
          });
        }

        // Medicamentos recetados recientemente
        const recentMeds = medications.filter(med => {
          const prescribedDate = new Date(med.prescribedDate);
          const diffTime = now - prescribedDate;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 1 && med.status === 'recetado';
        });

        if (recentMeds.length > 0) {
          newNotifications.push({
            id: 'admin-recent-prescriptions',
            type: 'success',
            title: 'Recetas Recientes',
            message: `Se han recetado ${recentMeds.length} medicamento${recentMeds.length > 1 ? 's' : ''} en las últimas 24 horas`,
            timestamp: now.toISOString(),
            read: false,
            icon: 'pill'
          });
        }
      }

      // Agregar notificación de bienvenida si no hay otras
      if (newNotifications.length === 0) {
        newNotifications.push({
          id: 'welcome',
          type: 'info',
          title: '¡Bienvenido!',
          message: `Hola ${user.name.split(' ')[0]}, bienvenido al sistema HighMed`,
          timestamp: now.toISOString(),
          read: false,
          icon: 'heart'
        });
      }

      return newNotifications;
    };

    const newNotifications = generateNotifications();
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
    setInitialized(true);

  }, [user, appointments, medications, initialized]); // Agregué initialized a las dependencias

  // Reinicializar cuando cambie el usuario
  useEffect(() => {
    setInitialized(false);
    setNotifications([]);
    setUnreadCount(0);
  }, [user?.userId]);

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

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}