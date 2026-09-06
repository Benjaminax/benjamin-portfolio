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

  const [timeData, setTimeData] = useState({ formatted: '00:00:00' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      });
      const parts = formatter.formatToParts(now);
      const h = parts.find((p) => p.type === 'hour')?.value ?? '00';
      const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
      const s = parts.find((p) => p.type === 'second')?.value ?? '00';
      setTimeData({ formatted: `${h}:${m}:${s}` });
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  // Marquee
  useEffect(() => {
    let xPercent = 0;
    const baseSpeed = 0.016;
    let direction = -1;
    let scrollBoost = 0;
    let rafId: number;

    const animate = () => {
      scrollBoost *= 0.91;
      if (scrollBoost < 0.0005) scrollBoost = 0;
      xPercent += direction * (baseSpeed + scrollBoost);
      if (xPercent <= -100) xPercent += 100;
      else if (xPercent >= 0) xPercent -= 100;
      textsRef.current.forEach((el) => { if (el) gsap.set(el, { xPercent }); });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    let lastScrollY = window.scrollY;
    let isScrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleDelta = (delta: number, sy?: number) => {
      if (Math.abs(delta) < 0.5) return;
      if (delta < 0 && (sy ?? window.scrollY) <= 0) return;
      direction = delta > 0 ? 1 : -1;
      scrollBoost = Math.min(scrollBoost + Math.min(Math.abs(delta) * 0.0012, 0.30), 0.35);
    };

    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { isScrolling = false; }, 80);
      const sy = window.scrollY;
      handleDelta(sy - lastScrollY, sy);
      lastScrollY = sy;
    };
    const onWheel = (e: WheelEvent) => {
      if (!isScrolling) handleDelta(e.deltaY, window.scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  const marqueeText = 'Jayden Smith — '.repeat(4);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden flex flex-col justify-between bg-[#999d9e] select-none">

      {/* ── Clock — top left ───────────────────────────────────── */}
      <div className="absolute left-4 sm:left-8 md:left-14 top-[72px] sm:top-24 md:top-28 z-30 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full
                     bg-[#1c1d20] border border-white/15 text-white shadow-xl"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] sm:text-xs text-gray-300 tracking-tight"
            style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>London</span>
          <span className="text-[11px] sm:text-xs text-white font-medium tracking-wider"
            style={{ fontFamily: "'Helvetica Neue', sans-serif", fontVariantNumeric: 'tabular-nums' }}>
            {timeData.formatted}
          </span>
        </motion.div>
      </div>

      {/* ── Location badge — desktop only ──────────────────────── */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <div className="rounded-r-full bg-[#1c1d20] flex items-center pl-10 pr-3.5 py-3.5 gap-6 shadow-2xl">
          <div className="flex flex-col text-white"
            style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif", fontSize: '17px', fontWeight: 450, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            <span>Located</span><span>in the</span><span>United Kingdom</span>
          </div>
          <motion.div animate={{ x: [-4, 4, -4], y: [-4, 4, -4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full bg-[#999d9e] flex items-center justify-center shrink-0 shadow-inner">
            <Globe3D size={60} color="#ffffff" speed={0.016} />
          </motion.div>
        </div>
      </div>

      {/* ── Job title — desktop ────────────────────────────────── */}
      <div className="hidden md:block absolute left-[63%] lg:left-[66%] top-[30%] z-30 text-white">
        <div className="mb-10">
          <svg className="w-16 h-16 lg:w-[72px] lg:h-[72px]" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
          </svg>
        </div>
        <div className="text-4xl lg:text-5xl xl:text-[56px] font-normal leading-[1.15] tracking-tight"
          style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, sans-serif" }}>
          <p className="m-0">Freelance</p>
          <p className="m-0">Designer &amp; Developer</p>
        </div>
      </div>

      {/* Profile image — FULL screen on mobile, proportional on desktop */}
      <div className="absolute bottom-0 z-10 pointer-events-none
                      left-1/2 -translate-x-1/2
                      h-[100vh] md:h-[93vh] lg:h-[98vh]
                      flex items-end justify-center overflow-visible">
        <motion.img
          src="/profile.png"
          alt="Jayden Smith"
          initial={{ y: '22%', scale: 1.08 }}
          animate={{ y: '0%', scale: 1 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
          className="h-full w-auto min-w-[100vw] md:min-w-0
                     object-contain object-bottom select-none origin-bottom"
        />
      </div>

      {/* ── Job title — mobile, upper-left ───────────────────── */}
      <div className="md:hidden absolute top-[22%] left-4 z-30 text-white">
        <div className="mb-2">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
          </svg>
        </div>
        <div className="text-[7vw] font-normal leading-[1.2] tracking-tight"
          style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, sans-serif" }}>
          <p className="m-0">Freelance</p>
          <p className="m-0">Designer &amp; Developer</p>
        </div>
      </div>

      {/* ── Marquee ────────────────────────────────────────────── */}
      <div
        ref={sliderContainerRef}
        className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-0 w-full
                   overflow-hidden pointer-events-none z-20 whitespace-nowrap py-2 sm:py-4"
      >
        <div className="flex whitespace-nowrap will-change-transform select-none">
          {[0, 1, 2, 3].map((i) => (
            <p key={i} ref={(el) => { textsRef.current[i] = el; }}
              className="m-0 inline-block text-[11vw] font-normal text-white
                         leading-[1.08] tracking-[-0.04em] shrink-0 pb-3"
              style={{ fontFamily: "'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif" }}>
              {marqueeText}
            </p>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </section>
  );
};

export default Hero;
