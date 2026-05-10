# anime.js Implementation Plan

## Status: animejs v4.4.1 already installed

## Files to Create

### 1. `src/pages/Home/components/Approach.jsx` (NEW)
New "THE APPROACH" section between Experience and Projects showcasing:
- **Split heading** by `chars`: "THE APPROACH" text splits per-character with staggered translateY + rotate reveal via `splitText().addEffect()`
- **3 approach cards** (Design, Build, Scale): staggered entrance with translateY + opacity + scale via `animate()`
- **Card descriptions** split by `words`: each word fades in with staggered delay via `splitText().addEffect()`
- **Floating decorative dots**: looped scale/opacity animation via `animate()`
- All wrapped in `createScope({ root })` with proper `.revert()` cleanup
- All gated behind `prefers-reduced-motion` media query

### 2. `src/pages/Home/HomePage.jsx` (MODIFY)
Import and insert `<Approach />` between `<Experience />` and `<Projects />`

---

## Files to Modify (add anime.js blocks alongside existing GSAP)

### 3. `src/pages/Home/components/Hero.jsx` (MODIFY)
Add to the `useEffect` (or a new `useEffect` for anime.js):
- `splitText('.hero-heading', { chars: true })` targeting "SOFTWARE\nARCHITECT"
- `.addEffect(({ chars }) => animate(chars, { opacity: [0,1], translateY: ['1em',0], delay: stagger(30), ease: 'out(3)' }))`

### 4. `src/pages/Home/components/Education.jsx` (MODIFY)
Add to the `useEffect` (or a new `useEffect` for anime.js):
- `splitText('.edu-title h2', { chars: true })` targeting the stacked "EDU/CA/TION"
- `.addEffect(({ chars }) => animate(chars, { opacity: [0,1], rotate: [(_,i) => i%2===0?20:-20, 0], delay: stagger(20) }))`

### 5. `src/components/Global/Footer.jsx` (MODIFY)
Add to the `useEffect` (or a new `useEffect` for anime.js):
- `splitText('.footer-title h2', { lines: true })` targeting "LET'S BUILD / SOMETHING / ICONIC."
- `.addEffect(({ lines }) => animate(lines, { translateX: ['-2rem',0], opacity: [0,1], delay: stagger(150) }))`

---

## Implementation Notes

- Each component gets a **new `useEffect`** dedicated to anime.js (separate from existing GSAP `useGSAP` calls)
- Anime.js instances use **`createScope({ root })`** for scoped DOM queries and proper cleanup
- All anime.js effects are gated behind:
  ```js
  const mm = window.matchMedia('(prefers-reduced-motion: no-preference)');
  if (!mm.matches) return;
  ```
- Existing GSAP animations remain **untouched**
- No CSS changes needed — all styling via Tailwind utility classes
