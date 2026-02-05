// Projects loader for homepage
let allProjects = [];

// Load projects from markdown files
async function loadProjects() {
    try {
        // Initialize markdown loader
        const loader = new MarkdownLoader('Kromula/portfolio-website', 'master');

        // Fetch all markdown files from projects directory
        const projects = await loader.fetchMarkdownFiles('projects');

        if (projects.length === 0) {
            // No projects yet - show placeholder
            displayPlaceholderProjects();
            return;
        }

        // Filter featured projects and sort by order
        allProjects = projects
            .filter(project => project.featured !== 'false' && project.featured !== false)
            .sort((a, b) => {
                const orderA = parseInt(a.order) || 0;
                const orderB = parseInt(b.order) || 0;
                return orderA - orderB;
            });

        displayProjects(allProjects);
    } catch (error) {
        console.error('Error loading projects:', error);
        displayPlaceholderProjects();
    }
}

// Display projects
function displayProjects(projects) {
    const container = document.querySelector('.project-grid');
    if (!container) return;

    container.innerHTML = projects.map(project => {
        const icon = project.icon || getStatusIcon(project.status);
        const statusClass = getStatusClass(project.status);

        return `
            <div class="project-card">
                ${project.featured_image ?
                    `<div class="project-image" style="background-image: url('${project.featured_image}'); background-size: cover; background-position: center;">
                    </div>` :
                    `<div class="project-image">${icon}</div>`
                }
                <div class="project-info">
                    <h3 class="display">${project.title}</h3>
                    <div class="project-tags">
                        ${project.status ? `<span class="tag tag-${statusClass}">${project.status}</span>` : ''}
                        ${project.tags ? project.tags.map(tag =>
                            `<span class="tag">${tag}</span>`
                        ).join('') : ''}
                    </div>
                    <p class="project-description">${project.description}</p>
                    ${project.metrics && project.metrics.length > 0 ? `
                        <ul class="project-metrics">
                            ${project.metrics.slice(0, 2).map(metric =>
                                `<li>${metric}</li>`
                            ).join('')}
                        </ul>
                    ` : ''}
                    ${project.link ? `
                        <a href="${project.link}" class="project-link" target="_blank" rel="noopener">View Details →</a>
                    ` : project.body ? `
                        <a href="post.html?slug=${project.slug}&type=project" class="project-link">View Details →</a>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Display placeholder projects
function displayPlaceholderProjects() {
    const container = document.querySelector('.project-grid');
    if (!container) return;

    container.innerHTML = `
        <div class="project-card">
            <div class="project-image">📝</div>
            <div class="project-info">
                <h3 class="display">Project Title Placeholder</h3>
                <div class="project-tags">
                    <span class="tag">ITSM</span>
                    <span class="tag">Employee Center</span>
                    <span class="tag">App Engine</span>
                </div>
                <p class="project-description">Project description goes here. Explain the challenge, your approach, the technologies used, and the outcomes achieved. Include metrics and business impact where possible.</p>
                <a href="#" class="project-link">View Details →</a>
            </div>
        </div>
        <div class="project-card">
            <div class="project-image">📝</div>
            <div class="project-info">
                <h3 class="display">Add Your Projects</h3>
                <div class="project-tags">
                    <span class="tag">CMS</span>
                    <span class="tag">Easy Management</span>
                </div>
                <p class="project-description">Go to <a href="/admin" style="color: var(--electric);">/admin</a> and create your first project through the CMS interface. It will appear here automatically!</p>
            </div>
        </div>
    `;
}

// Get icon based on status
function getStatusIcon(status) {
    const icons = {
        'Completed': '✅',
        'In Progress': '🚧',
        'Planned': '📋'
    };
    return icons[status] || '📝';
}

// Get CSS class for status
function getStatusClass(status) {
    const classes = {
        'Completed': 'success',
        'In Progress': 'warning',
        'Planned': 'info'
    };
    return classes[status] || 'default';
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}
