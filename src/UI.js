import {format} from "date-fns";
import * as svg from "./svg";
import todo from "./todo";

const UI = (() => {

  const clearChildren = (node) => {
    while(node.firstChild) node.removeChild(node.firstChild);
  };

  const tFormElements = () => {
    return {
      form: document.querySelector("#task-form"),
      title: document.querySelector("#task-form-title"),
      desc: document.querySelector("#task-form-desc"),
      due: document.querySelector("#task-form-due"),
      prio: document.querySelector("#task-form-prio"),
      cancel: document.querySelector("#task-form-cancel")
    }
  };

  const clearTaskForm = () => {
    const {form, title, desc, due, prio, cancel} = tFormElements();
    form.style.display = "none";
    title.value = "";
    desc.value = "";
    due.value = "";
    prio.checked = false;
    cancel.disabled = true;
    form.querySelector("h3").textContent = "";
    if(document.querySelector("#task-form-cancel + button")) {
      form.querySelector("#task-form-buttons").removeChild(
        document.querySelector("#task-form-cancel + button"));
    }
    if(document.querySelector("#task-form-header > svg")) {
      document.querySelector("#task-form-header").removeChild(
        document.querySelector("#task-form-header > svg"));
    }
  };

  const initTaskForm = (isEdit) => {
    const {form, cancel} = tFormElements();
    form.querySelector("h3").textContent = isEdit ? "Edit Task" : "New Task";
    cancel.disabled = false;
    const ok = document.createElement("button");
    ok.textContent = "Ok";
    form.querySelector("#task-form-buttons").appendChild(ok);
    if(isEdit) {
      const trash = svg.trash.cloneNode(true);
      trash.addEventListener("click", e => {
        // delete task here
        clearTaskForm();
      });
      document.querySelector("#task-form-header").appendChild(trash);
    }
    return ok;
  };

  const editTask = (data) => {
    const {form, title, desc, due, prio} = tFormElements();
    const ok = initTaskForm(true);

    title.value = data.title;
    desc.value = data.desc;
    due.value = format(data.due, 'yyyy-MM-dd');
    prio.checked = data.prio;

    ok.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll("main > .icon-label > label")[data.index].textContent 
          = title.value;
      document.querySelector("#task-title").textContent = title.value;
      document.querySelector("#task-desc").textContent = desc.value;

      const task = todo.at(document.querySelector("main").dataset.index)
                       .at(data.index);
      task.setTitle(title.value);
      task.setDesc(desc.value);
      const newDue = due.value ? new Date(due.value.replaceAll("-", "/")) : new Date();
      document.querySelector("#task-due").textContent 
          = newDue.toDateString().replace(" ", ", ");
      task.setDue(newDue);  
      task.setPrio(prio.checked);

      todo.at(document.querySelector("main").dataset.index).store();

      clearTaskForm();
    });

    form.style.display = "block";
  };

  const displayTask = (data) => {
    const info = document.querySelector("#task-info");
    clearChildren(info);

    const icons = document.createElement("div");
    icons.appendChild(svg.circle.cloneNode(true));

    const edit = svg.edit.cloneNode(true);
    edit.addEventListener("click", e => {
      editTask(data);
    });

    icons.appendChild(edit);
    info.appendChild(icons);

    const title = document.createElement("h3");
    title.textContent = data.title;
    title.id = "task-title";
    info.appendChild(title);

    const desc = document.createElement("div");
    desc.textContent = data.desc;
    desc.id = "task-desc";
    info.appendChild(desc);

    const due = document.createElement("div");
    due.classList.add("icon-label");
    due.appendChild(svg.calendar);
    const date = document.createElement("div");
    date.id = "task-due";
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
    const {form, title, desc, due, prio} = tFormElements();
    const ok = initTaskForm(false);

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
      clearTaskForm();
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
      name: document.querySelector("#project-form-name"),
      cancel: document.querySelector("#project-form-cancel")
    }
  };

  const clearProjectForm = () => {
    const {container, form, name, cancel} = pFormElements();
    name.value = "";
    container.style.display = "none";
    form.querySelector("h3").textContent = "";
    cancel.disabled = true;
    if(document.querySelector("#project-form-cancel + button")) {
      form.querySelector("#project-form-buttons").removeChild(
        document.querySelector("#project-form-cancel + button"));
    }
    if(document.querySelector("#project-form-header > svg")) {
      document.querySelector("#project-form-header").removeChild(
        document.querySelector("#project-form-header > svg"));
    }
  };

  const initProjectForm = (isEdit, node) => {
    const {form, cancel} = pFormElements();
    form.querySelector("h3").textContent = isEdit ? "Edit Project" : "New Project";
    cancel.disabled = false;
    const ok = document.createElement("button");
    ok.textContent = "Ok";
    form.querySelector("#project-form-buttons").appendChild(ok);
    if(isEdit) {
      const trash = svg.trash.cloneNode(true);
      trash.addEventListener("click", e => {
        deleteProject(node);
        clearProjectForm();
      });
      document.querySelector("#project-form-header").appendChild(trash);
    }
    return ok;
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
    const ok = initProjectForm(true, node);
    
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
    container.style.display = "block";
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
    const {container, name, cancel} = pFormElements();

    cancel.addEventListener("click", e => {
      e.preventDefault();
      clearProjectForm();
    });

    const add = document.querySelector("#add-project");
    add.addEventListener("click", e => {
      const ok = initProjectForm(false);
      ok.addEventListener("click", (e) => {
        e.preventDefault();
        const projectName = name.value === "" ? "Untitled" : name.value;
        const index = todo.add(projectName);
        todo.store();
        todo.at(index).store();
        displayProject(addToSidebar(projectName, index));
        clearProjectForm();
      });
      container.style.display = "block";
    });
  })();

  // set up task cancel button
  (function() {
    document.querySelector("#task-form-cancel").addEventListener("click", e => {
      e.preventDefault();
      clearTaskForm();
    });
  })();

})();
