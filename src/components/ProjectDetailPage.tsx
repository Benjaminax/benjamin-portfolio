import { ArrowLeft, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Footer } from './Footer';
import { ScrollCurveDivider } from './ScrollCurveDivider';
import { getProjectBySlug, projects } from './projectData';
import { ProjectThumbnail } from './ProjectThumbnail';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (href: string, label: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const project = getProjectBySlug(slug);
  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 text-center text-[#1c1d20]">
        <p className="mb-6 text-sm text-black/50">This project could not be found.</p>
        <button
          type="button"
          onClick={() => onNavigate('/work', 'Work')}
          className="rounded-full border border-black/15 px-6 py-3 text-sm transition-colors hover:bg-black hover:text-white"
        >
          Back to work
        </button>
      </div>
    );
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const number = String(projectIndex + 1).padStart(2, '0');

  return (
    <>
      <div className="bg-white text-[#1c1d20]">
        <div className="mx-auto w-full max-w-[1248px] px-6 pb-24 pt-36 sm:px-10 sm:pb-32 sm:pt-44 lg:px-0">
          <button
            type="button"
            onClick={() => onNavigate('/work', 'Work')}
            className="mb-12 inline-flex items-center gap-2 text-sm text-black/55 transition-colors hover:text-black sm:mb-16"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            All projects
          </button>

          <div className="flex flex-col gap-10 border-b border-black/10 pb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-12">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-black/45">
                Project {number} / {String(projects.length).padStart(2, '0')}
              </p>
              <h1
                className="max-w-5xl text-[clamp(3.5rem,10vw,8.5rem)] font-normal leading-[0.88] tracking-[-0.07em]"
                style={{ fontFamily: "'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif" }}
              >
                {project.title}
                {project.mark && <sup className="ml-1 text-[0.32em] align-super">{project.mark}</sup>}
              </h1>
            </div>
            <div className="flex shrink-0 gap-10 text-sm sm:gap-14">
              <div>
                <span className="mb-2 block text-xs text-black/40">Services</span>
                <span>{project.category}</span>
              </div>
              <div>
                <span className="mb-2 block text-xs text-black/40">Year</span>
                <span>{project.year}</span>
              </div>
            </div>
          </div>

          <div
            className="mt-8 flex aspect-[1.15] items-center justify-center overflow-hidden p-5 sm:mt-10 sm:aspect-[1.9] sm:p-12"
            style={{ backgroundColor: project.color === '#ffffff' ? '#f1f1f1' : project.color }}
          >
            {project.video ? (
              <ProjectThumbnail
                image={project.image}
                title={project.title}
                video={project.video}
                className="aspect-video w-full bg-black shadow-2xl"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-[#141516] text-white shadow-2xl">
                <span className="text-[clamp(1.5rem,5vw,4rem)] tracking-[-0.05em]">
                  {project.title}<sup className="ml-1 text-[0.35em] align-super">{project.mark}</sup>
                </span>
              </div>
            )}
          </div>

          <section className="grid gap-12 border-b border-black/10 py-16 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-16 sm:py-24">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/40">Overview</p>
              <h2 className="mt-5 text-3xl font-normal tracking-[-0.05em] sm:text-5xl">
                A closer look.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-[1.65] tracking-[-0.02em] sm:text-2xl">
                {project.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-black/25 pb-2 text-sm transition-colors hover:border-black"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {project.caseStudy && (
            <section className="border-b border-black/10 py-16 sm:py-24">
              <div className="grid gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-16">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">Case study</p>
                <h2 className="max-w-2xl text-3xl font-normal tracking-[-0.05em] sm:text-5xl">
                  {project.caseStudy.title}
                </h2>
              </div>
              <div className="mt-12 border-l-2 border-[#a374ff] bg-[#f5f1fb] px-6 py-7 sm:mt-16 sm:px-10 sm:py-9">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-black/45">
                  The problem
                </p>
                <p className="max-w-4xl text-xl leading-[1.55] tracking-[-0.03em] sm:text-3xl">
                  {project.caseStudy.problemStatement}
                </p>
              </div>
              <div className="mt-12 grid gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-y-14">
                {project.caseStudy.sections.map((section, index) => (
                  <article key={section.label} className="border-t border-black/15 pt-5">
                    <p className="mb-6 text-xs uppercase tracking-[0.2em] text-black/40">
                      0{index + 1} / {section.label}
                    </p>
                    <p className="text-base leading-[1.7] tracking-[-0.015em] text-black/75 sm:text-lg">
                      {section.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="grid gap-8 py-12 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-16 sm:py-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/40">Focus</p>
              <p className="mt-4 text-2xl tracking-[-0.04em]">{project.category}</p>
            </div>
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-black/40">Tools & disciplines</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <button
            type="button"
            onClick={() => onNavigate(`/work/${nextProject.slug}`, nextProject.title)}
            className="group mt-8 flex w-full items-end justify-between border-t border-black/15 pt-8 text-left sm:mt-12 sm:pt-10"
          >
            <span>
              <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-black/40">Next project</span>
              <span className="text-3xl tracking-[-0.05em] sm:text-5xl">
                {nextProject.title}
                {nextProject.mark && <sup className="ml-1 text-[0.4em] align-super">{nextProject.mark}</sup>}
              </span>
            </span>
            <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-colors group-hover:bg-[#1c1d20] group-hover:text-white">
              <MoveUpRight className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

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
};
