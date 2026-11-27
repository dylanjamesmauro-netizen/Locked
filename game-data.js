function makeDoc(body, code) {
  var st = 'margin:0;padding:0;background:#05070e;color:#fff;' +
    'font-family:system-ui,sans-serif;width:100vw;height:100vh;' +
    'overflow:hidden;position:relative;user-select:none;' +
    'display:flex;align-items:center;justify-content:center;';
  var css = '<style>canvas{position:fixed;inset:0;' +
    'width:100vw!important;height:100vh!important;}' +
    'body>div:first-child{position:fixed;top:14px;left:18px;' +
    'z-index:10;background:rgba(10,14,28,0.8);' +
    'border:1px solid rgba(255,255,255,0.16);padding:8px 16px;' +
    'border-radius:12px;font-weight:800;font-size:14px;}</style>';
  var fix = 'var _c=document.getElementById("c");if(_c){' +
    'var _r=_c.getBoundingClientRect.bind(_c);' +
    '["onmousemove","onclick","onmousedown","onmouseup"].forEach(function(ev){' +
    'Object.defineProperty(_c,ev,{set:function(fn){' +
    '_c.addEventListener(ev.slice(2),function(e){var r=_r();' +
    'fn({clientX:r.left+(e.clientX-r.left)*(_c.width/(r.width||1)),' +
    'clientY:r.top+(e.clientY-r.top)*(_c.height/(r.height||1))});' +
    '});}});});}';
  return '<!DOCTYPE html><html><head>' + css + '</head>' +
    '<body style="' + st + '">' + body + '<' + 'script>' +
    fix + code + '<' + '/script></body></html>';
}
var GAMES = [];
GAMES.push({
  id: 'drive-mad', title: 'Drive Mad',
  tags: ['Action', 'Single Player'], views: '1.3m',
  likes: 4820, dislikes: 173, emoji: '🚙',
  bg: 'linear-gradient(135deg,#0284c7,#1d4ed8)',
  html: makeDoc(
    '<div>🚙 LVL <span id="lv">1</span> | D/Right Gas • A/Left Brake & Tilt</div>' +
    '<canvas id="c" width="680" height="360"></canvas>',
    'var c=document.getElementById("c"),ctx=c.getContext("2d"),lv=1,x=80,y=210,vx=0,vy=0,ang=0,va=0,k={};' +
    'document.onkeydown=function(e){k[e.key.toLowerCase()]=1;};document.onkeyup=function(e){k[e.key.toLowerCase()]=0;};' +
    'function hAt(wx){if(wx<260)return 240;if(wx>1950)return 240;var s=Math.sin(wx*0.011)*(28+lv*8)+Math.cos(wx*0.025)*14;return 240+s;}' +
    'function reset(){x=80;y=210;vx=0;vy=0;ang=0;va=0;}' +
    'setInterval(function(){var g1=hAt(x-22),g2=hAt(x+22),gMid=(g1+g2)/2,air=y<gMid-28;' +
    'if(!air){if(k.arrowright||k.d)vx=Math.min(8.5,vx+0.36);if(k.arrowleft||k.a)vx=Math.max(-4.5,vx-0.36);' +
    'var slope=Math.atan2(g2-g1,44);ang+=(slope-ang)*0.22;va=0;y=gMid-24;vy=0;}' +
    'else{vy+=0.45;if(k.arrowleft||k.a)va-=0.008;if(k.arrowright||k.d)va+=0.008;ang+=va;va*=0.95;}' +
    'vx*=0.985;x+=vx;y+=vy;if(Math.abs(ang)>1.45&&!air)reset();' +
    'if(x>2050){lv++;document.getElementById("lv").innerText=lv;reset();}' +
    'var cam=x-180;ctx.fillStyle="#38bdf8";ctx.fillRect(0,0,680,360);ctx.fillStyle="#0284c7";ctx.fillRect(0,295,680,65);' +
    'ctx.fillStyle="#16a34a";ctx.beginPath();ctx.moveTo(0,360);for(var sx=0;sx<=680;sx+=12)ctx.lineTo(sx,hAt(cam+sx));ctx.lineTo(680,360);ctx.fill();' +
    'ctx.fillStyle="#facc15";ctx.fillRect(2050-cam,170,12,70);ctx.fillStyle="#fff";ctx.fillRect(2062-cam,170,28,20);' +
    'ctx.save();ctx.translate(x-cam,y);ctx.rotate(ang);ctx.fillStyle="#facc15";ctx.fillRect(-32,-18,64,22);' +
    'ctx.fillStyle="#eab308";ctx.fillRect(-18,-34,38,16);ctx.fillStyle="#1e293b";' +
    'ctx.beginPath();ctx.arc(-20,10,13,0,6.28);ctx.arc(20,10,13,0,6.28);ctx.fill();ctx.restore();},16);'
  )
});
GAMES.push({
  id: 'retro-bowl', title: 'Retro Bowl',
  tags: ['Sports', 'Single Player'], views: '1.1m',
  likes: 3910, dislikes: 92, emoji: '🏈',
  bg: 'linear-gradient(135deg,#15803d,#14532d)',
  html: makeDoc(
    '<div>🏈 SCORE: <span id="sc">0</span> | <span id="st">Drag Back on QB to Aim & Throw!</span></div>' +
    '<canvas id="c" width="680" height="360"></canvas>',
    'var c=document.getElementById("c"),ctx=c.getContext("2d"),sc=0,drag=0,mx=0,my=0,qb={x:90,y:180};' +
    'var wr=[{x:120,y:95,vy:0.4},{x:120,y:265,vy:-0.4}],ball=null,carrier=null,defs=[],k={};' +
    'document.onkeydown=function(e){k[e.key.toLowerCase()]=1;};document.onkeyup=function(e){k[e.key.toLowerCase()]=0;};' +
    'function spawnDefs(){defs=[];for(var i=0;i<5;i++)defs.push({x:320+i*65,y:50+Math.random()*260,s:2.3+Math.random()});}' +
    'function resetPlay(){qb={x:90,y:180};wr=[{x:120,y:95,vy:0.45},{x:120,y:265,vy:-0.45}];ball=null;carrier=null;spawnDefs();document.getElementById("st").innerText="Drag Back on QB to Throw!";}' +
    'c.onmousedown=function(e){if(!ball&&!carrier){drag=1;mx=e.clientX;my=e.clientY;}};' +
    'c.onmousemove=function(e){if(drag){mx=e.clientX;my=e.clientY;}};' +
    'c.onmouseup=function(){if(drag){drag=0;var dx=(qb.x-mx)*0.11,dy=(qb.y-my)*0.11;if(dx>2)ball={x:qb.x,y:qb.y,vx:Math.min(13,dx),vy:dy};}};' +
    'resetPlay();setInterval(function(){ctx.fillStyle="#15803d";ctx.fillRect(0,0,680,360);' +
    'for(var s=0;s<11;s++){if(s%2===0){ctx.fillStyle="#166534";ctx.fillRect(s*56,0,56,360);}ctx.fillStyle="rgba(255,255,255,0.3)";ctx.fillRect(s*56,0,2,360);}' +
    'ctx.fillStyle="#ca8a04";ctx.fillRect(616,0,64,360);' +
    'if(!carrier){wr.forEach(function(w){w.x=Math.min(560,w.x+2.6);w.y+=w.vy;if(w.y<40||w.y>320)w.vy*=-1;});}' +
    'if(drag){ctx.strokeStyle="#fde047";ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(qb.x,qb.y);ctx.lineTo(qb.x+(qb.x-mx)*1.5,qb.y+(qb.y-my)*1.5);ctx.stroke();ctx.setLineDash([]);}' +
    'if(ball){ball.x+=ball.vx;ball.y+=ball.vy;wr.forEach(function(w){if(Math.hypot(ball.x-w.x,ball.y-w.y)<22){carrier=w;ball=null;document.getElementById("st").innerText="CAUGHT! Use Up/Down Arrows to Juke!";}});if(ball&&(ball.x>680||ball.y<0||ball.y>360))resetPlay();}' +
    'if(carrier){carrier.x+=3.4;if(k.arrowup||k.w)carrier.y=Math.max(20,carrier.y-4.2);if(k.arrowdown||k.s)carrier.y=Math.min(340,carrier.y+4.2);if(carrier.x>620){sc+=7;document.getElementById("sc").innerText=sc;resetPlay();}}' +
    'ctx.fillStyle="#38bdf8";ctx.fillRect(qb.x-10,qb.y-10,20,20);wr.forEach(function(w){ctx.fillStyle=carrier===w?"#facc15":"#38bdf8";ctx.fillRect(w.x-10,w.y-10,20,20);});' +
    'if(ball){ctx.fillStyle="#92400e";ctx.beginPath();ctx.ellipse(ball.x,ball.y,10,6,0,0,6.28);ctx.fill();}' +
    'var tgt=carrier||qb;ctx.fillStyle="#ef4444";defs.forEach(function(d){var a=Math.atan2(tgt.y-d.y,tgt.x-d.x);d.x+=Math.cos(a)*d.s;d.y+=Math.sin(a)*d.s;ctx.fillRect(d.x-10,d.y-10,20,20);if(Math.hypot(tgt.x-d.x,tgt.y-d.y)<18)resetPlay();});},16);'
  )
});
GAMES.push({
  id: 'escape-road-2', title: 'Escape Road 2',
  tags: ['Action', 'Casual'], views: '975.7k',
  likes: 3140, dislikes: 84, emoji: '🚓',
  bg: 'linear-gradient(135deg,#475569,#0f172a)',
  html: makeDoc(
    '<div>🚓 CASH: $<span id="sc">0</span> | WANTED: <span id="st">★</span> | A/D Drift</div>' +
    '<canvas id="c" width="640" height="360"></canvas>',
    'var c=document.getElementById("c"),ctx=c.getContext("2d"),px=0,py=0,ang=0,vx=0,vy=0,k={},cops=[],cash=[],sc=0,f=0;' +
    'document.onkeydown=function(e){k[e.key.toLowerCase()]=1;};document.onkeyup=function(e){k[e.key.toLowerCase()]=0;};' +
    'for(var i=0;i<12;i++)cash.push({x:(Math.random()-0.5)*1400,y:(Math.random()-0.5)*1400});' +
    'setInterval(function(){f++;if(k.arrowleft||k.a)ang-=0.065;if(k.arrowright||k.d)ang+=0.065;' +
    'var tx=Math.cos(ang)*5.6,ty=Math.sin(ang)*5.6;vx+=(tx-vx)*0.08;vy+=(ty-vy)*0.08;px+=vx;py+=vy;' +
    'var stars=Math.min(5,1+Math.floor(sc/50));document.getElementById("st").innerText="★".repeat(stars);' +
    'if(cops.length<stars*2&&f%90===0){var a=Math.random()*6.28;cops.push({x:px+Math.cos(a)*420,y:py+Math.sin(a)*420,ang:0});}' +
    'ctx.fillStyle="#1e293b";ctx.fillRect(0,0,640,360);var ox=320-px,oy=180-py;' +
    'ctx.strokeStyle="rgba(255,255,255,0.12)";for(var gx=-1600;gx<=1600;gx+=160){ctx.beginPath();ctx.moveTo(ox+gx,0);ctx.lineTo(ox+gx,360);ctx.stroke();ctx.beginPath();ctx.moveTo(0,oy+gx);ctx.lineTo(640,oy+gx);ctx.stroke();}' +
    'cash.forEach(function(m){ctx.fillStyle="#4ade80";ctx.fillRect(ox+m.x-8,oy+m.y-8,16,16);if(Math.hypot(px-m.x,py-m.y)<26){sc+=10;document.getElementById("sc").innerText=sc;m.x=px+(Math.random()-0.5)*900;m.y=py+(Math.random()-0.5)*900;}});' +
    'ctx.save();ctx.translate(320,180);ctx.rotate(ang);ctx.fillStyle="#facc15";ctx.fillRect(-18,-11,36,22);ctx.restore();' +
    'cops.forEach(function(p){var ta=Math.atan2(py-p.y,px-p.x);p.ang=ta;p.x+=Math.cos(ta)*(3.8+stars*0.35);p.y+=Math.sin(ta)*(3.8+stars*0.35);' +
    'ctx.save();ctx.translate(ox+p.x,oy+p.y);ctx.rotate(p.ang);ctx.fillStyle="#111827";ctx.fillRect(-18,-11,36,22);ctx.fillStyle=(f%10<5)?"#ef4444":"#3b82f6";ctx.fillRect(-4,-9,8,18);ctx.restore();' +
    'if(Math.hypot(px-p.x,py-p.y)<24){cops=[];sc=0;px=0;py=0;document.getElementById("sc").innerText=0;}});},16);'
  )
});
GAMES.push({
  id: 'geometry-dash', title: 'Geometry Dash',
  tags: ['Action', 'Arcade'], views: '890.4k',
  likes: 4180, dislikes: 72, emoji: '🟨',
  bg: 'linear-gradient(135deg,#6d28d9,#1e1b4b)',
  html: makeDoc(
    '<div>⚡ <span id="sc">0</span>% | MODE: <span id="md">CUBE</span> | Hold Click/Space</div>' +
    '<canvas id="c" width="640" height="340"></canvas>',
    'var c=document.getElementById("c"),ctx=c.getContext("2d"),y=240,vy=0,rot=0,hold=0,ship=0,f=0,sc=0,ob=[],pl=[];' +
    'function dn(){hold=1;}function up(){hold=0;}c.onmousedown=dn;window.onmouseup=up;' +
    'document.onkeydown=function(e){if(e.code==="Space"||e.key==="ArrowUp")dn();};document.onkeyup=up;' +
    'setInterval(function(){f++;if(f%55===0){if(Math.random()<0.45)pl.push({x:660,y:215,w:95});else ob.push({x:660});}' +
    'if(f%14===0){sc=(sc+1)%101;if(sc===50){ship=1;document.getElementById("md").innerText="SHIP 🚀";}if(sc===0){ship=0;document.getElementById("md").innerText="CUBE 🟨";}}' +
    'document.getElementById("sc").innerText=sc;' +
    'if(ship){vy+=(hold?-0.65:0.55);vy*=0.92;y=Math.max(20,Math.min(240,y+vy));rot=vy*3;}' +
    'else{vy+=0.75;y+=vy;var onG=y>=240;pl.forEach(function(p){if(118>p.x&&92<p.x+p.w&&y+30>=p.y&&y+30<=p.y+18&&vy>=0){y=p.y-30;vy=0;onG=true;}});if(onG){if(y>240)y=240;vy=0;rot=Math.round(rot/90)*90;if(hold)vy=-12.2;}else rot+=6.5;}' +
    'ctx.fillStyle="#1e1b4b";ctx.fillRect(0,0,640,340);ctx.fillStyle="#0f172a";ctx.fillRect(0,270,640,70);' +
    'ctx.fillStyle="#38bdf8";ctx.fillRect(0,268,640,4);pl.forEach(function(p){p.x-=6.8;ctx.fillStyle="#818cf8";ctx.fillRect(p.x,p.y,p.w,14);});' +
    'ctx.save();ctx.translate(105,y+15);ctx.rotate(rot*Math.PI/180);ctx.fillStyle=ship?"#fb7185":"#facc15";ctx.fillRect(-15,-15,30,30);ctx.restore();' +
    'ob.forEach(function(o){o.x-=6.8;ctx.fillStyle="#f43f5e";ctx.beginPath();ctx.moveTo(o.x,268);ctx.lineTo(o.x+14,234);ctx.lineTo(o.x+28,268);ctx.fill();' +
    'if(118>o.x+4&&92<o.x+24&&y+28>238){ob=[];pl=[];sc=0;ship=0;y=240;document.getElementById("md").innerText="CUBE 🟨";}});' +
    'ob=ob.filter(function(o){return o.x>-40;});pl=pl.filter(function(p){return p.x>-120;});},16);'
  )
});
GAMES.push(
  { id: 'slope', title: 'Slope', tags: ['Action', 'Arcade'],
    views: '760.2k', likes: 3890, dislikes: 65, emoji: '🟢',
    bg: 'linear-gradient(135deg,#16a34a,#064e3b)',
    html: makeDoc('<div>🟢 SCORE: <span id="sc">0</span> | Left/Right</div>' +
      '<canvas id="c" width="600" height="360"></canvas>',
      'var c=document.getElementById("c"),ctx=c.getContext("2d"),bx=300,vx=0,k={},bl=[],f=0,sc=0;' +
      'document.onkeydown=function(e){k[e.key]=1;};document.onkeyup=function(e){k[e.key]=0;};' +
      'setInterval(function(){f++;var spd=5.8+Math.min(4.5,sc*0.04);if(k.ArrowLeft)vx-=0.75;if(k.ArrowRight)vx+=0.75;vx*=0.88;bx+=vx;' +
      'if(f%20===0){bl.push({x:130+Math.random()*340,y:40,mv:(Math.random()-0.5)*2.5});sc++;document.getElementById("sc").innerText=sc;}' +
      'ctx.fillStyle="#030712";ctx.fillRect(0,0,600,360);ctx.strokeStyle="#22c55e";ctx.beginPath();ctx.moveTo(190,30);ctx.lineTo(50,360);ctx.moveTo(410,30);ctx.lineTo(550,360);ctx.stroke();' +
      'bl.forEach(function(b){b.y+=spd;b.x+=b.mv;if(b.x<120||b.x>480)b.mv*=-1;var s=0.35+(b.y/360)*0.85;ctx.fillStyle="#ef4444";ctx.fillRect(b.x-20*s,b.y,40*s,28*s);' +
      'if(Math.abs(bx-b.x)<22*s+10&&Math.abs(310-b.y)<20){bl=[];sc=0;bx=300;vx=0;document.getElementById("sc").innerText=0;}});' +
      'if(bx<65||bx>535){bl=[];sc=0;bx=300;vx=0;document.getElementById("sc").innerText=0;}' +
      'ctx.fillStyle="#22c55e";ctx.beginPath();ctx.arc(bx,310,15,0,6.28);ctx.fill();bl=bl.filter(function(b){return b.y<390;});},16);') },
  { id: 'stickman-hook', title: 'Stickman Hook', tags: ['Action', 'Casual'],
    views: '640.8k', likes: 2740, dislikes: 39, emoji: '🪝',
    bg: 'linear-gradient(135deg,#e11d48,#4c0519)',
    html: makeDoc('<div>🪝 DIST: <span id="sc">0</span>m | Hold Click/Space to Swing</div>' +
      '<canvas id="c" width="600" height="340"></canvas>',
      'var c=document.getElementById("c"),ctx=c.getContext("2d"),px=100,py=130,vx=5,vy=0,h=0,cam=0,gr=null,len=0;' +
      'var pts=[{x:240,y:55},{x:450,y:50},{x:660,y:60},{x:870,y:50}];' +
      'function dn(){h=1;gr=pts.find(function(p){return p.x>px-30;});if(gr)len=Math.hypot(gr.x-px,gr.y-py);}' +
      'function up(){h=0;gr=null;}c.onmousedown=dn;window.onmouseup=up;document.onkeydown=function(e){if(e.code==="Space"&&!h)dn();};document.onkeyup=up;' +
      'setInterval(function(){vy+=0.28;px+=vx;py+=vy;if(h&&gr){var dx=px-gr.x,dy=py-gr.y,d=Math.hypot(dx,dy)||1;if(d>len){px=gr.x+(dx/d)*len;py=gr.y+(dy/d)*len;var dot=(vx*dx+vy*dy)/(d*d);vx-=dot*dx;vy-=dot*dy;vx+=0.12;}}' +
      'if(py>315){py=315;vy=-11.5;}cam=px-160;if(pts[pts.length-1].x<px+520)pts.push({x:pts[pts.length-1].x+210,y:45+Math.random()*30});' +
      'document.getElementById("sc").innerText=Math.max(0,Math.floor((px-100)/10));if(py<-60){px=100;py=130;vx=5;vy=0;gr=null;}' +
      'ctx.fillStyle="#1e1b4b";ctx.fillRect(0,0,600,340);ctx.fillStyle="#f43f5e";ctx.fillRect(0,326,600,14);' +
      'if(gr){ctx.strokeStyle="#facc15";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(px-cam,py);ctx.lineTo(gr.x-cam,gr.y);ctx.stroke();}' +
      'ctx.fillStyle="#fb7185";pts.forEach(function(p){ctx.beginPath();ctx.arc(p.x-cam,p.y,8,0,6.28);ctx.fill();});' +
      'ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(px-cam,py,11,0,6.28);ctx.fill();},16);') },
  { id: 'banana-sim', title: 'Banana Simulator', tags: ['Clicker', 'Casual'],
    views: '512.3k', likes: 2310, dislikes: 34, emoji: '🍌',
    bg: 'linear-gradient(135deg,#eab308,#713f12)',
    html: makeDoc('<div style="display:none;"></div><div style="text-align:center;">' +
      '<div id="cnt" style="font-size:64px;font-weight:900;color:#fde047;">0</div>' +
      '<div id="bps" style="font-size:14px;color:#cbd5e1;margin-bottom:10px;">0 / sec</div>' +
      '<button id="ban" style="font-size:120px;background:none;border:none;cursor:pointer;">🍌</button>' +
      '<div id="sh" style="display:flex;gap:12px;margin-top:18px;"></div></div>',
      'var b=0,bps=0,it=[{n:"🐒 Monkey",c:15,p:1},{n:"🌴 Tree",c:100,p:8},{n:"🏭 Factory",c:500,p:40}];' +
      'document.getElementById("ban").onclick=function(){b++;upd();};' +
      'function upd(){document.getElementById("cnt").innerText=Math.floor(b);document.getElementById("bps").innerText=bps+" / sec";' +
      'var s=document.getElementById("sh");s.innerHTML="";it.forEach(function(x){var btn=document.createElement("button");' +
      'btn.style.cssText="padding:10px 14px;border-radius:12px;background:#1e1b4b;color:#fff;font-weight:800;cursor:pointer;";' +
      'btn.innerText=x.n+" ("+x.c+")";btn.onclick=function(){if(b>=x.c){b-=x.c;x.c=Math.round(x.c*1.4);bps+=x.p;upd();}};s.appendChild(btn);});}' +
      'setInterval(function(){b+=bps/10;upd();},100);upd();') },
  { id: 'snake', title: 'Snake', tags: ['Arcade', 'Puzzle'],
    views: '430.9k', likes: 1912, dislikes: 24, emoji: '🐍',
    bg: 'linear-gradient(135deg,#059669,#064e3b)',
    html: makeDoc('<div>🐍 SCORE: <span id="s">0</span> | Arrows</div>' +
      '<canvas id="c" width="420" height="420"></canvas>',
      'var c=document.getElementById("c"),ctx=c.getContext("2d"),g=21,sn=[{x:10,y:10}],dx=1,dy=0,fd={x:14,y:14},sc=0;' +
      'document.onkeydown=function(e){if(e.key==="ArrowUp"&&dy===0){dx=0;dy=-1;}if(e.key==="ArrowDown"&&dy===0){dx=0;dy=1;}' +
      'if(e.key==="ArrowLeft"&&dx===0){dx=-1;dy=0;}if(e.key==="ArrowRight"&&dx===0){dx=1;dy=0;}};' +
      'setInterval(function(){var hd=sn.at(0),h={x:(hd.x+dx+20)%20,y:(hd.y+dy+20)%20};sn.unshift(h);' +
      'if(h.x===fd.x&&h.y===fd.y){sc++;document.getElementById("s").innerText=sc;fd={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};}' +
      'else sn.pop();ctx.fillStyle="#060b19";ctx.fillRect(0,0,420,420);ctx.fillStyle="#ef4444";' +
      'ctx.beginPath();ctx.arc(fd.x*g+10,fd.y*g+10,8,0,6.28);ctx.fill();' +
      'sn.forEach(function(p,idx){ctx.fillStyle=idx===0?"#6ee7b7":"#10b981";ctx.fillRect(p.x*g+2,p.y*g+2,g-4,g-4);});},105);') }
);
