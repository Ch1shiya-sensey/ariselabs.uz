/* payment.js */
// ✏️ PROMO CODES — add your codes here
const PROMO_CODES = { 'ARISE10': 10, 'DTM2025': 15, 'WELCOME20': 20 };

let currentPlan = 'pro';
let basePrice   = 36000;
let finalPrice  = 36000;

function applyPromo() {
  const code = document.getElementById('promoInput')?.value?.trim()?.toUpperCase();
  const msg  = document.getElementById('promoMsg');
  if (!code) { msg.textContent = 'Promo kodni kiriting'; msg.className = 'promo-msg err'; return; }
  if (PROMO_CODES[code]) {
    const disc = PROMO_CODES[code];
    finalPrice = Math.round(basePrice * (1 - disc / 100));
    msg.textContent = `✓ ${disc}% chegirma! Yangi narx: ${finalPrice.toLocaleString('uz-UZ')} UZS`;
    msg.className = 'promo-msg ok';
    updatePriceUI();
  } else {
    msg.textContent = 'Promo kod topilmadi ✗';
    msg.className = 'promo-msg err';
  }
}

function updatePriceUI() {
  const p = finalPrice.toLocaleString('uz-UZ');
  document.getElementById('pbPrice').textContent  = p + ' UZS/oy';
  document.getElementById('payDesc').textContent  = `Quyidagi kartaga aynan ${p} UZS yuboring`;
  document.getElementById('copyAmountVal').textContent = p + ' UZS';
}

function copyText(text, btnId) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

function showPlanModal()  { document.getElementById('planModal').classList.add('open'); }
function hidePlanModal()  { document.getElementById('planModal').classList.remove('open'); }

function selectPlan(plan, price) {
  currentPlan = plan; basePrice = price; finalPrice = price;
  document.getElementById('pbName').textContent = plan === 'pro' ? 'Pro' : 'Bepul';
  document.getElementById('promoMsg').textContent = '';
  document.getElementById('promoInput').value    = '';
  document.querySelectorAll('.plan-opt').forEach(el => el.classList.remove('sel'));
  event.currentTarget.classList.add('sel');
  updatePriceUI();
  hidePlanModal();
}

// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 20);
});
