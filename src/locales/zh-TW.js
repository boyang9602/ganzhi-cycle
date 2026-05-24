// zh-TW.js (或 tw.js)
/**
 * Traditional-Chinese locale for <sexagenary-cycle>.
 *
 * Animals are rendered as traditional Chinese characters (生肖).
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const zhTW = {
  label: '繁體汉字',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: '西元',
  btnBC:       '前',
  btnAD:       '後',
  btnToday:    '今日',
  yearUnit:    '年',

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '陽',
  yin:      '陰',
  elements: ['木', '火', '土', '金', '水'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  /** Traditional Chinese characters for the outermost ring. */
  animals:    ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'],
  /** null → inherits the component's default CJK serif font stack. */
  animalFont: null,

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: '干支紀年循環',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: '六十甲子干支紀年循環圖',
  svgDesc:  '六十甲子干支紀年循環圖',

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: '五行 \u2014 天干 \u2014 地支 \u2014 生肖',

  // ── Formatters ───────────────────────────────────────────────────────────────

  /**
   * Format an astronomical year integer for display in markers.
   * @param {number} astro  0 = 1 BC, negative = earlier BC
   */
  fmtYear: (astro) => astro <= 0 ? `西元前 ${1 - astro}` : `西元 ${astro}`,

  /**
   * Format the centre info line shown below the ganzhi pair.
   * @param {string} pol    Polarity label (yang/yin string from this locale)
   * @param {string} elem   Element name from this locale's `elements` array
   * @param {string} animal Animal string (traditional Chinese character)
   */
  fmtInfo: (pol, elem, animal) => `${pol}${elem}  ·  ${animal}`,

  /**
   * Format a single legend entry label.
   * @param {string} pol  Polarity label
   * @param {string} elem Element name
   */
  fmtLegend: (pol, elem) => `${pol}${elem}`,
};

export default zhTW;
