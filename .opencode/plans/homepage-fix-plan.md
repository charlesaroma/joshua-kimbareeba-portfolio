# Homepage Fix Implementation Plan

## Files to modify (in order):

### 1. `src/index.css` — Replace entire file
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-heading: "Archivo", sans-serif;
  --font-body: "Space Grotesk", sans-serif;
  --color-primary: #18181B;
  --color-secondary: #3F3F46;
  --color-accent: #2563EB;
  --color-bg: #FAFAFA;
  --color-text: #09090B;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
  --radius-none: 0px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

html { scroll-behavior: smooth; }

body { @apply bg-bg text-text font-body antialiased; }

h1, h2, h3, h4, h5, h6 { @apply font-heading font-bold uppercase tracking-tight; }

a { @apply transition-all duration-300 cursor-pointer; }

::selection { @apply bg-accent text-white; }

.text-stroke {
  -webkit-text-stroke: 1.5px currentColor;
  color: transparent;
}

.text-stroke-sm {
  -webkit-text-stroke: 1px currentColor;
  color: transparent;
}

.glass-card {
  @apply bg-white/80 backdrop-blur-[10px] border border-white/20 shadow-md;
}

.btn-primary {
  @apply bg-accent text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-3 hover:opacity-90 hover:-translate-y-px active:translate-y-0;
}

.btn-secondary {
  @apply bg-transparent text-primary border-2 border-primary/20 px-8 py-4 rounded-lg font-semibold transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-px active:translate-y-0;
}

.card-hover {
  @apply transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 2. `src/App.css` — DELETE the file

### 3. `src/pages/Home/components/Hero.jsx` — Full rewrite
- Remove long italic blockquote, replace with: `"Backend systems. Frontend experiences. Built to last."`
- Remove Terminal/Cpu/Database infinite floating icons
- Replace with static decorative gradient blobs
- Fix buttons: use `btn-primary` and `btn-secondary` classes, remove `!important` overrides
- Replace "SCROLL" text with Lucide `ChevronDown` icon
- Remove `pt-[64px]`, add padding via container
- Use `text-stroke` class instead of inline `WebkitTextStroke`
- Add `prefers-reduced-motion` check for GSAP

```jsx
import React, { useRef } from 'react';
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
      return () => mm.revert();
    });
  }, { scope: container });

  return (
    <section ref={container} id="home" className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-primary">
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ChevronDown size={20} className="text-white/30 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
```

### 4. `src/pages/Home/components/Projects.jsx` — Full rewrite
- Shorten descriptions to 1 sentence
- Remove Unsplash URLs, use CSS gradients as placeholders
- Add `cursor-pointer` to all interactive elements
- Simplify GSAP hover to CSS-only where possible
- Keep the staggered scroll reveal animation

```jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Alero REST API Suite',
    category: 'Backend Architecture',
    description: 'High-performance Node.js REST APIs for diverse client branding requirements.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    gradient: 'from-blue-900 via-blue-800 to-indigo-900',
    link: '#',
    github: '#'
  },
  {
    title: 'USIU-Africa 2020 Yearbook',
    category: 'Editorial & Digital Design',
    description: 'Lead editor and driving force behind the 2020 USIU-Africa Yearbook publication.',
    tags: ['InDesign', 'Branding', 'Digital Layout'],
    gradient: 'from-purple-900 via-purple-800 to-pink-900',
    link: '#',
    github: '#'
  },
  {
    title: 'Corporate Digital Identity',
    category: 'Digital Strategy & UX',
    description: 'Transforming brand ideas into functional websites through strategic UI/UX.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    gradient: 'from-emerald-900 via-emerald-800 to-teal-900',
    link: '#',
    github: '#'
  },
];

const Projects = () => {
  const container = useRef();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".projects-title", {
        scrollTrigger: { trigger: ".projects-title", start: "top 80%" },
        opacity: 0, y: 50, duration: 1, ease: "power4.out"
      });
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          opacity: 0, y: 60, duration: 1.2, ease: "power3.out", delay: i * 0.1
        });
      });
      return () => mm.revert();
    });
  }, { scope: container });

  return (
    <section ref={container} id="projects" className="py-32 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="projects-title">
            <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-4 block">Selected Works</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-primary">
              NOTABLE <br />
              <span className="text-stroke text-primary">PROJECTS</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, index) => (
            <div key={index} className="project-card group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className={`lg:col-span-7 overflow-hidden rounded-3xl relative aspect-[16/10] ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className={`w-full h-full bg-gradient-to-br ${project.gradient} transition-all duration-700`} />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <a href={project.link} className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all cursor-pointer">
                      <ExternalLink size={22} />
                    </a>
                    <a href={project.github} className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all cursor-pointer">
                      <Github size={22} />
                    </a>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 flex flex-col gap-8 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-accent"></span>
                    <span className="font-heading font-bold text-accent uppercase tracking-[0.3em] text-[10px]">{project.category}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase text-primary leading-none mb-6 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-lg text-secondary/70 w-full font-medium leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 bg-primary/5 border border-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary/60">{tag}</span>
                  ))}
                </div>

                <div className="pt-4">
                  <a href={project.link} className="inline-flex items-center gap-4 group/btn cursor-pointer">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">View Project</span>
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
    </section>
  );
};

