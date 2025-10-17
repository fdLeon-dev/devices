# 🌐 GitHub Pages - Devices F2

## 📋 Pasos para Desplegar en GitHub Pages:

### 1. **Subir el Código a GitHub**
```bash
# Si no tienes repositorio remoto:
git remote add origin https://github.com/TU_USUARIO/devices-f2.git

# Subir todos los archivos:
git add .
git commit -m "Sitio web Devices F2 listo para GitHub Pages"
git push -u origin main
```

### 2. **Configurar GitHub Pages**
1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. Scroll hacia abajo hasta **Pages**
4. En **Source**, selecciona **Deploy from a branch**
5. En **Branch**, selecciona **main**
6. En **Folder**, selecciona **/ (root)**
7. Click **Save**

### 3. **Esperar el Despliegue**
- GitHub Pages tardará 1-2 minutos en desplegar
- Tu sitio estará disponible en: `https://TU_USUARIO.github.io/devices-f2`

### 4. **Verificar el Sitio**
- Visita la URL generada
- Verifica que todas las imágenes carguen correctamente
- Prueba el modo oscuro y todas las funcionalidades

## 🔧 **Configuración Adicional:**

### **Dominio Personalizado (Opcional)**
Si quieres usar tu propio dominio:
1. Crea un archivo `CNAME` en la raíz del proyecto
2. Escribe tu dominio: `devicesf2.com`
3. Configura los DNS de tu dominio para apuntar a GitHub Pages

### **Actualizaciones**
Para actualizar el sitio:
```bash
git add .
git commit -m "Actualización del sitio"
git push origin main
```

## 📁 **Estructura del Proyecto:**
```
devices/
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # JavaScript
├── manifest.json       # PWA
├── sw.js              # Service Worker
├── .nojekyll          # Configuración GitHub Pages
├── public/            # Imágenes y assets
│   └── images/
│       ├── avatars/
│       ├── logos/
│       └── works/
└── README.md          # Documentación
```

## ✅ **Ventajas de GitHub Pages:**
- **Gratis** para repositorios públicos
- **HTTPS** automático
- **CDN global** para carga rápida
- **Actualizaciones automáticas** con git push
- **Dominio personalizado** opcional

## 🚨 **Notas Importantes:**
- Asegúrate de que todas las rutas de imágenes sean correctas
- El archivo `.nojekyll` es importante para que funcione
- Las imágenes deben estar en la carpeta `public/images/`
- GitHub Pages solo sirve archivos estáticos (HTML, CSS, JS)

¡Tu sitio estará online en minutos! 🎉
