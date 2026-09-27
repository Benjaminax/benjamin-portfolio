import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  NAVIGATION_COVER_DURATION,
  Preloader,
} from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { NavOverlay } from './components/NavOverlay';
import { FloatingHamburger } from './components/FloatingHamburger';
import { RoutePage, type SitePage } from './components/RoutePage';
import { getProjectBySlug, getProjectPath } from './components/projectData';

const pageFromPath = (pathname: string): SitePage => {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/work') return 'work';
  if (path.startsWith('/work/')) {
    const slug = path.slice('/work/'.length);
    return getProjectBySlug(slug) ? 'project' : 'work';
  }
  if (path === '/about') return 'about';
  if (path === '/experience') return 'experience';
  if (path === '/contact') return 'contact';
  return 'home';
};

const PAGE_SPLASH_LABELS: Record<Exclude<SitePage, 'home' | 'project'>, string> = {
  work: 'Work',
  about: 'About',
  experience: 'Experience',
  contact: 'Contact',
};

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<SitePage>(() => pageFromPath(window.location.pathname));
  const [projectSlug, setProjectSlug] = useState(() => {
    const path = window.location.pathname.replace(/\/+$/, '');
    return path.startsWith('/work/') ? path.slice('/work/'.length) : '';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState<{ key: number; label: string } | null>(null);
  const navigationKey = useRef(0);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const experienceSectionRef = useRef<HTMLDivElement>(null);

  // intro splash screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2350);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((href: string, label: string) => {
    setIsMenuOpen(false);
    if (navigationTimer.current) clearTimeout(navigationTimer.current);

    navigationKey.current += 1;
    setNavigation({ key: navigationKey.current, label });

    navigationTimer.current = setTimeout(() => {
      if (href.startsWith('/')) {
        window.history.pushState({}, '', href);
        setPage(pageFromPath(href));
        const path = href.replace(/\/+$/, '');
        setProjectSlug(path.startsWith('/work/') ? path.slice('/work/'.length) : '');
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const target = href.startsWith('#')
        ? document.getElementById(href.slice(1))
        : null;

      if (href.startsWith('#')) {
        window.scrollTo({
          top: target ? target.getBoundingClientRect().top + window.scrollY : 0,
          behavior: 'auto',
        });
      }

    }, NAVIGATION_COVER_DURATION);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      setNavigation(null);
      setPage(pageFromPath(window.location.pathname));
      const path = window.location.pathname.replace(/\/+$/, '');
      setProjectSlug(path.startsWith('/work/') ? path.slice('/work/'.length) : '');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigationTransitionComplete = useCallback(() => {
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    setNavigation(null);
  }, []);

  useEffect(() => () => {
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
  }, []);

  useEffect(() => {
    if (!navigation) return;

    const finishNavigationWhenVisible = () => {
      if (document.visibilityState !== 'visible') return;
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      setNavigation(null);
    };

    document.addEventListener('visibilitychange', finishNavigationWhenVisible);
    return () => document.removeEventListener('visibilitychange', finishNavigationWhenVisible);
  }, [navigation]);

  return (
    <div className="relative min-h-screen bg-[#141516] text-[#f4f4f5] selection:bg-white selection:text-black font-neue-helvetica">
      {/* intro preloader */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader
            key="intro"
            label={
              page === 'home'
                ? undefined
                : page === 'project'
                  ? getProjectBySlug(projectSlug)?.title
                  : PAGE_SPLASH_LABELS[page]
            }
          />
        ) : navigation ? (
          <Preloader
            key={`navigation-${navigation.key}`}
            label={navigation.label}
            isTransition
            onTransitionComplete={handleNavigationTransitionComplete}
          />
        ) : null}
      </AnimatePresence>

      {/* menu button */}
      <FloatingHamburger
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((v) => !v)}
        isLoading={isLoading}
      />

      {/* side navigation overlay */}
      <NavOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

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
        <Navbar
          onToggleMenu={() => setIsMenuOpen((v) => !v)}
          onNavigate={handleNavigate}
          activeHref={page === 'home' ? undefined : page === 'project' ? '/work' : `/${page}`}
          light={page === 'work' || page === 'about' || page === 'project'}
        />

        {page === 'home' ? (
          <main className="flex-grow relative z-10">
            <Hero />
            <div className="text-[#1c1d20] relative z-10">
              <div className="bg-white">
                <About />
              </div>
              <Projects
                experienceSectionRef={experienceSectionRef}
                onProjectClick={() => handleNavigate('/work', 'Work')}
                onNavigate={handleNavigate}
              />
            </div>
            <div ref={experienceSectionRef} className="relative z-0 -mt-[360px] bg-[#141516]">
              <Experience />
              <Footer profileImage="/profile2.png" />
            </div>
          </main>
        ) : (
          <main className="flex-grow relative z-10">
            <RoutePage
              page={page}
              projectSlug={projectSlug}
              onProjectClick={(title) => handleNavigate(getProjectPath(title), title)}
              onNavigate={handleNavigate}
            />
          </main>
        )}
      </motion.div>
    </div>
  );
}

export default App;
