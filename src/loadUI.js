const loadUI = (() => {
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
    addToDo();
  };

  const addToDo = () => {
    const content = document.querySelector(".content");
    const toDoItem = document.createElement("div");
    toDoItem.classList.add("to-do-item");
    content.appendChild(toDoItem);
  };

  return { init, addToDo };
})();

export { loadUI };
