// Helper to draw the blue "C" icon
function makeCleverPNG() {
  let canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2f6fed';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('C', 32, 35);
  return canvas.toDataURL('image/png');
}

// Launch into about:blank automatically on startup
function launchAboutBlank() {
  let title = localStorage.getItem('siteTitle') || 'Resources';
  let icon = localStorage.getItem('siteIcon') || makeCleverPNG();
  let homeUrl = new URL('index.html', location.href).href;

  let win = window.open('about:blank', '_blank');
  if (!win) return false; // Blocked by pop-up blocker

  let doc = win.document;
  doc.open();
  doc.write('<!DOCTYPE html><html><head><title>' + title + '</title></head><body style="margin:0;overflow:hidden;background:black;"></body></html>');
  doc.close();

  let link = doc.createElement('link');
  link.rel = 'shortcut icon';
  link.type = 'image/png';
  link.href = icon;
  doc.head.appendChild(link);

  let iframe = doc.createElement('iframe');
  iframe.src = homeUrl;
  iframe.style.cssText = 'border:none;width:100vw;height:100vh;';
  doc.body.appendChild(iframe);

  // Redirect the original tab to Clever so history/tab looks clean
  location.replace('https://clever.com');
  return true;
}

// Auto-launch if enabled and NOT already inside the about:blank iframe
let autoBlank = localStorage.getItem('autoBlank') !== 'false'; // On by default
if (autoBlank && window.self === window.top) {
  launchAboutBlank();
}

// Apply saved Tab Cloak ("Resources" + blue C icon)
function applyCloak() {
  let savedTitle = localStorage.getItem('siteTitle');
  let savedIcon = localStorage.getItem('siteIcon');
  if (savedTitle) document.title = savedTitle;

  if (savedIcon) {
    let oldLink = document.getElementById('favicon');
    if (oldLink) oldLink.remove();

    let newLink = document.createElement('link');
    newLink.id = 'favicon';
    newLink.rel = 'shortcut icon';
    newLink.type = 'image/png';
    newLink.href = savedIcon;
    document.head.appendChild(newLink);
  }
}

// Apply saved Theme Color
function applyTheme() {
  let savedBg = localStorage.getItem('siteBg');
  if (savedBg) document.body.style.background = savedBg;
}

applyCloak();
applyTheme();

// Games page search filter
function filterGames() {
  let searchInput = document.getElementById('search');
  if (!searchInput) return;
  let text = searchInput.value.toLowerCase();
  document.querySelectorAll('.game').forEach(g => {
    g.style.display = g.innerText.toLowerCase().includes(text) ? 'block' : 'none';
  });
}

let query = new URLSearchParams(location.search).get('q');
if (query && document.getElementById('search')) {
  document.getElementById('search').value = query;
  filterGames();
}

// AI Helper chat logic
function sendMessage() {
  let input = document.getElementById('user-input');
  let box = document.getElementById('chat-box');
  if (!input || !box) return;

  let text = input.value.trim();
  if (!text) return;

  box.innerHTML += `<p><b>You:</b> ${text}</p>`;
  let reply = getAIReply(text.toLowerCase());
  box.innerHTML += `<p style="color:#60a5fa;"><b>AI:</b> ${reply}</p>`;

  input.value = '';
  box.scrollTop = box.scrollHeight;
}

function getAIReply(msg) {
  if (msg.includes('hello') || msg.includes('hi')) return 'Hey there! Ready to play some games?';
  if (msg.includes('game') || msg.includes('recommend')) return 'Check out the Games tab on the left! You can also use the search bar to find titles.';
  if (msg.includes('joke')) return 'Why did the computer go to the doctor? Because it caught a virus!';
  if (msg.includes('who made') || msg.includes('about')) return 'This site was coded from scratch in HTML, CSS, and JavaScript!';
  return 'I am still learning! Try asking me for a "game", a "joke", or "about" this site.';
}
