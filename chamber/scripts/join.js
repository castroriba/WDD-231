// --- W04 Timestamp Update ---
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
    // Set the hidden field value to the current date and time (ISO format)
    timestampField.value = new Date().toISOString();
}

// --- W04 Modal Logic (Multiple Modals) ---
const benefitLinks = document.querySelectorAll('.benefit-link');
const closeButtons = document.querySelectorAll('.close-modal-btn');

// Listener to open the modal when a 'View Benefits' button is clicked
benefitLinks.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.showModal();
        }
    });
});

// Listener to close the modal when the '❌' button is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});

// Listener to close modals when clicking the backdrop (outside the dialog)
document.querySelectorAll('dialog').forEach(modal => {
    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            modal.close();
        }
    });
});


// --- W04 Initial Card Animation/Transition ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.membership-card');
    
    cards.forEach((card, index) => {
        // Set the CSS transition property for animation
        // Delay each card's transition based on its index (staggered effect)
        card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
        
        // Use a small timeout to ensure the browser registers the initial hidden state
        // then transition to the final visible state (opacity: 1, translateY: 0)
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    });
});