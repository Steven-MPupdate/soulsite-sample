# Creator Site — Sample

A representative sample of a hand-built creator website (a "SoulSite"), provided for
**technical due-diligence review**. It is a static, dependency-free site with the
production patterns we ship on every build.

> **Note:** This is an anonymized demo. All names, copy, images, links, and identifiers
> ("The Open Page" / Alex Rivers) are fictional placeholders. Some owner-only tooling
> used on live client sites is intentionally omitted from this public sample.

## What to look at

- **Zero build step, zero framework.** Plain semantic HTML, hand-written CSS, and a few
  small vanilla-JS modules. Nothing to compile; open `index.html` and it runs.
- **Performance & accessibility.** System/Google fonts with `preconnect`, responsive
  layout via CSS grid/flex, reduced-motion-friendly, semantic landmarks and alt text.
- **SEO.** Per-page `<title>`/description, canonical URLs, Open Graph + Twitter cards,
  and a Schema.org JSON-LD entity graph (`WebSite` / `Person` / `WebPage`).
- **GEO (AI-search readiness).** `llms.txt` summary and an explicit AI-crawler allowlist
  in `robots.txt`.
- **Installable PWA.** `manifest.webmanifest` + a cache-first `sw.js` service worker, plus
  a small footer module (`js/app-actions.js`) offering a one-tap install and a
  "get updates" cache-buster.
- **Clean URLs.** Pages link without `.html` extensions (server rewrites handle this in
  production).

## Layout

```
index.html          Home (hero, about, offers, featured book, CTA)
links.html          Link hub
products.html       Books
soul-insight.html   Long-form "about / who I serve" page
css/style.css       Base theme + layout
css/premium.css     Brand skin (colors, typography, cards) loaded after style.css
js/footer.js        Shared footer + mobile nav, injected per page
js/app-actions.js   PWA install + update buttons
js/config.example.js  Template for an optional YouTube API key (copy to js/config.js)
assets/             Placeholder brand images (logo, hero, covers, icons, OG)
robots.txt, sitemap.xml, llms.txt, manifest.webmanifest, sw.js
```

## Run locally

Any static server works, for example:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open the printed URL.
