// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const quoteForm = document.getElementById('quote-form');
const currentYear = document.getElementById('current-year');

// New elements for enhanced features
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialDots = document.querySelectorAll('.dot');
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');
const statNumbers = document.querySelectorAll('.stat-number');

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  // Set current year
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Initialize theme
  initializeTheme();

  // Initialize lazy loading
  initializeLazyLoading();

  // Initialize smooth scrolling
  initializeSmoothScrolling();

  // Initialize form handling
  initializeFormHandling();

  // Initialize mobile menu
  initializeMobileMenu();

  // Initialize navbar scroll effect
  initializeNavbarScroll();

  // Initialize new features
  initializeTestimonials();
  initializeCalculator();
  initializeWorkFilters();
  initializeStats();
  initializeWhatsApp();
}

// Theme Toggle
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Lazy Loading
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      img.classList.add('lazy');
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.classList.add('loaded');
    });
  }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 75; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  });
}

// Form Handling
function initializeFormHandling() {
  if (quoteForm) {
    quoteForm.addEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(quoteForm);
  const data = Object.fromEntries(formData);

  // Show loading state
  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Show success message
    showNotification('¡Cotización enviada! Te contactaremos pronto.', 'success');

    // Reset form
    quoteForm.reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Send to WhatsApp (optional)
    sendToWhatsApp(data);
  }, 2000);
}

function sendToWhatsApp(data) {
  const message = `Hola! Me interesa solicitar una cotización para ${data.service}.\n\n` +
    `Nombre: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Teléfono: ${data.phone}\n` +
    `Mensaje: ${data.message}`;

  const whatsappUrl = `https://wa.me/59892803418?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Mobile Menu
function initializeMobileMenu() {
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
  let lastScrollTop = 0;
  let ticking = false;

  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Agregar/quitar clase scrolled
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Ocultar/mostrar navbar al hacer scroll hacia abajo/arriba
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down - hide navbar
      navbar.classList.add('hidden');
    } else {
      // Scrolling up - show navbar
      navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 15px 20px;
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

  if (type === 'success') {
    notification.style.borderLeft = '4px solid #25d366';
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-content i {
        color: var(--primary-color);
        font-size: 1.2rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: var(--bg-accent);
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization
const debouncedScroll = debounce(function () {
  // Any scroll-based performance optimizations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed');
      });
  });
}

// Analytics Events
function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
}

// Track form submissions
if (quoteForm) {
  quoteForm.addEventListener('submit', function () {
    trackEvent('form_submit', {
      form_name: 'quote_form'
    });
  });
}

// Track button clicks
document.addEventListener('click', function (e) {
  if (e.target.matches('.btn-primary')) {
    trackEvent('button_click', {
      button_text: e.target.textContent,
      button_type: 'primary'
    });
  }
});

// Track WhatsApp clicks
document.addEventListener('click', function (e) {
  if (e.target.closest('.whatsapp-float') || e.target.closest('[href*="wa.me"]')) {
    trackEvent('whatsapp_click', {
      source: e.target.closest('.whatsapp-float') ? 'float_button' : 'contact_section'
    });
  }
});

// Error Handling
window.addEventListener('error', function (e) {
  console.error('JavaScript Error:', e.error);
  trackEvent('javascript_error', {
    error_message: e.error.message,
    error_filename: e.filename,
    error_lineno: e.lineno
  });
});

// Testimonials Carousel
function initializeTestimonials() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Event listeners
  if (testimonialNext) {
    testimonialNext.addEventListener('click', nextSlide);
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', prevSlide);
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

// Calculator Functionality
function initializeCalculator() {
  const serviceType = document.getElementById('service-type');
  const urgency = document.getElementById('urgency');
  const warranty = document.getElementById('warranty');

  const basePriceEl = document.getElementById('base-price');
  const urgencyPriceEl = document.getElementById('urgency-price');
  const warrantyPriceEl = document.getElementById('warranty-price');
  const totalPriceEl = document.getElementById('total-price');

  function calculatePrice() {
    const servicePrice = parseFloat(serviceType.selectedOptions[0]?.dataset.price) || 0;
    const urgencyMultiplier = parseFloat(urgency.selectedOptions[0]?.dataset.multiplier) || 1;
    const warrantyPrice = parseFloat(warranty.selectedOptions[0]?.dataset.price) || 0;

    const urgencyCost = servicePrice * (urgencyMultiplier - 1);
    const total = servicePrice + urgencyCost + warrantyPrice;

    basePriceEl.textContent = `$${servicePrice.toLocaleString()}`;
    urgencyPriceEl.textContent = `$${urgencyCost.toLocaleString()}`;
    warrantyPriceEl.textContent = `$${warrantyPrice.toLocaleString()}`;
    totalPriceEl.textContent = `$${total.toLocaleString()}`;
  }

  if (serviceType) serviceType.addEventListener('change', calculatePrice);
  if (urgency) urgency.addEventListener('change', calculatePrice);
  if (warranty) warranty.addEventListener('change', calculatePrice);
}

// Work Filters
function initializeWorkFilters() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter work cards
      workCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Statistics Counter Animation
function initializeStats() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Enhanced WhatsApp Quote Function
function openWhatsAppQuote() {
  const serviceType = document.getElementById('service-type');
  const urgency = document.getElementById('urgency');
  const warranty = document.getElementById('warranty');

  const serviceName = serviceType.selectedOptions[0]?.textContent || 'Servicio';
  const urgencyText = urgency.selectedOptions[0]?.textContent || 'Normal';
  const warrantyText = warranty.selectedOptions[0]?.textContent || '30 días';

  const message = `¡Hola! Me interesa cotizar un servicio:\n\n` +
    `📋 Servicio: ${serviceName}\n` +
    `⏰ Urgencia: ${urgencyText}\n` +
    `🛡️ Garantía: ${warrantyText}\n\n` +
    `¿Podrían darme más información sobre el proceso y precios?`;

  const whatsappUrl = `https://wa.me/59892803418?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  // Track event
  trackEvent('calculator_whatsapp_click', {
    service_type: serviceName,
    urgency: urgencyText,
    warranty: warrantyText
  });
}

