let url = 'https://reqres.in/api/users';

let user = {
    name: 'Cristhian',
    age: 24
};

fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(resp => resp.json()).then(console.log)
.catch(console.error);
