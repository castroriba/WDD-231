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
        // Toggle the ARIA expanded state for accessibility
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        // Toggle the navigation visibility (CSS handles the display change based on the attribute)
        mainNav.setAttribute('aria-expanded', !isExpanded);
    });
}

/* --- W04 MISSION MODAL LOGIC --- */
const missionModal = document.querySelector('#mission-modal');
const closeMissionModal = document.querySelector('#closeMissionModal');
const HAS_VISITED_KEY = 'chamberHasVisited';

// Function to display the modal only if it's the user's first visit
function checkFirstVisitAndShowModal() {
    // Check localStorage to see if the user has visited before
    if (localStorage.getItem(HAS_VISITED_KEY) !== 'true') {
        missionModal.showModal();
        // Set flag so the modal doesn't show up on the next load
        localStorage.setItem(HAS_VISITED_KEY, 'true'); 
    }
}

// 1. Add event listener to close button
if (closeMissionModal) {
    closeMissionModal.addEventListener('click', () => {
        missionModal.close();
    });
}

// 2. Add event listener to close modal when clicking outside (on the backdrop)
if (missionModal) {
    missionModal.addEventListener('click', (e) => {
        const dialogDimensions = missionModal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            missionModal.close();
        }
    });
}

// 3. Run the check when the page loads
// We call this function AFTER the main document initialization
document.addEventListener('DOMContentLoaded', () => {
    // Only run this function on the Home page (index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // Ensure the modal element exists before trying to show it
        if (missionModal) {
            checkFirstVisitAndShowModal();
        }
    }
});