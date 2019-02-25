'use strict';

// Переменные для первого числа
const firstNumber = getRandomInRange(6,9);
// Переменные для второго числа
const secondNumber = getRandomInRange(11, 14) - firstNumber;
const sumOfNumbers = firstNumber + secondNumber;
// Получаем случайное число из диапазона, включая минимальное и максимальное
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создаем уравнение на cтранице
const equation = document.createElement('div');
equation.classList.add('equation');
equation.innerHTML = `
<span class = "first-number">${firstNumber}</span> + 
<span class = "second-number">${secondNumber}</span> = 
<span class="amount"> ? </span>
`;
const equationFirstNumber = equation.querySelector('.first-number');
const equationSecondNumber = equation.querySelector('.second-number');
const amount = equation.querySelector('.amount');
document.body.insertAdjacentElement('afterbegin', equation);


//Создание стрелок на Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const step = 39;
const centerFirstArrow = (step * firstNumber) / 2;
const endFirstArrow = firstNumber * step;
const centerSecondArrow = ((step * firstNumber) + ((step * firstNumber) + (step * secondNumber))) / 2;
const endSecondArrow = step + (firstNumber * step) + (secondNumber * step);

const createFirstArrow = () => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'purple';
    ctx.lineCap = 'round';
    ctx.moveTo(0, 100); 
    ctx.quadraticCurveTo(centerFirstArrow, -20, endFirstArrow, 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
    ctx.moveTo(endFirstArrow, 100);
    ctx.lineTo(endFirstArrow -15, 95);
    ctx.moveTo(endFirstArrow, 100);
    ctx.lineTo(endFirstArrow -1, 85);
    ctx.stroke();

    
};
createFirstArrow();

const createSecondArrow = () => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'purple';
    ctx.lineCap = 'round';
    ctx.moveTo(endFirstArrow, 100); 
    ctx.quadraticCurveTo(centerSecondArrow, -20, endSecondArrow - step, 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
    ctx.moveTo(endSecondArrow - step, 100);
    ctx.lineTo(endSecondArrow - step - 15, 95);
    ctx.moveTo(endSecondArrow - step, 100);
    ctx.lineTo(endSecondArrow - step -1, 85);
    ctx.stroke();
};
// createSecondArrow();


// Создаем инпуты над стрелками
const inputFirstNumber = document.querySelector('.first-input');
const inputFirstContainer = document.querySelector('.container-first-input');
const inputSecondNumber = document.querySelector('.second-input');
const inputSecondContainer = document.querySelector('.container-second-input');
const inputFinal = document.createElement('input');

const showFirstNumber = () => {
    inputFirstNumber.style.display = 'block';
    inputFirstContainer.style.position = 'absolute';
    const inputFirstNumberShift = inputFirstNumber.offsetWidth + (inputFirstNumber.offsetWidth) / 2;
    inputFirstContainer.style.left = (centerFirstArrow + inputFirstNumberShift -15) + 'px';
    inputFirstContainer.style.top  = '-20px';
};
showFirstNumber();

const showSecondNumber = () => {
    inputSecondNumber.style.display = 'block';
    inputSecondContainer.style.position = 'absolute';
    const inputSecondNumberShift = inputSecondNumber.offsetWidth + (inputSecondNumber.offsetWidth) / 2;
    inputSecondContainer.style.left = (centerSecondArrow + inputSecondNumberShift -10) + 'px';
    inputSecondContainer.style.top  = '-20px';
};
// showSecondNumber();

// Проверяем значения инпутов
const finalInput = document.createElement('input');
finalInput.setAttribute("type", "text");
finalInput.setAttribute("maxlength", "2");
finalInput.classList.add('finalInput');

const checkFirstInput = (input, number, span) => {
    if (input.value != number) {
        input.classList.add('input-error');
        span.classList.add('span-error');
    }else {
        input.disabled = true;
        input.classList.remove('input-error');
        span.classList.remove('span-error');
        showSecondNumber();
        createSecondArrow();
    }
};

const checkSecondInput = (input, number, span) => {
    if (input.value != number) {
        input.classList.add('input-error');
        span.classList.add('span-error');
    }else {
        input.disabled = true;
        input.classList.remove('input-error');
        span.classList.remove('span-error');
        checkSum();
    }
    if (inputFirstNumber.disabled === true && inputSecondNumber.disabled === true) {
        amount.after(finalInput);
        amount.remove();
    };
};
inputFirstNumber.oninput = () => checkFirstInput(inputFirstNumber, firstNumber, equationFirstNumber);

const checkSum = () => {
    if (finalInput.value === String(sumOfNumbers)) {
        finalInput.disabled = true;
        finalInput.classList.remove('input-error');
    } else {
        finalInput.classList.add('input-error');
    }
}
inputSecondNumber.oninput = () => checkSecondInput(inputSecondNumber, secondNumber, equationSecondNumber);
finalInput.oninput = checkSum;
