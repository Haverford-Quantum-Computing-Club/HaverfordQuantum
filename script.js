// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initQuantumParticles();
    initSmoothScroll();
    initHeaderScroll();
    initAnimations();
    initMobileMenu();
    initMouseEffects();
    initFormValidation();
    initCountdown();
    initCustomCursor();
    init3DCardEffects();
    initQuantumCircuit();
    initAnimatedCounter();
    initGlitchEffect();
});

// Enhanced quantum particles with physics
function initQuantumParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';

        const size = Math.random() * 4 + 2;
        const hue = Math.random() * 60 + 240; // Blue to purple range

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, hsl(${hue}, 100%, 70%), transparent);
            border-radius: 50%;
            box-shadow: 0 0 ${size * 3}px hsl(${hue}, 100%, 50%);
            pointer-events: none;
        `;

        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size,
            hue: hue
        });

        particlesContainer.appendChild(particle);
    }

    function animateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
            if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

            p.element.style.transform = `translate(${p.x}px, ${p.y}px)`;
            p.element.style.opacity = 0.3 + Math.sin(Date.now() * 0.001 + p.x) * 0.2;
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.2)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
}

// Initialize animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.week-card, .intro-card, .speaker-card, .organizer-card, .sponsor-card, .faq-item, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Mouse glow effect on cards
function initMouseEffects() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.week-card, .intro-card, .speaker-card, .organizer-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15) 0%, rgba(255, 255, 255, 0.03) 50%)`;
            } else {
                card.style.background = '';
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.transform = `translateY(${scrolled * -0.1}px)`;
            heroContent.style.opacity = Math.max(0.3, 1 - scrolled / 800);
        }
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('.registration-form, .contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const email = form.querySelector('input[type="email"]');
            const name = form.querySelector('input[name="name"]');
            const phone = form.querySelector('input[type="tel"]');
            
            // Basic validation
            let isValid = true;
            let errors = [];

            if (name && !name.value.trim()) {
                errors.push('Please enter your name');
                isValid = false;
            }

            if (email && !isValidEmail(email.value)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            if (phone && phone.value && !isValidPhone(phone.value)) {
                errors.push('Please enter a valid phone number');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                showNotification('Registration successful! We\'ll contact you soon.', 'success');
                form.reset();
            } else {
                // Show error messages
                showNotification(errors.join('<br>'), 'error');
            }
        });
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Countdown timer for event
function initCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    // Set your event date here
    const eventDate = new Date('2025-01-10T09:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = 'Event has started!';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-value">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${hours.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${minutes.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${seconds.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect if needed
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 500);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
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
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s;
    }

    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .countdown {
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin: 2rem 0;
    }

    .countdown-item {
        text-align: center;
        background: rgba(139, 92, 246, 0.1);
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid rgba(139, 92, 246, 0.3);
    }

    .countdown-value {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .countdown-label {
        display: block;
        font-size: 0.9rem;
        color: #a1a1aa;
        text-transform: uppercase;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(style);

// Custom animated cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effects
    const interactives = document.querySelectorAll('a, button, .week-card, .intro-card, .speaker-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
            cursor.style.borderColor = '#ec4899';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.borderColor = '#8b5cf6';
        });
    });
}

// 3D card tilt effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.week-card, .intro-card, .speaker-card, .organizer-card, .speaker-detail-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Quantum circuit animation
function initQuantumCircuit() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'quantum-circuit-canvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.3;
        z-index: 1;
    `;
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lines = [];
    const lineCount = 5;

    for (let i = 0; i < lineCount; i++) {
        lines.push({
            y: (i + 1) * (canvas.height / (lineCount + 1)),
            nodes: [],
            progress: Math.random()
        });
    }

    function drawCircuit() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;

        lines.forEach((line, idx) => {
            // Draw horizontal line
            const gradient = ctx.createLinearGradient(0, line.y, canvas.width, line.y);
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
            gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.8)');
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
            ctx.strokeStyle = gradient;

            ctx.beginPath();
            ctx.moveTo(0, line.y);
            ctx.lineTo(canvas.width, line.y);
            ctx.stroke();

            // Draw quantum gates (circles)
            for (let i = 0; i < 6; i++) {
                const x = (i + 1) * (canvas.width / 7);
                const pulse = Math.sin(Date.now() * 0.002 + i + idx) * 0.5 + 0.5;

                ctx.fillStyle = `rgba(236, 72, 153, ${0.3 + pulse * 0.3})`;
                ctx.beginPath();
                ctx.arc(x, line.y, 8 + pulse * 4, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#ec4899';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ec4899';
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        });

        requestAnimationFrame(drawCircuit);
    }

    drawCircuit();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Animated counter for statistics
function initAnimatedCounter() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.replace(/[^0-9]/g, '');
                const hasPlus = target.textContent.includes('+');

                if (finalValue) {
                    animateValue(target, 0, parseInt(finalValue), 2000, hasPlus);
                }
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration, hasPlus = false) {
    const startTime = Date.now();

    function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.floor(start + (end - start) * easeProgress);

        element.textContent = hasPlus ? `+${current}` : current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = hasPlus ? `+${end}` : end;
        }
    }

    update();
}

// Glitch effect for titles
function initGlitchEffect() {
    const titles = document.querySelectorAll('.section-title, .page-title');

    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.classList.add('glitch');
            setTimeout(() => title.classList.remove('glitch'), 500);
        });
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Export functions for use in other scripts if needed
window.qffUtils = {
    showNotification,
    copyToClipboard,
    typeWriter
};