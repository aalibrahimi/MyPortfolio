// Command-line Interface Script
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
        if (this.commands.hasOwnProperty(cmd)) {
            return this.commands[cmd]();
        } else {
            return `Command not found: ${command}. Type 'help' for available commands.`;
        }
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

document.addEventListener('DOMContentLoaded', () => cli.init());