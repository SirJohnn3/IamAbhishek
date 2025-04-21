// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Dark mode toggle functionality if it exists
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', null);
            }
        });
    }

    // Handle the resume button click
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            alert('Resume download functionality would be implemented here.');
            // In a real implementation, this would trigger a download
            // window.location.href = 'assets/resume.pdf';
        });
    }

    // Add animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-element');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-element-hidden');
        observer.observe(section);
    });

    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        const mobileNavToggle = document.createElement('div');
        mobileNavToggle.className = 'mobile-nav-toggle';
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        header.prepend(mobileNavToggle);
        
        mobileNavToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            nav.classList.toggle('active');
            
            // Toggle icon
            if (nav.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };

    // Check if screen width is for mobile and create mobile nav
    if (window.innerWidth <= 768) {
        createMobileNav();
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (window.innerWidth <= 768) {
            if (!mobileNavToggle) {
                createMobileNav();
            }
        } else {
            if (mobileNavToggle) {
                mobileNavToggle.remove();
                document.querySelector('nav').classList.remove('active');
            }
        }
    });

    // Add CSS for the new elements
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-element-hidden {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .fade-in-element {
                opacity: 1;
                transform: translateY(0);
            }
            
            @media (max-width: 768px) {
                nav {
                    display: none;
                    width: 100%;
                    text-align: center;
                    padding: 1rem 0;
                }
                
                nav.active {
                    display: block;
                }
                
                nav ul {
                    flex-direction: column;
                }
                
                nav ul li {
                    margin: 0.5rem 0;
                }
                
                .mobile-nav-toggle {
                    display: block;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
            }
            
            .dark-mode-container {
                margin-top: 1rem;
            }
            
            .dark-mode-toggle {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #555;
                transition: var(--transition);
            }
            
            .dark-mode-toggle:hover {
                color: var(--primary-color);
            }
            
            .dark-mode {
                background-color: #222;
                color: #f4f4f4;
            }
            
            .dark-mode header,
            .dark-mode footer,
            .dark-mode .experience-item,
            .dark-mode .education-item,
            .dark-mode .certification-item,
            .dark-mode .award-item,
            .dark-mode .publication-item,
            .dark-mode .project-item,
            .dark-mode .talk-item,
            .dark-mode .contact-details,
            .dark-mode .technical-skills,
            .dark-mode .contact-section,
            .dark-mode .skills-section,
            .dark-mode .achievement-item,
            .dark-mode .leadership-item {
                background-color: #333;
                color: #f4f4f4;
            }
            
            .dark-mode .logo a,
            .dark-mode nav ul li a,
            .dark-mode h1,
            .dark-mode h2,
            .dark-mode h3,
            .dark-mode .social-links a {
                color: #f4f4f4;
            }
            
            .dark-mode .publication-abstract,
            .dark-mode .project-description,
            .dark-mode .bio p {
                color: #ccc;
            }
            
            .dark-mode .tech-tag {
                background-color: #444;
                color: #ddd;
            }
            
            .dark-mode .hamburger {
                color: #f4f4f4;
            }
        `;
        document.head.appendChild(style);
    };
    
    addDynamicStyles();
}); 
