import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onToggleMenu?: () => void;
  onNavigate: (href: string, label: string) => void;
  activeHref?: string;
  light?: boolean;
}

interface NavItemProps {
  href: string;
  label: string;
  style?: React.CSSProperties;
  onNavigate: (href: string, label: string) => void;
  isActive: boolean;
  light: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  style,
  onNavigate,
  isActive,
  light,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Subtle magnetic attraction (small surface area of movement)
    setPosition({ x: middleX * 0.28, y: middleY * 0.28 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href, label);
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.15 }}
      className="relative flex flex-col items-center py-2 px-1 cursor-pointer group select-none"
      style={{ ...style, color: light ? '#1c1d20' : '#ffffff' }}
    >
      <span className="text-base sm:text-lg font-normal tracking-tight transition-opacity duration-200">
        {label}
      </span>

      {/* White dot indicator underneath */}
      <motion.span
        className={`w-1.5 h-1.5 rounded-full absolute -bottom-1 ${light ? 'bg-[#1c1d20]' : 'bg-white'}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered || isActive ? 1 : 0,
          opacity: isHovered || isActive ? 1 : 0,
          y: isHovered || isActive ? 0 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 22,
        }}
      />
    </motion.a>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMenu,
  onNavigate,
  activeHref,
  light = false,
}) => {
  const navFont: React.CSSProperties = {
    fontFamily:
      "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
  };

  return (
    <header className="absolute top-0 left-0 w-full z-40 px-5 sm:px-8 md:px-14 py-6 sm:py-8 flex items-center justify-between pointer-events-none">
      {/* Brand — mobile: static "Code by Benjamin", desktop: hover-slide */}
      <a
        href="/"
        onClick={(event) => {
          event.preventDefault();
          onNavigate('/', 'Home');
        }}
        className="pointer-events-auto flex items-center gap-1.5 text-base sm:text-xl font-normal tracking-tight group cursor-pointer"
        style={{ ...navFont, color: light ? '#1c1d20' : '#ffffff' }}
      >
        <span className={`transition-all duration-500 group-hover:opacity-40 shrink-0 ${light ? 'text-[#1c1d20]' : 'text-white'}`}>©</span>

        {/* Mobile: Code by Benjamin */}
        <span className={`md:hidden ${light ? 'text-[#1c1d20]' : 'text-white'}`}>Code by Benjamin</span>

        {/* Desktop: hover-slide between "Code by Benjamin" and "Benjamin Acheampong" */}
        <span className="hidden md:inline-block relative overflow-hidden pr-0.5">
          <span
            className="invisible block whitespace-nowrap pointer-events-none select-none"
            aria-hidden
          >
            Benjamin Acheampong
          </span>

          <span
            className="absolute inset-0 flex whitespace-nowrap transition-transform group-hover:-translate-x-1/2"
            style={{
              width: '200%',
              transitionDuration: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
            }}
          >
            <span className={`inline-block w-1/2 select-none ${light ? 'text-[#1c1d20]' : 'text-white'}`}>Code by Benjamin</span>
            <span
              className={`inline-block w-1/2 whitespace-nowrap transition-colors duration-200 ${light ? 'text-[#1c1d20]/55 group-hover:text-[#1c1d20]/80' : 'text-white/55 group-hover:text-white/80'}`}
            >
              Benjamin Acheampong
            </span>
          </span>
        </span>
      </a>

      {/* Nav links — desktop & iPad (tighter spacing & right aligned) */}
      <nav
        className="pointer-events-auto hidden md:flex items-center justify-end gap-5 md:gap-6 lg:gap-10 ml-auto"
      >
        <NavItem href="/work" label="Work" style={navFont} onNavigate={onNavigate} isActive={activeHref === '/work'} light={light} />
        <NavItem href="/about" label="About" style={navFont} onNavigate={onNavigate} isActive={activeHref === '/about'} light={light} />
        <NavItem href="/experience" label="Experience" style={navFont} onNavigate={onNavigate} isActive={activeHref === '/experience'} light={light} />
      </nav>

      {/* Mobile Menu button — "• Menu" */}
      <div className="md:hidden pointer-events-auto">
        <button
          onClick={onToggleMenu}
          className={`flex items-center gap-2 text-base font-normal tracking-tight cursor-pointer select-none active:opacity-70 transition-opacity ${light ? 'text-[#1c1d20]' : 'text-white'}`}
          style={navFont}
          aria-label="Open menu"
        >
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${light ? 'bg-[#1c1d20]' : 'bg-white'}`} />
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
};
