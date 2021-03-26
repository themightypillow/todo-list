import listSVG from "./svg";

const projectDOM = () => {
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
    newProject.appendChild(listSVG.cloneNode(true));
    const h4 = document.createElement("h4");
    h4.textContent = nameLabel.value === "" ? "Untitled" : nameLabel.value;
    newProject.appendChild(h4);
    projects.appendChild(newProject);

    form.style.display = "none";
  });

  add.addEventListener("click", e => {
    form.style.display = "block";
  });
};

export default projectDOM;