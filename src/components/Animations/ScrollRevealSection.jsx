import { animate, createScope, onScroll, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

const animationPresets = {
  fadeUp: { opacity: { from: 0 }, translateY: { from: '3rem' } },
  fadeLeft: { opacity: { from: 0 }, translateX: { from: '-3rem' } },
  fadeRight: { opacity: { from: 0 }, translateX: { from: '3rem' } },
  scaleIn: { opacity: { from: 0 }, scale: { from: 0.85 } },
};

/**
 * Wraps children in a scroll-triggered reveal animation using anime.js onScroll.
 *
 * Uses `createScope` for React-safe cleanup. Children matching the `selector`
 * are staggered in with the chosen animation preset.
 *
 * Props:
 * - animation: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn'
 * - staggerDelay: ms between child animations
 * - duration: ms per animation
 * - selector: CSS selector for targets inside the wrapper
 * - debug: show anime.js scroll debug overlay
 * - as: wrapper HTML tag
 * - enter: scroll enter threshold (default: 'top bottom')
 */
const ScrollRevealSection = ({
  children,
  animation = 'fadeUp',
  staggerDelay = 100,
  duration = 1200,
  selector = '.scroll-reveal-item',
  debug = false,
  className = '',
  as: Tag = 'div',
  enter = 'top bottom',
}) => {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mm.matches) return;

    scope.current = createScope({ root }).add(() => {
      animate(selector, {
        ...animationPresets[animation],
        duration,
        delay: stagger(staggerDelay),
        ease: 'out(3)',
        autoplay: onScroll({
          target: root.current,
          enter,
          debug,
        }),
      });
    });

    return () => scope.current?.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
};

export default ScrollRevealSection;
