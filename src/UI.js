import * as svg from "./svg";
import todo from "./todo";

const UI = (() => {

  const clearChildren = (node) => {
    while(node.firstChild) node.removeChild(node.firstChild);
  };

  const tFormElements = () => {
    return {
      form: document.querySelector("#task-form"),
      title: document.querySelector("#new-task-title"),
      desc: document.querySelector("#new-task-desc"),
      due: document.querySelector("#new-task-due"),
      prio: document.querySelector("#new-task-prio"),
      cancel: document.querySelector("#cancel-task")
    }
  };

  const clearTaskForm = (edit) => {
    if(edit) clearChildren(document.querySelector("#task-info"));

    const {form, title, desc, due, prio, cancel} = tFormElements();
    form.style.display = "none";
    title.value = "";
    desc.value = "";
    due.value = "";
    prio.checked = false;
    cancel.disabled = true;
    form.querySelector("h3").textContent = "";
    if(document.querySelector("#cancel-task + button")) {
      form.querySelector("#task-buttons").removeChild(
        document.querySelector("#cancel-task + button"));
    }
  };

  const editTask = () => {
    console.log("will edit");
  };

  const displayTask = (data) => {
    const info = document.querySelector("#task-info");
    clearChildren(info);

    const icons = document.createElement("div");
    icons.appendChild(svg.circle.cloneNode(true));

    const edit = svg.edit.cloneNode(true);
    edit.addEventListener("click", e => {
      editTask();
    });

    icons.appendChild(edit);
    info.appendChild(icons);

    const title = document.createElement("h3");
    title.textContent = data.title;
    info.appendChild(title);

    const desc = document.createElement("div");
    desc.textContent = data.desc;
    info.appendChild(desc);

    const due = document.createElement("div");
    due.classList.add("icon-label");
    due.appendChild(svg.calendar);
    const date = document.createElement("div");
    date.textContent = data.due.toDateString().replace(" ", ", ");
    due.appendChild(date);
    info.appendChild(due);
  };

  const listTask = (data) => {
    const task = document.createElement("div");
    task.classList.add("icon-label");
    const label = document.createElement("label");
    label.textContent = data.title;
    task.appendChild(svg.circle.cloneNode(true));
    task.appendChild(label);

    const main = document.querySelector("main");
    label.addEventListener("click", e => displayTask(data));

    const add = document.querySelector("main > .add");
    main.insertBefore(task, add);
  };

  const addTask = (index) => {
    const {form, title, desc, due, prio, cancel} = tFormElements();
    form.querySelector("h3").textContent = "New Task";
    cancel.disabled = false;
    const ok = document.createElement("button");
    ok.textContent = "Ok";
    form.querySelector("#task-buttons").appendChild(ok);

    cancel.addEventListener("click", e => {
      e.preventDefault();
      clearTaskForm(false);
    });

    ok.addEventListener("click", e => {
      e.preventDefault();
      if(title.value) {
        const date = new Date(
          due.value ? new Date(due.value.replaceAll("-", "/")) : new Date()
        );
        const project = todo.at(index);
        
        const id = project.add(title.value, desc.value, date, prio.checked);
        project.store();
        listTask({
          index: id, 
          title: title.value, 
          desc: desc.value, 
          due: date, 
          prio: prio.checked
        });
      }
      clearTaskForm(false);
    });

    form.style.display = "block";
  };

  const boldActiveProject = (active) => {
    document.querySelectorAll(".project > h4").forEach(
        label => label.classList.remove("bold"));
    active.classList.add("bold");
  };

  const pFormElements = () => {
    return {
      container: document.querySelector("#project-form"),
      form: document.querySelector("#project-form > form"),
      name: document.querySelector("#new-project-name"),
      cancel: document.querySelector("#cancel-project")
    }
  };

  const clearProjectForm = () => {
    const {container, form, name, cancel} = pFormElements();
    name.value = "";
    container.style.display = "none";
    form.querySelector("h3").textContent = "";
    cancel.disabled = true;
    if(document.querySelector("#cancel-project + button")) {
      form.querySelector("#project-buttons").removeChild(
        document.querySelector("#cancel-project + button"));
    }
    if(document.querySelector("#project-form-header > svg")) {
      document.querySelector("#project-form-header").removeChild(
        document.querySelector("#project-form-header > svg"));
    }
  };

  const deleteProject = (node) => {
    const main = document.querySelector("main");

    document.querySelector("#projects").removeChild(node.parentElement);
    todo.remove(node.dataset.index);
    document.querySelectorAll(".project").forEach((sidebar, index) => {
      sidebar.dataset.index = index;
    });
    if(main.dataset.index === node.dataset.index) {
      clearChildren(main);
      const next = document.querySelector(
          `.project[data-index="${node.dataset.index}"]`);
      if(next) displayProject(next);
    }
  };

  const editProject = (node) => {
    const {container, form, name, cancel} = pFormElements();
    form.querySelector("h3").textContent = "Edit Project";
    const ok = document.createElement("button");
    ok.textContent = "Ok";
    form.querySelector("#project-buttons").appendChild(ok);
    cancel.disabled = false;

    const trash = svg.trash.cloneNode(true);
    trash.addEventListener("click", e => {
      deleteProject(node);
      clearProjectForm();
    });
    document.querySelector("#project-form-header").appendChild(trash);
    container.style.display = "block";

    const sidebar = node.querySelector("h4");
    name.value = sidebar.textContent;

    ok.addEventListener("click", e => {
      e.preventDefault();
      sidebar.textContent = name.value;
      if(sidebar.classList.contains("bold")) {
        document.querySelector("#project-header > h2").textContent = name.value;
      }

      const project = todo.at(node.dataset.index);
      project.setName(name.value);
      project.store();

      clearProjectForm();
    });
  };

  const displayProject = (node) => {
    boldActiveProject(node.querySelector("h4"));
    const main = document.querySelector("main");
    main.dataset.index = node.dataset.index;
    clearChildren(main);
    clearChildren(document.querySelector("#task-info"));

    const header = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = node.textContent;
    header.appendChild(title);
    const edit = svg.edit.cloneNode(true);
    edit.addEventListener("click", e => {
      const index = document.querySelector("main").dataset.index;
      editProject(document.querySelector(`.project[data-index="${index}"]`));
    });
    header.appendChild(edit);
    header.id = "project-header";
    main.appendChild(header);

    todo.at(node.dataset.index).all().forEach((task, index) => listTask({
      index,
      ...task
    }));

    const add = document.createElement("div");
    add.classList.add("icon-label", "add");
    add.appendChild(svg.add);
    const addText = document.createElement("div");
    addText.textContent = "Add Task";
    add.appendChild(addText);
    add.addEventListener("click", e => addTask(node.dataset.index));
    main.appendChild(add);
  };

  const addToSidebar = (name, index) => {
    const projects = document.querySelector("#projects");
    const newProject = document.createElement("div");
    newProject.classList.add("icon-label", "project");
    newProject.appendChild(svg.list.cloneNode(true));
    const h4 = document.createElement("h4");
    h4.textContent = name;
    newProject.appendChild(h4);
    newProject.addEventListener("click", e => displayProject(e.currentTarget));
    newProject.dataset.index = index;

    const container = document.createElement("div");
    container.classList.add("project-sidebar");
    container.appendChild(newProject);
    const edit = svg.edit.cloneNode(true);
    edit.classList.add("edit");
    edit.style.display = "none";
    container.appendChild(edit);

    edit.addEventListener("click", e => {
      editProject(newProject);
    });

    container.addEventListener("mouseover", e => {
      e.currentTarget.querySelector(".edit").style.display = "block";
    });
    container.addEventListener("mouseout", e => {
      e.currentTarget.querySelector(".edit").style.display = "none";
    });

    projects.appendChild(container);
    return newProject;
  };

  // load existing projects from storage and display first
  (function() {
    todo.load();
    todo.names().forEach((name, index) => addToSidebar(name, index));
    displayProject(document.querySelector(".project"));
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
    const {container, form, name, cancel} = pFormElements();
    const ok = document.createElement("button");
    ok.textContent = "Ok";

    cancel.addEventListener("click", e => {
      e.preventDefault();
      clearProjectForm();
    });

    ok.addEventListener("click", (e) => {
      e.preventDefault();
      const projectName = name.value === "" ? "Untitled" : name.value;
      const index = todo.add(projectName);
      todo.store();
      todo.at(index).store();
      displayProject(addToSidebar(projectName, index));
      clearProjectForm();
    });

    const add = document.querySelector("#add-project");
    add.addEventListener("click", e => {
      form.querySelector("h3").textContent = "New Project";
      cancel.disabled = false;
      form.querySelector("#project-buttons").appendChild(ok);
      container.style.display = "block";
    });
  
  })();

})();
