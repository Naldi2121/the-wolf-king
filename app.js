let panels=[];
let current=0;
const reader=document.getElementById("reader"), img=document.getElementById("panelImg");
const pn=document.getElementById("pn"), pt=document.getElementById("pt"), sp=document.getElementById("sp"), tx=document.getElementById("tx");
const bar=document.getElementById("bar"), counter=document.getElementById("counter");
function render(){
 const p=panels[current]; if(!p)return;
 img.src=p.image; img.alt=`Panel ${p.number}: ${p.title}`;
 pn.textContent=`PANEL ${String(p.number).padStart(2,"0")}`;
 pt.textContent=p.title;
 sp.textContent=p.speaker;
 tx.textContent=`“${p.dialogue}”`;
 counter.textContent=`${p.number} / ${panels.length}`;
 bar.style.setProperty("--p",`${(p.number/panels.length)*100}%`);
 document.querySelector(".panel").scrollIntoView({behavior:"smooth",block:"start"});
}
async function load(){
 panels=await fetch("panels.json").then(r=>r.json());
 render();
}
function next(){if(current<panels.length-1){current++;render()}}
function prev(){if(current>0){current--;render()}}
document.getElementById("openReader").onclick=()=>{reader.classList.remove("hidden");current=0;render();reader.scrollIntoView({behavior:"smooth"})}
document.getElementById("closeReader").onclick=()=>reader.classList.add("hidden");
document.getElementById("next").onclick=next;document.getElementById("next2").onclick=next;
document.getElementById("prev").onclick=prev;document.getElementById("prev2").onclick=prev;
document.addEventListener("keydown",e=>{if(reader.classList.contains("hidden"))return;if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev();if(e.key==="Escape")reader.classList.add("hidden")});
load();
