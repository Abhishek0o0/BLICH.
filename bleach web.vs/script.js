/* BLEACH-inspired demo site — vanilla JS, hash-routed SPA. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Content ---------- */
const FORMS = ['Human', 'Shinigami', 'First Bankai', 'Hollow'];
// Artwork per form (same order as FORMS). Use null to show the placeholder.
const FORM_IMGS = ['assets/images/ichigo_cutout.png', 'assets/images/ichigo_shinigami.png', 'assets/images/ichigo_bankai.png', 'assets/images/ichigo_hollow.png'];
const CHARACTERS = [
  ['Ichigo Kurosaki', 'ichigo_kurosaki', 'Substitute Soul Reaper', 'A teenager who sees spirits and takes on the duty of protecting the living.'],
  ['Rukia Kuchiki', 'rukia', 'Soul Reaper', 'The Soul Reaper who hands Ichigo her power and changes his life.'],
  ['Renji Abarai', 'renji', 'Lieutenant', 'A fierce fighter from the Rukongai who rose through the ranks by sheer will.'],
  ['Byakuya Kuchiki', 'byakuya', 'Captain', 'Composed head of a noble house, bound by rules and pride.'],
  ['Kisuke Urahara', 'urahara', 'Shopkeeper', 'A sharp-witted former captain who runs a quiet shop and plans ten steps ahead.'],
  ['Orihime Inoue', 'orihime', 'Human', 'A kind classmate whose healing powers grow as the danger does.']
];
const MANGA = [
  [1, 'Strawberry and the Soul Reapers', 'Ichigo meets Rukia and inherits a Soul Reaper’s power.'],
  [2, 'Goodbye Parakeet, Good Night My Sister', 'Ichigo faces new Hollows and learns what the job costs.'],
  [3, 'Memories in the Rain', 'Old wounds surface as the fights turn personal.'],
  [4, 'Quincy Archer Hates You', 'A rival with a bow forces Ichigo to sharpen his skills.'],
  [5, 'The Black Moon Rising', 'Ichigo trains hard as a bigger threat closes in.'],
  [6, 'The Death Trilogy Overture', 'The stakes rise and the Soul Society comes into view.']
];
const STORY = [
  ['Story Overview', 'Ichigo Kurosaki gains Soul Reaper powers and must balance school life with defending people from Hollows.'],
  ['Human World', 'Karakura Town is where Ichigo’s duty begins: quiet streets, ordinary friends, and spirits that most people never notice.'],
  ['Soul Society', 'Ichigo crosses into the world of the dead to save a friend and meets the captains who guard it.'],
  ['Arrancar', 'Hollows who have gained Soul Reaper-like power set their sights on the living world and Hueco Mundo.'],
  ['Thousand-Year Blood War', 'An old enemy returns and every faction must fight for the future of all worlds.']
];


