/**
 * Utilidad para manejar localStorage de forma segura
 * Maneja errores de cuota excedida y otros problemas de almacenamiento
 */

const safeLocalStorage = {
  /**
   * Guarda un item en localStorage de forma segura
   * @param {string} key - Clave del item
   * @param {string} value - Valor a guardar (debe ser string)
   * @returns {boolean} - true si se guardó exitosamente, false si falló
   */
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn(`LocalStorage quota exceeded for key: ${key}`);
        
        // Intentar limpiar datos no críticos
        try {
          const keysToKeep = ['highmed_session', 'highmed_users'];
          const allKeys = Object.keys(localStorage);
          
          // Limpiar solo datos no críticos
          allKeys.forEach(storageKey => {
            if (!keysToKeep.includes(storageKey)) {
              localStorage.removeItem(storageKey);
            }
          });
          
          // Reintentar guardar después de limpiar
          localStorage.setItem(key, value);
          console.info(`Successfully saved ${key} after cleanup`);
          return true;
        } catch (retryError) {
          console.error('Failed to save even after cleanup:', retryError);
          
          // Último intento: limpiar todo excepto sesión
          try {
            const session = localStorage.getItem('highmed_session');
            localStorage.clear();
            if (session) {
              localStorage.setItem('highmed_session', session);
            }
            localStorage.setItem(key, value);
            console.info(`Successfully saved ${key} after full cleanup`);
            return true;
          } catch (finalError) {
            console.error('Complete failure to save to localStorage:', finalError);
            return false;
          }
        }
      }
      
      console.error(`Error saving to localStorage (${key}):`, error);
      return false;
    }
  },

  /**
   * Obtiene un item de localStorage de forma segura
   * @param {string} key - Clave del item
   * @returns {string|null} - Valor del item o null si no existe o hay error
   */
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  },

  /**
   * Elimina un item de localStorage de forma segura
   * @param {string} key - Clave del item a eliminar
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },

  /**
   * Limpia todo el localStorage de forma segura
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  /**
   * Obtiene el tamaño aproximado del localStorage en bytes
   * @returns {number} - Tamaño en bytes
   */
  getSize: () => {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Error calculating localStorage size:', error);
      return 0;
    }
  },

  /**
   * Obtiene el tamaño aproximado del localStorage en formato legible
   * @returns {string} - Tamaño formateado (ej: "2.5 KB")
   */
  getSizeFormatted: () => {
    const bytes = safeLocalStorage.getSize();
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  },

  /**
   * Verifica si hay espacio disponible en localStorage
   * @returns {boolean} - true si hay espacio disponible
   */
  hasSpace: () => {
    try {
      const testKey = '__storage_test__';
      const testValue = 'x'.repeat(1024); // 1KB de prueba
      localStorage.setItem(testKey, testValue);
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default safeLocalStorage;
