/*
 * OpenBox VR — Lógica do site (abas, versão PC/celular, calculadora, simulador)
 * Criador: DhaaankMK | https://github.com/DhaaankMK | https://www.youtube.com/@DhaaankMK
 * Licença: DUMP-L v1.0 (ver LICENSE.txt). Proibida a remoção dos créditos (Cláusula 3.2).
 *
 * Observações de segurança: nenhum uso de innerHTML/eval; todo texto dinâmico entra via
 * textContent; caminhos de assets externos só são aceitos com https://.
 */
(function () {
  'use strict';

  var CFG = window.OPENBOX_CONFIG || {};
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= Utilidades ================= */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) { n.className = cls; } return n; }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function store(key, val) {
    try {
      if (val === undefined) { return window.localStorage.getItem(key); }
      if (val === null) { window.localStorage.removeItem(key); } else { window.localStorage.setItem(key, val); }
    } catch (e) { /* armazenamento indisponível: segue sem persistir */ }
    return null;
  }

  /* Resolve um caminho de asset com o prefixo assetBase. Rejeita esquemas inseguros. */
  function resolveAsset(path) {
    if (typeof path !== 'string' || !path) { return null; }
    if (/^[a-z][a-z0-9+.\-]*:/i.test(path)) { return /^https:\/\//i.test(path) ? path : null; }
    if (path.indexOf('..') !== -1 || path.charAt(0) === '/') { return null; }
    var base = typeof CFG.assetBase === 'string' ? CFG.assetBase : '';
    if (base && !/^https:\/\//i.test(base)) { base = ''; }
    if (base && base.charAt(base.length - 1) !== '/') { base += '/'; }
    return base + path;
  }

  /* ================= Versão PC / Celular ================= */
  function detectDevice() {
    var saved = store('openbox.device');
    if (saved === 'pc' || saved === 'mobile') { return saved; }
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    var ua = /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent || '');
    return (ua || (coarse && window.innerWidth < 900)) ? 'mobile' : 'pc';
  }

  function setDevice(d, persist) {
    root.setAttribute('data-device', d);
    if (persist) { store('openbox.device', d); }
    $$('[data-device-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-device-btn') === d ? 'true' : 'false');
    });
    if (d !== 'mobile') { sim.stopSensors(); }
    buildToc();
    sim.draw();
  }

  /* ================= Abas ================= */
  var tabs = $$('[role="tab"]');
  var panels = $$('[role="tabpanel"]');
  var tabIds = tabs.map(function (t) { return t.getAttribute('data-tab'); });
  /* Guias: subpainéis dentro da aba "Guias" (aceitam #vr, #lentes e #software) */
  var subBtns = $$('[data-sub]');
  var subIds = subBtns.map(function (b) { return b.getAttribute('data-sub'); });
  var currentSub = subIds[0] || '';

  function showSub(sub) {
    if (subIds.indexOf(sub) === -1) { sub = subIds[0]; }
    currentSub = sub;
    subBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-sub') === sub ? 'true' : 'false'); });
    $$('.subpanel').forEach(function (p) { p.hidden = (p.id !== sub); });
  }

  function activate(id, opts) {
    opts = opts || {};
    var sub = null;
    if (subIds.indexOf(id) !== -1) { sub = id; id = 'guias'; }
    if (tabIds.indexOf(id) === -1) { id = 'inicio'; }
    if (id === 'guias') { showSub(sub || currentSub); }
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-tab') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && opts.focus) { t.focus(); }
    });
    panels.forEach(function (p) { p.hidden = (p.id !== id); });
    if (opts.updateHash !== false) {
      try { history.replaceState(null, '', '#' + (id === 'guias' ? currentSub : id)); } catch (e) { /* ignora */ }
    }
    if (opts.scroll !== false) { window.scrollTo({ top: 0 }); }
    var tab = document.getElementById('tab-' + id);
    var label = tab ? $('.tab-label', tab) : null;
    document.title = 'OpenBox VR — ' + (label ? label.textContent : 'Início');
    var simVisible = (id === 'guias' && currentSub === 'vr');
    if (!simVisible) { sim.stopSensors(); }
    buildToc();
    if (simVisible) { sim.draw(); }
  }

  /* Vai para uma aba e, opcionalmente, rola até um elemento: "diy#calculadora" */
  function goto(spec) {
    var parts = String(spec).split('#');
    activate(parts[0]);
    if (parts[1]) {
      var target = document.getElementById(parts[1]);
      if (target) {
        window.setTimeout(function () {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }, 40);
      }
    }
  }

  function initTabs() {
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(t.getAttribute('data-tab')); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') { n = (i + 1) % tabs.length; }
        else if (e.key === 'ArrowLeft') { n = (i - 1 + tabs.length) % tabs.length; }
        else if (e.key === 'Home') { n = 0; }
        else if (e.key === 'End') { n = tabs.length - 1; }
        if (n !== null) { e.preventDefault(); activate(tabs[n].getAttribute('data-tab'), { focus: true }); }
      });
    });

    $$('[data-goto]').forEach(function (node) {
      node.addEventListener('click', function (e) {
        e.preventDefault();
        goto(node.getAttribute('data-goto'));
      });
    });

    subBtns.forEach(function (b) {
      b.addEventListener('click', function () { activate(b.getAttribute('data-sub')); });
    });

    function known(h) { return tabIds.indexOf(h) !== -1 || subIds.indexOf(h) !== -1; }
    window.addEventListener('hashchange', function () {
      var h = (location.hash || '').replace('#', '');
      if (known(h)) { activate(h, { updateHash: false, scroll: false }); }
    });

    var h0 = (location.hash || '').replace('#', '');
    activate(known(h0) ? h0 : 'inicio', { updateHash: false, scroll: false });
  }

  /* ================= Índice lateral ("Nesta aba") ================= */
  var tocObserver = null;

  function slug(t) {
    return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  }

  function buildToc() {
    var list = $('#toc-list');
    if (!list) { return; }
    list.textContent = '';
    if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
    if (root.getAttribute('data-device') === 'mobile') { return; }
    var panel = $('.panel:not([hidden])');
    if (panel && panel.id === 'guias') { panel = $('.subpanel:not([hidden])') || panel; }
    if (!panel) { return; }

    var heads = $$('h2, h3', panel).filter(function (h) {
      return !h.closest('details, .card, ol.steps, .demo, .note, .hero');
    });
    var links = [];
    heads.forEach(function (h, i) {
      if (!h.id) { h.id = panel.id + '-' + slug(h.textContent) + '-' + i; }
      var li = el('li', h.tagName === 'H3' ? 'lvl3' : 'lvl2');
      var a = el('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace(/^\s*[>\d.]+\s*/, '').trim() || h.textContent;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
      li.appendChild(a);
      list.appendChild(li);
      links.push({ h: h, a: a });
    });

    if ('IntersectionObserver' in window && links.length) {
      tocObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) { return; }
          links.forEach(function (l) { l.a.removeAttribute('aria-current'); });
          links.forEach(function (l) { if (l.h === en.target) { l.a.setAttribute('aria-current', 'true'); } });
        });
      }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
      links.forEach(function (l) { tocObserver.observe(l.h); });
    }
  }

  /* ================= Assets: logo e moldes ================= */
  function initLogo() {
    var url = resolveAsset(CFG.logo);
    if (!url) { return; }
    var probe = new Image();
    probe.onload = function () { $$('img[data-logo]').forEach(function (i) { i.src = url; }); };
    probe.src = url; /* se não existir, o SVG provisório permanece */
  }

  function renderMoldes() {
    var box = $('#moldes-list');
    if (!box) { return; }
    box.textContent = '';
    (CFG.moldes || []).forEach(function (m) {
      var row = el('div', 'dl');
      var meta = el('div', 'meta');
      var s = el('strong'); s.textContent = String(m.titulo || '');
      var sm = el('small'); sm.textContent = String(m.descricao || '');
      meta.appendChild(s); meta.appendChild(sm);
      var act = el('div', 'act');
      var url = m.arquivo ? resolveAsset(m.arquivo) : null;
      if (url) {
        var a = el('a', 'btn ghost');
        a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.setAttribute('download', '');
        a.textContent = 'Baixar PDF';
        act.appendChild(a);
      } else {
        var tag = el('span', 'tag');
        tag.textContent = 'EM BREVE';
        act.appendChild(tag);
      }
      row.appendChild(meta); row.appendChild(act);
      box.appendChild(row);
    });
  }

  /* ================= Checklist do tutorial ================= */
  function initChecklist() {
    var items = $$('#diy ol.steps > li');
    var prog = $('#diy-prog');
    var txt = $('#diy-prog-text');
    var reset = $('#diy-reset');
    if (!items.length || !prog || !txt) { return; }
    prog.max = items.length;

    function refresh() {
      var n = items.filter(function (li) { return li.classList.contains('done'); }).length;
      prog.value = n;
      txt.textContent = n + ' de ' + items.length + ' etapas concluídas';
    }

    items.forEach(function (li, i) {
      var key = 'openbox.diy.step' + i;
      var label = el('label', 'check');
      var cb = el('input'); cb.type = 'checkbox';
      var span = el('span'); span.textContent = 'Concluí esta etapa';
      label.appendChild(cb); label.appendChild(span);
      li.appendChild(label);
      if (store(key) === '1') { cb.checked = true; li.classList.add('done'); }
      cb.addEventListener('change', function () {
        li.classList.toggle('done', cb.checked);
        store(key, cb.checked ? '1' : null);
        refresh();
        if (cb.checked) {
          var all = items.every(function (x) { return x.classList.contains('done'); });
          sfx.play(all ? 'aviso' : 'sucesso');
        }
      });
    });

    if (reset) {
      reset.addEventListener('click', function () {
        items.forEach(function (li, i) {
          li.classList.remove('done');
          var cb = $('input[type="checkbox"]', li);
          if (cb) { cb.checked = false; }
          store('openbox.diy.step' + i, null);
        });
        refresh();
      });
    }
    refresh();
  }

  /* ================= Calculadora de medidas ================= */
  function initCalc() {
    var f = {
      preset: $('#calc-preset'), len: $('#calc-len'), wid: $('#calc-wid'), thk: $('#calc-thk'),
      ipd: $('#calc-ipd'), foc: $('#calc-foc'), msg: $('#calc-msg')
    };
    var r = {
      comp: $('#r-comp'), eye: $('#r-eye'), lens: $('#r-lens'), view: $('#r-view'),
      d1: $('#r-d1'), d2: $('#r-d2'), dinf: $('#r-dinf'), range: $('#r-range')
    };
    if (!f.len || !r.comp) { return; }

    var limits = [
      [f.len, 100, 220, 'Comprimento'], [f.wid, 45, 110, 'Largura'], [f.thk, 5, 15, 'Espessura'],
      [f.ipd, 50, 80, 'IPD'], [f.foc, 20, 100, 'Distância focal']
    ];

    function clear() { Object.keys(r).forEach(function (k) { r[k].textContent = '—'; }); }
    function mm(n) { return n.toFixed(1).replace('.', ',') + ' mm'; }

    function calc() {
      var vals = {};
      for (var i = 0; i < limits.length; i++) {
        var inp = limits[i][0], v = parseFloat(String(inp.value).replace(',', '.'));
        if (!isFinite(v) || v < limits[i][1] || v > limits[i][2]) {
          f.msg.textContent = limits[i][3] + ' deve estar entre ' + limits[i][1] + ' e ' + limits[i][2] + ' mm.';
          clear();
          return;
        }
        vals[i] = v;
      }
      f.msg.textContent = '';
      var L = vals[0], W = vals[1], T = vals[2], ipd = vals[3], fl = vals[4];
      function d(v) { return fl * v / (fl + v); } /* equação das lentes finas: imagem virtual a v mm */
      var diff = Math.abs(ipd / 2 - L / 4);

      r.comp.textContent = (L + 2).toFixed(0) + ' × ' + (W + 2).toFixed(0) + ' × ' + (T + 2).toFixed(0) + ' mm';
      r.eye.textContent = mm(L / 2) + ' × ' + mm(W);
      r.lens.textContent = mm(ipd / 2) + ' para cada lado do centro';
      r.view.textContent = mm(L / 4) + ' do centro da tela' + (diff > 6 ? ' (diferença de ' + mm(diff) + ': ajuste o IPD/perfil no app)' : ' (diferença de ' + mm(diff) + ': aceitável)');
      r.d1.textContent = mm(d(1000));
      r.d2.textContent = mm(d(2000));
      r.dinf.textContent = mm(fl);
      r.range.textContent = 'de ' + mm(d(1000)) + ' a ' + mm(fl);
    }

    if (f.preset) {
      f.preset.addEventListener('change', function () {
        var p = f.preset.value.split(',');
        if (p.length === 3) { f.len.value = p[0]; f.wid.value = p[1]; f.thk.value = p[2]; calc(); }
      });
    }
    limits.forEach(function (l) {
      l[0].addEventListener('input', function () {
        var before = f.msg.textContent;
        calc();
        if (!before && f.msg.textContent) { sfx.play('erro'); }
      });
    });
    calc();
  }

  /* ================= Simulador de VR (estéreo + 3DoF) ================= */
  var sim = (function () {
    var canvas = $('#sim-canvas');
    var ipdRange = $('#sim-ipd');
    var ipdOut = $('#sim-ipd-out');
    var readout = $('#sim-readout');
    var btnCenter = $('#sim-center');
    var btnSensor = $('#sim-sensor');
    var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

    var yaw = 0, pitch = 0; /* graus */
    var sensorOn = false, a0 = null;

    /* ---- Cena: 5 cubos e um piso em grade ---- */
    var segs = [];
    function cube(cx, cy, cz, s, color) {
      var h = s / 2, v = [], i;
      for (i = 0; i < 8; i++) {
        v.push([cx + ((i & 1) ? h : -h), cy + ((i & 2) ? h : -h), cz + ((i & 4) ? h : -h)]);
      }
      [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(function (e) {
        segs.push([v[e[0]], v[e[1]], color]);
      });
    }
    cube(-1.5, 0, 4, 0.8, '#00c8ff');
    cube(1.2, 0.2, 3, 0.6, '#39ff88');
    cube(0, 0.5, 6, 1.0, '#00c8ff');
    cube(3, -0.2, 5, 0.7, '#39ff88');
    cube(-3, 0.3, 7, 1.2, '#00c8ff');
    var gy = -1.2, g;
    for (g = -6; g <= 6; g += 1) { segs.push([[g, gy, 1], [g, gy, 10], '#1b4a6e']); }
    for (g = 1; g <= 10; g += 1) { segs.push([[-6, gy, g], [6, gy, g], '#1b4a6e']); }

    function toRad(d) { return d * Math.PI / 180; }

    function transform(p, cy, sy, cp, sp, eyeX) {
      var x1 = p[0] * cy - p[2] * sy;
      var z1 = p[0] * sy + p[2] * cy;
      var y2 = p[1] * cp - z1 * sp;
      var z2 = p[1] * sp + z1 * cp;
      return [x1 - eyeX, y2, z2];
    }

    function drawEye(cx, cyc, R, eyeX, cy, sy, cp, sp) {
      var focal = R * 1.05, near = 0.1;
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cyc, R, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = '#071326'; ctx.fillRect(cx - R, cyc - R, R * 2, R * 2);
      ctx.lineWidth = 2; ctx.lineCap = 'round';
      segs.forEach(function (s) {
        var a = transform(s[0], cy, sy, cp, sp, eyeX), b = transform(s[1], cy, sy, cp, sp, eyeX), t;
        if (a[2] < near && b[2] < near) { return; }
        if (a[2] < near) { t = (near - a[2]) / (b[2] - a[2]); a = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]), near]; }
        else if (b[2] < near) { t = (near - b[2]) / (a[2] - b[2]); b = [b[0] + t * (a[0] - b[0]), b[1] + t * (a[1] - b[1]), near]; }
        ctx.strokeStyle = s[2];
        ctx.beginPath();
        ctx.moveTo(cx + focal * a[0] / a[2], cyc - focal * a[1] / a[2]);
        ctx.lineTo(cx + focal * b[0] / b[2], cyc - focal * b[1] / b[2]);
        ctx.stroke();
      });
      ctx.restore();
      ctx.strokeStyle = '#00c8ff'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cyc, R, 0, Math.PI * 2); ctx.stroke();
    }

    function draw() {
      if (!ctx) { return; }
      var w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      var R = Math.min(w / 4, h / 2) - 8;
      var ex = (ipdRange ? parseFloat(ipdRange.value) : 3) * 0.0315; /* IPD real/2 (0,0315 m) × exagero */
      var cy = Math.cos(toRad(yaw)), sy = Math.sin(toRad(yaw));
      var cp = Math.cos(toRad(pitch)), sp = Math.sin(toRad(pitch));
      drawEye(w / 4, h / 2, R, -ex, cy, sy, cp, sp);
      drawEye(3 * w / 4, h / 2, R, ex, cy, sy, cp, sp);
      if (readout) {
        readout.textContent = 'yaw (esq./dir.): ' + Math.round(yaw) + '°  |  pitch (cima/baixo): ' + Math.round(pitch) + '°';
      }
    }

    function setView(y, p) { yaw = clamp(y, -120, 120); pitch = clamp(p, -70, 70); draw(); }

    function onIpd() {
      if (ipdOut) { ipdOut.textContent = parseFloat(ipdRange.value).toFixed(1).replace('.', ',') + '×'; }
      draw();
    }

    function onOrient(e) {
      if (e.alpha === null && e.beta === null) { return; }
      if (a0 === null) { a0 = e.alpha || 0; }
      var d = (((e.alpha || 0) - a0 + 540) % 360) - 180;
      setView(-d, (e.beta || 90) - 90);
    }

    function stopSensors() {
      if (!sensorOn) { return; }
      window.removeEventListener('deviceorientation', onOrient);
      sensorOn = false; a0 = null;
      if (btnSensor) { btnSensor.textContent = 'Usar sensores do celular'; }
    }

    function startSensors() {
      if (typeof window.DeviceOrientationEvent === 'undefined') {
        if (readout) { readout.textContent = 'Este navegador não oferece sensores de orientação.'; }
        return;
      }
      function begin() {
        a0 = null;
        window.addEventListener('deviceorientation', onOrient);
        sensorOn = true;
        if (btnSensor) { btnSensor.textContent = 'Desativar sensores'; }
      }
      if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission().then(function (res) {
          if (res === 'granted') { begin(); } else if (readout) { readout.textContent = 'Permissão negada pelo usuário.'; }
        }).catch(function () {
          if (readout) { readout.textContent = 'Não foi possível pedir a permissão (é necessário HTTPS).'; }
        });
      } else { begin(); }
    }

    function init() {
      if (!canvas || !ctx) { return; }
      if (ipdRange) { ipdRange.addEventListener('input', onIpd); onIpd(); }

      /* Mouse: o ponteiro sobre a imagem controla a "cabeça" virtual (versão PC) */
      canvas.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse' || root.getAttribute('data-device') !== 'pc') { return; }
        var rc = canvas.getBoundingClientRect();
        var nx = (e.clientX - rc.left) / rc.width - 0.5;
        var ny = (e.clientY - rc.top) / rc.height - 0.5;
        setView(nx * 160, -ny * 100);
      });
      /* Teclado: setas giram a cabeça virtual */
      canvas.addEventListener('keydown', function (e) {
        var step = 6, used = true;
        if (e.key === 'ArrowLeft') { setView(yaw - step, pitch); }
        else if (e.key === 'ArrowRight') { setView(yaw + step, pitch); }
        else if (e.key === 'ArrowUp') { setView(yaw, pitch + step); }
        else if (e.key === 'ArrowDown') { setView(yaw, pitch - step); }
        else { used = false; }
        if (used) { e.preventDefault(); }
      });
      if (btnCenter) { btnCenter.addEventListener('click', function () { a0 = null; setView(0, 0); }); }
      if (btnSensor) { btnSensor.addEventListener('click', function () { if (sensorOn) { stopSensors(); } else { startSensors(); } }); }
      draw();
    }

    return { init: init, draw: draw, stopSensors: stopSensors };
  })();

  /* ================= Sons (com botão de silenciar) ================= */
  var sfx = (function () {
    var files = { click: 'assets/audio/click.mp3', erro: 'assets/audio/erro.mp3', sucesso: 'assets/audio/sucesso.mp3', aviso: 'assets/audio/notificacao.wav' };
    var cache = {};
    var on = store('openbox.sound') !== '0';
    var btn = $('#sound-btn');

    function paint() {
      if (!btn) { return; }
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? '🔊' : '🔇';
      btn.setAttribute('aria-label', on ? 'Sons ligados. Toque para silenciar' : 'Sons desligados. Toque para ligar');
    }

    function play(name) {
      if (!on || !files[name]) { return; }
      try {
        var url = resolveAsset(files[name]);
        if (!url) { return; }
        var a = cache[name] || (cache[name] = new Audio(url));
        a.volume = 0.35;
        a.currentTime = 0;
        var pr = a.play();
        if (pr && pr.catch) { pr.catch(function () { /* navegador bloqueou o áudio */ }); }
      } catch (e) { /* sem áudio: segue normalmente */ }
    }

    function init() {
      paint();
      if (btn) {
        btn.addEventListener('click', function () {
          on = !on;
          store('openbox.sound', on ? '1' : '0');
          paint();
          if (on) { play('click'); }
        });
      }
      document.addEventListener('click', function (e) {
        var t = e.target && e.target.closest ? e.target.closest('button, a.btn, a.nav-card') : null;
        if (t && t.id !== 'sound-btn' && !t.closest('.steps')) { play('click'); }
      });
    }
    return { init: init, play: play };
  })();

  /* ================= Escolha da versão do Cardboard ================= */
  function initVersions() {
    var btns = $$('[data-ver]');
    if (!btns.length) { return; }
    function show(v) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ver') === v ? 'true' : 'false'); });
      $$('.ver-panel').forEach(function (p) { p.hidden = (p.id !== 'ver-' + v); });
      store('openbox.ver', v);
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-ver')); }); });
    var saved = store('openbox.ver');
    show(saved === 'v2' ? 'v2' : 'v1');
  }

  /* ================= Enciclopédia de VRs ================= */
  function renderVrs() {
    var list = $('#vrs-lista');
    var data = window.OPENBOX_VRS;
    if (!list || !Array.isArray(data)) { return; }
    var q = $('#vrs-q'), cat = $('#vrs-cat'), ord = $('#vrs-ord'), count = $('#vrs-count');

    var cats = [];
    data.forEach(function (v) { if (v.categoria && cats.indexOf(v.categoria) === -1) { cats.push(v.categoria); } });
    cats.sort();
    cats.forEach(function (c) { var o = el('option'); o.value = c; o.textContent = c; cat.appendChild(o); });

    function norm(t) { return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function safeUrl(u) { return (typeof u === 'string' && /^https:\/\/[^\s"'<>]+$/i.test(u)) ? u : null; }
    function dash(v) { return (v === null || v === undefined || v === '') ? '—' : String(v); }
    function year(v) { return v.lancamento ? String(v.lancamento).slice(0, 4) : null; }

    function badge(text, cls) { var b = el('span', 'badge' + (cls ? ' ' + cls : '')); b.textContent = text; return b; }

    function ficha(v) {
      var box = el('div', 'vr-ficha');
      box.id = 'ficha-' + v.id;
      box.hidden = true;
      var dl = el('dl');
      [
        ['Lançamento', v.lancamento], ['Status', v.status], ['Plataforma', v.plataforma],
        ['Graus de liberdade', v.graus_de_liberdade], ['Tela', v.tela], ['Campo de visão', v.campo_de_visao],
        ['Atualização', v.taxa_de_atualizacao], ['Rastreamento', v.rastreamento],
        ['Preço de lançamento', v.preco_lancamento], ['Peso', v.peso]
      ].forEach(function (r) {
        var dt = el('dt'); dt.textContent = r[0];
        var dd = el('dd'); dd.textContent = dash(r[1]);
        dl.appendChild(dt); dl.appendChild(dd);
      });
      box.appendChild(dl);
      if (v.destaques && v.destaques.length) {
        var h = el('h4'); h.textContent = 'Destaques'; box.appendChild(h);
        var ul = el('ul');
        v.destaques.forEach(function (d) { var li = el('li'); li.textContent = String(d); ul.appendChild(li); });
        box.appendChild(ul);
      }
      var h2 = el('h4'); h2.textContent = 'Fontes'; box.appendChild(h2);
      var srcs = (v.fontes || []).map(safeUrl).filter(Boolean);
      if (srcs.length) {
        var ul2 = el('ul');
        srcs.forEach(function (u) {
          var li = el('li'); var a = el('a');
          a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.textContent = u.replace(/^https:\/\/(www\.)?/, '');
          li.appendChild(a); ul2.appendChild(li);
        });
        box.appendChild(ul2);
      } else {
        var p = el('p'); p.textContent = 'Sem fonte técnica confirmada.'; box.appendChild(p);
      }
      return box;
    }

    function card(v) {
      var a = el('article', 'vr-card');
      var imgUrl = v.foto ? resolveAsset(v.foto) : null;
      if (imgUrl) {
        var fig = el('figure', 'vr-fig');
        var img = el('img');
        img.src = imgUrl; img.alt = String(v.foto_alt || ('Foto: ' + v.nome));
        img.loading = 'lazy'; img.width = 360; img.height = 240;
        fig.appendChild(img); a.appendChild(fig);
      }
      var body = el('div', 'vr-body');
      var h = el('h3'); h.textContent = v.nome; body.appendChild(h);
      var meta = el('p', 'vr-meta');
      meta.textContent = [v.fabricante, year(v)].filter(Boolean).join(' · ');
      body.appendChild(meta);
      var bd = el('div', 'vr-badges');
      if (v.categoria) { bd.appendChild(badge(v.categoria, 'b')); }
      if (v.graus_de_liberdade) { bd.appendChild(badge(v.graus_de_liberdade, '')); }
      if (v.status) { bd.appendChild(badge(v.status, v.status === 'À venda' ? '' : 'warn')); }
      body.appendChild(bd);
      var r = el('p', 'vr-resumo'); r.textContent = v.resumo || ''; body.appendChild(r);
      var f = ficha(v);
      var btn = el('button', 'btn ghost small');
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', f.id);
      btn.textContent = 'Ver ficha completa';
      btn.addEventListener('click', function () {
        var open = f.hidden;
        f.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = open ? 'Ocultar ficha' : 'Ver ficha completa';
      });
      body.appendChild(btn); body.appendChild(f);
      a.appendChild(body);
      return a;
    }

    function draw() {
      var term = norm(q.value), c = cat.value, mode = ord.value;
      var rows = data.filter(function (v) {
        if (c && v.categoria !== c) { return false; }
        if (!term) { return true; }
        return norm([v.nome, v.fabricante, v.categoria, v.lancamento, v.plataforma, v.resumo].join(' ')).indexOf(term) !== -1;
      });
      rows.sort(function (a, b) {
        if (mode === 'nome') { return norm(a.nome).localeCompare(norm(b.nome)); }
        /* itens sem data de lançamento ficam sempre no final, em qualquer ordem */
        if (!a.lancamento && b.lancamento) { return 1; }
        if (a.lancamento && !b.lancamento) { return -1; }
        var ka = a.lancamento || '', kb = b.lancamento || '';
        if (ka === kb) { return norm(a.nome).localeCompare(norm(b.nome)); }
        return mode === 'desc' ? (ka < kb ? 1 : -1) : (ka < kb ? -1 : 1);
      });
      list.textContent = '';
      if (!rows.length) {
        var e = el('p', 'vr-empty'); e.textContent = 'Nenhum headset encontrado com esses filtros.'; list.appendChild(e);
      } else {
        rows.forEach(function (v) { list.appendChild(card(v)); });
      }
      count.textContent = rows.length + ' de ' + data.length + ' headsets';
    }

    q.addEventListener('input', draw);
    cat.addEventListener('change', draw);
    ord.addEventListener('change', draw);
    draw();
  }

  /* ================= Inicialização ================= */
  setDevice(detectDevice(), false);
  $$('[data-device-btn]').forEach(function (b) {
    b.addEventListener('click', function () { setDevice(b.getAttribute('data-device-btn'), true); });
  });
  initTabs();
  initLogo();
  renderMoldes();
  initChecklist();
  initCalc();
  initVersions();
  renderVrs();
  sfx.init();
  sim.init();
  buildToc();
})();
