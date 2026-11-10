// Route the app's direct calls to api.anthropic.com through the local
// /anthropic proxy defined in vite.config.js (which adds the API key).
// If no key is configured, the app falls back to its built-in rule engine.
const ANTHROPIC = "https://api.anthropic.com";
const originalFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const url = typeof input === "string" ? input : input && input.url;
  if (url && url.startsWith(ANTHROPIC)) {
    return originalFetch("/anthropic" + url.slice(ANTHROPIC.length), init);
  }
  return originalFetch(input, init);
};
