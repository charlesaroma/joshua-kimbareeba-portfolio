import { useEffect, useRef, useState } from 'react';
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
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      // --- Section heading: split text reveal using addEffect() ---
      const heading = root.current.querySelector('.showcase-heading');
      if (heading) {
        // Using addEffect ensures it runs after fonts are ready
        splitText(heading, { chars: true })
          .addEffect(({ chars }) => animate(chars, {
            opacity: { from: 0 },
            translateY: { from: '120%' },
            rotateX: { from: -40 },
            delay: stagger(20),
            duration: 800,
            ease: 'out(4)',
            autoplay: onScroll({ target: root.current }),
          }));
      }

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

  // Polished transition for philosophy items
  const handleItemClick = (index) => {
    if (index === activeIndex) return;

    // Fade out current content
    animate(contentRef.current, {
      opacity: 0,
      translateY: -20,
      duration: 300,
      ease: 'in(2)',
      onComplete: () => {
        setActiveIndex(index);
        // Fade in new content
        animate(contentRef.current, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          ease: 'out(4)'
        });
      }
    });
  };

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
            className="showcase-heading w-full text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight text-white"
            style={{ perspective: '600px' }}
          >
            BUILD WITH
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
            >
              PURPOSE
            </span>
          </h2>
        </div>

        {/* Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Navigation/Indicators */}
          <div className="lg:col-span-4 flex lg:flex-col gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {philosophyItems.map((item, i) => (
              <button
                key={i}
                onClick={() => handleItemClick(i)}
                className={`group flex items-center gap-8 transition-all duration-500 text-left cursor-pointer ${
                  activeIndex === i ? 'opacity-100' : 'opacity-30 hover:opacity-50'
                }`}
              >
                <span className={`text-4xl md:text-5xl font-black leading-none transition-colors duration-500 ${
                  activeIndex === i ? 'text-accent' : 'text-white'
                }`}>
                  {item.number}
                </span>
                <span className={`hidden md:block text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 ${
                  activeIndex === i ? 'translate-x-2 text-white' : 'text-white/40'
                }`}>
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Content */}
          <div className="lg:col-span-8 lg:pl-12 w-full">
            <div ref={contentRef} className="relative min-h-[300px] w-full">
              <div
                className="philosophy-line h-px w-full bg-linear-to-r from-accent via-accent/30 to-transparent mb-12 origin-left"
              />
              <h3 className="philosophy-title w-full text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8">
                {philosophyItems[activeIndex].title}
              </h3>
              <p className="philosophy-text w-full text-lg md:text-xl font-medium leading-tight text-white/70">
                {philosophyItems[activeIndex].text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />
    </section>
  );
};

export default AnimeShowcase;
