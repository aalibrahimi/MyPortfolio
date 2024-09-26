// CLI initialization and functionality
const cli = {
    output: document.getElementById('cli-output'),
    input: document.getElementById('cli-input'),
    history: [],
    historyIndex: 0,

    init: function() {
        this.welcomeMessage();
        this.input.addEventListener('keydown', this.handleInput.bind(this));
        this.input.focus();
    },

    welcomeMessage: function() {
        const message = `<span class="cli-success">Welcome to Ali Alibrahimi's Portfolio CLI!</span>
<span class="cli-comment">Type 'help' for a list of available commands.</span>



`;
        this.appendOutput(message);
    },

    handleInput: function(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command !== '') {
                this.history.push(command);
                this.historyIndex = this.history.length;
                this.processCommand(command);
            }
            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.input.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                this.input.value = '';
            }
        }
    },

    processCommand: function(command) {
        this.appendOutput(`<span class="cli-variable">$ ${command}</span>`);
        
        switch(command.toLowerCase()) {
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
                this.showContact();
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
  <span class="cli-function">clear</span>    : Clear the console output
`;
        this.appendOutput(helpText);
    },

    showAbout: function() {
        const aboutText = `
<span class="cli-keyword">About Ali Alibrahimi:</span>
Ali is a passionate Full-Stack Developer with a keen interest in building
innovative web solutions. With a strong foundation in both front-end and
back-end technologies, Ali strives to create seamless, user-friendly
applications that solve real-world problems.
`;
        this.appendOutput(aboutText);
    },

    showSkills: function() {
        const skillsText = `
<span class="cli-keyword">Technical Skills:</span>
• JavaScript (ES6+)   • React.js
• Node.js             • Python
• HTML5 & CSS3        • Git
• RESTful APIs        • Database Management (SQL, MongoDB)
• Responsive Design   • Test-Driven Development
`;
        this.appendOutput(skillsText);
    },

    showProjects: function() {
        const projectsText = `
<span class="cli-keyword">Notable Projects:</span>
1. <span class="cli-function">E-commerce Platform</span>
   - Full-stack application built with MERN stack
   - Features: user authentication, product catalog, shopping cart, payment integration

2. <span class="cli-function">Data Visualization Dashboard</span>
   - Interactive dashboard using D3.js and React
   - Real-time data updates and responsive design

3. <span class="cli-function">AI-Powered Chat Application</span>
   - Integrated OpenAI's GPT model for intelligent responses
   - Built with Node.js backend and React frontend

4. <span class="cli-function">Portfolio Website</span>
   - You are currently interacting with it!
   - Features this cool CLI interface
`;
        this.appendOutput(projectsText);
    },

    showContact: function() {
        const contactText = `
<span class="cli-keyword">Contact Information:</span>
• Email: ali.alibrahimi@example.com
• LinkedIn: linkedin.com/in/alialibrahimi
• GitHub: github.com/alialibrahimi
• Portfolio: alialibrahimi.com
`;
        this.appendOutput(contactText);
    },

    showResume: function() {
        const resumeText = `
<span class="cli-keyword">Ali Alibrahimi's Resume:</span>
You can view my full resume at: <span class="cli-string">https://docs.google.com/document/d/1z58CKgNj1d5XQ9NxkSaK15_fdPCzx8ev/edit?usp=sharing&ouid=114775191607140993368&rtpof=true&sd=true</span>
`;
        this.appendOutput(resumeText);
    },

    appendOutput: function(text) {
        this.output.innerHTML += text + '<br>';
        this.output.scrollTop = this.output.scrollHeight;
    },

    clearOutput: function() {
        this.output.innerHTML = '';
        this.welcomeMessage();
    }
};

// Initialize CLI when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    cli.init();
});