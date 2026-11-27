function makeGameThumb(c1, c2, badge, title) {
  var canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 300;
  var ctx = canvas.getContext('2d');
  var grad = ctx.createLinearGradient(0, 0, 480, 300);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 480, 300);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.arc(410, 60, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(70, 260, 90, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 74px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(badge, 240, 125);
  ctx.font = '900 32px Arial, sans-serif';
  ctx.fillText(title.toUpperCase(), 240, 210);
  return canvas.toDataURL('image/png');
}
function buildGameDoc(bodyMarkup, jsLines) {
  var openS = '<' + 'script>';
  var closeS = '<' + '/script>';
  var bodyStyle = [
    'margin:0',
    'background:#070913',
    'color:#fff',
    'font-family:system-ui,sans-serif',
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'justify-content:center',
    'height:100vh',
    'overflow:hidden',
    'user-select:none'
  ].join(';');
  return '<!DOCTYPE html><html><body style="' + bodyStyle + '">' +
    bodyMarkup + openS + jsLines.join('\n') + closeS + '</body></html>';
}

var STARTER_GAMES = [];
STARTER_GAMES.push({
  id: 'snake',
  title: 'Snake',
  tags: ['Arcade', 'Classic'],
  views: '84.2k',
  likes: 912,
  dislikes: 24,
  thumb: makeGameThumb('#059669', '#064e3b', '🐍', 'Snake'),
  html: buildGameDoc(
    '<div style="margin-bottom:8px;font-weight:700;">Score: <span id="s">0</span> | Arrows / WASD</div>' +
    '<canvas id="c" width="400" height="400" style="border:2px solid #10b981;border-radius:10px;background:#0f172a;"></canvas>',
    [
      'var c=document.getElementById("c"),ctx=c.getContext("2d"),g=20,snake=[{x:10,y:10}],dx=1,dy=0,food={x:15,y:15},sc=0;',
      'document.onkeydown=function(e){',
      '  var k=e.key.toLowerCase();',
      '  if((k==="arrowup"||k==="w")&&dy===0){dx=0;dy=-1;}',
      '  if((k==="arrowdown"||k==="s")&&dy===0){dx=0;dy=1;}',
      '  if((k==="arrowleft"||k==="a")&&dx===0){dx=-1;dy=0;}',
      '  if((k==="arrowright"||k==="d")&&dx===0){dx=1;dy=0;}',
      '};',
      'setInterval(function(){',
      '  var head=snake.at(0),h={x:(head.x+dx+20)%20,y:(head.y+dy+20)%20};',
      '  if(snake.some(function(p){return p.x===h.x&&p.y===h.y;})){',
      '    snake=[{x:10,y:10}];dx=1;dy=0;sc=0;document.getElementById("s").innerText=0;return;',
      '  }',
      '  snake.unshift(h);',
      '  if(h.x===food.x&&h.y===food.y){',
      '    sc++;document.getElementById("s").innerText=sc;',
      '    food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};',
      '  }else{snake.pop();}',
      '  ctx.clearRect(0,0,400,400);ctx.fillStyle="#ef4444";ctx.fillRect(food.x*g+2,food.y*g+2,g-4,g-4);',
      '  ctx.fillStyle="#10b981";snake.forEach(function(p){ctx.fillRect(p.x*g+1,p.y*g+1,g-2,g-2);});',
      '},100);'
    ]
  )
});
STARTER_GAMES.push({
  id: '2048',
  title: '2048',
  tags: ['Puzzle', 'Classic'],
  views: '96.5k',
  likes: 1140,
  dislikes: 31,
  thumb: makeGameThumb('#d97706', '#78350f', '2048', '2048'),
  html: buildGameDoc(
    '<div style="margin-bottom:10px;font-weight:700;">Score: <span id="sc">0</span> | Arrow Keys</div>' +
    '<div id="b" style="display:grid;grid-template-columns:repeat(4,78px);gap:10px;background:#1e1b4b;padding:12px;border-radius:14px;"></div>',
    [
      'var grid=new Array(16).fill(0),score=0;',
      'function add(){var e=[];grid.forEach(function(v,i){if(v===0)e.push(i);});if(e.length)grid[e[Math.floor(Math.random()*e.length)]]=Math.random()<0.9?2:4;}',
      'function draw(){var b=document.getElementById("b");b.innerHTML="";document.getElementById("sc").innerText=score;var cols={0:"#312e81",2:"#6366f1",4:"#8b5cf6",8:"#ec4899",16:"#f43f5e",32:"#f97316",64:"#eab308",128:"#10b981",256:"#06b6d4",512:"#3b82f6",1024:"#a855f7",2048:"#facc15"};grid.forEach(function(v){var d=document.createElement("div");d.style.cssText="height:78px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;background:"+(cols[v]||"#facc15");d.innerText=v||"";b.appendChild(d);});}',
      'function slide(r){var a=r.filter(function(x){return x;});for(var i=0;i<a.length-1;i++){if(a[i]===a[i+1]){a[i]*=2;score+=a[i];a[i+1]=0;}}a=a.filter(function(x){return x;});while(a.length<4)a.push(0);return a;}',
      'document.onkeydown=function(e){',
      '  var old=grid.join(","),r,c,s,colArr;',
      '  if(e.key==="ArrowLeft")for(r=0;r<4;r++){s=slide(grid.slice(r*4,r*4+4));for(c=0;c<4;c++)grid[r*4+c]=s[c];}',
      '  if(e.key==="ArrowRight")for(r=0;r<4;r++){s=slide(grid.slice(r*4,r*4+4).reverse()).reverse();for(c=0;c<4;c++)grid[r*4+c]=s[c];}',
      '  if(e.key==="ArrowUp")for(c=0;c<4;c++){colArr=new Array(grid.at(c),grid.at(c+4),grid.at(c+8),grid.at(c+12));s=slide(colArr);for(r=0;r<4;r++)grid[r*4+c]=s[r];}',
      '  if(e.key==="ArrowDown")for(c=0;c<4;c++){colArr=new Array(grid.at(c),grid.at(c+4),grid.at(c+8),grid.at(c+12));s=slide(colArr.reverse()).reverse();for(r=0;r<4;r++)grid[r*4+c]=s[r];}',
      '  if(old!==grid.join(",")){add();draw();}',
      '};add();add();draw();'
    ]
  )
});
STARTER_GAMES.push(
  {
    id: 'flappy',
    title: 'Flappy Bird',
    tags: ['Arcade', 'Classic'],
    views: '71.8k',
    likes: 830,
    dislikes: 42,
    thumb: makeGameThumb('#0284c7', '#0c4a6e', '🐤', 'Flappy Bird'),
    html: buildGameDoc(
      '<div style="margin-bottom:8px;font-weight:700;">Score: <span id="sc">0</span> | Click or Space</div>' +
      '<canvas id="c" width="380" height="440" style="border-radius:12px;background:#0ea5e9;border:2px solid #38bdf8;"></canvas>',
      [
        'var c=document.getElementById("c"),ctx=c.getContext("2d"),y=200,v=0,pipes=[],f=0,sc=0;',
        'function flap(){v=-6.6;}c.onclick=flap;document.onkeydown=function(e){if(e.code==="Space")flap();};',
        'setInterval(function(){',
        '  f++;v+=0.38;y+=v;if(f%95===0)pipes.push({x:380,top:60+Math.random()*200,p:false});',
        '  ctx.clearRect(0,0,380,440);ctx.fillStyle="#22c55e";',
        '  pipes.forEach(function(p){p.x-=2.6;ctx.fillRect(p.x,0,52,p.top);ctx.fillRect(p.x,p.top+130,52,440);if(!p.p&&p.x<60){p.p=true;sc++;document.getElementById("sc").innerText=sc;}if(84>p.x&&60<p.x+52&&(y<p.top||y+24>p.top+130)){y=200;v=0;pipes=[];sc=0;document.getElementById("sc").innerText=0;}});',
        '  if(y>420||y<0){y=200;v=0;pipes=[];sc=0;document.getElementById("sc").innerText=0;}',
        '  ctx.fillStyle="#facc15";ctx.fillRect(60,y,26,24);',
        '},20);'
      ]
    )
  },
  {
    id: 'breakout',
    title: 'Breakout',
    tags: ['Arcade', 'Classic'],
    views: '54.1k',
    likes: 615,
    dislikes: 19,
    thumb: makeGameThumb('#7c3aed', '#3b0764', '🧱', 'Breakout'),
    html: buildGameDoc(
      '<div style="margin-bottom:8px;font-weight:700;">Score: <span id="sc">0</span> | Move Mouse</div>' +
      '<canvas id="c" width="480" height="360" style="border:2px solid #8b5cf6;border-radius:12px;background:#110b24;"></canvas>',
      [
        'var c=document.getElementById("c"),ctx=c.getContext("2d"),px=200,bx=240,by=220,dx=3,dy=-3,sc=0,bricks=[];',
        'for(var r=0;r<4;r++)for(var col=0;col<7;col++)bricks.push({x:col*64+18,y:r*26+24,a:1});',
        'c.onmousemove=function(e){px=e.clientX-c.getBoundingClientRect().left-45;};',
        'setInterval(function(){',
        '  bx+=dx;by+=dy;if(bx<8||bx>472)dx=-dx;if(by<8)dy=-dy;if(by>332&&bx>px&&bx<px+90)dy=-Math.abs(dy);if(by>360){bx=240;by=220;dy=-3;}',
        '  ctx.clearRect(0,0,480,360);bricks.forEach(function(b){if(!b.a)return;if(bx>b.x&&bx<b.x+56&&by>b.y&&by<b.y+18){b.a=0;dy=-dy;sc+=10;document.getElementById("sc").innerText=sc;}ctx.fillStyle="#a78bfa";ctx.fillRect(b.x,b.y,56,18);});',
        '  ctx.fillStyle="#fff";ctx.fillRect(px,340,90,10);ctx.beginPath();ctx.arc(bx,by,8,0,Math.PI*2);ctx.fill();',
        '},16);'
      ]
    )
  }
);
STARTER_GAMES.push(
  {
    id: 'pong',
    title: 'Pong',
    tags: ['Arcade', 'Classic'],
    views: '49.7k',
    likes: 540,
    dislikes: 15,
    thumb: makeGameThumb('#2563eb', '#1e1b4b', '🏓', 'Pong'),
    html: buildGameDoc(
      '<div style="margin-bottom:8px;font-weight:700;">You: <span id="p1">0</span> | CPU: <span id="p2">0</span></div>' +
      '<canvas id="c" width="520" height="340" style="border:2px solid #3b82f6;border-radius:12px;background:#0b132b;"></canvas>',
      [
        'var c=document.getElementById("c"),ctx=c.getContext("2d"),py=130,cy=130,bx=260,by=170,dx=4,dy=3,p1=0,p2=0;',
        'c.onmousemove=function(e){py=e.clientY-c.getBoundingClientRect().top-40;};',
        'setInterval(function(){',
        '  bx+=dx;by+=dy;if(by<8||by>332)dy=-dy;cy+=(by-(cy+40))*0.09;',
        '  if(bx<24&&by>py&&by<py+80)dx=Math.abs(dx);if(bx>496&&by>cy&&by<cy+80)dx=-Math.abs(dx);',
        '  if(bx<0){p2++;document.getElementById("p2").innerText=p2;bx=260;by=170;}',
        '  if(bx>520){p1++;document.getElementById("p1").innerText=p1;bx=260;by=170;}',
        '  ctx.clearRect(0,0,520,340);ctx.fillStyle="#60a5fa";ctx.fillRect(10,py,12,80);ctx.fillRect(498,cy,12,80);',
        '  ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(bx,by,8,0,Math.PI*2);ctx.fill();',
        '},16);'
      ]
    )
  },
  {
    id: 'dino',
    title: 'Dino Runner',
    tags: ['Arcade', 'Classic'],
    views: '88.9k',
    likes: 990,
    dislikes: 17,
    thumb: makeGameThumb('#334155', '#0f172a', '🦖', 'Dino Runner'),
    html: buildGameDoc(
      '<div style="margin-bottom:8px;font-weight:700;">Distance: <span id="sc">0</span> | Space / Click</div>' +
      '<canvas id="c" width="520" height="240" style="border:2px solid #94a3b8;border-radius:12px;background:#1e293b;"></canvas>',
      [
        'var c=document.getElementById("c"),ctx=c.getContext("2d"),dy=170,vy=0,ox=520,sc=0;',
        'function jump(){if(dy>=170)vy=-11.5;}c.onclick=jump;document.onkeydown=function(e){if(e.code==="Space"||e.key==="ArrowUp")jump();};',
        'setInterval(function(){',
        '  vy+=0.65;dy+=vy;if(dy>170){dy=170;vy=0;}ox-=5.5;',
        '  if(ox<-20){ox=520+Math.random()*140;sc+=10;document.getElementById("sc").innerText=sc;}',
        '  if(ox<76&&ox+20>50&&dy+34>174){ox=520;sc=0;document.getElementById("sc").innerText=0;}',
        '  ctx.clearRect(0,0,520,240);ctx.fillStyle="#64748b";ctx.fillRect(0,204,520,4);',
        '  ctx.fillStyle="#34d399";ctx.fillRect(50,dy,26,34);ctx.fillStyle="#f43f5e";ctx.fillRect(ox,174,20,30);',
        '},16);'
      ]
    )
  }
);
var activeCategory = 'All';
var activeGame = null;
var CATEGORIES = ['All', 'Favorites', 'Arcade', 'Puzzle', 'Classic'];

function getFavGames() {
  try { return JSON.parse(localStorage.getItem('lockedFavGames') || '[]'); } catch (e) { return []; }
}
function isFav(id) {
  return getFavGames().indexOf(id) !== -1;
}
function toggleFav(id, e) {
  if (e) e.stopPropagation();
  var favs = getFavGames();
  var idx = favs.indexOf(id);
  if (idx === -1) favs.push(id); else favs.splice(idx, 1);
  try { localStorage.setItem('lockedFavGames', JSON.stringify(favs)); } catch (err) {}
  renderGamesGrid();
  if (activeGame && activeGame.id === id) {
    document.getElementById('p-fav-btn').innerText = isFav(id) ? '★' : '☆';
  }
}

(function initTopBars() {
  var feat = document.getElementById('featured-strip');
  if (!feat) return;
  STARTER_GAMES.slice(0, 3).forEach(function(g) {
    var b = document.createElement('div');
    b.className = 'feat-banner';
    b.onclick = function() { openGamePlayer(g.id); };
    var bg = document.createElement('div');
    bg.className = 'feat-banner-bg';
    bg.style.backgroundImage = 'url(' + g.thumb + ')';
    var t = document.createElement('div');
    t.className = 'feat-banner-title';
    t.innerText = g.title;
    b.appendChild(bg); b.appendChild(t); feat.appendChild(b);
  });

  var pills = document.getElementById('cat-pills');
  CATEGORIES.forEach(function(cat) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cat-pill' + (cat === 'All' ? ' active' : '');
    btn.innerText = cat;
    btn.onclick = function() {
      activeCategory = cat;
      document.querySelectorAll('.cat-pill').forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('games-heading').innerText = (cat === 'All') ? 'All Games' : cat;
      renderGamesGrid();
    };
    pills.appendChild(btn);
  });
})();
function renderGamesGrid() {
  var grid = document.getElementById('games-grid');
  if (!grid) return;
  var q = (document.getElementById('games-search').value || '').trim().toLowerCase();
  grid.innerHTML = '';

  STARTER_GAMES.filter(function(g) {
    var matchSearch = !q || g.title.toLowerCase().indexOf(q) !== -1;
    var matchCat = (activeCategory === 'All') || (activeCategory === 'Favorites' ? isFav(g.id) : g.tags.indexOf(activeCategory) !== -1);
    return matchSearch && matchCat;
  }).forEach(function(g) {
    var card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = function() { openGamePlayer(g.id); };

    var img = document.createElement('img');
    img.className = 'game-thumb';
    img.src = g.thumb;

    var top = document.createElement('div');
    top.className = 'game-top-overlay';
    var tags = document.createElement('div');
    tags.className = 'game-tags';
    g.tags.forEach(function(tg) {
      var pill = document.createElement('span');
      pill.className = 'game-tag-pill';
      pill.innerText = tg;
      tags.appendChild(pill);
    });
    var fav = document.createElement('button');
    fav.type = 'button';
    fav.className = 'game-fav-btn';
    fav.innerText = isFav(g.id) ? '★' : '☆';
    fav.onclick = function(e) { toggleFav(g.id, e); };
    top.appendChild(tags); top.appendChild(fav);

    var bot = document.createElement('div');
    bot.className = 'game-bottom-overlay';
    var title = document.createElement('div');
    title.className = 'game-card-title';
    title.innerText = g.title;
    var views = document.createElement('div');
    views.className = 'game-views-pill';
    views.innerText = '👁 ' + g.views;
    bot.appendChild(title); bot.appendChild(views);

    card.appendChild(img); card.appendChild(top); card.appendChild(bot);
    grid.appendChild(card);
  });
}

