function addSlow(number){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(number + 1);
        }, 800);
    });
}

let addFast = (number) => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => resolve(number + 1), 300);
    });
}

Promise.race([addSlow(5), addFast(10)]).then( anwser => {
    console.log(anwser);
}).catch(console.log);