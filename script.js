// CEO GRILLS - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
    }
    
    // Fix: Reset all elements to visible state on load
    resetElementVisibility();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'rgba(26, 26, 26, 0.95)';
                navMenu.style.backdropFilter = 'blur(30px)';
                navMenu.style.padding = '2rem';
                navMenu.style.gap = '1.5rem';
                navMenu.style.borderBottom = '1px solid rgba(255, 215, 0, 0.3)';
                navMenu.style.zIndex = '1000';
            }
        });
    }
    
    // Menu Tab Switching - FIXED
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get category
            const category = btn.dataset.category;
            
            // Hide all menu items
            menuItems.forEach(item => {
                item.style.display = 'none';
                item.classList.remove('active');
                item.style.opacity = '0';
            });
            
            // Show items from selected category - FIXED
            const categoryItems = document.querySelectorAll(`.menu-item[data-category="${category}"]`);
            if (categoryItems.length > 0) {
                categoryItems.forEach(item => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('active');
                        item.style.opacity = '1';
                        // Trigger animation for newly shown items
                        gsap.fromTo(item, 
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                        );
                    }, 50);
                });
            }
        });
    });
    
    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });
    
    // Order Buttons
  // In the Order Buttons section of script.js
const orderBtns = document.querySelectorAll('.order-btn, .option-btn');

