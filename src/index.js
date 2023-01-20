import './style.css';
import { allTasks } from './modules/task.js';
import { displayBox } from './modules/intravtive-list.js';

const addTaskInput = document.querySelector('.add-task__input');
const taskList = document.querySelector('.add-task');
const todoItem = JSON.parse(localStorage.getItem('todoItem')) || [];
const addIcon = document.querySelector('.add__icon');
const clear = document.querySelector('.clear');
// eslint-disable-next-line import/prefer-default-export, import/no-mutable-exports
export let editIndex = null;

allTasks.addEventListener('click', displayBox());

function saveLocalTodos({ index, description, completed }) {
  todoItem.push({ index, description, completed });
  localStorage.setItem('todoItem', JSON.stringify(todoItem));
}

function saveEdit(index) {
  const newInput = todoItem[index];
  newInput.description = addTaskInput.value;
  localStorage.setItem('todoItem', JSON.stringify(todoItem));
}

const showTasks = (e) => {
  e.preventDefault();
  if (editIndex !== null) {
    saveEdit(editIndex);
    editIndex = null;
  } else {
    saveLocalTodos({
      index: todoItem.length + 1,
      description: addTaskInput.value,
      completed: false,
    });
  }
  addTaskInput.value = '';
  window.location.reload();
};
taskList.addEventListener('submit', showTasks);
addIcon.addEventListener('click', showTasks);

function deleteItem(index) {
  const filterItems = todoItem.filter((todo, id) => id !== index);
  filterItems.forEach((item, index) => {
    item.index = index + 1;
  });
  localStorage.setItem('todoItem', JSON.stringify(filterItems));
  window.location.reload();
}

document.querySelectorAll('.deleteItem').forEach((e, key) => {
  e.addEventListener('click', () => deleteItem(key));
});

function editItems(index) {
  editIndex = index;
  const itemEdit = todoItem.find((a, id) => id === index);
  addTaskInput.value = itemEdit.description;
}
document.querySelectorAll('.editItem').forEach((e, key) => {
  e.addEventListener('click', () => editItems(key));
});

function clearItems() {
  const filterItems = todoItem.filter((todo) => todo.completed !== true);
  localStorage.setItem('todoItem', JSON.stringify(filterItems));
  window.location.reload();
}
clear.addEventListener('click', clearItems);
