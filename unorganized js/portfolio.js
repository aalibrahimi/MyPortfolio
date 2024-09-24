// Initialize ScrollMagic
const controller = new ScrollMagic.Controller();

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

// Function to create typing animation
function createTypingAnimation(element, duration = 2) {
    return gsap.to(element, {
        duration: duration,
        text: element.textContent,
        ease: "none"
    });
}

// Function to reveal a section
function revealSection(section) {
    const tl = gsap.timeline();
    
    // Reveal the section
    tl.to(section, {duration: 0.5, opacity: 1, y: 0});
    
    // Animate typing for each typing-text element
    section.querySelectorAll('.typing-text').forEach(element => {
        tl.add(createTypingAnimation(element), "-=0.5");
    });

    return tl;
}

// Create scenes for each section
document.querySelectorAll('.reveal-section').forEach(section => {
    // Set initial state
    gsap.set(section, {opacity: 0, y: 50});
    section.querySelectorAll('.typing-text').forEach(element => {
        gsap.set(element, {text: ""});
    });

    // Create the scene
    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(revealSection(section))
    .addTo(controller);
});

// Animate ASCII art and name on page load
window.addEventListener('load', () => {
    const asciiArt = document.getElementById('ascii-art');
    const name = document.getElementById('name');

    const tl = gsap.timeline();
    tl.add(createTypingAnimation(asciiArt, 3))
      .add(createTypingAnimation(name), "-=0.5");
});

// Add interactive terminal effect to skills section
const skillTerminal = document.getElementById('skill-terminal');
const skillList = document.getElementById('skill-list');

skillTerminal.addEventListener('click', () => {
    if (skillList.style.display === 'none' || skillList.style.display === '') {
        skillList.style.display = 'block';
        gsap.from(skillList.children, {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out"
        });
    } else {
        gsap.to(skillList.children, {
            opacity: 0,
            y: -20,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                skillList.style.display = 'none';
            }
        });
    }
});

console.log('Portfolio script loaded and running');