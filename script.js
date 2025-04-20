// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when a menu item is clicked
    const menuItems = document.querySelectorAll('#nav-menu ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Handle the resume button click
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            alert('Resume download functionality would be implemented here.');
            // In a real implementation, this would trigger a download
            // window.location.href = 'assets/resume.pdf';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

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

    // Add dark mode toggle functionality
    const createDarkModeToggle = () => {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        const darkModeContainer = document.createElement('div');
        darkModeContainer.className = 'dark-mode-container';
        
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.setAttribute('title', 'Toggle Dark Mode');
        
        darkModeContainer.appendChild(darkModeToggle);
        footer.appendChild(darkModeContainer);
        
        // Check for saved user preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save user preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    };
    
    createDarkModeToggle();

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