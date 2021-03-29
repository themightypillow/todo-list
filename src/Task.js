const Task = (title, desc, due, prio) => {
  let isDone = false;

  const toggleDone = () => isDone = !isDone;
  const togglePrio = () => prio = !prio;
  const setTitle = (newTitle) => title = newTitle;
  const setDesc = (newDesc) => desc = newDesc;
  const setDue = (newDue) => due = newDue;
  const info = () => {
    return {
      title,
      desc,
      due,
      prio
    }
  };
                                
  return {
    toggleDone,
    togglePrio,
    setTitle,
    setDesc,
    setDue,
    info
  };

};

export default Task;