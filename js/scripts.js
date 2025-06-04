// Smooth scrolling for navigation links
// Selects all anchor tags with href starting with '#' and adds click event listeners
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevents default anchor behavior
        const targetId = this.getAttribute('href').substring(1); // Gets target section ID
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Smoothly scrolls to target
        }
    });
});

// Mobile menu toggle
// Toggles visibility of mobile menu when button is clicked
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open'); // Toggles max-height for animation
    mobileMenu.classList.toggle('hidden'); // Toggles visibility
});

// Typing animation for introduction
// Animates the main heading text character by character
const introText = document.querySelector('.home-title');
const text = introText.textContent;
introText.textContent = ''; // Clear initial text
let i = 0;

function typeWriter() {
    if (i < text.length) {
        introText.textContent += text.charAt(i); // Add one character
        i++;
        setTimeout(typeWriter, 100); // Call function again after 100ms
    }
}
typeWriter();

// Input sanitization function (for future form implementation)
// Removes potentially dangerous characters to prevent XSS attacks
function sanitizeInput(input) {
    return input.replace(/[<>&;]/g, '');
}

// Highlight active navigation link based on scroll position
// Updates nav link styles to indicate current section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Checks if current scroll position is within section
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active'); // Highlights current section link
        }
    });
});

// Expandable content for experience section
// Toggles visibility of additional details when expand button is clicked
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', () => {
        const contentId = button.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Toggle content visibility
        content.classList.toggle('open');
        content.classList.toggle('hidden');

        // Update button text and ARIA attribute
        button.setAttribute('aria-expanded', !isExpanded);
        button.textContent = isExpanded ? '[+] View Key Projects' : '[-] Hide Key Projects';
    });
});

// Interest tag interactions
// Adds click feedback and tooltip accessibility for interest tags
document.querySelectorAll('.interest-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        // Optional: Add future functionality like filtering or linking to related content
        tag.classList.add('clicked');
        setTimeout(() => tag.classList.remove('clicked'), 300); // Brief visual feedback
    });

    // Make tags focusable for accessibility
    tag.setAttribute('tabindex', '0');
    tag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tag.click(); // Trigger click event on Enter or Space
        }
    });
});

// QR Modal Toggle
// Opens and closes the modal when the QR button or close button is clicked
const gcashBtn = document.querySelector('.gcash-btn');
const gcashModal = document.getElementById('gcash-modal');
const modalClose = document.querySelector('.modal-close');

gcashBtn.addEventListener('click', () => {
    gcashModal.classList.remove('hidden'); // Show the modal
});

modalClose.addEventListener('click', () => {
    gcashModal.classList.add('hidden'); // Hide the modal
});

// Close modal when clicking outside the modal content
gcashModal.addEventListener('click', (e) => {
    if (e.target === gcashModal) {
        gcashModal.classList.add('hidden'); // Hide the modal
    }
});

// Close modal with Escape key for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !gcashModal.classList.contains('hidden')) {
        gcashModal.classList.add('hidden'); // Hide the modal
    }
});