// Enhanced animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.service-card, .work-card, .testimonial-content, .contact-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
}


// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Console welcome message
console.log('%c🚀 Devices F2 - Website Loaded Successfully!', 'color: #8a2be2; font-size: 16px; font-weight: bold;');
console.log('%c💻 Servicio técnico profesional de computadoras', 'color: #666; font-size: 12px;');
console.log('%c✨ Enhanced with testimonials, calculator, and filters!', 'color: #8a2be2; font-size: 12px;');

// ============================================
// Sistema de Testimonios en Tiempo Real
// ============================================

let unsubscribeTestimonios = null;
let currentUserId = null;

// Inicializar sistema de testimonios
function initializeRealtimeTestimonials() {
  // Obtener o generar ID de usuario
  currentUserId = obtenerUserId();

  // Intentar inicializar Firebase
  const firebaseInitialized = initFirebase();

  if (!firebaseInitialized) {
    console.log('Firebase no configurado. El sistema de testimonios no estará disponible.');
    showTestimonialsOfflineMessage();
    return;
  }

  // Configurar contador de caracteres
  setupCharacterCounter();

  // Configurar carga de imagen
  setupImageUpload();

  // Configurar formulario de testimonios
  setupTestimonialForm();

  // Cargar testimonios en tiempo real
  loadRealtimeTestimonios();
}

// Mostrar mensaje cuando Firebase no está configurado
function showTestimonialsOfflineMessage() {
  const container = document.getElementById('testimonials-container');
  const loading = document.getElementById('testimonials-loading');

  if (loading) loading.style.display = 'none';

  if (container) {
    container.innerHTML = `
      <div class="testimonials-offline">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Sistema de testimonios no disponible</h4>
        <p>Para habilitar los testimonios en tiempo real, configura Firebase en el archivo firebase-config.js</p>
        <a href="https://console.firebase.google.com" target="_blank" class="btn btn-secondary">
          <i class="fas fa-external-link-alt"></i> Ir a Firebase Console
        </a>
      </div>
    `;
  }
}

// Configurar contador de caracteres
function setupCharacterCounter() {
  const textarea = document.getElementById('testimonial-comment');
  const charCount = document.getElementById('char-count');

  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const count = textarea.value.length;
      charCount.textContent = count;

      // Cambiar color cuando se acerque al límite
      if (count > 450) {
        charCount.style.color = '#e74c3c';
      } else if (count > 400) {
        charCount.style.color = '#f39c12';
      } else {
        charCount.style.color = 'var(--text-secondary)';
      }
    });
  }
}

// Configurar carga de imagen
function setupImageUpload() {
  const btnUpload = document.getElementById('btn-upload-image');
  const inputFile = document.getElementById('testimonial-image');
  const imagePreview = document.getElementById('image-preview');

  if (!btnUpload || !inputFile || !imagePreview) return;

  // Hacer clic en el botón abre el selector de archivos
  btnUpload.addEventListener('click', () => {
    inputFile.click();
  });

  // Manejar selección de archivo
  inputFile.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showFormMessage('Por favor selecciona una imagen válida (JPG, PNG o GIF)', 'error');
      inputFile.value = '';
      return;
    }

    // Validar tamaño (2MB máximo)
    const maxSize = 2 * 1024 * 1024; // 2MB en bytes
    if (file.size > maxSize) {
      showFormMessage('La imagen es muy grande. El tamaño máximo es 2MB', 'error');
      inputFile.value = '';
      return;
    }

    // Mostrar vista previa
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.classList.add('has-image');

      // Eliminar imagen anterior si existe
      const oldImg = imagePreview.querySelector('img');
      if (oldImg) oldImg.remove();

      // Crear nueva imagen
      const img = document.createElement('img');
      img.src = event.target.result;
      img.alt = 'Vista previa';
      imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

