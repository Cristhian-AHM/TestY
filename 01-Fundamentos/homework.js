let url = 'https://swapi.dev/api/people/1/';

// Ejercicio 1 

fetch(url).then(resp => resp.json()).then(user => {
    console.log(user.name);
    console.log(user.gender);
})