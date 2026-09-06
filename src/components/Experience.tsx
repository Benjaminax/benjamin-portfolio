import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2024 — PRESENT',
    role: 'Senior Creative Developer',
    company: 'Studio Elevate',
    location: 'London, UK (Hybrid)',
    description:
      'Leading frontend architecture for premium digital products, interactive 3D web applications, and high-performance design systems.',
    highlights: ['WebGL & Three.js', 'Design System Architecture', 'Team Mentorship', 'Performance Tuning'],
  },
  {
    period: '2022 — 2024',
    role: 'UI/UX & Frontend Engineer',
    company: 'Apex Digital Agency',
    location: 'London, UK',
    description:
      'Engineered interactive web applications, client portals, and micro-interactions for global fintech and luxury lifestyle brands.',
    highlights: ['React & Next.js', 'Framer Motion', 'Accessibility (WCAG 2.1)', 'A/B Testing'],
  },
  {
    period: '2021 — 2022',
    role: 'Interactive Product Designer',
    company: 'Craft & Code Co.',
    location: 'Remote',
    description:
      'Redesigned digital brand identities, wireframed responsive user flows, and turned high-fidelity Figma designs into pixel-perfect code.',
    highlights: ['Figma Prototyping', 'Design Tokens', 'User Research', 'Tailwind CSS'],
  },
  {
    period: '2020 — 2021',
    role: 'Junior Web Developer & Intern',
    company: 'TechSphere Labs',
    location: 'Manchester, UK',
    description:
      'Assisted in building reusable UI component libraries, optimizing asset delivery, and implementing responsive layouts across mobile & desktop.',
    highlights: ['JavaScript / TypeScript', 'HTML5 / CSS3', 'Git Workflows', 'CI/CD Pipelines'],
  },
];

// Radius scales proportionally with viewport so it looks correct on every screen
const getStartRadius = () => {
  const w = window.innerWidth;
  if (w < 640) return '40px';   // mobile
  if (w < 1024) return '60px';  // tablet
  return '80px';                 // desktop
};

export const Experience: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        {
          borderTopLeftRadius: getStartRadius(),
          borderTopRightRadius: getStartRadius(),
        },
        {
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'top 40%',
            scrub: 1,
            // Recalculate radius on resize so it stays proportional
            invalidateOnRefresh: true,
            onRefresh: () => {
              const r = getStartRadius();
              gsap.set(wrapper, {
                borderTopLeftRadius: r,
                borderTopRightRadius: r,
              });
            },
          },
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ borderTopLeftRadius: getStartRadius(), borderTopRightRadius: getStartRadius() }}
      className="bg-white overflow-hidden"
    >
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block font-medium">
              Career Timeline
            </span>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#1c1d20] tracking-[-0.03em]"
              style={{
                fontFamily:
                  "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
              }}
            >
              Experience &amp; Background
            </h2>
          </div>
          <p className="text-gray-600 text-sm max-w-xs sm:max-w-md font-light leading-relaxed">
            A summary of my professional journey, key milestones, and roles in creative design and frontend engineering.
          </p>
        </div>

        {/* Timeline list */}
        <div className="space-y-4 sm:space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-[#f8f9fa] border border-black/[0.08]
                         hover:border-black/20 rounded-2xl
                         p-5 sm:p-7 lg:p-8
                         transition-all duration-500 hover:shadow-xl cursor-pointer"
            >
              {/* On desktop: 3-col grid. On mobile: stacked. */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start">

                {/* Meta — period + location */}
                <div className="sm:col-span-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                  bg-black/5 text-[#1c1d20] text-xs font-mono font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5 opacity-60 shrink-0" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-light">
                    <MapPin className="w-3.5 h-3.5 opacity-60 shrink-0" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Main content */}
                <div className="sm:col-span-8 lg:col-span-7">
                  <div className="flex items-start gap-3 mb-2">
                    <Briefcase className="w-4 h-4 text-[#455ce9] shrink-0 mt-1" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-[#1c1d20]
                                   tracking-tight group-hover:text-[#455ce9]
                                   transition-colors duration-300 leading-snug">
                      {exp.role}{' '}
                      <span className="text-gray-400 font-light">@ {exp.company}</span>
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm font-light leading-relaxed mb-4 pl-7">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pl-7">
                    {exp.highlights.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-light px-2.5 py-1 rounded-full
                                   bg-white text-gray-700 border border-black/10 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow — hidden on smallest screens, visible sm+ */}
                <div className="hidden sm:flex lg:col-span-2 justify-end items-start pt-1">
                  <Magnetic strength={0.25}>
                    <div className="w-11 h-11 rounded-full bg-white border border-black/10
                                    flex items-center justify-center text-[#1c1d20]
                                    group-hover:bg-[#455ce9] group-hover:text-white
                                    group-hover:border-[#455ce9]
                                    transition-all duration-300 shadow-sm shrink-0">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300
                                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Magnetic>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;
