import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';

function Notifications() {
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [filter, setFilter] = useState('all'); // all, unread, read

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'cita':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'medicamento':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'beneficio':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'cita':
        return 'from-health-500 to-health-600';
      case 'medicamento':
        return 'from-accent-500 to-accent-600';
      case 'beneficio':
        return 'from-health-400 to-health-500';
      default:
        return 'from-medical-400 to-medical-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-health-500 to-health-600 rounded-2xl p-8 text-white shadow-medium">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notificaciones</h1>
            <p className="text-health-100 text-lg">
              {unreadCount > 0 ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? 'es' : ''} sin leer` : 'No tienes notificaciones sin leer'}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-2xl shadow-soft border border-medical-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Filters */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-health-500 text-white shadow-soft'
                  : 'bg-medical-100 text-medical-600 hover:bg-medical-200'
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === 'unread'
                  ? 'bg-health-500 text-white shadow-soft'
                  : 'bg-medical-100 text-medical-600 hover:bg-medical-200'
              }`}
            >
              Sin leer ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === 'read'
                  ? 'bg-health-500 text-white shadow-soft'
                  : 'bg-medical-100 text-medical-600 hover:bg-medical-200'
              }`}
            >
              Leídas ({notifications.length - unreadCount})
            </button>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-health-100 text-health-700 rounded-xl font-medium hover:bg-health-200 transition-colors duration-200"
              >
                Marcar todas como leídas
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors duration-200"
              >
                Limpiar todas
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft border border-medical-200 p-12 text-center">
            <div className="w-20 h-20 bg-medical-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-medical-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-medical-900 mb-2">No hay notificaciones</h3>
            <p className="text-medical-500">
              {filter === 'unread' && 'No tienes notificaciones sin leer'}
              {filter === 'read' && 'No tienes notificaciones leídas'}
              {filter === 'all' && 'No tienes notificaciones en este momento'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl shadow-soft border transition-all duration-200 hover:shadow-medium ${
                notification.read ? 'border-medical-200' : 'border-health-300 bg-health-50 bg-opacity-30'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${getNotificationColor(notification.type)} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-soft`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-medical-900">{notification.title}</h3>
                      {!notification.read && (
                        <span className="ml-2 w-2.5 h-2.5 bg-health-500 rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-medical-600 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-medical-400">{notification.time}</span>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-health-600 hover:text-health-700 font-medium"
                        >
                          Marcar como leída
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
