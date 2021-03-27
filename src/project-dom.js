import listSVG from "./svg";

const callback = (e) => {
  const main = document.querySelector("main");
  while(main.firstChild) main.removeChild(main.firstChild);
  const title = document.createElement("h2");
  title.textContent = e.target.textContent;
  main.appendChild(title);
};

const add = () => {
  const nameLabel = document.querySelector("#new-project-name");
  const cancel = document.querySelector("#cancel-project");
  const form = document.querySelector("#project-form");
  const submit = document.querySelector("#submit-project");
  const add = document.querySelector("#add-project");
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
    newProject.classList.add("icon-label");
    newProject.classList.add("group");
    newProject.appendChild(listSVG.cloneNode(true));
    const h4 = document.createElement("h4");
    h4.textContent = nameLabel.value === "" ? "Untitled" : nameLabel.value;
    newProject.appendChild(h4);
    newProject.addEventListener("click", callback);
    projects.appendChild(newProject);
    form.style.display = "none";
  });

  add.addEventListener("click", e => {
    form.style.display = "block";
  });
};

const display = () => {
  const groups = document.querySelectorAll(".group");
  groups.forEach(group => {
    group.addEventListener("click", callback);
  });
};

const main = () => {
  add();
  display();
};

export default main;