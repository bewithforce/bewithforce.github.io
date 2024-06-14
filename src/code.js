function onClickHandler(e) {
    let sum = Number(localStorage.getItem('sum'));
    sum += 1
    localStorage.setItem('sum', '' + sum)
    let counter = document.getElementById('counter');
    counter.innerText = sum.toString();
}


let sum = Number(localStorage.getItem('sum'));
let counter = document.getElementById('counter');
counter.innerText = sum.toString();
document.getElementById('Rjomba').addEventListener('click', e => onClickHandler(e))