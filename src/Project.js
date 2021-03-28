import Task from "./Task";

const Project = (name, id) => {
  const tasks = [];

  const setName = (newName) => name = newName;
  const getName = () => name;

  const store = () => {
    localStorage.setItem(`project-${id}`, JSON.stringify({
      name,
      tasks: tasks.map(task => task.toObject())
    }));
  };
  const add = (title, desc, due, prio) => {
    const index = tasks.length;
    tasks.push(Task(tasks.length, title, desc, due, prio));
    store();
    return index;
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