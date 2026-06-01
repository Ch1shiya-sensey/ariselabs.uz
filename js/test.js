/* test.js — Full working test engine */
const session = JSON.parse(localStorage.getItem('al_user') || 'null');
if (!session) { window.location.href = 'login.html'; }

let questions    = [];
let answers      = {};
let currentIdx   = 0;
let timeLeft     = 30 * 60;
let timerInt     = null;
let startTime    = Date.now();
let reviewMode   = false;
let modNum       = 1;

// Get module from URL ?mod=N
const urlParams  = new URLSearchParams(window.location.search);
modNum           = parseInt(urlParams.get('mod')) || 1;

const MODULE_NAMES = {
  1:'Present Tenses',2:'Past Tenses',3:'Future Tenses',4:'Modal Verbs',
  5:'Conditionals',6:'Passive Voice',7:'Relative Clauses',8:'Reported Speech',
  9:'Articles',10:'Prepositions',11:'Synonyms & Antonyms',12:'Word Formation',
  13:'Phrasal Verbs',14:'Vocabulary DTM',15:'Reading: Main Idea',
  16:'Reading: Details',17:'Reading: Inference',18:'Mock Test 1',
  19:'Mock Test 2',20:'Mock Test 3'
};

// ── INIT
function initTest() {
  document.getElementById('testNameH').textContent = `Module ${modNum}: ${MODULE_NAMES[modNum] || 'Test'}`;
  questions = getTestQuestions(modNum);
  buildGrid();
  showQ(0);
  startTimer();
}

// ── TIMER
function startTimer() {
  updateTimerDisplay();
  timerInt = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) { clearInterval(timerInt); submitTest(); }
  }, 1000);
}

function updateTimerDisplay() {
  const m  = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s  = String(timeLeft % 60).padStart(2, '0');
  const el = document.getElementById('timerDisplay');
  el.textContent = `${m}:${s}`;
  el.classList.toggle('warn', timeLeft <= 300);
}

// ── SHOW QUESTION
function showQ(idx) {
  currentIdx = idx;
  const q    = questions[idx];
  if (!q) return;

  document.getElementById('qNum').textContent   = `Savol ${idx + 1} / ${questions.length}`;
  document.getElementById('qTopicBadge').textContent  = q.topic.charAt(0).toUpperCase() + q.topic.slice(1);
  document.getElementById('qTopicBadge').className    = `q-topic-badge ${q.topic}`;
  document.getElementById('qText').textContent  = q.text;

  // Progress bar
  document.getElementById('progressFill').style.width = ((idx + 1) / questions.length * 100) + '%';

  // Options
  const letters = ['A', 'B', 'C', 'D'];
  const opts    = document.getElementById('qOptions');
  opts.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn  = document.createElement('button');
    btn.className = 'q-opt';
    if (reviewMode) {
      if (i === q.ans)                              btn.classList.add('correct');
      else if (answers[idx] === i && i !== q.ans)   btn.classList.add('wrong');
    } else {
      if (answers[idx] === i) btn.classList.add('selected');
    }
    btn.innerHTML = `<span class="q-opt-letter">${letters[i]}</span>${opt}`;
    if (!reviewMode) btn.onclick = () => selectAns(idx, i);
    opts.appendChild(btn);
  });

  // Explanation (review mode)
  const exp = document.getElementById('qExplanation');
  if (reviewMode && q.exp) {
    exp.textContent = '💡 ' + q.exp;
    exp.classList.add('show');
  } else {
    exp.classList.remove('show');
  }

  // Nav buttons
  document.getElementById('prevBtn').disabled = idx === 0;
  const nextBtn = document.getElementById('nextBtn');
  if (idx === questions.length - 1) {
    nextBtn.textContent = reviewMode ? '✓ Tugatish' : 'Yakunlash ✓';
    nextBtn.onclick     = reviewMode ? () => location.href = 'dashboard.html' : confirmSubmit;
  } else {
    nextBtn.textContent = 'Keyingi →';
    nextBtn.onclick     = nextQ;
  }

  updateGrid();
}

