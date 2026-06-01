╔══════════════════════════════════════════════════════════════╗
║           AriseLabs — DTM Ingliz Tili Platformasi            ║
║                    SETUP GUIDE v2.0                          ║
╚══════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ariselabs_uz/
├── index.html              ← Landing page (asosiy sahifa)
├── css/
│   ├── main.css            ← Shared styles + dark/light theme
│   ├── landing.css         ← Landing page styles
│   ├── dashboard.css       ← Dashboard + AI chat styles
│   ├── test.css            ← Test page styles
│   ├── auth.css            ← Login/Register styles
│   └── payment.css         ← Payment page styles
├── js/
│   ├── lang.js             ← UZ/RU language switcher
│   ├── theme.js            ← Dark/Light theme toggle
│   ├── music.js            ← Background music player
│   ├── landing.js          ← Landing page + canvas animation
│   ├── questions.js        ← 600 DTM questions (20 modules)
│   ├── test.js             ← Full test engine (timer, scoring)
│   ├── auth.js             ← Login + auto-registration system
│   ├── dashboard.js        ← Dashboard + AI chat bot
│   └── payment.js          ← Payment + promo codes
├── pages/
│   ├── login.html          ← Login page
│   ├── register.html       ← Register page (free auto)
│   ├── payment.html        ← Payment instructions page
│   ├── dashboard.html      ← Main dashboard
│   ├── tests.html          ← All 20 modules list
│   ├── test.html           ← Live test engine
│   ├── modules.html        ← Modules overview
│   ├── results.html        ← Results history
│   └── profile.html        ← User profile
└── audio/
    └── bg.mp3              ← DROP YOUR MUSIC FILE HERE


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✏️  WHAT YOU MUST CHANGE (4 things only)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. KARTA RAQAMI — pages/payment.html da:
   - "9860 3501 4843 3930" → o'z karta raqamingiz
   - "Mukhammadyor Boltaboev" → o'z ismingiz
   - copyText('9860350148433930' → raqamsiz variant

2. TELEGRAM — barcha fayllarda "YOUR_TELEGRAM_USERNAME" ni:
   → o'z Telegram username'ingiz bilan almashtiring
   Fayllar: pages/payment.html, pages/login.html, index.html

3. MUSIQA — audio/bg.mp3 ga o'z musiqangizni qo'ying
   (fayl nomi bg.mp3 bo'lishi kerak)

4. INSTAGRAM (ixtiyoriy) — index.html da:
   "YOUR_INSTAGRAM" → o'z Instagram'ingiz


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 HOW THE LOGIN SYSTEM WORKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FREE users: Register themselves at /pages/register.html
  → Gets 2 free modules automatically
  → No manual work needed from you

PRO users (after payment):
  Open js/auth.js and find PRESET_USERS array.
  Add the student:

  { login: 'alisher01', pass: 'pass1234', name: 'Alisher Karimov', plan: 'pro', expiry: '2025-09-01' },

  Save the file and re-upload to your hosting.
  Send login/pass to the student via Telegram.

ADMIN account (change password!):
  { login: 'admin', pass: 'admin2025', ... }
  → Change 'admin2025' to a strong password!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 PROMO CODES — js/payment.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PROMO_CODES = {
  'ARISE10':  10,    ← 10% chegirma
  'DTM2025':  15,    ← 15% chegirma
  'WELCOME20': 20,   ← 20% chegirma
};
Add your own codes the same way.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 WHAT'S INCLUDED & WORKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Landing page with animated canvas background
✅ Dark / Light theme toggle (saves preference)
✅ UZ / RU language switcher (saves preference)
✅ Background music player (add your mp3)
✅ Auto-register (free users sign up themselves)
✅ Login system with session management
✅ 20 modules × 30 questions = 600 DTM questions
✅ Full test engine: timer, options, scoring, review
✅ Correct answer explanations in review mode
✅ Results saved to browser (localStorage)
✅ Dashboard with statistics (tests, avg score, streak)
✅ AI Chat Bot powered by Claude API
✅ Payment page with card copy buttons + promo codes
✅ Modules overview page with topic breakdown
✅ Results history with full stats
✅ Profile page with plan info
✅ Mobile responsive (all pages)
✅ Pro / Free plan separation (locked modules)
✅ All buttons and links work


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 HOW TO DEPLOY (put online FREE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPTION 1 — Netlify (EASIEST, recommended):
  1. netlify.com ga boring → Sign up (free)
  2. "ariselabs2" papkasini drag & drop qiling
  3. 10 soniyada sayt jonli! URL: random-name.netlify.app
  4. Site settings → Change site name → "ariselabs" deb nomlang
  Result: ariselabs.netlify.app

OPTION 2 — GitHub Pages:
  1. github.com → New repository → name: "ariselabs"
  2. All files upload qiling
  3. Settings → Pages → Deploy from main → Save
  Result: username.github.io/ariselabs

CUSTOM DOMAIN (ariselabs.uz):
  1. nic.uz dan "ariselabs.uz" sotib oling (~$10/yil)
  2. Netlify → Domain settings → Add custom domain
  3. DNS ni Netlify ko'rsatmalariga moslashtiring


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 AI CHAT BOT NOTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The AI chat bot uses Claude API.
It works in claude.ai preview but needs API key for production.
For production deployment, add your Anthropic API key:
  → Create backend proxy (Node.js/Python) with your API key
  → Or use Cloudflare Workers as a proxy
This is Step 2 of the project (backend setup).


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© 2025 AriseLabs.uz — DTM Ingliz Tili Tayyorgarlik Platformasi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
