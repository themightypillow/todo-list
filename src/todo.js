import Project from "./Project";

const todo = (() => {
  const projects = {};

  const load = () => {
    if(localStorage.length === 0) {
      add("My Tasks");
    }
    else if(localStorage.getItem("projects")) {
      try {
        Object.values(JSON.parse(localStorage.getItem("projects"))).forEach(name => {
          add(name);
        });
      }
      catch(e) {
        localStorage.clear();
        add("My Tasks");
      }
    }
  };

  const add = (name) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    projects[id] = Project(name);
    localStorage.setItem("projects", JSON.stringify(Object.values(getProjects())));
  };

  const getProjects = () =>  {
    return Object.keys(projects).reduce((obj, id) => {
      obj[id] = projects[id].getName();
      return obj;
    }, {});
  };

  const getById = (id) => projects[id];

  return {
    load,
    add,
    getProjects,
    getById
  };
})();

export default todo;