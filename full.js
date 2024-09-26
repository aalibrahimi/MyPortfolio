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

  
}





function createSectionScene(section) {
    var tl = gsap.timeline({ paused: true });
    
    tl.to(section, { duration: 0.2, opacity: 1, y: 0, ease: "power1.out" });
    
    section.querySelectorAll('.typing-text').forEach(function(element) {
        var originalText = element.getAttribute('data-original-text') || element.textContent.trim();
        if (originalText.length > 0) {
            element.setAttribute('data-original-text', originalText);
            element.textContent = '';
            
            tl.to(element, {
                duration: Math.max(0.5, originalText.length * 0.01), // Faster typing, minimum 0.5 seconds
                text: {
                    value: originalText,
                    delimiter: ""
                },
                ease: "none"
            }, "-=0.1"); // Reduced overlap for faster overall animation
        }
    });

    return new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.9, // Trigger slightly earlier
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
    
   
});

console.log('ScrollMagic script loaded and running');