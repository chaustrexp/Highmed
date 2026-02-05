# 🎨 Guía del Loading Screen - HighMed

## 📋 Descripción

Se ha implementado un sistema completo de pantallas de carga (loading screens) adaptado al diseño de HighMed, con animaciones suaves y profesionales.

## 🎯 Componentes Implementados

### 1. **LoadingScreen** (Pantalla Completa)
**Ubicación**: `src/components/LoadingScreen.js`

Pantalla de carga inicial que se muestra al cargar la aplicación.

#### **Características:**
- ✅ Fondo con imagen de marca (fondo.png)
- ✅ Logo animado con efecto de rayo
- ✅ Animaciones suaves y profesionales
- ✅ Barra de progreso animada
- ✅ Texto de marca (HighMed by HIGHSOFT)
- ✅ Puntos de carga animados
- ✅ Responsive design

#### **Uso:**
```javascript
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen />;
  }

  return <YourApp />;
}
```

### 2. **LoadingSpinner** (Componente Reutilizable)
**Ubicación**: `src/components/LoadingSpinner.js`

Spinner de carga más pequeño para usar en componentes individuales.

#### **Características:**
- ✅ Tres tamaños: sm, md, lg
- ✅ Texto personalizable
- ✅ Animaciones consistentes con el diseño
- ✅ Logo de HighMed animado
- ✅ Puntos de carga

#### **Uso:**
```javascript
import LoadingSpinner from './components/LoadingSpinner';

// Tamaño pequeño
<LoadingSpinner size="sm" text="Cargando..." />

// Tamaño mediano (default)
<LoadingSpinner size="md" text="Procesando datos..." />

// Tamaño grande
<LoadingSpinner size="lg" text="Cargando información..." />

// Sin texto
<LoadingSpinner size="md" text="" />
```

## 🎨 Animaciones Implementadas

### **CSS Animations:**

#### 1. **pulse-slow**
Efecto de pulsación suave para el logo
```css
animation: pulse-slow 3s ease-in-out infinite;
```

#### 2. **bounce-slow**
Rebote suave del icono de rayo
```css
animation: bounce-slow 2s ease-in-out infinite;
```

#### 3. **loading-bar**
Barra de progreso animada
```css
animation: loading-bar 1.5s ease-in-out infinite;
```

#### 4. **fade-in**
Aparición gradual de elementos
```css
animation: fade-in 0.6s ease-out forwards;
```

#### 5. **bounce-dot**
Puntos de carga animados
```css
animation: bounce-dot 1.4s infinite ease-in-out;
```

## ⚙️ Configuración

### **Duración del Loading Screen:**

En `src/App.js`, puedes ajustar el tiempo de carga:

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2500); // Cambiar este valor (en milisegundos)

  return () => clearTimeout(timer);
}, []);
```

**Valores recomendados:**
- **Desarrollo**: 1000ms (1 segundo)
- **Producción**: 2500ms (2.5 segundos)
- **Carga real**: Usar con promesas de carga de datos

### **Carga Basada en Datos Reales:**

```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      // Cargar datos necesarios
      await Promise.all([
        loadUserData(),
        loadAppointments(),
        loadMedications()
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  loadData();
}, []);
```

## 🎯 Integración en Componentes

### **En Tablas:**
```javascript
import LoadingSpinner from '../LoadingSpinner';

function MyTable() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="card">
        <LoadingSpinner size="lg" text="Cargando datos..." />
      </div>
    );
  }

  return <Table data={data} />;
}
```

### **En Modales:**
```javascript
function MyModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await saveData();
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {loading ? (
        <LoadingSpinner size="md" text="Guardando..." />
      ) : (
        <FormContent />
      )}
    </Modal>
  );
}
```

### **En Páginas:**
```javascript
function MyPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" text="Cargando página..." />;
  }

  return <PageContent data={data} />;
}
```

## 🎨 Personalización

### **Cambiar Colores:**

En `src/components/LoadingScreen.js`:

```javascript
// Cambiar color del logo
<div className="bg-gradient-to-br from-health-500 to-health-600">
  // Cambiar a:
  <div className="bg-gradient-to-br from-blue-500 to-blue-600">

