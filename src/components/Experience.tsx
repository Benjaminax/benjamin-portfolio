import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface ExperienceItem {
  company: string;
  location: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'Naqvid Ltd',
    location: 'Remote/Onsite (Texas, USA)',
  },
  {
    company: '11TechWave',
    location: 'Remote (Accra, Ghana)',
  },
  {
    company: 'Voltix eg',
    location: 'Remote (Sadat City, Egypt)',
  },
];

export const Experience: React.FC = () => {
  return (
    <div className="bg-[#141516] overflow-clip">
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-5 sm:gap-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-gray-400 mb-3 block font-medium">
              Career Timeline
            </span>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#f4f4f5] tracking-[-0.04em]"
              style={{
                fontFamily:
                  "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
              }}
            >
              Experience &amp; Background
            </h2>
          </div>
        </div>

        {/* Company and location list */}
        <div className="border-t border-white/10">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col gap-2 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6"
            >
              <h3 className="text-lg font-normal tracking-tight text-[#f4f4f5] sm:text-xl">
                {exp.company}
              </h3>
              <p className="inline-flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#a374ff]" aria-hidden="true" />
                {exp.location}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;
