// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    disable: function() {
        return window.innerWidth < 768;
    }
});

// Preloader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('hidden');
    }, 500);
});

// Toggle Mobile Menu
function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
    
    // Toggle body scroll when menu is open
    if (navbar.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById("navbar").classList.remove("active");
        document.body.style.overflow = "auto";
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Back to Top Functionality
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.getElementById('navbar').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                // Re-initialize AOS for filtered items
                setTimeout(() => {
                    AOS.refresh();
                }, 100);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send the form data to a server
    // For this example, we'll just show a success message
    const formContainer = document.querySelector('.contact-form');
    formContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 0;">
            <div style="width: 80px; height: 80px; background-color: rgba(79, 70, 229, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i class="fas fa-check" style="font-size: 36px; color: var(--primary-color);"></i>
            </div>
            <h3 style="margin-bottom: 15px; color: var(--text-dark);">Thank You!</h3>
            <p style="color: var(--text-light); margin-bottom: 20px;">Your message has been sent successfully. We'll get back to you soon.</p>
            <button onclick="resetForm()" class="btn btn-primary">Send Another Message</button>
        </div>
    `;
});

// Reset Form Function
function resetForm() {
    location.reload();
}

// Active Navigation Link on Scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu a');
    
    let current = '';
    const headerHeight = document.getElementById('header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        document.getElementById('navbar').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Refresh AOS on resize
    AOS.refresh();
});