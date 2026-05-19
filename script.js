// ==============================================
// NAVIGATION
// ==============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Change nav background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// ==============================================
// PORTFOLIO FILTER
// ==============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ==============================================
// LIGHTBOX
// ==============================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
let currentImages = [];

// Open lightbox when clicking on portfolio item
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    // Get all visible portfolio items
    currentImages = Array.from(portfolioItems).filter(item => {
        return window.getComputedStyle(item).display !== 'none';
    });
    
    currentImageIndex = currentImages.indexOf(portfolioItems[index]);
    
    if (currentImageIndex === -1) {
        currentImageIndex = 0;
    }
    
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const currentItem = currentImages[currentImageIndex];
    const img = currentItem.querySelector('.portfolio-image img');
    const caption = currentItem.querySelector('.portfolio-caption');
    
    if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
    } else {
        // Placeholder handling
        lightboxImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"%3E%3Crect fill="%23e5e7eb" width="800" height="1000"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle"%3EBild wird noch hochgeladen%3C/text%3E%3C/svg%3E';
    }
    
    if (caption) {
        const title = caption.querySelector('h3')?.textContent || '';
        const description = caption.querySelector('p')?.textContent || '';
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// ==============================================
// SMOOTH SCROLL
// ==============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==============================================
// SCROLL ANIMATIONS
// ==============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ==============================================
// PORTFOLIO ITEMS ANIMATION
// ==============================================
portfolioItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
});

const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

portfolioItems.forEach(item => {
    portfolioObserver.observe(item);
});

// ==============================================
// INITIALIZE
// ==============================================
console.log('Paul Zimansky Photography - Website geladen ✓');
