# 🔴 INSTRUCCIONES PASO A PASO PARA ARREGLAR VERCEL

## ⚠️ PROBLEMA ACTUAL
Tu sitio da 404 porque Vercel tiene configurado Root Directory = `devices` pero tu index.html está en la RAÍZ del repositorio.

---

## ✅ SOLUCIÓN EN 10 PASOS EXACTOS:

### PASO 1: Abre Vercel
Ve a: https://vercel.com/dashboard

### PASO 2: Busca tu proyecto
Verás una lista de proyectos. Click en el que dice "devices" o "devices2"

### PASO 3: Ve a Settings
En la parte superior, verás estas pestañas:
- Overview
- Deployments
- Analytics
- **Settings** ← Click aquí

### PASO 4: Busca "General"
Ya deberías estar en la sección "General" (es la primera)

### PASO 5: Scroll hasta "Root Directory"
Baja hasta ver una sección que dice:
```
Root Directory
By default, your project's source code is expected to be at the root.
```

### PASO 6: Click en "Edit"
Verás algo como:
```
┌──────────────────────┐
│ devices         Edit │ ← Click en "Edit"
└──────────────────────┘
```

### PASO 7: BORRA TODO
- Se abrirá un campo de texto
- **BORRA** la palabra "devices"
- **DEJA EL CAMPO VACÍO**

### PASO 8: Guarda
- Click en "Save" (abajo a la derecha)
- Deberías ver un mensaje de confirmación

### PASO 9: Ve a Deployments
- Click en la pestaña "Deployments" (arriba)

### PASO 10: Redeploy
- Busca el deployment más reciente
- Click en los 3 puntos "..." a la derecha
- Click en "Redeploy"
- Espera 30-60 segundos

---

## 🎯 VERIFICACIÓN FINAL

Después del Redeploy:
1. Abre la URL de tu proyecto
2. Deberías ver tu landing page de Devices F2
3. Si ves "404", refresca con Ctrl+F5

---

## ⚙️ CONFIGURACIÓN CORRECTA FINAL:

```
✅ Root Directory:    (vacío - sin texto)
✅ Framework Preset:  Other
✅ Build Command:     (vacío)
✅ Install Command:   (vacío)
✅ Output Directory:  (vacío)
```

---

## 🔍 SI SIGUE DANDO ERROR:

### Opción A: Borra y crea nuevo proyecto
1. Settings → General → Scroll al final
2. "Delete Project" → Confirma
3. Dashboard → "Add New..." → "Project"
4. Selecciona tu repo "devices2" o "devices"
5. **NO toques nada** en Root Directory (déjalo vacío)
6. Click "Deploy"

### Opción B: Verifica el repositorio
Asegúrate de que Vercel esté conectado a:
- `https://github.com/fdLeon-dev/devices.git`
O
- `https://github.com/fdLeon-dev/devices2.git`

---

## 📞 RESUMEN

**El error es**: Root Directory = `devices`
**La solución es**: Root Directory = vacío (sin nada)

Tu `index.html` está en la raíz del repo, no en una subcarpeta.

