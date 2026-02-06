/**
 * App.js
 * 
 * Componente principal de la aplicación HighMed.
 * 
 * Funcionalidades:
 * - Configuración de rutas de la aplicación
 * - Protección de rutas según autenticación
 * - Gestión de proveedores de contexto (Auth, IPS, Data, Notifications)
 * - Pantalla de carga inicial
 * 
 * Rutas:
 * - /auth: Página de autenticación (login/registro)
 * - /dashboard: Panel principal (requiere autenticación)
 * - /: Redirección a /auth
 * 
 * @author HighMed Development Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { IPSProvider } from './contexts/IPSContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import LoadingScreen from './components/LoadingScreen';

/**
 * Componente de ruta protegida
 * Solo permite acceso si el usuario está autenticado
 * Si no está autenticado, redirige a /auth
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componente hijo a renderizar si está autenticado
 * @returns {React.ReactElement} Componente hijo o redirección
 */
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
}

/**
 * Componente de ruta pública
 * Solo permite acceso si el usuario NO está autenticado
 * Si está autenticado, redirige a /dashboard
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componente hijo a renderizar si no está autenticado
 * @returns {React.ReactElement} Componente hijo o redirección
 */
function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
}

/**
 * Componente principal de la aplicación
 * Configura los proveedores de contexto y las rutas
 * 
 * @returns {React.ReactElement} Aplicación completa
 */
function App() {
  // Estado para controlar la pantalla de carga inicial
  const [loading, setLoading] = useState(true);

  /**
   * Efecto para simular carga inicial de la aplicación
   * Muestra LoadingScreen durante 2.5 segundos
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 segundos de loading

    // Limpiar el timer al desmontar
    return () => clearTimeout(timer);
  }, []);

  // Mostrar pantalla de carga mientras se inicializa
  if (loading) {
    return <LoadingScreen />;
  }

  /**
   * Estructura de proveedores (de exterior a interior):
   * 1. AuthProvider: Gestión de autenticación y sesiones
   * 2. IPSProvider: Gestión de IPS (Instituciones Prestadoras de Salud)
   * 3. DataProvider: Gestión de datos (citas, medicamentos)
   * 4. NotificationProvider: Gestión de notificaciones
   * 5. Router: Enrutamiento de la aplicación
   */
  return (
    <AuthProvider>
      <IPSProvider>
        <DataProvider>
          <NotificationProvider>
            <Router>
              <div className="App">
                <Routes>
                  {/* Ruta de autenticación (login/registro) */}
                  <Route 
                    path="/auth" 
                    element={
                      <PublicRoute>
                        <AuthPage />
                      </PublicRoute>
                    } 
                  />
                  
                  {/* Ruta del dashboard (requiere autenticación) */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Ruta raíz: redirige a /auth */}
                  <Route path="/" element={<Navigate to="/auth" />} />
                </Routes>
              </div>
            </Router>
          </NotificationProvider>
        </DataProvider>
      </IPSProvider>
    </AuthProvider>
  );
}

export default App;