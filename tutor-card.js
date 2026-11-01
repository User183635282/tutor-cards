/* tutor-card.js v1.1.0 - question cards for the tutor skill (SPEC section 6). ASCII only.
   TutorCard.render(el, SPEC) | .plan(el, PLAN) | .panel(el, {html|text, title}) | .ready()  Needs the host CSS variables. */
(function (g) {
  'use strict';
  var STOPS = [0, 30, 50, 70, 90, 100], uid = 0, DOT = String.fromCharCode(183), DASH = String.fromCharCode(8212);
  var KB = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/', NS = 'http://www.w3.org/2000/svg';
  var CSS = '.tc{--tp:var(--text-primary,#141413);--ts:var(--text-secondary,#3d3d3a);--tm:var(--text-muted,#73726c);' +
    '--td:var(--text-danger,#a32d2d);--s1:var(--surface-1,#fff);--s2:var(--surface-2,#f5f4ed);--bd:var(--border,#d8d6cc);' +
    '--ba:var(--border-accent,#378add);--bg:var(--bg-accent,#e6f1fb);--r:var(--radius,8px);max-width:640px;margin:0 auto 12px;' +
    'padding:16px;background:var(--s1);color:var(--tp);border:.5px solid var(--bd);border-radius:12px;font:inherit;' +
    'font-size:14px;line-height:1.55}.tc,.tc *{box-sizing:border-box}.tc-pre{white-space:pre-line}' +
    '.tc-h{font-size:12px;color:var(--tm);margin-bottom:8px}.tc-note{font-size:13px;color:var(--tm);margin-top:10px}' +
    '.tc-panel{background:var(--s2);border:.5px solid var(--bd);border-radius:var(--r);padding:12px 14px;margin-bottom:14px;color:var(--ts)}' +
    '.tc-fig{margin:0 0 14px;text-align:center}.tc-fig svg{max-width:100%;height:auto}' +
    '.tc-p{font-size:15px;font-weight:500;margin-bottom:6px}.tc-opts{display:flex;flex-direction:column;gap:8px;margin:10px 0 14px}' +
    '.tc-opt{position:relative;display:flex;gap:10px;align-items:center;padding:9px 12px;border:.5px solid var(--bd);' +
    'border-radius:var(--r);cursor:pointer}.tc-opt input{position:absolute;opacity:0;pointer-events:none}' +
    '.tc-opt.on{border-color:var(--ba);background:var(--bg)}.tc-opt:focus-within{outline:1.5px solid var(--ba);outline-offset:1px}' +
    '.tc-l{flex:none;width:22px;height:22px;border:.5px solid var(--bd);border-radius:50%;font-size:12px;color:var(--ts);' +
    'display:flex;align-items:center;justify-content:center}.tc-opt.on .tc-l{border-color:var(--ba);color:var(--tp)}' +
    '.tc-t{flex:1;min-width:0}.tc-f{display:block;font-size:13px;color:var(--ts)}' +
    '.tc textarea{display:block;width:100%;min-height:64px;padding:8px 10px;margin:4px 0 12px;font:inherit;color:var(--tp);' +
    'background:var(--s1);border:.5px solid var(--bd);border-radius:var(--r);resize:vertical}' +
    '.tc textarea:focus{outline:1.5px solid var(--ba)}.tc textarea:disabled{opacity:.6}' +
    '.tc-idk{display:flex;align-items:center;gap:6px;margin:-4px 0 12px;font-size:13px;color:var(--ts)}' +
    '.tc-cf{margin:4px 0 14px}.tc-cr{display:flex;justify-content:space-between;font-size:13px;color:var(--ts)}' +
    '.tc-cr b{font-weight:500;color:var(--tp)}.tc input[type=range]{display:block;width:100%;margin:8px 0 0;accent-color:var(--tp)}' +
    '.tc-un input[type=range]{opacity:.45}.tc-tk{position:relative;height:16px;margin:0 8px}' +
    '.tc-tk span{position:absolute;transform:translateX(-50%);font-size:11px;color:var(--tm)}' +
    '.tc-ft{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.tc-send{font:inherit;font-weight:500;padding:7px 18px;' +
    'color:var(--tp);background:var(--bg);border:.5px solid var(--ba);border-radius:var(--r);cursor:pointer}' +
    '.tc-send:disabled{opacity:.6;cursor:default}.tc-er{font-size:13px;color:var(--td)}' +
    '.tc-copy{margin:6px 0 0;font-size:12px;white-space:pre-wrap;word-break:break-word}.tc.lock .tc-opt{pointer-events:none}' +
    '.tc .katex-display{margin:.5em 0;overflow-x:auto;overflow-y:hidden}.tc-g{font-size:15px;font-weight:500;margin-bottom:12px}' +
    '.tc-tree{position:relative;display:flex;flex-direction:column;gap:26px;margin:8px 0}' +
    '.tc-tree svg{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}' +
    '.tc-row{position:relative;display:flex;flex-wrap:wrap;justify-content:center;gap:10px}' +
    '.tc-n{display:flex;gap:6px;align-items:flex-start;flex:0 1 150px;padding:8px 10px;font-size:13px;background:var(--s1);' +
    'border:.5px solid var(--ba);border-radius:var(--r)}.tc-n.held{border-style:dashed;border-color:var(--bd);color:var(--tm)}' +
    '.tc-b{flex:none;width:20px;height:20px;border-radius:50%;background:var(--bg);border:.5px solid var(--ba);font-size:11px;' +
    'color:var(--tp);display:flex;align-items:center;justify-content:center}.tc-n small{display:block;font-size:11px}';

  function h(tag, a, kids) {
    var e = document.createElement(tag), k, v;
    for (k in a || {}) {
      v = a[k];
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function start(el) {
    if (!document.getElementById('tc-style')) document.head.appendChild(h('style', { id: 'tc-style', text: CSS }));
    el.innerHTML = '';
  }

  /* KaTeX loads once per page. A failure resolves false: the raw TeX stays on screen. */
  function ready() {
    return g.__tcKatex || (g.__tcKatex = new Promise(function (ok) {
      if (g.renderMathInElement) return ok(true);
      function load(src, next) { document.head.appendChild(h('script', { src: src, onload: next, onerror: function () { ok(false); } })); }
      document.head.appendChild(h('link', { rel: 'stylesheet', href: KB + 'katex.min.css' }));
      load(KB + 'katex.min.js', function () { load(KB + 'contrib/auto-render.min.js', function () { ok(true); }); });
    }));
  }
  function math(el) {
    return ready().then(function (ok) {
      if (ok && g.renderMathInElement) {
        try {
          g.renderMathInElement(el, { throwOnError: false, delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }] });
        } catch (e) { /* raw TeX stays */ }
      }
      return ok;
    });
  }

  /* seeded shuffle (FNV-1a hash, mulberry32): the same qid gives the same order on every render */
  function shuffle(list, seed) {
    var a = 2166136261, i, j, t, r = list.slice();
    for (i = 0; i < seed.length; i++) { a ^= seed.charCodeAt(i); a = Math.imul(a, 16777619); }
    function rnd() {
      t = (a = (a + 0x6D2B79F5) | 0);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    for (i = r.length - 1; i > 0; i--) { j = Math.floor(rnd() * (i + 1)); t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function clean(s) { return String(s || '').replace(/\|/g, '/').replace(/\s*\r?\n\s*/g, ' / ').trim(); }

  /* Drafts: what is typed (and chosen) is saved as it changes, so a re-render of the widget does not wipe it.
     Storage can throw (sandboxed frame, blocked site data), so every call is guarded and a copy lives in memory too. */
  var DP = 'tc-draft:', DAGE = 7 * 864e5, MEM = g.__tcDrafts || (g.__tcDrafts = {});
  function hash(str) {
    var a = 2166136261, i;
    for (i = 0; i < str.length; i++) { a ^= str.charCodeAt(i); a = Math.imul(a, 16777619); }
    return (a >>> 0).toString(36);
  }
  /* qid repeats from one session to the next, so the key adds the session id when the spec has one, and a hash of the question */
  function draftKey(s, qid) {
    var body = [s.concept, s.panel, s.prompt].concat((s.options || []).map(function (o) { return o.id + o.text; })).join('\u0001');
    return DP + (s.sid ? s.sid + ':' : '') + qid + ':' + hash(body);
  }
  function stores() {
    var out = [];
    ['localStorage', 'sessionStorage'].forEach(function (n) { try { if (g[n]) out.push(g[n]); } catch (e) { /* blocked */ } });
    return out;
  }
  function draftGet(key) {
    var raw = null;
    stores().some(function (S) { try { raw = S.getItem(key); } catch (e) { raw = null; } return !!raw; });
    try { return raw ? JSON.parse(raw) : (MEM[key] || null); } catch (e) { return MEM[key] || null; }
  }
  function draftPut(key, d) {
    var raw = JSON.stringify(d);
    MEM[key] = d;
    stores().some(function (S) { try { S.setItem(key, raw); return true; } catch (e) { return false; } });
  }
  function draftDrop(key) {
    delete MEM[key];
    stores().forEach(function (S) { try { S.removeItem(key); } catch (e) { /* blocked */ } });
  }
  function draftPrune() {
    stores().forEach(function (S) {
      try {
        var k = [], i, d;
        for (i = 0; i < S.length; i++) if (S.key(i).indexOf(DP) === 0) k.push(S.key(i));
        k.forEach(function (n) {
          try { d = JSON.parse(S.getItem(n)); } catch (e) { d = null; }
          if (!d || !(Date.now() - d.ts < DAGE)) S.removeItem(n);
        });
      } catch (e) { /* blocked */ }
    });
  }

  function render(el, s) {
    start(el);
    var kind = s.kind || 'choice', isC = kind === 'choice', qid = String(s.qid), st = { opt: null, conf: null, idk: false, sent: false };
    var root = h('div', { class: 'tc', role: 'group', 'aria-label': 'Question ' + qid, 'data-qid': qid }), ta, read, box;
    var err = h('span', { class: 'tc-er', role: 'alert' });
    el.appendChild(root);
    root.appendChild(h('div', { class: 'tc-h', text: [(s.role || kind).replace(/^./, function (c) { return c.toUpperCase(); }), s.concept].filter(Boolean).join(' ' + DOT + ' ') }));
    if (s.panel) root.appendChild(h('div', { class: 'tc-panel tc-pre', text: s.panel }));
    if (s.figure) { box = h('div', { class: 'tc-fig' }); box.innerHTML = s.figure; root.appendChild(box); }
    root.appendChild(h('div', { class: 'tc-p tc-pre', text: s.prompt || '' }));
    if (kind === 'predict') root.appendChild(h('div', { class: 'tc-note', text: 'A guess is fine: this is before the step.', style: 'margin:0 0 8px' }));

    if (isC) {
      if (!s.options || s.options.length < 2) { root.appendChild(h('div', { class: 'tc-er', text: 'Card error: no options.' })); return root; }
      box = h('div', { class: 'tc-opts', role: 'radiogroup', 'aria-label': 'Answer options' });
      var grp = 'tc' + (++uid);
      shuffle(s.options, qid).concat([{ id: 'idk', text: "I don't know", idk: 1 }]).forEach(function (o, i) {
        o.letter = o.idk ? '?' : String.fromCharCode(65 + i);
        var inp = h('input', { type: 'radio', name: grp, 'data-id': o.id }), lab;
        lab = h('label', { class: 'tc-opt' }, [inp, h('span', { class: 'tc-l', text: o.letter }), h('span', { class: 'tc-t', text: o.text })]);
        inp.addEventListener('change', function () {
          st.opt = o; st.idk = !!o.idk; err.textContent = '';
          [].forEach.call(box.children, function (c) { c.classList.toggle('on', c === lab); });
        });
        box.appendChild(lab);
      });
      root.appendChild(box);
    } else {
      ta = h('textarea', { 'aria-label': 'Your answer', placeholder: kind === 'predict' ? 'Your prediction' : 'Your answer' });
      var idk = h('input', { type: 'checkbox' });
      idk.addEventListener('change', function () { st.idk = idk.checked; ta.disabled = st.idk; err.textContent = ''; });
      root.appendChild(ta);
      root.appendChild(h('label', { class: 'tc-idk' }, [idk, "I don't know"]));
    }

    /* confidence: slider 0..5 -> STOPS; the readout is a dash until it is moved */
    var sl = h('input', { type: 'range', min: 0, max: 5, step: 1, value: 0, 'aria-label': 'Confidence' });
    var out = h('b', { text: DASH }), cf = h('div', { class: 'tc-cf tc-un' }, [h('div', { class: 'tc-cr' }, ['How confident are you?', out]), sl]);
    var tk = h('div', { class: 'tc-tk' });
    function setConf() { st.conf = +sl.value; out.textContent = STOPS[st.conf] + '%'; sl.setAttribute('aria-valuetext', STOPS[st.conf] + '%'); cf.classList.remove('tc-un'); err.textContent = ''; }
    STOPS.forEach(function (v, i) { tk.appendChild(h('span', { text: v + '%', style: 'left:' + i * 20 + '%' })); });
    sl.addEventListener('input', setConf);
    sl.addEventListener('pointerup', setConf);
    sl.addEventListener('keydown', function (e) { if (/^(Arrow|Home|End|Page)/.test(e.key)) setConf(); });
    cf.appendChild(tk);
    root.appendChild(cf);

    var think = h('textarea', { 'aria-label': 'What were you thinking?' });
    root.appendChild(h('label', { class: 'tc-f', text: 'What were you thinking?' }));
    root.appendChild(think);
    if (s.reading) {
      read = h('textarea', { 'aria-label': 'What were you thinking while reading?' });
      root.appendChild(h('label', { class: 'tc-f', text: 'What were you thinking while reading?' }));
      root.appendChild(read);
    }
    var btn = h('button', { class: 'tc-send', type: 'button', text: 'Send' });
    root.appendChild(h('div', { class: 'tc-ft' }, [btn, err]));

    /* save on every change; restore once the boxes exist */
    var dkey = draftKey(s, qid);
    function save() {
      if (st.sent) return;
      var d = { ts: Date.now(), a: ta ? ta.value : '', t: think.value, r: read ? read.value : '', o: st.opt ? st.opt.id : null, c: st.conf, i: st.idk };
      if (!d.a && !d.t && !d.r && d.o == null && d.c == null && !d.i) draftDrop(dkey); else draftPut(dkey, d);
    }
    ['input', 'change', 'pointerup', 'keyup'].forEach(function (ev) { root.addEventListener(ev, save); });
    function fire(x, ev) { x.dispatchEvent(new Event(ev, { bubbles: true })); }
    (function restore() {
      var d = draftGet(dkey);
      if (!d) return;
      if (ta && d.a) ta.value = d.a;
      if (d.t) think.value = d.t;
      if (read && d.r) read.value = d.r;
      if (isC && d.o != null) {
        [].some.call(root.querySelectorAll('input[data-id]'), function (x) {
          if (x.getAttribute('data-id') !== d.o) return false;
          x.checked = true; fire(x, 'change'); return true;
        });
      }
      if (!isC && d.i) { idk.checked = true; fire(idk, 'change'); }
      if (d.c != null && d.c >= 0 && d.c <= 5) { sl.value = d.c; setConf(); }
    })();
    draftPrune();

    function problem() {
      if (isC && !st.opt) return 'Choose an answer, or "I don\'t know".';
      if (!isC && !st.idk && !clean(ta.value)) return 'Write ' + (kind === 'predict' ? 'a guess' : 'an answer') + ', or tick "I don\'t know".';
      if (!st.idk && st.conf == null) return 'Set your confidence with the slider.';
      return '';
    }
    function line() {
      var p = ['[card ' + qid + '] answer=' + (st.idk ? 'idk' : isC ? st.opt.id : clean(ta.value))];
      if (isC && !st.idk) p.push('shown=' + st.opt.letter);
      if (st.conf != null) p.push('confidence=' + STOPS[st.conf]);
      p.push('thinking: ' + clean(think.value));
      if (s.reading) p.push('reading: ' + clean(read.value));
      return p.join(' | ').trim();
    }
    btn.addEventListener('click', function () {
      var bad = st.sent ? 'sent' : problem(), msg;
      if (bad) { err.textContent = bad === 'sent' ? '' : bad; return; }
      st.sent = true; msg = line();
      root.classList.add('lock');
      [].forEach.call(root.querySelectorAll('input,textarea,button'), function (x) { x.disabled = true; });
      var ok = false;
      try { if (typeof g.sendPrompt === 'function') { g.sendPrompt(msg); ok = true; } } catch (e) { ok = false; }
      btn.textContent = ok ? 'Sent' : 'Not sent';
      if (ok) draftDrop(dkey);
      if (!ok) {
        root.appendChild(h('div', { class: 'tc-note', text: 'No chat link here. Copy this line into the chat:' }));
        root.appendChild(h('pre', { class: 'tc-copy', text: msg }));
      }
    });
    math(root);
    return root;
  }

  /* the plan tree: prerequisites on top, route numbered, held nodes dashed; lines drawn from layout */
  function plan(el, P) {
    start(el);
    var nodes = P.nodes || [], by = {}, lv = {}, rows = [], num = {}, els = {}, svg = document.createElementNS(NS, 'svg');
    var root = h('div', { class: 'tc' }), tree = h('div', { class: 'tc-tree' }, [svg]);
    nodes.forEach(function (x) { by[x.id] = x; });
    (P.route || []).forEach(function (id, i) { num[id] = i + 1; });
    function depth(x, seen) {
      if (lv[x.id] != null) return lv[x.id];
      if (seen[x.id]) return 0;
      seen[x.id] = 1;
      var d = 0;
      (x.needs || []).forEach(function (i) { if (by[i]) d = Math.max(d, depth(by[i], seen) + 1); });
      return (lv[x.id] = d);
    }
    nodes.forEach(function (x) { var d = depth(x, {}); (rows[d] = rows[d] || []).push(x); });
    root.appendChild(h('div', { class: 'tc-h', text: 'Plan' }));
    if (P.goal) root.appendChild(h('div', { class: 'tc-g', text: P.goal }));
    rows.forEach(function (r) {
      var row = h('div', { class: 'tc-row' });
      (r || []).forEach(function (x) {
        els[x.id] = h('div', { class: 'tc-n' + (x.held ? ' held' : ''), 'data-id': x.id }, [
          num[x.id] ? h('span', { class: 'tc-b', text: num[x.id] }) : null,
          h('div', {}, [h('span', { text: x.text }), x.held ? h('small', { text: 'already held' }) : null])]);
        row.appendChild(els[x.id]);
      });
      tree.appendChild(row);
    });
    root.appendChild(tree);
    if (P.rewrite_reason) root.appendChild(h('div', { class: 'tc-note', text: 'Plan changed: ' + P.rewrite_reason }));
    root.appendChild(h('div', { class: 'tc-note', text: 'Numbers show the route. Dashed boxes are already held.' }));
    el.appendChild(root);
    function draw() {
      var w = tree.getBoundingClientRect();
      svg.innerHTML = '';
      svg.setAttribute('width', w.width); svg.setAttribute('height', w.height);
      nodes.forEach(function (x) {
        (x.needs || []).forEach(function (i) {
          if (!els[i]) return;
          var a = els[i].getBoundingClientRect(), b = els[x.id].getBoundingClientRect(), l = document.createElementNS(NS, 'line');
          l.setAttribute('x1', a.left + a.width / 2 - w.left); l.setAttribute('y1', a.bottom - w.top);
          l.setAttribute('x2', b.left + b.width / 2 - w.left); l.setAttribute('y2', b.top - w.top);
          l.setAttribute('stroke', 'currentColor'); l.setAttribute('opacity', '.45');
          svg.appendChild(l);
        });
      });
    }
    draw();
    g.addEventListener('resize', draw);
    math(root).then(draw);
    return root;
  }

  function panel(el, P) {
    start(el);
    var box = h('div', { class: 'tc' }), body = h('div', { class: 'tc-panel' + (P.html ? '' : ' tc-pre') });
    if (P.html) body.innerHTML = P.html; else body.textContent = P.text || '';
    if (P.title) box.appendChild(h('div', { class: 'tc-h', text: P.title }));
    box.appendChild(body);
    el.appendChild(box);
    math(box);
    return box;
  }

  g.TutorCard = { version: '1.1.0', stops: STOPS, render: render, plan: plan, panel: panel, ready: ready };
})(window);
