import Task from "./Task";
import Project from "./Project";

const task1 = Task(
  "First Task", 
  "This is the description of the first task",
  new Date(),
  false
);

const task2 = Task(
  "Second Task",
  "This is the description of the second task",
  new Date(2021, 5, 4),
  true
);

const task3 = Task(
  "Third Task",
  "This is a task that doesn't set the priority",
  new Date(2021, 5, 17)
);

const project1 = Project("The First Project");
project1.addTask(task1);
project1.addTask(task2);
project1.print();

const project2 = Project();
project2.addTask(task3);
project2.print();

project2.editName("The Second Project");
project2.print();

project1.deleteTask(task1);
project1.print();

project2.deleteTask(task3);
project2.print();