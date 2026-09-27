import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHoverCapability } from '../hooks/useHoverCapability';

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string, label: string) => void;
}

const NAV_LINKS = [
  { label: 'Home',       href: '/'           },
  { label: 'Work',       href: '/work'       },
  { label: 'About',      href: '/about'      },
  { label: 'Experience', href: '/experience' },
];

const FONT: React.CSSProperties = {
  fontFamily:
    "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
};

export const NavOverlay: React.FC<NavOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const canHover = useHoverCapability();
  const [dim, setDim] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth  : 0,
    h: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const update = () => setDim({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Seamless, zero-glitch background scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const preventTouch = (e: TouchEvent) => {
      if (!(e.target as HTMLElement).closest('.nav-overlay-content')) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;
      window.removeEventListener('touchmove', preventTouch);
    };
  }, [isOpen]);

  const H = dim.h;
  const isMobile = dim.w < 768;
  const panelW = isMobile ? dim.w : Math.min(dim.w * 0.65, 580);
  const bulge = isMobile ? 60 : 120;

  // svg curve math for side drawer exit/enter
  const clippedPath  = `path('M${bulge},0 Q0,${H * 0.5} ${bulge},${H} L${panelW},${H} L${panelW},0 Z')`;
  const straightPath = `path('M0,0 Q0,${H * 0.5} 0,${H} L${panelW},${H} L${panelW},0 Z')`;

  return (
    <AnimatePresence>
      {isOpen && dim.h > 0 && (
        <>
          {/* background backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          {/* side drawer container — 100% width on mobile, panelW on desktop */}
          <motion.div
            className="nav-overlay-content overscroll-contain fixed top-0 right-0 h-screen bg-[#1c1d20] z-[70] flex flex-col px-8 sm:px-12 py-8 sm:py-10"
            style={{ width: panelW }}
            initial={{ x: '100%', clipPath: clippedPath }}
            animate={{ x: '0%',   clipPath: straightPath }}
            exit={{    x: '100%', clipPath: clippedPath  }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mb-8 mt-2">
              <p className="text-white/40 text-[11px] tracking-[0.22em] uppercase mb-3" style={FONT}>
                Navigation
              </p>
              <div className="w-full h-px bg-white/12" />
            </div>

            {/* main links */}
            <nav className="flex-1 flex flex-col justify-center gap-1 -mt-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.href, link.label);
                  }}
                  className="group flex items-center gap-4 text-white py-1.5 hover:opacity-70 transition-opacity"
                  style={{ ...FONT, fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', fontWeight: 300, lineHeight: 1.1 }}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  whileHover={canHover ? { x: 10 } : undefined}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* social links */}
            <div className="mt-auto pt-5 border-t border-white/10">
              <p className="text-white/40 text-[11px] tracking-[0.22em] uppercase mb-3" style={FONT}>
                Socials
              </p>
              <div className="flex gap-5 text-white/50 text-sm" style={FONT}>
                {[
                  { name: 'GitHub', url: 'https://github.com/Benjaminax' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/benjamin-acheampong-7274b12a1/' },
                  { name: 'Instagram', url: 'https://www.instagram.com/_.benjamin.a._/' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavOverlay;
