/**
 * Simplified-Chinese locale for <sexagenary-cycle>.
 *
 * Animals are rendered as Chinese characters (生肖).
 * Heavenly Stems (天干) and Earthly Branches (地支) are universal symbols
 * and are NOT part of any locale — they never change.
 *
 * @satisfies {import('../sexagenary-cycle.js').LocaleDef}
 */
const zh = {
  label: '简体汉字',

  // ── Year picker ──────────────────────────────────────────────────────────────
  pickerLabel: '西元',
  btnBC:       '前',
  btnAD:       '后',
  btnToday:    '今日',
  yearUnit:    '年',

  // Stem Branches
  stems: ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], 
  branches: ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'], 

  // ── Legend ───────────────────────────────────────────────────────────────────
  yang:     '阳',
  yin:      '阴',
  elements: ['木', '火', '土', '金', '水'],

  // ── Animal ring ──────────────────────────────────────────────────────────────
  /** Chinese characters for the outermost ring. */
  animals:    ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
  /** null → inherits the component's default CJK serif font stack. */
  animalFont: null,

  // ── SVG centre ───────────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',
  centerSubtitle: '干支纪年循环',

  // ── Accessibility ─────────────────────────────────────────────────────────────
  svgTitle: '六十甲子干支纪年循环图',
  svgDesc:  '六十甲子干支纪年循环图',

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
   * @param {string} animal Animal string (character or emoji)
   */
  fmtInfo: (pol, elem, animal) => `${pol}${elem}  ·  ${animal}`,

  /**
   * Format a single legend entry label.
   * @param {string} pol  Polarity label
   * @param {string} elem Element name
   */
  fmtLegend: (pol, elem) => `${pol}${elem}`,
};

export default zh;
