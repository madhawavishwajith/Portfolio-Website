// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the span element where the text animation will happen
    const textAnimationSpan = document.querySelector('.text-animation span');

    // Array of titles or roles to be displayed
    const roles = ['Web Designer', 'Mobile app Designer', 'Graphic Designer', 'Vector Artist'];

    // Animation state variables
    let roleIndex = 0;       // Index for the current role in the 'roles' array
    let charIndex = 0;       // Index for the current character of the role string
    let isDeleting = false;  // Boolean to track if we are deleting or typing

    // Animation speeds (in milliseconds)
    const typingSpeed = 120;
    const deletingSpeed = 80;
    const pauseBeforeDeleting = 1500; // How long to pause after a word is fully typed

    function typeAnimation() {
        // Get the current role string from the array
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // ---- DELETING LOGIC ----
            // Remove one character from the end
            textAnimationSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            // If the word is fully deleted
            if (charIndex === 0) {
                isDeleting = false; // Switch back to typing mode
                roleIndex = (roleIndex + 1) % roles.length; // Move to the next role
            }
        } else {
            // ---- TYPING LOGIC ----
            // Add one character to the end
            textAnimationSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            // If the word is fully typed
            if (charIndex === currentRole.length) {
                isDeleting = true; // Switch to deleting mode
                // Pause before starting to delete
                setTimeout(typeAnimation, pauseBeforeDeleting);
                return; // Exit the function to wait for the pause
            }
        }

        // Set the speed for the next character
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeAnimation, speed);
    }

    // Start the animation
    typeAnimation();
});
// --- SCROLL-TRIGGERED ANIMATION CODE ---

// Create an observer
const observer = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
        // If the element is visible
        if (entry.isIntersecting) {
            // Add the 'show-section' class
            entry.target.classList.add('text-animation');
        }
    });
});

// Get all the elements you want to observe
const hiddenElements = document.querySelectorAll('.about-content');

// Loop over the elements and tell the observer to watch them
hiddenElements.forEach((el) => observer.observe(el));