export default Projects;
```

### 5. `src/pages/Home/components/Experience.jsx` — Full rewrite
- Shorten descriptions to 1 sentence
- Fix CTA card to use proper button styling
- Add `prefers-reduced-motion` support

```jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Server, Layout, Database, Globe, Zap, Cpu, Terminal } from 'lucide-react';

const experiences = [
  {
    company: 'Epiphanies in Motion',
    role: 'Senior Developer',
    period: 'April 2019 – Present',
    description: 'Leading technical initiatives and building high-performance web applications with scalable architecture.',
    skills: ['Architecture', 'Scaling', 'Full-Stack']
  },
  {
    company: 'Alero (Digital Branding & Software Development)',
    role: 'Software Developer',
    period: 'Freelance / Contract',
    description: 'Building robust REST APIs with Node.js and driving digital branding strategies for diverse clients.',
    skills: ['REST API', 'Node.js', 'Branding']
  }
];

const techStack = [
  { name: 'Node.js', icon: Server, level: 'Expert' },
  { name: 'REST API', icon: Database, level: 'Advanced' },
  { name: 'Web Design', icon: Globe, level: 'Advanced' },
  { name: 'UI/UX Design', icon: Layout, level: 'Advanced' },
  { name: 'Digital Branding', icon: Zap, level: 'Expert' },
  { name: 'Architecture', icon: Cpu, level: 'Advanced' },
];

