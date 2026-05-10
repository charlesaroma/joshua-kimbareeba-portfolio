import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
} from "lucide-react";

const Projects = () => {
  const container = useRef();

  const projects = [
    {
      title: "Alero REST API Suite",
      category: "Backend Architecture",
      description:
        "Engineered a suite of high-performance Node.js REST APIs with MongoDB and Prisma, focusing on scalability and speed.",
      tags: ["Node.js", "Express", "MongoDB", "Prisma"],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      link: "#",
      github: "#",
    },
    {
      title: "Cross-Platform Mobile App",
      category: "Mobile Development",
      description:
        "Built a cross-platform mobile application with Flutter and React Native, featuring real-time sync and offline support.",
      tags: ["Flutter", "React Native", "Dart", "Firebase"],
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200",
      link: "#",
      github: "#",
    },
    {
      title: "Desktop App",
      category: "Desktop Development",
      description:
        "Developed a cross-platform desktop application using Electron, React, and Prisma for local-first data management.",
      tags: ["Electron", "React", "Prisma", "SQLite"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      link: "#",
      github: "#",
    },
  ];

  const { contextSafe } = useGSAP({ scope: container });

  const onProjectEnter = contextSafe((e) => {
    const img = e.currentTarget.querySelector(".project-img");
    const overlay = e.currentTarget.querySelector(".project-overlay");
    gsap.to(img, { scale: 1.1, duration: 0.6, ease: "power2.out" });
    gsap.to(overlay, { opacity: 1, duration: 0.4 });
  });

  const onProjectLeave = contextSafe((e) => {
    const img = e.currentTarget.querySelector(".project-img");
    const overlay = e.currentTarget.querySelector(".project-overlay");
    gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(overlay, { opacity: 0, duration: 0.4 });
  });

  useGSAP(
    () => {
      // Title Animation
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power4.out",
      });

      // Project Cards Reveal
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 60,
          rotateX: -15,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.1,
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="projects"
      className="py-32 bg-bg relative overflow-hidden"
    >
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-primary"></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-primary"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-primary"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="projects-title">
            <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-4 block">
              Selected Works
            </span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-primary">
              NOTABLE <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px var(--color-primary)" }}
              >
                PROJECTS
              </span>
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-4 pb-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-bg bg-primary/10 flex items-center justify-center text-[10px] font-black"
                >
                  0{i}
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">
              Total Highlights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              onMouseEnter={onProjectEnter}
              onMouseLeave={onProjectLeave}
            >
              {/* Project Image Side */}
              <div
                className={`lg:col-span-7 overflow-hidden rounded-3xl relative aspect-16/10 bg-primary/5 ${index % 2 !== 0 ? "lg:order-2" : ""}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img w-full h-full object-cover transition-all duration-700 grayscale hover:grayscale-0"
                />
                <div className="project-overlay absolute inset-0 bg-primary/40 opacity-0 flex items-center justify-center backdrop-blur-[2px] transition-all duration-500">
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all transform hover:scale-110"
                    >
                      <ExternalLink size={24} />
                    </a>
                    <a
                      href={project.github}
                      className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all transform hover:scale-110"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info Side */}
              <div
                className={`lg:col-span-5 flex flex-col gap-8 ${index % 2 !== 0 ? "lg:order-1" : ""}`}
              >
                <div>
                  <span className="font-heading font-bold text-accent uppercase tracking-[0.3em] text-[10px] mb-4 block">
                    {project.category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black uppercase text-primary leading-none mb-6 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-lg text-secondary/70 w-full font-medium leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 bg-primary/5 border border-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-4 group/btn"
                  >
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                      View Project
                    </span>
                    <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Section Number */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.01] select-none pointer-events-none hidden lg:block">
        <h2 className="text-[500px] font-black text-primary">02</h2>
      </div>
    </section>
  );
};

export default Projects;
