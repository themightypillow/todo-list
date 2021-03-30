import * as svg from "./svg";
import todo from "./todo";

const UI = (() => {

  const clearChildren = (node) => {
    while(node.firstChild) node.removeChild(node.firstChild);
  }

  const displayTask = (data) => {
    const info = document.querySelector("#task-info");
    clearChildren(info);

    const icons = document.createElement("div");
    icons.appendChild(svg.circle.cloneNode(true));
    icons.appendChild(svg.edit.cloneNode(true));
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

    // display task on right when clicked
    const main = document.querySelector("main");
    label.addEventListener("click", e => displayTask(data));

    const add = document.querySelector("main > .add");
    main.insertBefore(task, add);
  }

  const boldActiveProject = (active) => {
    document.querySelectorAll(".project > h4").forEach(
        label => label.classList.remove("bold"));
    active.classList.add("bold");
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
    header.appendChild(svg.edit.cloneNode(true));
    header.id = "project-header";
    main.appendChild(header);

    todo.at(node.dataset.index).all().forEach((task, index) => listTask({
      index,
      ...task
    }));

    const addTask = document.createElement("div");
    addTask.classList.add("icon-label", "add");
    addTask.appendChild(svg.add);
    const addTaskText = document.createElement("div");
    addTaskText.textContent = "Add Task";
    addTask.appendChild(addTaskText);
    addTask.addEventListener("click", e => {
      const form = document.querySelector("#task-form");
      form.dataset.index = node.dataset.index;
      form.style.display = "block";
    });
    main.appendChild(addTask);
  };

  const editProject = (node) => {
    const form = document.querySelector("#project-form > form");
    const header = document.createElement("div");
    const h3 = document.createElement("h3");
    const name = document.querySelector("#new-project-name");

    h3.textContent = "Edit Project";
    header.appendChild(h3);
    header.appendChild(svg.trash);
    form.insertBefore(header, name);

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    const submit = document.createElement("button");
    submit.textContent = "Ok";
    const buttons = document.createElement("div");
    buttons.appendChild(cancel);
    buttons.appendChild(submit);
    form.appendChild(buttons);

    cancel.addEventListener("click", e => {
      e.preventDefault();
      container.style.display = "none";
      name.value = "";
      form.removeChild(header);
      form.removeChild(buttons);
    });

    submit.addEventListener("click", e => {
      e.preventDefault();
      container.style.display = "none";
      name.value = "";
      form.removeChild(header);
      form.removeChild(buttons);
    });

    const container = document.querySelector("#project-form");
    container.style.display = "block";
  }

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
      editProject(e.currentTarget);
    });

    container.addEventListener("mouseover", e => {
      e.currentTarget.querySelector(".edit").style.display = "block";
    });
    container.addEventListener("mouseout", e => {
      e.currentTarget.querySelector(".edit").style.display = "none";
    });

    projects.appendChild(container);
    return newProject;
  }

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
    const form = document.querySelector("#project-form > form");
    const nameLabel = document.querySelector("#new-project-name");
    const container = form.parentElement;
    const header = document.createElement("h3");
    header.textContent = "New Project";

    const buttons = document.createElement("div");
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    const submit = document.createElement("button");
    submit.textContent = "Ok";
    buttons.appendChild(cancel);
    buttons.appendChild(submit);

    cancel.addEventListener("click", e => {
      e.preventDefault();
      nameLabel.value = "";
      container.style.display = "none";
      form.removeChild(header);
      form.removeChild(buttons);
    });

    submit.addEventListener("click", e => {
      e.preventDefault();
      container.style.display = "none";
      form.removeChild(header);
      form.removeChild(buttons);
      const projectName = nameLabel.value === "" ? "Untitled" : nameLabel.value;
      nameLabel.value = "";
      const index = todo.add(projectName);
      todo.update();
      todo.store(index);
      displayProject(addToSidebar(projectName, index));
    });

    const add = document.querySelector("#add-project");
    add.addEventListener("click", e => {
      form.insertBefore(header, nameLabel);
      form.appendChild(buttons);
      container.style.display = "block";
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
      if(title.value) {
        const date = new Date(
          due.value ? new Date(due.value.replaceAll("-", "/")) : new Date()
        );
        const project = todo.at(form.dataset.index);
        const index = project.add(title.value, desc.value, date, prio.checked);
        project.store();
        listTask({
          index, 
          title: title.value, 
          desc: desc.value, 
          due: date, 
          prio: prio.checked
        });
      }
      clearForm();
    });
  })();
})();