// Function to create WhatsApp message
function createWhatsAppMessage(itemName, price, quantity = 1) {
    const phoneNumber = "+2347030593267"; // CEO Grills phone number
    const encodedMessage = encodeURIComponent(
        `Hello CEO Grills! I would like to order:\n\n` +
        `🍽️ *${itemName}*\n` +
        `💰 Price: ${price}\n` +
        `🔢 Quantity: ${quantity}\n\n` +
        `Please let me know the total and delivery time.`
    );
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// Function for table reservation
function createWhatsAppReservation() {
    const phoneNumber = "+2347030593267";
    const encodedMessage = encodeURIComponent(
        `Hello CEO Grills! I would like to reserve a table.\n\n` +
        `Please provide me with:\n` +
        `📅 Date:\n` +
        `⏰ Time:\n` +
        `👥 Number of people:\n` +
        `📝 Special requests:\n\n` +
        `Thank you!`
    );
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if button has specific action
        if (btn.classList.contains('option-btn')) {
            const icon = btn.querySelector('i').className;
            
            if (icon.includes('external-link-alt')) {
                // Open Glovo
                window.open('https://glovoapp.com', '_blank');
                return;
            } else if (icon.includes('phone')) {
                // Call
                window.location.href = 'tel:+2347030593267';
                return;
            } else if (btn.textContent.includes('Reserve')) {
                // Reserve Table - Open WhatsApp
                window.open(createWhatsAppReservation(), '_blank');
                return;
            }
        }
        
        // For regular order buttons (Add to Order)
        if (btn.classList.contains('order-btn')) {
            // Get menu item details
            const menuItem = btn.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const price = menuItem.querySelector('.item-price').textContent;
            
            // Open WhatsApp with order details
            window.open(createWhatsAppMessage(itemName, price), '_blank');
            return;
        }
        
        // Show modal for any other orders (fallback)
        if (orderModal) {
            orderModal.style.display = 'flex';
            setTimeout(() => {
                orderModal.style.opacity = '1';
            }, 10);
        }
    });
});
    const orderModal = document.querySelector('.order-modal');
    const closeModal = document.querySelector('.close-modal');
    
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if button has specific action
            if (btn.classList.contains('option-btn')) {
                const icon = btn.querySelector('i').className;
                if (icon.includes('external-link-alt')) {
                    // Open Glovo
                    window.open('https://glovoapp.com', '_blank');
                    return;
                } else if (icon.includes('phone')) {
                    // Call
                    window.location.href = 'tel:+2347030593267';
                    return;
                }
            }
            
            // Show modal for regular orders
            if (orderModal) {
                orderModal.style.display = 'flex';
                setTimeout(() => {
                    orderModal.style.opacity = '1';
                }, 10);
            }
        });
    });
    
    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            orderModal.style.opacity = '0';
            setTimeout(() => {
                orderModal.style.display = 'none';
            }, 300);
        });
    }
    
    // Close modal when clicking outside
    orderModal?.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.style.opacity = '0';
            setTimeout(() => {
                orderModal.style.display = 'none';
            }, 300);
        }
    });
    
    // Enhanced Parallax Effect - SIMPLIFIED
    let lastScroll = 0;
    let ticking = false;
    
  // Enhanced Parallax Effect for Background with Cinematic Transitions
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background-container');
    const layers = document.querySelectorAll('.background-layer');
    const nav = document.querySelector('.main-nav');
    
    // Navbar scroll effect
    if (nav) {
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    // Background parallax
    if (background) {
        const yOffset = scrolled * 0.3;
        background.style.transform = `translateY(${yOffset}px)`;
    }
    
    // Layer switching based on scroll - Cinematic transitions
    if (layers.length >= 3) {
        const windowHeight = window.innerHeight;
        const docHeight = document.body.scrollHeight;
        const scrollPercent = (scrolled / (docHeight - windowHeight)) * 100;
        
        // Get footer position
        const footerSection = document.querySelector('.main-footer');
        let footerStartPercent = 85; // Default if footer not found
        
        if (footerSection) {
            const footerTop = footerSection.offsetTop;
            footerStartPercent = Math.min(95, (footerTop / docHeight) * 100);
        }
        
        // STRONG animated layers at top, fade out near footer
        if (scrollPercent < 25) {
            // Layer 1 dominant - STRONG colors on top of footer background
            layers[0].style.opacity = '1';
            layers[1].style.opacity = '0';
            layers[2].style.opacity = '0';
        } else if (scrollPercent < 50) {
            // Transition from Layer 1 to Layer 2
            const transitionPercent = (scrollPercent - 25) / 25;
            layers[0].style.opacity = `${1 - transitionPercent}`;
            layers[1].style.opacity = `${transitionPercent}`;
            layers[2].style.opacity = '0';
        } else if (scrollPercent < 75) {
            // Layer 2 dominant - MEDIUM colors on top of footer background
            layers[0].style.opacity = '0';
            layers[1].style.opacity = '1';
            layers[2].style.opacity = '0';
        } else if (scrollPercent < footerStartPercent) {
            // Transition from Layer 2 to Layer 3, then fade out
            const transitionPercent = (scrollPercent - 75) / (footerStartPercent - 75);
            
            if (transitionPercent < 0.5) {
                // First half: Show Layer 3
                layers[0].style.opacity = '0';
                layers[1].style.opacity = `${1 - (transitionPercent * 2)}`;
                layers[2].style.opacity = `${transitionPercent * 2}`;
            } else {
                // Second half: Fade all layers out to reveal pure footer background
                const fadeOutPercent = (transitionPercent - 0.5) * 2;
                layers[0].style.opacity = '0';
                layers[1].style.opacity = `${1 - fadeOutPercent}`;
                layers[2].style.opacity = `${1 - fadeOutPercent}`;
            }
        } else {
            // At footer section - All animated layers fade out completely
            const fadeOutPercent = Math.min(1, (scrollPercent - footerStartPercent) / 10);
            layers[0].style.opacity = '0';
            layers[1].style.opacity = `${1 - fadeOutPercent}`;
            layers[2].style.opacity = `${1 - fadeOutPercent}`;
        }
    }
});
    
    // Initialize 3D Card Effect
    init3DEffects();
    
    // Add scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                gsap.to(scrollIndicator, {
                    opacity: 0,
                    duration: 0.5
                });
            } else {
                gsap.to(scrollIndicator, {
                    opacity: 0.7,
                    duration: 0.5
                });
            }
        });
    }
    
    // Force display of all sections on load
    window.addEventListener('load', () => {
        // Show all menu items from active category
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            const category = activeTab.dataset.category;
            const categoryItems = document.querySelectorAll(`.menu-item[data-category="${category}"]`);
            categoryItems.forEach(item => {
                item.style.display = 'block';
                item.classList.add('active');
                item.style.opacity = '1';
            });
        }
        
        // Add loaded class for transitions
        document.body.classList.add('loaded');
        
        // Initial background animation
        gsap.from('.background-container', {
            duration: 2,
            opacity: 0,
            ease: 'power2.out'
        });
        
        // Ensure all elements are visible
        setTimeout(resetElementVisibility, 100);
    });
});

