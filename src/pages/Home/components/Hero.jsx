import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();
      tl.from(".hero-label", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
        .from(".hero-title", { opacity: 0, y: 40, duration: 1, ease: "power4.out" }, "-=0.4")
        .from(".hero-description", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=0.4");
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      id="home"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-primary"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">
          <p className="hero-label font-heading font-bold uppercase tracking-[0.3em] text-accent text-sm md:text-base">
            Building the Digital Future
          </p>

          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-white uppercase">
            SOFTWARE <br />
            <span className="text-stroke text-white">ARCHITECT</span>
          </h1>

          <p className="hero-description text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
            Backend systems. Frontend experiences. Built to last.
          </p>

          <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-6">
            <a href="#projects" className="btn-primary shadow-lg shadow-accent/20">
              <span>Explore Projects</span>
              <ArrowRight size={20} />
            </a>
            <a href="#contact" className="btn-secondary !text-white !border-white/20 hover:!border-white/40">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ChevronDown size={20} className="text-white/30 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
