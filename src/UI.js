import {listSVG, addSVG} from "./svg";
import todo from "./todo";

const UI = (() => {

  const boldActiveProject = (active) => {
    document.querySelectorAll(".group > h4").forEach(
        label => label.classList.remove("bold"));
    active.classList.add("bold");
  };

  const displayProject = (node) => {
    boldActiveProject(node.querySelector("h4"));
    const main = document.querySelector("main");
    while(main.firstChild) main.removeChild(main.firstChild);
    const title = document.createElement("h2");
    title.textContent = node.textContent;
    main.appendChild(title);

    const addTask = document.createElement("div");
    addTask.classList.add("icon-label", "add");
    addTask.appendChild(addSVG);
    const addTaskText = document.createElement("div");
    addTaskText.textContent = "Add Task";
    addTask.appendChild(addTaskText);
    main.appendChild(addTask);

    // if(e.currentTarget.id) console.log(todo.getById(e.currentTarget.id).getName());
  };

  const addToSidebar = (name, id) => {
    const projects = document.querySelector("#projects");
    const newProject = document.createElement("div");
    newProject.classList.add("icon-label", "group");
    newProject.appendChild(listSVG.cloneNode(true));
    const h4 = document.createElement("h4");
    h4.textContent = name;
    newProject.appendChild(h4);
    newProject.addEventListener("click", e => displayProject(e.currentTarget));
    newProject.id = id;
    projects.appendChild(newProject);
    return newProject;
  }

  // load any existing projects from storage
  (function() {
    todo.load();
    Object.entries(todo.getProjects()).forEach(pair => addToSidebar(pair[1], pair[0]));
  })();

  // display project groups on click
  (function() {
    const groups = document.querySelectorAll(".group");
    groups.forEach(group => {
      group.addEventListener("click", e => displayProject(e.currentTarget));
    });
  })();

  // set up adding new project
  (function() {
    const add = document.querySelector("#add-project");
    const form = document.querySelector("#project-form");
    add.addEventListener("click", e => {
      form.style.display = "block";
    });

    const nameLabel = document.querySelector("#new-project-name");
    const cancel = document.querySelector("#cancel-project");
    const submit = document.querySelector("#submit-project");

    nameLabel.addEventListener("keypress", e => {
      if(e.keyCode === 13) e.preventDefault();
    });

    cancel.addEventListener("click", e => {
      e.preventDefault();
      nameLabel.value = "";
      form.style.display = "none";
    });

    submit.addEventListener("click", e => {
      e.preventDefault();
      form.style.display = "none";
      const projectName = nameLabel.value === "" ? "Untitled" : nameLabel.value;
      todo.add(projectName);
      nameLabel.value = "";
      displayProject(addToSidebar(projectName));
    });
  })();

})();
