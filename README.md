# Daniel O'Connor - ServiceNow Portfolio

Professional portfolio website for Daniel O'Connor, ServiceNow Senior Technical Consultant, featuring blog and how-to guides with Netlify CMS integration.

## Features

- **Modern Design**: Clean, geometric design with responsive layout
- **Blog**: Long-form articles on ServiceNow, ITSM, and best practices
- **How-To Guides**: Step-by-step tutorials and practical guides
- **CMS Integration**: Netlify CMS for easy content management
- **Comments**: Giscus-powered comments using GitHub Discussions
- **Performance**: Static site with fast loading times

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **CMS**: Netlify CMS (Decap CMS)
- **Hosting**: Netlify
- **Comments**: Giscus (GitHub Discussions)
- **Version Control**: Git/GitHub

## Project Structure

```
portfolio-website/
├── index.html              # Homepage
├── blog.html              # Blog listing page
├── how-to.html            # How-to guides listing
├── post-template.html     # Template for individual posts
├── admin/                 # Netlify CMS admin interface
│   ├── index.html
│   └── config.yml
├── blog/                  # Blog post markdown files
├── how-to/               # How-to guide markdown files
├── css/                  # Stylesheets
│   └── main.css
├── js/                   # JavaScript files
│   ├── blog.js
│   └── how-to.js
├── images/               # Images and uploads
├── netlify.toml          # Netlify configuration
└── DEPLOYMENT.md         # Deployment instructions
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Kromula/portfolio-website.git
   cd portfolio-website
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

3. Access at `http://localhost:8000`

## Content Management

### Accessing the CMS

1. Navigate to `/admin` on your deployed site
2. Log in with your Netlify Identity credentials
3. Create and manage blog posts and how-to guides

### Creating a Blog Post

1. Go to **Blog Posts** → **New Blog Post**
2. Fill in title, description, category, tags
3. Write content using the rich text editor
4. Save as draft or publish immediately

### Creating a How-To Guide

1. Go to **How-To Guides** → **New How-To Guide**
2. Add title, description, difficulty level, estimated time
3. Write step-by-step instructions
4. Publish when ready

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

Quick start:
1. Sign up for Netlify
2. Connect your GitHub repository
3. Enable Netlify Identity
4. Configure Giscus for comments
5. Access CMS at `/admin`

## Customization

### Colors

Edit CSS variables in `css/main.css`:
```css
:root {
    --midnight: #0F0F23;
    --electric: #00F0FF;
    --violet: #8B5CF6;
    /* ... */
}
```

### Navigation

Update navigation links in each HTML file's `<nav>` section.

### CMS Configuration

Edit `admin/config.yml` to modify:
- Content collections
- Field types
- Categories and options

## Certifications

- CSA - Certified System Administrator
- CIS - IT Service Management
- CIS - Configuration Management Database
- Portal Development
- Employee Center Specialist

[View full ServiceNow Resume](https://learning.servicenow.com/lxp?id=nl_public&user=danielocon4bcbd7)

## Contact

- **Email**: daniel.oconnor@servicenow.com
- **LinkedIn**: [linkedin.com/in/doc1988](https://www.linkedin.com/in/doc1988/)
- **GitHub**: [github.com/Kromula](https://github.com/Kromula)

## License

© 2026 Daniel O'Connor. All rights reserved.
