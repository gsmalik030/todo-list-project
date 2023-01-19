export const allTasks = document.querySelector('.task-list');
let todoItem = [];

export function getTodos() {
  if (localStorage.getItem('todoItem') === null) {
    todoItem = [];
  } else {
    todoItem = JSON.parse(localStorage.getItem('todoItem'));
  }
  let newDisplay = '';
  todoItem.forEach((item) => {
    const check = item.completed ? 'checked' : '';
    const completed = item.completed ? 'completed' : '';
    newDisplay += `
    <li ${completed} class="list-items arrange-items">
    <div class="input">
    <input type="checkbox" data-id="${item.index}" name="" class="check-list" ${check}>
    <label class="list__input ${completed}" contentEditable = "true" for="">${item.description}</label></div>
    <div class="icons"><i class="fa-sharp fa-solid fa-trash icon__size deleteItem"></i><i class="fa-solid fa-pen-to-square icon__size editItem"></i></div>
    </li>
    `;
  });
  allTasks.innerHTML = newDisplay;
}
getTodos();

export function displayBox() {
  const checkBoxes = document.querySelectorAll('.check-list');
  for (let i = 0; i < checkBoxes.length; i += 1) {
    checkBoxes[i].addEventListener('change', (e) => {
      const taskIndex = Number(e.target.getAttribute('data-id'));
      let todoItem = JSON.parse(localStorage.getItem('todoItem')) || [];
      const taskUpdate = todoItem.find((task) => task.index === taskIndex);
      taskUpdate.completed = !taskUpdate.completed;
      todoItem = todoItem.filter((task) => task.index !== taskIndex);
      todoItem.push(taskUpdate);
      localStorage.setItem('todoItem', JSON.stringify(todoItem));
      getTodos();
    });
  }
}

allTasks.addEventListener('click', displayBox());