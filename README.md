# Teceze Operations Cloud v2

A React + Vite app built from `teceze-erp-v2.jsx`.

## Requirements

Node.js 18 or newer (https://nodejs.org).

## Run it

```bash
npm install
npm run dev
```

The app opens at http://localhost:5173.

## Build for production

```bash
npm run build     # outputs static files to dist/
npm run preview   # serves dist/ at http://localhost:4173
```

## AI features (optional)

The AI copilot and AI auto-decisions call the Claude API. To turn them on:

1. Copy `.env.example` to `.env`.
2. Put your Anthropic API key in `ANTHROPIC_API_KEY`.
3. Restart `npm run dev`.

The key stays on the dev server: the browser calls `/anthropic`, and Vite's
proxy adds the key before forwarding to api.anthropic.com. Without a key the
app still works and uses its built-in rule-based decisions.

When you deploy `dist/` to a real host, add an equivalent server-side proxy
for `/anthropic` (for example a small serverless function) so the key is
never shipped to the browser.

## Data

Your changes are saved in the browser's localStorage. Use "Reset demo" in
the top bar to go back to the sample data.

## Project layout

```
src/App.jsx      the original application (unchanged)
src/main.jsx     entry point
src/storage.js   localStorage-backed replacement for the artifact storage API
src/aiProxy.js   routes Claude API calls through the local proxy
src/index.css    Tailwind setup
```
