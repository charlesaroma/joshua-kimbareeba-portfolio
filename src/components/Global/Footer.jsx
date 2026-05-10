import { ArrowUp, Code } from 'lucide-react';
import AnimatedText from '../Animations/AnimatedText';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-bg relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Bottom Bar */}
        <div className="py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="font-heading text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              © {new Date().getFullYear()} Joshua Kimbareeba
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/10">Available for new projects</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/2 rounded-full border border-white/5">
              <Code size={12} className="text-accent" />
              <AnimatedText
                as="span"
                splitBy="words"
                animation="slideUp"
                scrollTriggered={true}
                staggerDelay={60}
                duration={600}
                className="text-[8px] font-black uppercase tracking-widest text-white/30"
              >
                Crafted with Precision
              </AnimatedText>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-4 font-heading text-xs font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all cursor-pointer"
            >
              <span>Top</span>
              <div className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:-translate-y-2 transition-all duration-500">
                <ArrowUp size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
