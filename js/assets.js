// Asset Library loader
let allAssets = [];
let currentFilter = 'all';
let loader;

// Load assets from markdown files
async function loadAssets() {
    try {
        // Initialize markdown loader
        loader = new MarkdownLoader('Kromula/portfolio-website', 'master');

        // Fetch all markdown files from assets directory
        const assets = await loader.fetchMarkdownFiles('assets');

        if (assets.length === 0) {
            document.getElementById('assetsContainer').innerHTML = `
                <div class="no-assets">
                    <h2>No assets yet</h2>
                    <p>Check back soon for scripts, widgets, and design elements.</p>
                </div>
            `;
            return;
        }

        // Format assets for display
        allAssets = assets.map(asset => ({
            ...asset,
            icon: getTypeIcon(asset.type),
            url: `post.html?slug=${asset.slug}&type=asset`
        }));

        displayAssets(allAssets);
    } catch (error) {
        console.error('Error loading assets:', error);
        document.getElementById('assetsContainer').innerHTML = `
            <div class="no-assets">
                <h2>Error loading assets</h2>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Get icon based on asset type
function getTypeIcon(type) {
    const icons = {
        'Script': '📜',
        'Widget': '🧩',
        'Component': '⚙️',
        'Template': '📋',
        'Theme': '🎨',
        'Flow': '🔄',
        'Integration': '🔗'
    };
    return icons[type] || '📦';
}

// Display assets in the grid
function displayAssets(assets) {
    const container = document.getElementById('assetsContainer');

    if (assets.length === 0) {
        container.innerHTML = `
            <div class="no-assets">
                <h2>No assets found</h2>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = assets.map(asset => `
        <article class="asset-card" onclick="window.location.href='${asset.url}'">
            <div class="asset-preview">
                ${asset.featured_image
                    ? `<img src="${asset.featured_image}" alt="${asset.title}">`
                    : asset.icon || '📦'
                }
                ${asset.type ? `<span class="asset-type-badge">${asset.type}</span>` : ''}
            </div>
            <div class="asset-content">
                <div class="asset-meta">
                    ${asset.platform ? `<span class="asset-platform">${asset.platform}</span>` : ''}
                    ${asset.version ? `<span class="asset-version">v${asset.version}</span>` : ''}
                    ${asset.category ? `<span class="asset-category">${asset.category}</span>` : ''}
                </div>
                <h3>${asset.title}</h3>
                <p class="asset-description">${asset.description}</p>
                <div class="asset-footer">
                    ${asset.tags ? `
                        <div class="asset-tags">
                            ${asset.tags.map(tag => `<span class="asset-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

// Filter assets by type/category
function filterAssets(category) {
    currentFilter = category;

    // Update active filter button
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Filter assets — match on 'type' field (Script, Widget, etc.) or 'all'
    const filtered = category === 'all'
        ? allAssets
        : allAssets.filter(asset => asset.type === category);

    displayAssets(filtered);
}

// Search assets
function searchAssets(query) {
    const searchTerm = query.toLowerCase();
    const categoryFiltered = currentFilter === 'all'
        ? allAssets
        : allAssets.filter(asset => asset.type === currentFilter);

    const filtered = categoryFiltered.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm) ||
        asset.description.toLowerCase().includes(searchTerm) ||
        (asset.tags && asset.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );

    displayAssets(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadAssets();

    // Filter buttons
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.addEventListener('click', () => {
            filterAssets(btn.dataset.category);
        });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchAssets(e.target.value);
    });
});
