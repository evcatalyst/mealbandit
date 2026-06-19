# MealBandit

A static recipe blueprint site. It turns a plain meal idea, preference profile, and optional macro targets into a visual meal plan, dynamically generated meal photo, ingredient bill of materials, equipment list, nutrition estimate, and prep sequence.

## Local development

Install dependencies and run the local server:

```sh
npm install
npm run dev
```

Then open <http://127.0.0.1:5173>. You can still open `index.html` directly in a browser for the static canvas-only experience.

The meal photo is generated in the browser from the current recipe blueprint using canvas, so it changes when the user changes the idea, servings, mode, or shuffle seed.

Preference fields support likes, not-likes, allergies, and hard hates with reasons. Allergies and hard hates are treated as exclusions when possible, while likes bias the recommendation.

Macro target fields support per-person carb ceilings, protein floors, calorie caps, and fat caps. The app estimates calories, protein, carbs, and fat from a local ingredient table, then suggests concrete tweaks when a generated recipe misses an active target.

## Grok photos

Grok image generation is optional and server-side. The browser never receives the xAI key.

Cost controls:

- The canvas preview is always free and generated first.
- Grok is only called when the user clicks `Grok photo`.
- The app requests one `grok-imagine-image` image at `1k` resolution and `16:9`.
- Generated data URLs are cached in the browser per recipe signature.
- The Netlify function keeps a small warm-memory cache for repeated recipe signatures.

Set `XAI_API_KEY` in Netlify to enable Grok photos on the deployed Netlify site. Without it, the app keeps the canvas preview and shows a clear status message.

## Checks

```sh
npm run build
npm run test:smoke
```

The Playwright smoke suite verifies recipe rendering, preference and macro behavior, the nonblank canvas preview, the Grok fallback path, and mobile visibility.

## Deployment

The static site builds into `dist/`.

GitHub Pages:

- `.github/workflows/pages.yml` builds, runs Playwright smoke tests, uploads `dist/`, and deploys with GitHub Pages Actions.
- The production GitHub Pages URL will be available from the workflow deployment output after the `main` branch workflow completes.

Netlify:

- `netlify.toml` publishes `dist/` and deploys functions from `netlify/functions`.
- Connect the repository in Netlify, or set repository secrets `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` to enable `.github/workflows/netlify.yml`.
- Set `XAI_API_KEY` in Netlify environment variables to enable Grok image generation.
