// How-to guides loader
let allGuides = [];
let currentFilter = 'all';
let loader;

// Load how-to guides from markdown files
async function loadGuides() {
    try {
        // Initialize markdown loader
        loader = new MarkdownLoader('Kromula/portfolio-website', 'master');

        // Fetch all markdown files from how-to directory
        const guides = await loader.fetchMarkdownFiles('how-to');

        if (guides.length === 0) {
            // No guides yet - show placeholder
            document.getElementById('guidesContainer').innerHTML = `
                <div class="no-guides">
                    <h2>No guides yet</h2>
                    <p>Check back soon for step-by-step tutorials and practical ServiceNow guides.</p>
                </div>
            `;
            return;
        }

        // Format guides for display
        allGuides = guides.map(guide => ({
            ...guide,
            icon: getCategoryIcon(guide.category),
            readTime: loader.calculateReadTime(guide.body)
        }));

        displayGuides(allGuides);
    } catch (error) {
        console.error('Error loading guides:', error);
        document.getElementById('guidesContainer').innerHTML = `
            <div class="no-guides">
                <h2>Error loading guides</h2>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Get icon based on category
function getCategoryIcon(category) {
    const icons = {
        'ITSM': '🎫',
        'Employee Center': '👥',
        'App Engine': '⚙️',
        'CMDB': '🗄️',
        'Portal': '🌐',
        'Integration': '🔗',
        'Workflow': '📋',
        'Automation': '🤖'
    };
    return icons[category] || '📚';
}

// Display guides in the grid
function displayGuides(guides) {
    const container = document.getElementById('guidesContainer');

    if (guides.length === 0) {
        container.innerHTML = `
            <div class="no-guides">
                <h2>No guides found</h2>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = guides.map(guide => `
        <article class="guide-card" onclick="window.location.href='${guide.url}'">
            <div class="guide-image">${guide.icon || '📚'}</div>
            <div class="guide-content">
                <div class="guide-meta">
                    <span class="guide-difficulty">${guide.difficulty}</span>
                    ${guide.time ? `<span class="guide-time">⏱ ${guide.time}</span>` : ''}
                    <span class="guide-category">${guide.category}</span>
                </div>
                <h3>${guide.title}</h3>
                <p class="guide-description">${guide.description}</p>
                ${guide.tags ? `
                    <div class="guide-tags">
                        ${guide.tags.map(tag => `<span class="guide-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </article>
    `).join('');
}

// Filter guides by category
function filterGuides(category) {
    currentFilter = category;

    // Update active filter button
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Filter guides
    const filtered = category === 'all'
        ? allGuides
        : allGuides.filter(guide => guide.category === category);

    displayGuides(filtered);
}

// Search guides
function searchGuides(query) {
    const searchTerm = query.toLowerCase();
    const filtered = allGuides.filter(guide =>
        guide.title.toLowerCase().includes(searchTerm) ||
        guide.description.toLowerCase().includes(searchTerm) ||
        (guide.tags && guide.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );

    displayGuides(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGuides();

    // Filter buttons
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.addEventListener('click', () => {
            filterGuides(btn.dataset.category);
        });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchGuides(e.target.value);
    });
});
