import ToDo from './ToDo.mjs';
import UI, { Element } from './UI.mjs';

const ui = new UI();

Element.formNewTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = e.target.firstElementChild.value;

  if (newTask != '') {
    const todo = new ToDo(newTask);
    todo.addTask(todo);
    // todo.addLocalStorage(todo);
    // console.log(todo);
    ui.addTask(todo);
    ui.clearInput();
  }
});

Element.list.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log(e.target);
  ui.completeTask(e.target);
});
