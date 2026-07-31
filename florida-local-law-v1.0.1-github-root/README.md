# Florida Local Law v1.0.1

A mobile-first progressive web app for Florida local-government legal research.

## Cloudflare Workers deployment — use these settings

This version is configured for the Cloudflare **Worker** import screen that displays a Deploy command field.

1. Upload every file and folder from this directory to the root of the GitHub repository.
2. In Cloudflare, import the GitHub repository under Workers & Pages.
3. Set:
   - Production branch: `main`
   - Build command: leave blank
   - Deploy command: `npx wrangler deploy`
   - Root directory: leave blank
4. Deploy.

The repository root must contain `wrangler.jsonc`, `package.json`, and the `public` folder. The `public` folder must contain `index.html`.

## Cloudflare Pages alternative

To create a Pages project instead:

1. Choose **Create application > Pages > Import an existing Git repository**.
2. Set:
   - Framework preset: None
   - Build command: `exit 0`
   - Build output directory: `public`
   - Root directory: leave blank

## Project structure

```text
package.json
wrangler.jsonc
public/
  index.html
  app.js
  authorities.js
  topics.js
  styles.css
  manifest.webmanifest
  sw.js
  favicon.svg
  icons/
```

## Updating legal content

Edit `public/authorities.js`. Topic and client definitions are in `public/topics.js`.

## Privacy

Favorites, history, and notes remain in the user's browser through local storage. Do not put privileged or confidential information in the public GitHub source files.
