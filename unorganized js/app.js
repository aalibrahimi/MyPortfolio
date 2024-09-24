// Sample project data (replace with your actual projects)
const projects = [
    { id: 1, title: "E-commerce Platform", category: "Full-Stack" },
    { id: 2, title: "Data Visualization Dashboard", category: "Frontend" },
    { id: 3, title: "RESTful API", category: "Backend" },
    { id: 4, title: "Machine Learning Model", category: "Python" }
];

// Function to display projects
function displayProjects(projectsToShow = projects) {
    const projectsSection = document.getElementById('projects');
    projectsSection.innerHTML = '<h2>Projects</h2>';
    
    projectsToShow.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>Category: ${project.category}</p>
        `;
        projectsSection.appendChild(projectElement);
    });
}

// Function to filter projects
function filterProjects(category) {
    const filteredProjects = category === 'All' 
        ? projects 
        : projects.filter(project => project.category === category);
    displayProjects(filteredProjects);
}

// Function to handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    
    // For now, just log the data. We'll implement actual sending later.
    console.log('Form submitted:', formProps);
    alert('Thank you for your message! I\'ll get back to you soon.');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactSubmit);
});

