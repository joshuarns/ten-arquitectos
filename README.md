# TEN Arquitectos — web

React + Vite + Tailwind CSS 3 replica of the Stitch design
(`_stitch/home.html`), with News loaded from WordPress.

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

In dev and `npm run preview`, `/wp-json` is proxied to `WP_PROXY_TARGET`
(the CMS by default), so there are no CORS or SSL issues locally.

## WordPress

- **News** (home section, `/news`, `/news/:slug`) = WordPress posts
  (`/wp/v2/posts`). Set `VITE_WP_NEWS_CATEGORY` to a category slug to only
  show posts from that category.
- Featured image → post image; date, title, excerpt and content come from
  the post.
- While WordPress has no posts (or does not respond), the design's 3
  placeholder news items are shown (`src/data/content.js`).
- Hero, timeline, featured projects and the rest of the static content live
  in `src/data/content.js`.

## Projects (`/proyectos`, `/proyectos/:slug`)

Layout replicated from jsa.com.mx/proyectos and
jsa.com.mx/proyectos/conjunto-juan-de-la-barrera. Projects = every post that
is not News (or posts in `VITE_WP_PROJECTS_CATEGORY`).

How a post maps to the page (`src/lib/project.js`):

- **Title** → project name (a trailing " — TEN Arquitectos" is dropped).
- **Featured image** → hero (720px tall) and the thumbnail in the grid.
- **First paragraph in italics/bold** → project data, split on " — ":
  location, `Program: …` → Tipología, `… m²` → Área.
  E.g. `Morelia, Michoacán, Mexico — Program: Private Residence — 4,000 m²`.
- **ACF fields** (optional, with "Show in REST API" on) override that data:
  `ubicacion`, `tipologia`, `fecha`, `area`, `fotografias`, `creditos`.
  The year in `fecha` sorts the chronological list; without it the post's
  publish year is used.
- **The 1–2 following paragraphs** → text next to the accordion.
- **The rest** → text and images in content order. Each group of consecutive
  images becomes a gallery (5 layouts measured from the reference, used in
  order); a single image on its own becomes a full-width image.
- **No images in the content yet** → the text is split into the reference's
  rhythm with grey boxes where the images go.

## Production (Vercel)

`vercel.json` does in production what the Vite proxy does in development:
`/wp-json/*` and `/wp-content/*` are forwarded to the CMS, and every other
route serves `index.html` so `/proyectos/...` and `/news/...` work when
opened directly.

1. The rewrites reach the CMS over **http**: SiteGround cannot issue SSL for
   the temporary `cms.alejandroa184.sg-host.com` domain. Visitors still use
   https (to Vercel); only the Vercel → CMS hop is unencrypted, which is fine
   for public content. Once the CMS has a real domain with SSL, switch the
   destinations in `vercel.json` to `https://`.
2. In Vercel, leave `VITE_WP_API_URL` **unset** so the app uses the
   `/wp-json` rewrite. If the CMS domain changes, update `vercel.json`.

`public/_stitch.html` is the original design, kept for visual comparison;
delete it before publishing.
