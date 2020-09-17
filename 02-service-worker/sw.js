/*self.addEventListener('fetch', event => {
    if(event.request.url.includes('main.jpg')){

        event.respondWith(fetch('img/main-patas-arriba.jpg'));
    }
}); */

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(resp => resp.ok ? resp : fetch('img/main.jpg'))
    );
});