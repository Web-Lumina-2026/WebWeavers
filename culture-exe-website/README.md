# culture.exe

A no-build, multi-page Gen Z culture website built with plain HTML, CSS and JavaScript. Three.js powers the home hero scene; GSAP/ScrollTrigger and Lenis are loaded from CDNs when available.

## Run it
1. Extract the ZIP.
2. Open `index.html` in a modern browser. Most of the site works directly from a file URL.
3. For best WebGL/CDN reliability, use a tiny local server: in this folder run `python -m http.server 8000`, then open `http://localhost:8000`.

## Structure
- `index.html` — boot screen, 3D home hero, directory
- `music.html`, `fashion.html`, `memes.html`, `art.html`, `trends.html`, `team.html` — separate pages
- `css/style.css` — all design tokens, responsive rules and shared components
- `js/main.js` — taskbar, theme, optional sound, transitions, Lenis, Konami easter egg
- `js/home.js` — Three.js scene and boot sequence
- `js/mandala-scroll.js` — text-free, scroll-driven mandala animation
- `js/music.js`, `js/memes.js`, `js/art.js`, `js/trends.js`, `js/team.js` — page-specific interactions
- `assets/` — shared desi background, mandala and wordmark cutout, custom sun cursor, plus your images and audio; artwork slots are labeled

## Swap content and images
- Change the shared Desi palette in `css/desi-theme.css` in `:root`.
- Replace names, captions, genres, trend text and team bios directly in each HTML file.
- Replace placeholder art blocks with `<img src="assets/your-image.jpg" alt="Description">`. Keep image files in `assets/` and use relative paths.
- The art gallery images are stored in `assets/`; update the artwork list in `js/art.js` when replacing them.
- To add artwork, update the `data-title`, `data-artist`, and `data-description` attributes on each `.art-piece` button.
- The home page includes a text-free, scroll-driven rotating mandala and an auto-rickshaw placeholder, plus shared scroll reveal effects.
- The music player and meme wall are ready for supplied audio and meme artwork; add those files under `assets/` to integrate them.
- The meme generator currently draws a simple template to PNG and keeps form feedback local. The team form does not transmit or store data; connect a form backend/service if needed.
- Three.js objects are intentionally made from simple geometry to keep the demo lightweight and avoid external model downloads.

## Deploy free
### GitHub Pages
1. Create a GitHub repository and upload the extracted files (keep the folder structure).
2. Open **Settings → Pages**.
3. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Wait for the published URL to appear. Use `index.html` as the entry page.

### Netlify
1. Sign in to Netlify and choose **Add new site → Deploy manually**.
2. Drag the extracted project folder into the deploy area, or connect the GitHub repository.
3. Netlify publishes the static site and gives you a shareable URL.

## Notes
- Internet is needed for Google Fonts and CDN libraries. The page content and CSS remain local.
- No build step, package manager, backend, or API keys are required.
- Reduced-motion preferences are respected for the main animations.
