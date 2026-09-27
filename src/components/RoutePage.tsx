import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, Sparkles } from 'lucide-react';
import { Experience } from './Experience';
import { Footer } from './Footer';
import { WorkIndexPage } from './WorkIndexPage';
import { AboutRoutePage } from './AboutRoutePage';
import { ScrollCurveDivider } from './ScrollCurveDivider';

export type SitePage = 'home' | 'work' | 'about' | 'experience' | 'contact';

interface RoutePageProps {
  page: Exclude<SitePage, 'home'>;
  onProjectClick: (title: string) => void;
}

const PAGE_CONTENT = {
  work: {
    eyebrow: 'Selected work / 2024—2026',
    title: <>Making ideas<br />work harder.</>,
    description: 'A selection of digital products, interactive experiences, and systems built with intent.',
    background: '#999d9e',
    foreground: '#141516',
    accent: '#455ce9',
    action: 'Explore the work',
    target: '#projects',
    Icon: BriefcaseBusiness,
    align: 'items-end text-right',
  },
  about: {
    eyebrow: 'A little about me',
    title: <>Curious by<br />design.</>,
    description: 'I bring design, code, and interaction together to make useful things feel memorable.',
    background: '#a374ff',
    foreground: '#ffffff',
    accent: '#ffffff',
    action: 'Get to know me',
    target: '#about',
    Icon: Sparkles,
    align: 'items-start text-left',
  },
  experience: {
    eyebrow: 'Career / 2024—Now',
    title: <>Built with<br />purpose.</>,
    description: 'The teams, places, and systems that have shaped the way I work.',
    background: '#1c1d20',
    foreground: '#f4f4f5',
    accent: '#a374ff',
    action: 'View experience',
    target: '#experience',
    Icon: Code2,
    align: 'items-start text-left',
  },
  contact: {
    eyebrow: 'Open for what’s next',
    title: <>Have an idea?<br />Let’s make it real.</>,
    description: 'Have a project in mind, or just want to say hello? I’d love to hear from you.',
    background: '#455ce9',
    foreground: '#ffffff',
    accent: '#a374ff',
    action: 'Let’s work together',
    target: '#contact',
    Icon: ArrowUpRight,
    align: 'items-end text-right',
  },
} satisfies Record<
  Exclude<SitePage, 'home'>,
  {
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    background: string;
    foreground: string;
    accent: string;
    action: string;
    target: string;
    Icon: typeof BriefcaseBusiness;
    align: string;
  }
>;

interface CurvedPageHeroProps {
  page: Exclude<SitePage, 'home'>;
}

const RoutePageHero: React.FC<CurvedPageHeroProps> = ({ page }) => {
  const content = PAGE_CONTENT[page];
  const Icon = content.Icon;

  return (
    <section
      className={`relative z-10 flex min-h-[78vh] flex-col justify-end px-6 pb-36 pt-40 sm:px-16 sm:pb-40 lg:px-24 ${content.align}`}
      style={{ backgroundColor: content.background, color: content.foreground }}
    >
      <div className="pointer-events-none absolute -right-20 top-28 h-56 w-56 rounded-full border border-current/20 sm:right-[12%] sm:top-32 sm:h-80 sm:w-80" />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className={`flex flex-col ${content.align} mx-auto w-full`}>
          <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.24em] opacity-75">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: content.accent }} />
            {content.eyebrow}
          </div>
          <h1
            className="max-w-6xl text-[clamp(4rem,11vw,10rem)] font-normal leading-[0.86] tracking-[-0.07em]"
            style={{ fontFamily: "'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif" }}
          >
            {content.title}
          </h1>
          <div className={`mt-10 flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between ${content.align}`}>
            <p className="max-w-md text-base leading-relaxed opacity-80 sm:text-lg">
              {content.description}
            </p>
            <a
              href={content.target}
              className="inline-flex items-center gap-3 rounded-full border border-current/30 px-5 py-3 text-sm transition-colors hover:bg-white/10"
            >
              {content.action}
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RoutePage: React.FC<RoutePageProps> = ({ page, onProjectClick }) => {
  if (page === 'about') return <AboutRoutePage />;

  if (page === 'work') {
    return (
      <>
        <WorkIndexPage onProjectClick={onProjectClick} />
        <div data-scroll-curve-container className="relative z-0">
          <ScrollCurveDivider fromColor="#ffffff" toColor="#141516" />
          <div
            className="relative z-0 -mt-[360px] bg-[#141516]"
            style={{ transform: 'translateY(var(--scroll-curve-reveal, 0px))' }}
          >
            <div className="mx-auto w-full max-w-7xl">
              <Footer animateHeadingOnScroll />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <RoutePageHero page={page} />
      {page === 'experience' && (
        <>
          <div className="relative z-10 bg-[#141516]">
            <div className="mx-auto w-full max-w-5xl pt-[180px]">
              <Experience />
            </div>
          </div>
          <div data-scroll-curve-container className="relative z-0">
            <ScrollCurveDivider fromColor="#141516" toColor="#141516" />
            <div
              className="relative z-0 -mt-[360px] bg-[#141516]"
              style={{ transform: 'translateY(var(--scroll-curve-reveal, 0px))' }}
            >
              <div className="mx-auto w-full max-w-7xl">
                <Footer animateHeadingOnScroll />
              </div>
            </div>
          </div>
        </>
      )}
      {page === 'contact' && (
        <>
          <div className="relative z-10 bg-[#141516] px-6 pb-28 pt-0 text-white sm:px-12 sm:pt-0">
            <div className="mx-auto w-full max-w-7xl">
              <div className="grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
                {[
                  ['Email', 'kojoben29@gmail.com'],
                  ['Phone', '+233 20 875 8007'],
                  ['Based in', 'Accra, Ghana'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-white/45">{label}</span>
                    <span className="text-lg sm:text-xl">{value}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:kojoben29@gmail.com" className="mx-auto mt-12 flex h-32 w-32 items-center justify-center rounded-full bg-[#a374ff] text-sm text-white transition-transform hover:scale-105">
                Say hello <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div data-scroll-curve-container className="relative z-0">
            <ScrollCurveDivider fromColor="#141516" toColor="#141516" />
            <div
              className="relative z-0 -mt-[360px] bg-[#141516]"
              style={{ transform: 'translateY(var(--scroll-curve-reveal, 0px))' }}
            >
              <div className="mx-auto w-full max-w-7xl">
                <Footer animateHeadingOnScroll />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