// Long-form Story Overview text: [section title, [[lead-in, body], ...]]
const OVERVIEW = [
  ['The Human World and Soul Reaper Awakening', [
    ['The Substitute Soul Reaper Arc', `The story introduces 15-year-old Ichigo Kurosaki, whose life changes permanently when he meets Rukia Kuchiki, a Soul Reaper tasked with purifying corrupt spirits called Hollows and sending peaceful souls to the afterlife (Soul Society). When a powerful Hollow attacks Ichigo’s family, a wounded Rukia is forced to transfer her powers to him, inadvertently making him a Substitute Soul Reaper. Ichigo takes on her duties in Karakura Town, balancing high school life with exorcising monsters, while befriending classmates like Yasutora "Chad" Sado and Orihime Inoue—who awaken their own spiritual powers—and Uryu Ishida, a surviving member of the Quincy clan (an ancient order of human spiritual archers hostile to Soul Reapers).`]]],
  ['The Soul Society Infiltration and Civil Unrest', [
    ['The Soul Society: The Rescue Arc', `The narrative shifts to the spiritual plane after Rukia is arrested by her superiors and sentenced to death for illegally giving her powers to a human. Ichigo and his friends undergo rigorous training under the eccentric shopkeeper Kisuke Urahara—a disgraced former Soul Reaper Captain—before invading the heavily fortified Soul Society. Ichigo battles his way through the Gotei 13 (the military branches of the Soul Reaper world), mastering the ultimate sword release called Bankai just in time to stop Rukia's execution.`],
    ['The Great Betrayal', `The climax of the rescue reveals a massive conspiracy from within the Soul Society, orchestrated by Sosuke Aizen, the seemingly benevolent Captain of the 5th Division. Aizen fakes his own death, manipulates the entire military system, and steals the Hokyoku—a reality-warping artifact hidden inside Rukia's soul—before defecting to Hueco Mundo, the desert realm of the Hollows, alongside fellow treacherous Captains Gin Ichimaru and Kaname Tosen.`]]],
  ['The Arrancar War and Hueco Mundo Invasions', [
    ['The Arrancar and Hueco Mundo Arcs', `Aizen uses the Hokyoku to tear down the boundary between Soul Reapers and Hollows, creating an elite army of humanoid Hollows with Soul Reaper powers known as Arrancars, led by ten lethally powerful individuals called the Espada. To combat this hyper-escalated threat, Ichigo trains with the Visoreds—a group of rogue Soul Reapers who were victims of Aizen's past experiments and possess inner Hollow powers. The conflict turns deeply personal when Aizen kidnaps Orihime Inoue to exploit her reality-rejecting abilities, forcing Ichigo and a small strike team to invade Las Noches, Aizen's massive fortress in Hueco Mundo.`],
    ['The Battle of Karakura Town and Aizen’s Fall', `While Ichigo fights vicious battles against the top Espada in Hueco Mundo, Aizen brings his primary forces to the human world to destroy Karakura Town in order to forge the Oken (the King's Key) and assassinate the Soul King, the linchpin holding reality together. The Gotei 13 Captains engage the remaining Espada in a devastating war of attrition. Ichigo ultimately returns to the human world after undergoing specialized training to achieve the Final Getsuga Tensho, completely overwhelming Aizen at the cost of losing all of his own spiritual powers, allowing the scientist Kisuke Urahara to permanently seal Aizen away.`]]],
  ['The Lost Agent and Power Restoration', [
    ['The Fullbring Arc', `Deprived of his powers and living a mundane human life for seventeen months, Ichigo struggles with a profound sense of powerlessness and isolation. He is approached by Xcution, a secret society of humans known as Fullbringers who possess the ability to manipulate the souls of physical matter due to surviving Hollow attacks before birth. Led by Kujo Ginjo, Xcution trains Ichigo to manifest his own Fullbring to restore his Soul Reaper powers, but Ginjo eventually betrays Ichigo, stealing his newly formed abilities for himself. Just as Ichigo falls into despair, Rukia and the top officers of the Gotei 13 reappear, piercing Ichigo with a sword forged from their combined spiritual energies to fully restore his true Soul Reaper powers, leading to the swift defeat of Xcution.`]]],
  ['The Thousand-Year Blood War and Final Cosmic Conflict', [
    ['The Quincy Blood Warfare', `The final, most destructive era of the story begins when a hidden empire of Quincies known as the Wandenreich, led by the progenitor of all Quincies and son of the Soul King, Yhwach, emerges from the shadows of the Soul Society to wage a genocidal war of revenge. The Quincies launch a catastrophic surprise attack on the Soul Society, murdering Head Captain Yamamoto and sealing away the Soul Reapers' Bankai abilities. Ichigo is forced to retreat to the Royal Realm—the palace of the Soul King—where he learns the shocking truth of his heritage: his mother was a pure-blood Quincy, meaning his powers are a unique amalgamation of Soul Reaper, Hollow, and Quincy traits. Armed with newly forged dual Zanpakuto that represent his acceptance of his complete identity, Ichigo returns to the battlefield.`],
    ['The Fall of the Soul King and Ultimate Resolution', `Yhwach invades the Royal Realm, successfully assassinating and absorbing the Soul King to rewrite reality into a singular, deathless world where fear does not exist. Ichigo, alongside a reformed coalition of Soul Reapers, humans, Visoreds, and even surviving Espada and Fullbringers, wages a desperate final assault against Yhwach's elite guard. In a reality-shattering final confrontation, Ichigo joins forces with a temporarily freed Aizen and Uryu Ishida, utilizing a special silver arrowhead to briefly strip Yhwach of his omnipotent foresight, allowing Ichigo to deliver the killing blow, stabilizing the three realms and securing a lasting peace.`]]]
];

