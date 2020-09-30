// declaration
const btn = document.querySelector('.header--button');
const cancelBtn = document.querySelector('.form__actions--cancel');
const welcomeText = document.querySelector('p.welcome-text');
const form = document.querySelector('.form');
const main = document.querySelector('main');
const addTodo = document.querySelector('.todo-list');
const formText = document.querySelector('#todotext');
const formDate = document.querySelector('#tododate');
const formPriority = document.querySelector('#priority');
const myDiv = document.querySelector('.todo-block');
const selectBox = document.getElementsByClassName('checkbox');
const modal = document.querySelector('.modal');
const noBtn = document.querySelector('.modal__actions-btn--passive');
const yesBtn = document.querySelector('.modal__actions-btn--danger');
const deleteBtn = document.getElementsByClassName('deleBtn');

// functions
function addVisibleClass () {
    form.classList.add('visible');
};

function removeVisibleClass () {
    form.classList.remove('visible');
};

function removeHiddenClass () {
    modal.classList.remove('hidden');
};

function aBlur () {
    main.style.filter = 'blur(5px)';
};

function unBlur () {
    main.style.setProperty('filter', 'blur(0)');
};

function addHiddenClass() {
    modal.classList.add('hidden');
};

function disableCheckbox () {
    for (let i = 0; i < selectBox.length; i++) {
        selectBox[i].disabled = true;
    };
};

function enableCheckbox () {
    for (let i = 0; i < selectBox.length; i++) {
        selectBox[i].disabled = false;
    };
};

function showDeletBtn () {
    document.querySelectorAll('.deleteBtn').forEach(item => item.style.display = 'block');
};

function hideDeleteBtn () {
    document.querySelectorAll('.deleteBtn').forEach(item => item.style.display = 'none');
};

function changeState () {
    btn.textContent = `➖`;
    welcomeText.textContent = `Click the "➖" button to delete tasks`;
};

function returnState () {
    btn.textContent = `✜`;
    welcomeText.textContent = `Click the "✜" to add a task`;
};

function disablePointerEvents () {
    btn.style.pointerEvents = 'none';
};

function enablePointerEvents () {
    btn.style.pointerEvents = 'fill';
};

function toggleBtn() {
    btn.textContent === '✜' ? (addVisibleClass(), disablePointerEvents(),disableCheckbox()) : 
    (removeHiddenClass(), aBlur(), returnState(), disablePointerEvents(), disableCheckbox());
};

function checkCheckedBoxes() {
    [...selectBox].filter((item, i) => {
        if (item.checked === true) {
            [...myDiv.childNodes][i].remove();
        };
    });
};

function addBorderTop () {
    myDiv.childNodes.forEach(elem => {
        (formPriority.value === 'high') ? (elem.style.borderTop = '10px solid red') :
        (formPriority.value === 'medium') ? (elem.style.borderTop = '10px solid blue') :
        (formPriority.value === 'low') ? (elem.style.borderTop = '10px solid yellow') : (elem.style.borderTop = '10px solid transparent');
    });
};

function addDiv () {
    myDiv.innerHTML +=  
    `<div class='newDiv tododiv'>
        <input type='checkbox' id='id' class='checkbox' value='value' disabled=true>
        <label for='id'>
        <h3>${formText.value.toUpperCase()}</h3>
        <p>${formDate.value}</p>
        <button class='deleteBtn btn'>➖</button>
        </label>
    </div>`;

    document.querySelectorAll('.newDiv').forEach((item, i) => item.addEventListener('click', (e) => {
        const clickedBtn = e.target;
        if (clickedBtn.classList.contains('deleteBtn')) {
            [...myDiv.childNodes][i].remove();
        };

        if (clickedBtn.classList.contains('checkbox')) {
            changeState();
            hideDeleteBtn();

            if (document.querySelectorAll('input[type=checkbox]:checked').length === 0)  {
                returnState();
                showDeletBtn();
            }
        };      
    }));
};

// eventlisteners
btn.addEventListener('click', toggleBtn);

cancelBtn.addEventListener('click', () => {
    removeVisibleClass();
    enablePointerEvents();
    enableCheckbox();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addDiv();
    addBorderTop();
    enableCheckbox();
    addHiddenClass();
    removeVisibleClass();
    enablePointerEvents();
});

noBtn.addEventListener('click', () => {
    addHiddenClass();
    unBlur();
    enablePointerEvents();
    enableCheckbox();
});

yesBtn.addEventListener('click', () => {
    checkCheckedBoxes();
    unBlur();
    addHiddenClass();
    showDeletBtn();
    enablePointerEvents();
    enableCheckbox();
});