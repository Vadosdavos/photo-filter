const labels = document.querySelectorAll('.filters label');
const inputs = document.querySelectorAll('.to-canvas');
const reset = document.querySelector('.btn-reset');
const next = document.querySelector('.btn-next');
const load = document.querySelector('.btn-load--input');
const save = document.querySelector('.btn-save');
const image = document.querySelector('img');
const canvas = document.querySelector('canvas');
const fullscreenButton = document.querySelector('.fullscreen');
let imgNum = 0;

// Original functionality - filters:

function setValue() {
  let value;
  this.childNodes.forEach((child) => {
    let suffix;
    if (child.nodeName === 'INPUT') {
      suffix = child.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${child.name}`, child.value + suffix);
      value = child.value;
    }
    if (child.nodeName === 'OUTPUT') {
      child.value = value;
    }
  });
}

labels.forEach((label) => label.addEventListener('input', setValue));

// Additional functionality to choose: reset filter

function resetAll() {
  document.documentElement.removeAttribute('style');
  labels.forEach((label) => {
    if (label.childNodes[1].name === 'base') {
      label.childNodes[1].value = '#313940';
      label.childNodes[3].value = '#313940';
    } else if (label.childNodes[1].name === 'spacing') {
      label.childNodes[1].value = 80;
      label.childNodes[3].value = 80;
    } else if (label.childNodes[1].name === 'saturate') {
      label.childNodes[1].value = 100;
      label.childNodes[3].value = 100;
    } else {
      label.childNodes[1].value = 0;
      label.childNodes[3].value = 0;
    }
  });
}
reset.addEventListener('click', resetAll);

// Additional functionality to choose: change photo

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
  img.addEventListener('load', () => (image.src = `${img.src}`));
}
next.addEventListener('click', nextImg);

// Additional functionality to choose: load photo from device

function loadImg() {
  image.src = window.URL.createObjectURL(this.files[0]);
  load.value = null;
}
load.addEventListener('change', loadImg);

// Additional functionality to choose: save photo

function drawImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = image.src;
  console.log(img.src);
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    let filterStr = '';
    inputs.forEach((input) => (filterStr = filterStr + ' ' + `${input.name === 'hue' ? input.name + '-rotate' : input.name}(${input.value}${input.dataset.sizing})`));
    ctx.filter = filterStr;
    console.log(filterStr);
    ctx.drawImage(img, 0, 0);
    let link = document.createElement('a');
    link.download = 'download';
    link.href = canvas.toDataURL('');
    link.click();
    link.delete;
  };
}

save.addEventListener('click', drawImage);

// Make app fullscreen

function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
fullscreenButton.addEventListener('click', toggleFullScreen);