import { animate, createScope, onScroll, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

const animationPresets = {
  fadeUp: { opacity: { from: 0, to: 1 }, translateY: { from: '3rem', to: 0 } },
  fadeLeft: { opacity: { from: 0, to: 1 }, translateX: { from: '-3rem', to: 0 } },
  fadeRight: { opacity: { from: 0, to: 1 }, translateX: { from: '3rem', to: 0 } },
  scaleIn: { opacity: { from: 0, to: 1 }, scale: { from: 0.85, to: 1 } },
};

const ScrollRevealSection = ({
  children,
  animation = 'fadeUp',
  staggerDelay = 100,
  duration = 1200,
  selector = '.scroll-reveal-item',
  debug = false,
  className = '',
  as: Tag = 'div',
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
