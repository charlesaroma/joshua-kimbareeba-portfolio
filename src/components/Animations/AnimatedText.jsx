import { animate, createScope, onScroll, splitText, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

const animationPresets = {
  reveal: {
    opacity: { from: 0 },
    translateY: { from: '100%' },
    ease: 'out(4)',
  },
  wave: {
    opacity: { from: 0 },
    translateY: { from: '1em' },
    rotateX: { from: -90 },
    ease: 'out(3)',
  },
  cascade: {
    opacity: { from: 0 },
    translateX: { from: '-0.5em' },
    scale: { from: 0.8 },
    ease: 'out(4)',
  },
  slideUp: {
    opacity: { from: 0 },
    translateY: { from: '50%' },
    ease: 'inOutQuad',
  },
};

/**
 * Animated text component using anime.js v4 splitText.
 *
 * Uses `splitText` to split text into chars/words/lines and
 * animates them with staggered reveals. Supports both
 * scroll-triggered and on-mount animations.
 *
 * Note: splitText modifies the real DOM. This component should
 * wrap static text that doesn't re-render. Cleanup is handled
 * via createScope.revert().
 */
const AnimatedText = ({
  children,
  as: Tag = 'h2',
  splitBy = 'chars',
  animation = 'reveal',
  scrollTriggered = true,
  staggerDelay = 30,
  duration = 800,
  className = '',
  style,
}) => {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mm.matches) return;

    scope.current = createScope({ root }).add(() => {
      const splitConfig = {};
      if (splitBy === 'chars') splitConfig.chars = true;
      if (splitBy === 'words') splitConfig.words = true;
      if (splitBy === 'lines') splitConfig.lines = true;

      const split = splitText(root.current, splitConfig);

      const targets =
        splitBy === 'chars' ? split.chars :
        splitBy === 'words' ? split.words :
        split.lines;

      if (!targets || !targets.length) return;

      const animProps = {
        ...animationPresets[animation],
        duration,
        delay: stagger(staggerDelay),
      };

      if (scrollTriggered) {
        animProps.autoplay = onScroll({ target: root.current });
      }

      // addEffect is safe for split animations — it re-runs after font load
      split.addEffect(() => animate(targets, animProps));
    });

    return () => scope.current?.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Tag ref={root} className={className} style={style}>
      {children}
    </Tag>
  );
};

export default AnimatedText;
