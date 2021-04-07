import Project from "./Project";

const todo = (() => {
  let projects = [];

  const init = () => {
    at(add("My Tasks")).store();
    store();
  };

  const store = () => {
    localStorage.setItem("project-total", projects.length);
  };

  const load = () => {
    if(localStorage.length === 0) {
      init();
    }
    else if(localStorage.getItem("project-total")) {
      const total = Number(localStorage.getItem("project-total"));
      if(Number.isInteger(total) && total > 0) {
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
            projects[index].add(
              task.title, task.desc, new Date(task.due), task.prio, task.done
            );
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

  const remove = (index) => {
    localStorage.removeItem(`project-${projects.length - 1}`);
    projects.splice(index, 1);
    store();
    projects.forEach((project, index) => {
      project.setId(index);
      project.store();
    });
  }

  const at = (index) => projects[index];

  const names = () => projects.map(project => project.getName());

  const today = () => {
    return projects.reduce((arr, project) => {
      arr.push(...project.today());
      return arr;
    }, []);
  };

  const nextWeek = () => {
    return projects.reduce((arr, project) => {
      arr.push(...project.nextWeek());
      return arr;
    }, []);
  };

  return {
    store,
    load,
    add,
    remove,
    at,
    names,
    today,
    nextWeek
  };
})();

export default todo;