/**
 * <sexagenary-cycle> Web Component
 *
 * Usage:
 *   <script type="module" src="sexagenary-cycle.js"></script>
 *   <sexagenary-cycle></sexagenary-cycle>
 *   <sexagenary-cycle year="1984"></sexagenary-cycle>    <!-- AD 1984 -->
 *   <sexagenary-cycle year="-3"></sexagenary-cycle>      <!-- 4 BC   -->
 *   <sexagenary-cycle date="2026-05-23"></sexagenary-cycle>
 *   <sexagenary-cycle lang="en" year="2026"></sexagenary-cycle>
 *
 * Attributes:
 *   year  — Astronomical year integer (AD positive, 0 = 1 BC, negative = earlier BC)
 *   date  — ISO date string; year part used (AD only)
 *   lang  — BCP 47 language subtag, e.g. "zh" (default) or "en".
 *           Falls back to <html lang="…"> then to "zh".
 *
 * Adding a locale at runtime:
 *   import { registerLocale } from './sexagenary-cycle.js';
 *   import jaLocale from './locales/ja.js';
 *   registerLocale('ja', jaLocale);
 */

import locales from './locales/index.js';

// ── Locale registry ──────────────────────────────────────────────────────────

/** @type {Record<string, LocaleDef>} */
const LOCALES = Object.create(null);

/**
 * Register (or overwrite) a locale definition.
 * May be called before or after the element is connected to the DOM.
 *
 * @param {string}    lang  BCP 47 primary language subtag, e.g. 'en', 'zh', 'ja'
 * @param {LocaleDef} def   Locale object — see src/locales/en.js for the full shape
 */
export function registerLocale(lang, def) {
  LOCALES[lang.toLowerCase()] = def;
}

// Built-in locales shipped with the component
for (const [lang, def] of Object.entries(locales)) {
  registerLocale(lang, def);
}

/**
 * @typedef {object} LocaleDef
 * @property {string}   label         Display name in the locale's own language (e.g. 'English', '中文')
 * @property {string}   pickerLabel
 * @property {string}   btnBC
 * @property {string}   btnAD
 * @property {string}   btnToday
 * @property {string}   yearUnit
 * @property {string}   yang
 * @property {string}   yin
 * @property {string[]} elements      Length-5 array parallel to the Five Elements
 * @property {string[]} animals       Length-12 array parallel to the Earthly Branches
 * @property {string|null} animalFont CSS font-family for the animal ring; null = default
 * @property {string}   centerTitle
 * @property {string}   centerSubtitle
 * @property {string}   svgTitle
 * @property {string}   svgDesc
 * @property {string}   footer
 * @property {(astro: number) => string}                    fmtYear
 * @property {(pol: string, elem: string, animal: string) => string} fmtInfo
 * @property {(pol: string, elem: string) => string}        fmtLegend
 */

// ── Shared constants — never localised ───────────────────────────────────────

const NS   = 'http://www.w3.org/2000/svg';
const FONT = "'Noto Serif SC','STSong','SimSun',serif";

// Angular distance (°) below which the current-year marker label is nudged
// away from the 甲子 marker. Tune freely.
const LABEL_NUDGE_THRESHOLD = 12;

// ── Color palettes ───────────────────────────────────────────────────────────

// C_ELEM[i] = [fillColor, textColor] for the 5 Five-Elements
const C_ELEM = [
  ['hsl(100, 38%, 58%)', 'hsl(100, 50%, 13%)'], // Wood
  ['hsl(  8, 56%, 62%)', 'hsl(  8, 65%, 13%)'], // Fire
  ['hsl( 38, 52%, 60%)', 'hsl( 38, 60%, 13%)'], // Earth
  ['hsl( 48, 46%, 66%)', 'hsl( 48, 55%, 15%)'], // Metal
  ['hsl(208, 44%, 60%)', 'hsl(208, 55%, 13%)'], // Water
];

