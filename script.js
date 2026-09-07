document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger lines
        const lines = mobileToggle.querySelectorAll('.line');
        if (navLinks.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const lines = mobileToggle.querySelectorAll('.line');
            lines[0].style.transform = 'none';
            lines[1].style.transform = 'none';
        });
    });

    // 3. Sticky Header Background on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 5. Custom Cursor Logic
    if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth trailing effect for the outline using requestAnimationFrame
        const animateCursor = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX = outlineX + (distX * 0.15); // Adjust ease amount here
            outlineY = outlineY + (distY * 0.15);
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
    }

    // 6. Magnetic Buttons (Subtle pull effect on hover)
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    if (!prefersReducedMotion) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Keep movement subtle (max 15px)
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
                // Smooth return transition is handled by CSS var(--transition)
            });
        });
    }

    // 7. Mock Form Submission
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('form-success');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Visual loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        
        // Mock API call delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = 'Submit Inquiry';
            submitBtn.style.opacity = '1';
            submitBtn.classList.add('hidden'); // hide button
            
            // Show success message
            successMsg.classList.remove('hidden');
            
            // Hide message and show button again after 5 seconds
            setTimeout(() => {
                successMsg.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            }, 5000);
            
        }, 1500);
    });
});
