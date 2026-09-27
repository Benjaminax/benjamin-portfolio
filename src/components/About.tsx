import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { useHoverCapability } from '../hooks/useHoverCapability';

const statementLines = [
  'Helping brands to stand out in the digital era.',
  'Together we will set the new status quo. No',
  'nonsense, always on the cutting edge.',
];

const secondaryLines = [
  'The combination of my passion',
  'for design, code & interaction',
  'positions me in a unique place in',
  'the web design world.',
];

const services = [
  {
    num: '01',
    title: 'Backend & Systems',
    description:
      'Designing high-throughput microservices, compliance verification engines, and scalable distributed architectures with rigorous testing and clean pipelines.',
    tags: ['TypeScript & Node.js', 'Python & Go', 'REST & GraphQL', 'Docker & CI/CD'],
  },
  {
    num: '02',
    title: 'Interactive Web & AI',
    description:
      'Engineering fast-paced interactive web applications, client-side WASM document tooling, state persistence engines, and LLM text analysis workflows.',
    tags: ['React & Next.js', 'WASM & OCR', 'Framer Motion & GSAP', 'Tailwind CSS'],
  },
  {
    num: '03',
    title: 'Game Dev & Engines',
    description:
      'Architecting real-time simulation logic, hitscan line-trace mechanics, AI behavior trees, and GC-optimized object pooling in Unreal Engine and Unity.',
    tags: ['Unreal Engine 5.7', 'C++ & Blueprints', 'Unity & C#', 'AI Behavior Trees'],
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
  const canHover = useHoverCapability();
  const [hasHoveredAboutButton, setHasHoveredAboutButton] = useState(false);
  const [aboutButtonLabelOffset, setAboutButtonLabelOffset] = useState({ x: 0, y: 0 });

  // Inject button styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .animated-button {
        font-family: 'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: -0.02em;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="about" className="pt-12 pb-24 sm:pt-16 sm:pb-32 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* line-by-line text reveal */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="lg:col-span-8">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-normal text-[#1c1d20] leading-[1.3] tracking-[-0.02em]"
            style={{
              fontFamily:
                "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif",
            }}
          >
            {statementLines.map((line, i) => (
              <span key={i} className="block overflow-hidden py-0.5">
                <motion.span className="block whitespace-normal lg:whitespace-nowrap" variants={lineVariants}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between h-full pt-1.5">
          <p
            className="text-base sm:text-lg text-[#1c1d20]/80 font-normal leading-[1.5] tracking-tight mb-8 sm:mb-10"
            style={{
              fontFamily:
                "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif",
            }}
          >
            {secondaryLines.map((line, i) => (
              <span key={i} className="block overflow-hidden py-0.5">
                <motion.span className="block whitespace-pre-line" variants={lineVariants}>
                  {line}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.div
            className="self-end sm:self-auto"
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
                onPointerEnter={(event) => {
                  if (canHover && event.pointerType === 'mouse') setHasHoveredAboutButton(true);
                }}
                onPointerMove={(event: React.PointerEvent<HTMLAnchorElement>) => {
                  if (!canHover || event.pointerType !== 'mouse') return;

                  const bounds = event.currentTarget.getBoundingClientRect();
                  setAboutButtonLabelOffset({
                    x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 16,
                    y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 16,
                  });
                }}
                onPointerLeave={() => setAboutButtonLabelOffset({ x: 0, y: 0 })}
                className={`animated-button relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#1c1d20] text-white flex items-center justify-center shadow-xl cursor-pointer select-none overflow-hidden group about-button${hasHoveredAboutButton ? ' has-hovered' : ''}`}
              >
                <span className="button-bg absolute top-0 left-0 w-full h-full rounded-full overflow-hidden">
                  <span className="button-bg-layers absolute left-1/2 top-1/2 aspect-square w-[240%] -translate-x-1/2 -translate-y-1/2">
                    <span className="about-button-layer about-button-layer-1 bg-[#a374ff] rounded-full absolute top-0 left-0 w-full h-full" />
                  </span>
                </span>
                <span
                  className="relative z-10 text-base font-normal tracking-tight transition-transform duration-150 ease-out"
                  style={{
                    transform: `translate(${aboutButtonLabelOffset.x}px, ${aboutButtonLabelOffset.y}px)`,
                    fontFamily:
                      "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif",
                  }}
                >
                  About me
                </span>
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
              whileHover={canHover ? { y: -10, scale: 1.02, rotateX: 3, rotateY: -3 } : undefined}
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
