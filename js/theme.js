/* theme.js */
(function () {
  const saved = localStorage.getItem('al_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = saved === 'dark' ? '☀' : '☾';
})();

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('al_theme', next);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = next === 'dark' ? '☀' : '☾';
}
