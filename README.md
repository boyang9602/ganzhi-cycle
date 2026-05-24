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
<script type="module" src="https://cdn.jsdelivr.net/npm/sexagenary-cycle/src/sexagenary-cycle.js"></script>
```

## Usage

```html
<!-- Defaults to today's year, language auto-detected from <html lang="…"> -->
<sexagenary-cycle></sexagenary-cycle>

<!-- Explicit year and language -->
<sexagenary-cycle year="1984" lang="en"></sexagenary-cycle>

<!-- ISO date string — only the year part is used -->
<sexagenary-cycle date="2026-05-23" lang="zh"></sexagenary-cycle>

<!-- BC year: astronomical year 0 = 1 BC, negative = earlier BC -->
<sexagenary-cycle year="-3" lang="en"></sexagenary-cycle>
```

## Attributes

| Attribute | Type   | Default                    | Description |
|-----------|--------|----------------------------|-------------|
| `year`    | int    | current year               | Astronomical year (AD = positive, 0 = 1 BC, negative = earlier BC) |
| `date`    | string | —                          | ISO date string; the year part is used (AD only) |
| `lang`    | string | `<html lang>` → `"zh"`    | BCP 47 primary language subtag, e.g. `"zh"`, `"en"` |

`year` takes precedence over `date`. Both attributes are reactive — changing
them via JavaScript updates the wheel immediately.

## Built-in languages

| Tag  | Language           | Animals       |
|------|--------------------|---------------|
| `zh` | Simplified Chinese | 鼠牛虎兔…    |
| `en` | English            | 🐭🐂🐯🐰… |

> **Design note — Stems and Branches are never translated.**
> 甲乙丙丁… (Heavenly Stems) and 子丑寅卯… (Earthly Branches) are cultural
> symbols, not words. They appear in Chinese regardless of the active locale.
> Animals default to emoji for non-Chinese locales so no word-level translation
> is needed.

## Adding a locale

1. Copy `src/locales/en.js` to `src/locales/XX.js` (replace `XX` with your
   BCP 47 subtag, e.g. `ja`, `ko`, `fr`).
2. Fill in all the fields (see the shape reference below).
3. Register the locale **before** the element connects to the DOM:

```js
import { registerLocale } from 'sexagenary-cycle';
import jaLocale from './locales/ja.js';

registerLocale('ja', jaLocale);
```

```html
<sexagenary-cycle lang="ja" year="2026"></sexagenary-cycle>
```

`registerLocale` may also be called at any time after connection; all
components using that language tag will re-render on the next attribute change.

### Locale shape reference

```js
{
  // ── Year picker ──────────────────────────────────────────────────────────
  pickerLabel: 'Year',    // label to the left of the input
  btnBC:       'BC',      // "before common era" button
  btnAD:       'AD',      // "common era" button
  btnToday:    'Today',   // button to jump to the current year
  yearUnit:    '',        // suffix after the year number (e.g. '年' in Chinese)

  // ── Legend ───────────────────────────────────────────────────────────────
  yang:     'Yang',
  yin:      'Yin',
  elements: ['Wood', 'Fire', 'Earth', 'Metal', 'Water'],  // length 5

  // ── Animal ring ──────────────────────────────────────────────────────────
  // Length-12 array parallel to the 12 Earthly Branches.
  // Use emoji for non-Chinese locales; Chinese characters for Chinese ones.
  animals:    ['🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐒', '🐓', '🐕', '🐷'],
  // CSS font-family for the animal ring. null = inherit the default CJK stack.
  animalFont: "'Noto Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif",

  // ── SVG centre ───────────────────────────────────────────────────────────
  centerTitle:    '六十甲子',                    // the cycle's proper name — kept Chinese
  centerSubtitle: 'Stems-Branches 60-Year Cycle',

  // ── Accessibility ─────────────────────────────────────────────────────────
  svgTitle: 'Sexagenary Cycle',
  svgDesc:  'Wheel diagram of the 60-year cycle of Heavenly Stems and Earthly Branches',

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: 'Five Elements \u2014 Heavenly Stems \u2014 Earthly Branches \u2014 Zodiac Animals',

  // ── Formatters ───────────────────────────────────────────────────────────
  /** Format an astronomical year for display in the outer markers. */
  fmtYear: (astro) => astro <= 0 ? `${1 - astro} BC` : `${astro} AD`,

  /** Format the centre info line (polarity + element + animal). */
  fmtInfo: (pol, elem, animal) => `${pol} ${elem}  ·  ${animal}`,

  /** Format a single legend entry label. */
  fmtLegend: (pol, elem) => `${pol} ${elem}`,
}
```

## Project structure

```
sexagenary-cycle/
├── src/
│   ├── locales/
│   │   ├── zh.js          Simplified Chinese (built-in)
│   │   └── en.js          English (built-in)
│   └── sexagenary-cycle.js  The component + registerLocale export
├── demo/
│   └── index.html         Interactive demo with language switcher
├── package.json
└── README.md
```

## Browser support

Any browser that supports Custom Elements v1 and ES modules (all modern
browsers). No build step or polyfill required.
