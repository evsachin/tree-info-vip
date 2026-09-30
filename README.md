# Tree Information (React + Vite + Tailwind)

A static, mobile-first website with one page per tree and printable QR codes. No backend or database.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

- `/` home with all trees
- `/tree/banyan-tree` a tree page
- `/qr-codes` QR code generator with search and PNG download

## Add a tree

1. Put photos in `public/images/trees/` (e.g. `jamun-1.jpg`).
2. Copy any object in `src/data/trees.js`, then change `id`, `slug`, names, text and `images`.
3. The page is live at `/tree/<slug>` and appears on `/qr-codes` automatically.

The sample ages and heights are placeholders. Replace them with real values.

## Set your domain (before printing QR codes)

Edit `BASE_URL` in `src/config.js`, or create a `.env` file:

```
VITE_BASE_URL=https://your-real-domain.com
```

Then open `/qr-codes` on the final site and download each PNG (1024x1024 px, with a quiet margin).

## Build and deploy

```bash
npm run build
```

Upload the `dist/` folder, or connect the repo to a host:

- **Vercel**: import the repo. `vercel.json` handles direct links.
- **Netlify**: build command `npm run build`, publish directory `dist`. `public/_redirects` handles direct links.
- **GitHub Pages**: the build copies `index.html` to `404.html` so direct links work. For a project site at `user.github.io/repo/`, set `base: "/repo/"` in `vite.config.js` and use `<BrowserRouter basename="/repo">` in `src/main.jsx`.

## Checklist before printing

1. Deploy and confirm the real domain works.
2. Set `BASE_URL`, rebuild, redeploy.
3. Download the QR codes from the deployed `/qr-codes` page.
4. Scan a few with a phone to confirm they open the right tree.