// C_STEM[i] = [fillColor, textColor] — Yang (brighter) / Yin (deeper) per element
const C_STEM = [
  ['hsl(100, 40%, 62%)', 'hsl(100, 50%, 12%)'], // 甲 Yang Wood
  ['hsl(100, 34%, 52%)', 'hsl(100, 45%, 11%)'], // 乙 Yin  Wood
  ['hsl(  8, 58%, 66%)', 'hsl(  8, 65%, 12%)'], // 丙 Yang Fire
  ['hsl(  8, 52%, 56%)', 'hsl(  8, 60%, 11%)'], // 丁 Yin  Fire
  ['hsl( 38, 54%, 64%)', 'hsl( 38, 62%, 12%)'], // 戊 Yang Earth
  ['hsl( 38, 48%, 54%)', 'hsl( 38, 55%, 11%)'], // 己 Yin  Earth
  ['hsl( 48, 48%, 70%)', 'hsl( 48, 55%, 15%)'], // 庚 Yang Metal
  ['hsl( 48, 42%, 60%)', 'hsl( 48, 50%, 13%)'], // 辛 Yin  Metal
  ['hsl(208, 46%, 64%)', 'hsl(208, 55%, 13%)'], // 壬 Yang Water
  ['hsl(208, 40%, 54%)', 'hsl(208, 50%, 11%)'], // 癸 Yin  Water
];

const C_BRANCH = [
  ['hsl(208, 46%, 62%)', 'hsl(208, 55%, 12%)'], // 子 Rat    Yang Water
  ['hsl( 38, 48%, 56%)', 'hsl( 38, 55%, 12%)'], // 丑 Ox     Yin  Earth
  ['hsl(100, 40%, 62%)', 'hsl(100, 50%, 12%)'], // 寅 Tiger  Yang Wood
  ['hsl(100, 34%, 52%)', 'hsl(100, 45%, 11%)'], // 卯 Rabbit Yin  Wood
  ['hsl( 38, 54%, 62%)', 'hsl( 38, 62%, 12%)'], // 辰 Dragon Yang Earth
  ['hsl(  8, 52%, 58%)', 'hsl(  8, 60%, 12%)'], // 巳 Snake  Yin  Fire
  ['hsl(  8, 58%, 66%)', 'hsl(  8, 65%, 12%)'], // 午 Horse  Yang Fire
  ['hsl( 38, 48%, 56%)', 'hsl( 38, 55%, 12%)'], // 未 Goat   Yin  Earth
  ['hsl( 48, 48%, 68%)', 'hsl( 48, 55%, 15%)'], // 申 Monkey Yang Metal
  ['hsl( 48, 42%, 58%)', 'hsl( 48, 50%, 13%)'], // 酉 Rooster Yin Metal
  ['hsl( 38, 54%, 62%)', 'hsl( 38, 62%, 12%)'], // 戌 Dog    Yang Earth
  ['hsl(208, 40%, 56%)', 'hsl(208, 50%, 11%)'], // 亥 Pig    Yin  Water
];

// ── Shadow DOM template ───────────────────────────────────────────────────────

