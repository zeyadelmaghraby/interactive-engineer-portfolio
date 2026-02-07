# Interactive Engineer Portfolio

Single-page portfolio site built with semantic HTML, modular CSS, and vanilla JavaScript.

## Live URL

- https://zeyadelmaghraby.github.io/interactive-engineer-portfolio/

## Features

- Bold, responsive UI with dark/light theme toggle
- Sticky navigation with smooth scrolling and active section highlighting
- Expandable project case studies and writing notes
- Interactive playground demos (theme generator, bubble sort visualizer, spring-card motion)
- Accessibility-first defaults (semantic landmarks, keyboard support, reduced motion handling)

## Project structure

- `index.html`
- `styles/base.css`
- `styles/theme.css`
- `styles/components.css`
- `styles/sections.css`
- `scripts/main.js`
- `scripts/playground.js`
- `assets/`

## Local development

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Deployment (GitHub Pages)

1. Push to `main` branch.
2. In GitHub repo settings, open **Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`.
5. Save and wait for the Pages build.

## Production notes

- No build step required.
- Metadata includes Open Graph and Twitter tags.
- `404.html`, `robots.txt`, and `sitemap.xml` are included for static hosting.
