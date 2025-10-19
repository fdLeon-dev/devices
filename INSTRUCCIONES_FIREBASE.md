# 🔥 Instrucciones para Configurar Firebase - Sistema de Testimonios en Tiempo Real

Este documento te guiará paso a paso para configurar Firebase y habilitar el sistema de testimonios en tiempo real con "Me gusta" en tu sitio web de Devices F2.

## 📋 Requisitos Previos

- Una cuenta de Google
- Acceso al código fuente del proyecto
- Navegador web moderno

## 🚀 Paso 1: Crear un Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Ingresa el nombre del proyecto: `devices-f2` (o el nombre que prefieras)
4. (Opcional) Desactiva Google Analytics si no lo necesitas
5. Haz clic en **"Crear proyecto"**

## 🌐 Paso 2: Registrar tu Aplicación Web

1. En la pantalla principal de tu proyecto, haz clic en el ícono **</>** (Web)
2. Registra tu app con el nombre: `Devices F2 Landing`
3. **NO** marques la casilla de "Firebase Hosting" (ya usas Vercel)
4. Haz clic en **"Registrar app"**

## 🔑 Paso 3: Obtener las Credenciales de Firebase

Firebase te mostrará un código de configuración similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "devices-f2.firebaseapp.com",
  projectId: "devices-f2",
  storageBucket: "devices-f2.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**¡COPIA ESTOS VALORES!** Los necesitarás en el siguiente paso.

## 📝 Paso 4: Configurar el Archivo firebase-config.js

1. Abre el archivo `firebase-config.js` en tu proyecto
2. Reemplaza los valores de ejemplo con tus credenciales reales:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",                    // ← Reemplaza esto
  authDomain: "TU_PROJECT_ID.firebaseapp.com",  // ← Reemplaza esto
  projectId: "TU_PROJECT_ID",                   // ← Reemplaza esto
  storageBucket: "TU_PROJECT_ID.appspot.com",   // ← Reemplaza esto
  messagingSenderId: "TU_MESSAGING_SENDER_ID",  // ← Reemplaza esto
  appId: "TU_APP_ID"                            // ← Reemplaza esto
};
```

3. Guarda el archivo

## 🗄️ Paso 5: Crear la Base de Datos Firestore

1. En Firebase Console, ve al menú lateral izquierdo
2. Haz clic en **"Firestore Database"**
3. Haz clic en **"Crear base de datos"** o **"Create database"**
4. Selecciona el modo de inicio:
   - **Producción**: Más seguro pero requiere reglas
   - **Prueba**: Más fácil para empezar (recomendado inicialmente)
5. Selecciona la ubicación del servidor (recomendado: `southamerica-east1` para Uruguay)
6. Haz clic en **"Habilitar"** o **"Enable"**

## 🔐 Paso 6: Configurar las Reglas de Seguridad

**⚠️ IMPORTANTE:** Si elegiste modo de prueba, las reglas expirarán en 30 días. Configura reglas permanentes:

1. En Firestore Database, ve a la pestaña **"Reglas"** o **"Rules"**
2. Reemplaza las reglas existentes con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para la colección de testimonios
    match /testimonios/{testimonioId} {
      // Cualquiera puede leer los testimonios
      allow read: if true;
      
      // Cualquiera puede crear testimonios (con validación)
      allow create: if request.resource.data.keys().hasAll(['nombre', 'comentario', 'imagen', 'fecha', 'likes', 'likedBy', 'aprobado'])
                    && request.resource.data.nombre is string
                    && request.resource.data.nombre.size() > 0
                    && request.resource.data.nombre.size() <= 50
                    && request.resource.data.comentario is string
                    && request.resource.data.comentario.size() >= 10
                    && request.resource.data.comentario.size() <= 500
                    && request.resource.data.imagen is string
                    && request.resource.data.likes == 0
                    && request.resource.data.likedBy.size() == 0
                    && request.resource.data.aprobado == false;
      
      // Solo se pueden actualizar los likes y el array de likedBy
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes', 'likedBy'])
                    && request.resource.data.likes >= 0
                    && request.resource.data.likedBy is list;
      
      // Nadie puede eliminar testimonios desde el cliente
      allow delete: if false;
    }
  }
}
```

3. Haz clic en **"Publicar"** o **"Publish"**

## ✅ Paso 7: Verificar que Todo Funciona

1. Guarda todos los cambios en tu código
2. Si estás trabajando localmente, asegúrate de que el servidor esté corriendo
3. Abre tu sitio web
4. Ve a la sección "Lo que dicen nuestros clientes"
5. Deberías ver el formulario para agregar testimonios
6. Intenta agregar un testimonio de prueba
7. Si todo está bien, el testimonio aparecerá en tiempo real

