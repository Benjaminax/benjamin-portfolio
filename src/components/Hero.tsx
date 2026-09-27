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
        timeZone: 'Africa/Accra',
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

  const marqueeText = 'Benjamin Acheampong\u00A0–\u00A0'.repeat(4);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden flex flex-col justify-between bg-[#999d9e] select-none">

      {/* ── Clock — large desktop only ───────────────────────────── */}
      <div className="hidden xl:block absolute left-14 top-32 z-30 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3.5 px-5 py-2.5 rounded-full
                     bg-[#1c1d20]/90 backdrop-blur-md border border-white/20 text-white shadow-2xl"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[15px] text-gray-300 tracking-tight"
            style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>Accra, Ghana</span>
          <span className="text-[15px] text-white font-semibold tracking-wider"
            style={{ fontFamily: "'Helvetica Neue', sans-serif", fontVariantNumeric: 'tabular-nums' }}>
            {timeData.formatted}
          </span>
        </motion.div>
      </div>

      {/* ── Location badge — tablet & desktop ──────────────────── */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <div className="rounded-r-full bg-[#1c1d20] flex items-center pl-6 lg:pl-10 pr-3 lg:pr-3.5 py-3 lg:py-3.5 gap-4 lg:gap-6 shadow-2xl">
          <div className="flex flex-col text-white"
            style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif", fontSize: '16px', fontWeight: 450, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            <span>Located</span><span>in Accra,</span><span>Ghana</span>
          </div>
          <motion.div animate={{ x: [-4, 4, -4], y: [-4, 4, -4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#999d9e] flex items-center justify-center shrink-0 shadow-inner">
            <Globe3D size={52} color="#ffffff" speed={0.016} />
          </motion.div>
        </div>
      </div>

      {/* ── Job title — tablet & desktop right-aligned ─────────── */}
      <div className="hidden md:block absolute right-6 md:right-10 lg:right-[10%] xl:right-[14%] top-1/2 -translate-y-1/2 z-30 text-white">
        <div className="mb-4 lg:mb-6">
          <svg className="w-8 h-8 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
          </svg>
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-normal leading-[1.2] tracking-tight"
          style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, sans-serif" }}>
          <p className="m-0">Software Engineer</p>
          <p className="m-0">&amp; Systems Developer</p>
        </div>
      </div>

      {/* Profile image — HUGE close-up on mobile & iPad, proportional on desktop */}
      <div className="absolute bottom-0 z-10 pointer-events-none
                      left-1/2 -translate-x-1/2 translate-y-12 sm:translate-y-14 md:translate-y-12 lg:translate-y-0
                      h-[105vh] sm:h-[105vh] md:h-[100vh] lg:h-[96vh]
                      flex items-end justify-center overflow-visible">
        <motion.img
          src="/profile2.png"
          alt="Benjamin Acheampong"
          initial={{ y: '22%', scale: 1.08 }}
          animate={{ y: '0%', scale: 1 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
          className="h-full w-auto min-w-[145vw] sm:min-w-[125vw] md:min-w-[110vw] lg:min-w-0
                     scale-[1.42] sm:scale-[1.32] md:scale-[1.28] lg:scale-100
                     object-contain object-bottom select-none origin-bottom"
        />
      </div>

      {/* ── Mobile bottom elements — exactly matching Dennis Snellenberg layout ── */}
      <div className="md:hidden absolute bottom-10 left-5 sm:left-7 z-30 text-white flex flex-col items-start">
        <div className="mb-4">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
          </svg>
        </div>
        <div className="text-[28px] sm:text-[32px] font-normal leading-[1.12] tracking-tight"
          style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, sans-serif" }}>
          <p className="m-0">Software Engineer</p>
          <p className="m-0">&amp; Systems Developer</p>
        </div>
      </div>

      {/* Mobile bottom-right rotating wireframe Globe */}
      <div className="md:hidden absolute bottom-9 right-4 z-30 pointer-events-auto">
        <Globe3D size={54} color="#ffffff" speed={0.016} />
      </div>

      {/* ── Marquee ────────────────────────────────────────────── */}
      <div
        ref={sliderContainerRef}
        className="absolute bottom-[16%] sm:bottom-[14%] md:bottom-6 lg:bottom-8 left-0 w-full
                   overflow-hidden pointer-events-none z-20 whitespace-nowrap py-2 md:py-4"
      >
        <div className="flex whitespace-nowrap will-change-transform select-none">
          {[0, 1, 2, 3].map((i) => (
            <p key={i} ref={(el) => { textsRef.current[i] = el; }}
              className="m-0 inline-block text-[34vw] sm:text-[26vw] md:text-[15vw] lg:text-[15.5vw] font-normal text-white
                         leading-[1.02] tracking-[-0.04em] shrink-0 pb-4 md:pb-6"
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
