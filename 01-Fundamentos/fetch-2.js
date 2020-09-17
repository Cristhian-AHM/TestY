let url = 'https://reqres.in/api/users';

fetch(url).then(resp => resp.json()).then(console.log);
