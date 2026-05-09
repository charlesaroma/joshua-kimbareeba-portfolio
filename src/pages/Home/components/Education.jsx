import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GraduationCap, School, Book, Award } from 'lucide-react';

const Education = () => {
  const container = useRef();

  const education = [
    {
      institution: 'United States International University - Africa (USIU-Africa)',
      degree: 'Bachelor of Science in Information Systems and Technology',
      year: '2016 — 2020',
      icon: GraduationCap,
      accent: 'bg-accent',
      description: 'Software engineering, database management, and enterprise systems.'
    },
    {
      institution: 'Seroma Christian High School',
      degree: 'Advanced Level Certificate (UACE)',
      year: 'High School',
      icon: School,
      accent: 'bg-white/10',
      description: 'Physics, Economics, and Mathematics.'
    },
    {
      institution: 'Seeta High School',
      degree: 'Ordinary Level Certificate (UCE)',
      year: 'High School',
      icon: Book,
      accent: 'bg-white/5',
      description: 'General secondary education with a science and technology focus.'
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".edu-title", {
        scrollTrigger: { trigger: ".edu-title", start: "top 80%" },
        opacity: 0, x: -50, duration: 1, ease: "power4.out"
      });
      gsap.from(".edu-card", {
        scrollTrigger: { trigger: ".edu-list", start: "top 75%" },
        opacity: 0, x: 50, stagger: 0.2, duration: 1, ease: "power3.out"
      });
      gsap.from(".bg-text-edu", {
        scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: 1 },
        x: 100, opacity: 0.05
      });
    });
  }, { scope: container });

  return (
    <section ref={container} id="education" className="py-32 bg-primary text-bg overflow-hidden relative">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg to-transparent opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          {/* Left Side: Dynamic Heading */}
          <div className="lg:w-1/3 edu-title">
            <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-6 block">
              Academic Foundation
            </span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.75] text-white">
              EDU<br />CA<br />TION
            </h2>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px w-20 bg-accent"></div>
              <Award className="text-accent" size={24} />
            </div>
          </div>

          {/* Right Side: Education List */}
          <div className="lg:w-2/3 edu-list space-y-8">
            {education.map((item, index) => (
              <div
                key={index}
                className="edu-card group p-10 bg-white/[0.03] backdrop-blur-md border border-white/10 hover:bg-white/[0.06] transition-all duration-500 rounded-3xl relative overflow-hidden"
              >
                {/* Accent Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                  <div className={`p-6 rounded-2xl border border-white/10 ${item.accent} shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={36} className="text-white" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-accent">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-3 text-white group-hover:text-accent transition-colors">
                      {item.institution}
                    </h3>
                    <p className="text-lg md:text-xl font-bold italic text-white/80 mb-4">
                      {item.degree}
                    </p>
                    <p className="text-white/40 text-sm font-medium max-w-xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="bg-text-edu absolute -bottom-20 -right-20 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[350px] font-black uppercase text-white leading-none">LEARN</h2>
      </div>
    </section>
  );
};

export default Education;
