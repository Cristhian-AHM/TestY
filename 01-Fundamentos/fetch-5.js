let url = 'https://reqres.in/api/users/10';


fetch(url).then(resp => {
    if(resp.ok){
        return resp.json();
    }else{
        throw new Error('No existe el usario');
    }
}).then(console.log).catch(error => {
    console.log('Error');
    console.log(error);
});
