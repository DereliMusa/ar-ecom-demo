// ===================================
// BLAENE - JavaScript Interactions
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavbar();
  initScrollAnimations();
  initFilters();
  initContactForm();
  initMobileMenu();
});

// ===================================
// NAVBAR
// ===================================

function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for background
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ===================================
// MOBILE MENU
// ===================================

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.querySelector('.navbar__menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('animate-ready');
    observer.observe(section);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===================================
// CATALOG FILTERS
// ===================================

function initFilters() {
  const filterOptions = document.querySelectorAll('.filter__option');
  const priceSlider = document.querySelector('.filter__slider');
  const productCards = document.querySelectorAll('.product-card');

  // Toggle filter options
  filterOptions.forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('active');
      applyFilters();
    });
  });

  // Price slider
  if (priceSlider) {
    const minValue = document.querySelector('.filter__range-min');
    const maxValue = document.querySelector('.filter__range-max');
    
    priceSlider.addEventListener('input', (e) => {
      if (maxValue) {
        maxValue.textContent = `₺${parseInt(e.target.value).toLocaleString('tr-TR')}`;
      }
      applyFilters();
    });
  }

  function applyFilters() {
    // Get active filters
    const activeFilters = [];
    filterOptions.forEach(option => {
      if (option.classList.contains('active')) {
        activeFilters.push(option.dataset.filter);
      }
    });

    // Get price range
    const maxPrice = priceSlider ? parseInt(priceSlider.value) : Infinity;

    // Filter products (demo - just show/hide randomly for effect)
    productCards.forEach(card => {
      const cardPrice = parseInt(card.dataset.price) || 0;
      const cardCategory = card.dataset.category || '';
      
      let show = true;
      
      // Check price
      if (cardPrice > maxPrice) {
        show = false;
      }

      // Check category filters
      if (activeFilters.length > 0 && !activeFilters.includes(cardCategory)) {
        show = false;
      }

      // Apply visibility with animation
      if (show) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease forwards';
      } else {
        card.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
}

// ===================================
// CONTACT FORM
// ===================================

function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success message (demo)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Gönderildi ✓';
    submitBtn.style.background = '#00ff88';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ===================================
// 3D VIEWER PLACEHOLDER
// ===================================

function init3DViewer() {
  const viewer = document.getElementById('product-viewer');
  if (!viewer) return;

  // Placeholder for model-viewer integration
  // In production, this would load the actual 3D model
  
  let rotation = 0;
  const placeholder = viewer.querySelector('.product-viewer__placeholder');
  
  if (placeholder) {
    // Simple rotation animation for demo
    setInterval(() => {
      rotation += 1;
      placeholder.style.transform = `rotateY(${rotation}deg)`;
    }, 50);
  }
}

// ===================================
// AR BUTTON
// ===================================

function initARButton() {
  const arButton = document.querySelector('.ar-button');
  
  if (!arButton) return;

  arButton.addEventListener('click', () => {
    // Check if device supports AR
    const isARSupported = 'xr' in navigator;
    
    if (isARSupported) {
      // Launch AR experience (placeholder)
      alert('AR deneyimi başlatılıyor... (Demo modunda)');
    } else {
      alert('Cihazınız AR\'ı desteklemiyor. Mobil cihazınızdan deneyebilirsiniz.');
    }
  });
}

// ===================================
// ADMIN PANEL
// ===================================

function initAdminPanel() {
  const productRows = document.querySelectorAll('.admin__table tr[data-product-id]');
  
  productRows.forEach(row => {
    const editBtn = row.querySelector('.admin__action-btn--edit');
    const deleteBtn = row.querySelector('.admin__action-btn--delete');
    
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const productId = row.dataset.productId;
        // Open edit modal (demo)
        console.log(`Edit product: ${productId}`);
      });
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        const productId = row.dataset.productId;
        // Confirm delete (demo)
        if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
          row.style.animation = 'fadeOut 0.3s ease forwards';
          setTimeout(() => row.remove(), 300);
        }
      });
    }
  });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce for performance
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

// Format price
function formatPrice(price) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  .animate-ready {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
  
  .navbar__menu.active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(10, 10, 10, 0.98);
    padding: 1rem 2rem 2rem;
    gap: 1rem;
  }
  
  .navbar__toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .navbar__toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .navbar__toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`;
document.head.appendChild(style);
