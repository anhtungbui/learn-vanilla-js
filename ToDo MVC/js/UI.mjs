export const Element = {
  formNewTask: document.getElementById('form-new-task'),
  inputNewTask: document.getElementById('input-new-task'),
  list: document.querySelector('.list'),
  selectedDiv: document.querySelector('.task'),
};

export default class UI {
  addTask(todo) {
    const item = `<div class="border task text-primary mb-2">${todo.task}</div>`;
    Element.list.insertAdjacentHTML('beforeend', item);
  }

  clearInput() {
    Element.inputNewTask.value = '';
  }

  completeTask(todo) {
    todo.style.textDecoration = 'line-through';
    setTimeout(() => {
      Element.list.removeChild(todo);
    }, 3000);
  }
}
