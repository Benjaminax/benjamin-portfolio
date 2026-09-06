import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { HorizontalShowcase } from './components/HorizontalShowcase';
import { Footer } from './components/Footer';
import { NavOverlay } from './components/NavOverlay';
import { FloatingHamburger } from './components/FloatingHamburger';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [preloaderKey, setPreloaderKey] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // intro splash screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2350);

    return () => clearTimeout(timer);
  }, [preloaderKey]);

  // restart intro when user clicks brand logo
  const handleReplayIntro = useCallback(() => {
    setIsMenuOpen(false);
    setIsLoading(true);
    setPreloaderKey((prev) => prev + 1);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#141516] text-[#f4f4f5] selection:bg-white selection:text-black font-neue-helvetica">
      {/* intro preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key={preloaderKey} />}
      </AnimatePresence>

      {/* menu button */}
      <FloatingHamburger
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((v) => !v)}
        isLoading={isLoading}
      />

      {/* side navigation overlay */}
      <NavOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* main content smooth reveal */}
      <motion.div
        className="relative z-0 min-h-screen flex flex-col justify-between"
        animate={isLoading ? { y: '100vh' } : { y: '0vh' }}
        initial={{ y: '100vh' }}
        style={{ transform: isLoading ? undefined : 'none' }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: isLoading ? 0 : 0.2,
        }}
      >
        <Navbar onReplayIntro={handleReplayIntro} />

        <main className="flex-grow relative z-10">
          <Hero
            onReplayIntro={handleReplayIntro}
            onToggleMenu={() => setIsMenuOpen((v) => !v)}
            isMenuOpen={isMenuOpen}
          />
          <div className="bg-white text-[#1c1d20] relative z-10">
            <About />
            <Projects />
          </div>
          <HorizontalShowcase />
          <div className="bg-white text-[#1c1d20] relative z-10">
            <Experience />
          </div>
        </main>

        <Footer onReplayIntro={handleReplayIntro} />
      </motion.div>
    </div>
  );
}

export default App;
