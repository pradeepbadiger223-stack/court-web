const cases = [
  { id: "CASE 00421", title: "PINEAPPLE ON PIZZA: CRIME OR CULTURE?", category: "Food court", votes: "12.4K jurors", state: "Deliberating", verdict: "GUILTY OF TASTE", reason: "The jury finds that sweetness is welcome, but only when the crust is sturdy enough to carry the burden." },
  { id: "CASE 00422", title: "SHOULD READ RECEIPTS BE ILLEGAL?", category: "Social affairs", votes: "8.1K jurors", state: "Deliberating", verdict: "MISTRIAL", reason: "The court recognizes a fundamental right to ignore a message while still knowing it was seen." },
  { id: "CASE 00423", title: "IS A 7PM DINNER ACTUALLY TOO LATE?", category: "Life & leisure", votes: "6.7K jurors", state: "Deliberating", verdict: "GUILTY AS CHARGED", reason: "A balanced jury agrees: dinner should begin before the snacks become a full meal." }
];

const grid = document.querySelector('#caseGrid');
const dialog = document.querySelector('#verdictDialog');

function renderCases() {
  grid.innerHTML = cases.map((item, index) => `
    <article class="case-card">
      <div><div class="case-meta">${item.id} · ${item.category}</div><h3>${item.title}</h3></div>
      <div class="case-bottom"><div><div class="case-status">${item.state}</div><p class="case-votes">${item.votes}</p></div><button class="case-open" data-index="${index}" aria-label="View verdict">→</button></div>
    </article>`).join('');
}

function openVerdict(item) {
  document.querySelector('#dialogCaseNumber').textContent = item.id;
  document.querySelector('#dialogTitle').textContent = item.title;
  document.querySelector('#verdictText').textContent = item.verdict;
  document.querySelector('#verdictReason').textContent = item.reason;
  dialog.showModal();
}

renderCases();
grid.addEventListener('click', event => {
  const button = event.target.closest('[data-index]');
  if (button) openVerdict(cases[button.dataset.index]);
});

document.querySelectorAll('#heroCaseButton, #openCaseButton').forEach(button => button.addEventListener('click', () => document.querySelector('#file-case').scrollIntoView({ behavior: 'smooth' })));
document.querySelector('#closeDialog').addEventListener('click', () => dialog.close());
document.querySelector('#dismissVerdict').addEventListener('click', () => dialog.close());

document.querySelector('#caseForm').addEventListener('submit', event => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim().toUpperCase();
  const argument = document.querySelector('#argument').value.trim();
  const category = document.querySelector('#category').value;
  const item = { id: `CASE 00${421 + cases.length}`, title, category, votes: "1 juror", state: "Filed just now", verdict: "CASE RECEIVED", reason: `Your argument is on the record: “${argument}” The jury has been summoned.` };
  cases.unshift(item);
  renderCases();
  event.target.reset();
  openVerdict(item);
  document.querySelector('#docket').scrollIntoView({ behavior: 'smooth' });
});
