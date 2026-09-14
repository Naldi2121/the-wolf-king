let panels=[],current=0;
const reader=document.getElementById("reader"),img=document.getElementById("panelImg"),pn=document.getElementById("pn"),pt=document.getElementById("pt"),sp=document.getElementById("sp"),tx=document.getElementById("tx"),nb=document.getElementById("narratorBox"),nt=document.getElementById("narratorText"),bar=document.querySelector(".progress > div"),counter=document.getElementById("counter");
function render(){const p=panels[current];if(!p)return;img.src=p.image;pn.textContent=`PANEL ${String(p.number).padStart(2,"0")}`;pt.textContent=p.title;counter.textContent=`${p.number} / 50`;bar.style.setProperty("--p",`${p.number/50*100}%`);
if(p.speaker==="NARRATOR"){nb.classList.remove("hidden");nt.textContent=p.dialogue;sp.textContent="";tx.textContent="";}else{nb.classList.add("hidden");nt.textContent="";sp.textContent=p.speaker;tx.textContent=p.dialogue?`“${p.dialogue}”`:"";}}
function next(){if(current<49){current++;render()}}function prev(){if(current>0){current--;render()}}
fetch("panels.json",{cache:"no-store"}).then(r=>r.json()).then(d=>{panels=d.slice(0,50);render()});
document.getElementById("openReader").onclick=()=>{reader.classList.remove("hidden");current=0;render();reader.scrollIntoView({behavior:"smooth"})};
document.getElementById("closeReader").onclick=()=>reader.classList.add("hidden");
document.getElementById("next").onclick=next;document.getElementById("next2").onclick=next;document.getElementById("prev").onclick=prev;document.getElementById("prev2").onclick=prev;
document.addEventListener("keydown",e=>{if(reader.classList.contains("hidden"))return;if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev();if(e.key==="Escape")reader.classList.add("hidden")});