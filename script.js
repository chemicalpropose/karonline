// Main JavaScript for KarOnline Platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavbar();
    initializeAnimations();
    initializeFormValidation();
    initializeTooltips();
    initializeCounters();
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Mobile menu toggle
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Animations
function initializeAnimations() {
    // Fade in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.service-card, .project-card, .freelancer-card, .testimonial-card');
    cards.forEach(card => {
        observer.observe(card);
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

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Real-time validation for email fields
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(this);
        });
    });

    // Phone number validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
}

// Email validation
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    
    if (input.value && !isValid) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else if (input.value && isValid) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    } else {
        input.classList.remove('is-valid', 'is-invalid');
    }
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('98')) {
        value = value.substring(2);
    }
    
    if (value.startsWith('0')) {
        value = value.substring(1);
    }
    
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    // Format: 0912 345 6789
    if (value.length >= 10) {
        input.value = `0${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 10)}`;
    } else if (value.length >= 6) {
        input.value = `0${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
    } else if (value.length >= 3) {
        input.value = `0${value.substring(0, 3)} ${value.substring(3)}`;
    } else if (value.length > 0) {
        input.value = `0${value}`;
    }
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stats-row h3, .stat-item .fw-bold');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    if (number && number > 0) {
        const duration = 2000;
        const steps = 50;
        const stepValue = number / steps;
        const stepDuration = duration / steps;
        
        let currentValue = 0;
        
        const interval = setInterval(() => {
            currentValue += stepValue;
            
            if (currentValue >= number) {
                currentValue = number;
                clearInterval(interval);
            }
            
            // Format number with Persian digits and separators
            const formattedNumber = Math.floor(currentValue).toLocaleString('fa-IR');
            element.textContent = text.replace(/[\d,۰-۹]+/, formattedNumber);
        }, stepDuration);
    }
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-form input[type="text"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            debounce(performSearch, 300)(this.value);
        });
    });
}

function performSearch(query) {
    if (query.length < 2) return;
    
    // Simulate search API call
    console.log('Searching for:', query);
    
    // In a real application, you would make an API call here
    // and update the search results
}

// Debounce function for search
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

// Project filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Price range slider
function initializePriceRange() {
    const priceRange = document.querySelector('#priceRange');
    const priceDisplay = document.querySelector('#priceDisplay');
    
    if (priceRange && priceDisplay) {
        priceRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            priceDisplay.textContent = value.toLocaleString('fa-IR') + ' تومان';
        });
    }
}

// File upload handling
function initializeFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            handleFileUpload(this);
        });
    });
}

function handleFileUpload(input) {
    const files = Array.from(input.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
    
    files.forEach(file => {
        if (file.size > maxSize) {
            alert(`فایل ${file.name} بیش از حد مجاز بزرگ است`);
            input.value = '';
            return;
        }
        
        if (!allowedTypes.includes(file.type)) {
            alert(`نوع فایل ${file.name} مجاز نیست`);
            input.value = '';
            return;
        }
    });
    
    // Show file preview if needed
    if (files.length > 0) {
        showFilePreview(files, input);
    }
}

function showFilePreview(files, input) {
    const preview = document.createElement('div');
    preview.className = 'file-preview mt-2';
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item d-flex align-items-center justify-content-between p-2 border rounded mb-1';
        
        fileItem.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-file me-2"></i>
                <span>${file.name}</span>
                <small class="text-muted me-2">(${(file.size / 1024).toFixed(1)} KB)</small>
            </div>
            <button type="button" class="btn btn-sm btn-outline-danger remove-file">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        preview.appendChild(fileItem);
    });
    
    // Remove existing preview
    const existingPreview = input.parentNode.querySelector('.file-preview');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    input.parentNode.appendChild(preview);
    
    // Handle file removal
    preview.querySelectorAll('.remove-file').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remove file from input (requires creating new FileList)
            const dt = new DataTransfer();
            const fileList = Array.from(input.files);
            fileList.splice(index, 1);
            fileList.forEach(file => dt.items.add(file));
            input.files = dt.files;
            
            // Update preview
            if (input.files.length > 0) {
                showFilePreview(Array.from(input.files), input);
            } else {
                preview.remove();
            }
        });
    });
}

// Rating system
function initializeRating() {
    const ratingContainers = document.querySelectorAll('.rating-input');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const input = container.querySelector('input[type="hidden"]');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = index + 1;
                input.value = rating;
                
                // Update star display
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseenter', function() {
                const rating = index + 1;
                
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });
        });
        
        container.addEventListener('mouseleave', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
}

// Notification system
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification`;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Position notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '300px';
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
}

// Local storage utilities
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to load from localStorage:', e);
        return null;
    }
}

// Form auto-save functionality
function initializeAutoSave() {
    const forms = document.querySelectorAll('.auto-save');
    
    forms.forEach(form => {
        const formId = form.getAttribute('id') || 'form_' + Date.now();
        
        // Load saved data
        const savedData = loadFromStorage(`form_${formId}`);
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = savedData[key];
                }
            });
        }
        
        // Save on input
        form.addEventListener('input', debounce(function() {
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            saveToStorage(`form_${formId}`, data);
        }, 1000));
        
        // Clear on submit
        form.addEventListener('submit', function() {
            localStorage.removeItem(`form_${formId}`);
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeProjectFilters();
    initializePriceRange();
    initializeFileUpload();
    initializeRating();
    initializeAutoSave();
});

// Export functions for use in other scripts
window.KarOnline = {
    showNotification,
    saveToStorage,
    loadFromStorage,
    validateEmail,
    formatPhoneNumber
};