const cacheName = 'length-cache';
const expectedCaches = [
    cacheName
];
const toCache = [
    './',
    'styles/style.css',
    'js/script.js',
    'https://use.typekit.net/zub3tbp.css'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(toCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) return caches.delete(key);
            })
        ))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});