let url = 'not-found.html';

fetch(url).then(resp => resp.text()).then(html => {
    let body = document.querySelector('body');
    body.innerHTML = html;
}).catch(error => {
    console.log(error);
});