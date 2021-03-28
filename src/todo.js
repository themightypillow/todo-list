import Project from "./Project";

const todo = (() => {
  let projects = [];

  const init = () => {
    store(add("My Tasks"));
    update();
  };

  const update = () => {
    localStorage.setItem("project-total", projects.length);
  };

  const load = () => {
    if(localStorage.length === 0) {
      init();
    }
    else if(localStorage.getItem("project-total")) {
      const total = Number(localStorage.getItem("project-total"));
      if(Number.isInteger(total)) {
        for(let i = 0; i < total; i++) {
          if(!localStorage.getItem(`project-${i}`)) {
            localStorage.clear();
            projects = [];
            init();
            break;
          }
          const data = JSON.parse(localStorage.getItem(`project-${i}`));
          const index = add(data.name);
          data.tasks.forEach(task => {
            projects[index].add(task.title, task.desc, new Date(task.dueDate), task.prio);
          });
        }
      }
      else {
        localStorage.clear();
        init();
      }
    }
  };

  const add = (name) => {
    const index = projects.length;
    const project = Project(name, index);
    projects.push(project);
    return index;
  };

  const store = (index) => projects[index].store();

  const at = (index) => projects[index];

  const names = () => projects.map(project => project.getName());

  return {
    update,
    load,
    add,
    store,
    at,
    names
  };
})();

export default todo;