const TPL = document.createElement('template');
TPL.innerHTML = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400&display=swap');

  :host {
    display: block;
    font-family: 'Noto Serif SC','STSong','SimSun',Georgia,serif;
    color: #3e3218;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: clamp(1.7rem,4vw,2.7rem);
    font-weight: 300;
    letter-spacing: .65em;
    text-indent: .65em;
    color: #c9a038;
    margin: 0 0 7px;
  }

  .sub {
    font-size: clamp(.58rem,.85vw,.72rem);
    letter-spacing: .48em;
    text-indent: .48em;
    color: #6a5828;
    margin-bottom: 28px;
    text-transform: uppercase;
  }

  /* ── Picker ── */
  .picker {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .picker-label {
    font-size: .66rem;
    letter-spacing: .2em;
    color: #8a7035;
    padding: 0 2px;
  }

  /* Compound control: era toggle + input + year unit, no outer box */
  .picker-control {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .era-toggle {
    display: flex;
    gap: 3px;
  }

  .era-toggle button {
    height: auto;
    padding: 2px 6px;
    background: transparent;
    border: 1px solid #c9a038;
    cursor: pointer;
    font-family: inherit;
    font-size: .68rem;
    color: #8a7035;
    letter-spacing: .08em;
    border-radius: 2px;
    transition: background .15s, color .15s;
    line-height: 1.2;
  }

  .era-toggle button.active {
    background: #c9a038;
    color: #fff8ee;
    border-color: #c9a038;
  }

  /* Year input — underline only, signals editability */
  .picker-control input[type=number] {
    width: 52px;
    padding: 2px 2px 1px;
    border: none;
    border-bottom: 1px solid #c9a038;
    background: transparent;
    color: #3e3218;
    font-family: inherit;
    font-size: .82rem;
    text-align: center;
    outline: none;
    -moz-appearance: textfield;
    box-sizing: border-box;
  }
  .picker-control input[type=number]::-webkit-inner-spin-button,
  .picker-control input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }

  .picker-unit {
    font-size: .66rem;
    color: #8a7035;
    letter-spacing: .12em;
    padding: 0 1px;
  }

  .btn-today {
    padding: 2px 6px;
    border: 1px solid #c9a038;
    background: transparent;
    color: #8a7035;
    font-family: inherit;
    font-size: .68rem;
    cursor: pointer;
    border-radius: 2px;
    letter-spacing: .12em;
    line-height: 1.2;
    transition: background .15s;
  }
  .btn-today:hover { background: rgba(201,160,56,.12); }

  .year-info {
    font-size: .78rem;
    letter-spacing: .22em;
    color: #8a7035;
    text-align: center;
    min-height: 1.4em;
  }

  /* ── Wheel SVG ── */
  #wheel {
    width: 100%;
    max-width: 870px;
    height: auto;
    display: block;
  }

  /* ── Legend ── */
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 10px;
    justify-content: center;
    margin-top: 10px;
  }

  .li {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: .76rem;
    letter-spacing: .2em;
    color: #7a6835;
  }

  .dot {
    width: 13px;
    height: 13px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .rl {
    margin-top: 16px;
    font-size: .6rem;
    letter-spacing: .38em;
    text-indent: .38em;
    color: #5a4820;
    text-align: center;
    line-height: 2.6;
  }
</style>

<div class="wrapper">
  <svg id="wheel" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <title id="svgTitle"></title>
    <desc id="svgDesc"></desc>
  </svg>

  <div class="picker">
    <span class="picker-label" id="lblPicker"></span>
    <div class="picker-control">
      <div class="era-toggle">
        <button id="btnBC"></button>
        <button id="btnAD" class="active"></button>
      </div>
      <input type="number" id="yearInput" min="1" value="2026">
      <span class="picker-unit" id="lblYearUnit"></span>
    </div>
    <button class="btn-today" id="btnToday"></button>
  </div>

  <div class="legends" id="legends">
    <div class="legend" id="legend_yang"></div>
    <div class="legend" id="legend_yin"></div>
  </div>

  <div class="rl" id="lblFooter"></div>
</div>
`;

// ── Component class ───────────────────────────────────────────────────────────

class SexagenaryCycle extends HTMLElement {

  static get observedAttributes() { return ['year', 'date', 'lang']; }

  constructor() {
    super();
    this._root  = this.attachShadow({ mode: 'open' });
    this._root.appendChild(TPL.content.cloneNode(true));
    this._isBC  = false;
    this._ready = false;
  }

  // ── Locale ───────────────────────────────────────────────────────────────────

  /** Resolve the active locale, falling back through html[lang] then 'zh'. */
  get _locale() {
    const raw = this.getAttribute('lang')
             || document.documentElement.lang
             || 'zh';
    const tag = raw.toLowerCase().split('-')[0];
    return LOCALES[tag] || LOCALES['zh'];
  }

  /** Push all static locale strings into the Shadow DOM. */
  _applyLocale() {
    const L = this._locale;
    this._q('svgTitle').textContent    = L.svgTitle;
    this._q('svgDesc').textContent     = L.svgDesc;
    this._q('lblPicker').textContent   = L.pickerLabel;
    this._q('btnBC').textContent       = L.btnBC;
    this._q('btnAD').textContent       = L.btnAD;
    this._q('btnToday').textContent    = L.btnToday;
    this._q('lblYearUnit').textContent = L.yearUnit;
    this._q('lblFooter').textContent   = L.footer;
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────────

  connectedCallback() {
    this._applyLocale();
    this._buildLegend();
    this._attachListeners();
    this._ready = true;
    this._initFromAttributes();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this._ready || oldVal === newVal) return;
    if (name === 'lang') {
      this._applyLocale();
      this._buildLegend();
    }
    this._initFromAttributes();
  }

  // ── Attribute → astronomical year ─────────────────────────────────────────────

  get _attrYear() {
    if (this.hasAttribute('year')) {
      const y = parseInt(this.getAttribute('year'));
      return isNaN(y) ? new Date().getFullYear() : y;
    }
    if (this.hasAttribute('date')) {
      const d = new Date(this.getAttribute('date'));
      return isNaN(d) ? new Date().getFullYear() : d.getFullYear();
    }
    return new Date().getFullYear();
  }

  // ── BC / AD helpers ───────────────────────────────────────────────────────────

  // display year (positive int) + era flag → astronomical year integer
  _toAstro(displayYear, isBC) {
    // AD n  → astronomical n  (n ≥ 1)
    // BC 1  → astronomical 0
    // BC n  → astronomical 1−n
    return isBC ? 1 - displayYear : displayYear;
  }

  // astronomical year → { displayYear, isBC }
  _fromAstro(astro) {
    if (astro <= 0) return { displayYear: 1 - astro, isBC: true };
    return { displayYear: astro, isBC: false };
  }

  // ── Init ──────────────────────────────────────────────────────────────────────

  _initFromAttributes() {
    const astro = this._attrYear;
    const { displayYear, isBC } = this._fromAstro(astro);

    this._isBC = isBC;
    this._q('yearInput').value = displayYear;
    this._q('btnAD').classList.toggle('active', !isBC);
    this._q('btnBC').classList.toggle('active',  isBC);

    this._render(astro);
  }

  // ── Event wiring ──────────────────────────────────────────────────────────────

  _attachListeners() {
    const onPickerChange = () => {
      const raw = this._q('yearInput').value;
      if (raw === '') { this._render(null); return; }
      const parsed  = parseInt(raw);
      const display = Math.max(1, isNaN(parsed) ? 1 : Math.abs(parsed));
      this._q('yearInput').value = display;
      this._render(this._toAstro(display, this._isBC));
    };

    this._q('yearInput').addEventListener('change', onPickerChange);
    this._q('yearInput').addEventListener('input',  onPickerChange);

    this._q('btnAD').addEventListener('click', () => {
      this._isBC = false;
      this._q('btnAD').classList.add('active');
      this._q('btnBC').classList.remove('active');
      onPickerChange();
    });

    this._q('btnBC').addEventListener('click', () => {
      this._isBC = true;
      this._q('btnBC').classList.add('active');
      this._q('btnAD').classList.remove('active');
      onPickerChange();
    });

    this._q('btnToday').addEventListener('click', () => {
      const today = new Date().getFullYear();
      this._isBC = false;
      this._q('yearInput').value = today;
      this._q('btnAD').classList.add('active');
      this._q('btnBC').classList.remove('active');
      this._render(today);
    });
  }

  // ── Legend ────────────────────────────────────────────────────────────────────

  _buildLegend() {
    const L = this._locale;

    // Clear both containers before rebuilding (needed on locale change)
    this._q('legend_yang').innerHTML = '';
    this._q('legend_yin').innerHTML  = '';

    [L.yang, L.yin].forEach((polLabel, pi) => {
      const container = this._q(pi === 0 ? 'legend_yang' : 'legend_yin');

      L.elements.forEach((elemName, ei) => {
        const stemIdx = ei * 2 + pi;   // 0..9 — Yang stems are even indices
        const [fillColor] = C_STEM[stemIdx];

        const item = document.createElement('span');
        item.className = 'li';

        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.style.background = fillColor;

        const txt = document.createElement('span');
        txt.textContent = L.fmtLegend(polLabel, elemName);

        item.appendChild(dot);
        item.appendChild(txt);
        container.appendChild(item);
      });
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  _render(astroYear) {
    this._buildWheel(astroYear);
  }

  // ── SVG Wheel ─────────────────────────────────────────────────────────────────

  _buildWheel(astroYear) {
    const svg = this._q('wheel');
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Re-insert accessibility nodes cleared by the loop above
    const titleEl = document.createElementNS(NS, 'title');
    titleEl.id = 'svgTitle';
    const descEl  = document.createElementNS(NS, 'desc');
    descEl.id  = 'svgDesc';
    svg.appendChild(titleEl);
    svg.appendChild(descEl);
    this._applyLocale(); // refresh title/desc text

    const L = this._locale;

    const CX = 500, CY = 500, π = Math.PI;

    const hasYear    = (astroYear !== null && astroYear !== undefined);
    const layoutYear = hasYear ? astroYear : new Date().getFullYear();

    // Ring dimensions (px in 1000 × 1000 viewBox)
    const CENTER_R   = 240;
    const W_ANIMALS  =  36;
    const W_BRANCHES =  36;
    const W_STEMS    =  36;
    const W_ELEMENTS =  36;

    const RA = [CENTER_R + 2,  CENTER_R + 2 + W_ANIMALS ];
    const RB = [RA[1],         RA[1] + W_BRANCHES        ];
    const RS = [RB[1],         RB[1] + W_STEMS           ];
    const RE = [RS[1],         RS[1] + W_ELEMENTS        ];  // reserved for future use

    const cycleOffset = ((layoutYear - 1984) % 60 + 60) % 60;
    const cycleStart  = layoutYear - cycleOffset;
    const currentIdx  = hasYear ? cycleOffset : -1;

    // ── Local helpers ──────────────────────────────────────────────────────────

    const mk = (tag, attrs = {}, txt) => {
      const el = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      if (txt !== undefined) el.textContent = txt;
      return el;
    };

    const circ = (r, f, s, sw) => mk('circle', {
      cx: CX, cy: CY, r,
      fill: f || 'none', stroke: s || 'none', 'stroke-width': sw || 1
    });

    const midR = ([r1, r2]) => (r1 + r2) / 2;

    const sector = (r1, r2, a1d, a2d) => {
      const a1 = a1d * π / 180, a2 = a2d * π / 180;
      const laf = (a2d - a1d) > 180 ? 1 : 0;
      const p = (r, a) => `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`;
      return `M${p(r1,a1)}A${r1},${r1} 0 ${laf} 1 ${p(r1,a2)}`
           + `L${p(r2,a2)}A${r2},${r2} 0 ${laf} 0 ${p(r2,a1)}Z`;
    };

    const fontSize = ring => {
      const w   = ring[1] - ring[0];
      const arc = 2 * π * midR(ring) * 6 / 360;
      return Math.floor(Math.min(w * 0.6, arc * 0.7, 30));
    };

    /**
     * Place a text glyph (character or emoji) in a ring segment.
     * @param {[number,number]} ring        [innerR, outerR]
     * @param {number}          angleDeg    Centre angle of the segment
     * @param {string}          ch          Character / emoji to display
     * @param {string}          fill        Text colour
     * @param {string|null}     fontOverride Optional CSS font-family override
     */
    const placeText = (ring, angleDeg, ch, fill, fontOverride = null) => {
      const r = midR(ring), fs = fontSize(ring);
      const rad = angleDeg * π / 180;
      const tx = CX + r * Math.cos(rad), ty = CY + r * Math.sin(rad);
      return mk('text', {
        x: tx, y: ty,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': fs, 'font-family': fontOverride || FONT,
        fill, transform: `rotate(${angleDeg + 90},${tx},${ty})`
      }, ch);
    };

    // Outer diamond marker + tangent-aligned text labels.
    // labelAngleDeg (optional): text floats to this angle, diamond stays at
    // angleDeg, and a dashed leader line connects them.
    const outerMarker = (angleDeg, label1, label2, diamondFill, textFill, labelAngleDeg) => {
      const rad = angleDeg * π / 180;
      const c = Math.cos(rad), s = Math.sin(rad);
      const pc = -s, ps = c;

      const dMidR  = RS[1] + 17;
      const innerR = dMidR - 4.5;
      const outerR = dMidR + 9;
      const hw     = 5.5;

      svg.appendChild(mk('polygon', {
        points: [
          `${CX + outerR * c},${CY + outerR * s}`,
          `${CX + dMidR * c + hw * pc},${CY + dMidR * s + hw * ps}`,
          `${CX + innerR * c},${CY + innerR * s}`,
          `${CX + dMidR * c - hw * pc},${CY + dMidR * s - hw * ps}`,
        ].join(' '),
        fill: diamondFill, opacity: '0.9'
      }));

      const lAngleDeg = (labelAngleDeg !== undefined) ? labelAngleDeg : angleDeg;
      const lrad = lAngleDeg * π / 180;
      const lc = Math.cos(lrad), ls = Math.sin(lrad);
      const textRot = lAngleDeg + 90;
      const rBase  = RS[1] + 58;
      const radOff = 18;

      const x1 = CX + (rBase + radOff) * lc, y1 = CY + (rBase + radOff) * ls;
      const x2 = CX + (rBase - radOff) * lc, y2 = CY + (rBase - radOff) * ls;

      svg.appendChild(mk('text', {
        x: x1, y: y1,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 22, 'font-family': FONT, fill: textFill,
        transform: `rotate(${textRot},${x1},${y1})`
      }, label1));

      if (label2) {
        svg.appendChild(mk('text', {
          x: x2, y: y2,
          'text-anchor': 'middle', 'dominant-baseline': 'central',
          'font-size': 17, 'font-family': FONT, fill: textFill,
          transform: `rotate(${textRot},${x2},${y2})`
        }, label2));
      }
    };

    // ── Background ─────────────────────────────────────────────────────────────
    svg.appendChild(circ(RS[1], '#faf8f2'));

    // ── 60 segments ─────────────────────────────────────────────────────────────
    for (let i = 0; i < 60; i++) {
      const si = i % 10, bi = i % 12;
      const a1 = -93 + i * 6, a2 = a1 + 6, ac = a1 + 3;
      const segYear = cycleStart + i;

      const g = mk('g');
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => this._selectSegment(segYear));

      const isHighlight = (i === currentIdx);

      const darkenHsl = (hslStr, amount = 14) =>
        hslStr.replace(
          /hsl\((\s*[\d.]+\s*),(\s*[\d.]+%\s*),(\s*[\d.]+)%\s*\)/,
          (_, h, s, l) => `hsl(${h},${s},${Math.max(0, parseFloat(l) - amount)}%)`
        );

      // Rings: [geometry, content, colors, optional font override]
      const rings = [
        [RA, L.animals[bi],  C_BRANCH[bi], L.animalFont],
        [RB, L.branches[bi],   C_BRANCH[bi], null        ],
        [RS, L.stems[si],      C_STEM[si],   null        ],
      ];

      for (const [ring, ch, [fill, textColor], fontOverride] of rings) {
        const actualFill = isHighlight ? darkenHsl(fill) : fill;
        g.appendChild(mk('path', {
          d: sector(ring[0], ring[1], a1, a2),
          fill: actualFill, stroke: '#d8cdb0', 'stroke-width': 0.5
        }));
        g.appendChild(placeText(ring, ac, ch, textColor, fontOverride));
      }

      svg.appendChild(g);
    }

    // ── Ring separator circles ─────────────────────────────────────────────────
    for (const r of [RA[0], RA[1], RB[1], RS[1]])
      svg.appendChild(circ(r, 'none', '#c8b890', 0.9));

    // ── Major dividers every 12 (branch-cycle boundary) ───────────────────────
    for (let i = 0; i < 60; i += 12) {
      const a = (-93 + i * 6) * π / 180;
      svg.appendChild(mk('line', {
        x1: CX + RA[0] * Math.cos(a), y1: CY + RA[0] * Math.sin(a),
        x2: CX + RS[1] * Math.cos(a), y2: CY + RS[1] * Math.sin(a),
        stroke: '#b8a478', 'stroke-width': 1.6
      }));
    }

    // ── Minor dividers every 10 (stem-cycle boundary) ─────────────────────────
    for (let i = 0; i < 60; i += 10) {
      const a = (-93 + i * 6) * π / 180;
      svg.appendChild(mk('line', {
        x1: CX + RA[0] * Math.cos(a), y1: CY + RA[0] * Math.sin(a),
        x2: CX + RS[1] * Math.cos(a), y2: CY + RS[1] * Math.sin(a),
        stroke: '#ccc0a0', 'stroke-width': 0.9
      }));
    }

    // ── Element-pair dividers every 2 ─────────────────────────────────────────
    for (let i = 0; i < 60; i += 2) {
      if (i % 10 === 0 || i % 12 === 0) continue;
      const a = (-93 + i * 6) * π / 180;
      svg.appendChild(mk('line', {
        x1: CX + RS[0] * Math.cos(a), y1: CY + RS[0] * Math.sin(a),
        x2: CX + RS[1] * Math.cos(a), y2: CY + RS[1] * Math.sin(a),
        stroke: '#d8cdb0', 'stroke-width': 0.6
      }));
    }

    // ── Centre text ─────────────────────────────────────────────────────────────
    if (hasYear) {
      // Title — pushed up to make room for info below
      svg.appendChild(mk('text', {
        x: CX, y: CY - 90,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 44, 'font-family': FONT,
        fill: '#c49830', 'letter-spacing': '6'
      }, L.centerTitle));
      svg.appendChild(mk('text', {
        x: CX, y: CY - 48,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 20, 'font-family': FONT,
        fill: '#8a7040', 'letter-spacing': '3'
      }, L.centerSubtitle));

      // Thin divider
      svg.appendChild(mk('line', {
        x1: CX - 60, y1: CY - 18, x2: CX + 60, y2: CY - 18,
        stroke: '#c8b890', 'stroke-width': 0.8
      }));

      // Ganzhi pair — the "name" of the selected year; always Chinese symbols
      const si = currentIdx % 10, bi = currentIdx % 12, ei = Math.floor(si / 2);
      const ganzhi   = L.stems[si] + L.branches[bi];
      const polarity = si % 2 === 0 ? L.yang : L.yin;
      const info     = L.fmtInfo(polarity, L.elements[ei], L.animals[bi]);

      svg.appendChild(mk('text', {
        x: CX, y: CY + 30,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 48, 'font-family': FONT,
        fill: '#c49830', 'letter-spacing': '8'
      }, ganzhi));
      svg.appendChild(mk('text', {
        x: CX, y: CY + 95,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 24, 'font-family': FONT,
        fill: '#8a7040', 'letter-spacing': '4'
      }, info));
    } else {
      // No year selected — original centred layout
      svg.appendChild(mk('text', {
        x: CX, y: CY - 22,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 48, 'font-family': FONT,
        fill: '#c49830', 'letter-spacing': '6'
      }, L.centerTitle));
      svg.appendChild(mk('text', {
        x: CX, y: CY + 18,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 24, 'font-family': FONT,
        fill: '#8a7040', 'letter-spacing': '3'
      }, L.centerSubtitle));
    }

    // ── 甲子 marker (12 o'clock, cycle start) — label always in Chinese ────────
    outerMarker(-90, '甲子', L.fmtYear(cycleStart), '#c49830', '#7a5a20');

    // ── Current-year marker (vermilion, only when year set and not 甲子) ────────
    if (hasYear && currentIdx !== 0) {
      const curAngle = -90 + currentIdx * 6;

      let angDist = currentIdx * 6;
      if (angDist > 180) angDist -= 360;

      let labelAngle;
      if (Math.abs(angDist) < LABEL_NUDGE_THRESHOLD) {
        const sign = angDist >= 0 ? 1 : -1;
        labelAngle = -90 + sign * LABEL_NUDGE_THRESHOLD;
      }

      const si = currentIdx % 10, bi = currentIdx % 12;
      outerMarker(
        curAngle,
        L.stems[si] + L.branches[bi],
        L.fmtYear(astroYear),
        '#cc3010',
        '#8a2008',
        labelAngle
      );
    }
  }

  // ── Segment click → update year ───────────────────────────────────────────────

  _selectSegment(segYear) {
    const { displayYear, isBC } = this._fromAstro(segYear);
    this._isBC = isBC;
    this._q('yearInput').value = displayYear;
    this._q('btnAD').classList.toggle('active', !isBC);
    this._q('btnBC').classList.toggle('active',  isBC);
    this._render(segYear);
  }

  // ── Utility ───────────────────────────────────────────────────────────────────

  _q(id) { return this._root.getElementById(id); }
}

customElements.define('sexagenary-cycle', SexagenaryCycle);
