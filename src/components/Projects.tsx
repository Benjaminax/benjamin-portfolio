import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Magnetic } from './Magnetic';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  year: string;
  tags: string[];
  video: string;
}

const projects: Project[] = [
  {
    title: 'Aura Spatial Engine',
    category: 'Creative Dev & WebGL',
    year: '2026',
    tags: ['WebGL', 'GLSL', 'Three.js'],
    video: '/videos/project1.mp4',
  },
  {
    title: 'Monolith Architecture',
    category: 'Design & Development',
    year: '2025',
    tags: ['Architecture', 'Editorial', 'Interactions'],
    video: '/videos/project2.mp4',
  },
  {
    title: 'Kroma Studio Editorial',
    category: 'Concept & Development',
    year: '2025',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    video: '/videos/project3.mp4',
  },
  {
    title: 'Velox Kinetic Studio',
    category: 'Interaction & Motion',
    year: '2024',
    tags: ['Canvas API', 'Typography', 'Physics'],
    video: '/videos/project4.mp4',
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  open: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] as const },
  },
};

const SKIP_INTRO = 2; // skip intro padding
const PLAYBACK_RATE = 1.5; // video speed
const LOOP_BUFFER = 0.5; // smooth loop buffer

export const Projects: React.FC = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // track mouse position over projects list
  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', { duration: 0.7, ease: 'power3.out' });
    const yMoveContainer = gsap.quickTo(modalContainer.current, 'top',  { duration: 0.7, ease: 'power3.out' });
    const xMoveCursor    = gsap.quickTo(cursor.current, 'left', { duration: 0.45, ease: 'power3.out' });
    const yMoveCursor    = gsap.quickTo(cursor.current, 'top',  { duration: 0.45, ease: 'power3.out' });
    const move = (e: MouseEvent) => {
      xMoveContainer(e.clientX);
      yMoveContainer(e.clientY);
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // update video source on project hover
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.pause();
    v.src = projects[modal.index].video;
    v.load();
    v.playbackRate = PLAYBACK_RATE;

    const onReady = () => {
      v.currentTime = SKIP_INTRO;
      v.playbackRate = PLAYBACK_RATE;
      v.play().catch(() => {});
    };
    v.addEventListener('canplay', onReady, { once: true });
    return () => v.removeEventListener('canplay', onReady);
  }, [modal.index]);

  // seamless video loop logic
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (v.currentTime >= v.duration - LOOP_BUFFER) {
      v.currentTime = SKIP_INTRO;
    }
  };

  const activeProject = projects[modal.index];

  return (
    <section id="projects" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-black/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block font-medium">
            Recent Work
          </span>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#1c1d20] tracking-tight"
            style={{
              fontFamily:
                "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, 'Plus Jakarta Sans', Arial, sans-serif",
            }}
          >
            Selected Projects
          </h2>
        </div>
        <p className="text-gray-600 text-sm max-w-xs mt-4 sm:mt-0 font-light">
          A showcase of digital flagships, interaction design, and creative code.
        </p>
      </div>

      {/* project rows list */}
      <div
        className="w-full flex flex-col divide-y divide-black/10 border-b border-black/10"
        onMouseLeave={() => setModal((prev) => ({ ...prev, active: false }))}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setModal({ active: true, index: idx })}
            className="group py-10 sm:py-14 flex items-center justify-between transition-all duration-500 cursor-pointer select-none"
          >
            <div className="flex items-center gap-4 transition-transform duration-500 group-hover:translate-x-4">
              <h3
                className="text-2xl sm:text-4xl md:text-5xl font-normal text-[#1c1d20] transition-colors duration-300 group-hover:text-gray-500"
                style={{
                  fontFamily:
                    "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
                }}
              >
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-6 sm:gap-12 transition-transform duration-500 group-hover:-translate-x-4">
              <span className="text-sm sm:text-base text-gray-600 font-light hidden sm:inline">
                {project.category}
              </span>
              <span className="text-xs sm:text-sm font-mono text-gray-400">
                {project.year}
              </span>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#1c1d20] transition-colors duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* hover card preview modal */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? 'open' : 'closed'}
        className="fixed top-0 left-0 w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] bg-[#373839] rounded-none overflow-hidden pointer-events-none z-40 shadow-2xl flex items-center justify-center p-7 sm:p-9"
      >
        <div className="relative w-full h-full rounded-sm overflow-hidden bg-black shadow-lg">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
            <p
              className="text-white text-base font-normal leading-tight"
              style={{
                fontFamily:
                  "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
              }}
            >
              {activeProject.title}
            </p>
            <span className="text-xs font-mono text-white/70">{activeProject.year}</span>
          </div>
        </div>
      </motion.div>

      {/* floating view button badge */}
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? 'open' : 'closed'}
        className="fixed top-0 left-0 w-20 h-20 rounded-full bg-[#455ce9] text-white flex items-center justify-center text-sm font-normal pointer-events-none z-50 shadow-2xl"
        style={{
          fontFamily:
            "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        View
      </motion.div>

      <div className="mt-20 flex justify-center">
        <Magnetic strength={0.35}>
          <a
            href="#projects"
            className="px-10 py-5 rounded-full border border-black/15 bg-white text-[#1c1d20] hover:bg-[#455ce9] hover:text-white hover:border-[#455ce9] text-base font-normal transition-all duration-500 inline-flex items-center gap-3 shadow-md hover:shadow-xl cursor-pointer group"
          >
            <span>More work</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">4</span>
          </a>
        </Magnetic>
      </div>
    </section>
  );
};

export default Projects;
