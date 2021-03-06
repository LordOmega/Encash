var CACHE_NAME = 'Encash_Go_To_Zero_v0_3';
var urlsToCache = [
  '/Encash',
  '/Encash/',
  '/Encash/index.html',
  '/Encash/index.css',
  '/Encash/index.js',
  'https://fonts.googleapis.com/css?family=Open+Sans:400,700'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith((function() {
    console.log(event.request, urlsToCache.includes(event.request));
    if(urlsToCache.includes(event.request)) {
      return caches.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          caches.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      })
    } else {
      return fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    }   
  }()));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
