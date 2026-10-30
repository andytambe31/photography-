(() => {
  "use strict";

  // ── Storage (per-viewer progress; must never break the page) ──
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode etc. */ }
    },
  };
  const KEY = "a6700-course-v1";
  const state = store.get(KEY, { done: {}, quiz: {}, checks: {} });
  const save = () => store.set(KEY, state);

  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $("#app");
  const sidebar = $("#sidebar");

  // ── Theme ──
  const theme = store.get("a6700-theme", null);
  if (theme) document.documentElement.dataset.theme = theme;
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme
      || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("a6700-theme", next);
  });
  $("#menuBtn").addEventListener("click", () => sidebar.classList.toggle("open"));

  // ── Course helpers ──
  const lessonKey = (m, l) => `${m.id}/${l.id}`;
  const PASS = 0.7;
  const quizPassed = (m) => (state.quiz[m.id] || 0) >= PASS;
  const moduleDone = (m) => m.lessons.every((l) => state.done[lessonKey(m, l)]) && quizPassed(m);

  // Flat ordered list of every step (lessons + quiz) for prev/next navigation.
  const steps = [];
  MODULES.forEach((m) => {
    m.lessons.forEach((l) => steps.push({ m, l, href: `#/m/${m.id}/${l.id}` }));
    steps.push({ m, quiz: true, href: `#/m/${m.id}/quiz` });
  });
  const stepDone = (s) => (s.quiz ? quizPassed(s.m) : !!state.done[lessonKey(s.m, s.l)]);

  function updateProgress() {
    const pct = Math.round((steps.filter(stepDone).length / steps.length) * 100);
    $("#progressPill").textContent = `${pct}%`;
    return pct;
  }

  function renderSidebar(current) {
    let html = `<a href="#/" class="${current === "home" ? "active" : ""}">🏠 Course home</a>
      <a href="#/tools" class="${current === "tools" ? "active" : ""}">🧪 Interactive tools</a>
      <a href="#/cheatsheet" class="${current === "cheatsheet" ? "active" : ""}">📋 Cheat sheet</a>`;
    MODULES.forEach((m, i) => {
      html += `<h4>${i + 1}. ${m.title}</h4>`;
      m.lessons.forEach((l, j) => {
        const k = lessonKey(m, l);
        html += `<a href="#/m/${m.id}/${l.id}" class="${current === k ? "active" : ""}">
          <span class="num">${i + 1}.${j + 1}</span>${l.title}${state.done[k] ? '<span class="check">✓</span>' : ""}</a>`;
      });
      html += `<a href="#/m/${m.id}/quiz" class="${current === m.id + "/quiz" ? "active" : ""}">
        <span class="num">✎</span>Quiz${quizPassed(m) ? '<span class="check">✓</span>' : ""}</a>`;
    });
    sidebar.innerHTML = html;
  }

  // ── Views ──
  function viewHome() {
    const pct = updateProgress();
    const next = steps.find((s) => !stepDone(s)) || steps[0];
    const totalMin = MODULES.reduce((a, m) => a + m.lessons.reduce((b, l) => b + l.minutes, 0), 0);
    app.innerHTML = `
      <section class="hero">
        <div>
          <div class="eyebrow">Sony a6700 · Beginner → Confident</div>
          <h1>Learn photography with the camera in your hands.</h1>
          <p class="lead">${MODULES.length} modules, ${steps.length - MODULES.length} short lessons, quizzes and interactive simulators — every concept tied to the exact buttons and menus on your a6700. About ${Math.round(totalMin / 60)} hours of reading, plus a week of practice assignments.</p>
          <p><a class="btn primary" href="${next.href}">${pct ? "Continue" : "Start the course"} →</a>
             <a class="btn" href="#/tools">Try the exposure simulator</a></p>
        </div>
        <div class="card">
          <h3 style="margin-top:0">Your camera at a glance</h3>
          <ul class="spec-list">${CAMERA_SPECS.map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("")}</ul>
        </div>
      </section>
      <h2>Modules</h2>
      <div class="grid">
        ${MODULES.map((m, i) => {
          const done = m.lessons.filter((l) => state.done[lessonKey(m, l)]).length;
          return `<a class="card module-card ${moduleDone(m) ? "done" : ""}" href="#/m/${m.id}/${m.lessons[0].id}">
            <span class="icon">${m.icon}</span>
            <h3>${i + 1}. ${m.title}</h3>
            <p>${m.summary}</p>
            <span class="meta">${done}/${m.lessons.length} lessons · quiz ${quizPassed(m) ? "passed ✓" : state.quiz[m.id] != null ? Math.round(state.quiz[m.id] * 100) + "%" : "not taken"}</span>
          </a>`;
        }).join("")}
      </div>
      <p style="margin-top:32px;color:var(--muted);font-size:.85rem">Progress is saved in this browser only. <button class="btn" id="resetBtn" style="padding:4px 10px;font-size:.8rem">Reset progress</button></p>`;
    $("#resetBtn").addEventListener("click", () => {
      if (!confirm("Reset all lesson, quiz and checklist progress?")) return;
      state.done = {}; state.quiz = {}; state.checks = {}; save(); route();
    });
  }

  function navButtons(idx) {
    const prev = steps[idx - 1], next = steps[idx + 1];
    const label = (s) => (s.quiz ? `${s.m.title} quiz` : s.l.title);
    return `<div class="lesson-nav">
      ${prev ? `<a class="btn" href="${prev.href}">← ${label(prev)}</a>` : "<span></span>"}
      ${next ? `<a class="btn" href="${next.href}">${label(next)} →</a>` : `<a class="btn" href="#/">Course home</a>`}
    </div>`;
  }

  function viewLesson(m, l) {
    const idx = steps.findIndex((s) => s.l === l);
    const mi = MODULES.indexOf(m), li = m.lessons.indexOf(l);
    const k = lessonKey(m, l);
    const next = steps[idx + 1];
    app.innerHTML = `
      <div class="eyebrow">Module ${mi + 1} · ${m.title} · Lesson ${li + 1} of ${m.lessons.length} · ${l.minutes} min</div>
      <h1>${l.title}</h1>
      <article>${l.html}</article>
      <p style="margin-top:40px"><button class="btn ${state.done[k] ? "done" : "primary"}" id="doneBtn">
        ${state.done[k] ? "✓ Completed" : "Mark complete & continue →"}</button></p>
      ${navButtons(idx)}`;
    $("#doneBtn").addEventListener("click", () => {
      if (state.done[k]) { delete state.done[k]; save(); route(); return; }
      state.done[k] = true; save();
      location.hash = next ? next.href : "#/";
    });
    mountWidgets(app);
  }

  function viewQuiz(m) {
    const idx = steps.findIndex((s) => s.quiz && s.m === m);
    const mi = MODULES.indexOf(m);
    const answers = new Array(m.quiz.length).fill(null);
    app.innerHTML = `
      <div class="eyebrow">Module ${mi + 1} · ${m.title}</div>
      <h1>Quiz: ${m.title}</h1>
      <p class="lead">Pick an answer to see the explanation. Score ${Math.round(PASS * 100)}% or more to complete the module.${state.quiz[m.id] != null ? ` Best so far: <b>${Math.round(state.quiz[m.id] * 100)}%</b>.` : ""}</p>
      <div class="quiz card">
        ${m.quiz.map((q, i) => `
          <div class="q" data-q="${i}">
            <p>${i + 1}. ${q.q}</p>
            ${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}
            <div class="why">${q.why}</div>
          </div>`).join("")}
        <div class="score" id="score"></div>
        <button class="btn" id="retry" hidden>Retake quiz</button>
      </div>
      ${navButtons(idx)}`;
    app.querySelectorAll(".q").forEach((el) => {
      const i = +el.dataset.q, q = m.quiz[i];
      el.addEventListener("change", (e) => {
        if (answers[i] !== null) return;
        const pick = +e.target.value;
        answers[i] = pick;
        el.classList.add("answered");
        el.querySelectorAll("label").forEach((lab, j) => {
          lab.querySelector("input").disabled = true;
          if (j === q.answer) lab.classList.add("correct");
          else if (j === pick) lab.classList.add("wrong");
        });
        if (answers.every((a) => a !== null)) {
          const score = answers.filter((a, n) => a === m.quiz[n].answer).length / m.quiz.length;
          state.quiz[m.id] = Math.max(state.quiz[m.id] || 0, score); save();
          $("#score").innerHTML = `Score: ${Math.round(score * 100)}% — ${score >= PASS ? "🎉 Module complete!" : "Review the lessons and try again."}`;
          $("#retry").hidden = false;
          renderSidebar(m.id + "/quiz"); updateProgress();
        }
      });
    });
    $("#retry").addEventListener("click", () => viewQuiz(m));
  }

  function viewTools() {
    app.innerHTML = `
      <div class="eyebrow">Interactive tools</div>
      <h1>Practice without leaving your chair</h1>
      <h2>Exposure simulator</h2>
      <p>Pick a lighting situation, then balance aperture, shutter and ISO until the meter sits on 0.</p>
      <div data-widget="exposure-sim"></div>
      <h2>Depth of field calculator (APS-C)</h2>
      <div data-widget="dof-calc"></div>
      <h2>Quick rules</h2>
      <div data-widget="quick-calc"></div>`;
    mountWidgets(app);
  }

  function viewCheatsheet() {
    app.innerHTML = `
      <div class="eyebrow">Print me</div>
      <h1>a6700 cheat sheet</h1>
      <h2>Starting settings</h2>
      <table>
        <tr><th>Scene</th><th>Mode</th><th>Aperture</th><th>Shutter</th><th>ISO</th><th>Focus</th></tr>
        <tr><td>Portrait</td><td>A</td><td>f/1.4–2.8</td><td>≥1/250</td><td>Auto</td><td>AF-C · Human eye</td></tr>
        <tr><td>Landscape</td><td>A / M</td><td>f/8–11</td><td>Any (tripod)</td><td>100</td><td>AF-S · Spot</td></tr>
        <tr><td>Street</td><td>A</td><td>f/5.6–8</td><td>≥1/250</td><td>Auto</td><td>AF-C · Wide</td></tr>
        <tr><td>Kids &amp; pets</td><td>M + Auto ISO</td><td>Wide open</td><td>1/1000</td><td>Auto</td><td>AF-C · Tracking</td></tr>
        <tr><td>Birds in flight</td><td>M + Auto ISO</td><td>Wide open</td><td>1/2000–1/4000</td><td>Auto</td><td>AF-C · Zone · Bird</td></tr>
        <tr><td>Waterfall</td><td>S / M</td><td>f/8–16</td><td>1/4–2 s</td><td>100 (+ND)</td><td>AF-S</td></tr>
        <tr><td>City at night</td><td>M</td><td>f/8</td><td>5–30 s</td><td>100</td><td>AF-S / MF</td></tr>
        <tr><td>Milky Way</td><td>M</td><td>Wide open</td><td>15–25 s</td><td>1600–6400</td><td>MF on a star</td></tr>
        <tr><td>Indoor party</td><td>A</td><td>f/1.4–2.8</td><td>≥1/125</td><td>Auto ≤12800</td><td>AF-C · Human</td></tr>
        <tr><td>Video 24p</td><td>M (Movie)</td><td>Any + ND</td><td>1/50</td><td>Auto / fixed</td><td>AF-C · Recognition</td></tr>
      </table>
      <h2>Full stops</h2>
      <table>
        <tr><th>Aperture</th><td>f/1.4 · 2 · 2.8 · 4 · 5.6 · 8 · 11 · 16 · 22</td></tr>
        <tr><th>Shutter</th><td>1/4000 · 1/2000 · 1/1000 · 1/500 · 1/250 · 1/125 · 1/60 · 1/30 · 1/15 · 1/8 · 1/4 · 1/2 · 1 s</td></tr>
        <tr><th>ISO</th><td>100 · 200 · 400 · 800 · 1600 · 3200 · 6400 · 12800</td></tr>
      </table>
      <h2>Troubleshooting</h2>
      <table>
        <tr><th>Problem</th><th>Likely cause → fix</th></tr>
        <tr><td>Everything slightly blurry</td><td>Camera shake → faster shutter, SteadyShot on, Auto ISO min SS</td></tr>
        <tr><td>Subject blurry, background sharp</td><td>Missed focus → AF-C + recognition, check focus area</td></tr>
        <tr><td>Moving subject smeared</td><td>Shutter too slow → 1/500–1/1000 s</td></tr>
        <tr><td>Very grainy</td><td>ISO too high / underexposed → more light, wider aperture</td></tr>
        <tr><td>Sky is pure white</td><td>Overexposed → exp. comp −, zebras, Highlight metering</td></tr>
        <tr><td>Stripes/banding indoors</td><td>Electronic shutter + LED flicker → mechanical shutter, Anti-flicker</td></tr>
        <tr><td>Photos look orange/blue</td><td>White balance → AWB or correct preset</td></tr>
        <tr><td>Shutter won't fire</td><td>No card / focus not confirmed → check card, Priority Set in AF-S</td></tr>
      </table>
      <h2>a6700 specs</h2>
      <ul class="spec-list card">${CAMERA_SPECS.map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("")}</ul>
      <p><button class="btn" onclick="window.print()">🖨️ Print</button></p>`;
  }

  // ── Widgets ──
  function mountWidgets(root) {
    root.querySelectorAll("[data-widget]").forEach((el) => {
      const w = el.dataset.widget;
      if (w === "exposure-sim") exposureSim(el);
      else if (w === "dof-calc") dofCalc(el);
      else if (w === "checklist") checklist(el, el.dataset.id);
      else if (w === "quick-calc") quickCalc(el);
    });
  }

  function checklist(el, id) {
    const items = CHECKLISTS[id] || [];
    const checks = (state.checks[id] = state.checks[id] || {});
    el.className = "card checklist";
    el.innerHTML = items.map((t, i) =>
      `<label><input type="checkbox" data-i="${i}" ${checks[i] ? "checked" : ""}><span>${t}</span></label>`).join("")
      + `<div class="score" style="font-size:.9rem;color:var(--muted)"></div>`;
    const tally = () => { el.querySelector(".score").textContent = `${Object.values(checks).filter(Boolean).length} / ${items.length} done`; };
    el.addEventListener("change", (e) => { checks[e.target.dataset.i] = e.target.checked; save(); tally(); });
    tally();
  }

  const APERTURES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
  const SHUTTERS = [30, 15, 8, 4, 2, 1, 1/2, 1/4, 1/8, 1/15, 1/30, 1/60, 1/125, 1/250, 1/500, 1/1000, 1/2000, 1/4000, 1/8000];
  const ISOS = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200];
  const SCENES = [
    { name: "Bright sun", ev: 15 },
    { name: "Overcast / shade", ev: 12 },
    { name: "Bright indoors", ev: 9 },
    { name: "Living room evening", ev: 7 },
    { name: "Night street", ev: 4 },
  ];
  const fmtShutter = (t) => (t >= 1 ? `${t} s` : `1/${Math.round(1 / t)} s`);

  function exposureSim(el) {
    el.className = "card sim";
    el.innerHTML = `
      <canvas width="800" height="450" aria-label="Simulated photo preview"></canvas>
      <div class="meter"><b>Meter</b>
        <div class="meter-bar"><div class="meter-ticks"><span>−3</span><span>−2</span><span>−1</span><span>0</span><span>+1</span><span>+2</span><span>+3</span></div><div class="meter-needle"></div></div>
        <span class="meter-val" style="min-width:4.5em;text-align:right;font-weight:700"></span></div>
      <div class="sim-controls">
        <div class="ctrl"><label>Light <output data-o="scene"></output></label>
          <input type="range" data-k="scene" min="0" max="${SCENES.length - 1}" step="1"><small>How bright the scene is</small></div>
        <div class="ctrl"><label>Aperture <output data-o="ap"></output></label>
          <input type="range" data-k="ap" min="0" max="${APERTURES.length - 1}" step="1"><small>Background blur · light</small></div>
        <div class="ctrl"><label>Shutter <output data-o="sh"></output></label>
          <input type="range" data-k="sh" min="0" max="${SHUTTERS.length - 1}" step="1"><small>Pinwheel motion · light</small></div>
        <div class="ctrl"><label>ISO <output data-o="iso"></output></label>
          <input type="range" data-k="iso" min="0" max="${ISOS.length - 1}" step="1"><small>Brightness · noise</small></div>
      </div>
      <div class="presets">
        <button class="btn" data-p="portrait">Portrait look</button>
        <button class="btn" data-p="freeze">Freeze motion</button>
        <button class="btn" data-p="blur">Show motion</button>
        <button class="btn" data-p="landscape">Everything sharp</button>
        <button class="btn" data-p="auto">Auto-balance ISO</button>
      </div>
      <p class="sim-note" style="margin:0;font-size:.9rem;color:var(--muted)"></p>`;

    const canvas = el.querySelector("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const W = canvas.width, H = canvas.height;
    const s = { scene: 1, ap: 2, sh: 13, iso: 2 };
    const inputs = {};
    el.querySelectorAll("input[type=range]").forEach((i) => { inputs[i.dataset.k] = i; i.value = s[i.dataset.k]; });

    const mk = () => { const c = document.createElement("canvas"); c.width = W; c.height = H; return c; };
    const bg = mk(), blurred = mk(), frame = mk(), acc = mk();
    drawBackground(bg.getContext("2d"), W, H);
    const filterOK = (() => { const t = mk().getContext("2d"); t.filter = "blur(2px)"; return t.filter === "blur(2px)"; })();
    let lastBlur = -1;

    function blurBackground(r) {
      if (r === lastBlur) return;
      lastBlur = r;
      const b = blurred.getContext("2d");
      b.clearRect(0, 0, W, H);
      if (r < 0.5) { b.drawImage(bg, 0, 0); return; }
      if (filterOK) {
        b.filter = `blur(${r}px)`;
        b.drawImage(bg, -r * 2, -r * 2, W + r * 4, H + r * 4);
        b.filter = "none";
      } else {
        const f = Math.max(1, r / 1.5), sw = Math.max(1, Math.round(W / f)), sh = Math.max(1, Math.round(H / f));
        const tmp = document.createElement("canvas"); tmp.width = sw; tmp.height = sh;
        const t = tmp.getContext("2d"); t.imageSmoothingQuality = "high"; t.drawImage(bg, 0, 0, sw, sh);
        b.imageSmoothingQuality = "high"; b.drawImage(tmp, 0, 0, W, H);
      }
    }

    function render() {
      const N = APERTURES[s.ap], t = SHUTTERS[s.sh], iso = ISOS[s.iso], scene = SCENES[s.scene];
      const offset = scene.ev + Math.log2(iso / 100) - Math.log2((N * N) / t); // stops over/under
      blurBackground(Math.round(Math.max(0, 36 / N - 2) * 10) / 10);

      // Motion: pinwheel spins 1.5 rev/s; average frames across the exposure time.
      const sweep = Math.min(Math.PI * 2, 2 * Math.PI * 1.5 * t);
      const samples = sweep < 0.01 ? 1 : Math.min(24, Math.max(2, Math.ceil(sweep / 0.06)));
      const a = acc.getContext("2d"), f = frame.getContext("2d");
      const base = 0.3;
      for (let i = 0; i < samples; i++) {
        f.drawImage(blurred, 0, 0);
        drawSubject(f, W, H, base + (samples === 1 ? 0 : (i / (samples - 1)) * sweep));
        a.globalAlpha = 1 / (i + 1); // running average
        a.drawImage(frame, 0, 0);
      }
      a.globalAlpha = 1;

      // Exposure (in linear light) + ISO noise.
      const img = a.getImageData(0, 0, W, H), d = img.data;
      const gain = Math.pow(2, Math.max(-8, Math.min(8, offset)));
      const sigma = 1.1 * Math.sqrt(iso / 100);
      const lut = new Uint8ClampedArray(256);
      for (let v = 0; v < 256; v++) lut[v] = 255 * Math.pow(Math.min(1, Math.pow(v / 255, 2.2) * gain), 1 / 2.2);
      for (let p = 0; p < d.length; p += 4) {
        const n = sigma > 1.5 ? (Math.random() + Math.random() + Math.random() - 1.5) * sigma * 1.4 : 0;
        const c = (Math.random() - 0.5) * sigma * 0.5; // a touch of colour noise
        d[p] = lut[d[p]] + n + c; d[p + 1] = lut[d[p + 1]] + n; d[p + 2] = lut[d[p + 2]] + n - c;
      }
      ctx.putImageData(img, 0, 0);

      // UI
      el.querySelector('[data-o="scene"]').textContent = scene.name;
      el.querySelector('[data-o="ap"]').textContent = `f/${N}`;
      el.querySelector('[data-o="sh"]').textContent = fmtShutter(t);
      el.querySelector('[data-o="iso"]').textContent = iso;
      const clamped = Math.max(-3, Math.min(3, offset));
      el.querySelector(".meter-needle").style.left = `${((clamped + 3) / 6) * 100}%`;
      el.querySelector(".meter-val").textContent = `${offset > 0 ? "+" : ""}${offset.toFixed(1)} EV`;
      const notes = [];
      if (Math.abs(offset) < 0.5) notes.push("✅ Well exposed.");
      else if (offset > 0) notes.push(`☀️ ${offset.toFixed(1)} stops too bright — faster shutter, smaller aperture (bigger f-number) or lower ISO.`);
      else notes.push(`🌑 ${(-offset).toFixed(1)} stops too dark — slower shutter, wider aperture or higher ISO.`);
      if (t > 1 / 30) notes.push("Handheld this slow risks shake even with IBIS — use a tripod or brace yourself.");
      if (iso >= 6400) notes.push("High ISO: visible noise.");
      if (N >= 16) notes.push("f/16+ on APS-C: diffraction softens detail slightly.");
      el.querySelector(".sim-note").textContent = notes.join(" ");
    }

    function nearestIndex(arr, v) {
      let best = 0;
      arr.forEach((x, i) => { if (Math.abs(Math.log2(x) - Math.log2(v)) < Math.abs(Math.log2(arr[best]) - Math.log2(v))) best = i; });
      return best;
    }
    function autoIso() {
      const N = APERTURES[s.ap], t = SHUTTERS[s.sh];
      const needed = 100 * Math.pow(2, Math.log2((N * N) / t) - SCENES[s.scene].ev);
      s.iso = nearestIndex(ISOS, Math.max(100, Math.min(51200, needed)));
    }
    function autoShutter() {
      const N = APERTURES[s.ap], iso = ISOS[s.iso];
      const t = (N * N) / Math.pow(2, SCENES[s.scene].ev + Math.log2(iso / 100));
      s.sh = nearestIndex(SHUTTERS, Math.max(1 / 8000, Math.min(30, t)));
    }
    const PRESETS = {
      portrait: () => { s.ap = 0; s.iso = 0; autoShutter(); },
      freeze: () => { s.sh = 16; s.ap = 2; autoIso(); },
      blur: () => { s.sh = 9; s.iso = 0; s.ap = 8; },
      landscape: () => { s.ap = 5; s.iso = 0; autoShutter(); },
      auto: () => autoIso(),
    };

    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(render); };
    el.addEventListener("input", (e) => { if (e.target.dataset.k) { s[e.target.dataset.k] = +e.target.value; schedule(); } });
    el.addEventListener("click", (e) => {
      const p = e.target.dataset.p; if (!p) return;
      PRESETS[p]();
      Object.keys(inputs).forEach((k) => (inputs[k].value = s[k]));
      schedule();
    });
    render();
  }

  // Procedural scene: background layer (blurred by aperture).
  function drawBackground(c, W, H) {
    const sky = c.createLinearGradient(0, 0, 0, H * 0.6);
    sky.addColorStop(0, "#5b9bd5"); sky.addColorStop(1, "#cfe6f5");
    c.fillStyle = sky; c.fillRect(0, 0, W, H);
    c.fillStyle = "#fff6d5"; c.beginPath(); c.arc(W * 0.78, H * 0.17, 34, 0, 7); c.fill();
    // clouds
    c.fillStyle = "rgba(255,255,255,.9)";
    [[120, 70], [420, 50], [600, 110]].forEach(([x, y]) => {
      [[0, 0, 26], [24, -10, 30], [52, 0, 24], [26, 8, 26]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx, y + dy, r, 0, 7); c.fill(); });
    });
    // hills
    c.fillStyle = "#7aa36b"; c.beginPath(); c.moveTo(0, H * 0.55);
    for (let x = 0; x <= W; x += 20) c.lineTo(x, H * 0.5 + Math.sin(x / 90) * 22 + Math.cos(x / 37) * 8);
    c.lineTo(W, H); c.lineTo(0, H); c.fill();
    // buildings
    const cols = ["#d9a066", "#c9785a", "#e8d3a8", "#9aa7b8", "#b86b5b"];
    for (let i = 0; i < 9; i++) {
      const x = 30 + i * 80, w = 56 + (i % 3) * 10, h = 70 + ((i * 37) % 60);
      c.fillStyle = cols[i % cols.length]; c.fillRect(x, H * 0.6 - h, w, h);
      c.fillStyle = "rgba(40,50,70,.55)";
      for (let wy = H * 0.6 - h + 10; wy < H * 0.6 - 14; wy += 18) for (let wx = x + 8; wx < x + w - 10; wx += 16) c.fillRect(wx, wy, 8, 10);
    }
    // trees
    for (let i = 0; i < 7; i++) {
      const x = 60 + i * 115, y = H * 0.62;
      c.fillStyle = "#5a3e2b"; c.fillRect(x - 4, y - 40, 8, 42);
      c.fillStyle = i % 2 ? "#3f7d3a" : "#4f9446"; c.beginPath(); c.arc(x, y - 52, 26, 0, 7); c.fill();
    }
    // ground with string lights (bokeh test)
    const g = c.createLinearGradient(0, H * 0.62, 0, H);
    g.addColorStop(0, "#8a9a5b"); g.addColorStop(1, "#56683a");
    c.fillStyle = g; c.fillRect(0, H * 0.62, W, H);
    c.strokeStyle = "#333"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, 150);
    c.quadraticCurveTo(W / 2, 220, W, 150); c.stroke();
    for (let i = 0; i <= 20; i++) {
      const tt = i / 20, x = tt * W, y = (1 - tt) * (1 - tt) * 150 + 2 * (1 - tt) * tt * 220 + tt * tt * 150;
      c.fillStyle = ["#ffd166", "#ff6b6b", "#ffffff", "#7bdff2"][i % 4];
      c.beginPath(); c.arc(x, y + 6, 5, 0, 7); c.fill();
    }
  }

  // Foreground subject: a pinwheel on a pole + flowers (always in focus).
  function drawSubject(c, W, H, angle) {
    const cx = W * 0.33, cy = H * 0.42;
    c.fillStyle = "#6b4a2f"; c.fillRect(cx - 5, cy, 10, H - cy);
    c.save(); c.translate(cx, cy); c.rotate(angle);
    const colors = ["#e63946", "#f4a261", "#2a9d8f", "#457b9d"];
    for (let i = 0; i < 4; i++) {
      c.rotate(Math.PI / 2);
      c.fillStyle = colors[i];
      c.beginPath(); c.moveTo(0, 0); c.lineTo(95, -12); c.quadraticCurveTo(70, -70, 0, -95); c.closePath(); c.fill();
      c.fillStyle = "rgba(255,255,255,.35)"; c.beginPath(); c.moveTo(0, 0); c.lineTo(60, -30); c.lineTo(20, -70); c.closePath(); c.fill();
    }
    c.restore();
    c.fillStyle = "#eee"; c.beginPath(); c.arc(cx, cy, 10, 0, 7); c.fill();
    c.fillStyle = "#555"; c.beginPath(); c.arc(cx, cy, 4, 0, 7); c.fill();
    // flowers in the same plane
    [[cx - 70, H - 40, "#ff8fab"], [cx + 60, H - 30, "#ffd166"], [cx + 110, H - 55, "#cdb4db"]].forEach(([x, y, col]) => {
      c.strokeStyle = "#2d6a4f"; c.lineWidth = 3; c.beginPath(); c.moveTo(x, H); c.lineTo(x, y); c.stroke();
      c.fillStyle = col;
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; c.beginPath(); c.arc(x + Math.cos(a) * 9, y + Math.sin(a) * 9, 7, 0, 7); c.fill(); }
      c.fillStyle = "#6b4a2f"; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill();
    });
  }

  function dofCalc(el) {
    el.className = "card";
    el.innerHTML = `
      <div class="calc">
        <label>Focal length (mm)<input type="number" data-k="f" value="50" min="8" max="800"></label>
        <label>Aperture<select data-k="N">${APERTURES.map((a) => `<option ${a === 2.8 ? "selected" : ""}>${a}</option>`).join("")}</select></label>
        <label>Subject distance (m)<input type="number" data-k="s" value="3" min="0.1" max="1000" step="0.1"></label>
      </div>
      <div class="calc-out"></div>
      <div class="dof-bar"><div class="dof-zone"></div><div class="dof-subject"></div></div>
      <div class="dof-scale"><span>camera</span><span class="dof-max"></span></div>
      <p style="font-size:.82rem;color:var(--muted);margin-bottom:0">APS-C circle of confusion 0.02 mm. Equivalent full-frame focal length shown for framing.</p>`;
    const out = el.querySelector(".calc-out");
    const fmt = (m) => (!isFinite(m) ? "∞" : m < 1 ? `${(m * 100).toFixed(0)} cm` : `${m.toFixed(2)} m`);
    function calc() {
      const f = +el.querySelector('[data-k="f"]').value || 50;
      const N = +el.querySelector('[data-k="N"]').value;
      const s = Math.max(0.05, +el.querySelector('[data-k="s"]').value || 3) * 1000;
      const c = 0.02;
      const Hf = (f * f) / (N * c) + f;
      const near = (s * (Hf - f)) / (Hf + s - 2 * f);
      const far = s < Hf ? (s * (Hf - f)) / (Hf - s) : Infinity;
      out.innerHTML = [
        ["Near limit", fmt(near / 1000)], ["Far limit", fmt(far / 1000)],
        ["Total DOF", fmt((far - near) / 1000)], ["Hyperfocal", fmt(Hf / 1000)],
        ["Framing (FF eq.)", `${Math.round(f * 1.5)} mm`],
      ].map(([k, v]) => `<div class="stat"><b>${v}</b><span>${k}</span></div>`).join("");
      const max = Math.max(s * 2, isFinite(far) ? Math.min(far * 1.2, s * 6) : s * 3);
      el.querySelector(".dof-zone").style.left = `${(near / max) * 100}%`;
      el.querySelector(".dof-zone").style.width = `${((Math.min(far, max) - near) / max) * 100}%`;
      el.querySelector(".dof-subject").style.left = `${(s / max) * 100}%`;
      el.querySelector(".dof-max").textContent = fmt(max / 1000);
    }
    el.addEventListener("input", calc);
    calc();
  }

  function quickCalc(el) {
    el.className = "card";
    el.innerHTML = `
      <div class="calc">
        <label>Lens focal length (mm)<input type="number" data-k="f" value="18" min="8" max="800"></label>
        <label>Video frame rate<select data-k="fps">${[24, 25, 30, 50, 60, 100, 120].map((x) => `<option>${x}</option>`).join("")}</select></label>
      </div>
      <div class="calc-out"></div>`;
    const out = el.querySelector(".calc-out");
    function calc() {
      const f = +el.querySelector('[data-k="f"]').value || 18;
      const fps = +el.querySelector('[data-k="fps"]').value;
      const handheld = Math.round(f * 1.5);
      out.innerHTML = [
        ["Full-frame equivalent", `${Math.round(f * 1.5)} mm`],
        ["Handheld min. (no IBIS)", `1/${handheld} s`],
        ["Handheld w/ IBIS (~3 stops, still subject)", fmtShutter(Math.min(1, 8 / handheld))],
        ["Max astro exposure (500 rule)", `${Math.round(500 / (f * 1.5))} s`],
        [`180° shutter @ ${fps}p`, `1/${fps * 2} s`],
      ].map(([k, v]) => `<div class="stat"><b>${v}</b><span>${k}</span></div>`).join("");
    }
    el.addEventListener("input", calc);
    calc();
  }

  // ── Router ──
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    let current = "home";
    if (parts[0] === "m") {
      const m = MODULES.find((x) => x.id === parts[1]);
      const l = m && m.lessons.find((x) => x.id === parts[2]);
      if (m && parts[2] === "quiz") { current = m.id + "/quiz"; viewQuiz(m); }
      else if (l) { current = lessonKey(m, l); viewLesson(m, l); }
      else viewHome();
    } else if (parts[0] === "tools") { current = "tools"; viewTools(); }
    else if (parts[0] === "cheatsheet") { current = "cheatsheet"; viewCheatsheet(); }
    else viewHome();
    renderSidebar(current);
    updateProgress();
    sidebar.classList.remove("open");
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);
  route();
})();
