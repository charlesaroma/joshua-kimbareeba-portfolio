import React from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';

const HomePage = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Experience />
      <Projects />
      <Education />
    </main>
  );
};

export default HomePage;
