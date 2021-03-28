const Project = (name, index) => {
  const tasks = [];

  const setName = (newName) => name = newName;
  const getName = () => name;

  const store = () => {
    localStorage.setItem(`project-${index}`, JSON.stringify({
      name,
      tasks: tasks.map(task => task.toObject())
    }));
  };
  const add = (title, desc, due, prio = false) => {
    tasks.push(Task(tasks.length, title, desc, due, prio));
    store();
  };
  const remove = (task) => tasks.splice(task.getId(), 1);

  return {
    setName,
    getName,
    store,
    add,
    remove,
  };
};

export default Project;