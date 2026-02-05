# Content Templates

This folder contains templates for creating new content on your portfolio site.

## Quick Start Guide

### Creating a New Blog Post

1. Go to GitHub: https://github.com/Kromula/portfolio-website/tree/master/blog
2. Click **"Add file" → "Create new file"**
3. Name it: `YYYY-MM-DD-your-post-title.md` (e.g., `2026-02-05-my-new-post.md`)
4. Copy content from [`_templates/blog-template.md`](blog-template.md)
5. Fill in your content
6. Scroll down, add commit message: "Add new blog post: [title]"
7. Click **"Commit changes"**
8. Wait 30 seconds - live on your site! ✅

### Creating a New How-To Guide

1. Go to: https://github.com/Kromula/portfolio-website/tree/master/how-to
2. Click **"Add file" → "Create new file"**
3. Name it: `your-guide-title.md` (e.g., `configure-employee-center.md`)
4. Copy content from [`_templates/how-to-template.md`](how-to-template.md)
5. Fill in steps and screenshots
6. Commit changes
7. Live in ~30 seconds! ✅

### Creating a New Project

1. Go to: https://github.com/Kromula/portfolio-website/tree/master/projects
2. Click **"Add file" → "Create new file"**
3. Name it: `project-name.md` (e.g., `hr-case-management.md`)
4. Copy content from [`_templates/project-template.md`](project-template.md)
5. Fill in project details
6. Commit changes
7. Appears on homepage! ✅

## Frontmatter Fields Explained

### Required Fields
- **title**: The title that appears at the top
- **date**: When it was created (format: `YYYY-MM-DDTHH:MM:SS.000Z`)
- **description**: Short summary (used in previews)

### Optional Fields
- **featured_image**: Path to image (upload to `/images/uploads/`)
- **tags**: List of keywords for organization
- **category**: Main category for filtering
- **draft**: Set to `true` to hide from site

## Uploading Images

### Option 1: Through GitHub
1. Go to: https://github.com/Kromula/portfolio-website/tree/master/images/uploads
2. Click **"Add file" → "Upload files"**
3. Drag and drop your images
4. Commit changes
5. Reference in markdown: `![Alt text](/images/uploads/your-image.png)`

### Option 2: Use Image URLs
Just use any image URL: `![Alt text](https://example.com/image.png)`

## Markdown Cheat Sheet

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

[Link text](https://url.com)

![Image alt text](/path/to/image.png)

- Bullet list item
- Another item

1. Numbered list
2. Another item

> Blockquote for callouts

` + "```" + `javascript
// Code block
var code = "example";
` + "```" + `
```

## Tips

- **File naming**: Use lowercase, hyphens instead of spaces
- **Images**: Optimize before uploading (under 500KB if possible)
- **Date format**: Use current date/time in UTC format
- **Preview**: Changes appear in ~30 seconds after commit
- **Editing**: Click pencil icon on any file to edit it

## Need Help?

- GitHub markdown guide: https://guides.github.com/features/mastering-markdown/
- Can't find something? Open an issue in the repo
