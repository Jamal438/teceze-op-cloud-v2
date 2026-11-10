// The app was written for the Claude artifact runtime, which provides
// window.storage (async key/value). This shim backs it with localStorage
// so data persists in the browser when the app runs standalone.
if (typeof window !== "undefined" && !window.storage) {
  const PREFIX = "teceze:";
  window.storage = {
    async get(key) {
      const value = localStorage.getItem(PREFIX + key);
      if (value === null) throw new Error("Key not found: " + key);
      return { key, value, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(PREFIX + key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(PREFIX + key);
      return { key, deleted: true, shared: false };
    },
    async list(prefix = "") {
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX + prefix))
        .map((k) => k.slice(PREFIX.length));
      return { keys, prefix, shared: false };
    },
  };
}
