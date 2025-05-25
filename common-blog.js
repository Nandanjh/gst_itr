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
                if (navMenu && navMenu.classList.contains('active')) {
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
    
    // Calculate reading time for blog post
    const articleContent = document.querySelector('.blog-article');
    if (articleContent) {
        const text = articleContent.textContent;
        const wordCount = text.split(/\s+/).length;
        // Average reading speed: 200 words per minute
        const readingTime = Math.ceil(wordCount / 200);
        
        const readingTimeElement = document.querySelector('.blog-meta span:nth-child(3)');
        if (readingTimeElement) {
            readingTimeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;
        }
    }
    
    // Add copy code functionality for code blocks if present
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length > 0) {
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-code-btn';
            copyButton.textContent = 'Copy';
            
            // Add button to code block
            block.parentNode.style.position = 'relative';
            block.parentNode.appendChild(copyButton);
            
            // Add click event
            copyButton.addEventListener('click', function() {
                const code = block.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    // Change button text temporarily
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Copy';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        });
    }
    
    // Add table of contents if there are enough headings
    const headings = document.querySelectorAll('.blog-article h2, .blog-article h3');
    if (headings.length >= 3) {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        tocContainer.innerHTML = '<h4>Table of Contents</h4><ul></ul>';
        
        const tocList = tocContainer.querySelector('ul');
        
        headings.forEach((heading, index) => {
            // Create ID for the heading if it doesn't have one
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const listItem = document.createElement('li');
            listItem.className = heading.tagName.toLowerCase();
            
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        // Insert TOC after lead paragraph
        const leadParagraph = document.querySelector('.lead-paragraph');
        if (leadParagraph) {
            leadParagraph.parentNode.insertBefore(tocContainer, leadParagraph.nextSibling);
        } else {
            // If no lead paragraph, insert after blog hero
            const blogHero = document.querySelector('.blog-hero');
            if (blogHero) {
                blogHero.parentNode.insertBefore(tocContainer, blogHero.nextSibling);
            }
        }
        
        // Add smooth scrolling for TOC links
        tocContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Add active state to headings when scrolled to
    if (headings.length > 0) {
        window.addEventListener('scroll', function() {
            let currentActive = null;
            
            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentActive = heading;
                }
            });
            
            if (currentActive) {
                const tocLinks = document.querySelectorAll('.table-of-contents a');
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentActive.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});