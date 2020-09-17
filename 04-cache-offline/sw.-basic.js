

self.addEventListener('fetch', event => {
    /*const offlineResp = new Response(`
    Welcome to my web page
    
    You need internet to see the full content
    
    `);*/

    /*const offlineResp = new Response(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mi PWA</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="container p-3">


    
    <h1>Offline Mode</h1>
    

</body>
</html>`, {
    headers: {
        'Content-Type': 'text/html'
    }
});*/

    const offlineResp = fetch('pages/offline.html');

    const resp = fetch(event.request).catch(() => offlineResp);

    event.respondWith(resp);
});
