// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button scroll to contact section
    const talkToExpertsBtn = document.getElementById('talk-to-experts');
    if (talkToExpertsBtn) {
        talkToExpertsBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Form submission handling (for demo purposes)
    const serviceInquiryForm = document.getElementById('service-inquiry-form');
    if (serviceInquiryForm) {
        serviceInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted with values:', formValues);
            
            // Show success message (for demo)
            alert('Thank you for your inquiry! Our team will contact you shortly.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const whyChooseItems = document.querySelectorAll('.why-choose-list li');
    const contactCards = document.querySelectorAll('.contact-card');
    
    const elementsToAnimate = [...serviceCards, ...whyChooseItems, ...contactCards];
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class to elements in viewport
    function checkScroll() {
        elementsToAnimate.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Check on initial load
    checkScroll();
    
    // Sticky header on scroll
    const header = document.getElementById('header');
    
    function toggleStickyHeader() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    window.addEventListener('scroll', toggleStickyHeader);
    
    // Check on initial load
    toggleStickyHeader();
    
    // Service selection enhancement
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        // Highlight the selected service based on URL parameters (if any)
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        if (serviceParam) {
            // Find the option that matches the service parameter
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].value.toLowerCase() === serviceParam.toLowerCase()) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }
});