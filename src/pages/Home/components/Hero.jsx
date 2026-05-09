import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 24,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-6 py-20"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Hero Content */}
      <div className="hero-content relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">

        {/* Label */}
        <span className="mb-6 font-heading text-[9px] font-bold uppercase tracking-[0.35em] text-accent">
          Building the Digital Future
        </span>

        {/* Main Heading */}
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
          SOFTWARE
          <span className="block bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent">
            ARCHITECT
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-center text-sm leading-none text-white/60 md:whitespace-nowrap md:text-base">
          Mobile &amp; desktop apps. Scalable backends &amp; databases.
          Engineered for the modern stack.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={() => ScrollSmoother.get()?.scrollTo('#projects')}
            className="flex w-44 items-center justify-center gap-2 bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-accent hover:text-white cursor-pointer"
          >
            Projects
           <ArrowRight size={16} />
          </button>

          <button
            onClick={() => ScrollSmoother.get()?.scrollTo('#contact')}
            className="flex w-44 items-center justify-center border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-white hover:text-white cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20">
        <div className="h-8 w-px bg-white" />
      </div>
    </section>
  );
};

export default Hero;