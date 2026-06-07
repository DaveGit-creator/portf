// ============================================
// Mobile Menu Toggle
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    });
});

// ============================================
// Active Navigation Link
// ============================================

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active link on page load
document.addEventListener('DOMContentLoaded', updateActiveLink);

// ============================================
// Smooth Scroll
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// Project Filtering (Work Page)
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filter = button.getAttribute('data-filter');
            
            // Filter work cards
            workCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// Contact Form Handler
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            category: document.getElementById('category').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Unable to send message. Please try again later.');
            }

            showFormMessage(data.message || 'Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            showFormMessage(error.message, 'error');
        }

        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');
        }, 5000);
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
}

// ============================================
// Page Load Animation & Initialization
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';

    initializeGreenTheme();
    // Initialize animations on load
    initializeAnimations();
});

// ============================================
// Counter Animation for Stats
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.split('+')[0] + '+';
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && current === 0) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        observer.observe(counter);
    });
}

// ============================================
// Advanced Scroll Animations
// ============================================

function initializeAnimations() {
    animateCounters();
    
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

    document.querySelectorAll('.role-card, .project-card, .work-card, .education-card, .interest-item, .stat-card, .experience-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// Scroll to Top Button
// ============================================

const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'scroll-top-btn';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'flex';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

// Scroll to top when button is clicked
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollTopButton.addEventListener('mouseover', () => {
    scrollTopButton.style.transform = 'scale(1.1)';
});

scrollTopButton.addEventListener('mouseout', () => {
    scrollTopButton.style.transform = 'scale(1)';
});

// ============================================
// Theme Initialization (Black & Green)
// ============================================

function initializeGreenTheme() {
    const root = document.documentElement;
    
    // Apply green contrast theme variables to match styles.css
    root.style.setProperty('--primary-color', '#22c55e');
    root.style.setProperty('--secondary-color', '#15803d');
    root.style.setProperty('--accent-color', '#4ade80');
    root.style.setProperty('--dark-bg', '#000000');
    root.style.setProperty('--light-bg', '#0a0a0a');

    // Ensure document background matches the theme
    document.body.style.backgroundColor = '#000000';
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
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

// Add smooth scroll behavior to all internal links
document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const targetId = href.substring(href.indexOf('#') + 1);
        const target = document.getElementById(targetId);
        
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// Console Message
// ============================================

console.log('%cWelcome to My Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('Made with ❤️ and code');

// ============================================
// Handle URL Hash Scrolling on Load
// ============================================
function scrollToHashOnLoad() {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Use a slight delay to ensure all content is rendered and layout is stable
            // This is especially useful for elements that might be dynamically loaded or have animations
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100); // Small delay
        }
    }
}
