import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

export const Preloader = () => {
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
    if (index === words.length - 1) return;

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);

    return () => clearTimeout(timeout);
  }, [index]);

  // curved bottom svg exit path
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[99] bg-[#141516] pointer-events-auto"
      style={{ height: '100vh', width: '100vw' }}
    >
      {dimension.width > 0 && (
        <>
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
            {words[index]}
          </motion.p>
          <svg
            className="absolute top-0 w-full pointer-events-none"
            style={{ height: 'calc(100% + 300px)', width: '100%' }}
          >
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#141516"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
};
export default Preloader;
