# &lt;sexagenary-cycle&gt;

A zero-dependency web component that renders the 60-year sexagenary cycle
(六十甲子) of Heavenly Stems (天干) and Earthly Branches (地支) as an
interactive SVG wheel, with built-in multi-language support.

## Installation

```bash
npm install sexagenary-cycle
```

Or use directly from a CDN (once published):

```html
<script type="module"
  src="https://cdn.jsdelivr.net/npm/sexagenary-cycle/src/sexagenary-cycle.js">
</script>
```

## Usage

```html
<!-- Defaults to today's year; language auto-detected from <html lang="…"> -->
<sexagenary-cycle></sexagenary-cycle>

<!-- Explicit year and language -->
<sexagenary-cycle year="1984" lang="en"></sexagenary-cycle>

<!-- ISO date string — only the year part is used -->
<sexagenary-cycle date="2026-05-23" lang="zh"></sexagenary-cycle>

<!-- BC year: astronomical year 0 = 1 BC, negative = earlier BC -->
<sexagenary-cycle year="-3" lang="en"></sexagenary-cycle>
```

## Attributes

| Attribute | Type   | Default                   | Description |
|-----------|--------|---------------------------|-------------|
| `year`    | int    | current year              | Astronomical year (AD positive, 0 = 1 BC, negative = earlier BC) |
| `date`    | string | —                         | ISO date string; year part used (AD only) |
| `lang`    | string | `<html lang>` → `"zh"`   | BCP 47 primary language subtag |

All attributes are reactive — changing them via JavaScript updates the wheel immediately.

## Built-in languages

| Tag  | Language           | Animals         | Title display |
|------|--------------------|-----------------|---------------|
| `zh` | Simplified Chinese | 鼠牛虎兔龙蛇…  | Centre text   |
| `en` | English            | 🐭🐂🐯🐰🐲🐍… | Arc ring      |

## Design notes

### Stems and branches are never translated in the rings

甲乙丙丁… (Heavenly Stems) and 子丑寅卯… (Earthly Branches) are cultural
symbols that appear in the rings unchanged in every locale. When a locale
provides `stems` / `branches` arrays, those names appear only *alongside*
the original symbols — at markers, in the centre, and in tooltip / aria text.

### Animals

Chinese locales use the traditional characters (生肖). All other locales
use emoji (🐭🐂🐯…), which are universally understood and require no
word-level translation.

### Title display modes

`displayMode: 'center'` (default, used by `zh`) renders the title as large
text inside the centre circle above the selected year's ganzhi pair.

`displayMode: 'ring'` (used by `en`) renders the title as individual
characters on a circular arc just inside the animal ring, symmetric about
the vertical 子午线 (12 o'clock axis). The arc spans only as wide as the
text needs at `titleFontSize`; font is reduced dynamically if the text
exceeds `ARC_MAX_DEG` (270°), and hard-clipped symmetrically at
`minFontSize` in the extreme case. The centre then shows only the
selected year's ganzhi pair and info line.

## Adding a locale

1. Copy `src/locales/en.js` to `src/locales/XX.js`.
2. Fill in all fields (see the shape reference below).
3. Register before or after the element connects:

```js
import { registerLocale } from 'sexagenary-cycle';
import jaLocale from './locales/ja.js';
registerLocale('ja', jaLocale);
```

```html
<sexagenary-cycle lang="ja" year="2026"></sexagenary-cycle>
```

## Locale shape reference

```js
{
  // ── Year picker ───────────────────────────────────────────────────────────
  pickerLabel: 'Year',
  btnBC:       'BCE',
  btnAD:       'CE',
  btnToday:    'Today',
  yearUnit:    '',         // suffix after the number, e.g. '年' in Chinese

  // ── Legend ────────────────────────────────────────────────────────────────
  yang:     'Yang',
  yin:      'Yin',
  elements: ['Wood', 'Fire', 'Earth', 'Metal', 'Water'],   // length 5

  // ── Animal ring ───────────────────────────────────────────────────────────
  // Length-12 array parallel to the 12 Earthly Branches.
  // Chinese locales use characters; all others should use emoji.
  animals:    ['🐭','🐂','🐯','🐰','🐲','🐍','🐴','🐑','🐒','🐓','🐕','🐷'],
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── Stem / branch translations ────────────────────────────────────────────
  // null → show original Chinese symbols only (at markers, centre, aria).
  // Provide arrays to add a romanisation or name alongside the symbols.
  stems:    ['Jiǎ','Yǐ','Bǐng','Dīng','Wù','Jǐ','Gēng','Xīn','Rén','Guǐ'],
  branches: ['Zǐ','Chǒu','Yín','Mǎo','Chén','Sì','Wǔ','Wèi','Shēn','Yǒu','Xū','Hài'],

  // Called at markers and centre when stems/branches are provided.
  // Also used as the full aria-label / tooltip ganzhi string.
  fmtGanzhi: (origStem, origBranch, nameStem, nameBranch) =>
    `${origStem}${origBranch} (${nameStem} ${nameBranch})`,

  // ── Title ─────────────────────────────────────────────────────────────────
  centerTitle:   'Sexagenary Cycle',
  displayMode:   'ring',    // 'center' | 'ring'
  titleFontSize: 20,        // default / maximum font size for the title
  minFontSize:   12,        // floor for dynamic arc shrinking (ring mode only)

  // ── Accessibility ──────────────────────────────────────────────────────────
  svgTitle: 'Sexagenary Cycle',
  svgDesc:  'Wheel diagram of the 60-year cycle of Heavenly Stems and Earthly Branches',

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: 'Five Elements \u2014 Heavenly Stems \u2014 Earthly Branches \u2014 Zodiac Animals',

  // ── Formatters ────────────────────────────────────────────────────────────

  /** Astronomical year → display string for markers. */
  fmtYear: (astro) => astro <= 0 ? `${1 - astro} BCE` : `${astro} CE`,

  /** Centre info line: polarity + element + animal. */
  fmtInfo: (pol, elem, animal) => `${pol} ${elem}  ·  ${animal}`,

  /** Legend entry label. */
  fmtLegend: (pol, elem) => `${pol} ${elem}`,
}
```

## Arc title ring tuning

The `ARC_MAX_DEG` constant (default 270) and `ARC_CHAR_WIDTH_RATIO` (default 0.58)
are exported for advanced use; they can be adjusted at module level if needed
for scripts with atypical character widths. Per-locale tuning is done through
`titleFontSize` and `minFontSize`.

## Keyboard & accessibility

Each of the 60 segments is focusable (`tabindex="0"`, `role="button"`) and
activatable with Enter or Space. Every segment carries a `<title>` tooltip
and an `aria-label` that includes the full ganzhi label (with romanisation
when available), the formatted year, and the polarity/element/animal line.

## Project structure

```
sexagenary-cycle/
├── src/
│   ├── locales/
│   │   ├── zh.js          Simplified Chinese (built-in)
│   │   └── en.js          English with Pinyin (built-in)
│   └── sexagenary-cycle.js  Component + registerLocale export
├── demo/
│   └── index.html         Interactive demo with language switcher
├── package.json
└── README.md
```

## Browser support

Any browser supporting Custom Elements v1 and ES modules. No build step or
polyfill required.
