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
    addTask.addEventListener("click", e => {
      const form = document.querySelector("#task-form")
      form.style.display = "block";
    });
    main.appendChild(addTask);
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

  // load existing projects from storage and display first
  (function() {
    todo.load();
    Object.entries(todo.getProjects()).forEach(pair => addToSidebar(pair[1], pair[0]));
    displayProject(document.querySelector("#projects > div"));
  })();

  // display project groups on click
  (function() {
    const groups = document.querySelectorAll(".group");
    groups.forEach(group => {
      group.addEventListener("click", e => displayProject(e.currentTarget));
    });
  })();

  // disable enter key behavior in text inputs
  (function() {
    document.querySelectorAll("form > input[type='text']").forEach(input => {
      input.addEventListener("keypress", e => {
        if(e.key === "Enter") e.preventDefault();
      });
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
    cancel.addEventListener("click", e => {
      e.preventDefault();
      nameLabel.value = "";
      form.style.display = "none";
    });

    const submit = document.querySelector("#submit-project");
    submit.addEventListener("click", e => {
      e.preventDefault();
      form.style.display = "none";
      const projectName = nameLabel.value === "" ? "Untitled" : nameLabel.value;
      todo.add(projectName);
      nameLabel.value = "";
      displayProject(addToSidebar(projectName));
    });
  })();

  // set up adding new task
  (function() {
    const form = document.querySelector("#task-form");
    const title = document.querySelector("#new-task-title");
    const desc = document.querySelector("#new-task-desc");
    const due = document.querySelector("#new-task-due");
    const prio = document.querySelector("#new-task-prio");

    const clearForm = () => {
      title.value = "";
      desc.value = "";
      due.value = "";
      prio.checked = false;
      form.style.display = "none";
    };

    const cancel = document.querySelector("#cancel-task");
    cancel.addEventListener("click", e => {
      e.preventDefault();
      clearForm();
    });

    const add = document.querySelector("#submit-task");
    add.addEventListener("click", e => {
      e.preventDefault();
      clearForm();
    });
  })();
})();
