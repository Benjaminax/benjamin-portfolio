import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseCard {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
}

const SHOWCASE_ITEMS: ShowcaseCard[] = [
  {
    id: 1,
    title: 'Aura Spatial Engine',
    category: 'Creative Dev & WebGL',
    year: '2026',
    description: 'Immersive 3D web experience built with Three.js, custom GLSL shaders, and spatial audio.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    tags: ['WebGL', 'GLSL', 'Three.js'],
  },
  {
    id: 2,
    title: 'Monolith Architecture',
    category: 'Design & Development',
    year: '2025',
    description: 'Minimalist editorial architecture flagship celebrating crisp grid design and typography.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    tags: ['Architecture', 'Editorial', 'Design System'],
  },
  {
    id: 3,
    title: 'Kroma Studio Editorial',
    category: 'Concept & Development',
    year: '2025',
    description: 'High-conversion digital storefront with micro-interactions, dark mode, and physics transitions.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
  },
  {
    id: 4,
    title: 'Velox Kinetic Studio',
    category: 'Interaction & Motion',
    year: '2024',
    description: 'Generative interactive canvas experiment mapping mouse dynamics to real-time particles.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    tags: ['Canvas API', 'Typography', 'Physics'],
  },
];

export const HorizontalShowcase: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // gsap scrolltrigger horizontal track pin
  useEffect(() => {
    const ctx = gsap.context(() => {
      const component = componentRef.current;
      const slider = sliderRef.current;
      if (!component || !slider) return;

      const getScrollAmount = () => {
        const sliderWidth = slider.scrollWidth;
        return -(sliderWidth - window.innerWidth + 120);
      };

      gsap.to(slider, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: component,
          start: 'top top',
          end: () => `+=${slider.scrollWidth - window.innerWidth + 300}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="relative w-full overflow-hidden bg-[#141516] text-white">
      <div className="h-screen flex flex-col justify-center overflow-hidden py-12">
        <div className="px-8 sm:px-16 mb-8 max-w-7xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#455ce9]" />
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Featured Gallery
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-normal tracking-tight text-white"
            style={{
              fontFamily:
                "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
            }}
          >
            Horizontal Showcase
          </h2>
        </div>

        {/* cards slide container */}
        <div ref={sliderRef} className="flex gap-8 sm:gap-12 px-8 sm:px-16 will-change-transform w-max">
          {SHOWCASE_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-[80vw] sm:w-[540px] md:w-[620px] h-[55vh] max-h-[520px] shrink-0 rounded-3xl bg-[#1c1d20] border border-white/10 overflow-hidden flex flex-col justify-between p-8 sm:p-10 group shadow-2xl"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d20] via-[#1c1d20]/50 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400 border border-white/15 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
                  0{item.id} / 0{SHOWCASE_ITEMS.length}
                </span>
                <span className="text-xs font-mono text-gray-300">{item.year}</span>
              </div>

              <div className="relative z-10 flex flex-col gap-4 mt-auto">
                <span className="text-xs uppercase tracking-wider text-[#455ce9] font-medium">
                  {item.category}
                </span>
                <h3
                  className="text-2xl sm:text-4xl font-normal text-white tracking-tight"
                  style={{
                    fontFamily:
                      "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm font-light max-w-md line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-light px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Magnetic strength={0.3}>
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#455ce9] group-hover:text-white transition-colors duration-300 shadow-lg">
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
