import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Terminal, Cpu, Database } from 'lucide-react';

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    // Reveal text elements
    const tl = gsap.timeline();
    
    tl.from(".hero-label", { 
      opacity: 0, 
      y: 20, 
      duration: 0.8, 
      ease: "power3.out" 
    })
    .from(".hero-title", { 
      opacity: 0, 
      y: 40, 
      duration: 1, 
      ease: "power4.out" 
    }, "-=0.4")
    .from(".hero-description", { 
      opacity: 0, 
      y: 20, 
      duration: 0.8, 
      ease: "power3.out" 
    }, "-=0.6")
    .from(".hero-cta", { 
      opacity: 0, 
      y: 20, 
      duration: 0.8, 
      stagger: 0.2, 
      ease: "power2.out" 
    }, "-=0.4");

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="home" 
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-primary pt-[64px]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Abstract Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary"></div>
      </div>

      {/* Floating Elements (Decorative) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Terminal, Cpu, Database].map((Icon, i) => (
          <div
            key={i}
            className="floating-icon absolute text-accent/20"
            style={{ 
              top: `${20 + (i * 25)}%`, 
              left: `${15 + (i * 60) % 70}%`,
            }}
          >
            <Icon size={40 + i * 20} />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">
          <p className="hero-label font-heading font-bold uppercase tracking-[0.3em] text-accent text-sm md:text-base">
            Building the Digital Future
          </p>
          
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-white uppercase">
            SOFTWARE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>ARCHITECT</span>
          </h1>

          <div className="hero-description w-full max-w-xl mx-auto mb-8">
            <p className="text-base md:text-lg lg:text-xl font-medium text-white/70 leading-relaxed italic border-l-2 border-accent/40 pl-6 text-left">
              "I craft high-performance backend systems and immersive frontend experiences 
              that bridge the gap between imagination and reality."
            </p>
          </div>

          <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="btn-primary group !px-8 !py-4 flex items-center gap-3 relative overflow-hidden text-base shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">Explore Projects</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </a>
            
            <a 
              href="#contact" 
              className="btn-secondary !text-white !border-white/10 !px-8 !py-4 text-base hover:!bg-white/5 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 font-heading text-[8px] uppercase tracking-[0.5em] mb-2">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
