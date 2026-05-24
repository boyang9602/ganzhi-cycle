/**
 * English locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const en = {
  label: 'English',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: 'Year',
  btnBC:       'BC',
  btnAD:       'AD',
  btnToday:    'Today',
  yearUnit:    '',        // year number is self-explanatory in English

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (Yang)',
  yin:      '阴 (Yin)',
  elements: ['木 (Wood)', '火 (Fire)', '土 (Earth)', '金 (Metal)', '水 (Water)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  /** Emoji for the outermost ring. */
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  /** Emoji-friendly font stack; applied only to the animal ring. */
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  /** The proper name of the cycle — kept in Chinese as it is a cultural term. */
  centerTitle:    '六十甲子',
  centerSubtitle: 'Stems-Branches 60-Year Cycle',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: 'Sexagenary Cycle',
  svgDesc:  'Wheel diagram of the 60-year sexagenary cycle of Heavenly Stems and Earthly Branches',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: 'Five Elements \u2014 Heavenly Stems \u2014 Earthly Branches \u2014 Zodiac Animals',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /** @param {number} astro */
  fmtYear: (astro) => astro <= 0 ? `${1 - astro} BC` : `${astro} AD`,

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

export default en;
