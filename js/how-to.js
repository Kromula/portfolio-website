// How-to guides loader
let allGuides = [];
let currentFilter = 'all';

// Load how-to guides from markdown files
async function loadGuides() {
    try {
        // In production, this will load from the how-to folder
        // For now, we'll check if there are any guides
        const response = await fetch('/how-to/guides.json').catch(() => null);

        if (response && response.ok) {
            allGuides = await response.json();
            displayGuides(allGuides);
        } else {
            // No guides yet - show placeholder
            document.getElementById('guidesContainer').innerHTML = `
                <div class="no-guides">
                    <h2>No guides yet</h2>
                    <p>Check back soon for step-by-step tutorials and practical ServiceNow guides.</p>
                </div>
            `;
        }
    } catch (error) {
        console.log('No guides found yet');
    }
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
