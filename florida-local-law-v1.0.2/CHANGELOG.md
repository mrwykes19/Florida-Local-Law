# Changelog

## 1.0.2

- Removed the legacy `public/_redirects` SPA fallback because Wrangler already uses `assets.not_found_handling: "single-page-application"`. The duplicate fallback caused Cloudflare Workers to reject deployment as an infinite redirect loop.


## 1.0.2 — Cloudflare deployment correction

- Added `wrangler.jsonc` for Cloudflare Workers static-assets deployment.
- Added `package.json` with Wrangler deploy and local-development scripts.
- Moved public web assets into the `public` directory.
- Configured SPA fallback routing for Workers.
- Retained optional Cloudflare Pages compatibility.
- Updated the offline cache version.


## 1.0.0 — July 28, 2026

- Created mobile-first Florida local-government legal reference PWA
- Added 39 statutory research starting points in 12 topics
- Added client-focused views for The Villages, Minneola, Leesburg, and Umatilla
- Added global search, topic filters, favorites, history, and local notes
- Added direct official-source links and verification metadata
- Added offline service worker, web manifest, app icons, and Cloudflare Pages routing
- Added responsive desktop navigation
