/* music.js */
let _musicPlaying = false;
const _audio = document.getElementById('bgMusic');

// Try auto-play after first interaction
document.addEventListener('click', function _firstPlay() {
  if (_audio && !_musicPlaying) {
    _audio.volume = 0.3; // ← change volume here (0.0–1.0)
    _audio.play().then(() => { _musicPlaying = true; _updateMusicUI(); }).catch(() => {});
  }
  document.removeEventListener('click', _firstPlay);
}, { once: true });

function toggleMusic() {
  if (!_audio) return;
  if (_musicPlaying) { _audio.pause(); _musicPlaying = false; }
  else { _audio.volume = 0.3; _audio.play().catch(() => {}); _musicPlaying = true; }
  _updateMusicUI();
}

function _updateMusicUI() {
  const bars = document.getElementById('musicBars');
  const icon = document.getElementById('musicIcon');
  if (bars) bars.classList.toggle('playing', _musicPlaying);
  if (icon) icon.textContent = _musicPlaying ? '♫' : '♪';
}
