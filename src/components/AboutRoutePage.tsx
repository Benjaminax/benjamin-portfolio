import { ArrowDownRight } from 'lucide-react';
import { Footer } from './Footer';
import { Globe3D } from './Globe3D';
import { ScrollCurveDivider } from './ScrollCurveDivider';

export const AboutRoutePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#1c1d20]">
      <section className="relative z-10 mx-auto w-full max-w-[1000px] px-5 pb-16 pt-36 sm:px-10 sm:pb-24 sm:pt-44 lg:px-0">
        <h1
          className="max-w-[720px] text-[clamp(2.75rem,8vw,6rem)] font-normal leading-[1.02] tracking-[-0.065em]"
          style={{ fontFamily: "'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif" }}
        >
          Helping brands thrive in the digital world
        </h1>

        <div className="relative mt-16 flex h-28 items-end border-t border-black/15 sm:mt-20 sm:h-36">
          <ArrowDownRight className="mb-1 h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
          <div className="absolute -right-1 -top-[68px] flex h-[136px] w-[136px] items-center justify-center rounded-full bg-[#455ce9] shadow-lg sm:right-[8%] sm:-top-[78px] sm:h-[156px] sm:w-[156px]">
            <Globe3D size={52} color="#ffffff" speed={0.012} />
          </div>
        </div>

        <div className="mt-10 max-w-[560px] sm:mt-12">
          <p className="text-base leading-[1.6] tracking-[-0.02em] sm:text-lg">
            I help companies from all over the world with tailor-made solutions. With each project, I
            push my work to new horizons, always putting quality first.
          </p>
          <p className="mt-6 text-sm text-[#969696] sm:mt-7 sm:text-base">Always exploring</p>
        </div>

        <div className="mt-12 flex aspect-[0.9] w-full items-end justify-center overflow-hidden bg-[#e8e8e6] sm:mt-16 sm:aspect-[1.7]">
          <img
            src="/profile.png"
            alt="Benjamin Acheampong"
            className="h-[94%] max-w-full object-contain object-bottom"
          />
        </div>
      </section>

      <section className="relative z-10 bg-[#eceeef] px-6 pb-56 pt-20 text-[#1c1d20] sm:px-12 sm:pb-64 sm:pt-28">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2
            className="mb-16 text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight tracking-[-0.055em] sm:mb-20"
            style={{ fontFamily: "'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif" }}
          >
            I can help you with ...
          </h2>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-16">
            <article>
              <span className="mb-8 block border-b border-black/15 pb-5 text-xs text-[#8a8b8d]">01</span>
              <h3 className="mb-7 text-3xl font-normal tracking-[-0.04em] sm:text-4xl">Design</h3>
              <p className="max-w-md text-sm leading-[1.7] sm:text-base">
                I turn ideas into clear, considered digital experiences. Every detail is shaped to feel
                distinctive, intuitive, and easy to use.
              </p>
            </article>

            <article>
              <span className="mb-8 block border-b border-black/15 pb-5 text-xs text-[#8a8b8d]">02</span>
              <h3 className="mb-7 text-3xl font-normal tracking-[-0.04em] sm:text-4xl">Development</h3>
              <p className="max-w-md text-sm leading-[1.7] sm:text-base">
                I build responsive websites from the ground up, combining thoughtful structure with
                fluid motion, useful interactions, and reliable performance.
              </p>
            </article>

            <article>
              <span className="mb-8 block border-b border-black/15 pb-5 text-xs text-[#8a8b8d]">03</span>
              <h3 className="mb-7 flex items-center gap-3 text-3xl font-normal tracking-[-0.04em] sm:text-4xl">
                <svg className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-.65 7.35-4.65 11.35-12 12 7.35.65 11.35 4.65 12 12 .65-7.35 4.65-11.35 12-12C16.65 11.35 12.65 7.35 12 0Z" />
                </svg>
                The full package
              </h3>
              <p className="max-w-md text-sm leading-[1.7] sm:text-base">
                From the first sketch to launch, I bring design and development together to create
                cohesive products that work beautifully.
              </p>
            </article>
          </div>
        </div>
      </section>
      <div data-scroll-curve-container className="relative z-0">
        <ScrollCurveDivider fromColor="#eceeef" toColor="#141516" />
        <div
          className="relative z-0 -mt-[360px] bg-[#141516]"
          style={{ transform: 'translateY(var(--scroll-curve-reveal, 0px))' }}
        >
          <Footer animateHeadingOnScroll />
        </div>
      </div>
    </div>
  );
};
