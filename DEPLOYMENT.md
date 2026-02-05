## ServiceNow Portfolio - Deployment Guide

This guide explains how to deploy your portfolio website with Netlify CMS to Netlify hosting.

## Prerequisites

- GitHub account (already have your repo: https://github.com/Kromula/portfolio-website)
- Netlify account (free) - Sign up at https://netlify.com

## Deployment Steps

### 1. Connect to Netlify

1. Go to https://netlify.com and sign up/login with your GitHub account
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Select your repository: `Kromula/portfolio-website`
5. Configure build settings:
   - **Build command:** `echo "Static site - no build needed"`
   - **Publish directory:** `.` (root directory)
6. Click "Deploy site"

### 2. Enable Netlify Identity

This allows you to log into the CMS admin interface.

1. In your Netlify site dashboard, go to **Settings** → **Identity**
2. Click "Enable Identity"
3. Under **Registration preferences**, select "Invite only" (recommended)
4. Under **Services** → **Git Gateway**, click "Enable Git Gateway"

### 3. Invite Yourself as a CMS User

1. In Netlify dashboard, go to **Identity** tab
2. Click "Invite users"
3. Enter your email address (daniel.oconnor@servicenow.com)
4. You'll receive an invitation email
5. Click the link to set your CMS password

### 4. Enable Giscus Comments

1. Go to https://github.com/Kromula/portfolio-website/settings
2. Scroll to "Features" and enable **Discussions**
3. Create a new discussion category called "Comments"
4. Go to https://giscus.app
5. Enter your repo: `Kromula/portfolio-website`
6. Select "Discussion" mapping: "Pathname"
7. Select the "Comments" category
8. Copy the generated script configuration
9. Update `post-template.html` with your repo ID and category ID

### 5. Access Your CMS

Once deployed:

1. Go to `https://your-site-name.netlify.app/admin`
2. Log in with your email and password
3. Start creating blog posts and how-to guides!

## Creating Content

### Writing a Blog Post

1. Go to `/admin`
2. Click "Blog Posts" → "New Blog Post"
3. Fill in:
   - **Title**: Your post title
   - **Date**: Publication date
   - **Description**: Brief summary (shows in listing)
   - **Category**: Choose from dropdown
   - **Tags**: Add relevant tags
   - **Featured Image**: Upload an image (optional)
   - **Body**: Write your content using the rich text editor
4. Click "Save" (saves as draft) or "Publish" (makes it live)

### Writing a How-To Guide

1. Go to `/admin`
2. Click "How-To Guides" → "New How-To Guide"
3. Fill in:
   - **Title**: Guide title
   - **Description**: What the guide teaches
   - **Difficulty**: Beginner/Intermediate/Advanced
   - **Estimated Time**: e.g., "30 minutes"
   - **Category**: Choose from dropdown
   - **Tags**: Add relevant tags
   - **Body**: Write step-by-step instructions
4. Click "Save" or "Publish"

## Custom Domain (Optional)

To use your own domain (e.g., danieloconnor.dev):

1. In Netlify dashboard, go to **Domain management**
2. Click "Add custom domain"
3. Follow the instructions to update your DNS settings
4. Netlify will automatically provision SSL certificate

## Updating Your Site

Any changes you make through the CMS or by pushing to GitHub will automatically rebuild and deploy your site!

## Workflow

1. **Write content**: Use `/admin` interface to write posts
2. **Save as draft**: Content is saved but not published
3. **Preview**: Review your content before publishing
4. **Publish**: Makes content live on your site
5. **Edit**: You can always go back and edit published content

## Troubleshooting

### Can't access /admin
- Make sure you've enabled Identity in Netlify settings
- Check that Git Gateway is enabled
- Try clearing browser cache

### Posts not showing up
- Make sure you published (not just saved) the post
- Check that `draft: false` in the post frontmatter
- Wait a minute for the site to rebuild

### Comments not working
- Ensure GitHub Discussions are enabled
- Double-check repo ID and category ID in Giscus config
- Make sure the script is loaded (check browser console)

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Netlify CMS Docs: https://decapcms.org/docs/
- Giscus Docs: https://giscus.app

---

Your portfolio is now live and you can easily manage content through the CMS!
