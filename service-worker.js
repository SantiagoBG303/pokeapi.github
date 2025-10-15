// Nombre de caché con versión (cámbialo cada vez que hagas cambios grandes)
const CACHE_NAME = "biblia-cache-v2";

// Archivos que se guardarán en caché
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./informativa.js",
  "./home.js",
  "./pokemon.png",
  "./logo192.png",
  "./logo512.png"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
  console.log("Service Worker instalado");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // fuerza que la nueva versión se instale inmediatamente
});

// Activación del Service Worker
self.addEventListener("activate", event => {
  console.log("Service Worker activado");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // hace que la nueva versión controle todas las páginas abiertas
});

// Interceptar peticiones y servir desde caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
