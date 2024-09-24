gsap.set(element, { text: "" });

// Initialize ScrollMagic
var controller = new ScrollMagic.Controller();
new ScrollMagic.Scene({
    triggerElement: section,
    triggerHook: 0.8,
    reverse: false
})
.setTween(revealSection(section))
.addTo(controller);


// Register the TextPlugin for GSAP
gsap.registerPlugin(TextPlugin);

// Function to create typing animation for a section
function createSectionScene(section) {
    var tl = gsap.timeline();
    
    // Reveal the section
    tl.to(section, {duration: 0.5, opacity: 1, y: 0});
    
    // Type out each typing-text element in the section
    section.querySelectorAll('.typing-text').forEach(function(element) {
        tl.to(element, {duration: 2, text: element.textContent, ease: "none"}, "-=0.5");
    });

    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(tl)
    .addTo(controller);
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    var sections = document.querySelectorAll('section');

    // Create a scene for each section
    sections.forEach(function(section) {
        // Set initial state
        gsap.set(section, {opacity: 0, y: 50});
        section.querySelectorAll('.typing-text').forEach(function(element) {
            gsap.set(element, {text: ""});
        });
        createSectionScene(section);
    });
});

// Log to console to verify script is running
console.log('ScrollMagic script loaded and running');