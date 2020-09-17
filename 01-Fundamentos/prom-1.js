function addOne(number){

    let promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(number + 1);
        }, 800);
    });

    return promise;
}

addOne(5).then(newNumber => {
    return addOne(newNumber);
}).then(newNumber => {
    console.log(newNumber);
});

