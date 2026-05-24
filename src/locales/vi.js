// vi.js
/**
 * Vietnamese locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const vi = {
  label: 'Tiếng Việt',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: 'Năm',
  btnBC:       'TCN',
  btnAD:       'SCN',
  btnToday:    'Hôm nay',
  yearUnit:    '',

  // Stem Branches
  stems: ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], 
  branches: ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'], 

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (Dương)',
  yin:      '阴 (Âm)',
  elements: ['木 (Mộc)', '火 (Hỏa)', '土 (Thổ)', '金 (Kim)', '水 (Thủy)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: 'Chu kỳ 60 năm Can Chi',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: 'Sơ đồ chu kỳ Lục thập Giáp Tý',
  svgDesc:  'Biểu đồ vòng tròn chu kỳ 60 năm của Thập Can và Thập Nhị Chi',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: 'Ngũ Hành — Thiên Can — Địa Chi — Mười hai con giáp',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /** @param {number} astro */
  fmtYear: (astro) => astro <= 0 ? `${1 - astro} TCN` : `${astro} SCN`,

  /**
   * @param {string} pol
   * @param {string} elem
   * @param {string} animal
   */
  fmtInfo: (pol, elem, animal) => `${pol} ${elem} · ${animal}`,

  /**
   * @param {string} pol
   * @param {string} elem
   */
  fmtLegend: (pol, elem) => `${pol} ${elem}`,
};

export default vi;
