'use strict';

const form = document.querySelector('form');
const list = document.getElementById('renderedList');
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
  li.setAttribute('class','checkBox');
  li.setAttribute('id', listItemCounter);
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
  console.log(listItemCounter);
  form.reset();
}

function handleClick(event) {
  for (let i = 0; i < listItemCounter; i++) {
    let li = document.getElementById(i);
    if (event.target.name === 'X') {
      list.removeChild(li);
    } else if (event.target.name === '!') {
      li.classList.toggle('highlight');
    } else if (event.target.name === 'checkbox') {
      li.classList.toggle('checkedBox');
    }
    console.log(event.target.name);
  }
}


form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleClick);
