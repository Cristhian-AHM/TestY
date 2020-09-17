// Check for service worker compatibility 

if(navigator.serviceWorker){
    // Install Service Worker
    navigator.serviceWorker.register('/sw.js');
}