
// indexedDB: Reforzamiento
let request = window.indexedDB.open('MyDatabase', 2);

// Is update when created or updated the database version
request.onupgradeneeded = event => {
    console.log("Updating...");

    let db = event.target.result;

    db.createObjectStore('Heroes', {
        keyPath: 'id'
    });
}

// Error handler
request.onerror = event => {
    console.log('DB Error: ', event.target.error);
}

// Insert Data
request.onsuccess = event => {
    let db = event.target.result;

    let heroesData = [
        {id: '1', heroe: 'Spiderman', mensaje: 'Aqui Spiderman'},
        {id: '2', heroe: 'Ironman', mensaje: 'Aqui Ironman'}
    ];

    let heroesTransaction = db.transaction('Heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log('DB Error Updating: ', event.target.error);
    }

    heroesTransaction.onsuccess = event => {
        console.log('Transaccion: ', event);
    }

    let heroeStore = heroesTransaction.objectStore('Heroes');

    for( let heroe of heroesData){
        heroeStore.add(heroe);
    }

    heroeStore.onsuccess = event => {
        console.log("Nuevos items agregados");
    }
}



