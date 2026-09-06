import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: 'Home',       href: '#'          },
  { label: 'Work',       href: '#projects'   },
  { label: 'About',      href: '#about'     },
  { label: 'Experience', href: '#experience'},
  { label: 'Contact',    href: '#contact'   },
];

const FONT: React.CSSProperties = {
  fontFamily:
    "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
};

export const NavOverlay: React.FC<NavOverlayProps> = ({ isOpen, onClose }) => {
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

  // prevent body scrolling when nav is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const H = dim.h;
  const panelW = Math.min(dim.w * 0.65, 580);
  const bulge = 120;

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

          {/* side drawer container */}
          <motion.div
            className="fixed top-0 right-0 h-screen bg-[#1c1d20] z-[70] flex flex-col px-12 py-10"
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
                  onClick={onClose}
                  className="group flex items-center gap-4 text-white py-1.5 hover:opacity-70 transition-opacity"
                  style={{ ...FONT, fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', fontWeight: 300, lineHeight: 1.1 }}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  whileHover={{ x: 10 }}
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
                {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((s) => (
                  <a key={s} href="#" className="hover:text-white transition-colors duration-200">{s}</a>
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
