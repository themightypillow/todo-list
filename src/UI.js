import {listSVG, addSVG} from "./svg";
import todo from "./todo";

const UI = (() => {

  const displayProject = (e) => {
    const main = document.querySelector("main");
    while(main.firstChild) main.removeChild(main.firstChild);
    const title = document.createElement("h2");
    title.textContent = e.currentTarget.textContent;
    main.appendChild(title);

    const addTask = document.createElement("div");
    addTask.classList.add("icon-label", "add");
    addTask.appendChild(addSVG);
    const addTaskText = document.createElement("div");
    addTaskText.textContent = "Add Task";
    addTask.appendChild(addTaskText);
    main.appendChild(addTask);
  }

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
    const projects = document.querySelector("#projects");

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
      const newProject = document.createElement("div");
      newProject.classList.add("icon-label", "group");
      newProject.appendChild(listSVG.cloneNode(true));
      const projectName = nameLabel.value === "" ? "Untitled" : nameLabel.value;
      const h4 = document.createElement("h4");
      h4.textContent = projectName;
      newProject.appendChild(h4);
      newProject.addEventListener("click", displayProject);
      console.log("what");
      projects.appendChild(newProject);
      // todo.add(projectName);
      form.style.display = "none";
      nameLabel.value = "";
    });

  })();

  // display existing project groups on click
  (function() {
    const groups = document.querySelectorAll(".group");
    groups.forEach(group => {
      group.addEventListener("click", displayProject);
    });
  })();

})();
