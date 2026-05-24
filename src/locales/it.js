// it.js
/**
 * Italian locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const it = {
  label: 'Italiano',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: 'Anno',
  btnBC:       'a.C.',
  btnAD:       'd.C.',
  btnToday:    'Oggi',
  yearUnit:    '',

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (Yang)',
  yin:      '阴 (Yin)',
  elements: ['木 (Legno)', '火 (Fuoco)', '土 (Terra)', '金 (Metallo)', '水 (Acqua)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: 'Ciclo sessagesimale di Tronchi e Rami',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: 'Ciclo sessagesimale',
  svgDesc:  'Diagramma circolare del ciclo sessagesimale di 60 anni dei Tronchi Celesti e Rami Terrestri',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: 'Cinque Elementi — Tronchi Celesti — Rami Terrestri — Animali dello Zodiaco',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /** @param {number} astro */
  fmtYear: (astro) => astro <= 0 ? `${1 - astro} a.C.` : `${astro} d.C.`,

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

export default it;
