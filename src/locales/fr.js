// fr.js
/**
 * French locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const fr = {
  label: 'Français',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: 'Année',
  btnBC:       'av. J.-C.',
  btnAD:       'ap. J.-C.',
  btnToday:    'Aujourd\'hui',
  yearUnit:    '',

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (Yang)',
  yin:      '阴 (Yin)',
  elements: ['木 (Bois)', '火 (Feu)', '土 (Terre)', '金 (Métal)', '水 (Eau)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: 'Cycle sexagésimal Tiges-Branches',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: 'Cycle sexagésimal',
  svgDesc:  'Diagramme circulaire du cycle sexagésimal des Tiges célestes et Branches terrestres',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: 'Cinq Éléments — Tiges Célestes — Branches Terrestres — Animaux du Zodiaque',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /** @param {number} astro */
  fmtYear: (astro) => astro <= 0 ? `${1 - astro} av. J.-C.` : `${astro} ap. J.-C.`,

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

export default fr;
