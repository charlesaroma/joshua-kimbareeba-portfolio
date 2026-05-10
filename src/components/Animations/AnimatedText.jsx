import { animate, createScope, onScroll, splitText, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

const animationPresets = {
  reveal: {
    opacity: { from: 0, to: 1 },
    translateY: { from: '100%', to: 0 },
    ease: 'out(4)',
  },
  wave: {
    opacity: { from: 0, to: 1 },
    translateY: { from: '1em', to: 0 },
    rotateX: { from: -90, to: 0 },
    ease: 'out(3)',
  },
  cascade: {
    opacity: { from: 0, to: 1 },
    translateX: { from: '-0.5em', to: 0 },
    scale: { from: 0.8, to: 1 },
    ease: 'out(4)',
  },
  slideUp: {
    opacity: { from: 0, to: 1 },
    translateY: { from: '50%', to: 0 },
    ease: 'inOutQuad',
  },
};

const AnimatedText = ({
  children,
  as: Tag = 'h2',
  splitBy = 'chars',
  animation = 'reveal',
  scrollTriggered = true,
  staggerDelay = 30,
  duration = 800,
  className = '',
}) => {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mm.matches) return;

    scope.current = createScope({ root }).add(() => {
      const splitConfig = {};
      if (splitBy === 'chars' || splitBy === 'lines') splitConfig[splitBy] = true;
      if (splitBy === 'words') splitConfig.words = true;

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

      split.addEffect(() => animate(targets, animProps));
    });

    return () => scope.current?.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
};

export default AnimatedText;
