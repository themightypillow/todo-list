const main = document.createElementNS("http://www.w3.org/2000/svg", "svg");
main.setAttributeNS(null, "width", "20");
main.setAttributeNS(null, "height", "20");
main.setAttributeNS(null, "viewBox", "0 0 24 24");
main.setAttributeNS(null, "stroke-width", "1.5");
main.setAttributeNS(null, "fill", "none");
main.setAttributeNS(null, "stroke-linecap", "round");
main.setAttributeNS(null, "stroke-linejoin", "round");

const base = document.createElementNS("http://www.w3.org/2000/svg", "path");
base.setAttributeNS(null, "stroke", "none");
base.setAttributeNS(null, "d", "M0 0h24v24H0z");
base.setAttributeNS(null, "fill", "none");
main.appendChild(base);

const makeLine = (data) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttributeNS(null, "x1", data.x1);
  line.setAttributeNS(null, "y1", data.y1);
  line.setAttributeNS(null, "x2", data.x2);
  line.setAttributeNS(null, "y2", data.y2);
  return line;
};

const makeCircle = (data) => {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttributeNS(null, "cx", data.cx);
  circle.setAttributeNS(null, "cy", data.cy);
  circle.setAttributeNS(null, "r", data.r);
  return circle;
}

const makePath = (d) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttributeNS(null, "d", d);
  return path;
}

export const list = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#00aaff");
  const lines = [
    { x1: "9", y1: "6", x2: "20", y2: "6" },
    { x1: "9", y1: "12", x2: "20", y2: "12" },
    { x1: "9", y1: "18", x2: "20", y2: "18" },
    { x1: "5", y1: "6", x2: "5", y2: "6.01" },
    { x1: "5", y1: "12", x2: "5", y2: "12.01" },
    { x1: "5", y1: "18", x2: "5", y2: "18.01" }
  ];
  lines.forEach(data => svg.appendChild(makeLine(data)));
  return svg;
})(); 

export const add = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#00aaff");
  const lines = [
    {x1: "12", y1: "5", x2: "12", y2: "19"},
    {x1: "5", y1: "12", x2: "19", y2: "12"}
  ];
  lines.forEach(data => svg.appendChild(makeLine(data)));
  return svg;
})();

export const circle = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#e8e8e8");
  svg.appendChild(makeCircle({cx: "12", cy: "12", r: "9"}));
  return svg;
})();

export const trash = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#dc4c3f");
  const lines = [
    {x1: "4", y1: "7", x2: "20", y2: "7"},
    {x1: "10", y1: "11", x2: "10", y2: "17"},
    {x1: "14", y1: "11", x2: "14", y2: "17"}
  ];
  lines.forEach(data => svg.appendChild(makeLine(data)));
  const paths = [
    "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",
    "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
  ];
  paths.forEach(path => svg.appendChild(makePath(path)));
  return svg;
})();

export const calendar = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#e8e8e8");
  svg.appendChild(
    makePath("M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"));
  svg.appendChild(makeCircle({cx: "18", cy: "18", r: "4"}));
  const paths = [
    "M15 3v4",
    "M7 3v4",
    "M3 11h16",
    "M18 16.496v1.504l1 1"
  ];
  paths.forEach(path => svg.appendChild(makePath(path)));
  return svg;
})();

export const flag = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#e8e8e8");
  svg.appendChild(makePath("M5 14h14l-4.5 -4.5l4.5 -4.5h-14v16"));
  return svg;
})();