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
    return tasks.push(Task(title, desc, due, prio)) - 1;
  };
  const remove = (task) => tasks.splice(task.getId(), 1);

  const all = () => tasks.map(task => task.info());

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