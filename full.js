// Register the TextPlugin for GSAP
gsap.registerPlugin(TextPlugin);

// Initialize ScrollMagic
var controller = new ScrollMagic.Controller();

// Function to create typing animation for a section
function createSectionScene(section) {
    var tl = gsap.timeline();
    
    // Reveal the section
    tl.to(section, {duration: 0.3, opacity: 1, y: 0});
    
    // Type out each typing-text element in the section
    section.querySelectorAll('.typing-text').forEach(function(element) {
        var originalText = element.textContent.trim();
        if (originalText.length > 0) {
            // Store the original text as a data attribute
            element.setAttribute('data-original-text', originalText);
            // Clear the text content
            element.textContent = '';
            // Add faster typing animation to the timeline
            tl.to(element, {
                duration: 0.8, // Reduced from 2 to 0.8
                text: originalText, 
                ease: "none"
            }, "-=0.3"); // Reduced from -=0.5 to -=0.3 for quicker succession
        }
    });

    // Create a new ScrollMagic scene for this section
    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.8,
        reverse: false  // Play once, no reverse
    })
    .setTween(tl)
    .addTo(controller);
}

// Wait for DOM to load and then initialize animations
document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('section');

    sections.forEach(function(section) {
        // Set initial state of sections (hidden with y-offset)
        gsap.set(section, {opacity: 0, y: 30}); // Reduced y-offset for quicker reveal
        
        // Create the ScrollMagic and GSAP scene for each section
        createSectionScene(section);
    });

    console.log('Fast ScrollMagic animations initialized');
});

// Log to console to verify script is running
console.log('ScrollMagic script loaded and running');


// Log to console to verify script is running
console.log('ScrollMagic script loaded and running');


// Command-line Interface
const cli = {
    output: document.getElementById('cli-output'),
    input: document.getElementById('cli-input'),
    commands: {
        help: () => `Available commands:
  help - Show this help message
  about - About Ali Alibrahimi
  skills - List skills
  projects - List projects
  contact - Show contact information
  clear - Clear the console`,
        about: () => `Ali Alibrahimi
Full-Stack Developer | Problem Solver | Code Enthusiast`,
        skills: () => `Skills:
- JavaScript: Expert
- Python: Proficient
- React: Advanced
- Node.js: Advanced
- CSS/SASS: Expert
- HTML5: Expert
- SQL: Proficient
- Git: Advanced
- WebGL: Intermediate
- Three.js: Intermediate`,
        projects: () => `Projects:
1. E-commerce Platform
2. Data Visualization Dashboard
3. RESTful API
4. Machine Learning Model`,
        contact: () => `Contact Information:
Email: ali@example.com
LinkedIn: linkedin.com/in/alialibrahimi
GitHub: github.com/alialibrahimi`,
        clear: () => {
            cli.output.innerHTML = '';
            return '';
        }
    },
    execute(command) {
        const cmd = command.toLowerCase().trim();
        return this.commands.hasOwnProperty(cmd) 
            ? this.commands[cmd]() 
            : `Command not found: ${command}. Type 'help' for available commands.`;
    },
    init() {
        if (this.input) {
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const command = this.input.value;
                    this.output.innerHTML += `\n> ${command}\n${this.execute(command)}\n`;
                    this.input.value = '';
                    this.output.scrollTop = this.output.scrollHeight;
                }
            });
            this.output.innerHTML = 'Welcome to Ali Alibrahimi\'s portfolio. Type \'help\' for available commands.\n';
        } else {
            console.error('CLI input element not found');
        }
    }
};

// ASCII Art and Name Animation
function animateIntro() {
    const asciiArt = document.getElementById('ascii-art');
    const name = document.getElementById('name');

    if (asciiArt && name) {
        const tl = gsap.timeline();
        tl.add(createTypingAnimation(asciiArt, 3))
          .add(createTypingAnimation(name), "-=0.5");
    }
}

// Skills Terminal Effect
function initSkillsTerminal() {
    const skillTerminal = document.getElementById('skill-terminal');
    const skillList = document.getElementById('skill-list');

    if (skillTerminal && skillList) {
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
    }
}

// Log to console to verify script is running
console.log('ScrollMagic script loaded and running');

// Initialize the command-line interface (CLI) and animations
document.addEventListener('DOMContentLoaded', () => {
    cli.init();
    initSkillsTerminal();
    animateIntro();
});
