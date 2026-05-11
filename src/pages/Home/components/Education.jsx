import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GraduationCap, School, Book, Award, ArrowUpRight } from 'lucide-react';
import AnimatedText from '../../../components/Animations/AnimatedText';

const Education = () => {
  const container = useRef();

  const education = [
    {
      institution: 'United States International University - Africa (USIU-Africa)',
      degree: 'Bachelor of Science in Information Systems and Technology',
      year: '2016 — 2020',
      icon: GraduationCap,
      description: 'Focused on software engineering, database management, and enterprise systems architecture. Graduated with a strong foundation in scalable systems.',
      details: ['Software Engineering', 'Database Systems', 'Enterprise Architecture', 'Systems Analysis']
    },
    {
      institution: 'Seroma Christian High School',
      degree: 'Advanced Level Certificate (UACE)',
      year: 'High School',
      icon: School,
      description: 'Majored in Physics, Economics, and Mathematics (PEM), developing strong analytical and logical reasoning skills.',
      details: ['Physics', 'Economics', 'Mathematics']
    },
    {
      institution: 'Seeta High School',
      degree: 'Ordinary Level Certificate (UCE)',
      year: 'High School',
      icon: Book,
      description: 'Completed general secondary education with a focus on science and technical subjects.',
      details: ['General Sciences', 'Mathematics', 'Technical Drawing']
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Reveal the vertical line
      gsap.from(".edu-timeline-line", {
        scrollTrigger: {
          trigger: ".edu-timeline-container",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top center",
      });

      // Stagger items
      gsap.from(".edu-item", {
        scrollTrigger: {
          trigger: ".edu-timeline-container",
          start: "top 70%",
        },
        opacity: 0,
        x: -30,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
      });
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="education" 
      className="py-32 bg-primary relative overflow-hidden"
    >
      {/* Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-24">
            <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-6 block">
              Architectural Foundation
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-tight text-white">
                EDUCATION
              </h2>
              
              <div className="flex items-center gap-4 text-white/40">
                <div className="h-px w-12 bg-white/20"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Knowledge Base</span>
                <Award size={16} className="text-accent" />
              </div>
            </div>
          </div>

          {/* Timeline Layout */}
          <div className="edu-timeline-container relative pl-10 md:pl-20">
            {/* Main Vertical Line */}
            <div className="edu-timeline-line absolute left-0 top-0 w-[2px] h-full bg-linear-to-b from-accent via-accent/50 to-transparent"></div>

            <div className="space-y-32">
              {education.map((item, index) => (
                <div key={index} className="edu-item relative">
                  {/* Timeline Node */}
                  <div className="absolute left-[-10px] md:left-[-20px] top-0 -translate-x-1/2 w-5 h-5 md:w-10 md:h-10 rounded-full bg-primary border-[3px] border-accent flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] z-20">
                    <item.icon className="text-accent w-2.5 h-2.5 md:w-5 md:h-5" />
                  </div>

                  {/* Year Tag */}
                  <div className="mb-6">
                    <span className="text-accent font-heading font-black text-xs md:text-sm uppercase tracking-[0.3em] bg-accent/10 px-4 py-1.5 rounded-sm">
                      {item.year}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Content */}
                    <div className="lg:col-span-7">
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight mb-4 group cursor-default">
                        {item.institution}
                        <ArrowUpRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-accent" size={32} />
                      </h3>
                      <p className="text-xl md:text-2xl font-bold text-white/80 uppercase tracking-tight mb-6 leading-tight">
                        {item.degree}
                      </p>
                      <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed w-full mb-8">
                        {item.description}
                      </p>
                    </div>

                    {/* Details/Tags */}
                    <div className="lg:col-span-5">
                      <div className="bg-white/3 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6">Technical Focus</h4>
                        <div className="flex flex-wrap gap-3">
                          {item.details.map((detail, i) => (
                            <span 
                              key={i}
                              className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:bg-accent/20 hover:border-accent/40 transition-colors cursor-default"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Text */}
      <div className="absolute -bottom-5 -left-10 opacity-[0.02] select-none pointer-events-none hidden lg:block">
        <span className="text-[120px] font-black uppercase text-white leading-none tracking-tighter">
          ACADEMIA
        </span>
      </div>
    </section>
  );
};

export default Education;
