<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Settings</title>
  <link id="favicon" rel="shortcut icon" type="image/png" href="">
  <link rel="stylesheet" href="style.css">
  <style>
    input[name="stab"] { display: none; }
    .tabs-bar {
      display: flex;
      gap: 10px;
      background: rgba(24, 17, 42, 0.85);
      padding: 8px;
      border-radius: 14px;
      border: 1px solid rgba(139, 92, 246, 0.25);
      margin-bottom: 30px;
    }
    .tab-btn {
      padding: 10px 24px;
      border-radius: 10px;
      color: #cbd5e1;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    #t-app:checked ~ .tabs-bar label[for="t-app"],
    #t-clk:checked ~ .tabs-bar label[for="t-clk"],
    #t-cus:checked ~ .tabs-bar label[for="t-cus"] {
      background: #6d28d9;
      color: white;
    }
    .tab-panel {
      display: none;
      width: 100%;
      max-width: 560px;
      background: rgba(22, 15, 40, 0.82);
      border: 1px solid rgba(139, 92, 246, 0.25);
      border-radius: 16px;
      padding: 28px;
      text-align: left;
    }
    #t-app:checked ~ #appearance,
    #t-clk:checked ~ #cloaking,
    #t-cus:checked ~ #customizing {
      display: block;
    }
    .vertical-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 18px;
      width: 100%;
    }
    .row-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background: rgba(15, 10, 28, 0.88);
      border: 1px solid rgba(139, 92, 246, 0.25);
      padding: 14px 18px;
      border-radius: 12px;
    }
    .sub-card {
      margin-left: 16px;
      width: calc(100% - 16px);
      border-left: 3px solid #7c3aed;
    }
    .theme-card {
      width: 100%;
      padding: 16px 20px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: white;
      font-size: 15px;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
    }
    .theme-card:hover { border-color: #a78bfa; }
    .vertical-stack .btn {
      width: 100%;
      margin: 0;
      text-align: center;
    }
    .custom-dropdown {
      position: relative;
      width: 165px;
      user-select: none;
    }
    .dropdown-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid rgba(167, 139, 250, 0.35);
      background: #1c1236;
      color: #f8fafc;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .dropdown-trigger:hover {
      background: #251847;
      border-color: #a78bfa;
    }
    .dropdown-arrow {
      width: 16px;
      height: 16px;
      stroke: #c4b5fd;
      transition: transform 0.2s ease;
    }
    .custom-dropdown.open .dropdown-trigger {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-color: #8b5cf6;
      border-bottom-color: rgba(139, 92, 246, 0.2);
      background: #221640;
    }
    .custom-dropdown.open .dropdown-arrow {
      transform: rotate(180deg);
    }
    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #1a1133;
      border: 1px solid #8b5cf6;
      border-top: none;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
      z-index: 100;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
    }
    .custom-dropdown.open .dropdown-menu {
      display: block;
    }
    .dropdown-item {
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 600;
      color: #e2e8f0;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .dropdown-item:hover {
      background: #6d28d9;
      color: #ffffff;
    }
    .dropdown-item.selected {
      background: rgba(109, 40, 217, 0.45);
      color: #ffffff;
    }
    .custom-input {
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid rgba(139, 92, 246, 0.35);
      background: #1a1130;
      color: white;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      transition: border-color 0.2s ease;
    }
    .custom-input:focus {
      border-color: #a78bfa;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 26px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #334155;
      transition: 0.3s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
    input:checked + .slider { background-color: #7c3aed; }
    input:checked + .slider:before { transform: translateX(24px); }
  </style>
</head>
<body>
  <div class="sidebar">
    <div>
      <div class="brand">
        <div class="brand-logo"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="9" height="12" rx="2.5" fill="#ffffff"/><rect x="11" y="4" width="9" height="12" rx="2.5" fill="#ffffff" fill-opacity="0.65"/></svg></div>
        <span class="brand-name">Locked</span>
      </div>
      <input type="text" class="sidebar-search" placeholder="Search games..." onkeydown="if(event.key==='Enter') location.href='games.html?q='+this.value">
      <div class="nav-links">
        <a href="index.html" class="nav-item"><svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home</a>
        <a href="games.html" class="nav-item"><svg viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>Games</a>
        <a href="ai.html" class="nav-item"><svg viewBox="0 0 24 24"><path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-.5-4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>AI Helper</a>
        <a href="about.html" class="nav-item"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>About</a>
      </div>
    </div>
    <div class="sidebar-bottom">
      <a href="settings.html" class="nav-item active"><svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>Settings</a>
    </div>
  </div>

  <div class="content">
    <h1 style="margin-bottom: 20px;">Settings</h1>
    <input type="radio" name="stab" id="t-app" checked>
    <input type="radio" name="stab" id="t-clk">
    <input type="radio" name="stab" id="t-cus">

    <div class="tabs-bar">
      <label for="t-app" class="tab-btn">Appearance</label>
      <label for="t-clk" class="tab-btn">Cloaking</label>
      <label for="t-cus" class="tab-btn">Customizing</label>
    </div>

    <div id="appearance" class="tab-panel">
      <h2>Appearance</h2>
      <p style="color:#94a3b8; margin-top:6px;">Pick a background style for the entire site:</p>
      <div class="vertical-stack">
        <button type="button" class="theme-card" style="background:#050505; background-image:radial-gradient(white 1px, transparent 1px); background-size:14px 14px;" onclick="selectTheme('theme-black-white')">Black/White</button>
        <button type="button" class="theme-card" style="background:linear-gradient(135deg, #02040a, #0f3470);" onclick="selectTheme('theme-blue-black')">Blue & Black Aura</button>
        <button type="button" class="theme-card" style="background:linear-gradient(135deg, #020a05, #0d5c30);" onclick="selectTheme('theme-green-black')">Green & Black Aura</button>
        <button type="button" class="theme-card" style="background:linear-gradient(135deg, #07030f, #3c1675);" onclick="selectTheme('theme-purple-black')">Purple & Black Aura</button>
        <button type="button" class="theme-card" style="background:linear-gradient(135deg, #3b1778, #12377a);" onclick="selectTheme('theme-purple-blue')">Purple & Blue Aura</button>
      </div>
    </div>

    <div id="cloaking" class="tab-panel">
      <h2>Cloaking</h2>
      <p style="color:#94a3b8; margin-top:6px;">Disguise your browser tab or launch inside about:blank:</p>
      <div class="vertical-stack">
        <div class="row-card">
          <div><b>Tab Disguise</b><br><small style="color:#94a3b8;">Change the tab name and icon</small></div>
          <div class="custom-dropdown" id="disguise-dd">
            <div class="dropdown-trigger" onclick="toggleDropdown('disguise-dd', event)">
              <span id="disguise-label">None</span>
              <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="dropdown-menu">
              <div class="dropdown-item" data-val="none" onclick="pickDisguise('none', 'None')">None</div>
              <div class="dropdown-item" data-val="clever" onclick="pickDisguise('clever', 'Clever')">Clever</div>
              <div class="dropdown-item" data-val="custom" onclick="pickDisguise('custom', 'Custom')">Custom</div>
            </div>
          </div>
        </div>

        <div class="row-card sub-card" id="custom-name-row" style="display:none;">
          <div><b>Custom name</b><br><small style="color:#94a3b8;">Type to change the tab name up top</small></div>
          <input type="text" id="custom-tab-input" class="custom-input" style="width:200px;" placeholder="Enter tab name..." oninput="updateCustomTabName(this.value)">
        </div>

        <div class="row-card">
          <div><b>URL Disguise</b><br><small style="color:#94a3b8;">Change the URL up top</small></div>
          <div class="custom-dropdown" id="url-dd">
            <div class="dropdown-trigger" onclick="toggleDropdown('url-dd', event)">
              <span id="url-label">Default</span>
              <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="dropdown-menu">
              <div class="dropdown-item" data-val="default" onclick="pickUrlDisguise('default', 'Default')">Default</div>
              <div class="dropdown-item" data-val="about:blank" onclick="pickUrlDisguise('about:blank', 'About:Blank')">About:Blank</div>
            </div>
          </div>
        </div>

        <div class="row-card sub-card" id="startup-blank-row" style="display:none;">
          <div><b>about:blank on startup</b><br><small style="color:#94a3b8;">Open Locked in about:blank automatically</small></div>
          <label class="switch">
            <input type="checkbox" id="startup-blank-toggle" onchange="toggleStartupBlank(this.checked)">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>

    <div id="customizing" class="tab-panel">
      <h2>Customizing</h2>
      <p style="color:#94a3b8; margin-top:6px;">Change your sidebar brand name:</p>
      <div class="vertical-stack">
        <input type="text" id="brand-input" class="custom-input" placeholder="Sidebar name (e.g. Locked)">
        <button type="button" class="btn" onclick="saveBrandName()">Save Name</button>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
  <script>
    function toggleDropdown(id, e) {
      e.stopPropagation();
      var target = document.getElementById(id);
      var wasOpen = target.classList.contains('open');
      document.querySelectorAll('.custom-dropdown').forEach(function(dd) { dd.classList.remove('open'); });
      if (!wasOpen) target.classList.add('open');
    }

    document.addEventListener('click', function() {
      document.querySelectorAll('.custom-dropdown').forEach(function(dd) { dd.classList.remove('open'); });
    });

    function markSelected(ddId, val) {
      var dd = document.getElementById(ddId);
      if (!dd) return;
      dd.querySelectorAll('.dropdown-item').forEach(function(item) {
        item.classList.toggle('selected', item.getAttribute('data-val') === val);
      });
    }

    function selectTheme(themeClass) {
      try { localStorage.setItem('siteTheme', themeClass); } catch (e) {}
      applyTheme();
    }

    function applyTabTop(title, iconData) {
      document.title = title;
      try { if (window.top && window.top.document) window.top.document.title = title; } catch (e) {}
      [document, window.top ? window.top.document : null].forEach(function(d) {
        if (!d) return;
        try {
          d.querySelectorAll("link[rel*='icon']").forEach(function(el) { el.remove(); });
          if (iconData) {
            var link = d.createElement('link');
            link.id = 'favicon';
            link.rel = 'shortcut icon';
            link.type = 'image/png';
            link.href = iconData;
            d.head.appendChild(link);
          }
        } catch (e) {}
      });
    }

    function pickDisguise(val, label) {
      document.getElementById('disguise-label').innerText = label;
      markSelected('disguise-dd', val);
      document.getElementById('disguise-dd').classList.remove('open');
      setDisguise(val);
    }

    function setDisguise(val) {
      try { localStorage.setItem('tabDisguise', val); } catch (e) {}
      var customRow = document.getElementById('custom-name-row');
      var lockedIcon = makeLockedPNG();

      if (val === 'clever') {
        customRow.style.display = 'none';
        var icon = makeCleverPNG();
        applyTabTop('Resources', icon);
        try {
          localStorage.setItem('siteTitle', 'Resources');
          localStorage.setItem('siteIcon', icon);
        } catch (e) {}
      } else if (val === 'custom') {
        customRow.style.display = 'flex';
        try { localStorage.removeItem('siteIcon'); } catch (e) {}
        var savedCustom = safeGet('customTabTitle') || '';
        document.getElementById('custom-tab-input').value = savedCustom;
        applyTabTop(savedCustom || 'Settings', lockedIcon);
        if (savedCustom) {
          try { localStorage.setItem('siteTitle', savedCustom); } catch (e) {}
        }
      } else {
        customRow.style.display = 'none';
        applyTabTop('Settings', lockedIcon);
        try {
          localStorage.removeItem('siteTitle');
          localStorage.removeItem('siteIcon');
        } catch (e) {}
      }
    }

    function updateCustomTabName(text) {
      var title = text.trim() || 'Settings';
      applyTabTop(title, makeLockedPNG());
      try {
        localStorage.setItem('customTabTitle', text);
        localStorage.setItem('siteTitle', title);
      } catch (e) {}
    }

    function pickUrlDisguise(val, label) {
      document.getElementById('url-label').innerText = label;
      markSelected('url-dd', val);
      document.getElementById('url-dd').classList.remove('open');
      setUrlDisguise(val);
    }

    function setUrlDisguise(val) {
      try { localStorage.setItem('urlDisguise', val); } catch (e) {}
      var startupRow = document.getElementById('startup-blank-row');

      if (val === 'about:blank') {
        startupRow.style.display = 'flex';
        if (!launchAboutBlank()) {
          alert('Pop-up blocked! Click the blocked pop-up icon in your address bar and allow pop-ups.');
        }
      } else {
        startupRow.style.display = 'none';
        document.getElementById('startup-blank-toggle').checked = false;
        try { localStorage.setItem('autoBlank', 'false'); } catch (e) {}
      }
    }

    function toggleStartupBlank(isChecked) {
      try { localStorage.setItem('autoBlank', isChecked ? 'true' : 'false'); } catch (e) {}
    }

    function saveBrandName() {
      var val = document.getElementById('brand-input').value.trim();
      if (val) {
        try { localStorage.setItem('customBrandName', val); } catch (e) {}
        applyCustomBrand();
      }
    }

    var savedDisguise = safeGet('tabDisguise') || 'none';
    var disguiseLabels = { none: 'None', clever: 'Clever', custom: 'Custom' };
    document.getElementById('disguise-label').innerText = disguiseLabels[savedDisguise] || 'None';
    markSelected('disguise-dd', savedDisguise);
    if (savedDisguise === 'custom') {
      document.getElementById('custom-name-row').style.display = 'flex';
      document.getElementById('custom-tab-input').value = safeGet('customTabTitle') || '';
    }

    var savedUrlDisguise = safeGet('urlDisguise') || 'default';
    var urlLabels = { 'default': 'Default', 'about:blank': 'About:Blank' };
    document.getElementById('url-label').innerText = urlLabels[savedUrlDisguise] || 'Default';
    markSelected('url-dd', savedUrlDisguise);
    if (savedUrlDisguise === 'about:blank') {
      document.getElementById('startup-blank-row').style.display = 'flex';
    }
    document.getElementById('startup-blank-toggle').checked = (safeGet('autoBlank') === 'true');
  </script>
</body>
</html>
