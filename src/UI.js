import {format} from "date-fns";
import * as svg from "./svg";
import todo from "./todo";

const UI = (() => {

  const clearChildren = (node) => {
    while(node.firstChild) node.removeChild(node.firstChild);
  };

  const getSidebar = (index) => {
    return document.querySelector(`.project[data-index="${index}"]`);
  };

  const isGroup = () => {
    return Number.isNaN(Number(document.querySelector("main").dataset.type));
  };

  const refreshGroup = () => {
    initMainDisplay(
      false, 
      document.querySelector("main").dataset.type, 
      document.querySelector(".main-header > h2").textContent
    );
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

  const initTaskForm = (isEdit, projectIndex, index) => {
    const {form, cancel} = tFormElements();
    form.querySelector("h3").textContent = isEdit ? "Edit Task" : "New Task";
    cancel.disabled = false;
    const ok = document.createElement("button");
    ok.textContent = "Ok";
    form.querySelector("#task-form-buttons").appendChild(ok);
    if(isEdit) {
      const trash = svg.trash.cloneNode(true);
      trash.addEventListener("click", e => {
        deleteTask(projectIndex, index);
        clearTaskForm();
      });
      document.querySelector("#task-form-header").appendChild(trash);
    }
    return ok;
  };

  const deleteTask = (projectIndex, index) => {
    clearChildren(document.querySelector("#task-info"));
    delete document.querySelector("#task-info").dataset.index;
    delete document.querySelector("#task-info").dataset.projectIndex;
    todo.at(projectIndex).remove(index);
    todo.at(projectIndex).store();
    if(isGroup()) refreshGroup();
    else initMainDisplay(true, projectIndex, todo.at(projectIndex).getName());
  };

  const editTask = (data) => {
    const {form, title, desc, due, prio} = tFormElements();
    const projectIndex = (() => {
      if(isGroup()) return data.projectIndex;
      return document.querySelector("main").dataset.type;
    })();
    const ok = initTaskForm(true, projectIndex, data.index);

    title.value = data.title;
    desc.value = data.desc;
    due.value = format(data.due, 'yyyy-MM-dd');
    prio.checked = data.prio;

    ok.addEventListener("click", e => {
      e.preventDefault();

      const task = todo.at(projectIndex).at(data.index);
      task.setTitle(title.value);
      task.setDesc(desc.value);
      task.setDue(due.value ? new Date(due.value.replaceAll("-", "/")) : new Date());  
      task.setPrio(prio.checked);
      todo.at(projectIndex).store();

      if(isGroup()) {
        refreshGroup();
        displayTask({
          index: data.index,
          projectIndex,
          ...task.info()
        });
      }
      else {
        initMainDisplay(true, projectIndex, todo.at(projectIndex).getName());
        displayTask({
          index: data.index,
          ...task.info()
        });
      }
      clearTaskForm();
    });

    form.style.display = "block";
  };

  const toggleTask = (index, projectIndex = document.querySelector("main").dataset.type) => {
    todo.at(projectIndex).at(index).toggleDone();
    todo.at(projectIndex).store();
    const currentIndex = Number(document.querySelector("#task-info").dataset.index);
    if(isGroup()) {
      const currentProjectIndex = Number(
        document.querySelector("#task-info").dataset.projectIndex
      );
      refreshGroup();
      if(Number.isInteger(currentIndex) && Number.isInteger(currentProjectIndex)) {
        displayTask({
          index: currentIndex,
          projectIndex: currentProjectIndex,
          ...todo.at(currentProjectIndex).at(currentIndex).info()
        });
      }
    }
    else {
      initMainDisplay(true, projectIndex, todo.at(projectIndex).getName());
      if(Number.isInteger(currentIndex)) {
        displayTask({
          index: currentIndex,
          ...todo.at(projectIndex).at(currentIndex).info()
        });
      }
    } 
  };

  const displayTask = (data) => {
    const info = document.querySelector("#task-info");
    clearChildren(info);
    info.dataset.index = data.index;
    if(isGroup()) info.dataset.projectIndex = data.projectIndex;

    const status = svg.circle(data.done, data.prio);
    status.addEventListener("click", e => {
      toggleTask(data.index, data.projectIndex);
    });

    const edit = svg.edit.cloneNode(true);
    edit.addEventListener("click", e => {
      editTask(data);
    });

    const icons = document.createElement("div");
    icons.appendChild(status);
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
    task.classList.add("icon-label", "task");

    const status = svg.circle(data.done, data.prio);
    status.addEventListener("click", () => {
      toggleTask(data.index, data.projectIndex);
    });
    task.appendChild(status);

    const label = document.createElement("label");
    label.textContent = data.title;
    if(data.done) label.classList.add("done");
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
        
        const id = project.add(title.value, desc.value, date, prio.checked, false);
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

  const boldActiveGroup = (isProject, groupType) => {
    document.querySelectorAll("#default-groups h4").forEach(
      label => label.classList.remove("bold")
    );
    document.querySelectorAll(".project > h4").forEach(
      label => label.classList.remove("bold")
    );
    if(isProject) {
      getSidebar(groupType).querySelector("h4").classList.add("bold");
    }
    else {
      document.querySelector(`#${groupType} > h4`).classList.add("bold");
    }
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

  const initProjectForm = (isEdit, index) => {
    const {form, cancel} = pFormElements();
    form.querySelector("h3").textContent = isEdit ? "Edit Project" : "New Project";
    cancel.disabled = false;
    const ok = document.createElement("button");
    ok.textContent = "Ok";
    form.querySelector("#project-form-buttons").appendChild(ok);
    if(isEdit) {
      const trash = svg.trash.cloneNode(true);
      trash.addEventListener("click", e => {
        deleteProject(index);
        clearProjectForm();
      });
      document.querySelector("#project-form-header").appendChild(trash);
    }
    return ok;
  };

  const deleteProject = (index) => {
    const toDelete = getSidebar(index).parentElement;
    document.querySelector("#projects").removeChild(toDelete);
    todo.remove(index);
    document.querySelectorAll(".project").forEach((sidebar, i) => {
      sidebar.dataset.index = i;
    });

    const main = document.querySelector("main");
    if(main.dataset.type == index) {
      clearChildren(main);
      if(todo.at(index)) initMainDisplay(true, index, todo.at(index).getName());
    }
  };

  const editProject = (index) => {
    const {container, name} = pFormElements();
    const ok = initProjectForm(true, index);
    
    const sidebar = getSidebar(index).querySelector("h4");
    name.value = sidebar.textContent;

    ok.addEventListener("click", e => {
      e.preventDefault();
      sidebar.textContent = name.value;
      if(sidebar.classList.contains("bold")) {
        document.querySelector("main h2").textContent = name.value;
      }

      const project = todo.at(index);
      project.setName(name.value);
      project.store();

      clearProjectForm();
    });
    container.style.display = "block";
  };

  const displayProject = (index, header) => {
    const edit = svg.edit.cloneNode(true);
    edit.addEventListener("click", e => {
      editProject(index);
    });
    header.appendChild(edit);
    todo.at(index).all().forEach((task, id) => listTask({
      index: id,
      ...task
    }));
  };

  const displayGroup = (group) => {
    switch(group) {
      case "today":
        todo.today().forEach(listTask);
        break;
      case "week":
        todo.nextWeek().forEach(listTask);
        break;
      default:
        todo.important().forEach(listTask);
    }
  };

  const initMainDisplay = (isProject, groupType, heading) => {
    boldActiveGroup(isProject, groupType);
    const main = document.querySelector("main");
    main.dataset.type = groupType;
    clearChildren(main);
    clearChildren(document.querySelector("#task-info"));
    delete document.querySelector("#task-info").dataset.index;
    delete document.querySelector("#task-info").dataset.projectIndex;

    const header = document.createElement("div");
    header.classList.add("main-header");
    const title = document.createElement("h2");
    title.textContent = heading;
    header.appendChild(title);
    main.appendChild(header);

    if(isProject) displayProject(groupType, header);
    else displayGroup(groupType);

    if(isProject) {
      const add = document.createElement("div");
      add.classList.add("icon-label", "add");
      add.appendChild(svg.add);
      const addText = document.createElement("div");
      addText.textContent = "Add Task";
      add.appendChild(addText);
      add.addEventListener("click", e => addTask(groupType));
      document.querySelector("main").appendChild(add);
    }
  };

  const addToSidebar = (name, index) => {
    const projects = document.querySelector("#projects");
    const newProject = document.createElement("div");
    newProject.classList.add("icon-label", "project");
    newProject.appendChild(svg.list.cloneNode(true));
    const h4 = document.createElement("h4");
    h4.textContent = name;
    newProject.appendChild(h4);
    newProject.addEventListener("click", e => initMainDisplay(true, index, name));
    newProject.dataset.index = index;

    const container = document.createElement("div");
    container.classList.add("project-sidebar");
    container.appendChild(newProject);
    const edit = svg.edit.cloneNode(true);
    edit.classList.add("edit");
    edit.style.display = "none";
    container.appendChild(edit);

    edit.addEventListener("click", e => {
      editProject(index);
    });

    container.addEventListener("mouseover", e => {
      e.currentTarget.querySelector(".edit").style.display = "block";
    });
    container.addEventListener("mouseout", e => {
      e.currentTarget.querySelector(".edit").style.display = "none";
    });

    projects.appendChild(container);
  };

  // load existing projects from storage and display first
  (function() {
    todo.load();
    todo.names().forEach((name, index) => addToSidebar(name, index));
    if(todo.at(0)) initMainDisplay(true, 0, todo.at(0).getName());
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
        addToSidebar(projectName, index);
        initMainDisplay(true, index, projectName);
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

  // display tasks due today when selected
  (function() {
    document.querySelector("#today").addEventListener("click", e => {
      initMainDisplay(false, "today", "Today");
    });
  })();

  // display tasks due within a week when selected
  (function() {
    document.querySelector("#week").addEventListener("click", e => {
      initMainDisplay(false, "week", "Next 7 Days");
    });
  })();

  // display tasks that are marked as important
  (function() {
    document.querySelector("#important").addEventListener("click", e => {
      initMainDisplay(false, "important", "Important");
    });
  })();

})();
