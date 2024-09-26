// Register the TextPlugin for GSAP
gsap.registerPlugin(TextPlugin);

// Initialize ScrollMagic
var controller = new ScrollMagic.Controller();
let skillBarsCreated = false;
let bootSequenceCompleted = false;


function disableScroll(){
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    //styles to prevent scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.left = `-${scrollLeft}px`;
}

function enableScroll(){
    //noww we remove the style preventing the scrolling
    document.body.style.overflow = '';
    document.body.style.position = '';

    //get the scroll position from the bodys top position
    const scrollY = document.body.style.top;
    document.body.style.top = '';
    document.body.style.left= '';

    //scroll to where the user waas  before the disabling scroll
    window.scrollTo(0, parseInt(scrollY || '0') *  -1)

}

const bootText = [
    "BIOS Version 1.0.2424",
    "Copyright (C) 2024, Ali Alibrahimi",
    "CPU: AliTech 686 at 66 MHz",
    "Memory Test: 640K OK",
    "Hard Disk: 80 MB",
    "Loading portfolio.sys...",
    "Welcome to Ali's Portfolio OS"
];

let isSkipped = false;
const typingSpeed = 25;

function createLoadingBar() {
    const style = document.createElement('style');
    style.textContent = `
        #loading-bar-container {
            --bottom-position: -37%;
        }
        @media (max-width: 1024px) {
            #loading-bar-container {
                --bottom-position: -30%;
            }
        }
        @media (max-width: 768px) {
            #loading-bar-container {
                --bottom-position: -70%;
            }
        }
        @media (max-width: 480px) {
            #loading-bar-container {
                --bottom-position: -80%;
            }
        }
    `;
    document.head.appendChild(style);

    const loadingBarContainer = document.createElement('div');
    loadingBarContainer.id = 'loading-bar-container';
    loadingBarContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: var(--bottom-position);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Courier New', monospace;
        color: #00ff00;
    `;

    const loadingText = document.createElement('div');
    loadingText.id = 'loading-text';
    loadingText.textContent = 'Loading...';
    loadingText.style.marginBottom = '10px';

    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        width: 300px;
        background-color: #111;
        border: 1px solid #00ff00;
        height: 20px;
        position: relative;
    `;

    const loadingBar = document.createElement('div');
    loadingBar.id = 'loading-bar';
    loadingBar.style.cssText = `
        width: 0%;
        height: 100%;
        background-color: #00ff00;
        transition: width 0.5s ease-out;
    `;

    const progressText = document.createElement('div');
    progressText.id = 'progress-text';
    progressText.style.cssText = `
        position: absolute;
        right: -40px;
        top: 50%;
        transform: translateY(-50%);
        color: #00ff00;
    `;

    const skipText = document.createElement('div');
    skipText.id = 'skip-text';
    skipText.textContent = 'Press any key to skip';
    skipText.style.cssText = `
        margin-top: 10px;
        font-size: 0.8em;
        color: #888;
    `;

    progressContainer.appendChild(loadingBar);
    progressContainer.appendChild(progressText);
    loadingBarContainer.appendChild(loadingText);
    loadingBarContainer.appendChild(progressContainer);
    loadingBarContainer.appendChild(skipText);

    const bootSequence = document.getElementById('boot-sequence');
    if (bootSequence) {
        bootSequence.appendChild(loadingBarContainer);
    } else {
        console.error('Boot sequence container not found');
    }
}

