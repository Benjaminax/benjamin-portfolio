import { useEffect, useId, useRef } from 'react';

const EDGE_HEIGHT = 200;
const REVEAL_DISTANCE = 360;
const CURVE_AMPLITUDE_RATIO = 0.1;
const MIN_CURVE_DEPTH = 44;
const MAX_CURVE_DEPTH = 144;

interface ScrollCurveDividerProps {
  fromColor: string;
  toColor: string;
}

export const ScrollCurveDivider: React.FC<ScrollCurveDividerProps> = ({
  fromColor,
  toColor,
}) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const edgePathRef = useRef<SVGPathElement>(null);
  const filterId = useId();

  useEffect(() => {
    const transition = transitionRef.current;
    const svg = svgRef.current;
    const fillPath = fillPathRef.current;
    const edgePath = edgePathRef.current;
    if (!transition || !svg || !fillPath || !edgePath) return;

    const container = transition.closest<HTMLElement>('[data-scroll-curve-container]');
    if (!container) return;

    let frame = 0;
    const updateTransition = () => {
      frame = 0;

      const width = transition.getBoundingClientRect().width;
      const curveDepth = Math.min(
        Math.max(width * CURVE_AMPLITUDE_RATIO, MIN_CURVE_DEPTH),
        MAX_CURVE_DEPTH,
      );
      const transitionTop = transition.getBoundingClientRect().top - EDGE_HEIGHT;
      const progress = Math.min(
        Math.max((window.innerHeight - transitionTop) / window.innerHeight, 0),
        1,
      );
      const currentDepth = curveDepth * (1 - progress);
      const curvePath = `M0 0 Q${width / 2} ${currentDepth} ${width} 0`;
      const fillPathData = `M0 ${-REVEAL_DISTANCE} H${width} V0 Q${width / 2} ${currentDepth} 0 0 Z`;

      svg.setAttribute(
        'viewBox',
        `0 ${-REVEAL_DISTANCE} ${width} ${REVEAL_DISTANCE + EDGE_HEIGHT}`,
      );
      fillPath.setAttribute('d', fillPathData);
      edgePath.setAttribute('d', curvePath);
      transition.style.transform = `translateY(${progress * EDGE_HEIGHT}px)`;
      container.style.setProperty('--scroll-curve-reveal', `${progress * REVEAL_DISTANCE}px`);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTransition);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      transition.style.transform = '';
      container.style.removeProperty('--scroll-curve-reveal');
    };
  }, []);

  const sameDarkFill = fromColor.toLowerCase() === '#141516' && toColor.toLowerCase() === '#141516';

  return (
    <div
      ref={transitionRef}
      data-scroll-curve
      className="pointer-events-none relative z-20 h-[200px] w-full"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        className="absolute -top-[360px] left-0 block h-[560px] w-full overflow-visible"
        viewBox="0 -360 1600 560"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={filterId} x="-10%" y="-100%" width="120%" height="400%" colorInterpolationFilters="sRGB">
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="14"
              floodColor={sameDarkFill ? '#ffffff' : '#000000'}
              floodOpacity={sameDarkFill ? '0.16' : '0.24'}
            />
          </filter>
        </defs>
        <path ref={fillPathRef} fill={fromColor} d="M0 -360 H1600 V0 Q800 120 0 0 Z" />
        <path
          ref={edgePathRef}
          d="M0 0 Q800 120 1600 0"
          fill="none"
          stroke={sameDarkFill ? '#ffffff' : fromColor}
          strokeOpacity={sameDarkFill ? '0.12' : '1'}
          strokeWidth="4"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
};
