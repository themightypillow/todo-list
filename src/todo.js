import Project from "./Project";

const todo = (() => {
  const projects = [];

  const store = () => {
    localStorage.setItem("project-total", projects.length);
  };

  const load = () => {
    if(localStorage.length === 0) {
      add("My Tasks");
      store();
    }
    else if(localStorage.getItem("project-total")) {
      const total = Number(localStorage.getItem("project-total"));
      if(Number.isInteger(total)) {
        for(let i = 0; i < total; i++) {
          const data = JSON.parse(localStorage.getItem(`project-${i}`));
          add(data.name);
        }
      }
      else {
        localStorage.clear();
        add("My Tasks");
        store();
      }
    }
  };

  const add = (name) => {
    const index = projects.length;
    const project = Project(name, index);
    project.store();
    projects.push(project);
    return index;
  };

  const getProjects = () => projects.map(project => project.getName());

  return {
    store,
    load,
    add,
    getProjects
  };
})();

export default todo;