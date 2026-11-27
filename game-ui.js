var activeCat = 'All', activeGame = null;
function getList(k) {
  try { return JSON.parse(localStorage.getItem(k) || '[]'); }
  catch (e) { return []; }
}
function saveList(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
}
function isFav(id) {
  return getList('lockedFavGames').indexOf(id) !== -1;
}
function toggleFav(id, e) {
  if (e) e.stopPropagation();
  var f = getList('lockedFavGames'), i = f.indexOf(id);
  if (i === -1) f.push(id); else f.splice(i, 1);
  saveList('lockedFavGames', f); renderAll();
  if (activeGame && activeGame.id === id) {
    document.getElementById('p-fav-btn').innerText = isFav(id) ? '★' : '☆';
  }
}
function buildCard(g, cls) {
  var card = document.createElement('div');
  card.className = 'game-card ' + (cls || '');
  card.style.background = g.bg;
  card.onclick = function() { openGamePlayer(g.id); };
  card.innerHTML = '<div class="game-top-overlay"><div>' +
    g.tags.map(function(t) {
      return '<span class="game-tag-pill">' + t + '</span>';
    }).join('') +
    '</div><button class="game-fav-btn" onclick="toggleFav(\'' +
    g.id + '\',event)">' + (isFav(g.id) ? '★' : '☆') + '</button></div>' +
    '<div class="game-art"><div class="game-emoji">' + g.emoji +
    '</div><div class="game-art-label">' + g.title.toUpperCase() +
    '</div></div><div class="game-bottom-overlay"><div class="game-card-title">' +
    g.title + '</div><div class="game-views-pill">👁 ' + g.views + '</div></div>';
  return card;
}
function renderPills() {
  var box = document.getElementById('cat-pills'); box.innerHTML = '';
  var list = window.GAMES || [];
  ['All', 'Favorites', 'Single Player', 'Arcade', 'Casual',
   'Puzzle', 'Action', 'Sports', 'Clicker'].forEach(function(cat) {
    var cnt = cat === 'All' ? list.length :
      cat === 'Favorites' ? getList('lockedFavGames').length :
      list.filter(function(g) { return g.tags.indexOf(cat) !== -1; }).length;
    var btn = document.createElement('button');
    btn.className = 'cat-pill' + (cat === activeCat ? ' active' : '');
    btn.innerText = cat + ' ' + cnt;
    btn.onclick = function() { activeCat = cat; renderAll(); };
    box.appendChild(btn);
  });
}
function renderAll() {
  var list = window.GAMES || [];
  renderPills();
  var grid = document.getElementById('games-grid');
  if (!list.length) {
    grid.innerHTML = '<div style="color:#f87171;font-weight:700;">' +
      'Error: games-data.js did not load. Check filename or syntax!</div>';
    return;
  }
  var recIds = getList('lockedRecentGames');
  var recBox = document.getElementById('recent-box');
  var recRow = document.getElementById('recent-row');
  recRow.innerHTML = '';
  var recGames = recIds.map(function(id) {
    return list.find(function(g) { return g.id === id; });
  }).filter(Boolean);
  recBox.style.display = recGames.length ? 'block' : 'none';
  recGames.forEach(function(g) { recRow.appendChild(buildCard(g, 'rec-card')); });
  var popRow = document.getElementById('pop-row'); popRow.innerHTML = '';
  list.slice(0, 5).forEach(function(g) { popRow.appendChild(buildCard(g, 'pop-card')); });
  var q = (document.getElementById('games-search').value || '').toLowerCase();
  document.getElementById('games-heading').innerText =
    activeCat === 'All' ? 'All Games' : activeCat;
  grid.innerHTML = '';
  list.filter(function(g) {
    return (!q || g.title.toLowerCase().indexOf(q) !== -1) &&
      (activeCat === 'All' || (activeCat === 'Favorites' ?
        isFav(g.id) : g.tags.indexOf(activeCat) !== -1));
  }).forEach(function(g) { grid.appendChild(buildCard(g, '')); });
}
function scrollRow(id, dx) { document.getElementById(id).scrollLeft += dx; }
function openGamePlayer(id) {
  var g = (window.GAMES || []).find(function(x) { return x.id === id; });
  if (!g) return;
  activeGame = g;
  var rec = getList('lockedRecentGames').filter(function(x) { return x !== id; });
  rec.unshift(id); saveList('lockedRecentGames', rec.slice(0, 10));
  document.getElementById('games-browse-view').style.display = 'none';
  document.getElementById('player-view').style.display = 'flex';
  document.getElementById('p-title').innerText = g.title;
  document.getElementById('p-fav-btn').innerText = isFav(g.id) ? '★' : '☆';
  document.getElementById('p-views').innerText = '👁 ' + g.views;
  document.getElementById('p-likes').innerText = g.likes;
  document.getElementById('p-dislikes').innerText = g.dislikes;
  var frame = document.getElementById('game-iframe'); frame.srcdoc = g.html;
  setTimeout(function() { try { frame.contentWindow.focus(); } catch (e) {} }, 80);
}
function closeGamePlayer() {
  document.getElementById('game-iframe').srcdoc = '';
  document.getElementById('player-view').style.display = 'none';
  document.getElementById('games-browse-view').style.display = 'flex';
  activeGame = null; renderAll();
}
function togglePlayerFav() { if (activeGame) toggleFav(activeGame.id); }
function bumpStat(k) {
  if (!activeGame) return; activeGame[k]++;
  document.getElementById('p-' + k).innerText = activeGame[k];
}
function toggleGameFullscreen() {
  var st = document.getElementById('player-stage');
  if (!document.fullscreenElement) st.requestFullscreen();
  else document.exitFullscreen();
}
window.addEventListener('DOMContentLoaded', renderAll);