// Initialize Animations with GSAP - FIXED
function initAnimations() {
    // Configure GSAP for better performance
    gsap.config({
        nullTargetWarn: false,
        force3D: true
    });
    
    // Hero Section Animation
    gsap.from('.hero-tag', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-title span', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.1,
        ease: 'power3.out'
    });
    
    gsap.from('.food-card-3d', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        rotationY: -30,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-stats', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.5,
        ease: 'power3.out'
    });
    
    // Enhanced Section Animations with ScrollTrigger - FIXED
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, i) => {
        if (i > 0) { // Skip hero section
            const sectionId = section.id;
            
            // Animate section header
            gsap.from(section.querySelector('.section-header'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'bottom 60%',
                    toggleActions: 'play none none none',
                    once: true,
                    markers: false // Set to true for debugging if needed
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                onComplete: () => {
                    // Ensure element stays visible
                    if (section.querySelector('.section-header')) {
                        section.querySelector('.section-header').style.opacity = '1';
                    }
                }
            });
            
            // Special handling for each section type
            switch(sectionId) {
                case 'story':
                    // Timeline items
                    gsap.from('.timeline-item', {
                        scrollTrigger: {
                            trigger: '.story-timeline',
                            start: 'top 80%',
                            end: 'top 30%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 100,
                        opacity: 0,
                        stagger: 0.4,
                        duration: 1.2,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelectorAll('.timeline-item').forEach(item => {
                                item.style.opacity = '1';
                            });
                        }
                    });
                    
                    // Story quote
                    gsap.from('.story-quote', {
                        scrollTrigger: {
                            trigger: '.story-quote',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelector('.story-quote').style.opacity = '1';
                        }
                    });
                    break;
                    
                case 'menu':
                    // Menu tabs - simple fade in
                    gsap.from('.menu-tabs', {
                        scrollTrigger: {
                            trigger: '.menu-tabs',
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                    break;
                    
                case 'experience':
                    // Experience cards
                    gsap.from('.experience-card', {
                        scrollTrigger: {
                            trigger: '.experience-grid',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 80,
                        opacity: 0,
                        rotationY: -20,
                        stagger: 0.3,
                        duration: 1.2,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelectorAll('.experience-card').forEach(card => {
                                card.style.opacity = '1';
                            });
                        }
                    });
                    
                    // Gallery items
                    gsap.from('.gallery-item', {
                        scrollTrigger: {
                            trigger: '.gallery-container',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 50,
                        opacity: 0,
                        scale: 0.8,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelectorAll('.gallery-item').forEach(item => {
                                item.style.opacity = '1';
                            });
                        }
                    });
                    break;
                    
                case 'location':
                    // Location info cards
                    gsap.from('.info-card', {
                        scrollTrigger: {
                            trigger: '.location-info',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        x: -100,
                        opacity: 0,
                        stagger: 0.2,
                        duration: 1,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelectorAll('.info-card').forEach(card => {
                                card.style.opacity = '1';
                            });
                        }
                    });
                    
                    // Map container
                    gsap.from('.map-container', {
                        scrollTrigger: {
                            trigger: '.map-container',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 100,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelector('.map-container').style.opacity = '1';
                        }
                    });
                    break;
                    
                case 'contact':
                    // Option cards
                    gsap.from('.option-card', {
                        scrollTrigger: {
                            trigger: '.contact-options',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 50,
                        opacity: 0,
                        rotationX: 20,
                        stagger: 0.2,
                        duration: 1,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelectorAll('.option-card').forEach(card => {
                                card.style.opacity = '1';
                            });
                        }
                    });
                    
                    // Social connect
                    gsap.from('.social-connect', {
                        scrollTrigger: {
                            trigger: '.social-connect',
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        onComplete: () => {
                            document.querySelector('.social-connect').style.opacity = '1';
                        }
                    });
                    break;
            }
        }
    });
}

// 3D Effects for Interactive Elements
function init3DEffects() {
    // 3D Card Effect
    const card3d = document.querySelector('.food-card-3d');
    
    if (card3d) {
        card3d.addEventListener('mousemove', (e) => {
            const rect = card3d.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / 25) * 2;
            const rotateX = ((centerY - y) / 25) * 2;
            
            card3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card3d.addEventListener('mouseleave', () => {
            card3d.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
    
    // Enhanced parallax effect for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 15;
            const moveY = (y - centerY) / 15;
            
            item.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Enhanced experience card hover effect
    const expCards = document.querySelectorAll('.experience-card');
    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                boxShadow: 'none',
                ease: 'power2.out'
            });
        });
    });
}

// Reset all elements to visible state
function resetElementVisibility() {
    // Force all animated elements to be visible
    const elements = [
        '.timeline-item',
        '.timeline-content', 
        '.timeline-image',
        '.story-quote',
        '.experience-card',
        '.gallery-item',
        '.info-card',
        '.map-container',
        '.option-card',
        '.social-connect'
    ];
    
    elements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
            }
        });
    });
    
    // Ensure menu items are visible
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const category = activeTab.dataset.category;
        const categoryItems = document.querySelectorAll(`.menu-item[data-category="${category}"]`);
        categoryItems.forEach(item => {
            item.style.display = 'block';
            item.classList.add('active');
            item.style.opacity = '1';
            item.style.visibility = 'visible';
        });
    }
}

