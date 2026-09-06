import React, { useState, useEffect } from 'react';
import { ArrowUpRight, RotateCcw, Mail, Phone } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const [time, setTime] = useState('');

  // clock timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
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
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-24 sm:pt-32 pb-12">
        {/* contact banner */}
        <div className="border-b border-white/10 pb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-light text-gray-300">
              Available for freelance opportunities
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative">
            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[-0.04em] text-white leading-[0.95]"
              style={{
                fontFamily:
                  "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, 'Plus Jakarta Sans', Arial, sans-serif",
              }}
            >
              <span className="flex items-center gap-4 sm:gap-6 flex-wrap">
                <span className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/20 inline-block align-middle shrink-0 shadow-2xl bg-gray-800">
                  <img
                    src="/profile.png"
                    alt="Jayden Smith"
                    className="w-full h-full object-cover object-top"
                  />
                </span>
                <span>Let&apos;s work</span>
              </span>
              <span className="text-gray-400 block mt-2">together</span>
            </h2>

            <div className="hidden lg:block absolute right-64 top-4 text-white/40">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 5L5 19M5 19H15M5 19V9" />
              </svg>
            </div>

            {/* get in touch button */}
            <div className="self-start lg:self-center">
              <Magnetic strength={0.4}>
                <a
                  href="mailto:contact@jaydensmith.design"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#455ce9] text-white flex flex-col items-center justify-center gap-2 group transition-all duration-500 shadow-2xl hover:scale-105 cursor-pointer"
                >
                  <span className="text-lg font-normal tracking-tight">Get in touch</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* contact details */}
        <div className="py-14 flex flex-wrap gap-4 sm:gap-6 border-b border-white/10">
          <Magnetic strength={0.25}>
            <a
              href="mailto:contact@jaydensmith.design"
              className="px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white text-white hover:text-black transition-all duration-300 flex items-center gap-3 text-sm font-normal"
            >
              <Mail className="w-4 h-4" />
              <span>contact@jaydensmith.design</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="tel:+442079460912"
              className="px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white text-white hover:text-black transition-all duration-300 flex items-center gap-3 text-sm font-normal"
            >
              <Phone className="w-4 h-4" />
              <span>+44 20 7946 0912</span>
            </a>
          </Magnetic>
        </div>

        {/* footer credits & socials */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-light">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Version</span>
              <span className="text-gray-300 font-normal">2026 © Edition</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Local Time</span>
              <span className="text-gray-300 font-mono">{time || '12:00:00 GMT'}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Github</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onReplayIntro}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Intro</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
