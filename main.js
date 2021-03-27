(()=>{"use strict";const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttributeNS(null,"width","20"),e.setAttributeNS(null,"height","20"),e.setAttributeNS(null,"viewBox","0 0 24 24"),e.setAttributeNS(null,"stroke-width","1.5"),e.setAttributeNS(null,"stroke","#00aaff"),e.setAttributeNS(null,"fill","none"),e.setAttributeNS(null,"stroke-linecap","round"),e.setAttributeNS(null,"stroke-linejoin","round");const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttributeNS(null,"stroke","none"),t.setAttributeNS(null,"d","M0 0h24v24H0z"),t.setAttributeNS(null,"fill","none"),e.appendChild(t);const n=e=>{const t=document.createElementNS("http://www.w3.org/2000/svg","line");return t.setAttributeNS(null,"x1",e.x1),t.setAttributeNS(null,"y1",e.y1),t.setAttributeNS(null,"x2",e.x2),t.setAttributeNS(null,"y2",e.y2),t},l=(()=>{const t=e.cloneNode(!0);return[{x1:"9",y1:"6",x2:"20",y2:"6"},{x1:"9",y1:"12",x2:"20",y2:"12"},{x1:"9",y1:"18",x2:"20",y2:"18"},{x1:"5",y1:"6",x2:"5",y2:"6.01"},{x1:"5",y1:"12",x2:"5",y2:"12.01"},{x1:"5",y1:"18",x2:"5",y2:"18.01"}].forEach((e=>t.appendChild(n(e)))),t})(),o=(()=>{const t=e.cloneNode(!0);return[{x1:"12",y1:"5",x2:"12",y2:"19"},{x1:"5",y1:"12",x2:"19",y2:"12"}].forEach((e=>t.appendChild(n(e)))),t})(),r=(()=>{const e=[],t=t=>{e.push((e=>{let t={};return{setName:t=>e=t,getName:()=>e,addTask:e=>t[e.id]=e,deleteTask:e=>delete t[e.id],print:()=>{console.log(`Project: ${e}\n`),Object.keys(t).forEach((e=>console.log(t[e].toString())))}}})(t)),localStorage.setItem("projects",JSON.stringify(e.map((e=>e.getName()))))};return{load:()=>{0===localStorage.length?t("My Tasks"):localStorage.getItem("projects")&&Array.isArray(JSON.parse(localStorage.getItem("projects")))&&JSON.parse(localStorage.getItem("projects")).forEach((e=>t(e)))},add:t,getNames:()=>e.map((e=>e.getName()))}})();(()=>{const e=e=>{const t=document.querySelector("main");for(;t.firstChild;)t.removeChild(t.firstChild);const n=document.createElement("h2");n.textContent=e.currentTarget.textContent,t.appendChild(n);const l=document.createElement("div");l.classList.add("icon-label","add"),l.appendChild(o);const r=document.createElement("div");r.textContent="Add Task",l.appendChild(r),t.appendChild(l)},t=t=>{const n=document.querySelector("#projects"),o=document.createElement("div");o.classList.add("icon-label","group"),o.appendChild(l.cloneNode(!0));const r=document.createElement("h4");r.textContent=t,o.appendChild(r),o.addEventListener("click",e),n.appendChild(o)};!function(){const e=document.querySelector("#add-project"),n=document.querySelector("#project-form");e.addEventListener("click",(e=>{n.style.display="block"}));const l=document.querySelector("#new-project-name"),o=document.querySelector("#cancel-project"),c=document.querySelector("#submit-project");l.addEventListener("keypress",(e=>{13===e.keyCode&&e.preventDefault()})),o.addEventListener("click",(e=>{e.preventDefault(),l.value="",n.style.display="none"})),c.addEventListener("click",(e=>{e.preventDefault();const o=""===l.value?"Untitled":l.value;t(o),r.add(o),n.style.display="none",l.value=""}))}(),document.querySelectorAll(".group").forEach((t=>{t.addEventListener("click",e)})),r.load(),r.getNames().forEach((e=>t(e)))})()})();