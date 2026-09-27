import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const NAVIGATION_COVER_DURATION = 1000;
const NAVIGATION_HOLD_DURATION = 500;
const NAVIGATION_EXIT_DURATION = 800;
export const NAVIGATION_TRANSITION_DURATION =
  NAVIGATION_COVER_DURATION + NAVIGATION_HOLD_DURATION + NAVIGATION_EXIT_DURATION;
export const NAVIGATION_COVER_PROGRESS =
  NAVIGATION_COVER_DURATION / NAVIGATION_TRANSITION_DURATION;
const NAVIGATION_HOLD_PROGRESS =
  (NAVIGATION_COVER_DURATION + NAVIGATION_HOLD_DURATION) / NAVIGATION_TRANSITION_DURATION;
const navigationEaseInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];
const NAVIGATION_EASING = [navigationEaseInOut, 'linear' as const, navigationEaseInOut];

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const slideUp = {
  initial: {
    top: 0,
    opacity: 1,
  },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
  },
};

const transitionSlide = {
  initial: {
    top: '100vh',
    opacity: 1,
  },
  enter: {
    top: ['100vh', '0vh', '0vh', '-100vh'],
    transition: {
      duration: NAVIGATION_TRANSITION_DURATION / 1000,
      times: [0, NAVIGATION_COVER_PROGRESS, NAVIGATION_HOLD_PROGRESS, 1],
      ease: NAVIGATION_EASING,
    },
  },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
  },
};

interface PreloaderProps {
  label?: string;
  isTransition?: boolean;
  onTransitionComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  label,
  isTransition = false,
  onTransitionComplete,
}) => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // cycle through greetings
  useEffect(() => {
    if (isTransition || index === words.length - 1) return;

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);

    return () => clearTimeout(timeout);
  }, [index, isTransition]);

  const topCurveDepth = isTransition ? 180 : 0;
  const initialPath = `M0 ${topCurveDepth} Q${dimension.width / 2} ${-topCurveDepth} ${dimension.width} ${topCurveDepth} L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} Z`;
  const middlePath = `M0 0 Q${dimension.width / 2} 0 ${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} Z`;
  const targetPath = `M0 0 Q${dimension.width / 2} 0 ${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} Z`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    flow: {
      d: [initialPath, middlePath, middlePath, targetPath],
      transition: {
        duration: NAVIGATION_TRANSITION_DURATION / 1000,
        times: [0, NAVIGATION_COVER_PROGRESS, NAVIGATION_HOLD_PROGRESS, 1],
        ease: NAVIGATION_EASING,
      },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={isTransition ? transitionSlide : slideUp}
      initial="initial"
      animate={isTransition ? 'enter' : undefined}
      exit="exit"
      onAnimationComplete={isTransition ? onTransitionComplete : undefined}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[99] pointer-events-auto"
      style={{ height: '100vh', width: '100vw' }}
    >
      {dimension.width > 0 && (
        <>
          <svg
            className="absolute top-0 z-[1] w-full pointer-events-none"
            style={{ height: 'calc(100% + 300px)', width: '100%' }}
          >
            <motion.path
              variants={curve}
              initial="initial"
              animate={isTransition ? 'flow' : undefined}
              exit="exit"
              fill="#141516"
            />
          </svg>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex items-center text-white text-[38px] sm:text-[46px] md:text-[52px] font-normal z-[2] select-none absolute font-neue-helvetica"
            style={{
              fontFamily:
                "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, 'Plus Jakarta Sans', Arial, sans-serif",
            }}
          >
            <span className="block w-[10px] h-[10px] bg-white rounded-full mr-3.5 shrink-0" />
            {label ?? words[index]}
          </motion.p>
        </>
      )}
    </motion.div>
  );
};
export default Preloader;
