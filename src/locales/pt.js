// pt.js
/**
 * Portuguese locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const pt = {
  label: 'Português',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: 'Ano',
  btnBC:       'a.C.',
  btnAD:       'd.C.',
  btnToday:    'Hoje',
  yearUnit:    '',

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (Yang)',
  yin:      '阴 (Yin)',
  elements: ['木 (Madeira)', '火 (Fogo)', '土 (Terra)', '金 (Metal)', '水 (Água)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: 'Ciclo sexagenário de Hastes e Ramos',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: 'Ciclo sexagenário',
  svgDesc:  'Diagrama circular do ciclo sexagenário de 60 anos das Hastes Celestiais e Ramos Terrestres',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: 'Cinco Elementos — Hastes Celestiais — Ramos Terrestres — Animais do Zodíaco',

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

export default pt;
