# HighMed Dashboard - React + Tailwind CSS

Sistema de gestión médica desarrollado con React y Tailwind CSS para la gestión de citas médicas y medicamentos con control de roles (Administrador/Usuario).

**Desarrollado por HIGHSOFT**

## 🚀 Características

### 🔐 Sistema de Autenticación
- Registro e inicio de sesión
- Control de roles (Usuario/Administrador)
- Sesiones persistentes con localStorage
- Validaciones de formularios

### 👤 Panel de Usuario
- **Dashboard personalizado** con estadísticas
- **Gestión de citas**: solicitar, ver estado
- **Medicamentos organizados** por categorías:
  - 💊 Disponibles (para reclamar)
  - 📋 Recetados (pendientes de farmacia)
  - 🏥 Asignados (en tratamiento)
  - ✅ Reclamados (historial)
- **Búsqueda de medicamentos** por nombre/categoría
- **Sección de beneficios** exclusiva

### 🏥 Panel de Administrador (IPS)
- **Dashboard con estadísticas** generales
- **Gestión completa de citas**
- **Sistema de prescripción** de medicamentos
- **Reportes** por especialidad
- **Catálogo de 15 medicamentos** por categorías

### 📱 Diseño Responsive
- Adaptable a desktop, tablet y móvil
- Sidebar colapsable en móviles
- Componentes optimizados para touch
- Diseño moderno con Tailwind CSS

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **React Router DOM** - Navegación
- **Tailwind CSS** - Estilos y diseño
- **Context API** - Gestión de estado
- **LocalStorage** - Persistencia de datos

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd highmed-dashboard
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   # o
   yarn start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🔑 Credenciales de Prueba

### Usuario
- **Email:** juan@email.com
- **Contraseña:** user123

### Administrador
- **Email:** admin@highmed.com
- **Contraseña:** admin123

## 📁 Estructura del Proyecto

```
highmed-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── StatCard.js
│   │   │   └── Table.js
│   │   ├── modals/
│   │   │   ├── AppointmentModal.js
│   │   │   └── PrescriptionModal.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── MyAppointments.js
│   │   │   ├── Medications.js
│   │   │   ├── Benefits.js
│   │   │   ├── AppointmentManagement.js
│   │   │   └── Reports.js
│   │   ├── Header.js
│   │   └── Sidebar.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── DataContext.js
│   ├── pages/
│   │   ├── AuthPage.js
│   │   └── Dashboard.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔄 Flujo de Trabajo

### Para Usuarios:
1. **Registro/Login** → Acceso al dashboard
2. **Solicitar cita** → Estado "Pendiente"
3. **Esperar aprobación** del administrador
4. **Recibir medicamentos** recetados
5. **Reclamar medicamentos** disponibles

### Para Administradores:
1. **Ver citas pendientes** en gestión
2. **Aprobar y recetar** medicamentos
3. **Seleccionar medicamentos** del catálogo
4. **Configurar estados** (Recetado/Disponible/Asignado)
5. **Generar reportes** del sistema

## 🎨 Personalización

### Colores
Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
      }
    }
  }
}
```

### Componentes
Los estilos de componentes están en `src/index.css` usando las directivas de Tailwind.

## 📊 Funcionalidades Destacadas

### Sistema de Prescripción
- Modal completo para recetar medicamentos
- Catálogo de 15 medicamentos organizados por categorías
- Auto-completado de dosificación
- Estados configurables por medicamento
- Aprobación automática de citas al recetar

### Gestión de Medicamentos
- Organización por estados (Disponible, Recetado, Asignado, Reclamado)
- Búsqueda en tiempo real
- Estadísticas por categoría
- Historial completo de medicamentos

### Reportes Administrativos
- Estadísticas generales del sistema
- Reportes por especialidad médica
- Indicadores de rendimiento
- Gráficos de distribución

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm start          # Inicia servidor de desarrollo
npm run build      # Construye para producción
npm test           # Ejecuta tests
npm run eject      # Expone configuración (irreversible)
```

## 📝 Notas Importantes

- **Datos simulados**: El sistema usa localStorage para persistencia
- **Sin backend**: Todos los datos se manejan en el frontend
- **Responsive**: Optimizado para todos los dispositivos
- **Accesible**: Componentes con buenas prácticas de accesibilidad

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Verifica las credenciales de prueba
3. Asegúrate de que Node.js esté instalado correctamente
4. Limpia caché: `npm start -- --reset-cache`

---

**Desarrollado con ❤️ usando React y Tailwind CSS**