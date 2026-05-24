// ko.js
/**
 * Korean locale for <sexagenary-cycle>.
 *
 * Animals are rendered as emoji — universal pictograms that require no
 * translation and scale gracefully across scripts.
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const ko = {
  label: '한국어',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: '년도',
  btnBC:       '기원전',
  btnAD:       '기원후',
  btnToday:    '오늘',
  yearUnit:    '년',

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳 (양)',
  yin:      '阴 (음)',
  elements: ['木 (목)', '火 (화)', '土 (토)', '金 (금)', '水 (수)'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  animals: ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: '육십갑자(六十甲子) 천간지지 순환',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: '육십갑자 순환도',
  svgDesc:  '천간(天干)과 지지(地支)의 60년 순환을 나타낸 원형 도표',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: '오행(五行) — 천간(天干) — 지지(地支) — 띠 동물',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /** @param {number} astro */
  fmtYear: (astro) => astro <= 0 ? `기원전 ${1 - astro}` : `기원후 ${astro}`,

  /**
   * @param {string} pol
   * @param {string} elem
   * @param {string} animal
   */
  fmtInfo: (pol, elem, animal) => `${pol}${elem} · ${animal}`,

  /**
   * @param {string} pol
   * @param {string} elem
   */
  fmtLegend: (pol, elem) => `${pol}${elem}`,
};

export default ko;