// Long text for the Human World card
const HUMAN_WORLD = `In Tite Kubo’s Bleach universe, the Human World (specifically focused on Karakura Town) operates under a rigid supernatural hierarchy governed by spiritual awareness and power, existing parallel to everyday human society. At the absolute foundation of this hierarchy are Ordinary Humans, who possess no spiritual awareness (Reiryoku), cannot see spirits, and remain entirely oblivious to the supernatural dangers around them. Just above them are Spirits (Plus souls), the ghosts of the deceased who wander the living world but lack the power to alter their environment, waiting to be guided to the Soul Society. A step higher are Spiritually Aware Humans—like Tatsuki Arisawa or Keigo Asano—who can perceive ghosts and Hollows but lack the combat ability or energy to defend themselves. Sitting firmly above them are Spiritually Empowered Humans, individuals like Yasutora "Chad" Sado and Orihime Inoue, whose latent powers were awakened by ambient spiritual energy, granting them unique, specialized combat abilities. Parallel to them are the Quincy, a distinct clan of spiritually potent humans who actively hunt Hollows by absorbing ambient spirit particles (Reishi) to manifest lethal spirit weapons. At the absolute peak of the Human World’s hierarchy are the Substitute Shinigami (Soul Reapers) like Ichigo Kurosaki, who bridge the gap between dimensions, wielding immense spiritual pressure and Zanpakutō to govern, protect, and maintain the ultimate cosmic balance within the living realm.`;

// Long text for the Soul Society card
const SOUL_SOCIETY = `In the Bleach anime, Soul Society operates under a rigid, highly stratified military and bureaucratic hierarchy that maintains the balance of souls between the living world and the afterlife. At the absolute apex sits the Soul King, a symbolic deity who stabilizes reality but holds no political power, leaving true governance to the Central 46, a council of judges and wise men who dictate all law and justice. Directly executing these laws is the military arm, divided into three specialized branches: the Gotei 13, the Kido Corps, and the Omnitsukidō (Stealth Force). The Gotei 13 is the primary defense force, organized into thirteen divisions, each commanded by a powerhouse Captain who possesses ultimate authority over their squad and answers only to the Head-Captain. Beneath each captain is a Lieutenant who acts as the second-in-command and manages daily operations, followed by ranked Seated Officers (from Third to Twentieth Seat) who lead the standard Foot Soldiers. Outside this military structure, the society is starkly divided by social class; the wealthy and influential Noble Houses (led by the Four Great Noble Families) enjoy immense political privilege, while the billions of ordinary souls reside in the Rukongai, a sprawling district where quality of life drastically plummets the further one moves from the aristocratic center of Seireitei.`;

// Long text for the Arrancar card
const ARRANCAR = `In the Bleach anime, the Arrancar are Hollows that have removed their masks to gain Soul Reaper-like powers, organized into a strict military hierarchy under the rogue Soul Reaper Sōsuke Aizen. At the absolute peak of this structure sits Aizen, who rules with unquestioned authority from his fortress, Las Noches, alongside his trusted commanders, Gin Ichimaru and Kaname Tōsen. Directly beneath Aizen’s leadership are the Espada, a group of the ten most powerful Arrancar numbered 0 through 9 based on their immense spiritual pressure. Each Espada commands their own direct subordinates known as Fracción, who serve as personal bodyguards and loyal soldiers in battle. Completely separate from the active military rankings are the Privaron Espada, former Espada who lost their two-digit rank and were demoted to three-digit numbers after Aizen replaced them with stronger Arrancar. Finally, the foundation of this hierarchy consists of the Números, the standard Arrancar soldiers combat-ranked from number 11 upward, and the Exequias, a specialized execution squad dedicated to eliminating intruders and disposal work.`;

