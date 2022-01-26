'use strict';

const form = document.querySelector('form');
const list = document.getElementById('mainList');
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


form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleClick);
