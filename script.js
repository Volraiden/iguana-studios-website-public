// Iguana Studios Website - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initVideoCarousel();
    initVimeoPlayer();
});

// Navigation - Scroll Effect & Mobile Menu
function initNavigation() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking a link
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
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

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission(data);
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again or contact us directly.', 'error');
                console.error('Form submission error:', error);
                
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Project type validation
    if (!data.project) {
        errors.push('Please select a project type');
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please provide more details about your project (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return false;
    }
    
    return true;
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // For demo purposes, always resolve successfully
            // In production, replace this with actual fetch() call
            console.log('Form data submitted:', data);
            resolve({ success: true });
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'success') {
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
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        max-width: 400px;
        background: ${type === 'success' ? '#1a3a2a' : '#3a1a1a'};
        border: 1px solid ${type === 'success' ? '#2a5a3a' : '#5a2a2a'};
        border-radius: 8px;
        padding: 16px 20px;
        z-index: 9999;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
            }
            
            .notification-message {
                font-size: 0.9375rem;
                color: #ffffff;
                line-height: 1.5;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.6);
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.2s ease;
            }
            
            .notification-close:hover {
                color: #ffffff;
            }
            
            .notification-close svg {
                width: 18px;
                height: 18px;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .visual-card, .stat, .work-info, .contact-method'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Video Carousel
function initVideoCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Auto-advance carousel (optional - every 8 seconds)
    let autoAdvance = setInterval(nextSlide, 8000);
    
    // Pause auto-advance on hover
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(nextSlide, 8000);
        });
    }
}

