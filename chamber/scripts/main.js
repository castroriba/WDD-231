// --- W03 Chamber Footer Updates (Criteria 13) ---

// 1. Update Copyright Year
const yearElement = document.querySelector('#year');
if (yearElement) {
    // Get the current four-digit year
    yearElement.textContent = new Date().getFullYear();
}

// 2. Update Last Modified Date
const modifiedElement = document.querySelector('#lastModified');
if (modifiedElement) {
    // document.lastModified returns the last modified date/time of the current document
    modifiedElement.textContent = document.lastModified;
}

// --- W01/W02 Mobile Menu Toggle ---
// This is typically needed for mobile navigation functionality
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.setAttribute('aria-expanded', !isExpanded);
    });
}