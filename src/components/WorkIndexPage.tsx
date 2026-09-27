import { useEffect, useMemo, useState } from 'react';
import { List } from 'lucide-react';
import { projects, type Project } from './projectData';

type ProjectFilter = 'All' | 'Design' | 'Development';
type DisplayMode = 'list' | 'grid';

interface WorkIndexPageProps {
  onProjectClick: (title: string) => void;
}

const filters: ProjectFilter[] = ['All', 'Design', 'Development'];

const matchesFilter = (project: Project, filter: ProjectFilter) => {
  if (filter === 'All') return true;
  return project.category.toLowerCase().includes(filter.toLowerCase());
};

const titleWithMark = (project: Project) =>
  project.title === 'JWB CORE' ? 'JWB CORE™' : project.title;

export const WorkIndexPage: React.FC<WorkIndexPageProps> = ({ onProjectClick }) => {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');

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
    () => projects.filter((project) => matchesFilter(project, filter)),
    [filter],
  );

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

        <div className="mt-16 flex flex-col gap-8 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-nowrap gap-2">
            {filters.map((item) => {
              const count = projects.filter((project) => matchesFilter(project, item)).length;
              const active = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={active}
                  className={`min-h-14 rounded-full border px-5 text-sm tracking-tight transition-colors sm:min-h-16 sm:px-8 ${
                    active
                      ? 'border-[#1c1d20] bg-[#1c1d20] text-white'
                      : 'border-black/10 bg-white text-[#1c1d20] hover:border-black/30'
                  }`}
                >
                  {item}
                  {item !== 'All' && <sup className="ml-1 text-[10px] opacity-60">{count}</sup>}
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 sm:ml-auto sm:flex">
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
      </section>

      <section className="mx-auto w-full max-w-[1248px] px-6 pb-28 sm:px-10 lg:px-0" aria-label="Selected projects">
        <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(90px,0.8fr)_minmax(140px,1fr)_60px] gap-4 border-b border-black/10 px-4 pb-7 text-[10px] uppercase tracking-wide text-[#8b8b8b] sm:grid sm:px-8">
          <span>Project</span>
          <span>Location</span>
          <span>Services</span>
          <span className="text-right">Year</span>
        </div>

        {displayMode === 'list' && (
          <div className="hidden sm:block">
            {visibleProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => onProjectClick(project.title)}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b border-black/10 px-4 py-8 transition-colors hover:bg-black/[0.025] sm:grid-cols-[minmax(0,1.5fr)_minmax(90px,0.8fr)_minmax(140px,1fr)_60px] sm:gap-4 sm:px-8 sm:py-10"
              >
                <span className="text-xl tracking-tight sm:text-3xl">{titleWithMark(project)}</span>
                <span className="hidden text-sm text-[#777] sm:block">—</span>
                <span className="col-start-1 row-start-2 text-sm leading-snug text-[#777] sm:col-auto sm:row-auto sm:text-[#444] sm:text-base">{project.category}</span>
                <span className="col-start-2 row-start-1 text-right text-sm sm:col-auto sm:row-auto sm:text-base">{project.year}</span>
              </a>
            ))}
          </div>
        )}
        {displayMode === 'grid' && (
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 sm:gap-x-6">
            {visibleProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => onProjectClick(project.title)}
                className="group border-b border-black/10 py-6 sm:py-10"
              >
                <div
                  className="mb-4 flex aspect-square items-center justify-center overflow-hidden p-6 sm:mb-6 sm:p-8"
                  style={{ backgroundColor: project.color === '#ffffff' ? '#f1f1f1' : project.color }}
                >
                  {project.video ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black shadow-xl">
                      <video
                        src={project.video}
                        muted
                        playsInline
                        autoPlay
                        loop
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <span className="text-lg text-white">{titleWithMark(project)}</span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-lg tracking-tight sm:text-2xl">{titleWithMark(project)}</h2>
                    <p className="mt-2 text-xs leading-snug text-[#777] sm:text-sm">{project.category}</p>
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
