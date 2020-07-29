// declaration
const btn = document.querySelector('.header--button');
const cancelBtn = document.querySelector('.form__actions--cancel');
const welcomeText = document.querySelector('p.welcome-text');
const toggle = document.querySelector('.form');
const form = document.querySelector('form');
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


// functions
function addVisibleClass () {
    toggle.classList.add('visible');
}

function removeVisibleClass (){
    toggle.classList.remove('visible');
}

function removeHiddenClass () {
    modal.classList.remove('hidden');
    main.style.filter = 'blur(5px)';
    disableCheckbox();
}

function disableCheckbox () {
    for (let i = 0; i < selectBox.length; i++) {
        selectBox[i].disabled = true;
    }
}

function enableCheckbox () {
    for (let i = 0; i < selectBox.length; i++) {
        selectBox[i].disabled = false;
    }
}

function changeState () {
    btn.textContent = `➖`;
    welcomeText.textContent = `Click the "➖" button to delete tasks`;
    btn.removeEventListener('click', addVisibleClass);
    btn.addEventListener('click', removeHiddenClass);
}

function returnState () {
    btn.textContent = `✜`;
    welcomeText.textContent = `Click the "✜" to add a task`;
}

function addDiv (event) {
    event.preventDefault();
    removeVisibleClass();
    const newDiv = document.createElement('div');
    newDiv.classList.add('tododiv');
    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox')
    checkbox.type = "checkbox"; 
    checkbox.name = "id"; 
    checkbox.value = "value"; 
    checkbox.id = "id";
    checkbox.disabled = true;
    checkbox.addEventListener('click', changeState);
    const label = document.createElement('label');
    label.classList.add('elementLabel');
    label.htmlFor = "id";
    const descriptionList = document.createElement('dl');
    const listItem = document.createElement('dt');
    const listDetail = document.createElement('dd');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    listItem.textContent= `${formText.value.toUpperCase()}`;
    listDetail.textContent = 
    `${formDate.value}`;
    deleteBtn.textContent= `➖`;
    myDiv.appendChild(newDiv);
    newDiv.appendChild(checkbox);
    newDiv.appendChild(label);
    label.appendChild(descriptionList);
    descriptionList.appendChild(listItem);
    descriptionList.appendChild(listDetail);
    label.appendChild(deleteBtn);

    if (myDiv.childElementCount > 0) {
        checkbox.disabled = false;
    }

    (formPriority.value === 'high') ? (newDiv.style.borderTop = '10px solid red') :
    (formPriority.value === 'medium') ? (newDiv.style.borderTop = '10px solid blue') :
    (formPriority.value === 'low') ? (newDiv.style.borderTop = '10px solid yellow') : (newDiv.style.borderTop = '10px solid transparent');

    function removeDivElement() {
        newDiv.remove();
    }

    function addHiddenClass() {
        modal.classList.add('hidden');
        main.style.setProperty('filter', 'blur(0)');
        enableCheckbox();
        btn.removeEventListener('click', removeHiddenClass);
        btn.addEventListener('click', returnState);
        btn.addEventListener('click', addVisibleClass);
    }

    function checkCheckedBoxes() {
        addHiddenClass();
        main.style.setProperty('filter', 'blur(0)');
        let checkedBox = document.querySelectorAll('.checkbox');
        let newtodoDiv = document.querySelectorAll('.tododiv');
        for (let i = 0; i < checkedBox.length; i++) {
            if (checkedBox[i].checked) {
                 newtodoDiv[i].remove();
                 console.log("removed");
            }
            enableCheckbox();
        }
        btn.removeEventListener('click', removeHiddenClass);
        btn.addEventListener('click', returnState);
        btn.addEventListener('click', addVisibleClass);
    }

    deleteBtn.addEventListener('click', removeDivElement);

    noBtn.addEventListener('click', addHiddenClass);

    yesBtn.addEventListener('click', checkCheckedBoxes);
};

// eventlisteners
btn.addEventListener('click', addVisibleClass);

cancelBtn.addEventListener('click', removeVisibleClass);

form.addEventListener('submit', addDiv);