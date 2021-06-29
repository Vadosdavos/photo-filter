const inputs = document.querySelectorAll('.filters label');
const reset = document.querySelector('.btn-reset');
const next = document.querySelector('.btn-next');
const load = document.querySelector('.btn-load--input');
const image = document.querySelector('img');
let imgNum = 0;

// function setValue() {
//     const suffix = this.childNodes[1].dataset.sizing;
//     document.documentElement.style.setProperty(`--${this.childNodes[1].name}`, this.childNodes[1].value + suffix);
//     this.childNodes[3].value = this.childNodes[1].value
// }
function setValue() {
    let value;
    this.childNodes.forEach(child => {
        let suffix;
        if (child.nodeName === 'INPUT') {
            suffix = child.dataset.sizing;
            document.documentElement.style.setProperty(`--${child.name}`, child.value + suffix);
            value = child.value;  
        }
        if (child.nodeName === 'OUTPUT') { 
            child.value = value;
        }
    })
}

inputs.forEach(input => input.addEventListener('input', setValue));

function resetAll() {
    document.documentElement.removeAttribute('style');
    inputs.forEach(input => {
        if (input.childNodes[1].name === 'saturate') {
            input.childNodes[1].value= 100;
            input.childNodes[3].value= 100;
        }
        else {
            input.childNodes[1].value= 0;
            input.childNodes[3].value= 0;
        }
    });
}
reset.addEventListener('click', resetAll);

function getHours() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
}
function getTimeOfDay() {
    if (getHours() >= 6 && getHours() < 12) return 'morning';
    else if (getHours() >= 12 && getHours() < 18) return 'day';
    else if (getHours() >= 18 && getHours() < 24) return 'evening';
    else if (getHours() >= 0 && getHours() < 6) return 'night';
}
function nextImg() {
    const timeOfDay = getTimeOfDay();
    imgNum++;
    if (imgNum === 21) imgNum = 1;
    const imageNum = String(imgNum).padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${imageNum}.jpg`;
    img.addEventListener('load', () => image.src = `${img.src}`);
}
next.addEventListener('click', nextImg);

function loadImg() {
    console.log(this.files)
    image.src = window.URL.createObjectURL(this.files[0]);
}
load.addEventListener('change', loadImg);