// Cambiar color de la barra de progreso
<div className="bg-gradient-to-r from-health-500 to-health-600">
  // Cambiar a:
  <div className="bg-gradient-to-r from-blue-500 to-blue-600">
```

### **Cambiar Velocidad de Animaciones:**

En `src/index.css`:

```css
/* Más rápido */
.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite; /* Era 3s */
}

/* Más lento */
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite; /* Era 2s */
}
```

### **Cambiar Texto:**

```javascript
<LoadingScreen />
// Modificar en el componente:
<h1>Tu Marca</h1>
<p>by Tu Empresa</p>
<p>Cargando tu sistema...</p>
```

## 📱 Responsive Design

El loading screen está completamente optimizado para:

- **Desktop** (1024px+): Tamaño completo con todas las animaciones
- **Tablet** (768px-1024px): Adaptado con espaciado optimizado
- **Móvil** (<768px): Versión compacta con elementos ajustados

## 🚀 Performance

### **Optimizaciones Implementadas:**
- ✅ Animaciones CSS (no JavaScript)
- ✅ GPU acceleration con transform
- ✅ Will-change para animaciones suaves
- ✅ Lazy loading de componentes
- ✅ Cleanup de timers

### **Mejores Prácticas:**
```javascript
// ✅ CORRECTO: Limpiar timers
useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 2500);
  return () => clearTimeout(timer); // Cleanup
}, []);

// ❌ INCORRECTO: No limpiar
useEffect(() => {
  setTimeout(() => setLoading(false), 2500);
}, []);
```

## 🎯 Casos de Uso

### **1. Carga Inicial de App:**
```javascript
// App.js
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simular carga o cargar datos reales
  setTimeout(() => setLoading(false), 2500);
}, []);

if (loading) return <LoadingScreen />;
```

### **2. Carga de Datos en Página:**
```javascript
// Dashboard.js
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadDashboardData().then(() => setLoading(false));
}, []);

if (loading) return <LoadingSpinner size="lg" />;
```

### **3. Operaciones Asíncronas:**
```javascript
const [saving, setSaving] = useState(false);

const handleSave = async () => {
  setSaving(true);
  await saveData();
  setSaving(false);
};

return (
  <button onClick={handleSave} disabled={saving}>
    {saving ? <LoadingSpinner size="sm" text="" /> : 'Guardar'}
  </button>
);
```

## 🔧 Troubleshooting

### **Problema: Loading screen no desaparece**
```javascript
// Verificar que setLoading(false) se ejecute
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Hiding loading screen'); // Debug
    setLoading(false);
  }, 2500);
  return () => clearTimeout(timer);
}, []);
```

### **Problema: Animaciones no funcionan**
```javascript
// Verificar que las clases CSS estén importadas
import './index.css'; // En App.js o index.js
```

### **Problema: Loading screen parpadea**
```javascript
// Agregar un mínimo de tiempo de carga
const MIN_LOADING_TIME = 1000;
const startTime = Date.now();

const hideLoading = () => {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);
  
  setTimeout(() => setLoading(false), remaining);
};
```

## 📊 Métricas de Performance

**Objetivo:**
- First Paint: < 100ms
- Animation FPS: 60fps
- Memory Usage: < 5MB

**Monitoreo:**
```javascript
// Medir tiempo de carga
const startTime = performance.now();

useEffect(() => {
  const endTime = performance.now();
  console.log(`Loading time: ${endTime - startTime}ms`);
}, [loading]);
```

---

## ✅ Checklist de Implementación

- [x] LoadingScreen component creado
- [x] LoadingSpinner component creado
- [x] Animaciones CSS implementadas
- [x] Integrado en App.js
- [x] Integrado en Table.js
- [x] Responsive design verificado
- [x] Performance optimizado
- [x] Documentación completa

**¡El sistema de loading está completamente implementado y listo para usar! 🚀**