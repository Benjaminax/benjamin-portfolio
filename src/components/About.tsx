import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { ArrowUpRight } from 'lucide-react';

const statementLines = [
  'Helping brands thrive in the digital',
  'world. Located in the United',
  'Kingdom. Delivering tailor-made',
  'digital designs and building',
  'interactive websites from scratch.',
];

const secondaryLines = [
  'The combination of my passion for design,',
  'code & interaction positions me in a unique',
  'place in the web design world.',
];

const services = [
  {
    num: '01',
    title: 'Design',
    description:
      'With a solid track record in designing websites and digital products, I deliver strong and user-friendly digital designs with crisp typographic balance.',
    tags: ['UI/UX Design', 'Design Systems', 'Typography', 'Wireframing'],
  },
  {
    num: '02',
    title: 'Development',
    description:
      'I build accessible, responsive, scalable websites and interactive experiences from scratch with fluid animations, physics, and modern tech stacks.',
    tags: ['React & Next.js', 'Creative Dev & WebGL', 'GSAP & Motion', 'Tailwind'],
  },
  {
    num: '03',
    title: 'The Full Package',
    description:
      'A comprehensive digital presence from concept to production. Perfect for startups and visionary brands looking to make a lasting digital impact.',
    tags: ['Art Direction', 'Prototyping', 'Performance', 'SEO & Strategy'],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const lineVariants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: {
      duration: 1.15,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* line-by-line text reveal */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="lg:col-span-8">
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-normal text-[#1c1d20] leading-[1.28] tracking-[-0.02em]"
            style={{
              fontFamily:
                "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, 'Plus Jakarta Sans', Arial, sans-serif",
            }}
          >
            {statementLines.map((line, i) => (
              <span key={i} className="block overflow-hidden py-1">
                <motion.span className="block" variants={lineVariants}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2">
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed mb-10">
            {secondaryLines.map((line, i) => (
              <span key={i} className="block overflow-hidden py-0.5">
                <motion.span className="block" variants={lineVariants}>
                  {line}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.div
            className="self-start sm:self-auto"
            variants={{
              hidden: { scale: 0.2, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: { type: 'spring', stiffness: 280, damping: 24, delay: 0.2 },
              },
            }}
          >
            <Magnetic strength={0.35}>
              <a
                href="#contact"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#1c1d20] border border-black/10 text-white flex flex-col items-center justify-center gap-1 group hover:bg-[#455ce9] hover:border-[#455ce9] transition-all duration-500 shadow-xl cursor-pointer select-none"
              >
                <span className="text-base font-normal tracking-tight group-hover:scale-105 transition-transform duration-300">
                  About me
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* capabilities cards */}
      <div className="border-t border-black/10 pt-16">
        <span className="text-xs uppercase tracking-widest text-gray-500 mb-8 block font-medium">
          Capabilities &amp; Services
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {services.map((service) => (
            <motion.div
              key={service.num}
              whileHover={{ y: -10, scale: 1.02, rotateX: 3, rotateY: -3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group p-8 rounded-2xl bg-[#f8f9fa] border border-black/[0.08] hover:border-black/20 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <span className="text-xs font-mono text-gray-400 block mb-6">
                  {service.num}
                </span>
                <h3
                  className="text-2xl font-normal text-[#1c1d20] mb-4 tracking-tight group-hover:text-[#455ce9] transition-colors duration-300"
                  style={{
                    fontFamily:
                      "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
                  }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06]">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-light px-2.5 py-1 rounded-full bg-white text-gray-700 border border-black/10 shadow-sm group-hover:border-[#455ce9]/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
