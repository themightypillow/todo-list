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
  svg.appendChild(makeLine({x1: "9", y1: "6", x2: "20", y2: "6" }));
  svg.appendChild(makeLine({x1: "9", y1: "12", x2: "20", y2: "12" }));
  svg.appendChild(makeLine({x1: "9", y1: "18", x2: "20", y2: "18" }));
  svg.appendChild(makeLine({x1: "5", y1: "6", x2: "5", y2: "6.01" }));
  svg.appendChild(makeLine({x1: "5", y1: "12", x2: "5", y2: "12.01" }));
  svg.appendChild(makeLine({x1: "5", y1: "18", x2: "5", y2: "18.01" }));
  return svg;
})(); 

export const add = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#00aaff");
  svg.appendChild(makeLine({x1: "12", y1: "5", x2: "12", y2: "19"}));
  svg.appendChild(makeLine({x1: "5", y1: "12", x2: "19", y2: "12"}));
  return svg;
})();

export const circle = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#c8c8c8");
  svg.appendChild(makeCircle({cx: "12", cy: "12", r: "9"}));
  return svg;
})();

export const important = (() => {
  const svg = circle.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#dc4c3f");
  return svg;
})();

export const done = (() => {
  const svg = circle.cloneNode(true);
  svg.appendChild(makePath("M9 12l2 2l4 -4"));
  return svg;
})();

export const trash = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#dc4c3f");
  svg.appendChild(makeLine({x1: "10", y1: "11", x2: "10", y2: "17"}));
  svg.appendChild(makeLine({x1: "14", y1: "11", x2: "14", y2: "17"}));
  svg.appendChild(makeLine({x1: "4", y1: "7", x2: "20", y2: "7"}));
  svg.appendChild(makePath("M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"));
  svg.appendChild(makePath("M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"));
  return svg;
})();

export const calendar = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#c8c8c8");
  svg.appendChild(
    makePath("M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"));
  svg.appendChild(makeCircle({cx: "18", cy: "18", r: "4"}));
  svg.appendChild(makePath("M15 3v4"));
  svg.appendChild(makePath("M7 3v4"));
  svg.appendChild(makePath("M3 11h16"));
  svg.appendChild(makePath("M18 16.496v1.504l1 1"));
  return svg;
})();

export const edit = (() => {
  const svg = main.cloneNode(true);
  svg.setAttributeNS(null, "stroke", "#00aaff");
  svg.appendChild(makePath("M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"));
  svg.appendChild(makePath("M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"));
  svg.appendChild(makeLine({x1: "16", y1: "5", x2: "19", y2: "8"}));
  return svg;
})();