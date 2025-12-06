const CACHE_NAME = 'cory-cache-portfolio';
const OFFLINE_URL = '/offline.html';
const OFFLINE_ASSETS = [
    '/offline.html',
    '/style.css',
    '/media/fonts/Satoshi-Variable.woff2',
    '/media/fonts/ClashDisplay-Variable.woff2',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
        return cache.addAll(OFFLINE_ASSETS);
        })()
    );
});

self.addEventListener('fetch', (event) => {
    // Serve offline.html to offline navigation requests
    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                console.log('Fetch failed, returning offline page instead');
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(OFFLINE_URL);
                return cachedResponse;
            }
        })()
        );
    } 

    // Handle all other requests (CSS + fonts)
    else {
        event.respondWith(
        (async () => {
            try {
                // Try network first so CSS updates immediately
                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                // Fallback to cache if offline
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request, {ignoreVary: true});
                return cachedResponse;
            }
        })()
        );
    }
});