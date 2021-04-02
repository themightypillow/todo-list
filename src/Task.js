const Task = (title, desc, due, prio, done) => {

  const toggleDone = () => done = !done;
  const setTitle = (newTitle) => title = newTitle;
  const setDesc = (newDesc) => desc = newDesc;
  const setDue = (newDue) => due = newDue;
  const setPrio = (val) => prio = Boolean(val);
  const info = () => {
    return {
      title,
      desc,
      due,
      prio,
      done
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