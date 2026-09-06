import React from 'react';
import { WordRotate } from './WordRotate';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const navFont: React.CSSProperties = {
    fontFamily:
      "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
  };

  return (
    <header className="absolute top-0 left-0 w-full z-40 px-8 sm:px-14 py-8 flex items-center justify-between pointer-events-none">
      {/* brand logo hover track */}
      <div
        className="pointer-events-auto flex items-center gap-1.5 text-white text-lg sm:text-xl font-normal tracking-tight group cursor-pointer"
        style={navFont}
      >
        <span className="transition-all duration-500 group-hover:opacity-40 shrink-0">©</span>

        <span className="relative overflow-hidden inline-block">
          <span
            className="invisible block whitespace-nowrap pointer-events-none select-none"
            aria-hidden
          >
            Code by Jayden
          </span>

          <span
            className="absolute inset-0 flex whitespace-nowrap transition-transform group-hover:-translate-x-1/2"
            style={{
              width: '200%',
              transitionDuration: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
            }}
          >
            <span className="inline-block w-1/2 text-white select-none">Code by Jayden</span>
            <span
              className="inline-block w-1/2 text-white/55 whitespace-nowrap cursor-pointer hover:text-white/80 transition-colors duration-200"
              onClick={onReplayIntro}
              role="button"
              aria-label="Replay intro"
            >
              Jayden Smith
            </span>
          </span>
        </span>
      </div>

      {/* nav header items */}
      <nav
        className="pointer-events-auto flex items-center gap-8 sm:gap-12 text-white text-base sm:text-lg font-normal tracking-tight"
        style={navFont}
      >
        <a href="#projects" className="leading-none">
          <WordRotate word="Work" className="text-base sm:text-lg font-normal text-white" />
        </a>

        <a href="#about" className="leading-none">
          <WordRotate word="About" className="text-base sm:text-lg font-normal text-white" />
        </a>

        <a href="#experience" className="leading-none">
          <WordRotate word="Experience" className="text-base sm:text-lg font-normal text-white" />
        </a>

        <a href="#contact" className="leading-none">
          <WordRotate word="Contact" className="text-base sm:text-lg font-normal text-white" />
        </a>
      </nav>
    </header>
  );
};
