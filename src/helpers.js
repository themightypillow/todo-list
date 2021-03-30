export const clearChildren = (node) => {
  while(node.firstChild) node.removeChild(node.firstChild);
}

export const buildFormButtons = () => {
  const cancel = document.createElement("button");
  cancel.textContent = "Cancel";
  const submit = document.createElement("button");
  submit.textContent = "Ok";
  const buttons = document.createElement("div");
  buttons.appendChild(cancel);
  buttons.appendChild(submit);
  return buttons;
}