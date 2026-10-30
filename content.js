/* Course content. Each lesson's `html` may include widget placeholders:
   <div data-widget="exposure-sim"></div>, <div data-widget="dof-calc"></div>,
   <div data-widget="checklist" data-id="..."></div> (items from CHECKLISTS). */

const CAMERA_SPECS = [
  ["Sensor", "26 MP APS-C (1.5× crop) BSI CMOS"],
  ["Processor", "BIONZ XR + AI processing unit"],
  ["Autofocus", "759 phase-detect points, AI subject recognition"],
  ["Stabilization", "5-axis in-body (IBIS), up to 5 stops"],
  ["ISO (stills)", "100–32,000 (exp. 50–102,400)"],
  ["Burst", "Up to 11 fps"],
  ["Shutter", "1/4000 s mech · 1/8000 s electronic · 30 s + Bulb"],
  ["Flash sync", "1/160 s"],
  ["Video", "4K 120p (crop) · 4K 60p from 6K · 10-bit 4:2:2"],
  ["Screen / EVF", "3\" vari-angle touch · 2.36M-dot OLED EVF"],
  ["Battery / Card", "NP-FZ100 · 1× SD UHS-II"],
];

const CHECKLISTS = {
  "day-one": [
    "Charge the NP-FZ100 battery (USB-C works in-camera)",
    "Set language, region, date & time (MENU → Setup → Area/Date/Time)",
    "Insert an SD card (V30 or faster) and FORMAT it in-camera",
    "Set Release w/o Card to Disable (no more accidental card-less shoots)",
    "File Format → RAW & JPEG, RAW File Type → Lossless Compressed",
    "Turn on SteadyShot (stabilization) — leave it on unless on a tripod",
    "Set Focus Mode to AF-C and Focus Area to Wide",
    "Subject Recognition → Recog. Target: Auto (or Human)",
    "Turn off the focus beep: Setup → Sound Option → Audio signals: Off",
    "Turn on the live histogram with the DISP button",
    "Add your 6 most-used settings to My Menu",
    "Pair the camera with the Creators' App on your phone",
  ],
  "practice-week": [
    "Day 1 — Shoot 30 photos in A mode at f/1.8–f/4, then 30 at f/8–f/11. Compare backgrounds.",
    "Day 2 — Running water or traffic at 1/1000 s vs 1/15 s (S mode).",
    "Day 3 — Indoors at night: find the ISO where noise starts to bother you.",
    "Day 4 — Full Manual: match the meter to 0, then shoot −1 and +1 EV.",
    "Day 5 — Track a moving pet/person with AF-C + Tracking. Count keepers.",
    "Day 6 — Same scene in 5 Creative Looks. Pick your favourite.",
    "Day 7 — 20 photos using one focal length only. No zooming with the lens — zoom with your feet.",
  ],
};

