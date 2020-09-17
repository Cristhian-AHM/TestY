

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

/*if(window.caches){
    caches.open('Prueba-1');

    caches.open('Cachev1').then(cache => {
        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg'
        ]).then(() => {
            cache.put('/index.html', new Response('Hello World!'));
        });

        cache.match('/index.html').then(resp => {
            resp.text().then(console.log);
        });
    });

    caches.keys().then(console.log);
} */