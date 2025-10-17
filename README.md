# Devices F2 - Sitio Web del Servicio Técnico

Sitio web moderno y profesional para el servicio técnico de reparación y ensamblaje de computadoras Devices F2.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con tema claro/oscuro
- **Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Rápido**: Carga optimizada con lazy loading de imágenes
- **Accesible**: Cumple con estándares de accesibilidad web
- **SEO Optimizado**: Meta tags y estructura semántica
- **Analytics**: Integración con Google Analytics
- **PWA Ready**: Preparado para funcionar como aplicación web

## 🎨 Diseño

- **Colores**: Violeta (#8a2be2) como color principal, con tema claro/oscuro
- **Tipografía**: Inter (sans-serif moderna y legible)
- **Iconos**: Font Awesome para una experiencia visual consistente
- **Animaciones**: Efectos sutiles y transiciones suaves

## 📱 Secciones

1. **Navbar**: Navegación fija con logo y menú responsive
2. **Hero**: Sección principal con mensaje de bienvenida
3. **Servicios**: Tarjetas con los servicios ofrecidos
4. **Trabajos**: Galería de proyectos realizados
5. **Cotización**: Formulario para solicitar presupuestos
6. **Contacto**: Información de contacto y redes sociales
7. **Footer**: Información básica y derechos de autor

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y Grid/Flexbox
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Inter

## 📦 Instalación

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador web
3. ¡Listo! No requiere instalación adicional

## ⚙️ Configuración

### Google Analytics
Para habilitar Google Analytics, reemplaza `GA_MEASUREMENT_ID` en el archivo `index.html` con tu ID de medición real.

### Información de Contacto
Actualiza la siguiente información en `index.html`:
- Número de teléfono
- Email de contacto
- Ubicación
- Enlaces de redes sociales

### Imágenes
El proyecto incluye una estructura organizada para imágenes en la carpeta `public/images/`:

#### Estructura de Carpetas:
```
public/images/
├── avatars/          # Avatares de clientes (80x80px)
├── logos/            # Logos y favicons (200x60px, 32x32px)
├── works/            # Imágenes de trabajos (400x300px)
├── icons/            # Iconos personalizados
├── config.json       # Configuración de imágenes
└── README.md         # Documentación de imágenes
```

#### Para usar imágenes propias:
1. **Avatares**: Coloca fotos de clientes en `public/images/avatars/`
2. **Trabajos**: Coloca fotos de trabajos en `public/images/works/`
3. **Logos**: Coloca logos en `public/images/logos/`
4. **Formato**: Usa JPG para fotos, PNG para logos, WebP para optimización
5. **Fallback**: Las URLs de Unsplash se usan como respaldo automático

#### Nombres recomendados:
- Avatares: `cliente-nombre.jpg`
- Trabajos: `trabajo-categoria-numero.jpg`
- Logos: `logo-devices-f2-[tamaño].png`

## 🎯 Funcionalidades

### Formulario de Cotización
- Validación de campos requeridos
- Envío automático a WhatsApp
- Notificaciones de confirmación
- Estados de carga

### Modo Oscuro
- Toggle en la navbar
- Preferencia guardada en localStorage
- Transiciones suaves entre temas

### Navegación
- Scroll suave entre secciones
- Menú móvil hamburguesa
- Navbar que se oculta/muestra al hacer scroll

### Optimizaciones
- Lazy loading de imágenes
- Debounce en eventos de scroll
- Código modular y comentado

## 📱 Responsive Design

El sitio está optimizado para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Personalización

### Colores
Modifica las variables CSS en `:root` para cambiar la paleta de colores:

```css
:root {
    --primary-color: #8a2be2;
    --secondary-color: #2c2c2c;
    /* ... más variables */
}
```

### Contenido
- Actualiza los textos en `index.html`
- Modifica las imágenes en la galería
- Ajusta la información de contacto

## 📈 SEO y Performance

- Meta tags optimizados
- Estructura semántica HTML5
- Imágenes con lazy loading
- CSS y JS minificables
- Código limpio y comentado

## 🚀 Despliegue

Para desplegar el sitio:
1. Sube todos los archivos a tu servidor web
2. Asegúrate de que `index.html` esté en la raíz
3. Configura HTTPS para mejor seguridad
4. Actualiza los enlaces de contacto

## 📞 Soporte

Para soporte técnico o consultas sobre el sitio web, contacta a Devices F2:
- WhatsApp: +52 55 1234 5678
- Email: contacto@devicesf2.com
- Instagram: @devices_.f2

## 📄 Licencia

© 2024 Devices F2. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Devices F2**
