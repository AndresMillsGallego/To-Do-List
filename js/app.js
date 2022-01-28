'use strict';

// const listDiv = document.getElementById('renderedList');
const form = document.querySelector('form');
const list = document.getElementById('mainList');
// const header = document.querySelector('header');
let body = document.getElementById('body');
// let photoArray = ['arc', 'beach', 'beach2', 'boulangerie', 'eiffel', 'paradise-pier', 'walt', 'tanzania'];
let listArray = [];
let itemCounter = 0;

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

function unpackItems() {
  let unpackedItems = localStorage.getItem('items');
  if (unpackedItems) {
    list.innerHTML = '';
    let parsedItems = JSON.parse(unpackedItems);
    for (let i = 0; i < parsedItems.length; i++) {
      let textContent = parsedItems[i].textContent;
      let id = i;
      // let isChecked = order.isChecked;
      // let isImportant = order.isImportant;
      renderListItem(textContent, id);
      listArray.push(parsedItems);
    }
  }
}

function renderListItem(text, elemId) {
  let li = document.createElement('li');
  li.className ='checkBox';
  li.id = elemId;
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
  let newListEntry = new ListItem(newItem);
  listArray.push(newListEntry);
  renderListItem(newItem, itemCounter);
  itemCounter++;
  form.reset();
}

function saveToStorage(item) {
  let stringyItems = JSON.stringify(item);
  localStorage.setItem('items', stringyItems);
}

function handleClick(event) {
  for (let i = 0; i < listArray.length; i++) {
    let li = document.getElementById(i);
    console.log(li);
    let targetButton = event.target;
    if (targetButton.name === 'X' && targetButton.parentElement === li) {
      list.removeChild(li);
      listArray.splice(i,1);
    } else if (targetButton.name === '!' && targetButton.parentElement === li) {
      li.classList.toggle('highlight');
    } else if (targetButton.name === 'checkbox' && targetButton.parentElement.parentElement === li) {
      li.classList.toggle('checkedBox');
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
    saveToStorage(listArray);
    console.log('hi');
  }
  if (toggle.id === 'load') {
    unpackItems();
  }
  if (toggle.id === 'clear') {
    list.innerHTML = '';
  }
  if (toggle.id === 'delete') {
    itemCounter = 0;
    localStorage.clear();
    listArray =[];
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

form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleClick);
body.addEventListener('click', buttonClicks);
