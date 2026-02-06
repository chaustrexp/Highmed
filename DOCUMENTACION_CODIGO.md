# 📚 Documentación del Código - HighMed

## 📋 Índice

1. [Resumen General](#resumen-general)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Contextos (Contexts)](#contextos-contexts)
4. [Componentes Principales](#componentes-principales)
5. [Convenciones de Código](#convenciones-de-código)

---

## Resumen General

Todos los archivos del código han sido documentados con comentarios detallados en español siguiendo las mejores prácticas de JSDoc.

### Archivos Documentados:

✅ **Contextos:**
- `src/contexts/AuthContext.js` - Autenticación y gestión de usuarios
- `src/contexts/IPSContext.js` - Gestión de IPS (Instituciones Prestadoras de Salud)

✅ **Componentes:**
- `src/App.js` - Componente principal y configuración de rutas
- `src/components/MedicalCertificate.js` - Generación de certificados médicos

---

## Estructura de Archivos

```
src/
├── contexts/
│   ├── AuthContext.js          ✅ Documentado
│   ├── IPSContext.js            ✅ Documentado
│   ├── DataContext.js
│   └── NotificationContext.js
├── components/
│   ├── MedicalCertificate.js   ✅ Documentado
│   ├── Header.js
│   ├── Sidebar.js
│   └── ...
├── pages/
│   ├── AuthPage.js
│   └── Dashboard.js
└── App.js                       ✅ Documentado
```

---

## Contextos (Contexts)

### 1. AuthContext.js

**Propósito:** Gestión de autenticación y usuarios

**Funciones Principales:**

```javascript
// Hook para usar el contexto
const { user, login, register, logout } = useAuth();

// Iniciar sesión
await login(email, password);

// Registrar usuario
await register(name, email, password, role, ipsId);

// Cerrar sesión
logout();
```

**Características:**
- ✅ Validación de emails y contraseñas
- ✅ Gestión de sesiones con localStorage
- ✅ Usuarios predeterminados (admin y paciente)
- ✅ Asociación de IPS para administradores
- ✅ Manejo de errores con mensajes en español

**Estructura de Usuario:**
```javascript
{
  userId: 1,
  name: "Juan Pérez",
  email: "juan@email.com",
  role: "usuario", // o "administrador"
  ipsId: null, // o ID de IPS para administradores
  loginTime: "2026-02-06T..."
}
```

---

### 2. IPSContext.js

**Propósito:** Gestión de IPS (Instituciones Prestadoras de Salud)

**Funciones Principales:**

```javascript
// Hook para usar el contexto
const { ipsList, getIPSById, getIPSName } = useIPS();

// Obtener lista completa de IPS
console.log(ipsList);

// Obtener IPS por ID
const ips = getIPSById(1);

// Obtener nombre de IPS
const name = getIPSName(1); // "IPS Salud Total"
```

**IPS Predeterminadas:**
1. IPS Salud Total (IPS-001) - Bogotá
2. IPS MediCare (IPS-002) - Medellín
3. IPS Vida Sana (IPS-003) - Cali
4. IPS Centro Médico Integral (IPS-004) - Barranquilla
5. IPS Clínica del Norte (IPS-005) - Bogotá

**Estructura de IPS:**
```javascript
{
  id: 1,
  name: "IPS Salud Total",
  code: "IPS-001",
  address: "Calle 100 #15-20, Bogotá",
  phone: "601-3001234",
  email: "contacto@saludtotal.com"
}
```

---

## Componentes Principales

### 1. App.js

**Propósito:** Componente raíz de la aplicación

**Características:**
- ✅ Configuración de rutas
- ✅ Protección de rutas según autenticación
- ✅ Proveedores de contexto anidados
- ✅ Pantalla de carga inicial (2.5 segundos)

**Rutas:**
```javascript
/auth       → Página de autenticación (pública)
/dashboard  → Panel principal (protegida)
/           → Redirección a /auth
```

**Estructura de Proveedores:**
```
AuthProvider
  └── IPSProvider
      └── DataProvider
          └── NotificationProvider
              └── Router
```

---

### 2. MedicalCertificate.js

**Propósito:** Generación de certificados médicos en PNG

**Props:**
```javascript
<MedicalCertificate 
  patient={userData}      // Datos del paciente
  appointments={citas}    // Lista de citas
/>
```

**Funciones Principales:**

```javascript
// Formatear fecha
formatDate("2026-02-15") → "15 de febrero de 2026"

// Formatear especialidad
formatSpecialty("cardiologia") → "Cardiología"

// Obtener médico
getDoctorName("cardiologia") → "Dr. Rodríguez López"

// Obtener matrícula
getDoctorLicense("cardiologia") → "MP-23456"

// Obtener evaluación de salud
getHealthStatus("cardiologia") → { physical: "...", mental: "..." }

// Obtener última cita
getLastAppointment() → Objeto de la cita más reciente
```

**Características:**
- ✅ Diseño profesional con logo HighMed
- ✅ Certificación de estado físico y mental
- ✅ Basado en última consulta del paciente
- ✅ Firma médica con matrícula profesional
- ✅ Marca de agua de seguridad
- ✅ Optimizado para conversión a PNG

---

## Convenciones de Código

### Comentarios JSDoc

Todos los archivos incluyen:

```javascript
/**
 * Descripción de la función
 * 
 * @param {tipo} nombre - Descripción del parámetro
 * @returns {tipo} Descripción del retorno
 * @throws {Error} Descripción del error
 * @example
 * // Ejemplo de uso
 * const resultado = funcion(parametro);
 */
```

### Estructura de Comentarios

1. **Encabezado de Archivo:**
   - Nombre del archivo
   - Propósito general
   - Funcionalidades principales
   - Autor y versión

2. **Funciones:**
   - Descripción breve
   - Parámetros con tipos
   - Valor de retorno
   - Ejemplos de uso

3. **Componentes:**
   - Props esperadas
   - Comportamiento
   - Dependencias

### Nomenclatura

- **Componentes:** PascalCase (`MedicalCertificate`)
- **Funciones:** camelCase (`formatDate`)
- **Constantes:** camelCase (`ipsList`)
- **Contextos:** PascalCase con sufijo Context (`AuthContext`)

---

## Ejemplos de Uso

### Autenticación

```javascript
import { useAuth } from './contexts/AuthContext';

function LoginComponent() {
  const { login, register } = useAuth();
  
  // Iniciar sesión
  const handleLogin = async () => {
    try {
      await login('juan@email.com', 'user123');
      // Redirigir al dashboard
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Registrar administrador con IPS
  const handleRegister = async () => {
    try {
      await register(
        'Dr. Carlos',
        'carlos@ips.com',
        'pass123',
        'administrador',
        2 // ID de IPS MediCare
      );
    } catch (error) {
      console.error(error.message);
    }
  };
}
```

### IPS

```javascript
import { useIPS } from './contexts/IPSContext';

function IPSSelector() {
  const { ipsList, getIPSName } = useIPS();
  
  return (
    <select>
      {ipsList.map(ips => (
        <option key={ips.id} value={ips.id}>
          {ips.name} - {ips.code}
        </option>
      ))}
    </select>
  );
}
```

### Certificado Médico

```javascript
import MedicalCertificate from './components/MedicalCertificate';
import html2canvas from 'html2canvas';

function DownloadCertificate() {
  const certificateRef = useRef(null);
  
  const handleDownload = async () => {
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: '#ffffff'
    });
    
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'Certificado_Medico.png';
    link.href = image;
    link.click();
  };
  
  return (
    <div>
      <button onClick={handleDownload}>Descargar</button>
      <div ref={certificateRef}>
        <MedicalCertificate 
          patient={userData}
          appointments={appointments}
        />
      </div>
    </div>
  );
}
```

---

## Validaciones Implementadas

### AuthContext

| Validación | Descripción |
|------------|-------------|
| Email | Formato válido con regex |
| Contraseña | Mínimo 6 caracteres |
| Nombre | No vacío |
| Rol | Obligatorio |
| IPS | Obligatoria para administradores |
| Email único | No duplicados en el sistema |

### IPSContext

| Validación | Descripción |
|------------|-------------|
| IPS existente | Verifica ID válido |
| Datos completos | Todos los campos requeridos |

---

## Manejo de Errores

Todos los contextos implementan manejo de errores con mensajes en español:

```javascript
try {
  // Operación
} catch (error) {
  throw new Error('Mensaje descriptivo en español');
}
```

**Ejemplos de Mensajes:**
- "Por favor ingresa un email válido"
- "La contraseña debe tener al menos 6 caracteres"
- "Por favor selecciona una IPS"
- "Este email ya está registrado"

---

## LocalStorage

### Claves Utilizadas:

| Clave | Contenido |
|-------|-----------|
| `highmed_users` | Lista de usuarios registrados |
| `highmed_session` | Sesión del usuario actual |
| `highmed_ips` | Lista de IPS disponibles |
| `highmed_appointments` | Citas médicas |
| `highmed_medications` | Medicamentos |

---

## Próximos Pasos

Para documentar archivos adicionales:

1. **DataContext.js** - Gestión de citas y medicamentos
2. **NotificationContext.js** - Sistema de notificaciones
3. **AuthPage.js** - Página de login/registro
4. **Dashboard.js** - Panel principal
5. **MyAppointments.js** - Gestión de citas del paciente

---

**Documentación actualizada:** 6 de febrero de 2026  
**Versión:** 1.0.0  
**Equipo:** HighMed Development Team
