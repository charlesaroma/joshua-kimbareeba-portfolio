import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Global Components
import Navigation from './components/Global/Navigation';
import Footer from './components/Global/Footer';

// Single Page
import HomePage from './pages/Home/HomePage';

function App() {
  const container = useRef();

  useGSAP(() => {
    // Initialize ScrollSmoother
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });
  }, { scope: container });

  return (
    <BrowserRouter>
      <div ref={container} className="w-full">
        {/* Navigation is outside smooth-wrapper to stay fixed */}
        <Navigation />

        <div id="smooth-wrapper" className="w-full overflow-hidden">
          <div id="smooth-content" className="w-full">
            <HomePage />
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
