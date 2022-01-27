'use strict';

const form = document.querySelector('form');
const list = document.getElementById('mainList');
const header = document.getElementById('headerDiv');
let listItemCounter = 0;

function createButton(type, name, parentEl) {
  let button = document.createElement('button');
  button.textContent = name;
  button.type = type;
  button.name = name;
  parentEl.appendChild(button);
}

function createNewCheckbox(text) {
  let li = document.createElement('li');
  li.className ='checkBox';
  li.id = listItemCounter;
  let label = document.createElement('label');
  let input =  document.createElement('input');
  label.textContent = text;
  input.type = 'checkbox';
  input.name = 'checkbox';
  input.id = text;
  li.appendChild(label);
  label.appendChild(input);
  list.appendChild(li);
  createButton('click', '!', li);
  createButton('click', 'X', li);
}

function handleSubmit(event) {
  event.preventDefault();
  let newListItem = event.target.listItem.value;
  createNewCheckbox(newListItem);
  listItemCounter++;
  form.reset();
}

function handleClick(event) {
  for (let i = 0; i < listItemCounter; i++) {
    let li = document.getElementById(i);
    let targetButton = event.target;
    if (targetButton.name === 'X' && targetButton.parentElement === li) {
      list.removeChild(li);
    } else if (targetButton.name === '!' && targetButton.parentElement === li) {
      li.classList.toggle('highlight');
    } else if (targetButton.name === 'checkbox' && targetButton.parentElement.parentElement === li) {
      li.classList.toggle('checkedBox');
    }
  }
}

function toggleMode(event) {
  let body = document.getElementById('body');
  let toggle = event.target;
  if (toggle.id === 'normal') {
    body.className = 'normalMode';
  } else if (toggle.id === 'dark') {
    body.className = 'darkMode';
  } else if (toggle.id === 'reset') {
    document.getElementById('normal').checked = false;
    document.getElementById('dark').checked = false;
    document.getElementById('reset').checked = false;
    body.className = 'normalMode';
  }
}

form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleClick);
header.addEventListener('click', toggleMode);