// Configurar formulario de testimonios
function setupTestimonialForm() {
  const form = document.getElementById('testimonial-form');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('testimonial-name');
    const commentInput = document.getElementById('testimonial-comment');
    const imageInput = document.getElementById('testimonial-image');
    const submitBtn = form.querySelector('button[type="submit"]');
    const imagePreview = document.getElementById('image-preview');

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    const imageFile = imageInput.files[0];

    // Validación
    if (!name || !comment) {
      showFormMessage('Por favor completa todos los campos', 'error');
      return;
    }

    if (!imageFile) {
      showFormMessage('Por favor selecciona una foto de perfil', 'error');
      return;
    }

    if (comment.length < 10) {
      showFormMessage('El comentario debe tener al menos 10 caracteres', 'error');
      return;
    }

    // Mostrar estado de carga
    const originalHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    try {
      // Convertir imagen a base64
      const imageBase64 = await convertImageToBase64(imageFile);

      // Agregar testimonio a Firebase con imagen
      const result = await agregarTestimonioConImagen(name, comment, imageBase64);

      if (result.success) {
        showFormMessage('¡Gracias por tu testimonio! Se ha enviado correctamente.', 'success');
        form.reset();
        document.getElementById('char-count').textContent = '0';

        // Resetear vista previa de imagen
        imagePreview.classList.remove('has-image');
        const img = imagePreview.querySelector('img');
        if (img) img.remove();

        // Track evento
        trackEvent('testimonial_submitted', {
          testimonial_id: result.id,
          name_length: name.length,
          comment_length: comment.length,
          has_image: true
        });
      } else {
        throw new Error(result.error || 'Error al enviar testimonio');
      }
    } catch (error) {
      console.error('Error al enviar testimonio:', error);
      showFormMessage('Hubo un error al enviar tu testimonio. Por favor intenta nuevamente.', 'error');
    } finally {
      // Restaurar botón
      submitBtn.innerHTML = originalHtml;
      submitBtn.disabled = false;
    }
  });
}

// Convertir imagen a base64
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Agregar testimonio con imagen
async function agregarTestimonioConImagen(nombre, comentario, imageBase64) {
  try {
    const testimonio = {
      nombre: nombre,
      comentario: comentario,
      imagen: imageBase64,
      likes: 0,
      likedBy: [],
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      aprobado: false
    };

    const docRef = await testimoniosRef.add(testimonio);
    console.log('Testimonio agregado con ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al agregar testimonio:', error);
    return { success: false, error: error.message };
  }
}

// Mostrar mensaje del formulario
function showFormMessage(message, type) {
  const messageDiv = document.getElementById('form-message');

  if (!messageDiv) return;

  messageDiv.className = `form-message ${type}`;
  messageDiv.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  messageDiv.style.display = 'flex';

  // Auto-ocultar después de 5 segundos
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Cargar testimonios en tiempo real
function loadRealtimeTestimonios() {
  const container = document.getElementById('testimonials-container');
  const loading = document.getElementById('testimonials-loading');
  const empty = document.getElementById('testimonials-empty');
  const countSpan = document.getElementById('testimonials-count');

  if (!container) return;

  // Escuchar cambios en tiempo real
  unsubscribeTestimonios = escucharTestimonios((testimonios) => {
    // Ocultar loading
    if (loading) loading.style.display = 'none';

    // Actualizar contador
    if (countSpan) {
      countSpan.textContent = testimonios.length;
    }

    // Mostrar empty state si no hay testimonios
    if (testimonios.length === 0) {
      if (empty) empty.style.display = 'flex';
      // Limpiar testimonios existentes
      const existingCards = container.querySelectorAll('.live-testimonial-card');
      existingCards.forEach(card => card.remove());
      return;
    }

    // Ocultar empty state
    if (empty) empty.style.display = 'none';

    // Renderizar testimonios
    renderTestimonios(testimonios, container);
  });
}

// Renderizar testimonios
function renderTestimonios(testimonios, container) {
  // Obtener IDs de testimonios actuales
  const existingIds = Array.from(container.querySelectorAll('.live-testimonial-card'))
    .map(card => card.dataset.id);

  testimonios.forEach(testimonio => {
    // Si el testimonio ya existe, actualizar likes
    if (existingIds.includes(testimonio.id)) {
      updateTestimonialLikes(testimonio);
    } else {
      // Crear nuevo testimonio
      const card = createTestimonialCard(testimonio);
      container.appendChild(card);

      // Animación de entrada
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 10);
    }
  });

  // Eliminar testimonios que ya no existen
  const currentIds = testimonios.map(t => t.id);
  Array.from(container.querySelectorAll('.live-testimonial-card'))
    .forEach(card => {
      if (!currentIds.includes(card.dataset.id)) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        setTimeout(() => card.remove(), 300);
      }
    });
}