// Vimeo Player Initialization
function initVimeoPlayer() {
    // Vimeo players are now in the carousel
    // The Vimeo API will handle them automatically via the iframes
    console.log('Vimeo carousel initialized');
}

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (navLinks && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Performance: Lazy load images (if any added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Print styles for contact information
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Language Switcher
const translations = {
    en: {
        'nav.about': 'About',
        'nav.work': 'Work',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        'hero.badge': 'Where Ideas Become Visuals',
        'hero.title1': 'We Craft',
        'hero.highlight': 'Visual Stories',
        'hero.title2': 'That Captivate',
        'hero.subtitle': 'Professional videographers and editors bringing your vision to life through stunning commercials, films, and creative content.',
        'hero.cta1': 'View Our Work',
        'hero.cta2': 'Get in Touch',
        'hero.scroll': 'Scroll to explore',
        'about.label': 'About Us',
        'about.title': 'Passion Meets Precision',
        'about.text1': 'At Iguana Studios, we believe every frame tells a story. Our team of seasoned videographers and editors brings years of industry experience to every project, combining technical expertise with creative vision.',
        'about.text2': 'From concept to final cut, we handle every aspect of production with meticulous attention to detail. Whether it\'s a commercial that needs to sell, a film that needs to inspire, or content that needs to engage — we deliver excellence.',
        'about.stat1': 'Years Experience',
        'about.stat2': 'Projects Completed',
        'about.stat3': 'Happy Clients',
        'about.card1Title': 'Expert Team',
        'about.card1Text': 'A team of specialists with experience in production, advertising, and visual content.',
        'about.card2Title': 'High Quality Standards',
        'about.card2Text': 'In every project we adhere to precision, thoughtfulness and attention to detail.',
        'services.label': 'Services',
        'services.title': 'What We Do',
        'services.subtitle': 'Full-service video production from concept to delivery',
        'services.service1Title': 'Commercial Production',
        'services.service1Text': 'High-impact commercials that resonate with your audience and drive results.',
        'services.service2Title': 'Corporate Videos',
        'services.service2Text': 'Professional content that showcases your brand, products, and company culture.',
        'services.service3Title': 'Creative Direction',
        'services.service3Text': 'Concept development and visual storytelling that brings your unique vision to life.',
        'services.service4Title': 'Post-Production',
        'services.service4Text': 'Expert editing, color grading, sound design, and visual effects.',
        'work.label': 'Portfolio',
        'work.title': 'Our Work',
        'work.subtitle': 'A selection of our recent projects and collaborations',
        'contact.label': 'Get in Touch',
        'contact.title': 'Let\'s Create Together',
        'contact.description': 'Ready to bring your vision to life? We\'d love to hear about your project. Reach out and let\'s discuss how we can help.',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.formName': 'Your Name',
        'contact.formEmail': 'Email Address',
        'contact.formProject': 'Project Type',
        'contact.formSelect': 'Select a service',
        'contact.formOpt1': 'Commercial Production',
        'contact.formOpt2': 'Corporate Video',
        'contact.formOpt3': 'Creative Direction',
        'contact.formOpt4': 'Post-Production',
        'contact.formOpt5': 'Other',
        'contact.formMessage': 'Tell us about your project',
        'contact.formSubmit': 'Send Message',
        'footer.tagline': 'Crafting visual stories that captivate',
        'footer.link1': 'About',
        'footer.link2': 'Work',
        'footer.link3': 'Services',
        'footer.link4': 'Contact',
        'footer.copyright': '&copy; 2025 Iguana Studios. All rights reserved.'
    },
    ru: {
        'nav.about': 'О нас',
        'nav.work': 'Работы',
        'nav.services': 'Услуги',
        'nav.contact': 'Контакты',
        'hero.badge': 'Where Ideas Become Visuals',
        'hero.title1': 'Мы Создаем',
        'hero.highlight': 'Визуальные Истории',
        'hero.title2': 'Которые Захватывают',
        'hero.subtitle': 'Профессиональная команда воплощает идеи в рекламные ролики, фильмы и визуальный контент.',
        'hero.cta1': 'Смотреть Работы',
        'hero.cta2': 'Связаться',
        'hero.scroll': 'Прокрутите вниз',
        'about.label': 'О Нас',
        'about.title': 'Страсть Встречается с Точностью',
        'about.text1': 'В Iguana Studios мы верим, что каждый кадр рассказывает историю. Наша команда опытных видеооператоров и монтажеров приносит многолетний опыт в каждый проект, сочетая техническое мастерство с творческим видением.',
        'about.text2': 'От концепции до финального монтажа мы берем на себя все аспекты производства с тщательным вниманием к деталям. Будь то реклама, фильм или контент — мы гарантируем отличный результат.',
        'about.stat1': 'Лет Опыта',
        'about.stat2': 'Завершенных Проектов',
        'about.stat3': 'Довольных Клиентов',
        'about.card1Title': 'Экспертная Команда',
        'about.card1Text': 'Команда специалистов с опытом работы в продакшне, рекламе и визуальном контенте.',
        'about.card2Title': 'Высокие Стандарты Качества',
        'about.card2Text': 'В каждом проекте мы придерживаемся точности, продуманности и внимания к деталям.',
        'services.label': 'Услуги',
        'services.title': 'Что Мы Делаем',
        'services.subtitle': 'Полный цикл видеопроизводства от идеи до результата',
        'services.service1Title': 'Рекламное Производство',
        'services.service1Text': 'Эффектные рекламные ролики, которые резонируют с аудиторией и приносят результаты.',
        'services.service2Title': 'Корпоративное Видео',
        'services.service2Text': 'Профессиональный контент, демонстрирующий ваш бренд, продукты и корпоративную культуру.',
        'services.service3Title': 'Креативное Направление',
        'services.service3Text': 'Разработка концепций и визуальный рассказ, воплощающий ваше уникальное видение.',
        'services.service4Title': 'Пост-Продакшн',
        'services.service4Text': 'Экспертный монтаж, цветокоррекция, звуковой дизайн и визуальные эффекты.',
        'work.label': 'Портфолио',
        'work.title': 'Наши Работы',
        'work.subtitle': 'Подборка наших недавних проектов и сотрудничеств',
        'contact.label': 'Связаться',
        'contact.title': 'Давайте Создадим Вместе',
        'contact.description': 'Готовы воплотить свое видение в жизнь? Мы будем рады услышать о вашем проекте. Свяжитесь с нами, и давайте обсудим, как мы можем помочь.',
        'contact.phone': 'Телефон',
        'contact.email': 'Email',
        'contact.formName': 'Ваше Имя',
        'contact.formEmail': 'Email Адрес',
        'contact.formProject': 'Тип Проекта',
        'contact.formSelect': 'Выберите услугу',
        'contact.formOpt1': 'Рекламное Производство',
        'contact.formOpt2': 'Корпоративное Видео',
        'contact.formOpt3': 'Креативное Направление',
        'contact.formOpt4': 'Пост-Продакшн',
        'contact.formOpt5': 'Другое',
        'contact.formMessage': 'Расскажите о вашем проекте',
        'contact.formSubmit': 'Отправить Сообщение',
        'footer.tagline': 'Создаем визуальные истории, которые захватывают',
        'footer.link1': 'О нас',
        'footer.link2': 'Работы',
        'footer.link3': 'Услуги',
        'footer.link4': 'Контакты',
        'footer.copyright': '&copy; 2025 Iguana Studios. Все права защищены.'
    },
    uz: {
        'nav.about': 'Biz Haqimizda',
        'nav.work': 'Ishlar',
        'nav.services': 'Xizmatlar',
        'nav.contact': 'Aloqa',
        'hero.badge': 'Where Ideas Become Visuals',
        'hero.title1': 'Biz Yaratamiz',
        'hero.highlight': 'Vizual Hikoyalar',
        'hero.title2': 'Jalb Qiluvchi',
        'hero.subtitle': 'Professional videograf va muharrirlar gozal reklama roliklari, filmlar va ijodiy kontent orqali sizning goyangizni hayotga olib keladi.',
        'hero.cta1': 'Ishlarni Ko\'rish',
        'hero.cta2': 'Bog\'lanish',
        'hero.scroll': 'Pastga aylantiring',
        'about.label': 'Biz Haqimizda',
        'about.title': 'Ishq va Aniqlik Uchrashadi',
        'about.text1': 'Iguana Studiosda biz har bir kadr hikoya aytishiga ishonamiz. Tajribali videograf va muharrirlar jamoamiz har bir loyihaga ko\'p yillik tajriba olib keladi, texnik mahoratni ijodiy ko\'zquvvat bilan birlashtiradi.',
        'about.text2': 'Konsepsiyadan yakuniy montajgacha biz diqqat bilan ishlab chiqarishning barcha jihatlarini nazorat qilamiz. Sotuvchi reklama, ilhomlantiruvchi film yoki jalb qiluvchi kontent — biz ajoyib natija beramiz.',
        'about.stat1': 'Yillik Tajriba',
        'about.stat2': 'Yakunlangan Loyihalar',
        'about.stat3': 'Mamnun Mijozlar',
        'about.card1Title': 'Professional Jamoa',
        'about.card1Text': 'Ishlab chiqarish, reklama va vizual kontent sohasida tajribaga ega mutaxassislar jamoasi.',
        'about.card2Title': 'Yuqori Sifat Standartlari',
        'about.card2Text': 'Har bir loyihada aniqlik, o\'ylanganlik va tafsilotlarga e\'tibor bilan amal qilamiz.',
        'services.label': 'Xizmatlar',
        'services.title': 'Biz Nima Qilamiz',
        'services.subtitle': 'Konsepsiyadan yetkazib berishgacha to\'liq video ishlab chiqarish',
        'services.service1Title': 'Reklama Ishlab Chiqarish',
        'services.service1Text': 'Tomoshabinlar bilan rezonans qiladigan va natijalar beradigan ta\'sirli reklama roliklari.',
        'services.service2Title': 'Korporativ Videolar',
        'services.service2Text': 'Brendingiz, mahsulotlaringiz va korporativ madaniyatingizni ko\'rsatuvchi professional kontent.',
        'services.service3Title': 'Ijodiy Yo\'nalish',
        'services.service3Text': 'O\'ziga xos ko\'zingizni hayotga keltiruvchi konsepsiya rivojlantirish va vizual hikoya.',
        'services.service4Title': 'Post-Produksiya',
        'services.service4Text': 'Professional montaj, rang tuzatish, ovoz dizayni va vizual effektlar.',
        'work.label': 'Portfel',
        'work.title': 'Bizning Ishlarimiz',
        'work.subtitle': 'So\'nggi loyihalar va hamkorliklarimizdan tanlash',
        'contact.label': 'Aloqa',
        'contact.title': 'Keling, Birgalikda Yarataylik',
        'contact.description': 'Go\'yangizni hayotga olib kelishga tayyormisiz? Loyihangiz haqida eshitishni xohlaymiz. Biz bilan bog\'laning va qanday yordam berishimiz mumkinligini muhokama qilaylik.',
        'contact.phone': 'Telefon',
        'contact.email': 'Email',
        'contact.formName': 'Ismingiz',
        'contact.formEmail': 'Email Manzil',
        'contact.formProject': 'Loyiha Turi',
        'contact.formSelect': 'Xizmatni tanlang',
        'contact.formOpt1': 'Reklama Ishlab Chiqarish',
        'contact.formOpt2': 'Korporativ Video',
        'contact.formOpt3': 'Ijodiy Yo\'nalish',
        'contact.formOpt4': 'Post-Produksiya',
        'contact.formOpt5': 'Boshqa',
        'contact.formMessage': 'Loyihangiz haqida bizga aytib bering',
        'contact.formSubmit': 'Xabar Yuborish',
        'footer.tagline': 'Jalb qiluvchi vizual hikoyalar yaratamiz',
        'footer.link1': 'Biz Haqimizda',
        'footer.link2': 'Ishlar',
        'footer.link3': 'Xizmatlar',
        'footer.link4': 'Aloqa',
        'footer.copyright': '&copy; 2025 Iguana Studios. Barcha huquqlar himoyalangan.'
    }
};

function initLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langBtn || !langDropdown) return;
    
    // Toggle dropdown
    langBtn.addEventListener('click', () => {
        langDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-switcher')) {
            langDropdown.classList.remove('active');
        }
    });
    
    // Language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            setLanguage(lang);
            
            // Update active state
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            langBtn.textContent = lang.toUpperCase();
            
            langDropdown.classList.remove('active');
        });
    });
    
    // Load saved language or default to English
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
    
    // Update button and active option
    langBtn.textContent = savedLang.toUpperCase();
    langOptions.forEach(opt => {
        if (opt.dataset.lang === savedLang) {
            opt.classList.add('active');
        }
    });
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language switcher on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
});

console.log('🦎 Iguana Studios website loaded successfully!');