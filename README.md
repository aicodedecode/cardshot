# Cardshot

Turn any link into a branded social card. Paste a URL or drop a screenshot, brand it
with your colors, logo and handle, and export a polished PNG for Twitter/X, LinkedIn
or your Open Graph tags.

**Live app:** https://aicodedecode.github.io/cardshot/

Everything in the editor is 100% client-side. Your images never leave your browser.
There are no API keys and no paid services anywhere in this project.

## Features

- 6 templates: Browser, Spotlight, Framed, Split, Quote, Minimal, each with a live
  thumbnail preview
- Export sizes: OG 1200x630, Square, Portrait, Story, Wide, Post
- Export as PNG or JPEG
- Brand presets: save your accent, background, font, brand and handle under a name and
  switch between them in one click; your settings are remembered in your browser
- Drag and drop a screenshot straight onto the preview
- Undo and redo (Ctrl+Z / Ctrl+Shift+Z), Reset, and keyboard shortcuts: D downloads,
  C copies, 1 to 6 switches templates
- Mobile-friendly: controls come first, a floating Preview button jumps to the canvas,
  and touch targets are 44px

## URL capture pipeline (free)

Real screenshots of a live URL need a browser somewhere. Cardshot does it with the
GitHub Actions minutes you already have, no third-party service:

1. Click "Capture from URL" in the app. It opens a pre-filled issue on this repo.
2. A workflow picks it up, renders the page in headless Chromium at 2x, and saves a
   PNG into `shots/`.
3. The shot is committed, the issue is closed with the link, and the Pages deploy
   re-runs automatically, so the gallery on the site updates itself.

Private, internal and login-walled addresses are rejected by the capture script.

## Self-hosting

Fork the repo, and it works as-is: Pages deploys on every push to `main`, and the
capture workflow runs on your own minutes. If you fork it, update the `USER` and
`REPO` constants near the top of `index.html` and the links in the README.

## Local development

It is a single static file. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

The capture script lives in `capture/` and runs anywhere Playwright runs:

```
cd capture && npm install && npx playwright install chromium
TITLE="capture: https://example.com" node capture.js
```

## License

MIT
