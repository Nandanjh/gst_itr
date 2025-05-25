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
    const talkToUsBtn = document.getElementById('talk-to-us');
    if (talkToUsBtn) {
        talkToUsBtn.addEventListener('click', function() {
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
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
            alert('Thank you for your message! Our team will contact you shortly.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate blog cards on scroll
    const blogCards = document.querySelectorAll('.blog-card');
    const contactCards = document.querySelectorAll('.contact-card');
    
    const elementsToAnimate = [...blogCards, ...contactCards];
    
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
    
    // Add read time estimate to blog posts
    document.querySelectorAll('.blog-card').forEach(card => {
        const content = card.querySelector('p').textContent;
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
        
        const metaDiv = card.querySelector('.blog-meta');
        if (metaDiv) {
            const readTimeSpan = document.createElement('span');
            readTimeSpan.innerHTML = `<i class="far fa-clock"></i> ${readTime} min read`;
            metaDiv.appendChild(readTimeSpan);
        }
    });
});