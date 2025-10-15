self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("biblia-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./manifest.json",
        "./informativa.js",
        "./home.js",
        "./pokemon.png",
        "./logo192.png",
        "./logo512.png"
      ]);
    })
  );
  console.log("Service Worker instalado");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
