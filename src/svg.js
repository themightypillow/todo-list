const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttributeNS(null, "width", "20");
svg.setAttributeNS(null, "height", "20");
svg.setAttributeNS(null, "viewBox", "0 0 24 24");
svg.setAttributeNS(null, "stroke-width", "1.5");
svg.setAttributeNS(null, "stroke", "#00aaff");
svg.setAttributeNS(null, "fill", "none");
svg.setAttributeNS(null, "stroke-linecap", "round");
svg.setAttributeNS(null, "stroke-linejoin", "round");

const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttributeNS(null, "stroke", "none");
path.setAttributeNS(null, "d", "M0 0h24v24H0z");
path.setAttributeNS(null, "fill", "none");
svg.appendChild(path);

const makeLine = (data) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttributeNS(null, "x1", data.x1);
  line.setAttributeNS(null, "y1", data.y1);
  line.setAttributeNS(null, "x2", data.x2);
  line.setAttributeNS(null, "y2", data.y2);
  return line;
};

export const listSVG = (() => {
  const list = svg.cloneNode(true);
  const lines = [
    { x1: "9", y1: "6", x2: "20", y2: "6" },
    { x1: "9", y1: "12", x2: "20", y2: "12" },
    { x1: "9", y1: "18", x2: "20", y2: "18" },
    { x1: "5", y1: "6", x2: "5", y2: "6.01" },
    { x1: "5", y1: "12", x2: "5", y2: "12.01" },
    { x1: "5", y1: "18", x2: "5", y2: "18.01" }
  ];
  lines.forEach(data => list.appendChild(makeLine(data)));
  return list;
})(); 

export const addSVG = (() => {
  const add = svg.cloneNode(true);
  const lines = [
    {x1: "12", y1: "5", x2: "12", y2: "19"},
    {x1: "5", y1: "12", x2: "19", y2: "12"}
  ];
  lines.forEach(data => add.appendChild(makeLine(data)));
  return add;
})();