import { useEffect, useRef } from 'react';
import { animate, createScope, onScroll, splitText, stagger, createTimer } from 'animejs';

const philosophyItems = [
  {
    number: '01',
    title: 'Architect First',
    text: 'Design the system before writing a single line. Clean architecture outlasts clever code.',
  },
  {
    number: '02',
    title: 'Ship Quality',
    text: 'Make it work, make it right, make it fast. Every release is a promise kept.',
  },
  {
    number: '03',
    title: 'Scale by Design',
    text: 'Build for tomorrow\'s traffic today. Performance isn\'t an afterthought — it\'s the foundation.',
  },
];

const marqueeText = 'ARCHITECTURE • PERFORMANCE • SCALABILITY • QUALITY • INNOVATION • PRECISION • ';

const AnimeShowcase = () => {
  const root = useRef(null);
  const scope = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mm.matches) return;

    scope.current = createScope({ root }).add(() => {

      // --- Marquee: Infinite horizontal scroll ---
      animate('.marquee-track', {
        translateX: [0, '-50%'],
        duration: 40000,
        loop: true,
        ease: 'linear',
      });

      // --- Section heading: split text reveal ---
      splitText('.showcase-heading', { chars: true })
        .addEffect(({ chars }) => animate(chars, {
          opacity: { from: 0 },
          translateY: { from: '120%' },
          rotateX: { from: -40 },
          delay: stagger(20),
          duration: 800,
          ease: 'out(4)',
          autoplay: onScroll({ target: root.current }),
        }));

      // --- Philosophy items: per-item scroll trigger ---
      const items = root.current.querySelectorAll('.philosophy-item');
      items.forEach((item) => {
        // Split and animate the philosophy text
        const textEl = item.querySelector('.philosophy-text');
        if (textEl) {
          splitText(textEl, { words: true })
            .addEffect(({ words }) => animate(words, {
              opacity: { from: 0 },
              translateY: { from: '1.5rem' },
              delay: stagger(40),
              duration: 600,
              ease: 'out(3)',
              autoplay: onScroll({ target: item }),
            }));
        }

        // Animate the number
        const numberEl = item.querySelector('.philosophy-number');
        if (numberEl) {
          animate(numberEl, {
            opacity: { from: 0 },
            scale: { from: 0.5 },
            duration: 800,
            ease: 'out(4)',
            autoplay: onScroll({ target: item }),
          });
        }

        // Animate the title
        const titleEl = item.querySelector('.philosophy-title');
        if (titleEl) {
          animate(titleEl, {
            opacity: { from: 0 },
            translateX: { from: '-2rem' },
            duration: 700,
            ease: 'out(4)',
            autoplay: onScroll({ target: item }),
          });
        }

        // Animate the decorative line
        const lineEl = item.querySelector('.philosophy-line');
        if (lineEl) {
          animate(lineEl, {
            scaleX: { from: 0 },
            duration: 1000,
            ease: 'out(4)',
            autoplay: onScroll({ target: item }),
          });
        }
      });

      // --- Scroll progress counter ---
      if (counterRef.current) {
        const counterObj = { value: 0 };
        createTimer({
          duration: 1000,
          onUpdate: () => {
            counterRef.current.textContent = Math.round(counterObj.value) + '%';
          },
          autoplay: onScroll({
            target: root.current,
            sync: 'playhead',
          }),
        });
        animate(counterObj, {
          value: 100,
          duration: 1000,
          ease: 'linear',
          autoplay: onScroll({
            target: root.current,
            sync: 'playhead',
          }),
        });
      }
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-primary py-32"
    >
      {/* Scroll Progress Indicator */}
      <div className="absolute top-8 right-8 z-20 hidden lg:block">
        <div className="flex flex-col items-end gap-2">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
            Scroll Progress
          </span>
          <span
            ref={counterRef}
            className="text-5xl font-black text-accent/30 tabular-nums"
          >
            0%
          </span>
        </div>
      </div>

      {/* Marquee Band */}
      <div className="pointer-events-none select-none border-y border-white/5 py-5 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
          {/* Duplicate for seamless loop */}
          {[0, 1].map((i) => (
            <span
              key={i}
              className="mx-4 inline-block text-6xl md:text-7xl font-black uppercase tracking-tighter text-white/4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 mt-20">
          <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-4 block">
            Engineering Philosophy
          </span>
          <h2
            className="showcase-heading text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white"
            style={{ perspective: '600px' }}
          >
            BUILD WITH
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }}
            >
              PURPOSE
            </span>
          </h2>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {philosophyItems.map((item, i) => (
            <div key={i} className="philosophy-item group">
              {/* Number */}
              <span className="philosophy-number block text-8xl font-black text-accent/10 leading-none mb-4 group-hover:text-accent/20 transition-colors duration-500">
                {item.number}
              </span>

              {/* Title */}
              <h3 className="philosophy-title text-2xl font-black uppercase tracking-tight text-white mb-4">
                {item.title}
              </h3>

              {/* Decorative Line */}
              <div
                className="philosophy-line h-px w-full bg-linear-to-r from-accent via-accent/30 to-transparent mb-6 origin-left"
              />

              {/* Description */}
              <p className="philosophy-text text-base font-medium leading-relaxed text-white/50">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />
    </section>
  );
};

export default AnimeShowcase;
