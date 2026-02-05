// Markdown file loader and parser for Netlify CMS content
// Uses marked.js for markdown parsing

class MarkdownLoader {
    constructor(repo = 'Kromula/portfolio-website', branch = 'master') {
        this.repo = repo;
        this.branch = branch;
        this.baseUrl = `https://raw.githubusercontent.com/${repo}/${branch}`;
    }

    // Fetch all markdown files from a directory
    async fetchMarkdownFiles(directory) {
        try {
            // Use GitHub API to list files in directory
            const apiUrl = `https://api.github.com/repos/${this.repo}/contents/${directory}?ref=${this.branch}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.log(`No files found in ${directory}`);
                return [];
            }

            const files = await response.json();

            // Filter for markdown files
            const markdownFiles = files.filter(file =>
                file.name.endsWith('.md') && file.type === 'file'
            );

            // Fetch content of each file
            const posts = await Promise.all(
                markdownFiles.map(file => this.fetchAndParse(file.download_url))
            );

            // Filter out any failed fetches and sort by date (newest first)
            return posts
                .filter(post => post !== null)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error(`Error fetching markdown files from ${directory}:`, error);
            return [];
        }
    }

    // Fetch and parse a single markdown file
    async fetchAndParse(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) return null;

            const content = await response.text();
            return this.parseMarkdown(content, url);
        } catch (error) {
            console.error('Error fetching file:', error);
            return null;
        }
    }

    // Parse markdown with frontmatter
    parseMarkdown(content, url) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (!match) {
            console.error('Invalid markdown format - no frontmatter found');
            return null;
        }

        const frontmatter = this.parseFrontmatter(match[1]);
        const body = match[2];

        // Generate URL slug from filename
        const filename = url.split('/').pop();
        const slug = filename.replace('.md', '');

        return {
            ...frontmatter,
            body,
            slug,
            url: `post.html?slug=${slug}`,
            rawUrl: url
        };
    }

    // Parse YAML frontmatter
    parseFrontmatter(frontmatterText) {
        const frontmatter = {};
        const lines = frontmatterText.split('\n');
        let currentKey = null;
        let currentArray = null;

        lines.forEach(line => {
            // Handle arrays (tags, etc.)
            if (line.trim().startsWith('-')) {
                const value = line.trim().substring(1).trim();
                if (currentArray) {
                    currentArray.push(value);
                }
            }
            // Handle key-value pairs
            else if (line.includes(':')) {
                const colonIndex = line.indexOf(':');
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();

                currentKey = key;

                // Check if this starts an array
                if (value === '') {
                    currentArray = [];
                    frontmatter[key] = currentArray;
                } else {
                    currentArray = null;
                    // Remove quotes if present
                    frontmatter[key] = value.replace(/^["']|["']$/g, '');
                }
            }
        });

        return frontmatter;
    }

    // Convert markdown to HTML (basic implementation)
    // For production, use marked.js library
    markdownToHtml(markdown) {
        // Very basic markdown conversion
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold and italic
        html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Paragraphs
        html = html.split('\n\n').map(para => {
            if (para.trim() && !para.startsWith('<')) {
                return `<p>${para}</p>`;
            }
            return para;
        }).join('\n');

        return html;
    }

    // Calculate read time
    calculateReadTime(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarkdownLoader;
}
