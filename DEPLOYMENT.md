# 🚀 Guía de Despliegue - HighMed Dashboard

## 📋 Opciones de Despliegue

### 1. **Netlify** (Recomendado)

#### **Despliegue Automático desde GitHub:**
1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio `chaustrexp/Highmed`
4. Configuración de build:
   ```
   Build command: npm run build
   Publish directory: build
   ```
5. Deploy automático en cada push

#### **URL de ejemplo:**
```
https://highmed-dashboard.netlify.app
```

### 2. **Vercel**

#### **Despliegue desde GitHub:**
1. Ve a [vercel.com](https://vercel.com) y conecta GitHub
2. Importa el repositorio `chaustrexp/Highmed`
3. Vercel detectará automáticamente que es un proyecto React
4. Deploy automático

#### **Configuración:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app"
}
```

### 3. **GitHub Pages**

#### **Configuración:**
1. Instalar gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Agregar al `package.json`:
   ```json
   {
     "homepage": "https://chaustrexp.github.io/Highmed",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Desplegar:
   ```bash
   npm run deploy
   ```

### 4. **Firebase Hosting**

#### **Configuración:**
1. Instalar Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Inicializar Firebase:
   ```bash
   firebase login
   firebase init hosting
   ```

3. Configurar `firebase.json`:
   ```json
   {
     "hosting": {
       "public": "build",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. Desplegar:
   ```bash
   npm run build
   firebase deploy
   ```

## ⚙️ Variables de Entorno

### **Para Producción:**
Crear archivo `.env.production`:
```env
REACT_APP_API_URL=https://api.highmed.com
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
```

### **Para Desarrollo:**
Crear archivo `.env.development`:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_VERSION=1.0.0-dev
REACT_APP_ENVIRONMENT=development
```

## 🔧 Optimizaciones para Producción

### **1. Build Optimizado:**
```bash
npm run build
```

### **2. Análisis del Bundle:**
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### **3. Compresión Gzip:**
Agregar al servidor web:
```nginx
# Nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
gzip_min_length 1000;
```

### **4. Cache Headers:**
```nginx
# Cache estático por 1 año
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache HTML por 1 hora
location / {
    expires 1h;
    add_header Cache-Control "public";
}
```

## 📊 Monitoreo y Analytics

### **1. Google Analytics:**
Agregar al `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **2. Error Tracking (Sentry):**
```bash
npm install @sentry/react
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.REACT_APP_ENVIRONMENT
});
```

## 🔒 Seguridad

### **1. Content Security Policy:**
Agregar al `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com;
               font-src 'self' fonts.gstatic.com;">
```

### **2. HTTPS Redirect:**
```javascript
// En el servidor
if (req.header('x-forwarded-proto') !== 'https') {
  res.redirect(`https://${req.header('host')}${req.url}`);
}
```

## 🚀 CI/CD Pipeline

### **GitHub Actions:**
Crear `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './build'
        production-branch: master
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📱 PWA (Progressive Web App)

### **1. Service Worker:**
Ya incluido en Create React App

### **2. Manifest:**
Actualizar `public/manifest.json`:
```json
{
  "short_name": "HighMed",
  "name": "HighMed - Sistema de Gestión Médica",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#10B981",
  "background_color": "#ffffff"
}
```

## 🔍 SEO Optimization

### **1. Meta Tags:**
```html
<!-- public/index.html -->
<meta name="description" content="HighMed - Sistema integral de gestión médica">
<meta name="keywords" content="salud, medicina, citas médicas, medicamentos">
<meta property="og:title" content="HighMed - Gestión Médica">
<meta property="og:description" content="Sistema integral para la gestión de citas médicas y medicamentos">
<meta property="og:image" content="%PUBLIC_URL%/fondo.png">
```

### **2. Sitemap:**
Generar `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://highmed-dashboard.netlify.app/</loc>
    <lastmod>2026-02-04</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 📈 Performance

### **Métricas Objetivo:**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### **Optimizaciones:**
- Code splitting con React.lazy()
- Imágenes optimizadas (WebP)
- Lazy loading de componentes
- Memoización con React.memo()

---

## 🎯 Checklist de Despliegue

- [ ] Build sin errores
- [ ] Tests pasando
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado configurado
- [ ] HTTPS habilitado
- [ ] Analytics configurado
- [ ] Error tracking configurado
- [ ] Performance optimizada
- [ ] SEO configurado
- [ ] PWA funcional

**¡Tu aplicación HighMed está lista para producción! 🚀**