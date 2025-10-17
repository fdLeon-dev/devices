@echo off
echo 🚀 Desplegando Devices F2 a GitHub Pages...
echo.

echo 📁 Agregando archivos...
git add .

echo 💾 Haciendo commit...
git commit -m "Actualización del sitio web Devices F2"

echo 🚀 Subiendo a GitHub...
git push origin main

echo.
echo ✅ ¡Despliegue completado!
echo 🌐 Tu sitio estará disponible en: https://TU_USUARIO.github.io/devices-f2
echo.
echo ⏳ Espera 1-2 minutos para que GitHub Pages actualice el sitio.
pause
