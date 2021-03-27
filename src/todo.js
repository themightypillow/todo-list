import Project from "./Project";

const todo = (() => {
  const projects = [];

  const load = () => {
    if(localStorage.length === 0) {
      add("My Tasks");
    }
    else if(localStorage.getItem("projects") 
              && Array.isArray(JSON.parse(localStorage.getItem("projects")))) {
      JSON.parse(localStorage.getItem("projects")).forEach(project => add(project));
    };
  };

  const add = (name) => {
    projects.push(Project(name));
    localStorage.setItem("projects", JSON.stringify(
        projects.map(project => project.getName())));
  };

  const getNames = () => projects.map(project => project.getName());

  return {
    load,
    add,
    getNames
  };
})();

export default todo;