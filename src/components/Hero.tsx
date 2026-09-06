import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Globe3D } from './Globe3D';

interface HeroProps {
  onReplayIntro?: () => void;
  onToggleMenu?: () => void;
  isMenuOpen?: boolean;
}

export const Hero: React.FC<HeroProps> = () => {
  const textsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  const [timeData, setTimeData] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: '12:00:00',
  });

  // live London GMT clock data calculation
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
      const parts = formatter.formatToParts(now);
      const h = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
      const m = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
      const s = parseInt(parts.find((p) => p.type === 'second')?.value || '0', 10);

      const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      setTimeData({ hours: h, minutes: m, seconds: s, formatted });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { formatted } = timeData;

  // infinite text marquee scroll logic
  useEffect(() => {
    let xPercent = 0;
    const baseSpeed = 0.016;
    let direction = -1;
    let scrollBoost = 0;
    let animationFrameId: number;

    const animate = () => {
      // smooth friction slowdown
      scrollBoost *= 0.91;
      if (scrollBoost < 0.0005) scrollBoost = 0;

      const currentVelocity = direction * (baseSpeed + scrollBoost);
      xPercent += currentVelocity;

      // loop text seamlessly
      if (xPercent <= -100) {
        xPercent += 100;
      } else if (xPercent >= 0) {
        xPercent -= 100;
      }

      textsRef.current.forEach((el) => {
        if (el) {
          gsap.set(el, { xPercent });
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    let lastScrollY = window.scrollY;
    let isScrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScrollDelta = (delta: number, currentScrollY?: number) => {
      if (Math.abs(delta) < 0.5) return;

      const scrollY = currentScrollY ?? window.scrollY;
      if (delta < 0 && scrollY <= 0) return;

      if (delta > 0) {
        direction = 1;
      } else {
        direction = -1;
      }

      const addedMomentum = Math.min(Math.abs(delta) * 0.0012, 0.30);
      scrollBoost = Math.min(scrollBoost + addedMomentum, 0.35);
    };

    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 80);

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      handleScrollDelta(delta, currentY);
    };

    const onWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      if (e.deltaY < 0 && window.scrollY <= 0) return;
      handleScrollDelta(e.deltaY, window.scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  const marqueeItem = 'Jayden Smith — ';
  const fullMarqueeText = marqueeItem.repeat(4);

  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden flex flex-col justify-between bg-[#999d9e] select-none">
      {/* Apple / Clean Boy Aesthetic Clock Widget — top left below navbar */}
      <div className="absolute left-8 sm:left-14 top-24 sm:top-28 z-30 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#1c1d20] border border-white/15 text-white shadow-xl hover:border-white/30 transition-all duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span
            className="text-xs sm:text-sm text-gray-300 font-normal tracking-tight"
            style={{
              fontFamily:
                "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
            }}
          >
            London
          </span>
          <span
            className="text-xs sm:text-sm text-white font-medium tracking-wider"
            style={{
              fontFamily:
                "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, sans-serif",
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatted}
          </span>
        </motion.div>
      </div>

      {/* location badge */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <div className="rounded-r-full bg-[#1c1d20] flex items-center pl-8 sm:pl-10 pr-3.5 py-3 sm:py-3.5 gap-5 sm:gap-6 shadow-2xl cursor-default">
          <div
            className="flex flex-col text-white font-neue-montreal"
            style={{
              fontFamily: "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, sans-serif",
              fontSize: '17px',
              fontWeight: 450,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            <span>Located</span>
            <span>in the</span>
            <span>United Kingdom</span>
          </div>
          <motion.div
            animate={{ x: [-4, 4, -4], y: [-4, 4, -4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full bg-[#999d9e] flex items-center justify-center shrink-0 shadow-inner"
          >
            <Globe3D size={60} color="#ffffff" speed={0.016} />
          </motion.div>
        </div>
      </div>

      {/* job title arrow */}
      <div className="absolute left-[58%] sm:left-[63%] md:left-[66%] top-[30%] sm:top-[32%] z-30 pointer-events-auto text-white">
        <div className="mb-7 sm:mb-10">
          <svg
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="7" x2="17" y2="17" />
            <polyline points="17 7 17 17 7 17" />
          </svg>
        </div>
        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.15] tracking-tight"
          style={{
            fontFamily:
              "'Neue Montreal', 'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif",
          }}
        >
          <p className="m-0">Freelance</p>
          <p className="m-0">Designer &amp; Developer</p>
        </div>
      </div>

      {/* main profile cut-out */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[92vh] sm:h-[98vh] max-h-[1050px] flex items-end justify-center pointer-events-none overflow-hidden">
        <motion.img
          src="/profile.png"
          alt="Jayden Smith"
          initial={{ y: '22%', scale: 1.08 }}
          animate={{ y: '0%', scale: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.25,
          }}
          className="h-full w-auto object-contain object-bottom select-none origin-bottom"
        />
      </div>

      {/* running name banner */}
      <div
        ref={sliderContainerRef}
        className="absolute bottom-6 sm:bottom-8 left-0 w-full overflow-hidden pointer-events-none z-20 whitespace-nowrap py-4"
      >
        <div className="flex whitespace-nowrap will-change-transform select-none">
          {[0, 1, 2, 3].map((i) => (
            <p
              key={i}
              ref={(el) => {
                textsRef.current[i] = el;
              }}
              className="m-0 inline-block text-[11vw] font-normal text-white leading-[1.08] tracking-[-0.04em] shrink-0 pb-3"
              style={{
                fontFamily:
                  "'Neue Helvetica Georgian 55 Roman', 'Neue Helvetica Georgian', 'Helvetica Neue', Helvetica, 'Plus Jakarta Sans', Arial, sans-serif",
              }}
            >
              {fullMarqueeText}
            </p>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </section>
  );
};

export default Hero;
