const Cache_Dynamic_Name = 'Cache-Dynamic-v1';
const Cache_Static_Name = 'Cache-Static-v3';
const Cache_Inmutable_Name = 'Cache-Inmutable-v1';
const Cache_Dynamic_Limit = 50;

function clearCache(Cache_Name, Items){
    caches.open(Cache_Name).then(cache => {
        return cache.keys().then(keys => {
            if(keys.length > Items){
                cache.delete(keys[0]).then(clearCache(Cache_Name, Items));
            }
        });
    });
}


self.addEventListener('install', event => {
    const cacheStatic = caches.open(Cache_Static_Name).then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/img/no-image.jpg',
            '/js/app.js',
            '/pages/offline.html'
        ]);
    });

    const cacheInmutable = caches.open(Cache_Inmutable_Name).then(cache => {
        return cache.addAll([
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ]);
    });

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('activate', event => {
    const answer = caches.keys().then(keys => {
        keys.forEach(key => {
            if(key !== Cache_Static_Name && key.includes('Static')){
                return caches.delete(key);
            }
        });
    });

    event.waitUntil(answer);
});


self.addEventListener('fetch', event => {
    // 2.- Cache with Network Fallback, first try cache and if doesn't work try Internet jjjjß
    const answer = caches.match(event.request).then(resp => {
        return resp ? resp : fetch(event.request).then(newResp => {
            caches.open(Cache_Dynamic_Name).then(cache => {
                cache.put(event.request, newResp);
                clearCache(Cache_Dynamic_Name, 2);
            })
            return newResp.clone();
        }).catch(error => {
            if(event.request.headers.get('accept').includes('text/html')){
                caches.match('/pages/offline.html');
            }
        });
    });

    event.respondWith(answer); 
});