const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

/* install service worker */
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
            caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

/* activate event */
self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
});

/* this is required to meet installability requirements */
/* fetch event */
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    /*evt.respondWith(async function() {
        try{
            var res = await fetch(evt.request);
            var cache = await caches.open('cache');
            cache.put(evt.request.url, res.clone());
            return res;
        }
        catch(error){
            return caches.match(evt.request);
        }
    }());*/
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});