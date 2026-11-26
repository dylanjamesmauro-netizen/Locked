function safeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function safeSet(key, val) {
  try { localStorage.setItem(key, val); } catch (e) {}
  if (window.scheduleCloudSave) window.scheduleCloudSave();
}

function safeRemove(key) {
  try { localStorage.removeItem(key); } catch (e) {}
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

function makeCleverPNG() {
  var canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2f6fed';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('C', 32, 35);
  return canvas.toDataURL('image/png');
}

function launchAboutBlank() {
  var title = safeGet('siteTitle') || safeGet('customBrandName') || 'Locked';
  var icon = safeGet('siteIcon') || makeLockedPNG();
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
  var defaultTitle = safeGet('customBrandName') || 'Locked';
  var savedTitle = safeGet('siteTitle') || defaultTitle;
  var savedIcon = safeGet('siteIcon') || makeLockedPNG();
  document.title = savedTitle;
  try { if (window.top && window.top.document) window.top.document.title = savedTitle; } catch (e) {}
  [document, window.top ? window.top.document : null].forEach(function(d) {
    if (!d) return;
    try {
      d.querySelectorAll("link[rel*='icon']").forEach(function(el) { el.remove(); });
      var newLink = d.createElement('link');
      newLink.id = 'favicon';
      newLink.rel = 'icon';
      newLink.type = 'image/png';
      newLink.href = savedIcon;
      d.head.appendChild(newLink);
    } catch (e) {}
  });
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

function applyTheme() {
  var savedTheme = safeGet('siteTheme') || 'theme-purple-black';
  document.body.className = savedTheme;
  applyGlow();
  applyHoverTransforms();
  applyBgAnimation();
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

(function initLockedCloud() {
  var cachedUser = safeGet('cloudUsername');
  var sideText = document.getElementById('sidebar-account-text');
  if (sideText && cachedUser) sideText.innerText = '@' + cachedUser;

  var mod = document.createElement('script');
  mod.type = 'module';
  mod.textContent = [
    'import { initializeApp } from "https://gstatic.com";',
    'import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://gstatic.com";',
    'import { getFirestore, doc, setDoc, getDoc } from "https://gstatic.com";',
    'const firebaseConfig = {',
    '  apiKey: "AIzaSyAY0_NpSdl1jgO_mkBV5AeCAmpB56vznA4",',
    '  authDomain: "locked-site.firebaseapp.com",',
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
    'const syncKeys = ["siteTheme","mouseTracking","siteGlow","hoverTransforms","bgAnimation","tabDisguise","customTabTitle","siteTitle","urlDisguise","autoBlank"];',
    'window.saveSettingsToCloud = async function() {',
    '  if (!currentUser) return;',
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
    '        if (d.tabDisguise === "clever") localStorage.setItem("siteIcon", makeCleverPNG());',
    '        else localStorage.removeItem("siteIcon");',
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
