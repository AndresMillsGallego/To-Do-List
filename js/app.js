'use strict';

// const listDiv = document.getElementById('renderedList');
const form = document.querySelector('form');
const list = document.getElementById('mainList');
// const header = document.querySelector('header');
let body = document.getElementById('body');
// let photoArray = ['arc', 'beach', 'beach2', 'boulangerie', 'eiffel', 'paradise-pier', 'walt', 'tanzania'];
let listArray = [];
let listIdArray = [];

function ListItem(text) {
  this.textContent = text;
  this.isChecked = false;
  this.isImportant = false;
}

function createButton(type, name, parentEl) {
  let button = document.createElement('button');
  button.textContent = name;
  button.type = type;
  button.name = name;
  parentEl.appendChild(button);
}

function unpackItems(key, array) {
  array = [];
  let unpackedItems = localStorage.getItem(key);
  let parsedItems = JSON.parse(unpackedItems);
  array.push(parsedItems);
}

function renderListItem(text, className) {
  let li = document.createElement('li');
  li.className = className;
  li.id = text;
  let label = document.createElement('label');
  let input =  document.createElement('input');
  label.textContent = text;
  input.type = 'checkbox';
  input.name = 'checkbox';
  li.appendChild(label);
  label.appendChild(input);
  list.appendChild(li);
  createButton('click', '!', li);
  createButton('click', 'X', li);
}

function handleSubmit(event) {
  event.preventDefault();
  let newItem = event.target.listItem.value;
  listIdArray.push(newItem);
  let newListEntry = new ListItem(newItem);
  listArray.push(newListEntry);
  renderListItem(newItem, 'checkbox');
  form.reset();
}

function saveToStorage(key, items) {
  let stringyItems = JSON.stringify(items);
  localStorage.setItem(key, stringyItems);
}

function handleClick(event) {
  for (let i = 0; i < listIdArray.length; i++) {
    let listId = listIdArray[i];
    let li = document.getElementById(listId);
    let targetButton = event.target;
    if (targetButton.name === 'X' && targetButton.parentElement.id === listId) {
      list.removeChild(li);
      listArray.splice(i,1);
      listIdArray.splice(i, 1);
    } else if (targetButton.name === '!' && targetButton.parentElement.id === listId) {
      li.classList.toggle('highlight');
      if (listArray[i].isImportant !== true) {
        listArray[i].isImportant = true;
      } else {
        listArray[i].isImportant = false;
      }
    } else if (targetButton.name === 'checkbox' && targetButton.parentElement.parentElement.id === listId) {
      li.classList.toggle('checkedBox');
      if (listArray[i].isChecked !== true) {
        listArray[i].isChecked = true;
      } else {
        listArray[i].isChecked = false;
      }
    }
  }
}

function buttonClicks(event) {
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
  if (toggle.id === 'save') {
    saveToStorage('items', listArray);
    saveToStorage('listIds', listIdArray);
  }
  if (toggle.id === 'load') {
    unpackItems('items', listArray);
    unpackItems('listIds', listIdArray);
    for (let i = 0; i < listArray.length; i++) {
      let textContent = listArray[i].textContent;
      if (listArray[i].isChecked !== false) {
        renderListItem(textContent, 'checkedBox');
      }
      else if (listArray[i].isImportant !== false) {
        renderListItem(textContent, 'highlight');
      } else {
        renderListItem(textContent, 'checkbox');
      }
    }
  }

  if (toggle.id === 'clear') {
    list.innerHTML = '';
  }
  if (toggle.id === 'delete') {
    localStorage.clear();
    listArray = [];
    listIdArray = [];
  }
}

// function randomPicture() {
//   let num = Math.floor(Math.random() * photoArray.length);
//   console.log(num);
//   let photo = `${photoArray[num]}.jpg`;
//   let img = document.createElement('img');
//   img.src = `../img/${photo}`;
//   img.alt = photoArray[num];
//   img.width = '430';
//   img.height = '390';
//   listDiv.appendChild(img);
// }

// window.addEventListener('load', randomPicture);

console.log(listArray);
console.log(listIdArray);

form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleClick);
body.addEventListener('click', buttonClicks);
