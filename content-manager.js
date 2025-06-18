// Content management script for Canal City BBQ website
class ContentManager {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.populatePage();
        } catch (error) {
            console.error('Error loading configuration:', error);
        }
    }

    async loadConfig() {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.config = await response.json();
    }

    populatePage() {
        this.populateNavigation();
        this.populateHero();
        this.populateAbout();
        this.populateMenu();
        this.populateServices();
        this.populateBooking();
        this.populateFooter();
        this.updateBusinessInfo();
    }

    populateNavigation() {
        const navMenu = document.getElementById('nav-menu');
        const navLogo = document.querySelector('.nav-logo h2');
        
        // Update logo
        navLogo.textContent = this.config.business.name;
        
        // Clear existing nav items and populate from config
        navMenu.innerHTML = '';
        this.config.navigation.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'nav-link';
            link.textContent = item.text;
            navMenu.appendChild(link);
        });
    }

    populateHero() {
        const hero = this.config.hero;
        
        document.querySelector('.hero-content h1').textContent = hero.title;
        document.querySelector('.hero-subtitle').textContent = hero.subtitle;
        document.querySelector('.hero-description').textContent = hero.description;
        document.querySelector('.cta-button').textContent = hero.ctaText;
    }

    populateAbout() {
        const about = this.config.about;
        
        // Update section header
        document.querySelector('#about .section-header h2').textContent = about.title;
        document.querySelector('#about .section-header p').textContent = about.subtitle;
        
        // Update story content
        const storyTitle = document.querySelector('.about-text h3');
        const storyContent = storyTitle.nextElementSibling;
        storyTitle.textContent = about.story.title;
        storyContent.textContent = about.story.content;
        
        // Update features
        const featuresTitle = document.querySelectorAll('.about-text h3')[1];
        const featuresList = featuresTitle.nextElementSibling;
        featuresTitle.textContent = about.features.title;
        
        featuresList.innerHTML = '';
        about.features.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `✓ ${item}`;
            featuresList.appendChild(li);
        });
    }

    populateMenu() {
        const menu = this.config.menu;
        
        // Update section header
        document.querySelector('#menu .section-header h2').textContent = menu.title;
        document.querySelector('#menu .section-header p').textContent = menu.subtitle;
        
        // Populate menu categories
        const categoriesContainer = document.querySelector('.menu-categories');
        categoriesContainer.innerHTML = '';
        
        menu.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'menu-category';
            
            categoryDiv.innerHTML = `
                <h3>${category.name}</h3>
                <div class="menu-items">
                    ${category.items.map(item => `
                        <div class="menu-item">
                            <h4>${item.name}</h4>
                            <p>${item.description}</p>
                            <span class="price">${item.price}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            categoriesContainer.appendChild(categoryDiv);
        });
        
        // Populate packages
        const packagesSection = document.querySelector('.menu-packages');
        const packagesTitle = packagesSection.querySelector('h3');
        const packagesContainer = packagesSection.querySelector('.packages');
        
        packagesTitle.textContent = menu.packages.title;
        packagesContainer.innerHTML = '';
        
        menu.packages.items.forEach(pkg => {
            const packageDiv = document.createElement('div');
            packageDiv.className = 'package';
            packageDiv.innerHTML = `
                <h4>${pkg.name}</h4>
                <p>${pkg.description}</p>
                <span class="package-price">${pkg.price}</span>
            `;
            packagesContainer.appendChild(packageDiv);
        });
    }

    populateServices() {
        const services = this.config.services;
        
        // Update section header
        document.querySelector('#services .section-header h2').textContent = services.title;
        document.querySelector('#services .section-header p').textContent = services.subtitle;
        
        // Populate services grid
        const servicesGrid = document.querySelector('.services-grid');
        servicesGrid.innerHTML = '';
        
        services.items.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    }

    populateBooking() {
        const booking = this.config.booking;
        
        // Update section header
        document.querySelector('#booking .section-header h2').textContent = booking.title;
        document.querySelector('#booking .section-header p').textContent = booking.subtitle;
        
        // Update booking info
        const bookingInfo = document.querySelector('.booking-info');
        bookingInfo.querySelector('h3').textContent = booking.intro.title;
        bookingInfo.querySelector('p').textContent = booking.intro.description;
        
        // Update contact info
        const contactInfo = bookingInfo.querySelector('.contact-info');
        contactInfo.innerHTML = `
            <h4>Contact Information</h4>
            <p><strong>Phone:</strong> ${this.config.business.phone}</p>
            <p><strong>Email:</strong> ${this.config.business.email}</p>
            <p><strong>Service Area:</strong> ${this.config.business.serviceArea}</p>
        `;
        
        // Update booking notes
        const bookingNotes = bookingInfo.querySelector('.booking-notes');
        const notesList = bookingNotes.querySelector('ul');
        bookingNotes.querySelector('h4').textContent = booking.notes.title;
        
        notesList.innerHTML = '';
        booking.notes.items.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            notesList.appendChild(li);
        });
        
        // Update calendar section
        const calendarContainer = document.querySelector('.calendar-container');
        calendarContainer.querySelector('h3').textContent = booking.calendar.title;
        
        const calendarIframe = calendarContainer.querySelector('iframe');
        if (calendarIframe) {
            calendarIframe.src = booking.calendar.embedUrl;
            calendarIframe.style.border = '0';
            calendarIframe.width = '100%';
            calendarIframe.height = '600';
            calendarIframe.frameBorder = '0';
        }
        
        const calendarNote = calendarContainer.querySelector('.calendar-note');
        if (calendarNote) {
            calendarNote.textContent = booking.calendar.note;
        }
    }

    populateFooter() {
        const footerSections = document.querySelectorAll('.footer-section');
        
        // Business name section
        footerSections[0].querySelector('h3').textContent = this.config.business.name;
        footerSections[0].querySelector('p').textContent = this.config.business.tagline;
        
        // Contact section
        const contactSection = footerSections[1];
        contactSection.innerHTML = `
            <h4>Contact</h4>
            <p>${this.config.business.phone}</p>
            <p>${this.config.business.email}</p>
        `;
        
        // Hours section
        const hoursSection = footerSections[2];
        hoursSection.innerHTML = `
            <h4>Hours</h4>
            <p>${this.config.business.hours.availability}</p>
            <p>${this.config.business.hours.notice}</p>
        `;
        
        // Update copyright
        const currentYear = new Date().getFullYear();
        document.querySelector('.footer-bottom p').innerHTML = 
            `&copy; ${currentYear} ${this.config.business.name}. All rights reserved.`;
    }

    updateBusinessInfo() {
        // Update any remaining business info references
        document.title = `${this.config.business.name} - Premium BBQ Catering`;
        
        // Update meta description if exists
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.config.business.description;
        }
    }

    // Method to update configuration (useful for admin interface)
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.populatePage();
    }

    // Method to get current configuration (useful for editing)
    getConfig() {
        return this.config;
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contentManager = new ContentManager();
});

// Navigation and other interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for content to load before setting up navigation
    setTimeout(() => {
        setupNavigation();
        setupScrollEffects();
    }, 100);
});

function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
}

function setupScrollEffects() {
    // Simple navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}
