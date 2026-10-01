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

## Production

`npm run build` generates `dist/`. Before publishing:

1. Install a valid SSL certificate on `cms.alejandroa184.sg-host.com`
   (SiteGround → Security → SSL Manager). Today it serves SiteGround's
   self-signed certificate and browsers will block requests.
2. Set `VITE_WP_API_URL=https://cms.alejandroa184.sg-host.com/wp-json` at
   build time.
3. Configure the server to serve `index.html` on every route (SPA
   fallback) so `/news/...` works.

`public/_stitch.html` is the original design, kept for visual comparison;
delete it before publishing.
