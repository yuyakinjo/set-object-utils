# ExtendedMap Documentation

This directory contains the Docusaurus documentation site for ExtendedMap.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve built site locally
npm run serve
```

## Deployment

The documentation is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

**Live site**: https://yuyakinjo.github.io/set-object-utils/

## Structure

- `docs/` - Documentation pages (Markdown/MDX)
- `src/` - React components and custom pages
- `static/` - Static assets (images, etc.)
- `docusaurus.config.ts` - Docusaurus configuration
- `sidebars.ts` - Sidebar configuration