import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';
import { projects, type Project, type ProjectType } from './projectData';
import { ProjectThumbnail } from './ProjectThumbnail';

type ProjectTypeFilter = 'All types' | ProjectType;
type DisplayMode = 'list' | 'grid';

interface WorkIndexPageProps {
  onProjectClick: (title: string) => void;
}

const projectTypes: ProjectTypeFilter[] = [
  'All types',
  ...new Set(projects.map((project) => project.projectType)),
];
const titleWithMark = (project: Project) =>
  `${project.title}${project.mark}`;

export const WorkIndexPage: React.FC<WorkIndexPageProps> = ({ onProjectClick }) => {
  const [typeFilter, setTypeFilter] = useState<ProjectTypeFilter>('All types');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const [hoverPreview, setHoverPreview] = useState<{ index: number; x: number; y: number } | null>(null);
  const listPreviewVideos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const syncGridModeForMobile = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setDisplayMode('grid');
    };

    syncGridModeForMobile(mobileQuery);
    mobileQuery.addEventListener('change', syncGridModeForMobile);
    return () => mobileQuery.removeEventListener('change', syncGridModeForMobile);
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter(
      (project) => typeFilter === 'All types' || project.projectType === typeFilter,
    ),
    [typeFilter],
  );

  const typeCount = (type: ProjectTypeFilter) =>
    projects.filter(
      (project) => type === 'All types' || project.projectType === type,
    ).length;

  const filterButtonClass = (active: boolean) =>
    `min-h-11 shrink-0 rounded-full border px-4 text-xs tracking-tight transition-colors sm:min-h-12 sm:px-5 sm:text-sm ${
      active
        ? 'border-[#1c1d20] bg-[#1c1d20] text-white'
        : 'border-black/10 bg-white text-[#1c1d20] hover:border-black/30'
    }`;

  const startListPreview = (event: React.PointerEvent<HTMLAnchorElement>, index: number) => {
    if (event.pointerType !== 'mouse') return;
    const { clientX, clientY } = event;
    setHoverPreview({ index, x: clientX, y: clientY });
    const video = listPreviewVideos.current[index];
    if (!video) return;
    video.muted = true;
    void video.play().catch((error: unknown) => {
    if (error instanceof DOMException && error.name === 'AbortError') return;
    console.error(`Unable to play the ${visibleProjects[index].title} project preview.`, error);
    });
  };

  const moveListPreview = (event: React.PointerEvent<HTMLAnchorElement>, index: number) => {
    if (event.pointerType !== 'mouse') return;
    setHoverPreview((current) =>
    current?.index === index
      ? { ...current, x: event.clientX, y: event.clientY }
      : current,
    );
  };

  const stopListPreview = (index: number) => {
    const video = listPreviewVideos.current[index];
    if (video) {
    video.pause();
    video.currentTime = 0;
    }
    setHoverPreview((current) => current?.index === index ? null : current);
  };

  return (
    <div className="relative z-10 min-h-screen bg-white text-[#1c1d20]">
      <section className="mx-auto w-full max-w-[1000px] px-6 pb-20 pt-40 sm:px-10 sm:pt-48 lg:px-0">
        <h1
          className="max-w-[900px] text-[clamp(2.75rem,7.2vw,6.25rem)] font-normal leading-[0.98] tracking-[-0.065em]"
          style={{ fontFamily: "'Neue Helvetica Georgian 55 Roman', 'Helvetica Neue', Helvetica, sans-serif" }}
        >
          Creating next level
          <br />
          digital products
        </h1>

        <div className="mt-14 flex flex-col gap-8 sm:mt-24">
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#8b8b8b]">
                  Project type
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by project type">
                  {projectTypes.map((type) => {
                    const active = typeFilter === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTypeFilter(type)}
                        aria-pressed={active}
                        className={filterButtonClass(active)}
                      >
                        {type}
                        <sup className="ml-1 text-[10px] opacity-60">{typeCount(type)}</sup>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                aria-label="Show projects as a list"
                aria-pressed={displayMode === 'list'}
                onClick={() => setDisplayMode('list')}
                className={`flex h-16 w-16 items-center justify-center rounded-full border transition-colors ${
                  displayMode === 'list'
                    ? 'border-[#1c1d20] bg-[#1c1d20] text-white'
                    : 'border-black/10 bg-white text-[#1c1d20] hover:border-black/30'
                }`}
              >
                <List className="h-5 w-5" strokeWidth={1.25} />
              </button>
              <button
                type="button"
                aria-label="Show projects as a grid"
                aria-pressed={displayMode === 'grid'}
                onClick={() => setDisplayMode('grid')}
                className={`flex h-16 w-16 items-center justify-center rounded-full border transition-colors ${
                  displayMode === 'grid'
                    ? 'border-[#1c1d20] bg-[#1c1d20] text-white'
                    : 'border-black/10 bg-white text-[#1c1d20] hover:border-black/30'
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="6.5" height="6.5" />
                  <rect x="14" y="3.5" width="6.5" height="6.5" />
                  <rect x="3.5" y="14" width="6.5" height="6.5" />
                  <rect x="14" y="14" width="6.5" height="6.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1248px] px-6 pb-28 sm:px-10 lg:px-0" aria-label="Selected projects">
        <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(140px,0.7fr)_60px] gap-4 border-b border-black/10 px-4 pb-7 text-[10px] uppercase tracking-wide text-[#8b8b8b] sm:grid sm:px-8">
          <span>Project</span>
          <span>Type</span>
          <span className="text-right">Year</span>
        </div>

        {displayMode === 'list' && (
          <div
            className="hidden sm:block"
            onPointerLeave={() => {
              if (hoverPreview) stopListPreview(hoverPreview.index);
            }}
          >
            {visibleProjects.map((project) => (
              <a
                key={project.title}
                href={`/work/${project.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  onProjectClick(project.title);
                }}
                onPointerEnter={(event) => startListPreview(event, visibleProjects.indexOf(project))}
                onPointerMove={(event) => moveListPreview(event, visibleProjects.indexOf(project))}
                onPointerLeave={() => stopListPreview(visibleProjects.indexOf(project))}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b border-black/10 px-4 py-8 transition-colors hover:bg-black/[0.025] sm:grid-cols-[minmax(0,1.4fr)_minmax(140px,0.7fr)_60px] sm:gap-4 sm:px-8 sm:py-10"
              >
                <span className="text-xl tracking-tight sm:text-3xl">{titleWithMark(project)}</span>
                <span className="hidden text-sm text-[#777] sm:block">{project.projectType}</span>
                <span className="text-right text-sm sm:text-base">{project.year}</span>
              </a>
            ))}
          </div>
        )}
        {displayMode === 'list' && (
          <motion.div
            initial={false}
            animate={{
              left: hoverPreview?.x ?? 0,
              top: hoverPreview?.y ?? 0,
              scale: hoverPreview ? 1 : 0,
            }}
            transition={{
              left: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              top: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl sm:block lg:h-[400px] lg:w-[400px]"
            aria-hidden="true"
          >
            <div
              className="relative h-full w-full transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ transform: `translateY(-${(hoverPreview?.index ?? 0) * 100}%)` }}
            >
              {visibleProjects.map((project, index) => (
                <div
                  key={project.slug}
                  className="relative flex h-full w-full items-center justify-center p-6 sm:p-8"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black shadow-xl">
                    <img
                      src={project.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {project.video && (
                      <video
                        ref={(video) => {
                          listPreviewVideos.current[index] = video;
                        }}
                        src={project.video}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        className={`relative h-full w-full object-cover transition-opacity duration-300 ${
                          hoverPreview?.index === index ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 sm:p-4">
                      <span className="text-sm text-white sm:text-base">
                        {project.title}<sup className="ml-0.5 text-[0.55em]">{project.mark}</sup>
                      </span>
                      <span className="font-mono text-xs text-white/70">{project.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {displayMode === 'grid' && (
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 sm:gap-x-6">
            {visibleProjects.map((project) => (
              <a
                key={project.title}
                href={`/work/${project.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  onProjectClick(project.title);
                }}
                className="group border-b border-black/10 py-6 sm:py-10"
              >
                <div
                  className="mb-4 flex aspect-square items-center justify-center overflow-hidden p-6 sm:mb-6 sm:p-8"
                  style={{ backgroundColor: project.color === '#ffffff' ? '#f1f1f1' : project.color }}
                >
                  {project.video ? (
                    <ProjectThumbnail
                      image={project.image}
                      title={project.title}
                      video={project.video}
                      className="aspect-[16/10] w-full bg-black shadow-xl transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="text-lg text-white">{titleWithMark(project)}</span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-lg tracking-tight sm:text-2xl">{titleWithMark(project)}</h2>
                    <p className="mt-2 text-xs leading-snug text-[#777] sm:text-sm">{project.projectType}</p>
                  </div>
                  <span className="pt-1 text-xs text-[#777] sm:text-sm">{project.year}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
