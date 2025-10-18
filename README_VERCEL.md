# Despliegue en Vercel - Devices F2

## 📦 Pasos para Desplegar

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub** (si aún no lo has hecho):
   ```bash
   git add .
   git commit -m "Configuración para Vercel"
   git push origin main
   ```

2. **Ve a [Vercel](https://vercel.com)**
   - Inicia sesión con tu cuenta de GitHub

3. **Importa tu proyecto**:
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un sitio estático

4. **Configura el proyecto** (opcional):
   - **Project Name**: devices-f2 (o el nombre que prefieras)
   - **Framework Preset**: Other (o déjalo en auto-detect)
   - **Root Directory**: `./` (o selecciona la carpeta `devices` si es necesario)
   - **Build Command**: (déjalo vacío para sitios estáticos)
   - **Output Directory**: `./` (déjalo vacío)

5. **Deploy**:
   - Click en "Deploy"
   - Espera unos segundos y tu sitio estará en línea

### Opción 2: Despliegue con Vercel CLI

1. **Instala Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Inicia sesión**:
   ```bash
   vercel login
   ```

3. **Despliega el proyecto**:
   ```bash
   vercel
   ```
   - Sigue las instrucciones en pantalla
   - Responde las preguntas de configuración

4. **Para despliegue en producción**:
   ```bash
   vercel --prod
   ```

## 🔧 Configuración

El archivo `vercel.json` ya está configurado con:
- ✅ Rutas optimizadas
- ✅ URLs limpias
- ✅ Service Worker configurado
- ✅ Headers optimizados

## 🌐 Dominio Personalizado

Para agregar un dominio personalizado:

1. Ve a tu proyecto en Vercel Dashboard
2. Click en "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los DNS

## 🚀 Actualizaciones Automáticas

Cada vez que hagas push a tu rama principal en GitHub, Vercel automáticamente:
- 🔄 Detectará los cambios
- 🏗️ Construirá tu sitio
- 📤 Desplegará la nueva versión

## 📊 Variables de Entorno

Si necesitas variables de entorno:

1. Ve a "Settings" → "Environment Variables" en tu proyecto de Vercel
2. Agrega las variables necesarias
3. Redeploy el proyecto

## 🎯 URLs del Proyecto

Después del despliegue, obtendrás:
- **Production URL**: `https://devices-f2.vercel.app`
- **Preview URLs**: URLs únicas para cada push en ramas diferentes

## 🔍 Verificación

Para verificar que todo funciona:
- ✅ Navega por todas las secciones
- ✅ Prueba el modo oscuro
- ✅ Verifica el menú responsive
- ✅ Prueba los enlaces de WhatsApp
- ✅ Verifica que las imágenes carguen correctamente

## 📱 PWA

El Service Worker (`sw.js`) está configurado para funcionar en producción. Después del despliegue:
- Los usuarios podrán instalar la app
- El sitio funcionará offline después de la primera visita

## 🆘 Solución de Problemas

### Las imágenes no cargan
- Verifica que las rutas en `public/images/` sean correctas
- Asegúrate de que las imágenes estén subidas al repositorio

### El Service Worker no funciona
- Vercel sirve sobre HTTPS automáticamente
- El SW solo funciona en producción, no en localhost

### Error 404
- Verifica que `index.html` esté en la raíz del proyecto
- Revisa la configuración de `vercel.json`

## 📞 Soporte

Si tienes problemas, consulta:
- [Documentación de Vercel](https://vercel.com/docs)
- [Foro de la comunidad](https://github.com/vercel/vercel/discussions)

