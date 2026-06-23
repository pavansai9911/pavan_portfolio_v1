# Pavan Sai Boddeda — Personal Portfolio

> Premium personal portfolio website for a Python Backend Developer & AI/LLM Integration Specialist.

**Live:** [https://pavansai9911.github.io](https://pavansai9911.github.io) *(update after deployment)*

---

## ✨ Features

- **Dark / Light mode** — persisted in `localStorage`
- **Typing animation** — cycles through roles in the hero
- **Scroll-reveal animations** — fade-in, slide-up, slide-left/right
- **Animated counters** — achievement numbers count up on scroll
- **3D tilt cards** — project cards react to mouse movement
- **Sticky navbar** — glassmorphism effect on scroll, active-link highlighting
- **Mobile menu** — full-screen overlay burger menu
- **Contact form** — opens native email client with pre-filled content
- **Download Resume** — direct `.docx` download from `assets/resume/`
- **Keyboard accessible** — skip-link, semantic HTML, ARIA labels
- **SEO-ready** — `<meta>` description, keywords, OG tags

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # Single-page app entry
├── css/
│   └── style.css               # All styles — CSS variables, dark/light, responsive
├── js/
│   └── script.js               # All interactions — no frameworks
├── assets/
│   ├── resume/
│   │   └── Pavan_Sai_Boddeda_Resume.docx   ← actual resume file
│   ├── images/                 # Add profile photo here (see below)
│   └── icons/                  # Optional favicon assets
└── README.md
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create a GitHub repository

```bash
# Option A: repo named exactly your username (serves at username.github.io)
# Create repo: pavansai9911/pavansai9911.github.io

# Option B: any name (serves at username.github.io/repo-name)
# Create repo: pavansai9911/portfolio
```

### Step 2 — Push the code

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio release"
git branch -M main
git remote add origin https://github.com/pavansai9911/<REPO_NAME>.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Save — your site is live in ~60 seconds

---

## 🖼 Adding Your Profile Photo

1. Save your photo as `assets/images/profile.jpg` (recommended: 400×400 px, square)
2. In `index.html`, find the `<div class="profile-placeholder">` block and replace it with:

```html
<img
  src="assets/images/profile.jpg"
  alt="Pavan Sai Boddeda"
  width="200"
  height="200"
  style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
  loading="lazy"
/>
```

---

## 🎨 Customisation

All design tokens live in `css/style.css` under `:root { … }`:

| Variable             | Purpose                    | Default      |
|----------------------|----------------------------|--------------|
| `--accent-primary`   | Main brand colour          | `#6C63FF`    |
| `--accent-secondary` | Gradient end / pill colour | `#A78BFA`    |
| `--font-sans`        | Body typeface              | Inter        |
| `--font-mono`        | Code / mono typeface       | JetBrains Mono |

To change the accent colour sitewide, update just those two variables.

---

## 🔗 Links to Update

| Location                | What to update                                      |
|-------------------------|-----------------------------------------------------|
| `index.html` `<head>`   | OG image URL once live                              |
| LinkedIn social link    | Confirm full URL: `linkedin.com/in/pavan-sai-boddeda` |
| Hero "Download Resume"  | Already wired to `assets/resume/Pavan_Sai_Boddeda_Resume.docx` |

---

## 🛠 Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Markup     | HTML5 (semantic)                   |
| Styling    | CSS3 — custom properties, grid, flexbox, glassmorphism |
| Behaviour  | Vanilla JavaScript (ES2020)        |
| Fonts      | Google Fonts — Inter + JetBrains Mono |
| Hosting    | GitHub Pages (static, free)        |
| Frameworks | **None** — zero dependencies       |

---

## 📄 License

This portfolio is personal — feel free to adapt the structure for your own use, but please replace all personal content (name, experience, projects) with your own.

---

*Built with precision by Pavan Sai Boddeda · 2025*
