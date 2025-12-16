
const CACHE_NAME = 'gaia-os-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './install.html'
];

// Install Event - Cache Core Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First, then Cache (Strategy for dynamic content)
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests (like Google Fonts or API calls) for basic SW
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Update cache with new version if network succeeds
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // If network fails, serve from cache
        return caches.match(event.request);
      })
  );
});
