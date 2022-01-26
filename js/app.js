'use strict';

const form = document.querySelector('form');
const list = document.getElementById('mainList');

function createButton(type, name, parentEl) {
  let button = document.createElement('button');
  button.textContent = name;
  button.type = type;
  parentEl.appendChild(button);
}

function createNewCheckbox(text) {
  let li = document.createElement('li');
  let label = document.createElement('label');
  let input =  document.createElement('input');
  label.textContent = text;
  input.type = 'checkbox';
  input.id = text;
  li.appendChild(label);
  label.appendChild(input);
  list.appendChild(li);
  createButton('submit', 'Del', li);
}

function handleSubmit(event) {
  event.preventDefault();
  let newListItem = event.target.listItem.value;
  createNewCheckbox(newListItem);
  form.reset();
}





form.addEventListener('submit', handleSubmit);
