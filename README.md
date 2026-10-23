# culture.exe 💾✨

> *Booting up Gen Z culture... 100%*

**culture.exe** is a multi-page, scroll-driven, interactive website celebrating Gen Z culture: **music, fashion, memes, art, and internet trends**. It is styled like a retro operating system, with a desi pop twist: a mandala, an auto-rickshaw, a custom sun cursor, and a warm desi palette. It is built with plain HTML, CSS, and JavaScript, with no build step.

Built for **[Web Lumina]** organised by **[Deviators Club]** at **[Dronacharya College Of Engineering]**.

🔗 **Live demo:** https://chipper-tartufo-31bca0.netlify.app

---

## 🎯 Concept

Classic computer nostalgia (taskbar, boot screen, window-style pages, glitchy details) meets loud, modern pop culture. Boot the site, fly through the 3D home hero, spin a scroll-driven mandala, play with the music player, build your own meme, explore the art gallery, and meet the team.

## 🗂️ Pages

| Page | File | What's inside |
|------|------|---------------|
| **Home** | `index.html` | Boot screen, Three.js 3D hero, scroll-driven mandala, directory of all pages |
| **Music** | `music.html` | Music player UI, genres and charts |
| **Fashion** | `fashion.html` | Style and lookbook sections |
| **Memes** | `memes.html` | Meme wall and meme generator (exports a PNG) |
| **Art** | `art.html` | Art gallery with a detail viewer (title, artist, description) |
| **Trends** | `trends.html` | Internet trends and interactions |
| **Team** | `team.html` | Team bios and a contact form (front-end only) |

## ✨ Features

- Boot sequence and 3D home hero built with **Three.js** (simple geometry, so it stays lightweight with no external model downloads)
- Text-free, scroll-driven rotating **mandala** animation and an auto-rickshaw placeholder
- OS-style **taskbar** navigation and page transitions
- Light/dark **theme toggle**
- Optional **sound** (off by default)
- Smooth scrolling with **Lenis** and scroll reveals with **GSAP/ScrollTrigger**
- Custom **sun cursor**
- **Meme generator** that draws a template with your text and saves it as a PNG
- **Art gallery** viewer driven by data attributes on each artwork
- **Konami code** easter egg 🥚 (`↑ ↑ ↓ ↓ ← → ← → B A`)
- Responsive layout and **reduced-motion** support

## 🛠️ Tech Stack

- HTML5, CSS3, vanilla JavaScript (no build step, package manager, backend, or API keys)
- [Three.js](https://threejs.org/) for 3D
- [GSAP](https://gsap.com/) + ScrollTrigger and [Lenis](https://github.com/darkroomengineering/lenis), loaded from CDNs when available
- Google Fonts

## 📁 Project Structure

```
culture-exe/
├── index.html              # boot screen, 3D home hero, directory
├── music.html
├── fashion.html
├── memes.html
├── art.html
├── trends.html
├── team.html
├── css/
│   ├── style.css           # design tokens, responsive rules, shared components
│   └── desi-theme.css      # shared desi palette (edit in :root)
├── js/
│   ├── main.js             # taskbar, theme, sound, transitions, Lenis, Konami easter egg
│   ├── home.js             # Three.js scene and boot sequence
│   ├── mandala-scroll.js   # scroll-driven mandala animation
│   ├── music.js
│   ├── memes.js
│   ├── art.js
│   ├── trends.js
│   └── team.js
└── assets/                 # backgrounds, mandala, wordmark cutout, sun cursor, images, audio
```

## 🚀 Getting Started

### Run locally

1. Extract the ZIP.
2. Open `index.html` in a modern browser. Most of the site works directly from a file URL.
3. For the most reliable WebGL and CDN loading, use a tiny local server. In the project folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

### Deploy for free

**GitHub Pages**
1. Create a GitHub repository and upload the extracted files (keep the folder structure).
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Wait for the published URL to appear. `index.html` is the entry page.

**Netlify**
1. Sign in to Netlify and choose **Add new site → Deploy manually**.
2. Drag the extracted project folder into the deploy area, or connect your GitHub repository.
3. Netlify publishes the static site and gives you a shareable URL.

## 🎨 Customization

- **Colors:** edit the shared desi palette in `css/desi-theme.css` under `:root`.
- **Text and content:** change names, captions, genres, trend text, and team bios directly in each HTML file.
- **Images:** replace placeholder art blocks with
  ```html
  <img src="assets/your-image.jpg" alt="Description">
  ```
  Keep image files in `assets/` and use relative paths.
- **Art gallery:** update the `data-title`, `data-artist`, and `data-description` attributes on each `.art-piece` button, and update the artwork list in `js/art.js` when replacing images.
- **Music and memes:** the music player and meme wall are ready for your audio and meme artwork. Add the files under `assets/` to connect them.
- **Forms:** the meme generator keeps feedback local, and the team form does not send or store any data. Connect a form backend or service if you need submissions.

## 📝 Notes

- Internet access is needed for Google Fonts and the CDN libraries. Page content and CSS stay local.
- Reduced-motion preferences are respected for the main animations.
- WebGL is required for the 3D home scene.

## 👥 Team **Web Weavers**

| Name | Role |
|------|------|
| [Nancy] | THE DESIGNER [Role, e.g. Frontend & 3D] |
| [Yashika] | THE COLLECTOR [Role, e.g. Design & Content] |
| [Divas Maliyan] | THE DEPLOYER [Role, e.g. Testing & Deployment] |

## 🙏 Credits

- Libraries: Three.js, GSAP, Lenis
- Fonts: Google Fonts
- Images, memes, audio, and artwork: Claude,Chatgpt,Pinterest,Google

## 📄 License

Made for an educational college event. Content and media belong to their respective owners.

---

*culture.exe has stopped responding. Please touch grass and try again.* 😌
