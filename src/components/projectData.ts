import jwbCoreVideo from './assets/JWB CORE.web.mp4';
import thirdPersonShooterVideo from './assets/Third Person Shooter.web.mp4';

export interface Project {
  title: string;
  category: string;
  year: string;
  tags: string[];
  video?: string;
  color: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: 'JWB CORE',
    category: 'Design & Development',
    year: '2026',
    tags: ['TypeScript', 'AF-HIT Score', 'HIPAA', 'Compliance Engine'],
    video: jwbCoreVideo,
    color: '#ffffff',
    url: 'https://github.com/Benjaminax',
  },
  {
    title: 'Theora',
    category: 'Design & Development',
    year: '2024',
    tags: ['Electron', 'React', 'TypeScript', 'TMDB & VLC'],
    video: '/videos/project4.mp4',
    color: '#e9e1f7',
    url: 'https://github.com/Benjaminax',
  },
  {
    title: 'Third Person Shooter',
    category: 'Interaction & Development',
    year: '2025',
    tags: ['Unreal Engine 5.7', 'C++', 'AI Behavior Trees', 'Hitscan'],
    video: thirdPersonShooterVideo,
    color: '#e0f0e3',
    url: 'https://github.com/Benjaminax',
  },
  {
    title: 'Paradox Ninja Game',
    category: 'Game Development',
    year: '2025',
    tags: ['Ninja Game', 'Gameplay Systems', 'Game Development'],
    color: '#1c1d20',
    url: 'https://github.com/Benjaminax',
  },
];
