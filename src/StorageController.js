const toDoStorage = (() => {
  const toDoArray = [
    {
      title: "Test To Do",
      description: "Description of ToDo",
      dueDate: "12/21/2021",
      priority: "Low",
      checked: false,
      project: "",
    },
    {
      title: "Another To Do",
      description: "Lets do Something",
      dueDate: "12/08/2021",
      priority: "High",
      checked: true,
      project: "",
    },
    {
      title: "Another To Do",
      description: "Lets do Something",
      dueDate: "12/08/2021",
      priority: "High",
      checked: true,
      project: "",
    },
  ];

  const output = () => {
    console.log(toDoArray);
  };

  const get = () => {
    return toDoArray;
  };

  const add = (arrayitem) => {
    toDoArray.push(arrayitem);
  };

  const remove = (arrayitem) => {
    toDoArray.splice(arrayitem, 1);
  };
  return { get, add, output, remove };
})();

const projectStorage = (() => {
  const projectStorageArray = [
    { title: "All To-Do's" },
    { title: "Today" },
    { title: "This Week" },
  ];

  const console = () => {
    console.log(toDoArray);
  };

  const get = () => {
    return projectStorageArray;
  };

  const add = (arrayitem) => {
    projectStorageArray.push(arrayitem);
  };

  return { get, add };
})();

export { toDoStorage, projectStorage };
