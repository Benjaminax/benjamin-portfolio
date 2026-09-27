import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Magnetic } from './Magnetic';
import { projects } from './projectData';

const EDGE_HEIGHT = 200;
const EXPERIENCE_REVEAL_DISTANCE = 360;
const CURVE_AMPLITUDE_RATIO = 0.1;
const MIN_CURVE_DEPTH = 44;
const MAX_CURVE_DEPTH = 144;

interface ProjectsProps {
  experienceSectionRef: React.RefObject<HTMLDivElement | null>;
  onProjectClick: (title: string) => void;
}

const ProjectTitle: React.FC<{ title: string }> = ({ title }) => (
  <>
    {title}
    {title === 'JWB CORE' && (
      <sup className="ml-0.5 text-[0.45em] align-super tracking-normal">™</sup>
    )}
  </>
);

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  open: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] as const },
  },
};

export const Projects: React.FC<ProjectsProps> = ({ experienceSectionRef, onProjectClick }) => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const edgePathRef = useRef<SVGPathElement>(null);
  const edgeShadowPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const transition = transitionRef.current;
    const edgePath = edgePathRef.current;
    const edgeShadowPath = edgeShadowPathRef.current;
    if (!transition || !edgePath || !edgeShadowPath) return;

    let frame = 0;
    const updateTransition = () => {
      frame = 0;
      const projects = projectsRef.current;
      if (!projects) return;

      const width = transition.getBoundingClientRect().width;
      const curveDepth = Math.min(
        Math.max(width * CURVE_AMPLITUDE_RATIO, MIN_CURVE_DEPTH),
        MAX_CURVE_DEPTH,
      );
      const transitionTop = projects.getBoundingClientRect().bottom - EDGE_HEIGHT;
      const progress = Math.min(
        Math.max((window.innerHeight - transitionTop) / window.innerHeight, 0),
        1,
      );
      const currentDepth = curveDepth * (1 - progress);
      const curvePath = `M0 0 Q${width / 2} ${currentDepth} ${width} 0`;
      const fillPath = `M0 ${-EXPERIENCE_REVEAL_DISTANCE} H${width} V0 Q${width / 2} ${currentDepth} 0 0 Z`;

      transition
        .querySelector('svg')
        ?.setAttribute(
          'viewBox',
          `0 ${-EXPERIENCE_REVEAL_DISTANCE} ${width} ${EXPERIENCE_REVEAL_DISTANCE + EDGE_HEIGHT}`,
        );
      edgePath.setAttribute('d', fillPath);
      edgeShadowPath.setAttribute('d', curvePath);
      transition.style.transform = `translateY(${progress * EDGE_HEIGHT}px)`;

      if (experienceSectionRef.current) {
        experienceSectionRef.current.style.transform = `translateY(${progress * EXPERIENCE_REVEAL_DISTANCE}px)`;
      }
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
      if (experienceSectionRef.current) {
        experienceSectionRef.current.style.transform = '';
      }
    };
  }, []);

  // track mouse position over projects list with fluid inertia
  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', { duration: 0.85, ease: 'power2.out' });
    const yMoveContainer = gsap.quickTo(modalContainer.current, 'top',  { duration: 0.85, ease: 'power2.out' });
    const xMoveCursor    = gsap.quickTo(cursor.current, 'left', { duration: 0.55, ease: 'power2.out' });
    const yMoveCursor    = gsap.quickTo(cursor.current, 'top',  { duration: 0.55, ease: 'power2.out' });
    const move = (e: MouseEvent) => {
      xMoveContainer(e.clientX);
      yMoveContainer(e.clientY);
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div ref={projectsRef} className="relative z-10 w-full pb-[200px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[200px] z-0 bg-white" />
      <div
        ref={transitionRef}
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[560px] w-screen"
        style={{ marginLeft: '-50vw' }}
        aria-hidden="true"
      >
        <svg
          className="block h-full w-full overflow-visible"
          viewBox="0 -360 1600 560"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="projects-curve-shadow"
              x="-10%"
              y="-100%"
              width="120%"
              height="400%"
              colorInterpolationFilters="sRGB"
            >
              <feDropShadow
                dx="0"
                dy="18"
                stdDeviation="14"
                floodColor="#000000"
                floodOpacity="0.8"
              />
            </filter>
          </defs>
          <path
            ref={edgePathRef}
            fill="#ffffff"
            d="M0 -300 H1600 V0 Q800 120 0 0 Z"
          />
          <path
            ref={edgeShadowPathRef}
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            filter="url(#projects-curve-shadow)"
            d="M0 0 Q800 120 1600 0"
          />
        </svg>
      </div>
      <section
        id="projects"
        className="relative z-10 py-16 px-6 sm:px-12 max-w-7xl mx-auto"
      >
      {/* Dennis Snellenberg 'RECENT WORK' header */}
      <div className="mb-10 sm:mb-14">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gray-400 font-medium block">
          Recent Work
        </span>
      </div>

      {/* ── Mobile layout: visible square cards with centered rectangle video ── */}
      <div className="md:hidden flex flex-col gap-14 sm:gap-16">
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => onProjectClick(project.title)}
            className="flex flex-col group text-inherit no-underline select-none"
          >
            {/* Square box with project background color and centered landscape rectangle video inside */}
            <div
              className="w-full aspect-square flex items-center justify-center p-6 sm:p-8 rounded-none overflow-hidden shadow-sm"
              style={{ backgroundColor: project.color }}
            >
              {project.video && (
                <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-black shadow-xl">
                  <video
                    src={project.video}
                    muted
                    playsInline
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <h3
              className="text-3xl sm:text-4xl font-normal text-[#1c1d20] mt-6 mb-3 tracking-tight"
              style={{
                fontFamily:
                  "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif",
              }}
            >
              <ProjectTitle title={project.title} />
            </h3>

            {/* Divider line & details */}
            <div className="pt-3 border-t border-black/10 flex items-center justify-between text-sm sm:text-base text-[#1c1d20] font-normal">
              <span>{project.category}</span>
              <span className="font-mono text-xs sm:text-sm text-gray-500">{project.year}</span>
            </div>
          </a>
        ))}
      </div>

      {/* ── Desktop layout: hover list rows with sliding modal ── */}
      <div
        className="hidden md:flex w-full flex-col divide-y divide-black/10 border-t border-b border-black/10"
        onMouseLeave={() => setModal((prev) => ({ ...prev, active: false }))}
      >
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => onProjectClick(project.title)}
            onMouseEnter={() => setModal({ active: true, index: idx })}
            onMouseMove={() => setModal((prev) => (prev.active && prev.index === idx ? prev : { active: true, index: idx }))}
            className="group py-10 sm:py-14 flex items-center justify-between transition-all duration-500 cursor-pointer select-none text-inherit no-underline"
          >
            <div className="flex items-center gap-4 transition-transform duration-500 group-hover:translate-x-4">
              <h3
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#1c1d20] tracking-[-0.03em] transition-colors duration-300 group-hover:text-gray-400"
                style={{
                  fontFamily:
                    "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
                }}
              >
                <ProjectTitle title={project.title} />
              </h3>
            </div>

            <div className="flex items-center gap-4 transition-transform duration-500 group-hover:-translate-x-4">
              <span
                className="text-sm sm:text-base md:text-lg text-[#1c1d20] font-normal transition-colors duration-300 group-hover:text-gray-500"
                style={{
                  fontFamily:
                    "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif",
                }}
              >
                {project.category}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* hover card preview modal — slower, cinematic vertical sliding carousel (Desktop only) */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? 'open' : 'closed'}
        className="hidden md:block fixed top-0 left-0 w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-none overflow-hidden pointer-events-none z-40 shadow-2xl"
      >
        <div
          className="w-full h-full relative transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
          style={{ transform: `translateY(-${modal.index * 100}%)` }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="w-full h-full flex items-center justify-center p-6 sm:p-8"
              style={{ backgroundColor: project.color }}
            >
              {project.video ? (
                <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-black shadow-xl">
                  <video
                    src={project.video}
                    muted
                    playsInline
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-end justify-between">
                    <p
                      className="text-white text-sm sm:text-base font-normal leading-tight"
                      style={{
                        fontFamily:
                          "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
                      }}
                    >
                      <ProjectTitle title={project.title} />
                    </p>
                    <span className="text-xs font-mono text-white/70">{project.year}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-[16/10] rounded-sm bg-[#141516] text-white flex items-center justify-center shadow-xl">
                  <span className="text-lg sm:text-xl tracking-tight">
                    <ProjectTitle title={project.title} />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* floating view button badge */}
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? 'open' : 'closed'}
        className="hidden md:flex fixed top-0 left-0 w-20 h-20 rounded-full bg-[#455ce9] text-white items-center justify-center text-sm font-normal pointer-events-none z-50 shadow-2xl"
        style={{
          fontFamily:
            "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        View
      </motion.div>

      {/* More work button — exactly matching screenshot */}
      <div className="mt-16 sm:mt-24 flex justify-center">
        <Magnetic strength={0.35}>
          <a
            href="https://github.com/Benjaminax?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="px-9 py-4 sm:px-12 sm:py-5 rounded-full border border-black/20 bg-white text-[#1c1d20] hover:bg-[#1c1d20] hover:text-white hover:border-[#1c1d20] text-sm sm:text-base font-normal transition-all duration-400 inline-flex items-center gap-1.5 shadow-sm hover:shadow-xl cursor-pointer select-none"
            style={{
              fontFamily:
                "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif",
            }}
          >
            <span>More work</span>
            <sup className="text-[11px] text-gray-500 font-normal">7</sup>
          </a>
        </Magnetic>
      </div>
    </section>
    </div>
  );
};

export default Projects;
