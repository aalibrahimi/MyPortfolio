// Initialize ScrollMagic and GSAP
const controller = new ScrollMagic.Controller();
gsap.registerPlugin(TextPlugin);

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
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value;
                this.output.innerHTML += `\n> ${command}\n${this.execute(command)}\n`;
                this.input.value = '';
                this.output.scrollTop = this.output.scrollHeight;
            }
        });
        this.output.innerHTML = 'Welcome to Ali Alibrahimi\'s portfolio. Type \'help\' for available commands.\n';
    }
};

// Animation Functions
function createTypingAnimation(element, duration = 2) {
    return gsap.to(element, {
        duration: duration,
        text: element.textContent,
        ease: "none"
    });
}

function revealSection(section) {
    const tl = gsap.timeline();
    tl.to(section, {duration: 0.5, opacity: 1, y: 0});
    section.querySelectorAll('.typing-text').forEach(element => {
        tl.add(createTypingAnimation(element), "-=0.5");
    });
    return tl;
}

// Initialize Animations and ScrollMagic Scenes
function initAnimations() {
    document.querySelectorAll('section').forEach(section => {
        gsap.set(section, {opacity: 0, y: 50});
        section.querySelectorAll('.typing-text').forEach(element => {
            gsap.set(element, {text: ""});
        });

        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.8,
            reverse: false
        })
        .setTween(revealSection(section))
        .addTo(controller);
    });
}

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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Reveal sections as they come into view
function revealSectionsOnScroll() {
    document.querySelectorAll('section').forEach(section => {
        if (isInViewport(section)) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    cli.init();
    initAnimations();
    initSkillsTerminal();
    animateIntro();

    // Add scroll event listener
    window.addEventListener('scroll', revealSectionsOnScroll);

    // Initial check for visible sections
    revealSectionsOnScroll();
});

console.log('Portfolio script loaded and running');