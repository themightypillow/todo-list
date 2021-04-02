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

  const at = (index) => tasks[index];

  const add = (title, desc, due, prio, done) => {
    return tasks.push(Task(title, desc, due, prio, done)) - 1;
  };

  const remove = (index) => tasks.splice(index, 1);

  const all = () => tasks.map(task => task.info());

  return {
    setName,
    getName,
    setId,
    store,
    at,
    add,
    remove,
    all
  };
};

export default Project;