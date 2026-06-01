/* dashboard.js */
const session = JSON.parse(localStorage.getItem('al_user') || 'null');
if (!session) { window.location.href = 'login.html'; }

const name  = session?.name  || 'Foydalanuvchi';
const plan  = session?.plan  || 'free';
const login = session?.login || '';

document.querySelectorAll('.userName').forEach(el  => el.textContent = name);
document.querySelectorAll('.userInitial').forEach(el => el.textContent = name[0]?.toUpperCase() || 'U');
document.querySelectorAll('.planBadge').forEach(el  => el.textContent = plan.toUpperCase());

const results  = JSON.parse(localStorage.getItem(`al_results_${login}`) || '[]');
const totalT   = results.length;
const avgScore = totalT ? Math.round(results.reduce((a, r) => a + r.percent, 0) / totalT) : null;
const totalMin = results.reduce((a, r) => a + (r.duration || 0), 0);
const streak   = calcStreak(results);

const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
set('statTests',  totalT);
set('statAvg',    avgScore !== null ? avgScore + '%' : '—');
set('statStreak', streak);
set('statTime',   totalMin + ' min');

const container = document.getElementById('recentResults');
if (container) {
  if (!results.length) {
    container.innerHTML = '<div class="rt-empty">Hali hech qanday test ishlanmagan.<br>Birinchi testingizni boshlang! 🚀</div>';
  } else {
    const rows = results.slice().reverse().slice(0, 8).map(r => {
      const cls = r.percent >= 70 ? 'score-high' : r.percent >= 40 ? 'score-mid' : 'score-low';
      return `<div class="rt-row">
        <div style="font-weight:500">${r.testName || 'Test'}</div>
        <div>${r.date || '—'}</div>
        <div>${r.correct}/${r.total}</div>
        <div><span class="score-pill ${cls}">${r.percent}%</span></div>
      </div>`;
    }).join('');
    container.innerHTML = `<div class="rt-head"><div>Test</div><div>Sana</div><div>Natija</div><div>Foiz</div></div>${rows}`;
  }
}

function calcStreak(results) {
  if (!results.length) return 0;
  const dates = [...new Set(results.map(r => r.date))].sort().reverse();
  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i-1]) - new Date(dates[i])) / 86400000;
    if (Math.abs(diff) <= 1) streak++;
    else break;
  }
  return streak;
}

function logout() {
  localStorage.removeItem('al_user');
  window.location.href = '../index.html';
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
}

// ── AI CHAT BOT — Groq (llama-3.3-70b)
let chatHistory = [
  {
    role: 'system',
    content: `Siz AriseLabs platformasining AI yordamchisisiz.
Vazifangiz: O'zbekiston DTM imtihoniga tayyorlanayotgan talabalarga ingliz tili bo'yicha yordam berish.
Grammar, Vocabulary, Reading mavzularida qisqa, aniq va misollar bilan javob bering.
O'zbek tilida so'rasangiz O'zbek tilida, Rus tilida so'rasangiz Rus tilida, Ingliz tilida so'rasangiz Ingliz tilida javob bering.
Doimo do'stona va rag'batlantiruvchi bo'ling. Javoblarni qisqa va tushunarli qiling.`
  }
];

const GROQ_API_KEY = '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';

function toggleChat() {
  document.getElementById('aiChatBox')?.classList.toggle('open');
}

async function sendChatMsg() {
  const input = document.getElementById('chatInput');
  const msg = input?.value?.trim();
  if (!msg) return;

  input.value = '';
  addMsg(msg, 'user');

  const typingId = 'typing-' + Date.now();
  addMsg('⏳ Javob yozilmoqda...', 'bot typing', typingId);

  chatHistory.push({ role: 'user', content: msg });

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: chatHistory,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await res.json();

    if (data.error) {
      document.getElementById(typingId)?.remove();
      addMsg('⚠️ Xatolik: ' + data.error.message, 'bot');
      return;
    }

    const reply = data.choices?.[0]?.message?.content;
    document.getElementById(typingId)?.remove();

    if (reply) {
      addMsg(reply, 'bot');
      chatHistory.push({ role: 'assistant', content: reply });
      // Oxirgi 20 ta xabarni saqlash (system + 19 ta)
      if (chatHistory.length > 21) {
        chatHistory = [chatHistory[0], ...chatHistory.slice(-20)];
      }
    } else {
      addMsg('Kechirasiz, javob ololmadim. Qayta urining.', 'bot');
    }

  } catch (err) {
    document.getElementById(typingId)?.remove();
    addMsg('⚠️ Internet xatoligi. Tekshiring va qayta urining.', 'bot');
  }
}

function addMsg(text, type, id) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `ai-msg ${type === 'user' ? 'user' : type.includes('typing') ? 'bot typing' : 'bot'}`;
  div.textContent = text;
  if (id) div.id = id;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

document.getElementById('chatInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMsg(); }
});