## 🎨 Características del Sistema

### ✨ Lo que Puedes Hacer

- ✅ **Agregar testimonios** en tiempo real
- ✅ **Subir foto de perfil** personalizada (obligatoria)
- ✅ **Ver testimonios** de otros usuarios al instante
- ✅ **Dar "Me gusta"** a testimonios
- ✅ **Contador de likes** actualizado en vivo
- ✅ **Fecha relativa** (hace X minutos/horas/días)
- ✅ **Validación** de contenido (nombre, comentario e imagen)
- ✅ **Límite de caracteres** (500 máximo)
- ✅ **Validación de imágenes** (JPG, PNG, GIF - máx 2MB)
- ✅ **Vista previa** de imagen antes de enviar
- ✅ **Protección XSS** (seguridad contra ataques)
- ✅ **Diseño responsive** para móviles

### 🛡️ Seguridad Implementada

- ✅ Reglas de Firestore que validan datos
- ✅ Límites de longitud en nombre y comentario
- ✅ Protección contra spam con validación del lado del servidor
- ✅ Escape de HTML para prevenir XSS
- ✅ Sistema de likes con verificación de usuario único

## 🔧 Administración de Testimonios

### Ver Testimonios en Firebase Console

1. Ve a **Firestore Database** en Firebase Console
2. Haz clic en la colección **testimonios**
3. Verás todos los testimonios con su información

### Eliminar un Testimonio Inapropiado

1. En Firestore Database, abre la colección **testimonios**
2. Encuentra el testimonio que quieres eliminar
3. Haz clic en los tres puntos ⋮ al lado derecho
4. Selecciona **"Eliminar documento"**

### Moderar Testimonios (Opcional)

El sistema incluye un campo `aprobado: false` por defecto. Si quieres implementar moderación:

1. Modifica las reglas de Firestore para filtrar solo testimonios aprobados
2. Usa Firebase Console para aprobar testimonios manualmente
3. O crea un panel de administración personalizado

## 📊 Monitoreo y Límites

### Límites del Plan Gratuito de Firebase

Firebase ofrece un generoso plan gratuito:

- **Documentos leídos**: 50,000 por día
- **Documentos escritos**: 20,000 por día
- **Documentos eliminados**: 20,000 por día
- **Almacenamiento**: 1 GB

Para un sitio de testimonios, estos límites son más que suficientes.

### Ver Uso de Recursos

1. En Firebase Console, ve a **"Uso"** en el menú lateral
2. Aquí verás cuántas operaciones de lectura/escritura has usado

## 🚨 Solución de Problemas

### Error: "Firebase no configurado"

**Solución**: Verifica que hayas reemplazado las credenciales en `firebase-config.js`

### Error: "Permission denied"

**Solución**: 
1. Ve a Firestore Database > Reglas
2. Verifica que las reglas estén publicadas correctamente
3. Asegúrate de que la fecha de expiración no haya pasado (si usaste modo de prueba)

### Los testimonios no aparecen en tiempo real

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca mensajes de error
3. Verifica que Firebase se esté inicializando correctamente
4. Comprueba que la conexión a internet esté activa

### Error: "Missing or insufficient permissions"

**Solución**: Las reglas de Firestore son demasiado restrictivas. Vuelve al Paso 6 y actualiza las reglas.

## 🎯 Próximos Pasos

Una vez que el sistema esté funcionando, puedes:

1. **Personalizar el diseño** de las tarjetas de testimonios
2. **Agregar moderación** de comentarios antes de publicarlos
3. **Implementar notificaciones** cuando lleguen nuevos testimonios
4. **Agregar sistema de reportes** para testimonios inapropiados
5. **Crear un panel de administración** para gestionar testimonios

## 📱 Contacto y Soporte

Si tienes problemas con la configuración:

- 📧 Email: devices.f02@gmail.com
- 📱 WhatsApp: +598 92 803 418
- 📸 Instagram: @devices_.f2

## 📚 Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Guía de Firestore](https://firebase.google.com/docs/firestore)
- [Reglas de Seguridad](https://firebase.google.com/docs/firestore/security/get-started)

---

**¡Listo!** Tu sistema de testimonios en tiempo real está configurado y funcionando. 🎉

Los clientes ahora pueden dejar sus comentarios y dar "Me gusta" en tiempo real. ¡Disfruta de tu nueva funcionalidad! 🚀

