export default function createNewToDo(title, description, dueDate, priority) {
  class toDoItem {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
    }
  }
  return new toDoItem(title, description, dueDate, priority);
}
