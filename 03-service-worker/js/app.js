

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
        Notification.requestPermission().then(result => {
            if(result){
                console.log("Aceptado");
            }
        });

        reg.showNotification("Hello World");
    });

    
    /*navigator.serviceWorker.register('/sw.js').then(reg => {
        setTimeout(() => {
            reg.sync.register('Gatos');
            console.log("Gatos enviados");
        }, 3000)
    });*/
}

//if(window.SyncManager){}

//let url = 'https://reqres.in/api/users';

//fetch(url).then(resp => resp.text()).then(console.log);