# Agent Instructions

## Language

사용자가 어떤 언어로 입력하더라도 항상 한국어로 응답한다.

## Overview

Single-file space exploration quiz (Korean UI). Everything — HTML, CSS, JS, and question data — lives in `index.html`. No build step, no dependencies, no package manager, no tests or linter, and not a git repository.

- Run: open `index.html` directly (`file://`); no server needed.
- `script.js` and `style.css` in the folder are leftovers from an earlier multi-file version. `index.html` does not reference them; edit `index.html` only.

## Architecture

- Question data is the `QUESTIONS` array: `{ q, o: [4 options], a: correctIndex, e: explanation }`. Changing the question count requires updating the hardcoded `10` in the header text, the initial `1 / 10` counter, and `aria-valuemax` on `#barWrap`.
- State is module-level `i` (current question), `score`, `locked` (prevents double answers), and `deck`. `QUESTIONS` is the source data; `buildDeck()` makes `deck`, a shuffled copy (question and option order) with `a` recomputed, and all gameplay code reads `deck`, not `QUESTIONS`. Flow: `render()` → `answer(n)` → `#next` click → `render()` or `finish()`; `#again` resets state, rebuilds the deck, and calls `render()`.
- Keyboard: a document `keydown` handler maps `1`–`4` to options and `Enter` to `#next`/`#again` (skipped when a button is focused, since native Enter already clicks it). `finish()` focuses `#again`.
- Best score is stored in `localStorage` under `spaceQuizBest` (wrapped in try/catch) and shown in `#best` on the result card.
- Two sibling cards, `#quiz` and `#result`, are toggled with the `.hidden` class.
- The progress bar width and `aria-valuenow` are set in both `render()` (answered-so-far) and `answer()` (answered including current). Keep both in sync when editing.
- Result emoji and message tiers are a ternary chain in `finish()` keyed on score ratio.

## Conventions

- All user-facing text is Korean; keep new strings Korean.
- Theming uses CSS variables on `:root` overridden in `@media (prefers-color-scheme: dark)`. The mission-control status panel (`.hud`) defines its own local variables with a dark override. Add colors as variables for both themes rather than hardcoding.
- Feedback animations (`shake`, `pulse`, `pop`, `blink`, `fadeIn`) are disabled by a global `prefers-reduced-motion` rule. Restarting an animation in JS uses the remove-class / `void el.offsetWidth` / add-class reflow trick.
- Accessibility: answer options are real `<button>`s, feedback is in an `aria-live` region, and focus moves to `#next` after answering. Preserve these.
- Body text is 15px sans-serif; the column is capped at `max-width: 480px`.

## Verifying changes

Test in the integrated browser canvas (open the `file://` URL) and drive the quiz with `evaluate_javascript`. The globals `QUESTIONS`, `deck`, `i`, `score`, `render`, and `answer` are reachable from the page context. The browser may have reduced-motion enabled, which suppresses animations, so `getComputedStyle(...).animationName` reads `none` there.
