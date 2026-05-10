import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Github, Linkedin, Facebook, Youtube, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const container = useRef();

  const socialLinks = [
    { name: 'Github', icon: Github, url: 'https://github.com/joshbaz' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://ug.linkedin.com/in/joshua-kimbareeba-03a005126' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/joshuakimbareeba' },
    { name: 'YouTube', icon: Youtube, url: 'https://m.youtube.com/@kimbareebajoshua9298' },
  ];

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from(".contact-title", {
      scrollTrigger: { trigger: ".contact-title", start: "top 85%" },
      opacity: 0, y: 30, duration: 1, ease: "power3.out"
    });
    gsap.from(".social-icon", {
      scrollTrigger: { trigger: ".social-container", start: "top 90%" },
      opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.6, ease: "power2.out"
    });
  }, { scope: container, dependencies: [] });

  return (
    <section
      ref={container}
      id="contact"
      className="bg-primary text-bg py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* Left Side: Call to Action */}
          <div className="lg:col-span-8">
            <div className="contact-title mb-16">
              <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-6 block">
                Get in Touch
              </span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                LET'S BUILD <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>SOMETHING</span> <br />
                ICONIC.
              </h2>
            </div>

            <div className="social-container flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon group p-6 rounded-3xl bg-white/3 border border-white/10 hover:bg-accent hover:border-accent hover:-translate-y-2 transition-all duration-500 shadow-xl"
                  aria-label={social.name}
                >
                  <social.icon size={28} className="group-hover:scale-110 transition-transform duration-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Details */}
          <div className="lg:col-span-4 flex flex-col gap-16 lg:items-end">
            <div className="text-left lg:text-right">
              <div className="flex items-center lg:flex-row-reverse gap-4 mb-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <MapPin size={22} />
                </div>
                <p className="font-heading font-bold uppercase tracking-[0.3em] text-white/40 text-[10px]">Current Location</p>
              </div>
              <p className="text-2xl font-black text-white uppercase tracking-tight">Nairobi, Kenya <br /> Kampala, Uganda</p>
            </div>

            <div className="text-left lg:text-right">
              <div className="flex items-center lg:flex-row-reverse gap-4 mb-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <Mail size={22} />
                </div>
                <p className="font-heading font-bold uppercase tracking-[0.3em] text-white/40 text-[10px]">Direct Email</p>
              </div>
              <a
                href="mailto:joshuakimbareeba@gmail.com"
                className="text-2xl font-black text-white hover:text-accent transition-all duration-300 underline decoration-accent/30 decoration-2 underline-offset-12 hover:decoration-accent"
              >
                joshuakimbareeba@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
