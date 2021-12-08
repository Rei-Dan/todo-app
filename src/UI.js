import { toDoStorage, projectStorage } from "./StorageController";
import createNewToDo from "./ToDo";
import moment from "../node_modules/moment";
import createNewProject from "./Projects";

const loadUI = (() => {
  const toDoArray = toDoStorage.get();
  const init = () => {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    container.classList.add("container");
    body.appendChild(container);
    const header = document.createElement("header");
    header.classList.add("header");
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    const projectsDiv = document.createElement("div");
    projectsDiv.classList.add("projects-div");
    const newProjectDiv = document.createElement("div");
    newProjectDiv.classList.add("new-project-div");
    const newProjectInput = document.createElement("input");
    newProjectInput.classList.add("new-project-input");
    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "Add New Project";
    newProjectButton.addEventListener("click", () => {
      addProject();
      newProjectInput.value = "";
      clearContent();
      clearProjects();
      loadAllToDo();
      loadProjects();
    });
    newProjectDiv.append(newProjectInput, newProjectButton);
    sidebar.append(projectsDiv, newProjectDiv);
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.textContent = "Rei-Dan, The Odin Project";
    const content = document.createElement("div");
    content.classList.add("content");
    contentContainer.append(sidebar, content);
    container.append(header, contentContainer, footer);
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = "To-Do List";
    const user = document.createElement("div");
    user.classList.add("user");
    user.textContent = "DummyUser";
    header.append(title, user);
    loadAllToDo();
    loadProjects();
  };

  const addProject = () => {
    const newProjectInput = document.querySelector(".new-project-input");
    projectStorage.add(createNewProject(newProjectInput.value));
  };

  const clearContent = () => {
    const content = document.querySelector(".content");
    content.innerHTML = "";
  };

  const clearProjects = () => {
    const projectsDiv = document.querySelector(".projects-div");
    projectsDiv.innerHTML = "";
  };

  const loadAllToDo = () => {
    for (let i = 0; i < toDoArray.length; i++) {
      const content = document.querySelector(".content");
      const toDoItem = document.createElement("div");
      toDoItem.dataset.todoNumber = i;
      toDoItem.classList.add("to-do-item");
      const checkbox = document.createElement("input");
      if (toDoArray[i].checked === true) {
        checkbox.checked = true;
        toDoItem.classList.add("checked");
      }
      Object.assign(checkbox, { type: "checkbox" });
      checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
          toDoItem.classList.add("checked");
        } else toDoItem.classList.remove("checked");
      });
      const title = document.createElement("div");
      title.textContent = toDoArray[i].title;
      const description = document.createElement("div");
      description.textContent = toDoArray[i].description;
      const dueDate = document.createElement("div");
      dueDate.textContent = toDoArray[i].dueDate;
      const priority = document.createElement("div");
      priority.textContent = toDoArray[i].priority;
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "&times";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        toDoStorage.remove(deleteButton.parentNode.dataset.todonumber);
        clearContent();
        loadAllToDo();
      });
      toDoItem.append(
        checkbox,
        title,
        description,
        dueDate,
        priority,
        deleteButton
      );
      content.appendChild(toDoItem);
    }
    addNewToDo();
  };

  const loadTodayTodo = () => {
    const content = document.querySelector(".content");
    for (let i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].dueDate === moment().format("L")) {
        const toDoItem = document.createElement("div");
        toDoItem.dataset.todoNumber = i;
        toDoItem.classList.add("to-do-item");
        const checkbox = document.createElement("input");
        if (toDoArray[i].checked === true) {
          checkbox.checked = true;
          toDoItem.classList.add("checked");
        }
        Object.assign(checkbox, { type: "checkbox" });
        checkbox.addEventListener("click", () => {
          if (checkbox.checked) {
            toDoItem.classList.add("checked");
          } else toDoItem.classList.remove("checked");
        });
        const title = document.createElement("div");
        title.textContent = toDoArray[i].title;
        const description = document.createElement("div");
        description.textContent = toDoArray[i].description;
        const dueDate = document.createElement("div");
        dueDate.textContent = toDoArray[i].dueDate;
        const priority = document.createElement("div");
        priority.textContent = toDoArray[i].priority;
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&times";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
          toDoStorage.remove(deleteButton.parentNode.dataset.todonumber);
          clearContent();
          loadAllToDo();
        });
        toDoItem.append(
          checkbox,
          title,
          description,
          dueDate,
          priority,
          deleteButton
        );
        content.appendChild(toDoItem);
      }
    }
    addNewToDo();
  };

  const loadProjects = () => {
    const projects = projectStorage.get();
    const projectsDiv = document.querySelector(".projects-div");
    for (let i = 0; i < projects.length; i++) {
      const project = document.createElement("div");
      project.textContent = projects[i].title;
      if (projects[i].title === "Today") {
        project.addEventListener("click", () => {
          clearContent();
          loadTodayTodo();
        });
      } else if (projects[i].title === "All To-Do's") {
        project.addEventListener("click", () => {
          clearContent();
          loadAllToDo();
        });
      }

      projectsDiv.appendChild(project);
    }
  };

  const addNewToDo = () => {
    const content = document.querySelector(".content");
    const toDoItem = document.createElement("div");
    toDoItem.classList.add("to-do-item");
    const plus = document.createElement("button");
    plus.classList.add("plus-button");
    plus.textContent = "+";
    toDoItem.appendChild(plus);
    content.appendChild(toDoItem);
    plus.addEventListener("click", () => {
      toDoItem.removeChild(plus);
      const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "title");
      titleLabel.textContent = "Title:";
      const inputTitle = document.createElement("input");
      Object.assign(inputTitle, { id: "title", type: "text" });
      inputTitle.classList.add("input");
      const descLabel = document.createElement("label");
      descLabel.setAttribute("for", "description");
      descLabel.textContent = "Description:";
      const inputDesc = document.createElement("input");
      inputDesc.classList.add("input");
      const dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "due-date");
      dueDateLabel.textContent = "Due Date:";
      const inputDueDate = document.createElement("input");
      Object.assign(inputDueDate, {
        id: "input-due-date",
        type: "date",
      });
      inputDueDate.classList.add("input");
      const priorityLabel = document.createElement("label");
      priorityLabel.setAttribute("for", "priority");
      priorityLabel.textContent = "Priority:";
      const inputPriority = document.createElement("select");
      const noSelect = document.createElement("option");
      noSelect.textContent = "";
      Object.assign(noSelect, { value: "" });
      const lowSelect = document.createElement("option");
      lowSelect.textContent = "Low";
      Object.assign(lowSelect, { value: "Low" });
      const mediumSelect = document.createElement("option");
      mediumSelect.textContent = "Medium";
      Object.assign(mediumSelect, { value: "Medium" });
      const highSelect = document.createElement("option");
      highSelect.textContent = "High";
      Object.assign(highSelect, { value: "High" });
      inputPriority.append(noSelect, lowSelect, mediumSelect, highSelect);
      inputPriority.classList.add("input");
      const submitButton = document.createElement("button");
      submitButton.textContent = "Add";
      submitButton.classList.add("submit-todo");
      submitButton.addEventListener("click", () => {
        toDoStorage.add(
          createNewToDo(
            inputTitle.value,
            inputDesc.value,
            inputDueDate.value,
            inputPriority.value
          )
        );
        clearContent();
        loadAllToDo();
      });
      toDoItem.append(
        titleLabel,
        inputTitle,
        descLabel,
        inputDesc,
        dueDateLabel,
        inputDueDate,
        priorityLabel,
        inputPriority,
        submitButton
      );
    });
  };

  return { init, addNewToDo };
})();

export { loadUI };
