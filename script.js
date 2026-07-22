/**
 * EDEN LEAF - Main JavaScript
 * Fonctionnalités : Menu mobile, Header scroll, AOS init, Filtres galerie, Formulaire, Smooth scroll
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // =============================================
    // 1. MENU MOBILE
    // =============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            this.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // =============================================
    // 2. HEADER SCROLL EFFECT
    // =============================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =============================================
    // 3. AOS ANIMATION
    // =============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50,
            disable: function () {
                return window.innerWidth < 600;
            }
        });
    }

    // =============================================
    // 4. ACTIVE NAV LINK (au scroll)
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-menu ul li a:not(.btn-nav)');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    // =============================================
    // 5. SERVICE FILTER (GALERIE)
    // =============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // =============================================
    // 6. FORMULAIRE DE CONTACT (validation)
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Supprimer les anciens messages d'erreur
            document.querySelectorAll('.error-msg').forEach(el => el.remove());

            if (name && name.value.trim().length < 2) {
                isValid = false;
                showError(name, 'Veuillez entrer un nom valide');
            }

            if (email && !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Veuillez entrer un email valide');
            }

            if (message && message.value.trim().length < 10) {
                isValid = false;
                showError(message, 'Votre message doit contenir au moins 10 caractères');
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        const error = document.createElement('span');
        error.className = 'error-msg';
        error.textContent = message;
        input.parentElement.appendChild(error);

        input.addEventListener('input', function () {
            this.style.borderColor = '';
            const err = this.parentElement.querySelector('.error-msg');
            if (err) err.remove();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // =============================================
    // 7. SMOOTH SCROLL
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // 8. NO-SCROLL BODY (menu ouvert)
    // =============================================
    const styleNoScroll = document.createElement('style');
    styleNoScroll.textContent = `
        body.no-scroll { overflow: hidden; }
        @media (min-width: 769px) {
            body.no-scroll { overflow: auto; }
        }
    `;
    document.head.appendChild(styleNoScroll);

    console.log('🌿 Eden Leaf - Site prêt !');
});