function updateLoadingBar(progress) {
    const loadingBar = document.getElementById('loading-bar');
    const progressText = document.getElementById('progress-text');
    if (loadingBar && progressText) {
        loadingBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}`;
    }
}

function typeWriter(text, i, fnCallback) {
    const bootText = document.getElementById("boot-text");
    if (!bootText) {
        console.error('Boot text container not found');
        return;
    }
    if (isSkipped) {
        bootText.innerHTML += text;
        if (typeof fnCallback === 'function') {
            fnCallback();
        }
        return;
    }
    if (i < text.length) {
        bootText.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(text, i, fnCallback), 25);
    } else if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 700);
    }
}

function startBootSequence(i) {
    if (i === 0) {
        createLoadingBar();
        disableScroll();
    }
    if (i < bootText.length && !isSkipped) {
        typeWriter(bootText[i] + "\n", 0, () => {
            updateLoadingBar((i + 1) / bootText.length * 100);
            setTimeout(() => startBootSequence(i + 1), 300);
        });
    } else {
        completeBootSequence();
    }
}

function completeBootSequence() {
    console.log('Boot sequence completed');
    updateLoadingBar(100);
    setTimeout(function() {
        const bootSequence = document.getElementById("boot-sequence");
        bootSequence.style.opacity = '0';
        bootSequence.style.transition = 'opacity 1s ease-out';
        setTimeout(() => {
            bootSequence.style.display = 'none';
            document.body.classList.add("loaded");
            enableScroll();
            bootSequenceCompleted = true; // Set the flag here
            revealMainContent();
        }, 1000);
    }, 1000);
}

function skipBootSequence() {
    if (!isSkipped) {
        isSkipped = true;
        document.getElementById("boot-text").innerHTML = bootText.join("\n");
        completeBootSequence();
    }
}


function revealMainContent() {
    console.log('Revealing main content started');
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        console.log('Main content found');
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';

        // Initialize ScrollMagic immediately
        initScrollMagic();
        createSkillBars();
    } else {
        console.error('Main content not found');
    }

    cli.init();
}





function createSectionScene(section) {
    var tl = gsap.timeline({ paused: true });
    
    tl.to(section, { duration: 0.3, opacity: 1, y: 0 });
    
    section.querySelectorAll('.typing-text').forEach(function(element) {
        var originalText = element.getAttribute('data-original-text') || element.textContent.trim();
        if (originalText.length > 0) {
            element.setAttribute('data-original-text', originalText);
            element.textContent = '';
            
            tl.to(element, {
                duration: originalText.length * 0.03, // Adjust speed as needed
                text: {
                    value: originalText,
                    delimiter: ""
                },
                ease: "none"
            }, "-=0.2");
        }
    });

    return new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.8,
        reverse: false
    })
    .on('enter', function() {
        if (bootSequenceCompleted) {
            tl.play();
        } else {
            // If boot sequence hasn't completed, show text immediately
            section.querySelectorAll('.typing-text').forEach(function(element) {
                element.textContent = element.getAttribute('data-original-text') || '';
            });
        }
    });
}

function initScrollMagic() {
    console.log('Initializing ScrollMagic');
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        gsap.set(section, {opacity: 0, y: 30});
        createSectionScene(section).addTo(controller);
    });
}


const cli = {
    output: null,
    input: null,
    commands: {
        help: () => `Available commands:
  help       - Show this help message
  about      - About Ali Alibrahimi
  skills     - List skills
  projects   - List projects
  experience - Show work experience
  education  - Show educational background
  contact    - Show contact information
  social     - Show social media links
  achievements - List of notable achievements
  resume     - Get link to download resume
  clear      - Clear the console`,
        about: () => `Ali Alibrahimi
Trilingual full-stack developer and coding instructor with expertise in React, Node.js, and advanced programming concepts. Passionate about creating innovative tech solutions and inspiring young learners.`,
        skills: () => `Relevant Skills:
• Programming Languages: Java, Python, C#, HTML, CSS, JavaScript/TypeScript, SQL
• Frameworks/Tools: React.js, Next.js, Node.js, Flask, .NET, Git, Docker, CUDA
• Cloud Platforms: AWS, Google Cloud Platform (GCP)
• Operating Systems: Linux, Windows
• Databases: MySQL, NoSQL
• Languages: Arabic, English, Spanish`,
        projects: () => `Relevant Projects:
1. E-commerce Website (React, Node.js, Stripe)
   - Developed a full-stack e-commerce platform with user authentication, product catalog, and secure payment processing
   - Implemented responsive design, resulting in a 30% increase in mobile user engagement
   - Optimized front-end performance using React Suspense and Code Splitting, achieving a 40% reduction in load time

2. Weather Forecast Application
   - Built a web application using Python and Flask to fetch and display real-time weather data using an API`,
        experience: () => `Work Experience:
1. Code With Us, Campbell, CA (March 2023 - Present)
   Coding Instructor
   - Developed microservices using Node.js for progress tracking and personalized learning paths
   - Architected and implemented an advanced game development curriculum
   - Implemented complex coding concepts in age-appropriate projects

2. The Coder School, Los Gatos, CA (February 2022 - Present)
   Coding Tutor
   - Designed and delivered a comprehensive full-stack development boot camp
   - Implemented an innovative peer code review system

3. IMAC, Santa Clara, CA (June 2022 - August 2022)
   IT Tech Support
   - Engineered and deployed a containerized imaging solution
   - Developed Python scripts to automate troubleshooting
   - Created a custom monitoring solution using ELK stack`,
        education: () => `Education:
• Grand Canyon University, Phoenix, AZ
  Bachelor of Science in Computer Science (Expected June 2025)
  GPA: 3.8/4.0

• Mission College, Santa Clara, CA
  Associate of Arts in Computer Information Systems (CIS) (May 2022)
  GPA: 3.7/4.0

Certifications: Google Cyber Security, Google IT Tech, Google Python`,
        contact: () => `Contact Information:
• Location: San Jose, CA
• Phone: (408) 690-4009
• Email: aalibrahimi@gmail.com`,
        social: () => `Social Media:
• LinkedIn: linkedin.com/in/aalibrahimi
• GitHub: github.com/aalibrahimi`,


        achievements: () => `Achievements:
• Improved student performance by an average of 30% through customized learning plans
• Maintained a 98% customer satisfaction rate in IT support role
• Reduced system downtime by 35% through custom monitoring solutions`,
resume: function() {
    const resumeUrl = "https://docs.google.com/document/d/1z58CKgNj1d5XQ9NxkSaK15_fdPCzx8ev/edit?usp=sharing&ouid=114775191607140993368&rtpof=true&sd=true";
    
    this.output.innerHTML += "Would you like to open my resume? (y/n)\n";
    this.isWaitingForResumeResponse = true;
    
    return ''; // Return empty string as the output is already handled
},

clear: () => {
    cli.output.innerHTML = '';
    return '';
}
},
execute(command) {
if (this.isWaitingForResumeResponse) {
    this.handleResumeResponse(command);
    return '';
}

const cmd = command.toLowerCase().trim();
if (cmd === '') {
    return ''; // Return empty string for empty commands
}
if (this.commands.hasOwnProperty(cmd)) {
    return this.commands[cmd].call(this);
} else {
    return `Command not found: '${command}'. Type 'help' for available commands.`;
}
},
handleResumeResponse(response) {
const resumeUrl = "https://docs.google.com/document/d/1z58CKgNj1d5XQ9NxkSaK15_fdPCzx8ev/edit?usp=sharing&ouid=114775191607140993368&rtpof=true&sd=true";

if (response.toLowerCase() === 'y') {
    window.open(resumeUrl, '_blank');
    this.output.innerHTML += "Opening resume in a new tab.\n";
} else if (response.toLowerCase() === 'n') {
    this.output.innerHTML += "Resume not opened. You can always use the 'resume' command again to view it.\n";
} else {
    this.output.innerHTML += "";
    return; // Keep waiting for a valid response
}

this.isWaitingForResumeResponse = false;
},
mainInputHandler: function(e) {
if (e.key === 'Enter') {
    const command = this.input.value;
    this.output.innerHTML += `\n> ${command}\n`;
    const result = this.execute(command);
    if (result !== '') {
        this.output.innerHTML += `${result}\n`;
    }
    this.input.value = '';
    this.output.scrollTop = this.output.scrollHeight;
}
},
init() {
this.output = document.getElementById('cli-output');
this.input = document.getElementById('cli-input');

if (this.input && this.output) {
    this.mainInputHandler = this.mainInputHandler.bind(this);
    this.input.addEventListener('keydown', this.mainInputHandler);
    this.output.innerHTML = 'Welcome to Ali Alibrahimi\'s portfolio. Type \'help\' for available commands.\n';
} else {
    console.error('CLI input or output element not found');
}
}
};


function createSkillBars() {
    if (skillBarsCreated) return; // Prevent duplicate creation

    const skills = [
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'Python', level: 85 },
        { name: 'SQL', level: 70 },
        { name: 'Git', level: 75 }
    ];

    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) {
        console.error('Skills container not found');
        return;
    }

    skillsContainer.innerHTML = ''; // Clear existing content

    skills.forEach(skill => {
        const skillBar = document.createElement('div');
        skillBar.className = 'skill-bar';
        skillBar.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar-container">
                <div class="skill-level" data-level="${skill.level}" style="width: 0%"></div>
                <div class="skill-percentage">0%</div>
            </div>
        `;
        skillsContainer.appendChild(skillBar);
    });

    // Create a ScrollMagic scene for the skills section
    new ScrollMagic.Scene({
        triggerElement: "#skills-container",
        triggerHook: 0.8,
        reverse: false
    })
    .on('enter', function() {
        // Animate all skill bars and percentages when the section enters the viewport
        document.querySelectorAll('.skill-bar-container').forEach(container => {
            const skillLevel = container.querySelector('.skill-level');
            const skillPercentage = container.querySelector('.skill-percentage');
            const level = skillLevel.getAttribute('data-level');
            
            gsap.to(skillLevel, {
                width: `${level}%`,
                duration: 1,
                ease: "power2.out"
            });

            gsap.to(skillPercentage, {
                innerHTML: `${level}%`,
                duration: 1,
                roundProps: "innerHTML",
                ease: "power2.out"
            });
        });
    })
    .addTo(controller);

    skillBarsCreated = true;
}

function initializePortfolio() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    form.reset();
                } else {
                    formStatus.textContent = 'Failed to send message. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = 'An error occurred. Please try again later.';
            });
        });
    }
}

// Single DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    disableScroll();
    startBootSequence(0);
    initializePortfolio();
    document.addEventListener('keydown', skipBootSequence);
    cli.init();
   
});

console.log('ScrollMagic script loaded and running');