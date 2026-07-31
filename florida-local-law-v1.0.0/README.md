# Florida Local Law

A mobile-first progressive web app for Florida local-government legal research. It is designed for quick use during meetings, document review, and issue spotting.

## Version 1.0.0

The initial library contains 39 curated Florida statutory starting points across 12 practice topics:

- Procurement and purchasing
- Sunshine Law and public meetings
- Public records
- Community redevelopment agencies
- Special districts
- Community development districts
- Ethics and voting conflicts
- Code enforcement
- Municipal government
- Elections and public office
- Utilities, claims, and risk
- Property, parking, and towing

Client-focused views are included for:

- The Villages
- Minneola
- Leesburg
- Umatilla

## Features

- Search by citation, acronym, legal issue, tag, or plain-language phrase
- Topic-based navigation
- Statute detail sheets with practical summaries, key points, cautions, related authorities, and direct official-source links
- Favorites and recent research history
- Device-only notes for individual authorities
- Device-only client reference notes
- Client views that prioritize likely practice topics without hiding the full library
- Offline access to the app and curated summaries
- Installable iPhone and Android PWA
- Responsive phone and desktop layouts
- No framework, package installation, or build process required

## Important legal-content notice

This app is a research aid. It is not a substitute for reviewing the current official statute, session laws, controlling cases, Attorney General opinions, administrative rules, charters, ordinances, purchasing policies, enabling acts, contracts, and matter-specific facts.

Each authority identifies the source edition and the date it was last verified. The current seed library identifies the 2025 Florida Statutes and a verification date of July 28, 2026.

## Deploy through GitHub and Cloudflare Pages

### 1. Create the GitHub repository

Create a new repository and upload **all files and folders from this directory to the repository root**. Do not upload the enclosing ZIP file as a single file.

The repository root should contain:

```text
index.html
authorities.js
topics.js
app.js
styles.css
manifest.webmanifest
sw.js
_redirects
favicon.svg
icons/
README.md
```

### 2. Connect the repository to Cloudflare Pages

In Cloudflare:

1. Open **Workers & Pages**.
2. Choose **Create** and then **Pages**.
3. Connect the GitHub repository.
4. Use these settings:
   - Framework preset: **None**
   - Build command: `exit 0`
   - Build output directory: `.`
   - Root directory: leave blank
5. Deploy.

Because this is a no-build static app, Cloudflare publishes the repository files directly.

### 3. Install on iPhone

1. Open the deployed Cloudflare URL in Safari.
2. Tap the Share button.
3. Select **Add to Home Screen**.
4. Confirm the name and tap **Add**.

## Updating the legal library

The statute records are in:

```text
authorities.js
```

Each authority contains:

```javascript
{
  id: '287-055',
  citation: '§ 287.055, Fla. Stat.',
  title: 'Consultants’ Competitive Negotiation Act (CCNA)',
  topic: 'procurement',
  entityTypes: ['Municipality', 'Special District'],
  summary: '...',
  useWhen: '...',
  keyPoints: ['...'],
  cautions: ['...'],
  related: ['...'],
  tags: ['...'],
  officialUrl: 'https://www.leg.state.fl.us/...',
  sourceEdition: '2025 Florida Statutes',
  verifiedOn: '2026-07-28'
}
```

Topics and client views are in:

```text
topics.js
```

## Privacy and local storage

The following information stays in the phone or browser through `localStorage`:

- Favorites
- Recently opened authorities
- Authority notes
- Client reference notes
- Selected client view

It is not sent to a server and is not committed to GitHub. Clearing the browser’s website data removes it.

Do not place privileged, confidential, or matter-specific information in the public GitHub source files.

## Updating the offline cache

When publishing an updated version, change the cache name near the top of `sw.js`:

```javascript
const CACHE = 'florida-local-law-v1.0.1';
```

This causes installed copies to replace the prior cached version after the updated service worker activates.