// Add some additional interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Add data-text attribute to nav links for hover effect
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.setAttribute('data-text', link.textContent);
    });
    
    // Add title highlight text data
    const highlightTitles = document.querySelectorAll('.title-line.highlight');
    highlightTitles.forEach(title => {
        title.setAttribute('data-text', title.textContent);
    });
    
    // Add hover effect to experience cards with icon animation
    const expCards = document.querySelectorAll('.experience-card');
    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon');
            gsap.to(icon, {
                duration: 0.3,
                scale: 1.2,
                rotate: 360,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.card-icon');
            gsap.to(icon, {
                duration: 0.3,
                scale: 1,
                rotate: 0,
                boxShadow: 'none',
                ease: 'power2.out'
            });
        });
    });
    
    // Enhanced ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .order-btn, .option-btn, .nav-cta, .tab-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 215, 0, 0.4);
                transform: scale(0);
                animation: ripple 0.8s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
    
    // Add to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Ensure elements stay visible */
        .timeline-item,
        .timeline-content,
        .timeline-image,
        .story-quote,
        .experience-card,
        .gallery-item,
        .info-card,
        .map-container,
        .option-card,
        .social-connect,
        .menu-item.active {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .menu-item.active {
            display: block !important;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize menu items display - FIXED
    const activeCategory = document.querySelector('.tab-btn.active')?.dataset.category || 'bole';
    const activeMenuItems = document.querySelectorAll(`.menu-item[data-category="${activeCategory}"]`);
    activeMenuItems.forEach(item => {
        item.style.display = 'block';
        item.classList.add('active');
        item.style.opacity = '1';
        
        // Animate initial menu items
        setTimeout(() => {
            gsap.fromTo(item, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );
        }, 100);
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize animations on resize
        if (typeof gsap !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
});

// Simple scroll animations for background
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrolled / docHeight;
    
    // Update CSS variables based on scroll
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
    
    // Animate grid lines
    const grid = document.querySelector('.floating-grid');
    if (grid) {
        const gridY = scrolled * 0.05;
        grid.style.transform = `translateY(${gridY}px)`;
    }
});




// Add WhatsApp buttons functionality
document.addEventListener('DOMContentLoaded', () => {
    // General Order WhatsApp button
    const generalWhatsAppBtn = document.querySelector('.order-whatsapp-btn');
    if (generalWhatsAppBtn) {
        generalWhatsAppBtn.addEventListener('click', () => {
            const phoneNumber = "+2347030593267";
            const encodedMessage = encodeURIComponent(
                `Hello CEO Grills! I would like to place an order.\n\n` +
                `Please help me with the following:\n` +
                `1. Menu recommendation\n` +
                `2. Current availability\n` +
                `3. Delivery options\n\n` +
                `Thank you!`
            );
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    }
    
    // Reserve Table WhatsApp button
    const reserveWhatsAppBtn = document.querySelector('.reserve-whatsapp-btn');
    if (reserveWhatsAppBtn) {
        reserveWhatsAppBtn.addEventListener('click', () => {
            window.open(createWhatsAppReservation(), '_blank');
        });
    }
    
    // Also add WhatsApp to social links
    const whatsappSocialLink = document.querySelector('.social-link[href*="whatsapp"]');
    if (whatsappSocialLink) {
        whatsappSocialLink.addEventListener('click', (e) => {
            e.preventDefault();
            const phoneNumber = "+2347030593267";
            const encodedMessage = encodeURIComponent(
                `Hello CEO Grills! I saw your website and would like more information.`
            );
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    }
});



// Optional: Update Glovo button to offer WhatsApp alternative
const glovoBtn = document.querySelector('.option-btn:has(.fa-external-link-alt)');
if (glovoBtn) {
    glovoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Offer choice between Glovo and WhatsApp
        if (confirm('Order via:\n1. Glovo (Third-party delivery)\n2. WhatsApp (Direct with CEO Grills)\n\nClick OK for WhatsApp, Cancel for Glovo')) {
            // WhatsApp order
            const phoneNumber = "+2347030593267";
            const encodedMessage = encodeURIComponent(
                `Hello CEO Grills! I would like to place a delivery order.\n\n` +
                `Please provide:\n` +
                `📍 Delivery address:\n` +
                `📱 Phone number:\n` +
                `🍽️ Order details:\n\n` +
                `Thank you!`
            );
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        } else {
            // Original Glovo link
            window.open('https://glovoapp.com', '_blank');
        }
    });
}



// Navbar WhatsApp button
const navWhatsAppBtn = document.getElementById('nav-whatsapp-btn');
if (navWhatsAppBtn) {
    navWhatsAppBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a WhatsApp message template
        const phoneNumber = "+2347030593267";
        const encodedMessage = encodeURIComponent(
            `Hello CEO Grills! 👋\n\n` +
            `I'm interested in ordering from your website.\n\n` +
            `Could you please help me with:\n` +
            `📋 Today's menu availability\n` +
            `⏰ Estimated preparation time\n` +
            `🚗 Delivery options to my location\n\n` +
            `Looking forward to ordering! 😋`
        );
        
        // Open WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        
        // Close mobile menu if open
        if (window.innerWidth <= 768 && navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        }
    });
}



// Update smooth scrolling to exclude WhatsApp button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip the WhatsApp button
    if (anchor.id === 'nav-whatsapp-btn') return;
    
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        }
    });
});