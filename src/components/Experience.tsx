import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin } from 'lucide-react';
import resumePdf from './assets/Benjamin_Acheampong_SWE_Resume.pdf';

interface ExperienceProps {
  detailed?: boolean;
  onNavigate?: (href: string, label: string) => void;
}

interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  dates: string;
  highlights: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'Voltix eg',
    location: 'Remote (Sadat City, Egypt)',
    role: 'Software Developer Intern',
    dates: 'September 2026 – October 2026',
    highlights: [
      'Engineered a React and TypeScript healthcare analytics dashboard for PainSignal, implementing 12 responsive interfaces with Tailwind CSS, Context API, GSAP, and Framer Motion from design mockups.',
      'Built a reusable component system with 25+ shared UI primitives and design tokens, reducing duplicated frontend code and improving consistency across application interfaces.',
      'Optimized frontend performance with code splitting, lazy loading, and image optimization, reducing initial load time by 40% and increasing Lighthouse performance from 68 to 92.',
    ],
  },
  {
    company: 'Naqvid Ltd',
    location: 'Remote (Texas, USA)',
    role: 'Software Developer Intern',
    dates: 'July 2026 – August 2026',
    highlights: [
      'Built a RAG chatbot for a Ghana Stock Exchange trading platform using OpenAI embeddings, PostgreSQL/pgvector, and semantic search, indexing 1,800+ documents with metadata filtering and top-k retrieval for context-aware responses.',
      'Translated Ghana CSD and ISO compliance requirements into backend validation rules covering 20+ trading and settlement scenarios, integrating regulatory checks directly into product workflows.',
      'Developed AI-powered fintech features with a distributed engineering team using Python, REST APIs, Git, and code reviews, contributing across implementation, testing, and technical documentation.',
    ],
  },
  {
    company: '11TechWeave',
    location: 'Remote (Accra, Ghana)',
    role: 'Software Developer Intern',
    dates: 'May 2026 – June 2026',
    highlights: [
      'Engineered a React and TypeScript healthcare analytics dashboard for PainSignal, implementing 12 responsive interfaces with Tailwind CSS, Context API, GSAP, and Framer Motion from design mockups.',
      'Built a reusable component system with 25+ shared UI primitives and design tokens, reducing duplicated frontend code and improving consistency across application interfaces.',
      'Optimized frontend performance with code splitting, lazy loading, and image optimization, reducing initial load time by 40% and increasing Lighthouse performance from 68 to 92.',
    ],
  },
];

const EXPERIENCE_BACKGROUND = [
  'I’m Benjamin, a developer from Ghana. I didn’t start with a clear roadmap or knowing exactly where I was going. I started with curiosity, a laptop, and a lot of things I didn’t know how to build.',
  'There were times I doubted myself. I would see what other developers were creating and wonder if I was good enough to do the same. Some problems felt too difficult, and some technologies took me much longer to understand than I wanted. But I kept building.',
  'I started with games and small applications, learning mostly by trying, failing, and trying again. Eventually, that persistence led me to opportunities where I could learn from real projects and real people.',
  'At Naqvid, I learned how important accuracy and context are. Building a RAG system around thousands of Ghana Stock Exchange documents taught me that working with AI is not simply about getting an answer. It is about making sure the answer is grounded in the right information.',
  'At 11TechWeave, I learned to think beyond the code. Building interfaces with React and TypeScript showed me how much thought goes into making something feel simple and natural. I began to understand that good software is not only functional. It should also be easy for people to use.',
  'At Voltix, I stepped further outside engineering and worked with design and user experience. That taught me to look at technology from the perspective of the person using it, not just the person building it.',
  'Each experience changed the way I think. I became more patient with difficult problems, more comfortable with uncertainty, and more willing to learn what I don’t know.',
  'I’m still learning. I still struggle with things. I still have moments where I question myself.',
  'But now I understand that not knowing something is not a reason to stop. It is usually where the real learning begins.',
  'I build because I’m curious about what is possible. I question things because I don’t believe something should be done a certain way simply because it has always been done that way.',
  'I’m still figuring things out.',
  'But I’m still building.',
];

export const Experience: React.FC<ExperienceProps> = ({ detailed = false, onNavigate }) => {
  const experienceStory = [...EXPERIENCES].reverse();

  return (
    <div className="bg-[#141516] overflow-clip">
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className={`mb-10 flex flex-col gap-5 sm:mb-14 ${detailed ? 'sm:flex-row sm:items-end sm:justify-between' : ''}`}>
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-gray-400 mb-3 block font-medium">
              {detailed ? 'The journey so far' : 'Career Timeline'}
            </span>
            <h2
              className="text-3xl font-normal tracking-[-0.04em] text-[#f4f4f5] sm:text-5xl md:text-6xl"
              style={{
                fontFamily:
                  "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
              }}
            >
              {detailed ? 'Experience' : 'Experience & Background'}
            </h2>
          </div>
          {detailed && (
            <p className="text-sm text-white/45">{String(EXPERIENCES.length).padStart(2, '0')} roles</p>
          )}
        </div>

        {detailed ? (
          <>
            <section className="mb-12 grid gap-8 border-y border-white/10 py-8 sm:mb-16 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-14 sm:py-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#a374ff]">Background</p>
                <h3 className="mt-4 max-w-xs text-3xl font-normal leading-tight tracking-[-0.05em] text-white sm:text-4xl">
                  Curiosity, persistence, and learning by building.
                </h3>
              </div>
              <div className="space-y-5">
                {EXPERIENCE_BACKGROUND.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`max-w-2xl text-sm leading-[1.85] sm:text-base ${
                      index >= EXPERIENCE_BACKGROUND.length - 2
                        ? 'text-white'
                        : 'text-white/65'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
            <a
              href={resumePdf}
              download="Benjamin_Acheampong_SWE_Resume.pdf"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white/80 transition-colors hover:border-white/50 hover:text-white sm:mb-14"
            >
              Download résumé
              <Download className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <div className="space-y-4 sm:space-y-5">
            {experienceStory.map((exp, index) => (
              <motion.article
                key={exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04] sm:p-7"
              >
                <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-[#a374ff]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl font-normal tracking-[-0.04em] text-white sm:text-3xl">
                        {exp.company}
                      </h3>
                    </div>
                    <p className="text-sm text-white/75">{exp.role}</p>
                    <p className="mt-1 text-sm text-white/45">{exp.location}</p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65">
                    {exp.dates}
                  </span>
                </div>
                <ul className="space-y-3 sm:pl-6">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-[1.7] text-white/70 sm:text-[15px]">
                      <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#a374ff]" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
            </div>
          </>
        ) : (
          <div className="border-t border-white/10">
            {EXPERIENCES.map((exp, index) => (
              <motion.button
                type="button"
                key={exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => onNavigate?.('/experience', 'Experience')}
                className="flex w-full cursor-pointer flex-col gap-2 border-b border-white/10 py-5 text-left sm:flex-row sm:items-center sm:justify-between sm:py-6"
              >
                <h3 className="text-lg font-normal tracking-tight text-[#f4f4f5] sm:text-xl">
                  {exp.company}
                </h3>
                <p className="inline-flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#a374ff]" aria-hidden="true" />
                  {exp.location}
                </p>
              </motion.button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Experience;
