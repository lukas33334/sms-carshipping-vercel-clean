# SMS Car Shipping Website

React/Vite website prepared for Vercel.

## Vercel build settings

- Framework Preset: Vite
- Root Directory: `.`
- Install Command: `pnpm install --no-frozen-lockfile`
- Build Command: `pnpm exec vite build`
- Output Directory: `dist/public`

## Required Vercel environment variables

Set these under **Vercel → Project → Settings → Environment Variables**:

```text
UPSTREAM_ORIGIN=https://YOUR-CURRENT-UPSTREAM-APP.example
UPSTREAM_ASSET_PREFIX=/YOUR-MEDIA-PREFIX
UPSTREAM_API_PREFIX=/api/trpc
```

Do not use the final public domain as `UPSTREAM_ORIGIN`. Use the direct upstream app URL to avoid a routing loop.

## Architecture

- Vercel serves the public website.
- `/media/*` is proxied through Vercel to the existing media source.
- `/api/trpc/*` is proxied through Vercel to the existing API source.
- The public browser URL stays on the SMS Car Shipping domain.

## Later cleanup

For the final fully independent version, download all media files and put them into `client/public`, then remove the upstream proxy environment variables and proxy functions.
