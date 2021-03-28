const Task = (id, title, desc, dueDate, prio) => {
  let isDone = false;

  const getId = () => id;
  const toggleDone = () => isDone = !isDone;
  const togglePrio = () => prio = !prio;
  const setTitle = (newTitle) => title = newTitle;
  const setDesc = (newDesc) => desc = newDesc;
  const setDue = (newDue) => dueDate = newDue;
  const toObject = () => {
    return {
      title,
      desc,
      dueDate,
      prio
    }
  };
                                
  return {
    getId,
    toggleDone,
    togglePrio,
    setTitle,
    setDesc,
    setDue,
    toObject
  };

};

export default Task;