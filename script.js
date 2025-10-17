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

  const whatsappUrl = `https://wa.me/525512345678?text=${encodeURIComponent(message)}`;
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

  const whatsappUrl = `https://wa.me/525512345678?text=${encodeURIComponent(message)}`;
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
