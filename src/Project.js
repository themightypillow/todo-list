import Task from "./Task";

const Project = (name, id) => {
  const tasks = [];

  const setName = (newName) => name = newName;
  const getName = () => name;

  const store = () => {
    localStorage.setItem(`project-${id}`, JSON.stringify({
      name,
      tasks: all()
    }));
  };
  const add = (title, desc, due, prio) => {
    const index = tasks.length;
    tasks.push(Task(tasks.length, title, desc, due, prio));
    return index;
  };
  const remove = (task) => tasks.splice(task.getId(), 1);

  const all = () => tasks.map(task => task.toObject());

  return {
    setName,
    getName,
    store,
    add,
    remove,
    all
  };
};

export default Project;