// Long text for the Thousand-Year Blood War card: intro, a secondary point, and one line per cour
const TYBW = {
  intro: `The foundational layer introduces the catastrophic conflict between the Soul Reapers and the Quincy empire, known as the Wandenreich, led by the main antagonist, Yhwach.`,
  layer: `The secondary operational layer divides this massive war into distinct production and broadcasting blocks, allowing the studio to maintain exceptionally high animation quality.`,
  cours: [
    ['Cour 1:', `The Blood Warfare establishes the initial Quincy invasion of the Soul Society, resulting in devastating Soul Reaper losses and the destruction of the Seireitei.`],
    ['Cour 2:', `The Separation focuses on the Soul Reapers' counterattack, Ichigo Kurosaki's specialized training to forge his true Zanpakuto, and Uryu Ishida's shocking defection to the enemy side.`],
    ['Cour 3:', `The Conflict escalates the battle into the Royal Realm, pitting the elite Schutzstaffel against the Zero Division, while setting up the definitive climax for the fourth and final part.`]
  ]
};

/* ---------- Placeholder / image helper (falls back if the file is missing) ---------- */
// Optional per-character overrides (id -> image URL). Empty by default: images load from assets/images/<id>.png
const IMG_SRC = {};
const art = (id, label) => `<div class="portrait"><img src="${IMG_SRC[id] || `assets/images/${id}.png`}" alt="${esc(label)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;ph&quot;>${esc(label)}<br><small>assets/images/${id}.png</small></div>'"></div>`;

