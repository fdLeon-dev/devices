# 🔴 SOLUCIÓN AL ERROR 404 EN VERCEL

## ⚠️ EL PROBLEMA

Vercel busca `index.html` en la raíz de tu repositorio, pero está en la carpeta `devices/`

```
devices2/           ← Vercel busca aquí (ERROR ❌)
└── devices/
    └── index.html  ← Tu archivo está aquí ✅
```

---

## ✅ SOLUCIÓN: Configurar Root Directory

### OPCIÓN 1: Desde Vercel Dashboard (Recomendado)

1. **Ve a**: https://vercel.com/dashboard
2. **Click** en tu proyecto "devices-f2" o "devices2"
3. **Click** en la pestaña **"Settings"** (arriba)
4. **Busca** la sección **"General"** (debería ser la primera)
5. **Busca** el campo **"Root Directory"**
   - Verás algo como: `Root Directory: ./` o vacío
6. **Click** en **"Edit"** (al lado derecho)
7. **Escribe**: `devices` (sin espacios, sin barra)
8. **Click** en **"Save"**
9. **Ve** a la pestaña **"Deployments"** (arriba)
10. **Click** en los 3 puntos **"..."** del deployment más reciente
11. **Click** en **"Redeploy"**
12. ✅ Listo, espera 30 segundos

---

### OPCIÓN 2: Borrar y Crear Nuevo Proyecto

Si la Opción 1 no funciona:

1. **Borra el proyecto actual**:
   - Ve a Settings → General
   - Scroll hasta el final
   - Click en "Delete Project"

2. **Crea uno nuevo**:
   - Click en "Add New..." → "Project"
   - Selecciona tu repo `devices2`
   - **EN ESTA PANTALLA VERÁS**:
   
   ```
   Configure Project
   
   Root Directory
   ┌──────────────────────────────────┐
   │ ./                          Edit │  ← Click en "Edit"
   └──────────────────────────────────┘
   ```
   
   - Click en "Edit"
   - Aparecerá un cuadro de texto
   - **Escribe**: `devices`
   - Click fuera del cuadro
   - Ahora debería verse:
   
   ```
   Root Directory
   ┌──────────────────────────────────┐
   │ devices                     Edit │
   └──────────────────────────────────┘
   ```

3. **Deploy**:
   - Click en "Deploy"
   - ✅ Debería funcionar ahora

---

## 🎯 CAPTURA DE PANTALLA GUÍA

Busca esta sección en Vercel:

```
┌─────────────────────────────────────────┐
│ General                                 │
├─────────────────────────────────────────┤
│                                         │
│ Root Directory                          │
│ By default, your project's source code │
│ is expected to be at the root.          │
│                                         │
│ ┌─────────────────────────┐            │
│ │ devices            Edit │ ← Aquí     │
│ └─────────────────────────┘            │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔍 VERIFICAR QUE FUNCIONE

Después del deploy exitoso:
1. Abre la URL de tu proyecto
2. Deberías ver tu landing page
3. Si ves "404: NOT_FOUND" → revisa el Root Directory nuevamente

---

## 📱 ALTERNATIVA: Subir archivos a la raíz del repo

Si nada funciona, podemos mover los archivos:

```bash
# Desde la carpeta devices
cd ..
mv devices/* .
rm -rf devices
git add .
git commit -m "Move files to root"
git push
```

Pero esta opción requiere modificar tu estructura de carpetas.

---

## 💡 RESUMEN

**El error 404 se soluciona configurando:**
- Root Directory = `devices`

**NO dejes:**
- Root Directory = `./`
- Root Directory = vacío
- Root Directory = `/`

