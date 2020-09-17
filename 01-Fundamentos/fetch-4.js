let url = 's.png';

let img = document.querySelector('img');



fetch(url).then(resp => resp.blob()).then(image => {
    var imgPath = URL.createObjectURL(image);
    img.src = imgPath;
});