function openGamePlayer(id) {
  var g = STARTER_GAMES.find(function(item) { return item.id === id; });
  if (!g) return;
  activeGame = g;
  document.getElementById('games-browse-view').style.display = 'none';
  document.getElementById('player-view').style.display = 'flex';
  document.getElementById('player-splash').style.display = 'flex';
  var frame = document.getElementById('game-iframe');
  frame.style.display = 'none';
  frame.srcdoc = '';
  document.getElementById('player-blur-bg').style.backgroundImage = 'url(' + g.thumb + ')';
  document.getElementById('player-center-icon').src = g.thumb;
  document.getElementById('p-title').innerText = g.title;
  document.getElementById('p-fav-btn').innerText = isFav(g.id) ? '★' : '☆';
  document.getElementById('p-views').innerText = '👁 ' + g.views;
  document.getElementById('p-likes').innerText = g.likes;
  document.getElementById('p-dislikes').innerText = g.dislikes;
}

function launchCurrentGame() {
  if (!activeGame) return;
  document.getElementById('player-splash').style.display = 'none';
  var frame = document.getElementById('game-iframe');
  frame.style.display = 'block';
  frame.srcdoc = activeGame.html;
  setTimeout(function() { try { frame.contentWindow.focus(); } catch (e) {} }, 60);
}

function closeGamePlayer() {
  var frame = document.getElementById('game-iframe');
  frame.srcdoc = '';
  frame.style.display = 'none';
  document.getElementById('player-view').style.display = 'none';
  document.getElementById('games-browse-view').style.display = 'flex';
  activeGame = null;
}

function togglePlayerFav() { if (activeGame) toggleFav(activeGame.id); }
function bumpStat(kind) { if (!activeGame) return; activeGame[kind]++; document.getElementById('p-' + kind).innerText = activeGame[kind]; }
function toggleGameFullscreen() {
  var stage = document.getElementById('player-stage');
  if (!document.fullscreenElement) { if (stage.requestFullscreen) stage.requestFullscreen(); }
  else { if (document.exitFullscreen) document.exitFullscreen(); }
}

renderGamesGrid();
