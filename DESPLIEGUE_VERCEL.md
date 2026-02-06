# 🚀 Guía de Despliegue en Vercel - HighMed

## ✅ Cambios Subidos a GitHub

Los cambios han sido subidos exitosamente al repositorio:
**https://github.com/chaustrexp/Highmed.git**

### Commit realizado:
```
feat: Implementación completa de certificados médicos, selector de IPS y documentación del código

- Agregado certificado médico en PNG con estado físico/mental del paciente
- Implementado selector de IPS para administradores en registro
- Documentación completa de código con JSDoc en español
- 5 IPS predeterminadas en el sistema
- Validaciones y manejo de errores mejorado
- Diseño responsive y profesional
- Instalada librería html2canvas para generación de certificados
```

---

## 🌐 Despliegue en Vercel

### Opción 1: Despliegue Automático desde GitHub (Recomendado)

#### Paso 1: Ir a Vercel
1. Visita: https://vercel.com
2. Inicia sesión con tu cuenta de GitHub

#### Paso 2: Importar Proyecto
1. Haz clic en **"Add New..."** → **"Project"**
2. Selecciona el repositorio **"Highmed"** de la lista
3. Haz clic en **"Import"**

#### Paso 3: Configurar el Proyecto
Vercel detectará automáticamente que es un proyecto React. Verifica la configuración:

```
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### Paso 4: Variables de Entorno (Opcional)
Si necesitas variables de entorno, agrégalas aquí. Para este proyecto no son necesarias.

#### Paso 5: Desplegar
1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye y despliega la aplicación
3. ¡Listo! Tu aplicación estará disponible en una URL como:
   ```
   https://highmed-[random].vercel.app
   ```

---

### Opción 2: Despliegue desde CLI de Vercel

#### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

#### Paso 2: Iniciar Sesión
```bash
vercel login
```

#### Paso 3: Desplegar
Desde la carpeta del proyecto:
```bash
vercel
```

Sigue las instrucciones en pantalla:
- Set up and deploy? **Y**
- Which scope? Selecciona tu cuenta
- Link to existing project? **N**
- What's your project's name? **highmed**
- In which directory is your code located? **./**
- Want to override the settings? **N**

#### Paso 4: Despliegue a Producción
```bash
vercel --prod
```

---

## 📋 Verificación Post-Despliegue

### 1. Verificar que la aplicación carga correctamente
- ✅ Página de login visible
- ✅ Logo e imágenes cargadas
- ✅ Estilos aplicados correctamente

### 2. Probar funcionalidades principales
- ✅ Registro de usuario (paciente y administrador)
- ✅ Inicio de sesión
- ✅ Selector de IPS para administradores
- ✅ Dashboard funcional
- ✅ Descarga de certificado médico en PNG

### 3. Verificar en diferentes dispositivos
- ✅ Computador (Chrome, Firefox, Edge)
- ✅ Móvil (Chrome, Safari)
- ✅ Tablet

---

## 🔧 Configuración Automática de Vercel

El archivo `vercel.json` ya está configurado con:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/logo.jpeg",
      "dest": "/logo.jpeg"
    },
    {
      "src": "/fondo.png",
      "dest": "/fondo.png"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

Esto asegura que:
- ✅ Las rutas de React Router funcionen correctamente
- ✅ Los archivos estáticos se sirvan correctamente
- ✅ Las imágenes (logo y fondo) estén disponibles

---

## 🎯 Dominio Personalizado (Opcional)

### Si tienes un dominio propio:

1. Ve a tu proyecto en Vercel
2. Haz clic en **"Settings"** → **"Domains"**
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los DNS

Ejemplo:
```
highmed.tudominio.com
```

---

## 🔄 Actualizaciones Automáticas

Una vez configurado, cada vez que hagas push a GitHub:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

Vercel automáticamente:
1. Detectará el cambio
2. Construirá la aplicación
3. Desplegará la nueva versión
4. Te notificará por email

---

## 📊 Monitoreo y Analytics

Vercel proporciona:
- ✅ Analytics de tráfico
- ✅ Logs de errores
- ✅ Métricas de rendimiento
- ✅ Notificaciones de despliegue

Accede desde: https://vercel.com/dashboard

---

## 🐛 Solución de Problemas

### Error: "Build failed"
**Solución:** Verifica que todas las dependencias estén en package.json
```bash
npm install
npm run build
```

### Error: "Routes not working"
**Solución:** Verifica que vercel.json esté en la raíz del proyecto

### Error: "Images not loading"
**Solución:** Verifica que las imágenes estén en la carpeta `public/`

### Error: "localStorage not working"
**Solución:** Esto es normal en modo incógnito. Usa modo normal del navegador.

---

## 📱 URLs de Prueba

Después del despliegue, prueba estas rutas:

```
https://tu-app.vercel.app/           → Redirige a /auth
https://tu-app.vercel.app/auth       → Página de login/registro
https://tu-app.vercel.app/dashboard  → Dashboard (requiere login)
```

---

## ✅ Checklist de Despliegue

- [x] Código subido a GitHub
- [x] vercel.json configurado
- [x] package.json con scripts correctos
- [ ] Proyecto importado en Vercel
- [ ] Despliegue exitoso
- [ ] Verificación de funcionalidades
- [ ] Pruebas en móvil y PC
- [ ] Dominio personalizado (opcional)

---

## 🎉 ¡Listo!

Tu aplicación HighMed estará disponible en:
```
https://highmed-[random].vercel.app
```

Puedes compartir esta URL con cualquier persona para que pruebe la aplicación.

---

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa los logs en Vercel Dashboard
2. Verifica la consola del navegador (F12)
3. Consulta la documentación de Vercel: https://vercel.com/docs

---

**Fecha:** 6 de febrero de 2026  
**Estado:** ✅ Listo para desplegar  
**Repositorio:** https://github.com/chaustrexp/Highmed.git
