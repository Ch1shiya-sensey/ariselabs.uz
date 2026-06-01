/* landing.js */

// ── NAV scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 30);
});

function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

// ── HERO CANVAS
(function initCanvas() {
  const cv = document.getElementById('heroCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, stars = [], nodes = [], parts = [], frame = 0;

  function resize() {
    W = cv.width = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
    stars = []; nodes = []; parts = [];
    for (let i = 0; i < 140; i++) stars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.3+0.2, a: Math.random(), b: (Math.random()-0.5)*0.01 });
    for (let i = 0; i < 22; i++) nodes.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25 });
    for (let i = 0; i < 35; i++) parts.push({ x: Math.random()*W, y: Math.random()*H, vy: -(Math.random()*0.45+0.1), a: Math.random()*0.5+0.2, s: Math.random()*1.8+0.4, h: Math.random()>0.5?270:210 });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    stars.forEach(s => {
      s.a += s.b; if (s.a > 0.9 || s.a < 0.1) s.b *= -1;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = isDark ? `rgba(210,190,255,${s.a})` : `rgba(100,60,200,${s.a*0.4})`;
      ctx.fill();
    });
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(124,92,255,0.5)'; ctx.fill();
    });
    for (let i = 0; i < nodes.length; i++) for (let j = i+1; j < nodes.length; j++) {
      const dx = nodes[i].x-nodes[j].x, dy = nodes[i].y-nodes[j].y, d = Math.hypot(dx,dy);
      if (d < 180) { ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.strokeStyle=`rgba(124,92,255,${0.1*(1-d/180)})`; ctx.lineWidth=0.5; ctx.stroke(); }
    }
    parts.forEach(p => {
      p.y += p.vy; p.a -= 0.003;
      if (p.a <= 0) { p.y = H+5; p.x = Math.random()*W; p.a = 0.5; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
      ctx.fillStyle = `hsla(${p.h},80%,75%,${p.a})`; ctx.fill();
    });
    frame++; requestAnimationFrame(draw);
  }

  window.addEventListener('load', () => { resize(); draw(); });
  window.addEventListener('resize', resize);
  setTimeout(() => { if (!W) { resize(); draw(); } }, 200);
})();

// ── MODULES GRID
const MODULES = [
  { n:1,  title:'Present Tenses',      q:30, free:true },
  { n:2,  title:'Past Tenses',         q:30, free:true },
  { n:3,  title:'Future Tenses',       q:30, free:false },
  { n:4,  title:'Modal Verbs',         q:30, free:false },
  { n:5,  title:'Conditionals',        q:30, free:false },
  { n:6,  title:'Passive Voice',       q:30, free:false },
  { n:7,  title:'Relative Clauses',    q:30, free:false },
  { n:8,  title:'Reported Speech',     q:30, free:false },
  { n:9,  title:'Articles',            q:30, free:false },
  { n:10, title:'Prepositions',        q:30, free:false },
  { n:11, title:'Synonyms & Antonyms', q:30, free:false },
  { n:12, title:'Word Formation',      q:30, free:false },
  { n:13, title:'Phrasal Verbs',       q:30, free:false },
  { n:14, title:'Vocabulary DTM',      q:30, free:false },
  { n:15, title:'Reading — Main Idea', q:30, free:false },
  { n:16, title:'Reading — Details',   q:30, free:false },
  { n:17, title:'Reading — Inference', q:30, free:false },
  { n:18, title:'Mixed Mock Test 1',   q:30, free:false },
  { n:19, title:'Mixed Mock Test 2',   q:30, free:false },
  { n:20, title:'Mixed Mock Test 3',   q:30, free:false },
];

const grid = document.getElementById('modulesGrid');
if (grid) {
  grid.innerHTML = MODULES.map(m => `
    <div class="module-card reveal" onclick="location.href='pages/login.html'">
      <span class="mod-num">M${String(m.n).padStart(2,'0')}</span>
      <div class="mod-info">
        <div class="mod-title">${m.title}</div>
        <div class="mod-meta">${m.q} savol · 30 daqiqa</div>
      </div>
      ${m.free ? '<span class="mod-free">BEPUL</span>' : '<span class="mod-lock">🔒</span>'}
    </div>`).join('');
}

// ── FAQ
const FAQS_UZ = [
  ['To\'lovdan keyin qachon kirish olamam?', '1-2 soat ichida (ish soatlari 9:00–22:00). Chek skrinshotini Telegram\'ga yuborgan zahoti biz akkauntingizni faollashtirамiz.'],
  ['Testlar haqiqiy DTM formatidami?', 'Ha, barcha testlar DTM imtihon formatiga mos — 30 savol, 30 daqiqa. Grammar, Vocabulary va Reading bo\'limlari DTM dasturiga asoslangan.'],
  ['Bepul reja bilan nima qila olaman?', 'Bepul reja bilan 2 ta modul (60 savol) ishlash va natijalarni ko\'rish mumkin. Pro reja esa 20 ta modul, AI yordamchi va batafsil statistikani beradi.'],
  ['AI yordamchi nima qila oladi?', 'AI yordamchi ingliz tili grammatikasi, so\'z boyligi va test savollari haqida istalgan savolingizga javob beradi. Tushunmagan mavzularni tushuntiradi.'],
  ['Qaysi karta orqali to\'lov qilsa bo\'ladi?', 'Istalgan O\'zbekiston banki kartasi — Uzcard, Humo, Visa, Mastercard.'],
  ['Kelajakda boshqa fanlar qo\'shiladimi?', 'Ha! Matematika, Fizika, Kimyo va boshqa DTM fanlari tez orada qo\'shiladi.'],
];

const faqList = document.getElementById('faqList');
if (faqList) {
  faqList.innerHTML = FAQS_UZ.map(([q,a]) => `
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-q">${q}<span class="faq-icon">+</span></div>
      <div class="faq-a">${a}</div>
    </div>`).join('');
}

// ── SCROLL REVEAL
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
// delayed reveal for dynamically created elements
setTimeout(() => document.querySelectorAll('.reveal').forEach(el => revObs.observe(el)), 300);

// ── SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('mobileMenu')?.classList.remove('open');
  });
});
