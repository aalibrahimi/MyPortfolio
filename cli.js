const cli = {
    output: null,
    input: null,
    history: [],
    historyIndex: 0,
    commands: ['help', 'about', 'skills', 'projects', 'contact', 'resume', 'clear'],
    suggestions: [],
    suggestionIndex: -1,
    projectDetails: {
        1: {
            title: "E-commerce Platform",
            overview: "• Full-stack application built with MERN stack\n• Features: user authentication, product catalog, shopping cart",
            detailed: `
<span class="cli-keyword">E-commerce Platform - Detailed Overview</span>

<span class="cli-function">Technical Stack:</span>
• Frontend: React.js, Redux, Material-UI
• Backend: Node.js, Express.js
• Database: MongoDB with Mongoose
• Authentication: JWT, OAuth2.0
• Payment: Stripe API Integration

<span class="cli-function">Key Features:</span>
• Advanced product search and filtering
• Real-time inventory management
• Multi-vendor support
• Order tracking system
• Admin dashboard
• Analytics and reporting
• Mobile-responsive design

<span class="cli-function">Performance Metrics:</span>
• 50,000+ monthly active users
• 99.9% uptime
• 2.5s average page load time
• 95% customer satisfaction rate

<span class="cli-function">Development Practices:</span>
• Test-Driven Development with Jest
• CI/CD pipeline with GitHub Actions
• Microservices architecture
• Docker containerization
• AWS deployment with auto-scaling`
        },
        2: {
            title: "Analytics Dashboard",
            overview: "• Real-time data visualization using D3.js and React\n• Backend built with Node.js and WebSocket",
            detailed: `
<span class="cli-keyword">Analytics Dashboard - Detailed Overview</span>

<span class="cli-function">Technical Stack:</span>
• Frontend: React.js, D3.js, TailwindCSS
• Backend: Node.js, Socket.io
• Database: TimescaleDB
• APIs: RESTful + WebSocket

<span class="cli-function">Key Features:</span>
• Real-time data updates
• Custom chart builder
• Data export capabilities
• Role-based access control
• Interactive data filtering
• Customizable dashboards
• Automated reporting

<span class="cli-function">Implementation Details:</span>
• Complex data aggregation
• Time-series analysis
• Custom D3.js visualizations
• Responsive design system
• Memory optimization`
        },
        3: {
            title: "Task Management System",
            overview: "• Built with Next.js and TypeScript\n• Real-time updates using Socket.io",
            detailed: `
<span class="cli-keyword">Task Management System - Detailed Overview</span>

<span class="cli-function">Technical Stack:</span>
• Frontend: Next.js, TypeScript, TailwindCSS
• Backend: Node.js, Express
• Database: PostgreSQL
• Real-time: Socket.io
• Authentication: NextAuth.js

<span class="cli-function">Key Features:</span>
• Kanban board view
• Sprint planning tools
• Time tracking
• Team collaboration
• File attachments
• Custom workflows
• Integration with GitHub

<span class="cli-function">Advanced Capabilities:</span>
• Automated task assignment
• Priority management
• Resource allocation
• Progress tracking
• Performance analytics`
        },
        4: {
            title: "Portfolio CLI",
            overview: "• Interactive command-line interface\n• Built with vanilla JavaScript",
            detailed: `
<span class="cli-keyword">Portfolio CLI - Detailed Overview</span>

<span class="cli-function">Technical Stack:</span>
• Vanilla JavaScript
• HTML5/CSS3
• Custom CLI Engine

<span class="cli-function">Key Features:</span>
• Command history
• Auto-completion
• Interactive UI
• Custom event system
• Responsive design
• Accessibility support

<span class="cli-function">Implementation Details:</span>
• Custom command parser
• Event-driven architecture
• State management system
• Error handling
• Cross-browser compatibility`
        }
    },

    init: function() {
        this.output = document.getElementById('cli-output');
        this.input = document.getElementById('cli-input');
        if (!this.output || !this.input) {
            console.error('CLI elements not found');
            return;
        }
        this.welcomeMessage();
        this.setupEventListeners();
        this.input.focus();
    },

    setupEventListeners: function() {
        this.input.addEventListener('keydown', this.handleInput.bind(this));
        this.input.addEventListener('input', this.handleAutocomplete.bind(this));
        document.addEventListener('click', () => this.input.focus());
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.copyToClipboard();
            }
        });
    },

    welcomeMessage: function() {
        const message = `<span class="cli-success">Welcome to Ali Alibrahimi's Portfolio CLI!</span>
<span class="cli-comment">
<span class="cli-keyword">Available commands:</span>
  <span class="cli-function">help</span>     : Show this help message
  <span class="cli-function">about</span>    : Display information about Ali Alibrahimi
  <span class="cli-function">skills</span>   : List Ali's technical skills
  <span class="cli-function">projects</span> : Show Ali's notable projects
  <span class="cli-function">contact</span>  : Display contact information
  <span class="cli-function">resume</span>   : View Ali's resume
  <span class="cli-function">clear</span>    : Clear the console output</span>`;
        this.appendOutput(message);
    },

    handleAutocomplete: function(e) {
        const inputValue = this.input.value.toLowerCase();
        this.suggestions = this.commands.filter(cmd => 
            cmd.startsWith(inputValue) && cmd !== inputValue
        );
        
        if (this.suggestions.length > 0) {
            this.showSuggestions();
        } else {
            this.hideSuggestions();
        }
    },

    showSuggestions: function() {
        let suggestionsBox = document.getElementById('cli-suggestions');
        if (!suggestionsBox) {
            suggestionsBox = document.createElement('div');
            suggestionsBox.id = 'cli-suggestions';
            this.input.parentNode.appendChild(suggestionsBox);
        }

        suggestionsBox.innerHTML = this.suggestions
            .map((cmd, index) => `<div class="suggestion-item${index === this.suggestionIndex ? ' selected' : ''}">${cmd}</div>`)
            .join('');

        suggestionsBox.style.display = 'block';
    },

    hideSuggestions: function() {
        const suggestionsBox = document.getElementById('cli-suggestions');
        if (suggestionsBox) {
            suggestionsBox.style.display = 'none';
            this.suggestionIndex = -1;
        }
    },

    handleInput: function(e) {
        const suggestionsBox = document.getElementById('cli-suggestions');
        
        switch(e.key) {
            case 'Tab':
                e.preventDefault();
                if (this.suggestions.length > 0) {
                    this.input.value = this.suggestions[0];
                    this.hideSuggestions();
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (suggestionsBox && suggestionsBox.style.display === 'block') {
                    this.suggestionIndex = Math.max(0, (this.suggestionIndex > 0 ? this.suggestionIndex : this.suggestions.length) - 1);
                    this.showSuggestions();
                } else if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.history[this.historyIndex];
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (suggestionsBox && suggestionsBox.style.display === 'block') {
                    this.suggestionIndex = Math.min(this.suggestions.length - 1, this.suggestionIndex + 1);
                    this.showSuggestions();
                } else if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.history[this.historyIndex];
                } else {
                    this.historyIndex = this.history.length;
                    this.input.value = '';
                }
                break;

            case 'Enter':
                this.hideSuggestions();
                const command = this.input.value.trim();
                if (command !== '') {
                    this.history.push(command);
                    this.historyIndex = this.history.length;
                    this.processCommand(command);
                }
                this.input.value = '';
                break;

            case 'Escape':
                this.hideSuggestions();
                break;
        }
    },

    processCommand: function(command) {
        const [mainCommand, ...args] = command.toLowerCase().split(' ');
        
        this.appendOutput(`<span class="cli-variable">ali@developer:~$ ${command}</span>`, true);
        
        // Check if the command is a number (for project details)
        if (!isNaN(mainCommand) && mainCommand > 0 && mainCommand <= Object.keys(this.projectDetails).length) {
            this.showProjectDetails(mainCommand);
            return;
        }

        switch(mainCommand) {
            case 'help':
                this.showHelp();
                break;
            case 'about':
                this.showAbout();
                break;
            case 'skills':
                this.showSkills();
                break;
            case 'projects':
                this.showProjects();
                break;
            case 'contact':
                if (args.length > 0) {
                    this.handleContactInteraction(args[0]);
                } else {
                    this.showContact();
                }
                break;
            case 'clear':
                this.clearOutput();
                break;
            case 'resume':
                this.showResume();
                break;
            default:
                this.appendOutput(`<span class="cli-error">Command not recognized. Type 'help' for a list of commands.</span>`);
        }
    },

    showHelp: function() {
        const helpText = `
<span class="cli-keyword">Available commands:</span>
  <span class="cli-function">help</span>     : Show this help message
  <span class="cli-function">about</span>    : Display information about Ali Alibrahimi
  <span class="cli-function">skills</span>   : List Ali's technical skills
  <span class="cli-function">projects</span> : Show Ali's notable projects
  <span class="cli-function">contact</span>  : Display contact information
  <span class="cli-function">resume</span>   : View Ali's resume
  <span class="cli-function">clear</span>    : Clear the console output`;
        this.appendOutput(helpText);
    },

    showAbout: function() {
        const aboutText = `
<span class="cli-keyword">About Ali Alibrahimi:</span>
I'm a passionate Full-Stack Developer with a strong foundation in modern web technologies.
Focused on creating efficient, scalable, and user-friendly applications that solve real-world problems.
Currently specializing in React.js, Node.js, and cloud technologies.`;
        this.appendOutput(aboutText);
    },

    showSkills: function() {
        const skillsText = `
<span class="cli-keyword">Technical Skills:</span>

<span class="cli-function">Frontend:</span>
  • React.js/Next.js
  • JavaScript (ES6+)
  • HTML5 & CSS3/Sass
  • TypeScript
  • Redux/Context API

<span class="cli-function">Backend:</span>
  • Node.js/Express
  • Python/Django
  • RESTful APIs
  • GraphQL
  • Firebase

<span class="cli-function">Database:</span>
  • MongoDB
  • PostgreSQL
  • MySQL
  • Redis

<span class="cli-function">DevOps & Tools:</span>
  • Git/GitHub
  • Docker
  • AWS
  • CI/CD
  • Linux/Unix`;
        this.appendOutput(skillsText);
    },

    showProjects: function() {
        const projectsText = `
<span class="cli-keyword">Notable Projects:</span>
${Object.entries(this.projectDetails).map(([id, project]) => `
${id}. <span class="cli-function cli-project-link" data-project="${id}">${project.title}</span>
${project.overview}`).join('\n')}

<span class="cli-comment">Type the project number or click on a project name for detailed information</span>`;
        this.appendOutput(projectsText);
        this.addProjectEventListeners();
    },

    showProjectDetails: function(projectId) {
        const project = this.projectDetails[projectId];
        if (project) {
            this.appendOutput(project.detailed);
        } else {
            this.appendOutput(`<span class="cli-error">Project not found. Available projects: 1-${Object.keys(this.projectDetails).length}</span>`);
        }
    },

    addProjectEventListeners: function() {
        const projectLinks = this.output.querySelectorAll('.cli-project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const projectId = e.target.getAttribute('data-project');
                this.showProjectDetails(projectId);
            });
        });
    },

    showContact: function() {
        const contactText = `
<span class="cli-keyword">Contact Information:</span>
• <span class="cli-link" data-action="email"><i class="fas fa-envelope"></i> Email: aalibrahimi0@gmail.com</span>
• <span class="cli-link" data-action="linkedin"><i class="fab fa-linkedin"></i> LinkedIn: linkedin.com/in/aalibrahimi</span>
• <span class="cli-link" data-action="github"><i class="fab fa-github"></i> GitHub: github.com/aalibrahimi</span>
• <span class="cli-link" data-action="website"><i class="fab fa-globe"></i> Website: codewithali.com</span>

<span class="cli-comment">Type 'contact [option]' or click on a link to interact</span>`;
        this.appendOutput(contactText);
        this.addContactEventListeners();
    },

    handleContactInteraction: function(action) {
        switch(action) {
            case 'email':
                window.location.href = 'mailto:aalibrahimi0@gmail.com';
                break;
            case 'linkedin':
                window.open('https://linkedin.com/in/aalibrahimi', '_blank');
                break;
            case 'github':
                window.open('https://github.com/aalibrahimi', '_blank');
                break;
            case 'website':
                window.open('https://codewithali.com', '_blank');
                break;
            default:
                this.appendOutput(`<span class="cli-error">Invalid contact option. Available options: email, linkedin, github</span>`);
        }
    },

    showResume: function() {
        const resumeText = `
<span class="cli-keyword">Resume:</span>
Download my resume or view it online:
<span class="cli-link" onclick="window.open('/resume.pdf', '_blank')">View/Download Resume (PDF)</span>`;
        this.appendOutput(resumeText);
    },

    addContactEventListeners: function() {
        const links = this.output.querySelectorAll('.cli-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                if (action) { this.handleContactInteraction(action);
                }
            });
        });
    },

    copyToClipboard: function() {
        const textToCopy = this.output.textContent;
        navigator.clipboard.writeText(textToCopy).then(
            () => this.appendOutput('<span class="cli-success">Output copied to clipboard!</span>'),
            () => this.appendOutput('<span class="cli-error">Failed to copy output.</span>')
        );
    },

    appendOutput: function(text, skipTimestamp = false) {
        if (this.output) {
            const timestamp = new Date().toLocaleTimeString();
            const timestampHtml = skipTimestamp ? '' : `<span class="cli-timestamp">[${timestamp}]</span>`;
            this.output.innerHTML += `${text}${timestampHtml}<br>`;
            this.output.scrollTop = this.output.scrollHeight;
            this.addContactEventListeners();
            this.addProjectEventListeners();
        } else {
            console.error('Output element not found');
        }
    },

    clearOutput: function() {
        if (this.output) {
            this.output.innerHTML = '';
            this.welcomeMessage();
        } else {
            console.error('Output element not found');
        }
    }
};

// Initialize CLI when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    cli.init();
});