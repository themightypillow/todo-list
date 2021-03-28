const Task = (id, title, desc, dueDate, prio) => {
  let isDone = false;

  const getId = () => id;
  const toggleDone = () => isDone = !isDone;
  const togglePrio = () => prio = !prio;
  const editTitle = (newTitle) => title = newTitle;
  const editDesc = (newDesc) => desc = newDesc;
  const editDue = (newDue) => dueDate = newDue;
  const toObject = () => {
    title,
    desc,
    dueDate,
    prio
  };
                                
  return {
    getId,
    toggleDone,
    togglePrio,
    editTitle,
    editDesc,
    editDue,
    toObject
  };

};

export default Task;