import { getTodos } from './task.js';

// eslint-disable-next-line import/prefer-default-export
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
      window.location.reload();
      getTodos();
    });
  }
}
