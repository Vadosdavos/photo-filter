const inputs = document.querySelectorAll('.filters label');
const reset = document.querySelector('.btn-reset');

console.log(reset);

function setValue() {
    const suffix = this.childNodes[1].dataset.sizing;
    document.documentElement.style.setProperty(`--${this.childNodes[1].name}`, this.childNodes[1].value + suffix);
    this.childNodes[3].value = this.childNodes[1].value
}

inputs.forEach(input => input.addEventListener('input', setValue));

reset.addEventListener('click', () => document.documentElement.style.removeProperty('--blur'));