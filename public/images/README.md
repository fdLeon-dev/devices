# 📁 Estructura de Imágenes - Devices F2

Esta carpeta contiene todas las imágenes públicas del sitio web organizadas por categorías.

## 📂 Estructura de Carpetas

```
public/images/
├── avatars/          # Avatares de clientes para testimonios
├── logos/            # Logos y marcas de Devices F2
├── works/            # Imágenes de trabajos realizados
├── icons/            # Iconos personalizados y favicons
└── README.md         # Este archivo
```

## 🖼️ Especificaciones de Imágenes

### Avatares (`avatars/`)
- **Tamaño recomendado**: 80x80px (cuadrado)
- **Formato**: JPG o PNG
- **Uso**: Testimonios de clientes
- **Naming**: `cliente-nombre.jpg` (ej: `carlos-mendoza.jpg`)

### Logos (`logos/`)
- **Tamaño recomendado**: 
  - Logo principal: 200x60px
  - Logo navbar: 40x40px
  - Favicon: 32x32px, 16x16px
- **Formato**: PNG (con transparencia)
- **Uso**: Header, footer, favicon
- **Naming**: `logo-devices-f2-[tamaño].png`

### Trabajos (`works/`)
- **Tamaño recomendado**: 400x300px
- **Formato**: JPG (optimizado)
- **Uso**: Galería de trabajos realizados
- **Naming**: `trabajo-[categoria]-[numero].jpg`
- **Ejemplos**: 
  - `trabajo-gaming-01.jpg`
  - `trabajo-reparacion-01.jpg`
  - `trabajo-upgrade-01.jpg`

### Iconos (`icons/`)
- **Tamaño recomendado**: 32x32px, 64x64px
- **Formato**: PNG (con transparencia)
- **Uso**: Favicons, iconos personalizados
- **Naming**: `icon-[nombre].png`

## 🚀 Optimización de Imágenes

### Antes de subir:
1. **Comprimir** las imágenes (usar herramientas como TinyPNG)
2. **Redimensionar** al tamaño exacto necesario
3. **Usar WebP** cuando sea posible (con fallback JPG/PNG)
4. **Nombres descriptivos** y sin espacios

### Herramientas recomendadas:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: Para Mac
- **GIMP**: Para edición gratuita

## 📝 Notas Importantes

- Todas las imágenes deben tener **alt text** descriptivo
- Usar **lazy loading** para imágenes de la galería
- Mantener **consistencia visual** en todas las imágenes
- **Backup** de imágenes originales en alta resolución

## 🔄 Actualización de Referencias

Cuando agregues nuevas imágenes, recuerda actualizar:
1. Las rutas en `index.html`
2. Los atributos `alt` para accesibilidad
3. Los metadatos de `manifest.json` si es necesario

---

**💡 Tip**: Mantén esta estructura organizada para facilitar el mantenimiento del sitio.
