// Blog posts loader
let allPosts = [];
let currentFilter = 'all';

// Load blog posts from markdown files
async function loadBlogPosts() {
    try {
        // In production, this will load from the blog folder
        // For now, we'll check if there are any posts
        const response = await fetch('/blog/posts.json').catch(() => null);

        if (response && response.ok) {
            allPosts = await response.json();
            displayPosts(allPosts);
        } else {
            // No posts yet - show placeholder
            document.getElementById('postsContainer').innerHTML = `
                <div class="no-posts">
                    <h2>No posts yet</h2>
                    <p>Check back soon for insights and articles on ServiceNow and ITSM.</p>
                </div>
            `;
        }
    } catch (error) {
        console.log('No posts found yet');
    }
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
