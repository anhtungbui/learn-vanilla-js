export default class ToDo {
  constructor(task) {
    this.task = task;
    this.done = false;
    this.taskList = [];
  }

  addTask(todo) {
    this.taskList.push(todo.task);
  }

  addLocalStorage(todo) {
    localStorage.setItem('id', todo.task);
  }
}
