import { toDoStorage, projectStorage } from "./StorageController";
import createNewToDo from "./ToDo";
import createNewProject from "./Projects";
import { parse, format, endOfWeek, getDayOfYear } from "date-fns";

const loadUI = (() => {
  const toDoArray = toDoStorage.get();
  const projectArray = projectStorage.get();
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

  const content = document.querySelector(".content");

  const addProject = () => {
    const newProjectInput = document.querySelector(".new-project-input");
    const dupe = projectArray.some(
      (project) => project.title === newProjectInput.value
    );
    if (newProjectInput.value === "") {
      alert("Please enter a project name.");
    } else if (dupe === true) {
      alert("Project already exists");
    } else projectStorage.add(createNewProject(newProjectInput.value));
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
      // addToDoTest(i);

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
      const project = document.createElement("div");
      project.textContent = toDoArray[i].project;
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
        project,
        deleteButton
      );
      content.appendChild(toDoItem);
    }
    addNewToDo();
  };

  // const addToDoTest = (i) => {
  //   console.log(i, content);
  // };

  const loadThisWeekTodo = () => {
    const content = document.querySelector(".content");
    for (let i = 0; i < toDoArray.length; i++) {
      if (
        getDayOfYear(parse(toDoArray[i].dueDate, "dd/MM/yyyy", new Date())) <=
          getDayOfYear(endOfWeek(new Date(), { weekStartsOn: 1 })) &&
        getDayOfYear(parse(toDoArray[i].dueDate, "dd/MM/yyyy", new Date())) >=
          getDayOfYear(endOfWeek(new Date(), { weekStartsOn: 1 })) - 6
      ) {
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

  const loadTodayTodo = () => {
    const content = document.querySelector(".content");
    for (let i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].dueDate === format(new Date(), "dd/MM/yyyy")) {
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

  const loadProjectTodo = (projectName) => {
    const content = document.querySelector(".content");
    for (let i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].project === projectName) {
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
      } else if (projects[i].title === "This Week") {
        project.addEventListener("click", () => {
          clearContent();
          loadThisWeekTodo();
        });
      } else if (projects[i].title === "All To-Do's") {
        project.addEventListener("click", () => {
          clearContent();
          loadAllToDo();
        });
      } else
        project.addEventListener("click", () => {
          clearContent();
          loadProjectTodo(project.textContent);
        });

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
      const toDoForm = document.createElement("form");
      toDoForm.classList.add("to-do-form");
      const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "title");
      titleLabel.textContent = "Title:";
      const inputTitle = document.createElement("input");
      Object.assign(inputTitle, {
        id: "title",
        type: "text",
        required: "required",
      });
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
        required: "required",
      });
      inputDueDate.classList.add("input");
      const priorityLabel = document.createElement("label");
      priorityLabel.setAttribute("for", "priority");
      priorityLabel.textContent = "Priority:";
      const inputPriority = document.createElement("select");
      inputPriority.classList.add("input");
      Object.assign(inputPriority, {
        id: "input-priority",
        required: "required",
      });
      const noSelect = document.createElement("option");
      noSelect.textContent = "Choose";
      Object.assign(noSelect, {
        selected: "selected",
        disabled: "disabled",
      });
      noSelect.setAttribute("value", "");
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
      const projectLabel = document.createElement("label");
      projectLabel.setAttribute("for", "select-project");
      projectLabel.textContent = "Project:";
      const inputProject = document.createElement("select");
      inputProject.classList.add("input");
      Object.assign(inputProject, {
        id: "input-project",
      });
      const selectProject = document.createElement("option");
      selectProject.textContent = "Select Project";
      Object.assign(selectProject, {
        selected: "selected",
        disabled: "disabled",
      });
      inputProject.appendChild(selectProject);
      for (let i = 0; i < projectArray.length; i++) {
        if (
          projectArray[i].title !== "All To-Do's" &&
          projectArray[i].title !== "Today" &&
          projectArray[i].title !== "This Week"
        ) {
          const projectOption = document.createElement("option");
          projectOption.textContent = projectArray[i].title;
          Object.assign(projectOption, { value: projectArray[i].title });
          inputProject.appendChild(projectOption);
        }
      }
      const submitButton = document.createElement("button");
      submitButton.textContent = "Add";
      submitButton.classList.add("submit-todo");
      Object.assign(submitButton, { type: "submit" });
      submitButton.addEventListener("click", () => {
        const dupe = toDoArray.some((todo) => todo.title === inputTitle.value);
        if (dupe === true) {
          alert("Todo already exists");
        } else {
          toDoStorage.add(
            createNewToDo(
              inputTitle.value,
              inputDesc.value,
              inputDueDate.value,
              inputPriority.value,
              inputProject.value
            )
          );
          clearContent(content);
          loadAllToDo();
        }
      });
      toDoItem.append(toDoForm);
      toDoForm.append(
        titleLabel,
        inputTitle,
        descLabel,
        inputDesc,
        dueDateLabel,
        inputDueDate,
        priorityLabel,
        inputPriority,
        projectLabel,
        inputProject,
        submitButton
      );
    });
  };

  return { init, addNewToDo };
})();

export { loadUI };
