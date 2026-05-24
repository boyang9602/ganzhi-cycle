// de.js
/**
 * German locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const de = {
  label: 'Deutsch',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: 'Jahr',
  btnBC:       'v. Chr.',
  btnAD:       'n. Chr.',
  btnToday:    'Heute',
  yearUnit:    '',

  // Stem Branches
  stems: ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], 
  branches: ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'], 

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (Yang)',
  yin:      '阴 (Yin)',
  elements: ['木 (Holz)', '火 (Feuer)', '土 (Erde)', '金 (Metall)', '水 (Wasser)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    'Chinesischer Kalender',
  centerSubtitle: 'Sexagesimalzyklus der Himmelsstämme und Erdzweige',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: 'Sexagesimalzyklus',
  svgDesc:  'Radialdiagramm des 60‑jährigen Sexagesimalzyklus der Himmelsstämme und Erdzweige',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: 'Fünf Elemente — Himmelsstämme — Erdzweige — Tierkreiszeichen',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /** @param {number} astro */
  fmtYear: (astro) => astro <= 0 ? `${1 - astro} v. Chr.` : `${astro} n. Chr.`,

  /**
   * @param {string} pol
   * @param {string} elem
   * @param {string} animal
   */
  fmtInfo: (pol, elem, animal) => `${pol} ${elem}  ·  ${animal}`,

  /**
   * @param {string} pol
   * @param {string} elem
   */
  fmtLegend: (pol, elem) => `${pol} ${elem}`,
};

export default de;
