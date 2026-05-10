import { useEffect, useRef } from 'react';
import { animate, createScope, onScroll, splitText, stagger } from 'animejs';

const quotes = [
  {
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  {
    text: 'Make it work, make it right, make it fast.',
    author: 'Kent Beck',
  },
  {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
  },
];

const AnimeShowcase = () => {
  const root = useRef(null);
  const scope = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mm.matches) return;

    scope.current = createScope({ root }).add(() => {

      splitText('.showcase-quote-text', { words: true })
        .addEffect(({ words }) => animate(words, {
          opacity: { from: 0, to: 1 },
          translateY: { from: '1.5rem', to: 0 },
          delay: stagger(50),
          duration: 600,
          ease: 'out(3)',
          autoplay: onScroll({ target: root.current }),
        }));

      animate('.showcase-author', {
        opacity: { from: 0, to: 1 },
        translateX: { from: '-2rem', to: 0 },
        duration: 800,
        ease: 'out(4)',
        autoplay: onScroll({ target: root.current }),
      });

      if (marqueeRef.current) {
        animate(marqueeRef.current, {
          translateX: ['100%', '-100%'],
          duration: 30000,
          loop: true,
          ease: 'linear',
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
      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="pointer-events-none select-none whitespace-nowrap border-y border-white/5 py-6"
      >
        <span className="mx-8 inline-block text-7xl font-black uppercase tracking-tighter text-white/5">
          ANIME.JS • ONSCROLL • SPLITTEXT • ANIMATE • CREATE SCOPE • STAGGER • ONSCROLL • SPLITTEXT
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 mt-20">
          <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-4 block">
            Powered by anime.js
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white">
            SCROLL
            <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }}>
              SHOWCASE
            </span>
          </h2>
        </div>

        {/* Scroll-triggered Quote */}
        <div className="mx-auto max-w-4xl">
          {quotes.map((quote, i) => (
            <div key={i} className="showcase-quote mb-20 last:mb-0">
              <p className="showcase-quote-text text-2xl md:text-3xl font-black uppercase leading-tight tracking-tight text-white/90">
                {quote.text}
              </p>
              <p className="showcase-author mt-6 text-sm font-bold uppercase tracking-[0.3em] text-accent/60">
                — {quote.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimeShowcase;
