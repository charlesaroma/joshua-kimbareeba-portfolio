import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ArrowRight } from 'lucide-react';
import { animate, splitText, stagger, scrambleText } from 'animejs';

const roles = ['ENGINEER', 'DEVELOPER', 'ARCHITECT', 'STRATEGIST'];

const Hero = () => {
  const container = useRef();
  const softwareRef = useRef();
  const roleRef = useRef();
  const [roleIndex, setRoleIndex] = useState(0);

  useGSAP(() => {
    // Initial reveal of elements
    gsap.fromTo('.hero-content > *', 
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
    );
  }, { scope: container });

  // Main Heading "SOFTWARE" Effect using splitText.addEffect()
  useEffect(() => {
    if (!softwareRef.current) return;

    const split = splitText(softwareRef.current, { chars: true });
    
    // Applying the user-requested bounce/rotate effect
    split.addEffect(({ chars }) => animate(chars, {
      y: [
        { to: '-1.5rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
      ],
      rotate: { from: '-1turn', delay: 0 },
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 2000,
      loop: true
    }));

    return () => split.revert();
  }, []);

  // Cycling roles with scrambleText
  useEffect(() => {
    const interval = setInterval(() => {
      if (!roleRef.current) return;
      
      // 1. Fade out current role
      animate(roleRef.current, {
        opacity: [1, 0],
        translateY: [0, -10],
        duration: 400,
        ease: 'in(2)',
        onComplete: () => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Animate the NEW word with scrambleText
  useEffect(() => {
    if (!roleRef.current) return;
    
    // Ensure styles are reset before starting the next animation
    roleRef.current.style.opacity = '1';
    roleRef.current.style.transform = 'translateY(0px)';

    // Scramble reveal animation
    animate(roleRef.current, {
      opacity: [0, 1],
      translateY: [10, 0],
      innerHTML: scrambleText(roles[roleIndex]),
      duration: 1200,
      ease: 'out(3)'
    });
  }, [roleIndex]);

  return (
    <section
      ref={container}
      id='home'
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

        {/* Main Heading "SOFTWARE" */}
        <div className="mb-2">
          <h1 
            ref={softwareRef}
            className="text-4xl font-black uppercase tracking-tighter text-white leading-none sm:text-5xl md:text-6xl lg:text-8xl"
          >
            SOFTWARE
          </h1>
        </div>
        
        <div className="relative h-[1.2em] w-full flex items-center justify-center">
          <span 
            ref={roleRef}
            className="block text-4xl font-black uppercase tracking-tighter leading-none sm:text-5xl md:text-6xl lg:text-8xl text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
          >
            {roles[roleIndex]}
          </span>
        </div>

        <p className="mt-12 text-center text-sm md:text-base leading-snug text-white/60 w-full max-w-4xl mx-auto">
          Full-stack architectures for web, mobile, and desktop. Engineered for performance, scalability, and impact.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => ScrollSmoother.get()?.scrollTo('#projects')}
            className="flex min-w-[140px] items-center justify-center gap-2 bg-white px-5 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-accent hover:text-white cursor-pointer"
          >
            Projects
           <ArrowRight size={14} />
          </button>

          <button
            onClick={() => ScrollSmoother.get()?.scrollTo('#contact')}
            className="flex min-w-[140px] items-center justify-center border border-white/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-white hover:text-white cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20">
        <div className="h-8 w-px bg-white animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;