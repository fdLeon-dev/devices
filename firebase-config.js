// Configuración de Firebase para Devices F2
// IMPORTANTE: Debes reemplazar estos valores con tus propias credenciales de Firebase
// Para obtener tu configuración:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto o selecciona uno existente
// 3. Ve a Configuración del proyecto > Tus apps > SDK de Firebase
// 4. Copia la configuración y pégala aquí

const firebaseConfig = {
  apiKey: "AIzaSyCOpKYq8zf09y3GFurGauAtI7H2-PxLWS8",
  authDomain: "devices-41420.firebaseapp.com",
  projectId: "devices-41420",
  storageBucket: "devices-41420.firebasestorage.app",
  messagingSenderId: "921739795305",
  appId: "1:921739795305:web:9cd3558137eb748006bbf8",
  measurementId: "G-G4DX09CSR3"
};
// Inicializar Firebase
let db;
let testimoniosRef;

function initFirebase() {
  // Verificar si Firebase está cargado
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK no está cargado');
    return false;
  }

  try {
    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    testimoniosRef = db.collection('testimonios');

    console.log('Firebase inicializado correctamente');
    return true;
  } catch (error) {
    console.error('Error al inicializar Firebase:', error);
    return false;
  }
}

// Función para agregar un testimonio (DEPRECADA - usar agregarTestimonioConImagen)
async function agregarTestimonio(nombre, comentario) {
  try {
    const testimonio = {
      nombre: nombre,
      comentario: comentario,
      imagen: '', // Campo vacío para compatibilidad
      likes: 0,
      likedBy: [],
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      aprobado: false // Moderación opcional
    };

    const docRef = await testimoniosRef.add(testimonio);
    console.log('Testimonio agregado con ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al agregar testimonio:', error);
    return { success: false, error: error.message };
  }
}

// NOTA: Esta función es mantenida por compatibilidad pero se recomienda
// usar agregarTestimonioConImagen() definida en script.js

// Función para dar like a un testimonio
async function toggleLike(testimonioId, userId) {
  try {
    const docRef = testimoniosRef.doc(testimonioId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error('Testimonio no encontrado');
    }

    const data = doc.data();
    const likedBy = data.likedBy || [];
    const hasLiked = likedBy.includes(userId);

    if (hasLiked) {
      // Quitar like
      await docRef.update({
        likes: firebase.firestore.FieldValue.increment(-1),
        likedBy: firebase.firestore.FieldValue.arrayRemove(userId)
      });
    } else {
      // Agregar like
      await docRef.update({
        likes: firebase.firestore.FieldValue.increment(1),
        likedBy: firebase.firestore.FieldValue.arrayUnion(userId)
      });
    }

    return { success: true, hasLiked: !hasLiked };
  } catch (error) {
    console.error('Error al dar like:', error);
    return { success: false, error: error.message };
  }
}

// Función para obtener testimonios en tiempo real
function escucharTestimonios(callback) {
  return testimoniosRef
    .orderBy('fecha', 'desc')
    .limit(50)
    .onSnapshot((snapshot) => {
      const testimonios = [];
      snapshot.forEach((doc) => {
        testimonios.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(testimonios);
    }, (error) => {
      console.error('Error al escuchar testimonios:', error);
      callback([]);
    });
}

// Función para generar ID de usuario único (para el sistema de likes)
function obtenerUserId() {
  let userId = localStorage.getItem('devicesf2_userId');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('devicesf2_userId', userId);
  }
  return userId;
}

