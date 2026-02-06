/**
 * AuthContext.js
 * 
 * Contexto de React para gestionar la autenticación de usuarios en HighMed.
 * 
 * Funcionalidades:
 * - Registro de nuevos usuarios (pacientes y administradores)
 * - Inicio de sesión con validación de credenciales
 * - Cierre de sesión
 * - Gestión de sesiones con localStorage
 * - Validación de emails y contraseñas
 * - Asociación de IPS para administradores
 * 
 * @author HighMed Development Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import safeLocalStorage from '../utils/storage';

// Crear el contexto de autenticación
const AuthContext = createContext();

/**
 * Hook personalizado para acceder al contexto de autenticación
 * 
 * @returns {Object} Objeto con user, login, register, logout y loading
 * @example
 * const { user, login, logout } = useAuth();
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Proveedor del contexto de autenticación
 * Envuelve la aplicación para proporcionar funcionalidades de autenticación
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 */
export function AuthProvider({ children }) {
  // Estado del usuario actual (null si no está autenticado)
  const [user, setUser] = useState(null);
  
  // Estado de carga inicial
  const [loading, setLoading] = useState(true);

  /**
   * Efecto que se ejecuta al montar el componente
   * Inicializa usuarios predeterminados y verifica sesión existente
   */
  useEffect(() => {
    // Inicializar usuarios predeterminados si no existen
    const users = getUsers();
    if (users.length === 0) {
      const defaultUsers = [
        {
          id: 1,
          name: 'Administrador Sistema',
          email: 'admin@highmed.com',
          password: 'admin123',
          role: 'administrador',
          ipsId: 1  // Asociado a IPS Salud Total
        },
        {
          id: 2,
          name: 'Juan Pérez',
          email: 'juan@email.com',
          password: 'user123',
          role: 'usuario',
          ipsId: null  // Los pacientes no tienen IPS
        }
      ];
      safeLocalStorage.setItem('highmed_users', JSON.stringify(defaultUsers));
    }

    // Verificar si existe una sesión activa
    const session = safeLocalStorage.getItem('highmed_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (error) {
        console.error('Error parsing session:', error);
        safeLocalStorage.removeItem('highmed_session');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Obtiene la lista de usuarios desde localStorage
   * 
   * @returns {Array} Array de usuarios o array vacío si no hay usuarios
   */
  const getUsers = () => {
    const users = safeLocalStorage.getItem('highmed_users');
    if (!users) return [];
    
    try {
      return JSON.parse(users);
    } catch (error) {
      console.error('Error parsing users:', error);
      return [];
    }
  };

  /**
   * Valida el formato de un email
   * 
   * @param {string} email - Email a validar
   * @returns {boolean} true si el email es válido, false en caso contrario
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Inicia sesión de un usuario
   * 
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Datos de la sesión del usuario
   * @throws {Error} Si las credenciales son incorrectas o inválidas
   * @example
   * await login('juan@email.com', 'user123');
   */
  const login = async (email, password) => {
    // Validar email
    if (!validateEmail(email)) {
      throw new Error('Por favor ingresa un email válido');
    }

    // Validar contraseña
    if (!password) {
      throw new Error('Por favor ingresa tu contraseña');
    }

    // Buscar usuario en la base de datos
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      // Crear datos de sesión
      const sessionData = {
        userId: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        ipsId: foundUser.ipsId || null,  // IPS del administrador o null para pacientes
        loginTime: new Date().toISOString()
      };

      // Guardar sesión en localStorage
      const saved = safeLocalStorage.setItem('highmed_session', JSON.stringify(sessionData));
      if (!saved) {
        console.warn('Session could not be saved to localStorage');
      }
      
      // Actualizar estado del usuario
      setUser(sessionData);
      return sessionData;
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  /**
   * Registra un nuevo usuario en el sistema
   * 
   * @param {string} name - Nombre completo del usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @param {string} role - Rol del usuario ('usuario' o 'administrador')
   * @param {number|null} ipsId - ID de la IPS (obligatorio para administradores)
   * @returns {Promise<Object>} Datos del nuevo usuario creado
   * @throws {Error} Si hay errores de validación o el email ya existe
   * @example
   * // Registrar un paciente
   * await register('María García', 'maria@email.com', 'pass123', 'usuario', null);
   * 
   * // Registrar un administrador con IPS
   * await register('Dr. Carlos', 'carlos@ips.com', 'pass123', 'administrador', 2);
   */
  const register = async (name, email, password, role, ipsId = null) => {
    // Validación: Nombre
    if (!name.trim()) {
      throw new Error('Por favor ingresa tu nombre');
    }

    // Validación: Email
    if (!validateEmail(email)) {
      throw new Error('Por favor ingresa un email válido');
    }

    // Validación: Contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Validación: Rol
    if (!role) {
      throw new Error('Por favor selecciona un rol');
    }

    // Validación: IPS obligatoria para administradores
    if (role === 'administrador' && !ipsId) {
      throw new Error('Por favor selecciona una IPS');
    }

    // Verificar si el email ya está registrado
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now(),  // ID único basado en timestamp
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      role: role,
      ipsId: role === 'administrador' ? ipsId : null  // Solo administradores tienen IPS
    };

    // Agregar usuario a la lista y guardar
    users.push(newUser);
    const saved = safeLocalStorage.setItem('highmed_users', JSON.stringify(users));
    
    if (!saved) {
      throw new Error('No se pudo guardar el usuario. Por favor intenta de nuevo.');
    }

    return newUser;
  };

  /**
   * Cierra la sesión del usuario actual
   * Elimina la sesión de localStorage y limpia el estado
   */
  const logout = () => {
    safeLocalStorage.removeItem('highmed_session');
    setUser(null);
  };

  // Valor del contexto que se proporciona a los componentes hijos
  const value = {
    user,       // Usuario actual (null si no está autenticado)
    login,      // Función para iniciar sesión
    register,   // Función para registrar nuevo usuario
    logout,     // Función para cerrar sesión
    loading     // Estado de carga inicial
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}