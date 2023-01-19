import './style.css';

const tasks = document.querySelector('.task-list');

const listArr = [
  {
    description: 'Going to study webpack 1',
    complete: false,
    index: 0,
  },
  {
    description: 'Going to study webpack 2',
    complete: false,
    index: 1,
  },
  {
    description: 'Going to study webpack 3',
    complete: false,
    index: 2,
  },
];

const displayTasks = (task) => {
  tasks.insertAdjacentHTML(
    'afterbegin',
    `
<li class="list-items arrange-items">
<div class="input">
  <input type="checkbox" name="" class="list-item" id="${task.index}" >
  <label class="list__input" for="">${task.description}</label>
</div>
<i class="fa-sharp fa-solid fa-trash icon__size"></i>
</li>
<hr>
`,
  );
};
tasks.inerHTML = listArr
  .reverse()
  .map((task) => displayTasks(task))
  .join('');
