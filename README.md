# a6700 Photo School

A free, self-paced photography course built around the **Sony a6700** — a static site (plain HTML/CSS/JS, no build step) hosted on GitHub Pages.

**Live site:** https://andytambe31.github.io/photography-/

## What's inside

- **9 modules / 31 lessons**: camera setup, exposure triangle, shooting modes & metering, autofocus (subject recognition, back-button focus), colour & Creative Looks, composition & lenses, genre recipes, video, workflow.
- **Quizzes** for every module (70% to pass).
- **Interactive exposure simulator**: aperture → background blur, shutter → motion blur, ISO → noise, live meter.
- **Depth-of-field calculator** (APS-C), quick rules (500 rule, 180° shutter, handheld limits).
- **Printable cheat sheet** and checklists. Progress is saved in your browser.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

- `index.html` – shell
- `content.js` – all course content (edit lessons here)
- `app.js` – router, quizzes, progress, simulator and calculators
- `styles.css` – styles (light/dark)
