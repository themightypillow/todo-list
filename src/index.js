import Task from "./Task";

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

console.log(task1.toString());
task2.toggleDone();
task2.editTitle("Edited Task");
task2.editDesc("Edited the description of this task");
console.log(task2.toString());
task3.togglePrio();
task3.editDue(new Date(1990, 11, 25));
console.log(task3.toString());