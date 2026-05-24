// ja.js
/**
 * Japanese locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const ja = {
  label: '日本語',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: '年',
  btnBC:       '紀元前',
  btnAD:       '紀元後',
  btnToday:    '今日',
  yearUnit:    '年',

  // Stem Branches
  stems: ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], 
  branches: ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'], 

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '陽',
  yin:      '陰',
  elements: ['木', '火', '土', '金', '水'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: '干支六十周期',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: '六十甲子（干支）周期図',
  svgDesc:  '十干十二支による60年周期の循環図',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: '五行 — 十干 — 十二支 — 十二生肖',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /** @param {number} astro */
  fmtYear: (astro) => astro <= 0 ? `紀元前 ${1 - astro}` : `紀元後 ${astro}`,

  /**
   * @param {string} pol
   * @param {string} elem
   * @param {string} animal
   */
  fmtInfo: (pol, elem, animal) => `${pol}${elem} ・ ${animal}`,

  /**
   * @param {string} pol
   * @param {string} elem
   */
  fmtLegend: (pol, elem) => `${pol}${elem}`,
};

export default ja;
