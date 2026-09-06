import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './Magnetic';

interface FloatingHamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
  isLoading?: boolean;
}

export const FloatingHamburger: React.FC<FloatingHamburgerProps> = ({ isOpen, onToggle, isLoading = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // toggle floating button after scroll past navbar
  useEffect(() => {
    const checkScroll = () => {
      setShowMenu(window.scrollY > 60);
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const visible = !isLoading && (showMenu || isOpen);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed top-6 right-8 z-[100]">
          <Magnetic strength={0.35}>
            <motion.button
              key="floating-hamburger"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 480, damping: 22, mass: 0.7 }}
              onClick={onToggle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-16 h-16 rounded-full flex flex-col items-center justify-center cursor-pointer relative border border-white/15 overflow-hidden shadow-xl"
              style={{
                background: isOpen ? '#5b6ef5' : '#1c1d20',
                transition: 'background 0.3s cubic-bezier(0.76,0,0.24,1)',
              }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              {/* top line */}
              <motion.span
                className="absolute block bg-white rounded-full origin-center"
                animate={
                  isOpen
                    ? { rotate: isHovered ? 135 : 45, y: 0, width: 22, height: 2 }
                    : { rotate: 0, y: isHovered ? -6 : -4, width: isHovered ? 26 : 22, height: 1.5 }
                }
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />

              {/* bottom line */}
              <motion.span
                className="absolute block bg-white rounded-full origin-center"
                animate={
                  isOpen
                    ? { rotate: isHovered ? 45 : -45, y: 0, width: 22, height: 2 }
                    : { rotate: 0, y: isHovered ? 6 : 4, width: isHovered ? 26 : 22, height: 1.5 }
                }
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </motion.button>
          </Magnetic>
        </div>
      )}
    </AnimatePresence>
  );
};
