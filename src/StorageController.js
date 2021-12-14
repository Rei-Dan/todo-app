const toDoStorage = (() => {
  const toDoArray = [
    {
      title: "Test To Do",
      description: "Description of ToDo",
      dueDate: "21/12/2021",
      priority: "Low",
      checked: false,
      project: "Test",
    },
    {
      title: "Another To Do",
      description: "Lets do Something",
      dueDate: "09/12/2021",
      priority: "High",
      checked: true,
      project: "Test2",
    },
    {
      title: "Another To Do",
      description: "Lets do Something",
      dueDate: "08/01/2022",
      priority: "High",
      checked: true,
      project: "",
    },
    {
      title: "Test To Do",
      description: "Description of ToDo",
      dueDate: "12/12/2021",
      priority: "Low",
      checked: false,
      project: "Test",
    },
    {
      title: "Another To Do",
      description: "Lets do Something",
      dueDate: "20/12/2021",
      priority: "High",
      checked: true,
      project: "",
    },
    {
      title: "Another To Do",
      description: "Lets do Something",
      dueDate: "19/12/2022",
      priority: "High",
      checked: true,
      project: "Test2",
    },
  ];

  const get = () => {
    return toDoArray;
  };

  const add = (arrayitem) => {
    toDoArray.push(arrayitem);
  };

  const remove = (arrayitem) => {
    toDoArray.splice(arrayitem, 1);
  };
  return { get, add, remove };
})();

const projectStorage = (() => {
  const projectStorageArray = [
    { title: "All To-Do's" },
    { title: "Today" },
    { title: "This Week" },
    { title: "Test" },
    { title: "Test2" },
  ];

  const get = () => {
    return projectStorageArray;
  };

  const add = (arrayitem) => {
    projectStorageArray.push(arrayitem);
  };

  return { get, add };
})();

export { toDoStorage, projectStorage };
