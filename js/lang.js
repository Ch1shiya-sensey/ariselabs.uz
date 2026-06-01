/* lang.js — Language switcher UZ/RU */
let _lang = localStorage.getItem('al_lang') || 'uz';

function setLang(lang) {
  _lang = lang;
  localStorage.setItem('al_lang', lang);
  document.querySelectorAll('#langUZ,#langRU').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('lang' + lang.toUpperCase());
  if (btn) btn.classList.add('active');
  document.querySelectorAll('[data-uz],[data-ru]').forEach(el => {
    const txt = el.dataset[lang];
    if (txt !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = txt;
      else el.innerHTML = txt;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => setLang(_lang));
