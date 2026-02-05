// Blog posts loader
let allPosts = [];
let currentFilter = 'all';
let loader;

// Load blog posts from markdown files
async function loadBlogPosts() {
    try {
        // Initialize markdown loader
        loader = new MarkdownLoader('Kromula/portfolio-website', 'master');

        // Fetch all markdown files from blog directory
        const posts = await loader.fetchMarkdownFiles('blog');

        if (posts.length === 0) {
            // No posts yet - show placeholder
            document.getElementById('postsContainer').innerHTML = `
                <div class="no-posts">
                    <h2>No posts yet</h2>
                    <p>Check back soon for insights and articles on ServiceNow and ITSM.</p>
                </div>
            `;
            return;
        }

        // Format posts for display
        allPosts = posts.map(post => ({
            ...post,
            icon: getCategoryIcon(post.category),
            readTime: loader.calculateReadTime(post.body)
        }));

        displayPosts(allPosts);
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('postsContainer').innerHTML = `
            <div class="no-posts">
                <h2>Error loading posts</h2>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Get icon based on category
function getCategoryIcon(category) {
    const icons = {
        'ServiceNow': '⚡',
        'ITSM': '🎫',
        'Employee Center': '👥',
        'App Engine': '⚙️',
        'CMDB': '🗄️',
        'Best Practices': '⭐',
        'Technical': '💻',
        'Opinion': '💭'
    };
    return icons[category] || '📝';
}

// Display posts in the grid
function displayPosts(posts) {
    const container = document.getElementById('postsContainer');

    if (posts.length === 0) {
        container.innerHTML = `
            <div class="no-posts">
                <h2>No posts found</h2>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = posts.map(post => `
        <article class="post-card" onclick="window.location.href='${post.url}'">
            <div class="post-image">${post.icon || '📝'}</div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span>•</span>
                    <span>${post.date}</span>
                    <span>•</span>
                    <span>${post.readTime || '5 min read'}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="post-description">${post.description}</p>
                ${post.tags ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </article>
    `).join('');
}

// Filter posts by category
function filterPosts(category) {
    currentFilter = category;

    // Update active filter button
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Filter posts
    const filtered = category === 'all'
        ? allPosts
        : allPosts.filter(post => post.category === category);

    displayPosts(filtered);
}

// Search posts
function searchPosts(query) {
    const searchTerm = query.toLowerCase();
    const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );

    displayPosts(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();

    // Filter buttons
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.addEventListener('click', () => {
            filterPosts(btn.dataset.category);
        });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchPosts(e.target.value);
    });
});
