# Portfolio Website - Project Tracking

## Current Status
✅ Fully Operational - Portfolio Live on GitHub Pages

## Enhancements

### Planned
- [ ] Add dedicated Projects page (separate from homepage)
- [ ] Add analytics tracking
- [ ] SEO optimization
- [ ] Optimize for performance
- [ ] Add custom domain (optional)

### In Progress
- [ ] Troubleshoot Giscus comments (widget not displaying)
- [ ] Create more content using templates

### Completed
- [x] Project initialization
- [x] Documentation setup (claude.md, project.md)
- [x] Git repository initialization
- [x] GitHub repository created (https://github.com/Kromula/portfolio-website)
- [x] Created design options and selected Modern Geometric
- [x] Customized design with personal information:
  - Name: Daniel O'Connor
  - Title: ServiceNow Senior Technical Consultant
  - Specializations: ITSM, Employee Center, App Engine
  - 10 years experience
  - Contact links (email, LinkedIn, GitHub, ServiceNow Resume)
  - Certifications: CSA, CIS-ITSM, CIS-CMDB, Portal, Employee Center
- [x] Created placeholder project cards for current projects
- [x] Created blog.html and how-to.html listing pages
- [x] Built post template with Giscus comments integration
- [x] Added Blog and How-To to main navigation
- [x] Created deployment documentation
- [x] Deployed to GitHub Pages hosting (unlimited, free)
- [x] Configured GitHub Actions for automatic deployment
- [x] Configured Giscus app on GitHub repository
- [x] Enabled GitHub Discussions for comments
- [x] Created content templates for easy GitHub-based editing:
  - Blog post template with frontmatter
  - How-to guide template with steps
  - Project template with metrics
  - Comprehensive README with workflow instructions
- [x] Created dynamic project loading on homepage
- [x] Switched CMS to simple publish mode (immediate publishing)
- [x] Fixed multi-line YAML description parsing
- [x] Added image lightbox gallery for project images
- [x] Implemented click-to-enlarge functionality for images
- [x] Fixed featured image display (card only, not in content)
- [x] Added line break preservation in descriptions
- [x] Implemented cache-busting for immediate content updates
- [x] UI improvements:
  - Removed "time to read" from all pages
  - Removed fixed header positioning
  - Added project status badges (Completed/In Progress/Planned)
  - Added metrics/achievements display for projects
  - Responsive image sizing with hover effects
- [x] Content creation workflow established:
  - Created first blog post: "Deployment Methods in ServiceNow"
  - Created first how-to guide: "Create your own gradient background"
  - Updated UX Remediation project with detailed content
  - Organized images folder structure (images/howto/ with subfolders)
  - Removed test/placeholder content files
- [x] Giscus comments configuration:
  - Updated post.html with repo and category IDs
  - Installed Giscus app on repository
  - Enabled GitHub Discussions
  - Script configured (troubleshooting display issue)

## Bugs
None reported yet.

## Issues

### Giscus Comments Not Displaying
**Status:** Troubleshooting
**Description:** Giscus comment widget not appearing on blog/how-to/project pages despite:
- Script tag present in HTML with correct repo/category IDs
- Giscus app installed on repository
- GitHub Discussions enabled
- Repository is public

**Error:** Console shows "giscus is not installed on this repository" and `repo=undefined` in API calls

**Next Steps:**
- Wait for GitHub permissions to sync (can take several hours)
- Try different browser/device
- Verify Giscus app configuration
- Consider alternative: Utterances or other comment systems

## Notes
- Modern Geometric design selected and customized
- Site hosted on GitHub Pages (unlimited, free)
- Content managed through GitHub's web editor (no complex CMS needed)
- Three content types supported:
  - **Blog Posts** - Long-form articles and insights
  - **How-To Guides** - Step-by-step tutorials
  - **Projects** - Portfolio projects with status tracking
- Content stored as markdown files in GitHub repository
- Automatic deployment via GitHub Actions on every push (~30 seconds)
- Image lightbox for professional project galleries
- Cache-busting ensures updates appear quickly

## Live URLs
- **Main Site**: https://kromula.github.io/portfolio-website/
- **Blog**: https://kromula.github.io/portfolio-website/blog.html
- **How-To**: https://kromula.github.io/portfolio-website/how-to.html
- **GitHub Repo**: https://github.com/Kromula/portfolio-website
- **Content Templates**: https://github.com/Kromula/portfolio-website/tree/master/_templates

## Content Strategy
### Blog
- ServiceNow tips and tricks
- Platform updates and insights
- Implementation stories
- Best practices and patterns
- Long-form thought pieces

### How-To Guides
- Step-by-step ServiceNow tutorials
- Configuration guides
- Problem-solving walkthroughs
- Integration examples
- Quick tips and tricks

### Projects
- Portfolio showcase of implementations
- Case studies with before/after
- Metrics and business impact
- Client work (anonymized if needed)
- Status tracking (Completed/In Progress/Planned)

## Content Management Workflow

### Creating New Content (Simple GitHub-Based Approach)

1. **Use Templates**:
   - Navigate to https://github.com/Kromula/portfolio-website/tree/master/_templates
   - Choose template: `blog-template.md`, `how-to-template.md`, or `project-template.md`
   - Copy the template content

2. **Create New File**:
   - Go to target folder: `blog/`, `how-to/`, or `projects/`
   - Click "Add file" → "Create new file"
   - Name file appropriately (e.g., `2026-02-05-my-post.md`)
   - Paste template and fill in content

3. **Edit Existing Content**:
   - Navigate to the file in GitHub
   - Click pencil icon (Edit this file)
   - Make changes
   - Commit at bottom

4. **Deployment**:
   - Changes commit to GitHub
   - GitHub Actions automatically deploys (~30 seconds)
   - View live site (may need hard refresh: Ctrl+Shift+R)

### Content Features
- **Markdown formatting** with frontmatter metadata
- **Image support** - Upload to `/images/uploads/` or use URLs
- **Image lightbox** - Click to enlarge in full-screen
- **Status badges** for projects (color-coded)
- **Metrics display** for project achievements
- **Featured images** for card previews
- **Tags and categories** for organization
- **No complex CMS** - Just edit markdown files directly

## Final Design Options
1. **Organic & Soft** - Natural, cream/sage, rounded shapes, warm and approachable
2. **Modern Geometric** - Contemporary, electric blue/violet, sharp edges, tech-forward

Removed designs:
- Minimal Editorial (too minimal)
- Dark Neon Tech (great design but not right fit for this project)
- Brutalist Bold (too bold)

---
Last Updated: 2026-02-05
