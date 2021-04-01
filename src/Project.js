import Task from "./Task";

const Project = (name, id) => {
  const tasks = [];

  const setName = (newName) => name = newName;
  const getName = () => name;

  const setId = (newId) => id = newId;

  const store = () => {
    localStorage.setItem(`project-${id}`, JSON.stringify({
      name,
      tasks: all()
    }));
  };
  const add = (title, desc, due, prio) => {
    return tasks.push(Task(title, desc, due, prio)) - 1;
  };
  const remove = (task) => tasks.splice(task.getId(), 1);

  const all = () => tasks.map(task => task.info());

  return {
    setName,
    getName,
    setId,
    store,
    add,
    remove,
    all
  };
};

export default Project;