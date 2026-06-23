// New Dad Tracker service worker
// Bump CACHE when you change any cached file, so old caches get cleared.
var CACHE = "newdad-v1.0.2";

// Local app shell. Relative paths so it works under a GitHub Pages subpath.
var SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png"
];

// Cross-origin assets to cache so the app is fully offline after first load.
var EXTERNAL = [
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // Shell must all succeed. External assets are added best-effort.
      return cache.addAll(SHELL).then(function () {
        return Promise.all(
          EXTERNAL.map(function (url) {
            return cache.add(url).catch(function () { /* ignore if offline on first install */ });
          })
        );
      });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (k) { if (k !== CACHE) return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;

      return fetch(req).then(function (res) {
        // Cache same-origin GETs as they are fetched, for resilience.
        try {
          var url = new URL(req.url);
          if (url.origin === self.location.origin && res && res.status === 200) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
        } catch (e) { /* ignore */ }
        return res;
      }).catch(function () {
        // Offline navigation falls back to the cached app shell.
        if (req.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 504, statusText: "offline" });
      });
    })
  );
});
