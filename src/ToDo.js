import { format, parse } from "date-fns";

export default function createNewToDo(
  title,
  description,
  dueDate,
  priority,
  project,
  checked
) {
  class toDoItem {
    constructor(title, description, dueDate, priority, project, checked) {
      this.title = title;
      this.description = description;
      this.dueDate = format(
        parse(dueDate, "yyyy-MM-dd", new Date()),
        "dd/MM/yyyy"
      );
      this.priority = priority;
      this.project = project;
      this.checked = false;
    }
    check = () => {
      if (this.checked === false) {
        this.checked = true;
      } else this.checked = false;
    };
  }
  return new toDoItem(title, description, dueDate, priority, project, checked);
}