function selectAns(qIdx, optIdx) {
  if (reviewMode) return;
  answers[qIdx] = optIdx;
  showQ(qIdx);
}

function prevQ() { if (currentIdx > 0) showQ(currentIdx - 1); }
function nextQ() { if (currentIdx < questions.length - 1) showQ(currentIdx + 1); }

// ── GRID
function buildGrid() {
  const grid = document.getElementById('qGrid');
  grid.innerHTML = '';
  questions.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'qg-n';
    btn.textContent = i + 1;
    btn.id = `qg-${i}`;
    btn.onclick = () => showQ(i);
    grid.appendChild(btn);
  });
}

function updateGrid() {
  questions.forEach((q, i) => {
    const btn = document.getElementById(`qg-${i}`);
    if (!btn) return;
    btn.className = 'qg-n';
    if (reviewMode) {
      if (answers[i] === q.ans)                    btn.classList.add('correct-r');
      else if (answers[i] !== undefined)            btn.classList.add('wrong-r');
    } else {
      if (answers[i] !== undefined)                btn.classList.add('done');
    }
    if (i === currentIdx) btn.classList.add('active');
  });
}

// ── SUBMIT
function confirmSubmit() {
  const unanswered = questions.length - Object.keys(answers).length;
  document.getElementById('unansweredMsg').textContent =
    unanswered > 0 ? `${unanswered} ta savol javobsiz qoldi.` : 'Barcha savollarga javob berdingiz! ✓';
  document.getElementById('confirmModal').classList.add('open');
}

function closeConfirm() {
  document.getElementById('confirmModal').classList.remove('open');
}

function submitTest() {
  clearInterval(timerInt);
  closeConfirm();

  let correct = 0;
  questions.forEach((q, i) => { if (answers[i] === q.ans) correct++; });

  const total    = questions.length;
  const wrong    = Object.keys(answers).length - correct;
  const skipped  = total - Object.keys(answers).length;
  const percent  = Math.round((correct / total) * 100);
  const duration = Math.round((Date.now() - startTime) / 60000);

  // Save result to localStorage
  const key     = `al_results_${session.login}`;
  const results = JSON.parse(localStorage.getItem(key) || '[]');
  results.push({
    testName: `Module ${modNum}: ${MODULE_NAMES[modNum]}`,
    mod: modNum,
    date: new Date().toLocaleDateString('uz-UZ'),
    correct, total, wrong, skipped, percent, duration
  });
  localStorage.setItem(key, JSON.stringify(results));

  // Show result modal
  const circle = document.getElementById('rmCircle');
  circle.style.background =
    percent >= 70 ? 'linear-gradient(135deg,#22c55e,#16a34a)' :
    percent >= 40 ? 'linear-gradient(135deg,#f59e0b,#d97706)' :
                   'linear-gradient(135deg,#ef4444,#dc2626)';

  document.getElementById('rmScore').textContent   = correct;
  document.getElementById('rmTitle').textContent   =
    percent >= 70 ? 'Ajoyib natija! 🎉' :
    percent >= 40 ? 'Yaxshi urinish! 💪' : 'Davom eting! 📚';
  document.getElementById('rmMsg').textContent =
    percent >= 70 ? `${percent}% — DTM uchun siz tayyor!` :
    percent >= 40 ? `${percent}% — Yana mashq qiling.` :
                   `${percent}% — Ko'proq o'qish kerak.`;
  document.getElementById('rmCorrect').textContent  = correct;
  document.getElementById('rmWrong').textContent    = wrong;
  document.getElementById('rmSkipped').textContent  = skipped;
  document.getElementById('rmPercent').textContent  = percent + '%';

  document.getElementById('resultModal').classList.add('open');
}

function reviewAnswers() {
  reviewMode = true;
  document.getElementById('resultModal').classList.remove('open');
  showQ(0);
  updateGrid();
  document.querySelector('.submit-btn').textContent = '← Dashboard';
  document.querySelector('.submit-btn').onclick     = () => location.href = 'dashboard.html';
}

// ── START
initTest();
