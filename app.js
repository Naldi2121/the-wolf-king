const smoothButtons = document.querySelectorAll('[data-scroll]');
smoothButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const modal = document.getElementById('chapterModal');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalBody = document.getElementById('modalBody');
const chapterButtons = document.querySelectorAll('.chapter-card');

const chapterPreviews = {
  1: 'Setsuna is nineteen. He remembers almost nothing about his past, but his body remembers the pain. When a stranger passes him in the crowd, a violent ache forces him to stop. That night, a dream leaves him with fire, a castle, wolves, and a warning: “Don’t let him remember.”',
  2: 'The stranger from Chapter One sees Setsuna again—and reacts as if Setsuna should already be dead. Setsuna gives chase, revealing his teleportation ability for the first time.',
  3: 'A black wolf appears in the forest. It knows Setsuna’s name and tells him something impossible: “You don’t remember me.”',
  4: 'An enemy forces Setsuna to open his scarred eye. The Crimson Eye copies a supernatural ability, but the power comes with a memory fragment and a cost.',
  5: 'Setsuna enters a kingdom ruled by one of the Great Kings and hears the name “Ashen Kingdom.” The name triggers the worst pain he has felt yet.',
  6: 'Setsuna begins testing his own memories. He realizes his pain is connected not only to enemies, but to people he may once have loved.',
  7: 'The ruins of the Ashen Kingdom feel familiar. Setsuna discovers a symbol tied to his past and sees a memory of a kingdom burning around him.',
  8: 'A familiar man begins to appear in Setsuna’s memories. The closer Setsuna gets to the truth, the more complicated his feelings become.',
  9: 'The Crimson Eye may be tied to the memories that were sealed away. Setsuna begins to suspect that someone was afraid of what he would remember.',
  10: 'The black wolf gives Setsuna one final warning: he has been searching for the person who destroyed him, but the real mystery is the person he used to be. The season ends with a face finally returning to his memory.'
};

chapterButtons.forEach(card => {
  const button = card.querySelector('.chapter-btn');
  const number = Number(card.dataset.chapter);
  button.addEventListener('click', () => {
    const title = card.querySelector('h3')?.textContent || 'Chapter';
    const isOpenable = number === 1;
    modalKicker.textContent = number === 10 ? 'SEASON FINALE' : `CHAPTER ${String(number).padStart(2,'0')}`;
    modalTitle.textContent = title;
    modalBody.textContent = chapterPreviews[number] || 'This chapter is part of the Season One roadmap and will be fully written into the manga as development continues.';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    if (!isOpenable) showToast(`Chapter ${String(number).padStart(2,'0')} preview loaded.`);
  });
});

document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('divineBtn').addEventListener('click', () => {
  showToast('DIVINE MODE is locked until Season Two.');
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

document.getElementById('year').textContent = new Date().getFullYear();
