import { format, parse } from "date-fns";

export default function createNewToDo(
  title,
  description,
  dueDate,
  priority,
  checked,
  project
) {
  class toDoItem {
    constructor(title, description, dueDate, priority, checked, project) {
      this.title = title;
      this.description = description;
      this.dueDate = format(
        parse(dueDate, "yyyy-MM-dd", new Date()),
        "dd/MM/yyyy"
      );
      this.priority = priority;
      this.checked = false;
      this.project = project;
    }
    check = () => {
      if (this.checked === false) {
        this.checked = true;
      } else this.checked = false;
    };
  }
  return new toDoItem(title, description, dueDate, priority, checked, project);
}
