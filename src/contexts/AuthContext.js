import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize default users if they don't exist
    const users = getUsers();
    if (users.length === 0) {
      const defaultUsers = [
        {
          id: 1,
          name: 'Administrador Sistema',
          email: 'admin@highmed.com',
          password: 'admin123',
          role: 'administrador'
        },
        {
          id: 2,
          name: 'Juan Pérez',
          email: 'juan@email.com',
          password: 'user123',
          role: 'usuario'
        }
      ];
      localStorage.setItem('highmed_users', JSON.stringify(defaultUsers));
    }

    // Check for existing session
    const session = localStorage.getItem('highmed_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (error) {
        console.error('Error parsing session:', error);
        localStorage.removeItem('highmed_session');
      }
    }
    setLoading(false);
  }, []);

  const getUsers = () => {
    const users = localStorage.getItem('highmed_users');
    return users ? JSON.parse(users) : [];
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async (email, password) => {
    if (!validateEmail(email)) {
      throw new Error('Por favor ingresa un email válido');
    }

    if (!password) {
      throw new Error('Por favor ingresa tu contraseña');
    }

    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const sessionData = {
        userId: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('highmed_session', JSON.stringify(sessionData));
      setUser(sessionData);
      return sessionData;
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  const register = async (name, email, password, role) => {
    // Validation
    if (!name.trim()) {
      throw new Error('Por favor ingresa tu nombre');
    }

    if (!validateEmail(email)) {
      throw new Error('Por favor ingresa un email válido');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (!role) {
      throw new Error('Por favor selecciona un rol');
    }

    // Check if email already exists
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Este email ya está registrado');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      role: role
    };

    users.push(newUser);
    localStorage.setItem('highmed_users', JSON.stringify(users));

    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('highmed_session');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}