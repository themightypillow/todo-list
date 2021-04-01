const Task = (title, desc, due, prio) => {
  let isDone = false;

  const toggleDone = () => isDone = !isDone;
  const setTitle = (newTitle) => title = newTitle;
  const setDesc = (newDesc) => desc = newDesc;
  const setDue = (newDue) => due = newDue;
  const setPrio = (val) => prio = Boolean(val);
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
    setTitle,
    setDesc,
    setDue,
    setPrio,
    info
  };

};

export default Task;