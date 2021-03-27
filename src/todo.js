import Project from "./Project";

const todo = (() => {
  const projects = [];

  const add = (name) => {
    projects.push(Project(name));
    localStorage.setItem("projects", JSON.stringify(
        projects.map(project => project.getName())));
  };

  return {
    add
  };
})();

export default todo;