// Crear tarjeta de testimonio
function createTestimonialCard(testimonio) {
  const card = document.createElement('div');
  card.className = 'live-testimonial-card';
  card.dataset.id = testimonio.id;
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.3s ease';

  const hasLiked = testimonio.likedBy && testimonio.likedBy.includes(currentUserId);
  const fecha = formatearFecha(testimonio.fecha);

  // Determinar el avatar a mostrar
  let avatarHTML;
  if (testimonio.imagen) {
    avatarHTML = `<img src="${testimonio.imagen}" alt="${escapeHtml(testimonio.nombre)}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-user\\'></i>';">`;
  } else {
    avatarHTML = `<i class="fas fa-user"></i>`;
  }

  card.innerHTML = `
    <div class="testimonial-header">
      <div class="testimonial-avatar">
        ${avatarHTML}
      </div>
      <div class="testimonial-info">
        <h4>${escapeHtml(testimonio.nombre)}</h4>
        <span class="testimonial-date">
          <i class="fas fa-clock"></i> ${fecha}
        </span>
      </div>
    </div>
    <div class="testimonial-body">
      <p>${escapeHtml(testimonio.comentario)}</p>
    </div>
    <div class="testimonial-footer">
      <button class="like-btn ${hasLiked ? 'liked' : ''}" data-id="${testimonio.id}">
        <i class="fas fa-heart"></i>
        <span class="like-count">${testimonio.likes || 0}</span>
      </button>
    </div>
  `;

  // Agregar evento de like
  const likeBtn = card.querySelector('.like-btn');
  likeBtn.addEventListener('click', () => handleLike(testimonio.id));

  return card;
}

// Actualizar likes de un testimonio existente
function updateTestimonialLikes(testimonio) {
  const card = document.querySelector(`.live-testimonial-card[data-id="${testimonio.id}"]`);
  if (!card) return;

  const likeBtn = card.querySelector('.like-btn');
  const likeCount = card.querySelector('.like-count');
  const hasLiked = testimonio.likedBy && testimonio.likedBy.includes(currentUserId);

  if (likeBtn) {
    likeBtn.className = `like-btn ${hasLiked ? 'liked' : ''}`;
  }

  if (likeCount) {
    likeCount.textContent = testimonio.likes || 0;
  }
}

// Manejar like
async function handleLike(testimonioId) {
  const likeBtn = document.querySelector(`.like-btn[data-id="${testimonioId}"]`);

  if (!likeBtn || likeBtn.disabled) return;

  // Deshabilitar botón temporalmente
  likeBtn.disabled = true;

  try {
    const result = await toggleLike(testimonioId, currentUserId);

    if (result.success) {
      // Animación del botón
      likeBtn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
      }, 200);

      // Track evento
      trackEvent('testimonial_like', {
        testimonial_id: testimonioId,
        action: result.hasLiked ? 'liked' : 'unliked'
      });
    } else {
      throw new Error(result.error || 'Error al dar like');
    }
  } catch (error) {
    console.error('Error al dar like:', error);
    showNotification('Error al dar like. Intenta nuevamente.', 'error');
  } finally {
    // Habilitar botón
    setTimeout(() => {
      likeBtn.disabled = false;
    }, 500);
  }
}

// Formatear fecha relativa
function formatearFecha(timestamp) {
  if (!timestamp) return 'Hace un momento';

  const fecha = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const ahora = new Date();
  const diferencia = ahora - fecha;

  const segundos = Math.floor(diferencia / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30);

  if (segundos < 60) return 'Hace un momento';
  if (minutos < 60) return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
  if (horas < 24) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
  if (dias < 7) return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
  if (semanas < 4) return `Hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
  if (meses < 12) return `Hace ${meses} mes${meses > 1 ? 'es' : ''}`;

  return fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Limpiar al salir de la página
window.addEventListener('beforeunload', () => {
  if (unsubscribeTestimonios) {
    unsubscribeTestimonios();
  }
});

// Inicializar sistema de testimonios cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
  // Pequeño delay para asegurar que Firebase se cargue primero
  setTimeout(initializeRealtimeTestimonials, 500);
});
