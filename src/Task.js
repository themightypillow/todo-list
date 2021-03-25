const Task = (title, desc, dueDate, prio = false) => {
  let isDone = false;

  const toggleDone = () => isDone = !isDone;
  const togglePrio = () => prio = !prio;
  const editTitle = (newTitle) => title = newTitle;
  const editDesc = (newDesc) => desc = newDesc;
  const editDue = (newDue) => dueDate = newDue;

  const toString = () =>  `Title: ${title}` +
                          `\nDescription: ${desc}` +
                          `\nDue: ${dueDate.toLocaleDateString()}` +
                          `\nPriority: ${prio ? "Important" : "Not Important"}` +
                          `\nCompleted: ${isDone ? "Yes" : "No"}`;
                                
  return {
    toggleDone,
    togglePrio,
    editTitle,
    editDesc,
    editDue,
    toString
  };

};

export default Task;