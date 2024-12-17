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
    "AliOS BIOS Version 10.2024",
    "CPU: AliTech Core - Optimized for Front-End Development",
    "Memory Test: 6 Years of Software Development Experience",
    "Hard Disk: 80 MB - Loaded with Creative Projects",
    "Loading portfolio.sys...",
    "Loading: Front-End Developer & UI/UX Designer",
    "Skills: Node.js, React, Next.js, Tailwind CSS",
    "Projects: Responsive Websites & Interactive Apps",
    "Welcome to Ali's Portfolio OS"
];


let isSkipped = false;
const typingSpeed = 4; // Reduced from 1 to 0.5 for faster typing
const lineDelay = 0.5; // Reduced from 1 to 0.5 for faster progression between lines

function createLoadingBar() {
    const style = document.createElement('style');
    style.textContent = `
        #loading-bar-container {
            --bottom-position: -60%;
        }
        @media (max-width: 1024px) {
            #loading-bar-container {
                --bottom-position: -80%;
            }
        }
        @media (max-width: 768px) {
            #loading-bar-container {
                --bottom-position: -80%;
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
        bottom: -32%;
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
        setTimeout(() => typeWriter(text, i, fnCallback), typingSpeed);
    } else if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, lineDelay * 1000); // Convert lineDelay to milliseconds
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
        
        // Force re-trigger of ScrollMagic scenes
        controller.update(true);
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





function createSectionScene(section, index) {
    var tl = gsap.timeline({ paused: true });
    
    tl.to(section, { duration: 0.2, opacity: 1, y: 0, ease: "power1.out" });
    
    section.querySelectorAll('.typing-text').forEach(function(element) {
        var originalText = element.getAttribute('data-original-text') || element.textContent.trim();
        if (originalText.length > 0) {
            element.setAttribute('data-original-text', originalText);
            element.textContent = '';
            
            tl.to(element, {
                duration: Math.max(0.5, originalText.length * 0.01),
                text: {
                    value: originalText,
                    delimiter: ""
                },
                ease: "none"
            }, "-=0.1");
        }
    });

    let triggerHook = 0.9;
    let offset = 0;

    // Special handling for the 3rd section
    if (index === 2 ) {  // 0-based index, so 2 is the 3rd section
        triggerHook = 0.85;  // This will trigger when 60% of the section is visible
        offset = 100;  // Add a small offset to ensure it's past 60%
    }

    return new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: triggerHook,
        offset: offset,
        reverse: false
    })
    .on('enter', function() {
        if (bootSequenceCompleted) {
            if (isSkipped) {
                tl.timeScale(2).play();
            } else {
                tl.play();
            }
        } else {
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
    sections.forEach(function(section, index) {
        gsap.set(section, {opacity: 0, y: 30});
        createSectionScene(section, index).addTo(controller);
    });
}



function createSkillBars() {
    if (skillBarsCreated) return;

    const skills = [
        { 
            name: 'JavaScript', 
            level: 90,
            details: {
                experience: '4 years',
                projects: 15,
                specialties: ['ES6+', 'TypeScript', 'React', 'Node.js'],
                recentWork: 'Built a real-time dashboard system with optimized performance and modular architecture.'
            }
        },
        { 
            name: 'React', 
            level: 85,
            details: {
                experience: '3 years',
                projects: 12,
                specialties: ['Redux', 'Hooks', 'Context API', 'Next.js'],
                recentWork: 'Developed an e-commerce platform featuring dynamic components and smooth user experiences.'
            }
        },
        { 
            name: 'Node.js', 
            level: 82,
            details: {
                experience: '3 years',
                projects: 10,
                specialties: ['Express', 'REST APIs', 'MongoDB', 'WebSocket'],
                recentWork: 'Created a real-time chat application with RESTful APIs and socket-based communication.'
            }
        },
        { 
            name: 'Python', 
            level: 78,
            details: {
                experience: '5 years',
                projects: 30,
                specialties: ['Django', 'Flask', 'Data Analysis', 'Automation'],
                recentWork: 'Developed automation scripts to process large datasets and generate analytical reports.'
            }
        },
        
        { 
            name: 'Git & GitHub', 
            level: 88,
            details: {
                experience: '5 years',
                projects: 50,
                specialties: ['Version Control', 'Branch Management', 'CI/CD Workflows', 'Code Reviews'],
                recentWork: 'Configured CI/CD pipelines for seamless deployment in collaborative projects.'
            }
        },
        { 
            name: 'SQL & Databases', 
            level: 80,
            details: {
                experience: '3 years',
                projects: 10,
                specialties: ['MySQL', 'PostgreSQL', 'ORMs (Sequelize, SQLAlchemy)', 'Query Optimization'],
                recentWork: 'Designed and optimized database schemas for scalable web applications.'
            }
        }
        
  
    ];
    

    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) {
        console.error('Skills container not found');
        return;
    }

    skillsContainer.innerHTML = '';

    function getSkillLevelDescription(level) {
        if (level >= 90) return 'Expert';
        if (level >= 80) return 'Advanced';
        if (level >= 70) return 'Proficient';
        return 'Skilled';
    }

    skills.forEach(skill => {
        const skillBar = document.createElement('div');
        skillBar.className = 'skill-bar';
        
        // Main skill bar content
        skillBar.innerHTML = `
            <div class="skill-info">
                <span class="skill-name">> ${skill.name}</span>
                <span class="skill-level-description" style="display: flex; justify-content: center;">${getSkillLevelDescription(skill.level)}</span>
                <span class="expand-btn" data-expanded="false">[+]</span>
            </div>
            <div class="skill-bar-container">
                <div class="skill-level" data-level="${skill.level}" style="width: 0%">
                    <div class="level-pulse"></div>
                </div>
                <div class="skill-percentage">0%</div>
            </div>
            <div class="skill-details" style="display: none;">
                <div class="skill-detail-content">
                    <div class="detail-line">> Experience: ${skill.details.experience}</div>
                    <div class="detail-line">> Projects: ${skill.details.projects}</div>
                    <div class="detail-line">> Specialties:</div>
                    <div class="detail-specialties">
                        ${skill.details.specialties.map(s => `   - ${s}`).join('<br>')}
                    </div>
                    <div class="detail-line">> Recent Work:</div>
                    <div class="detail-work">   ${skill.details.recentWork}</div>
                </div>
            </div>
        `;
        
        skillsContainer.appendChild(skillBar);

        // Handle expand/collapse
        const expandBtn = skillBar.querySelector('.expand-btn');
        const details = skillBar.querySelector('.skill-details');

        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close any other open details
            document.querySelectorAll('.skill-details').forEach(detail => {
                if (detail !== details && detail.style.display === 'block') {
                    detail.style.display = 'none';
                    const btn = detail.parentElement.querySelector('.expand-btn');
                    btn.textContent = '[+]';
                    btn.dataset.expanded = 'false';
                }
            });

            const isExpanded = expandBtn.dataset.expanded === 'true';
            
            if (!isExpanded) {
                details.style.display = 'block';
                expandBtn.textContent = '[-]';
                expandBtn.dataset.expanded = 'true';
                
                // Add typing animation
                details.querySelectorAll('.detail-line, .detail-specialties, .detail-work').forEach((line, index) => {
                    const text = line.textContent;
                    line.textContent = '';
                    typeText(line, text, 20 * (index + 1));
                });
            } else {
                details.style.display = 'none';
                expandBtn.textContent = '[+]';
                expandBtn.dataset.expanded = 'false';
            }
        });
    });

    // Close details when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.skill-bar')) {
            document.querySelectorAll('.skill-details').forEach(detail => {
                detail.style.display = 'none';
                const btn = detail.parentElement.querySelector('.expand-btn');
                btn.textContent = '[+]';
                btn.dataset.expanded = 'false';
            });
        }
    });

    // Create ScrollMagic scene for skill bar animations
    new ScrollMagic.Scene({
        triggerElement: "#skills-container",
        triggerHook: 0.8,
        reverse: false
    })
    .on('enter', function() {
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

// Helper function for typing animation
function typeText(element, text, delay) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }
    setTimeout(type, delay);
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