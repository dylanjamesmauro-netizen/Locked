function safeGet(key) {
  try {
    var sess = sessionStorage.getItem(key);
    if (sess !== null) return sess;
    return localStorage.getItem(key);
  } catch (e) { return null; }
}

function safeSet(key, val) {
  try {
    if (sessionStorage.getItem('lockedNoSave') === 'true') {
      sessionStorage.setItem(key, val);
      return;
    }
    localStorage.setItem(key, val);
  } catch (e) {}
  if (window.scheduleCloudSave) window.scheduleCloudSave();
}

function safeRemove(key) {
  try {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch (e) {}
  if (window.scheduleCloudSave) window.scheduleCloudSave();
}

function drawRoundedBox(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

function makeLockedPNG() {
  var t = safeGet('siteTheme') || 'theme-purple-black';
  var bgMap = {
    'theme-black-white': '#ffffff',
    'theme-blue-black': '#1d4ed8',
    'theme-green-black': '#059669',
    'theme-purple-black': '#6d28d9',
    'theme-purple-blue': '#4f46e5'
  };
  var isLightBg = (t === 'theme-black-white');
  var canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = bgMap[t] || '#6d28d9';
  drawRoundedBox(ctx, 0, 0, 64, 64, 16);
  ctx.fillStyle = isLightBg ? 'rgba(5, 5, 5, 0.55)' : 'rgba(255, 255, 255, 0.65)';
  drawRoundedBox(ctx, 29, 11, 24, 32, 6);
  ctx.fillStyle = isLightBg ? '#050505' : '#ffffff';
  drawRoundedBox(ctx, 11, 16, 24, 32, 6);
  return canvas.toDataURL('image/png');
}

function makeBadgePNG(bg, text, textColor, fontSize) {
  var canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = bg;
  drawRoundedBox(ctx, 0, 0, 64, 64, 14);
  ctx.fillStyle = textColor || '#ffffff';
  ctx.font = 'bold ' + (fontSize || 42) + 'px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 32, 34);
  return canvas.toDataURL('image/png');
}

function makeCleverPNG() { return makeBadgePNG('#2f6fed', 'C', '#ffffff', 46); }
function makeClassroomPNG() { return makeBadgePNG('#0f9d58', 'GC', '#ffffff', 30); }
function makeCanvasPNG() { return makeBadgePNG('#e13f29', '✦', '#ffffff', 44); }
function makeKhanPNG() { return makeBadgePNG('#14bf96', 'KA', '#ffffff', 30); }
function makeDrivePNG() { return makeBadgePNG('#fbbc04', '▲', '#1f2937', 40); }
function makeSlidesPNG() { return makeBadgePNG('#f4b400', '▣', '#ffffff', 40); }
function makeDocsPNG() { return makeBadgePNG('#4285f4', '≡', '#ffffff', 46); }
function makeEdpuzzlePNG() { return makeBadgePNG('#00b4ff', 'ep', '#ffffff', 34); }
function makeKahootPNG() { return makeBadgePNG('#46178f', 'K!', '#ffffff', 38); }
function resolveFaviconInput(raw) {
  var clean = (raw || '').trim();
  if (!clean) return '';
  if (clean.indexOf('data:image') === 0) return clean;
  if (/\.(png|ico|jpg|jpeg|svg|gif|webp)(\?.*)?$/i.test(clean)) {
    return /^https?:\/\//i.test(clean) ? clean : 'https://' + clean;
  }
  var host = clean.replace(/^https?:\/\//i, '').split('/')[0].split('?')[0];
  return 'https://google.com' + encodeURIComponent(host);
}

var TAB_DISGUISES = {
  none: { label: 'None', title: 'Locked' },
  clever: { label: 'Clever', title: 'Clever | Portal' },
  classroom: { label: 'Google Classroom', title: 'Home - Classroom' },
  canvas: { label: 'Canvas', title: 'Dashboard' },
  khan: { label: 'Khan Academy', title: 'Dashboard | Khan Academy' },
  drive: { label: 'Google Drive', title: 'My Drive - Google Drive' },
  slides: { label: 'Google Slides', title: 'Google Slides' },
  docs: { label: 'Google Docs', title: 'Google Docs' },
  edpuzzle: { label: 'Edpuzzle', title: 'Edpuzzle' },
  kahoot: { label: 'Kahoot', title: 'Enter Game PIN - Kahoot!' },
  custom: { label: 'Custom', title: 'Locked' }
};

function getDisguiseIcon(key) {
  if (key === 'clever') return makeCleverPNG();
  if (key === 'classroom') return makeClassroomPNG();
  if (key === 'canvas') return makeCanvasPNG();
  if (key === 'khan') return makeKhanPNG();
  if (key === 'drive') return makeDrivePNG();
  if (key === 'slides') return makeSlidesPNG();
  if (key === 'docs') return makeDocsPNG();
  if (key === 'edpuzzle') return makeEdpuzzlePNG();
  if (key === 'kahoot') return makeKahootPNG();
  if (key === 'custom') return safeGet('customTabIcon') || makeLockedPNG();
  return makeLockedPNG();
}

function setPageFavicon(iconHref) {
  var href = iconHref || makeLockedPNG();
  var docs = [document];
  try { if (window.top && window.top.document && window.top.document !== document) docs.push(window.top.document); } catch (e) {}
  docs.forEach(function(d) {
    if (!d || !d.head) return;
    try {
      var oldLinks = d.querySelectorAll("link[rel*='icon']");
      for (var i = 0; i < oldLinks.length; i++) oldLinks[i].parentNode.removeChild(oldLinks[i]);
      var link = d.createElement('link');
      link.id = 'favicon';
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = href;
      d.head.appendChild(link);
    } catch (e) {}
  });
}

function launchAboutBlank() {
  var disKey = safeGet('tabDisguise') || 'none';
  var title = safeGet('siteTitle') || safeGet('customBrandName') || 'Locked';
  var icon = safeGet('siteIcon') || getDisguiseIcon(disKey);
  var homeUrl = new URL('index.html', location.href).href;
  var win = window.open('about:blank', '_blank');
  if (!win) return false;
  var doc = win.document;
  doc.title = title;
  var link = doc.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = icon;
  doc.head.appendChild(link);
  doc.body.style.margin = '0';
  doc.body.style.overflow = 'hidden';
  doc.body.style.background = 'black';
  var iframe = doc.createElement('iframe');
  iframe.src = homeUrl;
  iframe.style.cssText = 'border:none;width:100vw;height:100vh;';
  doc.body.appendChild(iframe);
  var redirectTarget = ['https:', '', 'clever.com'].join('/');
  location.replace(redirectTarget);
  return true;
}

var autoBlank = safeGet('autoBlank') === 'true';
if (autoBlank && window.self === window.top) {
  launchAboutBlank();
}
function applyCloak() {
  var disKey = safeGet('tabDisguise') || 'none';
  var defaultTitle = safeGet('customBrandName') || 'Locked';
  var savedTitle = safeGet('siteTitle') || ((TAB_DISGUISES[disKey] && disKey !== 'none' && disKey !== 'custom') ? TAB_DISGUISES[disKey].title : defaultTitle);
  var savedIcon = (disKey === 'none') ? makeLockedPNG() : (safeGet('siteIcon') || getDisguiseIcon(disKey));
  document.title = savedTitle;
  try { if (window.top && window.top.document) window.top.document.title = savedTitle; } catch (e) {}
  setPageFavicon(savedIcon);
}

function applyGlow() {
  var glowOn = safeGet('siteGlow') !== 'false';
  document.body.classList.toggle('no-glow', !glowOn);
}

function applyHoverTransforms() {
  var hoverOn = safeGet('hoverTransforms') !== 'false';
  document.body.classList.toggle('no-hover-transform', !hoverOn);
}

function applyBgAnimation() {
  var animOn = safeGet('bgAnimation') !== 'false';
  document.body.classList.toggle('no-bg-anim', !animOn);
}

function applyParticles() {
  var enabled = safeGet('particleEffects') !== 'false';
  var canvas = document.getElementById('bg-particles');
  if (!enabled) {
    if (canvas) canvas.style.display = 'none';
    window._particlesRunning = false;
    return;
  }
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-particles';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1;';
    document.body.insertBefore(canvas, document.body.firstChild);
    var contentEl = document.querySelector('.content, .ai-container');
    if (contentEl && getComputedStyle(contentEl).position === 'static') {
      contentEl.style.position = 'relative';
      contentEl.style.zIndex = '2';
    }
    var ctx = canvas.getContext('2d');
    var dots = [];
    function spawnParticles() {
      var w = window.innerWidth || document.documentElement.clientWidth || 1280;
      var h = window.innerHeight || document.documentElement.clientHeight || 720;
      canvas.width = w;
      canvas.height = h;
      if (dots.length === 0) {
        for (var i = 0; i < 95; i++) {
          var sizeRoll = Math.random();
          var radius = sizeRoll < 0.65 ? (Math.random() * 1.3 + 0.8) : (sizeRoll < 0.9 ? (Math.random() * 1.6 + 2.0) : (Math.random() * 1.4 + 3.4));
          dots.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: radius,
            vx: (Math.random() - 0.5) * 0.35,
            vy: -(Math.random() * 0.35 + 0.12),
            a: Math.random() * 0.45 + 0.25
          });
        }
      }
    }
    spawnParticles();
    window.addEventListener('resize', spawnParticles);
    window._renderParticles = function() {
      if (!window._particlesRunning) return;
      var w = canvas.width;
      var h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < dots.length; i++) {
        var p = dots[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(window._renderParticles);
    };
  }
  canvas.style.display = 'block';
  if (!window._particlesRunning) {
    window._particlesRunning = true;
    requestAnimationFrame(window._renderParticles);
  }
}

function applyBarPlacement() {
  var placement = safeGet('barPlacement') || 'sidebar';
  document.body.classList.remove('bar-sidebar', 'bar-topbar', 'bar-bottombar');
  document.body.classList.add('bar-' + placement);
}

function applyTheme() {
  var savedTheme = safeGet('siteTheme') || 'theme-purple-black';
  document.body.className = savedTheme;
  applyBarPlacement();
  applyGlow();
  applyHoverTransforms();
  applyBgAnimation();
  applyParticles();
  applyCloak();
}

function applyCustomBrand() {
  var customName = safeGet('customBrandName');
  if (customName) {
    document.querySelectorAll('.brand-name').forEach(function(el) { el.innerText = customName; });
  }
}

function initMouseTracking() {
  var glow = document.getElementById('mouse-highlight');
  if (!glow) {
    glow = document.createElement('div');
    glow.id = 'mouse-highlight';
    document.body.appendChild(glow);
  }
  var enabled = safeGet('mouseTracking') !== 'false';
  glow.style.display = enabled ? 'block' : 'none';
  if (!window._mouseTrackerBound) {
    window._mouseTrackerBound = true;
    document.addEventListener('mousemove', function(e) {
      var el = document.getElementById('mouse-highlight');
      if (!el || safeGet('mouseTracking') === 'false') return;
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.opacity = '1';
    });
    document.addEventListener('mouseleave', function() {
      var el = document.getElementById('mouse-highlight');
      if (el) el.style.opacity = '0';
    });
  }
}

applyTheme();
applyCustomBrand();
initMouseTracking();
window.addEventListener('DOMContentLoaded', function() {
  applyCloak();
  applyParticles();
});
function filterGames() {
  var searchInput = document.getElementById('search');
  if (!searchInput) return;
  var text = searchInput.value.toLowerCase();
  document.querySelectorAll('.game').forEach(function(g) {
    g.style.display = g.innerText.toLowerCase().includes(text) ? 'block' : 'none';
  });
}

var query = new URLSearchParams(location.search).get('q');
if (query && document.getElementById('search')) {
  document.getElementById('search').value = query;
  filterGames();
}

document.addEventListener('keydown', function(e) {
  if (window._recordingPanicKey) return;
  var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var panicKey = safeGet('panicKey');
  if (panicKey && e.key.toLowerCase() === panicKey.toLowerCase()) {
    e.preventDefault();
    var panicUrl = safeGet('panicUrl') || 'https://clever.com';
    if (!/^https?:\/\//i.test(panicUrl)) panicUrl = 'https://' + panicUrl;
    try { window.top.location.replace(panicUrl); } catch (err) { location.replace(panicUrl); }
  }
});

(function initLockedCloud() {
  var cachedUser = safeGet('cloudUsername');
  var sideText = document.getElementById('sidebar-account-text');
  if (sideText && cachedUser) sideText.innerText = '@' + cachedUser;

  window._cloudReady = false;
  window._cloudError = null;

  if (location.protocol === 'file:') {
    window._cloudError = 'Cloud accounts require a web link (https:// or localhost) instead of opening a local file:// directly.';
    return;
  }

  var mod = document.createElement('script');
  mod.type = 'module';
  mod.onerror = function() {
    window._cloudError = 'Firebase SDK blocked or offline.';
  };
  mod.textContent = [
    'import { initializeApp } from "https://gstatic.com";',
    'import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://gstatic.com";',
    'import { getFirestore, doc, setDoc, getDoc } from "https://gstatic.com";',
    'const firebaseConfig = {',
    '  apiKey: "AIzaSyAY0_NpSdl1jgO_mkBV5AeCAmpB56vznA4",',
    '  authDomain: "://firebaseapp.com",',
    '  projectId: "locked-site",',
    '  storageBucket: "locked-site.firebasestorage.app",',
    '  messagingSenderId: "361457418029",',
    '  appId: "1:361457418029:web:93a5e13217ac6ddae11da4",',
    '  measurementId: "G-3JMJVLZDLB"',
    '};',
    'const app = initializeApp(firebaseConfig);',
    'const auth = getAuth(app);',
    'const db = getFirestore(app);',
    'let currentUser = null;',
    'let saveTimer = null;',
    'const syncKeys = ["siteTheme","barPlacement","mouseTracking","siteGlow","hoverTransforms","bgAnimation","particleEffects","tabDisguise","customTabTitle","customTabIcon","siteTitle","siteIcon","urlDisguise","autoBlank","panicKey","panicUrl"];',
    'window.saveSettingsToCloud = async function() {',
    '  if (!currentUser || sessionStorage.getItem("lockedNoSave") === "true") return;',
    '  const data = { username: currentUser.email.split("@")[0] };',
    '  syncKeys.forEach(k => { const v = localStorage.getItem(k); if (v !== null) data[k] = v; });',
    '  try { await setDoc(doc(db, "users", currentUser.uid), data, { merge: true }); } catch (e) {}',
    '};',
    'window.scheduleCloudSave = function() {',
    '  if (!currentUser) return;',
    '  clearTimeout(saveTimer);',
    '  saveTimer = setTimeout(() => window.saveSettingsToCloud(), 500);',
    '};',
    'window.cloudSignUp = async function(username, password) {',
    '  try {',
    '    const cred = await createUserWithEmailAndPassword(auth, username + "@locked.local", password);',
    '    currentUser = cred.user;',
    '    localStorage.setItem("cloudUsername", username);',
    '    await window.saveSettingsToCloud();',
    '    return { ok: true };',
    '  } catch (e) {',
    '    return { ok: false, error: e.message.replace("Firebase: ", "") };',
    '  }',
    '};',
    'window.cloudSignIn = async function(username, password) {',
    '  try {',
    '    const cred = await signInWithEmailAndPassword(auth, username + "@locked.local", password);',
    '    currentUser = cred.user;',
    '    localStorage.setItem("cloudUsername", username);',
    '    return { ok: true };',
    '  } catch (e) {',
    '    return { ok: false, error: e.message.replace("Firebase: ", "") };',
    '  }',
    '};',
    'window.cloudSignOut = async function() {',
    '  await signOut(auth);',
    '  localStorage.removeItem("cloudUsername");',
    '};',
    'window._cloudReady = true;',
    'onAuthStateChanged(auth, async (user) => {',
    '  currentUser = user;',
    '  const sideText = document.getElementById("sidebar-account-text");',
    '  const outView = document.getElementById("logged-out-view");',
    '  const inView = document.getElementById("logged-in-view");',
    '  if (user) {',
    '    const uname = user.email.split("@")[0];',
    '    localStorage.setItem("cloudUsername", uname);',
    '    if (sideText) sideText.innerText = "@" + uname;',
    '    if (outView) outView.style.display = "none";',
    '    if (inView) {',
    '      inView.style.display = "block";',
    '      document.getElementById("profile-username").innerText = "@" + uname;',
    '      document.getElementById("profile-initial").innerText = uname[0].toUpperCase();',
    '    }',
    '    try {',
    '      const snap = await getDoc(doc(db, "users", user.uid));',
    '      if (snap.exists()) {',
    '        const d = snap.data();',
    '        syncKeys.forEach(k => { if (d[k] !== undefined) localStorage.setItem(k, d[k]); });',
    '        applyTheme();',
    '        initMouseTracking();',
    '      }',
    '    } catch (e) {}',
    '  } else {',
    '    localStorage.removeItem("cloudUsername");',
    '    if (sideText) sideText.innerText = "Sign In";',
    '    if (outView) outView.style.display = "block";',
    '    if (inView) inView.style.display = "none";',
    '  }',
    '});'
  ].join('\n');
  document.body.appendChild(mod);
})();
