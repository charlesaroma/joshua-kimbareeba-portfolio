
import Hero from './components/Hero';
import Experience from './components/Experience';
import AnimeShowcase from './components/AnimeShowcase';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

const HomePage = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Experience />
      <AnimeShowcase />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
};

export default HomePage;
