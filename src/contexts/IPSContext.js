/**
 * IPSContext.js
 * 
 * Contexto de React para gestionar las IPS (Instituciones Prestadoras de Salud)
 * del sistema HighMed.
 * 
 * Funcionalidades:
 * - Almacena y gestiona la lista de IPS disponibles
 * - Proporciona funciones para obtener información de IPS por ID
 * - Inicializa IPS predeterminadas si no existen en localStorage
 * 
 * @author HighMed Development Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import safeLocalStorage from '../utils/storage';

// Crear el contexto de IPS
const IPSContext = createContext();

/**
 * Hook personalizado para acceder al contexto de IPS
 * 
 * @returns {Object} Objeto con ipsList, getIPSById y getIPSName
 * @example
 * const { ipsList, getIPSName } = useIPS();
 */
export function useIPS() {
  return useContext(IPSContext);
}

/**
 * Proveedor del contexto de IPS
 * Envuelve la aplicación para proporcionar acceso a las IPS
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 */
export function IPSProvider({ children }) {
  // Estado para almacenar la lista de IPS
  const [ipsList, setIpsList] = useState([]);

  /**
   * Efecto que se ejecuta al montar el componente
   * Inicializa las IPS desde localStorage o crea las predeterminadas
   */
  useEffect(() => {
    initializeIPS();
  }, []);

  /**
   * Inicializa las IPS en el sistema
   * Si no existen IPS en localStorage, crea 5 IPS predeterminadas
   * Si existen, las carga desde localStorage
   */
  const initializeIPS = () => {
    // Intentar obtener IPS almacenadas
    let storedIPS = safeLocalStorage.getItem('highmed_ips');
    
    if (!storedIPS) {
      // Si no hay IPS almacenadas, crear las predeterminadas
      const defaultIPS = [
        {
          id: 1,
          name: 'IPS Salud Total',
          code: 'IPS-001',
          address: 'Calle 100 #15-20, Bogotá',
          phone: '601-3001234',
          email: 'contacto@saludtotal.com'
        },
        {
          id: 2,
          name: 'IPS MediCare',
          code: 'IPS-002',
          address: 'Carrera 7 #45-30, Medellín',
          phone: '604-2501234',
          email: 'info@medicare.com'
        },
        {
          id: 3,
          name: 'IPS Vida Sana',
          code: 'IPS-003',
          address: 'Avenida 5 #10-50, Cali',
          phone: '602-4801234',
          email: 'atencion@vidasana.com'
        },
        {
          id: 4,
          name: 'IPS Centro Médico Integral',
          code: 'IPS-004',
          address: 'Calle 50 #25-10, Barranquilla',
          phone: '605-3601234',
          email: 'contacto@centromedico.com'
        },
        {
          id: 5,
          name: 'IPS Clínica del Norte',
          code: 'IPS-005',
          address: 'Carrera 15 #80-40, Bogotá',
          phone: '601-6201234',
          email: 'info@clinicadelnorte.com'
        }
      ];
      
      // Guardar IPS predeterminadas en localStorage
      safeLocalStorage.setItem('highmed_ips', JSON.stringify(defaultIPS));
      setIpsList(defaultIPS);
    } else {
      // Si hay IPS almacenadas, cargarlas
      try {
        setIpsList(JSON.parse(storedIPS));
      } catch (error) {
        console.error('Error parsing IPS:', error);
        setIpsList([]);
      }
    }
  };

  /**
   * Obtiene una IPS por su ID
   * 
   * @param {number} ipsId - ID de la IPS a buscar
   * @returns {Object|undefined} Objeto IPS o undefined si no se encuentra
   * @example
   * const ips = getIPSById(1); // Retorna IPS Salud Total
   */
  const getIPSById = (ipsId) => {
    return ipsList.find(ips => ips.id === ipsId);
  };

  /**
   * Obtiene el nombre de una IPS por su ID
   * 
   * @param {number} ipsId - ID de la IPS
   * @returns {string} Nombre de la IPS o 'IPS no asignada' si no existe
   * @example
   * const name = getIPSName(1); // Retorna "IPS Salud Total"
   */
  const getIPSName = (ipsId) => {
    const ips = getIPSById(ipsId);
    return ips ? ips.name : 'IPS no asignada';
  };

  // Valor del contexto que se proporciona a los componentes hijos
  const value = {
    ipsList,      // Lista completa de IPS
    getIPSById,   // Función para obtener IPS por ID
    getIPSName    // Función para obtener nombre de IPS
  };

  return (
    <IPSContext.Provider value={value}>
      {children}
    </IPSContext.Provider>
  );
}
