const listSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
listSVG.setAttributeNS(null, "width", "20");
listSVG.setAttributeNS(null, "height", "20");
listSVG.setAttributeNS(null, "viewBox", "0 0 24 24");
listSVG.setAttributeNS(null, "stroke-width", "1.5");
listSVG.setAttributeNS(null, "stroke", "#00aaff");
listSVG.setAttributeNS(null, "fill", "none");
listSVG.setAttributeNS(null, "stroke-linecap", "round");
listSVG.setAttributeNS(null, "stroke-linejoin", "round");

const listPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
listPath.setAttributeNS(null, "stroke", "none");
listPath.setAttributeNS(null, "d", "M0 0h24v24H0z");
listPath.setAttributeNS(null, "fill", "none");
listSVG.appendChild(listPath);

const listLines = [
  { x1: "9", y1: "6", x2: "20", y2: "6" },
  { x1: "9", y1: "12", x2: "20", y2: "12" },
  { x1: "9", y1: "18", x2: "20", y2: "18" },
  { x1: "5", y1: "6", x2: "5", y2: "6.01" },
  { x1: "5", y1: "12", x2: "5", y2: "12.01" },
  { x1: "5", y1: "18", x2: "5", y2: "18.01" }
];

listLines.forEach(data => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttributeNS(null, "x1", data.x1);
  line.setAttributeNS(null, "y1", data.y1);
  line.setAttributeNS(null, "x2", data.x2);
  line.setAttributeNS(null, "y2", data.y2);
  listSVG.appendChild(line);
});

export default listSVG;