const MODULES = [
  /* ───────────────────────────── 1 ───────────────────────────── */
  {
    id: "meet",
    icon: "📦",
    title: "Meet Your a6700",
    summary: "Unbox, set up, learn the controls and menus so the camera gets out of your way.",
    lessons: [
      {
        id: "tour",
        title: "A tour of the body",
        minutes: 8,
        html: `
<p class="lead">Before learning photography, learn where things are. The a6700 has more physical controls than older a6000-series bodies, and every one of them saves you a trip into the menus.</p>
<h2>The controls that matter most</h2>
<table>
<tr><th>Control</th><th>What it does</th></tr>
<tr><td><b>Mode dial</b> (top)</td><td>Chooses how exposure is decided: AUTO, P, A, S, M, MR (memory recall).</td></tr>
<tr><td><b>Still / Movie / S&amp;Q switch</b> (under the mode dial)</td><td>Flips the whole camera between photo, video and slow &amp; quick motion. Each side remembers its own settings.</td></tr>
<tr><td><b>Front dial</b></td><td>New on the a6700. In A mode it usually sets aperture; in M, one of aperture/shutter.</td></tr>
<tr><td><b>Rear dial</b></td><td>The second exposure dial — shutter speed or exposure compensation.</td></tr>
<tr><td><b>Control wheel</b> (rear)</td><td>Rotates for a third setting (often ISO) and its edges are buttons (DISP, ISO, drive, etc.).</td></tr>
<tr><td><b>Fn button</b></td><td>Opens the quick-settings grid of 12 items. Your most-used button after the shutter.</td></tr>
<tr><td><b>AF-ON</b></td><td>Starts autofocus without pressing the shutter — the key to “back-button focus” (Module 5).</td></tr>
<tr><td><b>C1, C2, C3… custom buttons</b></td><td>Assignable to almost anything. We'll set these up later.</td></tr>
<tr><td><b>MENU</b></td><td>The full menu system.</td></tr>
<tr><td><b>Vari-angle touchscreen</b></td><td>Flips out and around — tap to focus, drag focus point, swipe through photos.</td></tr>
</table>
<div class="callout tip">Rotate every dial while looking at the screen in each mode (A, S, M). Watching what changes is the fastest way to build muscle memory.</div>
<h2>The shutter button has two stages</h2>
<p><b>Half-press</b> = focus and meter. <b>Full press</b> = take the picture. Get used to half-pressing, waiting for the green focus confirmation, then pressing the rest of the way. This one habit fixes most “blurry photo” complaints.</p>
<h2>The crop factor (1.5×)</h2>
<p>Your sensor is APS-C, smaller than “full frame”. It sees a narrower slice of what a lens projects, so every lens <i>looks</i> 1.5× longer: a 50 mm lens frames like a 75 mm on full frame. Keep this in mind when reading lens reviews written for full-frame cameras.</p>
<div class="callout a6700">Sony “E” lenses are designed for APS-C; “FE” lenses are designed for full frame but fit and work perfectly on your a6700 — just apply the 1.5× crop.</div>
`,
      },
      {
        id: "setup",
        title: "Day-one setup checklist",
        minutes: 15,
        html: `
<p class="lead">Do this once, sitting at a table, and you'll never have to fight the camera in the field. Your ticks are saved in this browser.</p>
<div data-widget="checklist" data-id="day-one"></div>
<div class="callout a6700">Menu paths in this course follow the a6700's tab layout: <b>Main · Shooting · Exposure/Color · Focus · Playback · Network · Setup · My Menu</b>. Wording can shift slightly between firmware versions — if something doesn't match, use the menu's search-by-tab layout or the built-in help (the ? icon).</div>
<h2>Why RAW + JPEG?</h2>
<p>JPEGs are small, ready to share, and already processed with your chosen look. RAW files keep <i>all</i> the sensor data so you can rescue highlights, fix white balance and lift shadows later. While learning, shoot both — you'll be glad to have the RAW when a shot is almost-but-not-quite right.</p>
<h2>Cards</h2>
<p>The a6700 has one SD slot that supports UHS-II. For photos any <b>V30 UHS-I</b> card is fine. For 4K 120p or All-Intra video codecs, use a <b>V60/V90 UHS-II</b> card. Always format new cards <i>in the camera</i>, never on a computer.</p>
`,
      },
      {
        id: "menus",
        title: "Menus, Fn and My Menu",
        minutes: 10,
        html: `
<p class="lead">The a6700 menu is huge. You only need to know three ways in.</p>
<h2>1. The Fn menu (daily use)</h2>
<p>Press <kbd>Fn</kbd>, move to an item, rotate a dial to change it. A good starting Fn layout for stills:</p>
<table>
<tr><th>Top row</th><td>Drive Mode · Focus Mode · Focus Area · Recog. Target · Exposure Comp · ISO</td></tr>
<tr><th>Bottom row</th><td>Metering · White Balance · Creative Look · Shutter Type · SteadyShot · File Format</td></tr>
</table>
<p>Customise it: <b>MENU → Setup → Operation Customize → Fn Menu Settings</b>. Stills and movie modes can each have their own Fn layout.</p>
<h2>2. My Menu (your favourites)</h2>
<p>Go to <b>MENU → My Menu → Add Item</b>. Good candidates: Format, Silent Mode, Subject Recognition, Zebra Display, APS-C/Super 35mm, Interval Shoot.</p>
<h2>3. Custom buttons</h2>
<p><b>MENU → Setup → Operation Customize → Custom Key/Dial Set.</b> Suggested starting point:</p>
<ul>
<li><b>C1</b> → Focus Area (cycle zones fast)</li>
<li><b>C2</b> → Subject Recognition target</li>
<li><b>AF-ON</b> → AF On (default; essential for back-button focus)</li>
<li><b>Control wheel rotation</b> → ISO</li>
</ul>
<h2>MR — Memory Recall</h2>
<p>Once you love a setup (say, “sports”: S mode, 1/1000 s, AF-C, Hi+ burst, Tracking), save it: <b>MENU → Shooting → Shoot Mode → Camera Set. Memory</b>. Then turn the dial to <b>MR</b> and pick it in one move.</p>
<div class="callout try">Build your Fn menu now, then shoot ten photos changing only through Fn. If you reach for MENU, that item belongs in Fn or My Menu.</div>
`,
      },
    ],
    quiz: [
      { q: "A 35 mm lens on your a6700 frames roughly like what focal length on full frame?", options: ["23 mm", "35 mm", "52 mm", "70 mm"], answer: 2, why: "APS-C crop is 1.5×: 35 × 1.5 ≈ 52 mm." },
      { q: "Half-pressing the shutter button…", options: ["Takes a quick test shot", "Focuses and meters without taking a photo", "Opens the Fn menu", "Starts video"], answer: 1, why: "Half-press locks in focus and metering; full press captures." },
      { q: "Where should you format a new SD card?", options: ["On your computer", "In the camera", "It doesn't matter", "In the phone app"], answer: 1, why: "In-camera formatting creates the exact folder structure the camera expects." },
      { q: "Why shoot RAW + JPEG while learning?", options: ["RAW files are smaller", "JPEG is needed for autofocus", "RAW keeps extra data to fix exposure and white balance later", "It makes the burst faster"], answer: 2, why: "RAW retains the full sensor data for flexible editing; JPEG is the convenient ready-made version." },
    ],
  },

  /* ───────────────────────────── 2 ───────────────────────────── */
  {
    id: "exposure",
    icon: "☀️",
    title: "Light & the Exposure Triangle",
    summary: "Aperture, shutter speed and ISO — what each does to brightness and to the look of the photo.",
    lessons: [
      {
        id: "triangle",
        title: "Three ways to control light",
        minutes: 12,
        html: `
<p class="lead">Exposure is simply <i>how much light</i> makes up the photo. You control it three ways — and each one also changes the picture in a second, creative way.</p>
<table>
<tr><th>Setting</th><th>Controls light by…</th><th>Side effect (the creative part)</th></tr>
<tr><td><b>Aperture</b> (f/1.8, f/4, f/8…)</td><td>Size of the hole in the lens</td><td><b>Depth of field</b> — how much is sharp front to back</td></tr>
<tr><td><b>Shutter speed</b> (1/1000, 1/60, 1 s…)</td><td>How long the sensor is exposed</td><td><b>Motion</b> — frozen vs blurred</td></tr>
<tr><td><b>ISO</b> (100, 800, 6400…)</td><td>Amplifying the signal</td><td><b>Noise</b> — grain and lost detail at high values</td></tr>
</table>
<h2>Stops: the unit of light</h2>
<p>A <b>stop</b> is a doubling or halving of light. Every setting is measured in stops, which is why you can trade one for another:</p>
<ul>
<li><b>Shutter:</b> 1/250 → 1/125 → 1/60 → 1/30 (each step = 2× more light)</li>
<li><b>Aperture:</b> f/2.8 → f/4 → f/5.6 → f/8 → f/11 (each step = ½ the light; bigger number = smaller hole)</li>
<li><b>ISO:</b> 100 → 200 → 400 → 800 (each step = 2× brighter)</li>
</ul>
<div class="callout tip">If you open the aperture by one stop, you can make the shutter one stop faster and get the <i>same</i> brightness. That's “equivalent exposure” — the whole game is choosing which combination gives the look you want.</div>
<h2>Play with it</h2>
<p>Move the sliders below. Watch the meter, the background blur (aperture), the spinning windmill (shutter) and the grain (ISO).</p>
<div data-widget="exposure-sim"></div>
`,
      },
      {
        id: "aperture",
        title: "Aperture & depth of field",
        minutes: 10,
        html: `
<p class="lead">Aperture is the most “artistic” setting. It decides whether your subject pops from a creamy background or whether everything from foreground to mountains is sharp.</p>
<h2>The confusing bit: small number = big hole</h2>
<p>f-numbers are fractions. f/2 means the opening is focal length ÷ 2; f/16 is focal length ÷ 16 — much smaller. So <b>f/1.8 lets in lots of light and gives shallow depth of field</b>; <b>f/11 lets in little light and gives deep depth of field</b>.</p>
<h2>Four things control depth of field</h2>
<ol>
<li><b>Aperture</b> — wider (smaller f-number) = shallower</li>
<li><b>Distance to subject</b> — closer = much shallower</li>
<li><b>Focal length</b> — longer = shallower-looking, and backgrounds look bigger</li>
<li><b>Subject-to-background distance</b> — move your subject away from the wall!</li>
</ol>
<div class="callout a6700">The kit-style zooms (e.g. 18-135 mm f/3.5-5.6) can't open very wide. For real background blur, the single best upgrade is a cheap fast prime — a Sigma 30 mm f/1.4 or Sony 50 mm f/1.8.</div>
<h2>Sharpness sweet spot</h2>
<p>Most lenses are sharpest around <b>f/5.6–f/8</b>. Beyond about f/11 on APS-C, <i>diffraction</i> starts to soften the whole image slightly. Don't go to f/22 “for maximum sharpness” — it does the opposite.</p>
<h2>Calculate it</h2>
<div data-widget="dof-calc"></div>
`,
      },
      {
        id: "shutter",
        title: "Shutter speed & motion",
        minutes: 10,
        html: `
<p class="lead">Shutter speed decides how time looks in your photo.</p>
<table>
<tr><th>Speed</th><th>Typical use</th></tr>
<tr><td>1/2000–1/8000 s</td><td>Birds in flight, splashing water, fast sports</td></tr>
<tr><td>1/500–1/1000 s</td><td>Running kids, pets, cyclists</td></tr>
<tr><td>1/125–1/250 s</td><td>People walking, general street</td></tr>
<tr><td>1/30–1/60 s</td><td>Still subjects handheld with stabilization</td></tr>
<tr><td>1/4–2 s</td><td>Silky waterfalls, light trails (tripod)</td></tr>
<tr><td>10–30 s+</td><td>Stars, night cityscapes, smoothing the sea</td></tr>
</table>
<h2>Two kinds of blur</h2>
<ul>
<li><b>Camera shake</b> — <i>you</i> moved. Fix: faster shutter or stabilization.</li>
<li><b>Motion blur</b> — the <i>subject</i> moved. Fix: faster shutter. Stabilization can't help here.</li>
</ul>
<h2>The handheld rule (with IBIS)</h2>
<p>Classic rule: shutter ≥ 1 / (focal length × 1.5) on APS-C. A 50 mm lens → about 1/75 s. The a6700's 5-axis SteadyShot buys several stops, so you can often go down to 1/10 s or slower with still subjects — but people and pets will still blur.</p>
<div class="callout warn">Electronic shutter (silent) reads the sensor line by line. Fast-moving subjects or flickering LED lights can show “rolling shutter” skew or banding. Use the mechanical shutter for fast action and under artificial lights.</div>
<h2>Panning</h2>
<p>Set 1/30–1/60 s, follow a moving car or cyclist smoothly, and press while still moving. The subject stays sharp and the background streaks — instant sense of speed.</p>
`,
      },
      {
        id: "iso",
        title: "ISO & noise",
        minutes: 8,
        html: `
<p class="lead">ISO is the last lever you pull — use it when aperture and shutter can't give enough light without ruining the shot.</p>
<h2>Practical ISO zones for the a6700</h2>
<table>
<tr><th>ISO</th><th>Result</th></tr>
<tr><td>100–800</td><td>Clean. Use whenever you can.</td></tr>
<tr><td>1600–3200</td><td>Very usable; slight grain in shadows.</td></tr>
<tr><td>6400–12800</td><td>Visible noise, still fine for the web and events.</td></tr>
<tr><td>25600+</td><td>Emergency only.</td></tr>
</table>
<div class="callout tip">A sharp, noisy photo beats a clean, blurry one. Modern noise reduction (Lightroom Denoise, DxO PureRAW, etc.) can clean up high-ISO RAW files remarkably well.</div>
<h2>Auto ISO with a minimum shutter speed</h2>
<p>The best everyday setup: <b>A mode + Auto ISO</b>. Then set <b>MENU → Exposure/Color → Exposure → ISO AUTO Min. SS</b> to something like 1/125 s (or “Faster”). The camera keeps your aperture, guarantees a safe shutter speed, and only raises ISO when needed.</p>
<p>Also cap the range: <b>ISO Range Limit</b> or set Auto ISO upper limit to 6400 or 12800 so it never goes to extremes.</p>
<div class="callout warn">Underexposing and brightening later is <i>noisier</i> than using a higher ISO in the first place. Expose properly for the scene.</div>
`,
      },
    ],
    quiz: [
      { q: "Which aperture gives the shallowest depth of field?", options: ["f/16", "f/8", "f/4", "f/1.8"], answer: 3, why: "Smaller f-number = bigger opening = shallower depth of field." },
      { q: "You go from 1/250 s to 1/500 s. To keep brightness the same you could…", options: ["Close aperture by 1 stop", "Open aperture by 1 stop", "Lower ISO by 1 stop", "Nothing — brightness won't change"], answer: 1, why: "Faster shutter = 1 stop less light; open aperture (or raise ISO) by 1 stop to compensate." },
      { q: "A running dog is blurred but the background is sharp. The fix is…", options: ["Turn on SteadyShot", "Use a faster shutter speed", "Use a smaller aperture", "Lower the ISO"], answer: 1, why: "That's subject motion blur. Only faster shutter speeds freeze it; IBIS fixes camera shake only." },
      { q: "Most lenses are sharpest at roughly…", options: ["Wide open", "f/5.6–f/8", "f/22", "It's random"], answer: 1, why: "Wide open has aberrations; very small apertures suffer diffraction. The middle is the sweet spot." },
      { q: "Best everyday ‘smart auto’ setup for learning?", options: ["AUTO mode", "M with fixed ISO 100", "A mode + Auto ISO with a min. shutter speed", "S mode at 30 s"], answer: 2, why: "You control depth of field; the camera guarantees a safe shutter speed and raises ISO only when needed." },
    ],
  },

  /* ───────────────────────────── 3 ───────────────────────────── */
  {
    id: "modes",
    icon: "🎛️",
    title: "Shooting Modes & Metering",
    summary: "AUTO to Manual, plus metering, the histogram, exposure compensation and zebras.",
    lessons: [
      {
        id: "dial",
        title: "The mode dial, decoded",
        minutes: 10,
        html: `
<table>
<tr><th>Mode</th><th>You choose</th><th>Camera chooses</th><th>Use it for</th></tr>
<tr><td><b>AUTO</b></td><td>Nothing</td><td>Everything (scene detection)</td><td>Handing the camera to a friend</td></tr>
<tr><td><b>P</b> Program</td><td>ISO, exp. comp (can “shift” pairs)</td><td>Aperture + shutter</td><td>Snapshots when you want quick control</td></tr>
<tr><td><b>A</b> Aperture priority</td><td>Aperture</td><td>Shutter (and ISO if Auto)</td><td><b>80% of all photography.</b> Portraits, landscapes, travel</td></tr>
<tr><td><b>S</b> Shutter priority</td><td>Shutter</td><td>Aperture (and ISO if Auto)</td><td>Sports, kids, panning, waterfalls</td></tr>
<tr><td><b>M</b> Manual</td><td>Everything</td><td>Nothing (unless Auto ISO)</td><td>Night, studio/flash, consistent lighting, astro, video</td></tr>
<tr><td><b>MR</b></td><td colspan="3">Recalls a saved camera setup (see Module 1)</td></tr>
</table>
<div class="callout tip"><b>M + Auto ISO</b> is a superpower: you fix aperture <i>and</i> shutter (e.g. f/4 and 1/1000 s for sports) and the camera adjusts ISO for brightness. Exposure compensation still works in this combo.</div>
<h2>Recommended path</h2>
<ol class="steps">
<li>Week 1: <b>A mode</b> + Auto ISO. Think only about aperture.</li>
<li>Week 2: <b>S mode</b> for anything that moves.</li>
<li>Week 3: <b>M mode</b> at night and indoors where light doesn't change.</li>
</ol>
`,
      },
      {
        id: "metering",
        title: "Metering & exposure compensation",
        minutes: 12,
        html: `
<p class="lead">Your camera's light meter assumes the world is “average grey”. That's usually right — and predictably wrong for very bright or very dark scenes.</p>
<h2>Metering modes</h2>
<table>
<tr><th>Mode</th><th>How it works</th><th>When</th></tr>
<tr><td><b>Multi</b></td><td>Evaluates the whole frame in zones, weights faces</td><td>Default. Almost always.</td></tr>
<tr><td><b>Center</b></td><td>Weighted toward the middle</td><td>Subject centred, tricky background</td></tr>
<tr><td><b>Spot</b></td><td>Tiny area only</td><td>Stage performer, moon, backlit subject</td></tr>
<tr><td><b>Entire Screen Avg.</b></td><td>Averages everything</td><td>Consistent results when recomposing</td></tr>
<tr><td><b>Highlight</b></td><td>Protects the brightest parts</td><td>Concerts, sunsets — keep highlights from blowing</td></tr>
</table>
<h2>Exposure compensation (±EV)</h2>
<p>In P, A, S (and M with Auto ISO), exposure compensation tells the camera “brighter” or “darker” than it thinks. On the a6700, assign it to a dial or use the Fn menu.</p>
<ul>
<li><b>Snow, beach, white wedding dress:</b> camera makes it grey → dial <b>+0.7 to +1.7</b></li>
<li><b>Black cat, night street, dark stage:</b> camera makes it too bright → dial <b>−0.7 to −1.7</b></li>
<li><b>Backlit person:</b> +1 or more (or use Spot metering on the face)</li>
</ul>
<div class="callout a6700">The a6700 shows exposure as a live preview in the EVF. Make sure <b>Live View Display</b> (Setting Effect ON) is enabled so what you see is what you'll get. In M mode with flash, turn it off so the screen isn't black.</div>
`,
      },
      {
        id: "histogram",
        title: "Histogram & zebras",
        minutes: 10,
        html: `
<p class="lead">Screens lie (especially at night or in sun). The histogram doesn't.</p>
<h2>Reading the histogram</h2>
<p>It's a graph of how many pixels are at each brightness, black on the left, white on the right.</p>
<ul>
<li><b>Bunched to the left, touching the edge</b> → underexposed, shadows crushed</li>
<li><b>Climbing the right wall</b> → highlights clipped (pure white, no detail)</li>
<li><b>Spread out, not slammed against either wall</b> → healthy</li>
</ul>
<p>There's no “correct shape”. A night scene <i>should</i> lean left. What matters is whether important detail is clipped.</p>
<p>Turn it on: press <kbd>DISP</kbd> on the control wheel until the histogram view appears (set which views are available in <b>Setup → Display Option → DISP (Screen Disp) Set</b>).</p>
<h2>Zebras: clipping warnings live</h2>
<p><b>MENU → Exposure/Color → Zebra Display → On</b>, and <b>Zebra Level → 100+</b>. Diagonal stripes appear over areas that will be blown out. Lower the exposure until only light sources and specular reflections show stripes.</p>
<div class="callout tip">“Expose to the right”: as bright as possible <i>without</i> clipping important highlights. Shadows lifted from a bright RAW are cleaner than shadows lifted from a dark one.</div>
<h2>Playback check</h2>
<p>In playback, enable the highlight warning (“blinkies”) and histogram display to verify after the shot.</p>
`,
      },
    ],
    quiz: [
      { q: "You want to blur the background of a portrait. Which mode is most direct?", options: ["S", "A", "AUTO", "P"], answer: 1, why: "Aperture priority lets you choose the aperture (depth of field) directly." },
      { q: "Snow scenes come out grey. What do you do?", options: ["Exposure comp −1", "Exposure comp +1", "Switch to Spot metering on the sky", "Raise shutter speed"], answer: 1, why: "The meter averages bright snow to grey; add positive compensation." },
      { q: "Zebras at 100+ show you…", options: ["Areas in focus", "Areas about to clip to pure white", "Noisy areas", "Where faces are"], answer: 1, why: "Zebra stripes mark overexposed (clipping) areas." },
      { q: "M mode + Auto ISO means…", options: ["You set aperture and shutter, camera sets ISO", "Camera sets everything", "You set ISO only", "It isn't allowed"], answer: 0, why: "Perfect for action: lock in shutter and aperture, let ISO float." },
    ],
  },

  /* ───────────────────────────── 4 ───────────────────────────── */
  {
    id: "focus",
    icon: "🎯",
    title: "Autofocus Mastery",
    summary: "The a6700's AI autofocus is its superpower. Learn modes, areas, subject recognition and back-button focus.",
    lessons: [
      {
        id: "af-modes",
        title: "Focus modes & focus areas",
        minutes: 12,
        html: `
<h2>Focus Mode — <i>when</i> to focus</h2>
<table>
<tr><th>Mode</th><th>Behaviour</th><th>Use</th></tr>
<tr><td><b>AF-S</b> Single</td><td>Focuses once, locks</td><td>Static subjects, landscapes, product</td></tr>
<tr><td><b>AF-C</b> Continuous</td><td>Keeps refocusing while half-pressed</td><td><b>Default for everything else.</b> People, pets, action</td></tr>
<tr><td><b>AF-A</b> Automatic</td><td>Switches S/C on its own</td><td>Beginners; less predictable</td></tr>
<tr><td><b>DMF</b></td><td>AF-S then lets you fine-tune by hand</td><td>Macro, critical focus</td></tr>
<tr><td><b>MF</b> Manual</td><td>You turn the ring</td><td>Astro, video pulls, through glass/fences</td></tr>
</table>
<h2>Focus Area — <i>where</i> to focus</h2>
<table>
<tr><th>Area</th><th>Use</th></tr>
<tr><td><b>Wide</b></td><td>Camera picks; best combined with subject recognition</td></tr>
<tr><td><b>Zone</b></td><td>You choose a region; good for erratic subjects like birds</td></tr>
<tr><td><b>Center Fix</b></td><td>Always the middle</td></tr>
<tr><td><b>Spot S/M/L</b></td><td>Precise point you move around</td></tr>
<tr><td><b>Expand Spot</b></td><td>Spot with a backup ring</td></tr>
<tr><td><b>Tracking</b> (+ any of the above)</td><td>Start on a subject and the box follows it around the frame</td></tr>
</table>
<div class="callout a6700">A brilliant all-rounder: <b>AF-C + Tracking: Spot M</b> (or Tracking: Wide) with subject recognition on. Put the box on your subject, half-press (or AF-ON), and the a6700 sticks to it like glue — even as it moves across the frame.</div>
<h2>Moving the focus point</h2>
<p>Use the touchscreen: <b>Focus → Touch Operation</b> → enable <b>Touch Pad</b> for when your eye is at the viewfinder, then drag your thumb on the screen to move the point. Set Touch Pad to “Relative Position” and just the right half of the screen to avoid nose-touches.</p>
`,
      },
      {
        id: "recognition",
        title: "AI subject recognition",
        minutes: 10,
        html: `
<p class="lead">The a6700 has a dedicated AI processing unit that recognises bodies and poses, not just eyes. It's the same generation of AF found in Sony's pro bodies.</p>
<h2>Recognition targets</h2>
<ul>
<li><b>Human</b> — eye, face, head and body; keeps tracking even when they turn away</li>
<li><b>Animal / Bird / Animal+Bird</b> — dogs, cats, wildlife; birds even in flight</li>
<li><b>Insect</b> — macro and garden shots</li>
<li><b>Car / Train</b> and <b>Airplane</b> — motorsport, planespotting</li>
<li><b>Auto</b> — lets the camera decide between people, animals and birds</li>
</ul>
<p>Set it in <b>MENU → Focus → Subject Recognition</b>: <b>Subject Recog in AF: On</b>, <b>Recog. Target</b>, and <b>Right/Left Eye Select: Auto</b>.</p>
<div class="callout tip">Assign <b>Recog. Target</b> to a custom button (or the Fn menu). Switching from Human to Bird in one press matters when a heron flies past during a family walk.</div>
<h2>When recognition struggles</h2>
<ul>
<li>Subjects very small in the frame → zoom in, or use Zone area</li>
<li>Heavy backlight or low contrast → Spot focus on a high-contrast edge</li>
<li>Busy foreground branches → Spot S, or switch to MF</li>
</ul>
`,
      },
      {
        id: "bbf",
        title: "Back-button focus",
        minutes: 8,
        html: `
<p class="lead">Separating “focus” from “take the picture” is the single most popular pro tweak. It feels weird for a day and then you'll never go back.</p>
<h2>Setup</h2>
<ol class="steps">
<li><b>MENU → Focus → AF/MF → AF w/ shutter → Off</b></li>
<li>Make sure the <kbd>AF-ON</kbd> button is set to <b>AF On</b> (it is by default)</li>
<li>Set Focus Mode to <b>AF-C</b></li>
</ol>
<h2>How to use it</h2>
<ul>
<li><b>Moving subject:</b> hold AF-ON with your thumb — focus tracks continuously — and press the shutter whenever you like.</li>
<li><b>Still subject:</b> press AF-ON once, let go. Focus stays locked. Recompose and take as many shots as you want.</li>
</ul>
<p>You get the benefits of AF-S and AF-C without switching modes.</p>
<div class="callout warn">If you hand the camera to someone else, they'll get blurry photos because the shutter no longer focuses. Save a “guest” setup to MR, or switch back temporarily.</div>
`,
      },
    ],
    quiz: [
      { q: "Best focus mode for a child running towards you?", options: ["AF-S", "MF", "AF-C", "DMF"], answer: 2, why: "Continuous AF keeps adjusting focus as distance changes." },
      { q: "With back-button focus, the shutter button…", options: ["Focuses and shoots", "Only takes the picture", "Only focuses", "Starts video"], answer: 1, why: "Focus moves to AF-ON; the shutter just fires." },
      { q: "A bird is tiny in the frame and AF keeps grabbing the tree. Try…", options: ["Wide area", "Zone or Spot area + Bird recognition", "Turn off AF", "Raise ISO"], answer: 1, why: "Restricting the area helps the camera pick the right subject." },
      { q: "Tracking focus area does what?", options: ["Follows a subject around the frame after you start on it", "Always focuses in the centre", "Only works in MF", "Turns off subject recognition"], answer: 0, why: "Tracking hands off focus point movement to the camera as the subject moves." },
    ],
  },

  /* ───────────────────────────── 5 ───────────────────────────── */
  {
    id: "color",
    icon: "🎨",
    title: "Colour, White Balance & Looks",
    summary: "Get colour right in-camera and develop your own style with Creative Looks.",
    lessons: [
      {
        id: "wb",
        title: "White balance",
        minutes: 8,
        html: `
<p class="lead">Light has colour. Candlelight is orange, shade is blue. White balance tells the camera what “white” should look like.</p>
<table>
<tr><th>Light source</th><th>Approx. Kelvin</th><th>Looks</th></tr>
<tr><td>Candle</td><td>1,900 K</td><td>Deep orange</td></tr>
<tr><td>Tungsten bulb</td><td>3,200 K</td><td>Warm orange</td></tr>
<tr><td>Sunrise / golden hour</td><td>3,500–4,500 K</td><td>Warm gold</td></tr>
<tr><td>Midday sun</td><td>5,500 K</td><td>Neutral</td></tr>
<tr><td>Overcast</td><td>6,500 K</td><td>Slightly cool</td></tr>
<tr><td>Open shade</td><td>7,500 K+</td><td>Blue</td></tr>
</table>
<h2>Strategy</h2>
<ul>
<li><b>AWB</b> (Auto) is excellent on the a6700. Leave it on for most stills, especially with RAW.</li>
<li>Use <b>AWB Priority Set → Ambience</b> to keep warm indoor light feeling warm, or <b>White</b> to neutralise it.</li>
<li><b>Fixed Kelvin</b> for video and time-lapses, so colour doesn't shift between shots.</li>
<li><b>Custom WB</b>: point at a white/grey card in the light, press, and get perfect colour (product, food).</li>
</ul>
<div class="callout tip">Sunsets look better with WB set to “Daylight” or “Cloudy” than AWB, which tries to neutralise the gorgeous orange.</div>
`,
      },
      {
        id: "looks",
        title: "Creative Looks",
        minutes: 10,
        html: `
<p class="lead">Creative Looks are Sony's colour recipes for JPEGs (and the in-camera preview). They don't change RAW data, so experiment freely.</p>
<table>
<tr><th>Look</th><th>Character</th><th>Try it for</th></tr>
<tr><td><b>ST</b> Standard</td><td>Balanced, the default</td><td>Everything</td></tr>
<tr><td><b>PT</b> Portrait</td><td>Soft, gentle skin tones</td><td>Portraits</td></tr>
<tr><td><b>NT</b> Neutral</td><td>Low saturation/sharpness</td><td>Base for editing</td></tr>
<tr><td><b>VV</b> / <b>VV2</b> Vivid</td><td>Punchy colour &amp; contrast</td><td>Landscapes, flowers</td></tr>
<tr><td><b>FL</b> Film</td><td>Moody, muted, film-like</td><td>Street, everyday</td></tr>
<tr><td><b>IN</b> Instant</td><td>Matte, faded</td><td>Lifestyle</td></tr>
<tr><td><b>SH</b> Soft high-key</td><td>Bright, airy</td><td>Interiors, cafés</td></tr>
<tr><td><b>BW</b> / <b>SE</b></td><td>Black &amp; white / Sepia</td><td>Learning to see light</td></tr>
</table>
<p>Each look can be fine-tuned: Contrast, Highlights, Shadows, Fade, Saturation, Sharpness, Clarity. Adjust one and you've made your own “recipe”.</p>
<div class="callout try">Shoot a week in <b>BW</b>. Without colour you'll start noticing light, shadow and shape — the real foundations of photography. (Your RAW files keep the colour.)</div>
`,
      },
      {
        id: "raw",
        title: "RAW editing basics",
        minutes: 10,
        html: `
<p class="lead">A RAW file is a digital negative. Ten minutes of editing turns a good shot into a great one.</p>
<h2>Software</h2>
<ul>
<li><b>Lightroom / Lightroom Classic</b> — the standard; great organisation and AI masks.</li>
<li><b>Capture One</b> — superb colour from Sony files.</li>
<li><b>Imaging Edge Desktop</b> — Sony's free RAW converter.</li>
<li><b>darktable / RawTherapee</b> — free and open source.</li>
</ul>
<h2>A simple editing order</h2>
<ol class="steps">
<li><b>Crop &amp; straighten</b> — fix horizons first</li>
<li><b>White balance</b></li>
<li><b>Exposure</b> overall</li>
<li><b>Highlights down / shadows up</b> to recover detail</li>
<li><b>Whites / blacks</b> to set the contrast endpoints</li>
<li><b>Colour</b> — vibrance before saturation</li>
<li><b>Local adjustments</b> — brighten the subject, darken edges</li>
<li><b>Noise reduction &amp; sharpening</b> last</li>
</ol>
<div class="callout tip">Edit with a light hand, then walk away and come back. If the first thing you notice is the edit, it's too strong.</div>
`,
      },
    ],
    quiz: [
      { q: "Photos in open shade look too blue. Set WB to…", options: ["Tungsten", "Shade (or higher Kelvin)", "Fluorescent", "Lower Kelvin like 2500 K"], answer: 1, why: "The Shade preset/higher Kelvin warms the image to cancel the blue." },
      { q: "Do Creative Looks change your RAW file?", options: ["Yes, permanently", "No — they affect JPEG and preview only", "Only BW does", "Only in M mode"], answer: 1, why: "RAW stores sensor data; the look is a rendering that RAW editors may ignore." },
      { q: "For a time-lapse you should use…", options: ["AWB", "A fixed Kelvin white balance", "Vivid", "Highlight metering"], answer: 1, why: "AWB can flicker between frames; fixed WB keeps colour consistent." },
    ],
  },

  /* ───────────────────────────── 6 ───────────────────────────── */
  {
    id: "compose",
    icon: "🖼️",
    title: "Composition & Lenses",
    summary: "Seeing the photo before you take it, and choosing lenses for your a6700.",
    lessons: [
      {
        id: "rules",
        title: "Composition toolkit",
        minutes: 12,
        html: `
<p class="lead">Settings make a photo <i>correct</i>. Composition makes it <i>interesting</i>.</p>
<h2>Eight tools</h2>
<ol>
<li><b>Rule of thirds</b> — place the subject or horizon on a third line. Turn on the grid: <b>Setup → Display Option → Grid Line Display</b>.</li>
<li><b>Leading lines</b> — roads, rails, fences that pull the eye into the frame.</li>
<li><b>Framing</b> — doorways, branches, windows around the subject.</li>
<li><b>Simplify</b> — every element should earn its place. Get closer. Then closer.</li>
<li><b>Foreground interest</b> — for landscapes, include a rock or flower to add depth.</li>
<li><b>Change height</b> — shoot kids and pets from <i>their</i> eye level. The flip screen makes low angles easy.</li>
<li><b>Negative space</b> — empty sky or wall makes a small subject feel bold.</li>
<li><b>Light first</b> — side light reveals texture; backlight gives glow; golden hour flatters everything.</li>
</ol>
<div class="callout tip">Before pressing the shutter, scan the four edges of the frame. Bright spots, cut-off limbs and poles “growing” out of heads live there.</div>
<div class="callout a6700">Use the level gauge (press DISP to cycle to it) to keep horizons straight — crooked horizons are the most common beginner tell.</div>
`,
      },
      {
        id: "focal",
        title: "Focal length & perspective",
        minutes: 10,
        html: `
<table>
<tr><th>On a6700</th><th>FF equivalent</th><th>Feel</th><th>Great for</th></tr>
<tr><td>10–16 mm</td><td>15–24 mm</td><td>Ultra-wide, dramatic</td><td>Interiors, architecture, astro, vlogging</td></tr>
<tr><td>18–24 mm</td><td>27–36 mm</td><td>Wide, “documentary”</td><td>Landscapes, travel, street</td></tr>
<tr><td>30–35 mm</td><td>45–52 mm</td><td>Natural, like your eye</td><td>Everyday, street, environmental portraits</td></tr>
<tr><td>50–56 mm</td><td>75–85 mm</td><td>Classic portrait</td><td>Headshots, details</td></tr>
<tr><td>70–135 mm</td><td>105–200 mm</td><td>Compressed, isolating</td><td>Portraits, events, landscape details</td></tr>
<tr><td>200–350 mm+</td><td>300–525 mm+</td><td>Super-telephoto</td><td>Wildlife, birds, sports</td></tr>
</table>
<h2>Perspective comes from <i>where you stand</i></h2>
<p>Wide lenses up close exaggerate (big noses, stretched rooms). Telephotos from far away compress (mountains loom behind a person). Choosing focal length is really choosing your distance.</p>
<div class="callout try">Take a portrait at 18 mm close up and at 100 mm from further back, keeping the face the same size. Compare noses and background.</div>
`,
      },
      {
        id: "lenses",
        title: "Lens guide for the a6700",
        minutes: 8,
        html: `
<p class="lead">Lenses matter more than bodies. Here are proven E-mount options (prices and availability change — check current reviews).</p>
<table>
<tr><th>Lens</th><th>Why</th></tr>
<tr><td>Sony E 18-135 mm f/3.5-5.6 OSS</td><td>The common kit lens. Versatile travel zoom.</td></tr>
<tr><td>Sigma 18-50 mm f/2.8 DC DN</td><td>Tiny, sharp, constant f/2.8. A brilliant “always-on” zoom.</td></tr>
<tr><td>Tamron 17-70 mm f/2.8</td><td>Bigger range, constant f/2.8, stabilized.</td></tr>
<tr><td>Sigma 30 mm f/1.4 DC DN</td><td>The classic affordable fast prime. Low light and blur.</td></tr>
<tr><td>Sony E 15 mm f/1.4 G / E 11 mm f/1.8</td><td>Wide primes for vlogging, interiors, astro.</td></tr>
<tr><td>Sigma 56 mm f/1.4 DC DN / Sony FE 50 mm f/1.8</td><td>Portrait primes (~85/75 mm equivalent).</td></tr>
<tr><td>Sony E 70-350 mm f/4.5-6.3 G OSS</td><td>Compact wildlife &amp; sports reach (up to 525 mm eq.).</td></tr>
<tr><td>Sony E 30 mm f/3.5 Macro / FE 90 mm f/2.8 Macro G</td><td>True 1:1 macro.</td></tr>
</table>
<div class="callout tip">If you buy one lens beyond the kit, make it a fast prime (f/1.4–f/1.8). It teaches you composition and does things no kit zoom can.</div>
`,
      },
    ],
    quiz: [
      { q: "Which on-a6700 focal length is a classic headshot length?", options: ["11 mm", "18 mm", "56 mm", "350 mm"], answer: 2, why: "56 mm × 1.5 ≈ 84 mm — the classic portrait focal length." },
      { q: "Perspective (how big the background looks) is mainly determined by…", options: ["The aperture", "Camera-to-subject distance", "ISO", "White balance"], answer: 1, why: "Focal length dictates framing; your position determines perspective." },
      { q: "Easiest way to avoid crooked horizons on the a6700?", options: ["Use the level gauge / grid", "Shoot at f/16", "Use Vivid look", "Higher ISO"], answer: 0, why: "The electronic level and grid lines make it obvious when you're tilted." },
    ],
  },

  /* ───────────────────────────── 7 ───────────────────────────── */
  {
    id: "recipes",
    icon: "📖",
    title: "Genre Recipes",
    summary: "Starting settings and techniques for portraits, landscapes, street, night, action and macro.",
    lessons: [
      {
        id: "portrait",
        title: "Portraits",
        minutes: 8,
        html: `
<table>
<tr><th>Mode</th><td>A (or M in stable light)</td></tr>
<tr><th>Aperture</th><td>f/1.4–f/2.8 single person · f/4–f/5.6 groups</td></tr>
<tr><th>Shutter</th><td>Auto ISO min. 1/250 s</td></tr>
<tr><th>Focus</th><td>AF-C · Wide or Tracking · Recognition: Human · Eye: Auto</td></tr>
<tr><th>Look</th><td>PT or ST · AWB</td></tr>
<tr><th>Lens</th><td>50–56 mm prime, or longest end of a zoom</td></tr>
</table>
<ul>
<li>Put the person in <b>open shade</b> or with the sun <b>behind</b> them; avoid harsh midday light on faces.</li>
<li>Move them <b>away from the background</b> for more blur.</li>
<li>Talk constantly. Expressions beat technique.</li>
<li>Burst in <b>Mid</b> drive to catch the natural moment between poses.</li>
</ul>
`,
      },
      {
        id: "landscape",
        title: "Landscapes",
        minutes: 8,
        html: `
<table>
<tr><th>Mode</th><td>A or M</td></tr>
<tr><th>Aperture</th><td>f/8–f/11</td></tr>
<tr><th>ISO</th><td>100</td></tr>
<tr><th>Focus</th><td>AF-S · Spot · focus about one-third into the scene</td></tr>
<tr><th>Drive</th><td>2 s self-timer on tripod (and SteadyShot off on a tripod)</td></tr>
<tr><th>Look</th><td>VV or ST · WB Daylight</td></tr>
</table>
<ul>
<li>Shoot at <b>golden hour</b> (first/last hour of sun) and <b>blue hour</b> (just after sunset).</li>
<li>Use <b>Bracketing</b> (Drive → Bracket, 3 frames ±1 EV) for high-contrast scenes, then merge to HDR.</li>
<li>A <b>circular polariser</b> deepens skies and removes reflections; an <b>ND filter</b> enables long exposures in daylight.</li>
</ul>
`,
      },
      {
        id: "street",
        title: "Street & travel",
        minutes: 8,
        html: `
<table>
<tr><th>Mode</th><td>A + Auto ISO (min. SS 1/250) or S at 1/250</td></tr>
<tr><th>Aperture</th><td>f/5.6–f/8 for depth</td></tr>
<tr><th>Focus</th><td>AF-C · Wide · Recognition: Human</td></tr>
<tr><th>Shutter type</th><td>Electronic + Silent Mode for discretion (mechanical under LED lights)</td></tr>
<tr><th>Look</th><td>FL or BW</td></tr>
<tr><th>Lens</th><td>Compact: Sigma 18-50 f/2.8 or a 23–30 mm prime</td></tr>
</table>
<ul>
<li>Flip the screen up and shoot from the waist — people react less than to a camera at eye level.</li>
<li>Find a great background and wait for someone to walk into it.</li>
<li>Respect people. Smile, and delete a photo if someone asks.</li>
</ul>
`,
      },
      {
        id: "night",
        title: "Night, low light & astro",
        minutes: 10,
        html: `
<h2>Handheld at night</h2>
<p>A mode, widest aperture (f/1.4–f/2.8), Auto ISO up to 6400–12800, SteadyShot on. Brace against a wall and use burst — one frame of a few will be sharpest.</p>
<h2>Cityscapes &amp; light trails (tripod)</h2>
<table>
<tr><td>M · f/8 · ISO 100 · 5–30 s · 2 s timer · SteadyShot off</td></tr>
</table>
<h2>Milky Way (tripod, dark sky)</h2>
<table>
<tr><th>Lens</th><td>Widest &amp; fastest you have (e.g. 11 mm f/1.8, 15 mm f/1.4)</td></tr>
<tr><th>Aperture</th><td>Wide open</td></tr>
<tr><th>Shutter</th><td>“500 rule” for APS-C: 500 ÷ (focal length × 1.5) → 11 mm ≈ 30 s; for sharper stars use ~15–20 s</td></tr>
<tr><th>ISO</th><td>1600–6400</td></tr>
<tr><th>Focus</th><td>MF, magnify on a bright star until it's the smallest dot</td></tr>
<tr><th>WB</th><td>~3800–4200 K</td></tr>
</table>
<div class="callout a6700">Turn off <b>Long Exposure NR</b> for astro sequences if you plan to stack (it doubles each exposure time). Use the <b>Interval Shoot</b> function for time-lapses — it's built in.</div>
`,
      },
      {
        id: "action",
        title: "Sports, kids, pets & wildlife",
        minutes: 8,
        html: `
<table>
<tr><th>Mode</th><td>M + Auto ISO, or S</td></tr>
<tr><th>Shutter</th><td>1/1000 s (people/pets) · 1/2000–1/4000 s (birds in flight)</td></tr>
<tr><th>Aperture</th><td>Widest of the lens (f/4–f/6.3 on a telezoom)</td></tr>
<tr><th>Focus</th><td>AF-C · Tracking: Zone or Wide · Recognition: Animal / Bird / Human</td></tr>
<tr><th>Drive</th><td>Continuous Hi (or Hi+ for 11 fps)</td></tr>
<tr><th>Shutter type</th><td>Mechanical for very fast subjects (less distortion)</td></tr>
</table>
<ul>
<li>Pre-focus where the action will happen, and start tracking early.</li>
<li>Shoot bursts but stay selective — culling 2,000 near-identical frames is no fun.</li>
<li>Get low, to eye level. Kids and pets look heroic from their own height.</li>
<li>For wildlife, the a6700's <b>APS-C crop</b> is your friend: a 350 mm lens reaches like 525 mm.</li>
</ul>
`,
      },
      {
        id: "macro",
        title: "Macro & close-up",
        minutes: 6,
        html: `
<table>
<tr><th>Aperture</th><td>f/8–f/16 (depth of field is razor thin up close)</td></tr>
<tr><th>Focus</th><td>DMF or MF + Focus Magnifier + Peaking (Focus → Peaking Display)</td></tr>
<tr><th>Recognition</th><td>Insect</td></tr>
<tr><th>Shutter</th><td>1/200 s+ handheld, or tripod for still subjects</td></tr>
</table>
<ul>
<li>Instead of turning the focus ring, rock your body slightly forward and back.</li>
<li>Shoot early morning: insects are sluggish and there's less wind.</li>
<li>Diffuse harsh light with a white umbrella or reflector.</li>
</ul>
`,
      },
    ],
    quiz: [
      { q: "Starting aperture for a sharp landscape?", options: ["f/1.4", "f/2.8", "f/8–f/11", "f/22"], answer: 2, why: "Deep depth of field without heavy diffraction." },
      { q: "Recommended shutter for birds in flight?", options: ["1/60 s", "1/250 s", "1/2000 s or faster", "2 s"], answer: 2, why: "Wings move fast; you need very short exposures to freeze them." },
      { q: "On a tripod for a 20 s exposure you should…", options: ["Leave SteadyShot on", "Turn SteadyShot off and use a timer", "Use ISO 12800", "Use AF-C"], answer: 1, why: "Stabilization can introduce drift on a tripod; a timer avoids shake from pressing the button." },
      { q: "Using the 500 rule with an 11 mm lens on APS-C, max exposure is about…", options: ["5 s", "15 s", "30 s", "60 s"], answer: 2, why: "500 ÷ (11 × 1.5) ≈ 30 s." },
    ],
  },

  /* ───────────────────────────── 8 ───────────────────────────── */
  {
    id: "video",
    icon: "🎬",
    title: "Video Fundamentals",
    summary: "The a6700 is a serious video camera. Frame rates, the 180° rule, profiles and audio.",
    lessons: [
      {
        id: "basics",
        title: "Frame rate, shutter & the 180° rule",
        minutes: 10,
        html: `
<p class="lead">Flip the switch under the mode dial to <b>Movie</b>. Video has different rules than photos.</p>
<h2>Frame rate</h2>
<table>
<tr><th>Rate</th><th>Feel / use</th></tr>
<tr><td>24p</td><td>Cinematic, film-like</td></tr>
<tr><td>30p</td><td>Online video, TV look (NTSC regions)</td></tr>
<tr><td>25p / 50p</td><td>PAL regions (Europe, India, Australia…) — matches mains-light flicker</td></tr>
<tr><td>60p</td><td>Smooth action; 2.5× slow-motion on a 24p timeline</td></tr>
<tr><td>120p</td><td>5× slow motion. 4K 120p on the a6700 uses a ~1.58× extra crop</td></tr>
</table>
<h2>The 180° shutter rule</h2>
<p>Shutter speed ≈ <b>1 / (2 × frame rate)</b>. 24p → 1/50 s, 30p → 1/60 s, 60p → 1/125 s. This gives natural-looking motion blur. Faster shutters look jittery and “video-gamey”.</p>
<div class="callout warn">Fixed shutter speed means in bright daylight you'll overexpose even at ISO 100 and f/8. That's why video shooters use <b>ND filters</b> (a variable ND is the easiest). They are sunglasses for your lens.</div>
<h2>Exposure for video</h2>
<p>Shoot in <b>M</b> (or A with care), set shutter by the 180° rule, aperture for the look you want, then ISO (or ND) for brightness. Use <b>zebras</b> at 95–100% to protect highlights on skin and sky.</p>
`,
      },
      {
        id: "profiles",
        title: "S-Cinetone, S-Log3 & LUTs",
        minutes: 10,
        html: `
<table>
<tr><th>Option</th><th>What it is</th><th>Who it's for</th></tr>
<tr><td><b>Creative Look (ST, FL…)</b></td><td>Finished look, no grading needed</td><td>Quick social content</td></tr>
<tr><td><b>S-Cinetone</b></td><td>Sony's cinema-style look with lovely skin tones, ready to use</td><td><b>Most people.</b> Looks great straight out of camera.</td></tr>
<tr><td><b>S-Log3</b></td><td>Flat, low-contrast log profile with maximum dynamic range</td><td>When you'll colour-grade every clip</td></tr>
<tr><td><b>HLG</b></td><td>HDR-ready profile</td><td>Viewing on HDR TVs/phones</td></tr>
</table>
<h2>Shooting S-Log3 properly</h2>
<ul>
<li>Use <b>10-bit 4:2:2</b> (XAVC S 10-bit or XAVC HS) — 8-bit log falls apart when graded.</li>
<li>Base ISO for S-Log3 is higher (800 on this camera), so you'll need ND outdoors.</li>
<li>Expose a little <b>brighter</b> (+1 to +1.7 on the meter) for cleaner shadows.</li>
<li>Load a LUT so the monitor looks normal: <b>Exposure/Color → Color/Tone → LUT/Look Disp.</b> The a6700 can import your own <b>user LUTs</b> and even bake them into the footage.</li>
</ul>
<div class="callout tip">Start with S-Cinetone. Only move to S-Log3 when you're excited about colour grading in DaVinci Resolve (free) or Premiere.</div>
`,
      },
      {
        id: "practical",
        title: "Stabilization, focus & audio",
        minutes: 8,
        html: `
<h2>Stabilization</h2>
<ul>
<li><b>SteadyShot Active</b> adds digital stabilization on top of IBIS (slight crop) — great for walking shots.</li>
<li>Walk heel-to-toe with bent knees (“ninja walk”) and hold the camera with both hands close to your body.</li>
<li>For the smoothest results, stabilize in post with Sony's <b>Catalyst Browse/Prepare</b> using gyro data.</li>
</ul>
<h2>Video autofocus</h2>
<ul>
<li>AF-C + Subject Recognition works superbly. Tap the screen to switch subjects.</li>
<li><b>AF Transition Speed</b> (slower = cinematic racking) and <b>AF Subj. Shift Sens.</b> (lower = less jumping) live in the Focus menu.</li>
<li><b>Product Showcase</b> setting makes AF prefer an object held up to the lens over your face — for reviews/vlogs.</li>
</ul>
<h2>Audio is half the video</h2>
<ul>
<li>The built-in mic is fine for reference, not for dialogue.</li>
<li>The Multi Interface Shoe supports Sony digital audio mics (e.g. ECM-B10, ECM-W3) with no cable; or use a 3.5 mm shotgun/lav.</li>
<li>Monitor with headphones (the a6700 has a headphone jack) and keep levels peaking around −12 dB.</li>
</ul>
`,
      },
    ],
    quiz: [
      { q: "At 24p, the 180° rule suggests a shutter of…", options: ["1/24 s", "1/50 s", "1/250 s", "1/1000 s"], answer: 1, why: "1 / (2 × 24) ≈ 1/48 → 1/50 s." },
      { q: "Why do video shooters use ND filters?", options: ["To add colour", "To reduce light so they can keep the 180° shutter and open aperture", "To improve AF", "To zoom"], answer: 1, why: "ND cuts light without changing shutter or aperture." },
      { q: "Easiest great-looking profile without grading?", options: ["S-Log3", "S-Cinetone", "HLG", "8-bit log"], answer: 1, why: "S-Cinetone is designed to look cinematic straight out of camera." },
      { q: "S-Log3 should be recorded in…", options: ["8-bit", "10-bit 4:2:2", "JPEG", "It doesn't matter"], answer: 1, why: "Log footage needs the extra tonal precision of 10-bit to grade cleanly." },
    ],
  },

  /* ───────────────────────────── 9 ───────────────────────────── */
  {
    id: "workflow",
    icon: "🧰",
    title: "Workflow, Care & Practice",
    summary: "Transferring, backing up, caring for your gear — and a 7-day practice plan.",
    lessons: [
      {
        id: "transfer",
        title: "Getting photos off the camera",
        minutes: 8,
        html: `
<ul>
<li><b>Creators' App</b> (iOS/Android): wireless transfer, remote shooting, and automatic location tagging from your phone's GPS. Set up via <b>MENU → Network</b>.</li>
<li><b>Card reader</b>: fastest way to move hundreds of RAWs — UHS-II readers are worth it.</li>
<li><b>USB-C</b>: transfer, charging, and even a webcam (UVC/UAC) without extra software.</li>
</ul>
<h2>The 3-2-1 backup rule</h2>
<p><b>3</b> copies, on <b>2</b> different types of storage, <b>1</b> off-site (cloud). Cards fail; laptops get stolen. Don't format a card until its photos are in two places.</p>
<h2>Culling</h2>
<p>Be ruthless. Flag only your best 5–10% from a shoot. Rate in-camera with the <b>Protect</b> or <b>Rating</b> functions, or use quick culling software. Showing fewer, better photos is how people get known as “good photographers”.</p>
`,
      },
      {
        id: "care",
        title: "Caring for your camera",
        minutes: 6,
        html: `
<ul>
<li><b>Sensor dust</b>: change lenses quickly, mount facing down. Dark spots at f/11+ are dust; use a rocket blower (never compressed air cans). The camera's Anti-dust function in the Setup menu vibrates the sensor.</li>
<li><b>Batteries</b>: the NP-FZ100 lasts several hundred shots; carry a spare for travel and video. They also charge via USB-C power banks.</li>
<li><b>Weather</b>: the a6700 is dust and moisture <i>resistant</i>, not waterproof. Dry it off and don't swap lenses in rain.</li>
<li><b>Heat</b>: long 4K recording in hot sun can warm the camera. Set <b>Auto Power OFF Temp.</b> to High and flip the screen out for airflow.</li>
<li><b>Firmware</b>: check Sony's support site for updates — they add features and fix bugs.</li>
</ul>
`,
      },
      {
        id: "practice",
        title: "Your 7-day practice plan",
        minutes: 5,
        html: `
<p class="lead">Knowledge becomes skill only by shooting. One assignment a day, about 30 minutes each.</p>
<div data-widget="checklist" data-id="practice-week"></div>
<div class="callout tip">After each day, pick your <b>single best</b> photo and write one sentence about why it works. That reflection is where the learning happens.</div>
<h2>What next?</h2>
<ul>
<li>Join a photo walk or local club — feedback accelerates everything.</li>
<li>Pick a 30-day project (one photo a day of a single theme).</li>
<li>Study photographers whose work you love; reverse-engineer their light and focal length.</li>
</ul>
`,
      },
    ],
    quiz: [
      { q: "The 3-2-1 backup rule means…", options: ["3 cards, 2 cameras, 1 laptop", "3 copies, 2 media types, 1 off-site", "Back up every 3 days", "3 RAW, 2 JPEG, 1 video"], answer: 1, why: "Three copies across two media types with one stored elsewhere." },
      { q: "Dark spots appear in the sky at f/11. Most likely…", options: ["Dead pixels", "Sensor dust", "Bad lens", "Wrong white balance"], answer: 1, why: "Dust becomes visible at small apertures; blow it off with a rocket blower." },
      { q: "Is the a6700 waterproof?", options: ["Yes", "No — weather resistant only", "Only the lens", "Only in Movie mode"], answer: 1, why: "It's sealed against dust and moisture, but not designed to be submerged or drenched." },
    ],
  },
];
