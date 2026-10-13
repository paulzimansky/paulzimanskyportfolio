// ==============================================
// NAVIGATION
// ==============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
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
// PORTFOLIO (Modal liegt in portfolio.js)
// ==============================================
const portfolioItems = document.querySelectorAll('.portfolio-item');

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
