import React, { useRef, useEffect } from 'react';

interface CurvedPageTransitionBlackProps {
  className?: string;
}

export const CurvedPageTransitionBlack: React.FC<CurvedPageTransitionBlackProps> = ({ className = '' }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Create scroll-based animation by modifying the curve control point
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.5; // Animation completes over 50vh of scroll
      const progress = Math.min(scrollY / maxScroll, 1);

      // Interpolate the curve control point from -100 (curved up) to 0 (straight)
      const curveHeight = -100 * (1 - progress);

      // Update the path with the new curve height
      const newPath = `M0,100 Q800,${curveHeight} 1600,100 L1600,0 L0,0 Z`;
      path.setAttribute('d', newPath);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`absolute top-0 left-0 w-full h-32 z-20 pointer-events-none ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <path
          ref={pathRef}
          fill="#141516"
          d="M0,100 Q800,-100 1600,100 L1600,0 L0,0 Z"
        />
      </svg>
    </div>
  );
};

export default CurvedPageTransitionBlack;