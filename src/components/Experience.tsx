import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

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

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-black/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 block font-medium">
            Career Timeline
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#1c1d20] tracking-[-0.03em]"
            style={{
              fontFamily:
                "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
            }}
          >
            Experience &amp; Background
          </h2>
        </div>
        <p className="text-gray-600 text-sm max-w-md font-light leading-relaxed">
          A summary of my professional journey, key milestones, and roles in creative design and frontend engineering.
        </p>
      </div>

      {/* timeline list */}
      <div className="space-y-6">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative bg-[#f8f9fa] border border-black/[0.08] hover:border-black/20 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-[#1c1d20] text-xs font-mono font-medium mb-3">
                  <Calendar className="w-3.5 h-3.5 opacity-60" />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-light mt-1">
                  <MapPin className="w-3.5 h-3.5 opacity-60" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-4 h-4 text-[#455ce9]" />
                  <h3 className="text-xl sm:text-2xl font-normal text-[#1c1d20] tracking-tight group-hover:text-[#455ce9] transition-colors duration-300">
                    {exp.role} <span className="text-gray-400 font-light">@ {exp.company}</span>
                  </h3>
                </div>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-light px-2.5 py-1 rounded-full bg-white text-gray-700 border border-black/10 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center h-full">
                <Magnetic strength={0.25}>
                  <div className="w-12 h-12 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#1c1d20] group-hover:bg-[#455ce9] group-hover:text-white group-hover:border-[#455ce9] transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
