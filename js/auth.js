/* auth.js — Auto login system (no manual user management needed) */

// ── DEMO USERS (pre-loaded)
// ✏️ Add paid users here: { login, pass, name, plan, expiry }
const PRESET_USERS = [
  { login: 'admin',    pass: 'admin2025',  name: 'Admin',    plan: 'pro',  expiry: '2026-12-31' },
  { login: 'demo',     pass: 'demo123',    name: 'Demo User', plan: 'free', expiry: '2025-12-31' },
  { login: 'alisher01', pass: 'pass123', name: 'Alisher', plan: 'pro', expiry: '2025-09-01' },
  // Add paid students below after they pay:
  // { login: 'alisher01', pass: 'pass1234', name: 'Alisher', plan: 'pro', expiry: '2025-09-01' },
];

// ── HELPERS
function getUsers() {
  const stored = JSON.parse(localStorage.getItem('al_users') || '[]');
  // Merge preset + registered
  const allLogins = stored.map(u => u.login);
  const merged    = [...stored];
  PRESET_USERS.forEach(u => { if (!allLogins.includes(u.login)) merged.push(u); });
  return merged;
}

function saveUsers(users) {
  // Only save non-preset users
  const toSave = users.filter(u => !PRESET_USERS.find(p => p.login === u.login));
  localStorage.setItem('al_users', JSON.stringify(toSave));
}

function getSession() {
  return JSON.parse(localStorage.getItem('al_user') || 'null');
}

function setSession(user) {
  localStorage.setItem('al_user', JSON.stringify({
    login:    user.login,
    name:     user.name,
    plan:     user.plan,
    expiry:   user.expiry,
    loginTime: Date.now()
  }));
}

// ── LOGIN
function doLogin() {
  const loginVal = document.getElementById('loginInput')?.value?.trim()?.toLowerCase();
  const passVal  = document.getElementById('passInput')?.value;
  const errEl    = document.getElementById('loginError');

  if (!loginVal || !passVal) { showError('Login va parolni kiriting', errEl); return; }

  const users = getUsers();
  const user  = users.find(u => u.login === loginVal && u.pass === passVal);

  if (!user) { showError('Login yoki parol noto\'g\'ri ❌', errEl); return; }

  setSession(user);
  window.location.href = 'dashboard.html';
}

// ── REGISTER (free plan auto)
function doRegister() {
  const nameVal  = document.getElementById('regName')?.value?.trim();
  const loginVal = document.getElementById('regLogin')?.value?.trim()?.toLowerCase();
  const passVal  = document.getElementById('regPass')?.value;
  const pass2Val = document.getElementById('regPass2')?.value;
  const errEl    = document.getElementById('regError');

  if (!nameVal || !loginVal || !passVal) { showError('Barcha maydonlarni to\'ldiring', errEl); return; }
  if (passVal.length < 6)                { showError('Parol kamida 6 ta belgi', errEl); return; }
  if (passVal !== pass2Val)              { showError('Parollar mos emas', errEl); return; }
  if (loginVal.length < 3)              { showError('Login kamida 3 ta belgi', errEl); return; }

  const users = getUsers();
  if (users.find(u => u.login === loginVal)) { showError('Bu login band ✗', errEl); return; }

  const newUser = {
    login:  loginVal,
    pass:   passVal,
    name:   nameVal,
    plan:   'free',
    expiry: '2025-12-31'
  };
  const stored = JSON.parse(localStorage.getItem('al_users') || '[]');
  stored.push(newUser);
  localStorage.setItem('al_users', JSON.stringify(stored));

  setSession(newUser);
  window.location.href = 'dashboard.html';
}

function showError(msg, el) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}

function togglePass(inputId) {
  const inp = document.getElementById(inputId);
  if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
}

// ── AUTO-REDIRECT if already logged in
(function checkSession() {
  if (getSession() && (document.body.id === 'loginPage' || document.body.id === 'registerPage')) {
    window.location.href = 'dashboard.html';
  }
})();

// ── ENTER KEY
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (document.getElementById('loginForm'))    doLogin();
    if (document.getElementById('registerForm')) doRegister();
  }
});
