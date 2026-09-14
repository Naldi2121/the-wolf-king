const chapters = [
  ["01", "The Forgotten Pain", "Setsuna encounters the first thread connecting him to a past he cannot remember."],
  ["02", "The Stranger", "A familiar stranger recognizes Setsuna—and fears him."],
  ["03", "The Black Wolf", "An impossible voice from the forest knows Setsuna's name."],
  ["04", "The Crimson Eye", "Setsuna opens the scarred eye and discovers what it can steal."],
  ["05", "The Kingdom of Kings", "Rumors of an erased kingdom pull Setsuna toward a larger mystery."],
  ["06", "The Pain", "Setsuna begins tracing the people and places that trigger his memory."],
  ["07", "The Forgotten Kingdom", "The ruins of the Ashen Kingdom reveal that Setsuna was there."],
  ["08", "The Man in the Memory", "A trusted face begins to emerge from the past."],
  ["09", "The Truth Behind the Scar", "Setsuna learns that his memories were deliberately sealed."],
  ["10", "The Wolf King", "The truth becomes larger than revenge—and the Divine One finally watches from the shadows."]
];

const panels = Array.from({ length: 100 }, (_, i) => ({
  number: i + 1,
  narrator:
    i === 0
      ? "Some memories refuse to stay buried."
      : i === 1
      ? "In a world ruled by kings and bloodlines, Setsuna walks alone."
      : i === 2
      ? "He does not remember where he came from. His body remembers more than his mind."
      : i === 20
      ? "Something about this stranger has awakened a pain Setsuna cannot explain."
      : i === 55
      ? "The truth is not missing. It is hidden."
      : i === 98
      ? "Someone is watching."
      : i === 99
      ? "And someone has been waiting for Setsuna to remember."
      : "",
  dialogue:
    i === 12
      ? { speaker: "Setsuna", text: "Why does this feel familiar?" }
      : i === 25
      ? { speaker: "Lyra", text: "Have we met?" }
      : i === 27
      ? { speaker: "Setsuna", text: "You recognized my scar." }
      : i === 28
      ? { speaker: "Lyra", text: "Some questions are safer left unanswered." }
      : i === 40
      ? { speaker: "Setsuna", text: "Then I guess I'll have to find the answer myself." }
      : i === 70
      ? { speaker: "Wolf", text: "You don't remember me." }
      : i === 71
      ? { speaker: "Setsuna", text: "Who are you?" }
      : i === 98
      ? { speaker: "Unknown", text: "He's starting to remember." }
      : i === 99
      ? { speaker: "Unknown", text: "Then find him before he remembers everything." }
      : null
}));

const chapterGrid = document.getElementById("chapterGrid");
const reader = document.getElementById("chapterReader");
const readerTitle = document.getElementById("readerTitle");
const panelNumber = document.getElementById("panelNumber");
const panelCounter = document.getElementById("panelCounter");
const progressFill = document.getElementById("progressFill");
const narratorBox = document.getElementById("narratorBox");
const narratorText = document.getElementById("narratorText");
const dialogueBox = document.getElementById("dialogueBox");
const speakerName = document.getElementById("speakerName");
const dialogueText = document.getElementById("dialogueText");
const panelImage = document.getElementById("panelImage");
const panelPlaceholder = document.getElementById("panelPlaceholder");

let currentPanel = 0;
let speech = null;

chapters.forEach(([num, title, desc], index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "chapter-card";
  card.innerHTML = `
    <div class="chapter-num">${num}</div>
    <div>
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
    <div class="chapter-status">${index === 0 ? "READ" : "COMING SOON"}</div>
  `;
  if (index === 0) {
    card.addEventListener("click", () => openChapter(0));
  } else {
    card.addEventListener("click", () => alert("This chapter will unlock as the NEX MANGA story expands."));
  }
  chapterGrid.appendChild(card);
});

function openChapter(chapterIndex) {
  if (chapterIndex !== 0) return;
  readerTitle.textContent = "Chapter 1 — The Forgotten Pain";
  reader.classList.remove("hidden");
  currentPanel = 0;
  renderPanel();
  reader.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPanel() {
  const p = panels[currentPanel];
  panelNumber.textContent = `PANEL ${String(p.number).padStart(2, "0")}`;
  panelCounter.textContent = `Panel ${p.number} / 100`;
  progressFill.style.width = `${((p.number) / 100) * 100}%`;

  if (currentPanel === 0) {
    panelImage.src = "setsuna-concept.png";
    panelImage.style.display = "block";
    panelPlaceholder.style.display = "none";
    panelImage.alt = "Setsuna — Chapter 1 opening artwork";
  } else {
    panelImage.style.display = "none";
    panelPlaceholder.style.display = "flex";
    panelPlaceholder.querySelector("span").textContent = `PANEL ${String(p.number).padStart(2, "0")}`;
    panelPlaceholder.querySelector("small").textContent = "Final manga artwork will be placed here.";
  }

  if (p.narrator) {
    narratorBox.classList.remove("hidden");
    narratorText.textContent = p.narrator;
  } else {
    narratorBox.classList.add("hidden");
    narratorText.textContent = "";
    stopNarration();
  }

  if (p.dialogue) {
    dialogueBox.classList.remove("hidden");
    speakerName.textContent = p.dialogue.speaker;
    dialogueText.textContent = `“${p.dialogue.text}”`;
  } else {
    dialogueBox.classList.add("hidden");
    speakerName.textContent = "";
    dialogueText.textContent = "";
  }

  window.scrollTo({ top: reader.offsetTop - 12, behavior: "smooth" });
}

function nextPanel() {
  if (currentPanel < panels.length - 1) {
    currentPanel += 1;
    renderPanel();
  }
}

function prevPanel() {
  if (currentPanel > 0) {
    currentPanel -= 1;
    renderPanel();
  }
}

function speakNarrator() {
  if (!("speechSynthesis" in window)) {
    alert("Your browser does not support built-in speech narration.");
    return;
  }
  stopNarration();
  const text = panels[currentPanel].narrator;
  if (!text) return;

  speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.88;
  speech.pitch = 0.9;
  speech.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => /en-US|en-GB/i.test(v.lang) && /male|David|Daniel|George|James/i.test(v.name))
    || voices.find(v => /en-US|en-GB/i.test(v.lang));
  if (preferred) speech.voice = preferred;

  window.speechSynthesis.speak(speech);
}

function stopNarration() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  speech = null;
}

document.getElementById("nextPanel").addEventListener("click", nextPanel);
document.getElementById("prevPanel").addEventListener("click", prevPanel);
document.getElementById("nextPanelBottom").addEventListener("click", nextPanel);
document.getElementById("prevPanelBottom").addEventListener("click", prevPanel);
document.getElementById("playNarration").addEventListener("click", speakNarrator);
document.getElementById("stopNarration").addEventListener("click", stopNarration);
document.getElementById("closeReader").addEventListener("click", () => {
  stopNarration();
  reader.classList.add("hidden");
});

document.addEventListener("keydown", (event) => {
  if (reader.classList.contains("hidden")) return;
  if (event.key === "ArrowRight") nextPanel();
  if (event.key === "ArrowLeft") prevPanel();
  if (event.key === "Escape") {
    stopNarration();
    reader.classList.add("hidden");
  }
});