const Experience = () => {
  const container = useRef();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".exp-title", {
        scrollTrigger: { trigger: ".exp-title", start: "top 80%" },
        opacity: 0, y: 50, duration: 1, ease: "power4.out"
      });
      gsap.from(".timeline-item", {
        scrollTrigger: { trigger: ".timeline-container", start: "top 70%" },
        opacity: 0, x: -30, stagger: 0.3, duration: 1, ease: "power3.out"
      });
      gsap.from(".skill-card", {
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
        opacity: 0, scale: 0.9, y: 20, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)"
      });
      gsap.from(".timeline-line", {
        scrollTrigger: { trigger: ".timeline-container", start: "top 70%", end: "bottom 70%", scrub: 1 },
        scaleY: 0, transformOrigin: "top center"
      });
      return () => mm.revert();
    });
  }, { scope: container });

  return (
    <section ref={container} id="experience" className="py-32 bg-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="exp-title mb-20">
              <span className="font-heading font-bold text-accent uppercase tracking-[0.4em] text-xs mb-4 block">Professional Path</span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-primary">
                WORK <br />
                <span className="text-stroke text-primary">EXPERIENCE</span>
              </h2>
            </div>

            <div className="timeline-container relative pl-8 md:pl-12">
              <div className="timeline-line absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-accent via-accent/50 to-primary/5"></div>
              <div className="space-y-16">
                {experiences.map((exp, index) => (
                  <div key={index} className="timeline-item relative">
                    <div className="absolute -left-[35px] md:-left-[51px] top-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-bg border-4 border-accent shadow-[0_0_15px_rgba(37,99,235,0.4)] z-20"></div>
                    <div className="flex flex-col gap-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent font-heading font-bold text-[10px] uppercase tracking-widest rounded-full w-fit">{exp.period}</span>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase text-primary leading-none mb-2">{exp.role}</h3>
                        <p className="text-xl font-bold text-accent/80 uppercase tracking-tight">{exp.company}</p>
                      </div>
                      <p className="text-lg text-secondary/70 w-full max-w-2xl leading-relaxed font-medium">{exp.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 border border-primary/10 px-3 py-1 rounded-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="mb-12">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-primary flex items-center gap-4">
                  Technical Mastery
                  <span className="h-px flex-grow bg-primary/10"></span>
                </h3>
              </div>

              <div className="skills-grid grid grid-cols-2 gap-4">
                {techStack.map((skill, index) => (
                  <div key={index} className="skill-card group glass-card p-6 rounded-2xl hover:bg-primary transition-all duration-500 border border-primary/5 hover:border-primary">
                    <div className="flex flex-col gap-6">
                      <div className="w-12 h-12 rounded-xl bg-bg border border-primary/5 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 shadow-sm">
                        <skill.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase tracking-wider text-primary group-hover:text-white transition-colors">{skill.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1 w-8 bg-primary/10 group-hover:bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-accent w-full"></div>
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-secondary/50 group-hover:text-white/40">{skill.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 rounded-3xl bg-primary text-white relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal size={80} />
                </div>
                <div className="relative z-10">
                  <p className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Available for hire</p>
                  <h4 className="text-xl font-black uppercase leading-tight mb-4">Let's build something <br /> extraordinary together</h4>
                  <a href="#contact" className="btn-primary text-sm">Get in touch</a>
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
```

### 6. `src/pages/Home/components/Education.jsx` — Edit
- Shorten descriptions to 1 sentence
- Use `text-stroke` class

Key edits:
- Line 16: `'Focused on software engineering, database management, and enterprise systems.'` → `'Software engineering, database management, and enterprise systems.'`
- Line 24: `'Physics, Economics, and Mathematics major.'` → `'Physics, Economics, and Mathematics.'`
- Line 32: `'General secondary education with a focus on science and technology.'` → `'General secondary education with a science and technology focus.'`
- Line 93: `<h2 class="text-7xl ...">EDU<br />CA<br />TION</h2>` stays
- Add reduced-motion check to GSAP animations
- Replace inline `WebkitTextStroke` with `text-stroke` class (if any)

### 7. `src/components/Global/Footer.jsx` — Minor edits
- Line 79: add `cursor-pointer` to social icon links
- Line 81: add `cursor-pointer` to social icon `<a>` (already has it from global `a` rule, but explicit is better)
- Line 118: add `cursor-pointer` to "Back to start" button

### Files NOT to touch:
- `src/components/Global/Navigation.jsx` (as requested)
- `src/pages/Home/HomePage.jsx` (no changes needed)
- `src/main.jsx` (GSAP plugins already registered)

## Implementation order:
1. `src/index.css` — write
2. `src/App.css` — delete
3. `src/pages/Home/components/Hero.jsx` — write
4. `src/pages/Home/components/Projects.jsx` — write
5. `src/pages/Home/components/Experience.jsx` — write
6. `src/pages/Home/components/Education.jsx` — edit
7. `src/components/Global/Footer.jsx` — edit
8. Run `npm run build` to verify

## Key design system alignments:
- ✅ Consistent button classes (btn-primary, btn-secondary)
- ✅ No emojis as icons (using Lucide)
- ✅ cursor-pointer on all interactive elements
- ✅ Smooth transitions (200-300ms)
- ✅ prefers-reduced-motion respected
- ✅ Text-stroke utility class instead of inline styles
- ✅ No continuous decorative animations
- ✅ Light/dark mode glass card opacity (bg-white/80)
- ✅ Design system fonts (Archivo + Space Grotesk)
- ✅ Design system colors (monochrome + blue accent)
