
// Ciclo de vida del SW
self.addEventListener('install', event => {
    // Download Assets
    // Create Cache
    console.log("SW!");

    const install = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Instalaciones");
            self.skipWaiting();
            resolve();
        }, 1000);
    })

    event.waitUntil(install);
});

// Service Worker takes control
self.addEventListener('activate', event => {
    // Delete previous caches
    console.log("Ready");
});

// Fetch: Handler of HTTP Requests
self.addEventListener('fetch', event => {


    //Apply Cache Strategies
    //console.log(event.request.url);

    //if(event.request.url.includes('https://reqres.in/')){
    //    const resp = new Response(`ok: false, mensaje: 'jajaja'`);

    //   event.respondWith(resp);
    //}
});

// Sync: When we get internet connection back

self.addEventListener('sync', event => {
    console.log("Internet connection is back");
    console.log(event.tag);
});

//Push: Handle push notifications
self.addEventListener('push', event => {
    console.log('Hey!');
});