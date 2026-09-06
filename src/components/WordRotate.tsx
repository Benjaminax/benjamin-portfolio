import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface WordRotateProps {
  word: string;
  className?: string;
}

/**
 * On hover: the current word slides up & out, then the same word
 * flips back in from below — a smooth ticker / slot-machine feel.
 */
export const WordRotate: React.FC<WordRotateProps> = ({ word, className = '' }) => {
  const [key, setKey] = useState(0);

  return (
    <span
      className={`relative inline-block overflow-hidden cursor-pointer ${className}`}
      style={{ verticalAlign: 'middle' }}
      onMouseEnter={() => setKey((k) => k + 1)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={key}
          className="block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default WordRotate;
