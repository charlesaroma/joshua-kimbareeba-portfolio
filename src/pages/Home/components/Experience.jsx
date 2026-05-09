import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  Server,
  Database,
  Zap,
  Cpu,
  Terminal,
  Smartphone,
  Monitor,
} from "lucide-react";

const experiences = [
  {
    company: "Epiphanies in Motion",
    role: "Senior Developer",
    period: "April 2019 – Present",
    description:
      "Building high-performance web, mobile, and desktop applications with scalable architecture and robust databases.",
    skills: ["Architecture", "Scaling", "Full-Stack", "Databases"],
  },
  {
    company: "Alero (Software Development)",
    role: "Software Developer",
    period: "Freelance / Contract",
    description:
      "Building robust REST APIs with Node.js and delivering full-stack solutions for diverse clients.",
    skills: ["REST API", "Node.js", "Full-Stack"],
  },
];

const techStack = [
  { name: "Node.js", icon: Server, level: "Expert" },
  { name: "React Native", icon: Smartphone, level: "Advanced" },
  { name: "Flutter", icon: Smartphone, level: "Advanced" },
  { name: "Electron", icon: Monitor, level: "Advanced" },
  { name: "MongoDB", icon: Database, level: "Advanced" },
  { name: "Prisma", icon: Database, level: "Advanced" },
  { name: "TypeScript", icon: Zap, level: "Expert" },
  { name: "Architecture", icon: Cpu, level: "Advanced" },
];

const Experience = () => {
  const container = useRef();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".exp-title", {
          scrollTrigger: { trigger: ".exp-title", start: "top 80%" },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power4.out",
        });
        gsap.from(".timeline-item", {
          scrollTrigger: { trigger: ".timeline-container", start: "top 70%" },
          opacity: 0,
          x: -30,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
        });
        gsap.from(".skill-card", {
          scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
          opacity: 0,
          scale: 0.9,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
        gsap.from(".timeline-line", {
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: "top center",
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="experience"
      className="py-32 bg-bg relative overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Experience Timeline */}
          <div className="lg:col-span-7">
            <div className="exp-title mb-20">
              <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-4 block">
                Professional Path
              </span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-primary">
                WORK <br />
                <span className="text-stroke text-primary">EXPERIENCE</span>
              </h2>
            </div>

            <div className="timeline-container relative pl-8 md:pl-12">
              {/* Vertical Progress Line */}
              <div className="timeline-line absolute left-0 top-0 w-[2px] h-full bg-linear-to-b from-accent via-accent/50 to-primary/5"></div>

              <div className="space-y-16">
                {experiences.map((exp, index) => (
                  <div key={index} className="timeline-item relative">
                    {/* Node */}
                    <div className="absolute left-[-35px] md:left-[-51px] top-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-bg border-4 border-accent shadow-[0_0_15px_rgba(37,99,235,0.4)] z-20"></div>

                    <div className="flex flex-col gap-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent font-heading font-bold text-[10px] uppercase tracking-widest rounded-full w-fit">
                        {exp.period}
                      </span>

                      <div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase text-primary leading-none mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-xl font-bold text-accent/80 uppercase tracking-tight">
                          {exp.company}
                        </p>
                      </div>

                      <p className="text-lg text-secondary/70 w-full max-w-2xl leading-relaxed font-medium">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 border border-primary/10 px-3 py-1 rounded-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Skills & Mastery */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="mb-12">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-primary flex items-center gap-4">
                  Technical Mastery
                  <span className="h-px grow bg-primary/10"></span>
                </h3>
              </div>

              <div className="skills-grid grid grid-cols-2 gap-4">
                {techStack.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-card group glass-card p-6 rounded-2xl hover:bg-primary transition-all duration-500 border border-primary/5 hover:border-primary"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="w-12 h-12 rounded-xl bg-bg border border-primary/5 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 shadow-sm">
                        <skill.icon size={24} />
                      </div>

                      <div>
                        <h4 className="font-black text-sm uppercase tracking-wider text-primary group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1 w-8 bg-primary/10 group-hover:bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-accent w-full"></div>
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-secondary/50 group-hover:text-white/40">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Card */}
              <div className="mt-12 p-8 rounded-3xl bg-primary text-white relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal size={80} />
                </div>
                <div className="relative z-10">
                  <p className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
                    Available for hire
                  </p>
                  <h4 className="text-xl font-black uppercase leading-tight mb-4">
                    Let's build something <br /> extraordinary together
                  </h4>
                  <button onClick={() => ScrollSmoother.get()?.scrollTo('#contact')} className="btn-primary text-sm cursor-pointer">
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
