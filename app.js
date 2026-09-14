let panels = [], current = 0;
const reader = document.getElementById("reader");
const img = document.getElementById("panelImg");
const pn = document.getElementById("pn");
const pt = document.getElementById("pt");
const sp = document.getElementById("sp");
const tx = document.getElementById("tx");
const nb = document.getElementById("narratorBox");
const nt = document.getElementById("narratorText");
const bar = document.querySelector(".progress > div");
const counter = document.getElementById("counter");

function render() {
  const p = panels[current];
  if (!p) return;

  img.src = p.image;
  img.alt = `Panel ${p.number}: ${p.title}`;
  pn.textContent = `PANEL ${String(p.number).padStart(2, "0")}`;
  pt.textContent = p.title;
  counter.textContent = `${p.number} / 50`;
  bar.style.setProperty("--p", `${(p.number / 50) * 100}%`);

  if (p.speaker === "NARRATOR") {
    nb.classList.remove("hidden");
    nt.textContent = p.dialogue;
    sp.textContent = "";
    tx.textContent = "";
  } else {
    nb.classList.add("hidden");
    nt.textContent = "";
    sp.textContent = p.speaker || "";
    tx.textContent = p.dialogue ? `“${p.dialogue}”` : "";
  }
}

function next() {
  if (current < panels.length - 1) {
    current += 1;
    render();
  }
}

function prev() {
  if (current > 0) {
    current -= 1;
    render();
  }
}

async function loadPanels() {
  const response = await fetch("panels.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load panel data.");
  panels = (await response.json()).slice(0, 50);
  render();
}

document.getElementById("openReader").addEventListener("click", () => {
  reader.classList.remove("hidden");
  current = 0;
  render();
  reader.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("closeReader").addEventListener("click", () => {
  reader.classList.add("hidden");
});

document.getElementById("next").addEventListener("click", next);
document.getElementById("next2").addEventListener("click", next);
document.getElementById("prev").addEventListener("click", prev);
document.getElementById("prev2").addEventListener("click", prev);

document.addEventListener("keydown", (event) => {
  if (reader.classList.contains("hidden")) return;
  if (event.key === "ArrowRight") next();
  if (event.key === "ArrowLeft") prev();
  if (event.key === "Escape") reader.classList.add("hidden");
});

loadPanels().catch(console.error);
