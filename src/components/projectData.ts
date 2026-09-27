import jwbCoreVideo from './assets/JWB CORE.web.mp4';
import thirdPersonShooterVideo from './assets/Third Person Shooter.web.mp4';
import theoraVideo from './assets/Theora.mp4';
import paradoxNinjaVideo from './assets/The Paradox Ninja Game.MOV';
import jwbCoreImage from './assets/JWB CORE.png';
import thirdPersonShooterImage from './assets/Third person shooter .jpg';
import theoraImage from './assets/Theora.png';
import paradoxNinjaImage from './assets/Paradox ninja .png';

export type ProjectType = 'SaaS' | 'Desktop app' | 'Game development';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  mark: '™' | '©';
  projectType: ProjectType;
  category: string;
  year: string;
  tags: string[];
  overview: string;
  image: string;
  caseStudy: {
    title: string;
    problemStatement: string;
    sections: {
      label: string;
      description: string;
    }[];
  };
  video?: string;
  color: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: 'jwb-core',
    title: 'JWB CORE',
    mark: '™',
    projectType: 'SaaS',
    category: 'Design & Development',
    year: '2026',
    tags: ['TypeScript', 'AF-HIT Score', 'HIPAA', 'Compliance Engine'],
    image: jwbCoreImage,
    overview:
      'A healthcare-app readiness platform concept exploring how teams can assess quality, privacy, security, performance, and release risks before deployment.',
    caseStudy: {
      title: 'Helping health apps become more deployment-ready.',
      problemStatement:
        'Teams can build health apps, but it can be difficult to evaluate whether an app is reliable, protects sensitive data, performs well, and is ready for release across app stores and hosting platforms.',
      sections: [
        {
          label: 'Research & direction',
          description:
            'The idea grew from hearing more conversations about building health apps in Ghana and attending a health-app tech expo at Academic City. I also came across Carlton Aikins’s stora.sh on LinkedIn, which highlighted the value of surfacing issues before deployment. I wanted to explore that kind of readiness check specifically for healthcare apps.',
        },
        {
          label: 'Interface design',
          description:
            'The product direction is to make complex technical and healthcare-readiness issues easier to understand in one place, so teams can see what needs attention before they try to ship.',
        },
        {
          label: 'Development',
          description:
            'JWB CORE is being shaped around healthcare compliance and app quality, including privacy and data-protection risks, performance concerns, code issues that could affect deployment, and security vulnerabilities. The planned AI-assisted guidance would help explain findings and suggest areas to address.',
        },
        {
          label: 'Result',
          description:
            'The intended result is a healthcare-focused pre-release review that helps teams identify risks earlier and make more informed improvements. JWB CORE is designed to support readiness work—not to claim that an app is automatically certified, secure, or guaranteed to pass a store review.',
        },
      ],
    },
    video: jwbCoreVideo,
    color: '#ffffff',
    links: [{ label: 'GitHub repository', url: 'https://github.com/Benjaminax/jwb-core' }],
  },
  {
    slug: 'theora',
    title: 'Theora',
    mark: '™',
    projectType: 'Desktop app',
    category: 'Design & Development',
    year: '2024',
    tags: ['Electron', 'React', 'TypeScript', 'TMDB & VLC'],
    image: theoraImage,
    overview:
      'A desktop app that makes downloaded movies easier to organize and explore, with a playful interface inspired by streaming platforms.',
    caseStudy: {
      title: 'Turning a sorting tool into a movie experience.',
      problemStatement:
        'People needed a simple way to sort and browse the movies they downloaded. My first Python version was slow, and its interface made the process feel like work.',
      sections: [
        {
          label: 'Research & direction',
          description:
            'Starting from the original prompt, I focused on the core task: make a personal movie collection easier to scan, sort, and choose from. I explored familiar streaming-service browsing patterns as a direction for the experience, adapted for movies people already had on their computer.',
        },
        {
          label: 'Interface design',
          description:
            'I moved away from a plain utility-style interface and shaped Theora into a more visual, playful library. The streaming-inspired UI makes browsing feel familiar while keeping the focus on organizing and finding downloaded movies.',
        },
        {
          label: 'Development',
          description:
            'The Python prototype was too slow for the experience I wanted, so I rebuilt the desktop app with Electron, React, and TypeScript. I also added movie streaming support, bringing browsing and watching into the same product.',
        },
        {
          label: 'Result',
          description:
            'Theora gives downloaded movies a dedicated, streaming-style home: a more enjoyable way to organize a collection, browse it, and start watching from one desktop app.',
        },
      ],
    },
    video: theoraVideo,
    color: '#e9e1f7',
    links: [{ label: 'GitHub repository', url: 'https://github.com/Benjaminax/Theora' }],
  },
  {
    slug: 'third-person-shooter',
    title: 'Third Person Shooter',
    mark: '©',
    projectType: 'Game development',
    category: 'Interaction & Development',
    year: '2025',
    tags: ['Unreal Engine 5.7', 'C++', 'AI Behavior Trees', 'Hitscan'],
    image: thirdPersonShooterImage,
    overview:
      'An interactive Unreal Engine project focused on responsive third-person combat, hitscan interactions, and AI-driven encounters.',
    caseStudy: {
      title: 'Building a responsive third-person combat experience.',
      problemStatement:
        'A third-person shooter needs combat that feels responsive while coordinating player interaction, weapon feedback, and believable enemy encounters.',
      sections: [
        {
          label: 'Research & direction',
          description:
            'The project focuses on the core loop of a third-person shooter: moving through an encounter, engaging targets, and responding to enemy behavior. The direction centers on clear combat feedback and interactive gameplay.',
        },
        {
          label: 'Interface design',
          description:
            'The experience is framed around the player and the combat space, keeping attention on movement, targets, and moment-to-moment encounters rather than a menu-first presentation.',
        },
        {
          label: 'Development',
          description:
            'Built as an Unreal Engine project, it explores third-person combat with C++, hitscan interactions, and AI behavior trees for enemy encounters.',
        },
        {
          label: 'Result',
          description:
            'The result is an interactive shooter project bringing third-person combat, hitscan gameplay, and AI-driven encounters together in one playable experience.',
        },
      ],
    },
    video: thirdPersonShooterVideo,
    color: '#343638',
    links: [{ label: 'GitHub repository', url: 'https://github.com/Benjaminax/Third-Person-Game' }],
  },
  {
    slug: 'paradox-ninja-game',
    title: 'Paradox Ninja Game',
    mark: '©',
    projectType: 'Game development',
    category: 'Game Development',
    year: '2025',
    tags: ['Unity', '2D Platformer', 'Gameplay Systems', 'Game Development'],
    image: paradoxNinjaImage,
    overview:
      'A 2D Unity platformer made for an MTN Ghana DigiFest game competition: play as a ninja, collect gems, battle skeletons, and survive a timed run.',
    caseStudy: {
      title: 'Turning a game competition into a chance to level up.',
      problemStatement:
        'After making one 2D game—a Flappy Bird-style project—I wanted to push myself further. An email about MTN Ghana’s DigiFest game competition gave me a reason to take on a bigger challenge and build a complete game in Unity.',
      sections: [
        {
          label: 'Research & direction',
          description:
            'I had been curious about how games were made since I was a kid. The competition felt like an opportunity to learn by building, so I chose a 2D ninja platformer with a clear goal: gather gems, fight skeletons, and make it through a dangerous level before time runs out.',
        },
        {
          label: 'Interface design',
          description:
            'I built the challenge around a two-minute timer and collectible gems. Skeletons can be fought, while birds and mushrooms are instant-kill hazards. Collecting 10 gems unlocks the ninja’s fireballs, creating a clear reward as the player progresses.',
        },
        {
          label: 'Development',
          description:
            'I developed Paradox Ninja Game in Unity, bringing together the player, enemies, hazards, gem collection, the fireball unlock, and the timed run as one 2D game experience.',
        },
        {
          label: 'Result',
          description:
            'The project pushed me beyond my first simple 2D game and gave me the chance to turn a childhood curiosity into a complete playable project. I published Paradox Ninja Game on itch.io.',
        },
      ],
    },
    video: paradoxNinjaVideo,
    color: '#1c1d20',
    links: [
      { label: 'GitHub repository', url: 'https://github.com/Benjaminax/ninja-' },
      { label: 'Play on itch.io', url: 'https://benjaminax.itch.io/the-paradox-ninja' },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getProjectPath = (title: string) => {
  const project = projects.find((item) => item.title === title);
  return project ? `/work/${project.slug}` : '/work';
};
