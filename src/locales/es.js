// es.js
/**
 * Spanish locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const es = {
  label: 'Español',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: 'Año',
  btnBC:       'a.C.',
  btnAD:       'd.C.',
  btnToday:    'Hoy',
  yearUnit:    '',

  // Stem Branches
  stems: ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], 
  branches: ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'], 

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (Yang)',
  yin:      '阴 (Yin)',
  elements: ['木 (Madera)', '火 (Fuego)', '土 (Tierra)', '金 (Metal)', '水 (Agua)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    'Calendario chino',
  centerSubtitle: 'Ciclo sexagenario de Troncos y Ramas',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: 'Ciclo sexagenario',
  svgDesc:  'Diagrama circular del ciclo sexagenario de 60 años de los Troncos Celestiales y Ramas Terrestres',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: 'Cinco Elementos — Troncos Celestiales — Ramas Terrestres — Animales del Zodiaco',

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

export default es;