function renderContent() {
  $('#charGrid').innerHTML = CHARACTERS.map(([n, id, cat, d]) =>
    `<article class="card">${art(id, n)}<h3>${n}</h3><p>${d}</p><span class="chip">${cat}</span></article>`).join('');
  $('#mangaGrid').innerHTML = MANGA.map(([v, t, d]) =>
    `<article class="card"><div class="ph">Cover placeholder<br><small>Volume ${v}</small></div><span class="chip">Volume ${v}</span><h3>${t}</h3><p>${d}</p><button class="btn line" data-more="${v}">Read More</button></article>`).join('');
  // Story Overview (first card) holds the long text, collapsed behind a fade with a Read more toggle
  const overviewHtml = OVERVIEW.map(([title, items]) =>
    `<h4>${esc(title)}</h4>` + items.map(([lead, body]) => `<p><strong>${esc(lead)}.</strong> ${esc(body)}</p>`).join('')).join('');
  // Cards with long text: index -> {html, collapsed height in px}. Others show their short description.
  const LONG = { 0: { html: overviewHtml, h: 250 }, 1: { html: `<p>${esc(HUMAN_WORLD)}</p>`, h: 150 }, 2: { html: `<p>${esc(SOUL_SOCIETY)}</p>`, h: 150 }, 3: { html: `<p>${esc(ARRANCAR)}</p>`, h: 150 },
    4: { html: `<p>${esc(TYBW.intro)}</p><ul><li>${esc(TYBW.layer)}<ul>${TYBW.cours.map(([c, t]) => `<li><strong>${esc(c)}</strong> ${esc(t)}</li>`).join('')}</ul></li></ul>`, h: 150 } };
  $('#timeline').innerHTML = STORY.map(([t, d], i) => LONG[i]
    ? `<li class="foldcard"><h3>${t}</h3><div class="fold" id="fold${i}" style="--fold-h:${LONG[i].h}px"><div class="fold-inner">${LONG[i].html}</div></div><button class="btn line" data-fold="fold${i}" aria-expanded="false" aria-controls="fold${i}">Read more</button></li>`
    : `<li><h3>${t}</h3><p>${d}</p></li>`).join('');
  // One handler for every collapsible card: expand smoothly to the content height, or fold back
  $('#timeline').addEventListener('click', e => {
    const btn = e.target.closest('[data-fold]');
    if (!btn) return;
    const fold = document.getElementById(btn.dataset.fold), open = fold.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Show less' : 'Read more';
    fold.style.maxHeight = open ? fold.firstElementChild.scrollHeight + 'px' : '';
    if (!open) fold.closest('li').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  window.addEventListener('resize', () => $$('.fold.open').forEach(f => { f.style.maxHeight = f.firstElementChild.scrollHeight + 'px'; }));
  $('#mangaGrid').addEventListener('click', e => {
    const b = e.target.closest('[data-more]');
    if (b) b.textContent = 'Coming soon';
  });
}

/* ---------- Router ---------- */
const ROUTES = ['watch', 'characters', 'manga', 'storyline', 'login', 'signup'];
function route() {
  let r = location.hash.replace(/^#\/?/, '');
  if (r === 'logout') { signOut(); return; }
  if (!ROUTES.includes(r)) r = 'home';
  // Signed-in users don't need the auth forms
  if ((r === 'login' || r === 'signup') && currentUser()) { location.hash = '#/'; return; }
  $$('.page').forEach(p => { p.hidden = p.dataset.route !== r; });
  $$('nav [data-link]').forEach(a => a.classList.toggle('active', a.dataset.link === r));
  $('#nav').classList.remove('open');
  $('#menuToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}

/* ---------- Home: Ichigo form tabs + tab switching with a smooth slide/fade transition ---------- */
let formIdx = 0, formSeq = 0;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderTabs() {
  $('#tabs').innerHTML = FORMS.map((f, i) => `<button role="tab" aria-selected="${i === formIdx}" data-i="${i}">${f}</button>`).join('');
  $('#heroPh').innerHTML = `<span>Ichigo — ${FORMS[formIdx]}<br><small>artwork placeholder</small></span>`;
}
// Swap the picture for the current form (called between the "out" and "in" animations)
function applyArt() {
  const img = $('#heroImg'), src = FORM_IMGS[formIdx];
  $('.hero-art').dataset.form = formIdx; // lets CSS align each form's artwork differently
  if (!img) return;
  img.hidden = !src;
  if (src) { img.src = src; img.alt = `Ichigo Kurosaki — ${FORMS[formIdx]} form`; }
}
/* dir: 1 = next (art exits left, new art enters from the right), -1 = previous */
async function setForm(i, dir) {
  const next = (i + FORMS.length) % FORMS.length;
  if (next === formIdx) return;
  dir = dir || (next > formIdx ? 1 : -1);
  const seq = ++formSeq, fig = $('.hero-art'), img = $('#heroImg');
  formIdx = next;
  renderTabs();                                   // tabs respond instantly
  if (reduceMotion) { applyArt(); return; }
  fig.getAnimations().forEach(a => a.cancel());
  // 1) current art slides out and fades
  await fig.animate(
    [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-50 * dir}px) scale(.96)` }],
    { duration: 220, easing: 'ease-in', fill: 'forwards' }
  ).finished.catch(() => {});
  if (seq !== formSeq) return;                    // a newer click took over
  // 2) swap the picture while it is invisible, wait until it is decoded
  applyArt();
  if (img && !img.hidden) { try { await img.decode(); } catch {} }
  if (seq !== formSeq) return;
  // 3) new art slides in from the opposite side
  fig.getAnimations().forEach(a => a.cancel());
  fig.animate(
    [{ opacity: 0, transform: `translateX(${50 * dir}px) scale(.96)` }, { opacity: 1, transform: 'none' }],
    { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)' }
  );
}
$('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) setForm(+b.dataset.i); });

/* ==========================================================
   AUTH — FRONTEND DEMO ONLY.
   Users and passwords live in localStorage in PLAIN TEXT.
   This is NOT secure and must NEVER be used as production
   authentication. Real apps need a server, hashed passwords
   and secure sessions.
   ========================================================== */
const USERS_KEY = 'bleach_users', SESSION_KEY = 'bleach_session';
const getUsers = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } };
const currentUser = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } };

function renderAuth() {
  const u = currentUser();
  $('#auth').innerHTML = u
    ? `<span class="avatar" aria-hidden="true">${esc(u.name[0].toUpperCase())}</span><span>${esc(u.name)}</span><button id="signOutBtn">Sign Out</button>`
    : `<a href="#/login">Sign In</a><a class="solid" href="#/signup">Sign Up</a>`;
}
function startSession(u) { localStorage.setItem(SESSION_KEY, JSON.stringify({ name: u.name, email: u.email })); renderAuth(); location.hash = '#/'; }
function signOut() { localStorage.removeItem(SESSION_KEY); renderAuth(); location.hash = '#/'; route(); }
$('#auth').addEventListener('click', e => { if (e.target.id === 'signOutBtn') signOut(); });

$('#signupForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), name = f.get('name').trim(), email = f.get('email').trim().toLowerCase(), pw = f.get('password'), err = $('#signupError');
  const fail = m => { err.textContent = m; };
  if (!name) return fail('Enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Enter a valid email address.');
  if (pw.length < 6) return fail('Password must be at least 6 characters.');
  if (pw !== f.get('confirm')) return fail('Passwords do not match.');
  const users = getUsers();
  if (users.some(u => u.email === email)) return fail('That email is already registered. Sign in instead.');
  const user = { name, email, password: pw };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  err.textContent = ''; e.target.reset();
  startSession(user);
});
$('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), email = f.get('email').trim().toLowerCase();
  const user = getUsers().find(u => u.email === email && u.password === f.get('password'));
  if (!user) { $('#loginError').textContent = 'Email or password is incorrect.'; return; }
  $('#loginError').textContent = ''; e.target.reset();
  startSession(user);
});

/* ---------- Watch: local video + image upload (object URLs, no server) ---------- */
const clips = ['Episode 01', 'Episode 02', 'Episode 03', 'Trailer', 'Clip'].map(label => ({ label, url: null, file: '' }));
let selected = 0, activeUrl = null;
const video = $('#video');

function renderClips() {
  $('#clips').innerHTML = clips.map((c, i) =>
    `<li><button data-i="${i}" ${i === selected ? 'aria-current="true"' : ''}><span>${c.label}</span><span>${c.url ? esc(c.file) : 'Empty — upload a file'}</span></button></li>`).join('');
}
function playClip(i) {
  selected = i;
  const c = clips[i];
  if (c.url) {
    video.src = c.url; video.hidden = false; $('#playerEmpty').hidden = true;
    video.play().catch(() => {}); // autoplay may be blocked; controls still work
    $('#now').textContent = `Now playing: ${c.label} (${c.file})`;
  } else {
    $('#now').textContent = `${c.label} is empty. Choose a video file to load it here.`;
  }
  renderClips();
}
$('#clips').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) playClip(+b.dataset.i); });
$('#videoInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('video/')) { $('#now').textContent = 'That file is not a video.'; return; }
  // Load into the selected slot, or the first empty slot if this one is taken
  let i = clips[selected].url ? clips.findIndex(c => !c.url) : selected;
  if (i < 0) i = selected;
  if (clips[i].url) URL.revokeObjectURL(clips[i].url);
  clips[i] = { label: clips[i].label, url: URL.createObjectURL(file), file: file.name };
  playClip(i);
});
$('#imageInput').addEventListener('change', e => {
  const file = e.target.files[0], img = $('#imagePreview');
  if (!file || !file.type.startsWith('image/')) return;
  if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
  img.src = URL.createObjectURL(file); img.hidden = false;
});

/* ---------- Mobile menu ---------- */
$('#menuToggle').addEventListener('click', () => {
  const open = $('#nav').classList.toggle('open');
  $('#menuToggle').setAttribute('aria-expanded', open);
});

/* ---------- Init ---------- */
renderContent(); renderTabs(); applyArt(); renderClips(); renderAuth(); route();
window.addEventListener('hashchange', route);