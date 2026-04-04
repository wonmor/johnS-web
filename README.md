# John Seong — personal website

Primary site: **[johnseong.com](https://johnseong.com)** (Next.js, WebGL, multilingual).

This repo contains the production Next.js app and a **static mirror** under `docs/` for hosting on [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Next.js app

```bash
npm install
npm run dev
```

- `app/` — App Router pages and components  
- `public/` — static assets referenced by the Next build  
- `app/i18n/` — English, French, and Korean copy  

## GitHub Pages (`docs/`)

The `docs/` folder is a **no-build** HTML/CSS snapshot styled like the main site: cream hero band, navy `#020824` body, London Underground–inspired roundel with 787 wing motif, floating chrome header, section navigation, and the same portfolio copy (English). Heavy clients (Three.js viewers, locale switching, cookie UI) stay on the full Next deployment; placeholders link back to **johnseong.com** for WebGL sections.

Included locally:

- `docs/index.html`, `docs/gh-pages.css`  
- `docs/assets/` — SVGs needed offline (roundel mask, flags, HDSB logo)  
- `docs/.nojekyll` — disables Jekyll so static files deploy as-is  

Images that may not live in `public/` in your clone are loaded from **johnseong.com** (Reach logo, MobileSyrup badge, photos). To self-host everything for Pages, copy those files into `docs/assets/` and update the `src` attributes in `index.html`.

### Enable Pages

1. Repo **Settings → Pages**.  
2. **Build and deployment → Source**: Deploy from branch.  
3. Choose your branch and set the folder to **`/docs`**, then save.

For a **project site** (`https://<user>.github.io/<repo>/`), relative links in `docs/` already resolve correctly. For a **user or org site** (`https://<user>.github.io/`), either publish only this repo as the root site or adjust paths as needed.

## License / credits

Site content © John Wonmo Seong unless otherwise noted.
