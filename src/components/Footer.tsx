import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';

interface FooterProps {
  animateHeadingOnScroll?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  animateHeadingOnScroll = false,
}) => {
  const [time, setTime] = useState('');

  // clock timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Accra',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="relative w-full bg-[#141516] text-white select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-12 sm:pt-16 pb-12">
        {/* contact banner */}
        <div className="border-b border-white/10 pb-12 sm:pb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-light text-gray-300">
              Available for freelance opportunities
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-12 relative">
            <motion.h2
              className="text-[2.75rem] sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[-0.05em] text-white leading-[0.95]"
              initial={animateHeadingOnScroll ? { y: -96, opacity: 0 } : false}
              whileInView={animateHeadingOnScroll ? { y: 0, opacity: 1 } : undefined}
              transition={animateHeadingOnScroll ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] } : undefined}
              viewport={animateHeadingOnScroll ? { once: true, amount: 0.3 } : undefined}
              style={{
                fontFamily:
                  "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, 'Plus Jakarta Sans', Arial, sans-serif",
              }}
            >
              <span className="flex items-center gap-3 sm:gap-6 flex-wrap">
                <span className="w-10 h-10 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/20 inline-block align-middle shrink-0 shadow-2xl bg-gray-800">
                  <img
                    src="/profile.png"
                    alt="Benjamin Acheampong"
                    className="w-full h-full object-cover object-top"
                  />
                </span>
                <span>Let&apos;s work</span>
              </span>
              <span className="text-gray-400 block mt-2">together</span>
            </motion.h2>

            <div className="absolute right-0 top-16 sm:top-20 lg:right-64 lg:top-4 text-white/40">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 5L5 19M5 19H15M5 19V9" />
              </svg>
            </div>

            {/* get in touch button */}
            <div className="relative mt-16 w-full border-t border-white/20 lg:mt-0 lg:w-auto lg:border-0">
              <Magnetic strength={0.4}>
                <a
                  href="mailto:kojoben29@gmail.com"
                  className="mx-auto -mt-[4.5rem] mb-0 h-36 w-36 sm:-mt-0 sm:h-48 sm:w-48 rounded-full bg-[#455ce9] text-white flex flex-col items-center justify-center gap-2 group transition-all duration-500 shadow-2xl hover:scale-105 cursor-pointer"
                >
                  <span className="text-lg font-normal tracking-tight">Get in touch</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* contact details */}
        <div className="py-8 sm:py-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6 border-b border-white/10">
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <a
              href="mailto:kojoben29@gmail.com"
              aria-label="Email kojoben29@gmail.com"
              className="contact-hover-button w-full sm:w-auto"
            >
              <span className="contact-hover-button-bg" aria-hidden="true">
                <span className="contact-hover-button-layers">
                  <span className="contact-hover-button-layer contact-hover-button-layer-purple" />
                  <span className="contact-hover-button-layer contact-hover-button-layer-turquoise" />
                  <span className="contact-hover-button-layer contact-hover-button-layer-yellow" />
                </span>
              </span>
              <span className="contact-hover-button-inner">
                <span className="contact-hover-button-label">kojoben29@gmail.com</span>
              </span>
            </a>
          </Magnetic>

          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <a
              href="tel:+233208758007"
              aria-label="Call +233 20 875 8007"
              className="contact-hover-button w-full sm:w-auto"
            >
              <span className="contact-hover-button-bg" aria-hidden="true">
                <span className="contact-hover-button-layers">
                  <span className="contact-hover-button-layer contact-hover-button-layer-purple" />
                  <span className="contact-hover-button-layer contact-hover-button-layer-turquoise" />
                  <span className="contact-hover-button-layer contact-hover-button-layer-yellow" />
                </span>
              </span>
              <span className="contact-hover-button-inner">
                <span className="contact-hover-button-label">+233 20 875 8007</span>
              </span>
            </a>
          </Magnetic>
        </div>

        {/* footer credits & socials */}
        <div className="pt-8 sm:pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-6 text-xs text-gray-400 font-light">
          <div className="order-2 flex w-full items-center justify-between border-t border-white/10 pt-6 md:order-1 md:w-auto md:justify-start md:gap-8 md:border-0 md:pt-0">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Version</span>
              <span className="text-gray-300 font-normal">2026 © Edition</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Local Time</span>
              <span className="text-gray-300 font-mono">{time || '12:00:00 GMT'}</span>
            </div>
          </div>

          <div className="order-1 flex flex-col items-start gap-5 border-b border-white/10 pb-7 md:order-2 md:ml-auto md:flex-row md:items-center md:gap-6 md:border-0 md:pb-0">
            <span className="text-[10px] uppercase text-gray-500 tracking-wider">Socials</span>
            <div className="flex items-center gap-5 text-sm text-white">
            <a href="https://github.com/Benjaminax" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/benjamin-acheampong-7274b12a1/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/_.benjamin.a._/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
