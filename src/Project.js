import Task from "./Task";
import {isToday} from "date-fns";

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

  const today = () => {
    return tasks.reduce((arr, task, index) => {
      if(isToday(task.info().due)) {
        arr.push({
          projectIndex: id,
          index: index,
          ...task.info()
        });
      }
      return arr;
    }, []);
  }

  return {
    setName,
    getName,
    setId,
    store,
    at,
    add,
    remove,
    all,
    today
  };
};

export default Project;