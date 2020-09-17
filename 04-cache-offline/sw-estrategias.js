const Cache_Dynamic_Name = 'Cache-Dynamic-v1';
const Cache_Static_Name = 'Cache-Static-v2';
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
            '/js/app.js'
        ]);
    });

    const cacheInmutable = caches.open(Cache_Inmutable_Name).then(cache => {
        return cache.addAll([
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ]);
    });

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('fetch', event => {
    // 1.- Cache Only, the app only uses the cache data
    //event.respondWith(caches.match(event.request));

    // 2.- Cache with Network Fallback, first try cache and if doesn't work try Internet jjjjß
    /*const answer = caches.match(event.request).then(resp => {
        return resp ? resp : fetch(event.request).then(newResp => {
            caches.open(Cache_Dynamic_Name).then(cache => {
                cache.put(event.request, newResp);
                clearCache(Cache_Dynamic_Name, 2);
            })
            return newResp.clone();
        });
    });

    event.respondWith(answer); */

    // 3.- Network with Cache Fallback
    /*
    const answer = fetch(event.request).then(resp => {
        if(!resp) return caches.match(event.request);

        caches.open(Cache_Dynamic_Name).then(cache => {
            cache.put(event.request, resp);
            clearCache(Cache_Dynamic_Name, Cache_Dynamic_Limit);
        })
        return resp.clone();
    }).catch(error => {
        return caches.match(event.request);
    });

    event.respondWith(answer); */

    // 4.- Cache with Network Update, performance is important 

    /*const answer = caches.open(Cache_Static_Name).then(cache => {
        fetch(event.request).then(newResp => {
            cache.put(event.request, newResp);
        });

        return cache.match(event.request);
    });

    event.respondWith(answer); */

    // 5.- Cache and Network Race

    const answer = new Promise((resolve, reject) => {
        let rejected = false;

        const failedOnce = () => {
            if(rejected){
                if(/\.(png|jpg)$/i.test(event.request.url)){
                    resolve(caches.match('/img/no-image.jpg'));
                }else{
                    reject('No image found');
                }
            }else{
                rejected = true;
            }
        }

        fetch(event.request).then(resp => {
            resp.ok ? resolve(resp) : failedOnce();
        }).catch(failedOnce);

        caches.match(event.request).then(resp => {
            resp ? resolve : failedOnce();
        }).catch(failedOnce);
    });

    event.respondWith(answer);

});