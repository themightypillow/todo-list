const Project = (name) => {
  let tasks = {};

  const setName = (newName) => name = newName;
  const getName = () => name;
  const addTask = (task) => tasks[task.id] = task;
  const deleteTask = (task) => delete tasks[task.id];

  const print = () => {
    console.log(`Project: ${name}\n`);
    Object.keys(tasks).forEach(id => console.log(tasks[id].toString()));
  };

  return {
    setName,
    getName,
    addTask,
    deleteTask,
    print
  };
};

export default Project;