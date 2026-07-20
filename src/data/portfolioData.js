// src/data/portfolioData.js
// The portfolio imports only the checked-in public-safe data file, not the full resume source.
import localResumeData from './public_resume_data.json';
import { assetPath } from '../utils/assetPath';

// Keep the original 3D scene layout: only three project markers are displayed.
const markerPositions = [
  [-1, 1.5, -2.6],
  [-2, 1.5, -2.6],
  [-3, 1.5, -2.6],
];

// These names must match sub-objects in pokeballs.glb. Do not clone the source models.
const markerModels = [
  'Normal_4',
  'Great_9',
  'Ultra_14',
];

const technicalExperienceCompanies = [
  'FABC Accounting',
  '28 Tattoo Studio',
  'Deeproot Australia',
  'HD Education',
  'China Telecom',
];

const profileUrl = (resumeData, network) => (
  resumeData.basics.profiles.find((profile) => profile.network === network)?.url || ''
);

// The resume JSON includes role keywords for matching/search; the UI shows a shorter tag list.
const tidyTags = (tags = []) => (
  tags
    .filter((tag) => /^[a-z0-9+#.\-/ ]+$/i.test(tag))
    .filter((tag) => !['dev', 'developer', 'technical', 'product'].includes(tag.toLowerCase()))
    .slice(0, 5)
);

// Preserve the original three-card portfolio layout while sourcing copy from resumeData.projects.
const featuredProjectNames = [
  'VR Architectural Interaction Prototype',
  'Food Map: Containerized Full-Stack Platform',
  'UQ Hackathon - The Centenarian',
];

const validateFeaturedProjects = (featuredProjects) => {
  if (featuredProjects.length !== featuredProjectNames.length) {
    throw new Error('Remote resume data does not contain all featured portfolio projects.');
  }

  const missingGitHub = featuredProjects.find((project) => !project.github && !project.repository);
  if (missingGitHub) {
    throw new Error(`Remote resume data is missing a GitHub link for ${missingGitHub.name}.`);
  }
};

const highlightsText = (highlights = []) => highlights.join(' ');

const formatDate = (date) => {
  if (!date || date === 'Present') return date || '';
  const [year, month] = date.split('-');
  if (!year || !month) return date;

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(Number(year), Number(month) - 1));
};

const formatDateRange = (startDate, endDate) => (
  [formatDate(startDate), formatDate(endDate)].filter(Boolean).join(' - ')
);

// Optional media previews stay portfolio-only; the shared resume JSON remains content-focused.
// Keys match resume project names so copy can still be updated from the shared source.
const projectPreviews = {
  'VR Architectural Interaction Prototype': {
    title: 'VR construction interaction demo',
    videos: [
      {
        src: 'https://youtu.be/mSP4Lys0c1E',
        thumbnail: 'https://img.youtube.com/vi/mSP4Lys0c1E/hqdefault.jpg',
        caption: 'VR construction demo',
        // YouTube links render as thumbnail links because they cannot be played by <video>.
        kind: 'youtube',
      },
    ],
  },
  'Food Map: Containerized Full-Stack Platform': {
    title: 'Top 100 Healthiest Food in the World',
    images: [
      {
        src: assetPath('previews/fruit-map/01-home-map.png'),
        alt: 'Food Map world map with food markers',
        caption: 'Interactive map',
      },
      {
        src: assetPath('previews/fruit-map/02-data-methodology.png'),
        alt: 'Food Map selection rules modal',
        caption: 'Data methodology',
      },
      {
        src: assetPath('previews/fruit-map/03-food-details.png'),
        alt: 'Food Map food detail card',
        caption: 'Food details',
      },
      {
        src: assetPath('previews/fruit-map/04-food-comparison.png'),
        alt: 'Food Map comparison view with multiple foods',
        caption: 'Comparison view',
      },
    ],
  },
  'UQ Hackathon - The Centenarian': {
    title: 'The Centenarian gameplay demo',
    images: [
      {
        src: assetPath('previews/centenarian/gameplay-cockpit.png'),
        alt: 'The Centenarian gameplay with Arduino cockpit controller overlay',
        caption: 'Gameplay and controller',
      },
    ],
    videos: [
      {
        src: 'https://github.com/VaughanSampson/the-centenarian/assets/128713660/d676e02b-a5a8-45b5-a503-ee0e4cf1b449',
        caption: 'Gameplay demo',
      },
      {
        src: 'https://github.com/VaughanSampson/the-centenarian/assets/128713660/bfa51174-3985-4f6b-88c0-2e1004cb705f',
        caption: 'Cockpit control demo',
      },
      {
        src: 'https://github.com/VaughanSampson/the-centenarian/assets/128713660/131ce5a7-46f5-4b49-b115-0191fc32a93a',
        caption: 'Additional demo',
      },
    ],
  },
};

export const createPortfolioViewData = (resumeData) => {
  const featuredProjects = featuredProjectNames
    .map((name) => resumeData.projects.find((project) => project.name === name))
    .filter(Boolean);

  // Reject stale synced JSON so it cannot hide projects or remove GitHub buttons.
  validateFeaturedProjects(featuredProjects);

  // Shared profile text used by the 2D hero, header, and about section.
  const portfolioMeta = {
    name: resumeData.basics.name,
    title: `${resumeData.basics.name}'s Portfolio`,
    label: resumeData.basics.label,
    summary: resumeData.basics.summary,
  };

  // Contact links come from the resume JSON; footer copy stays with the site's existing tone.
  const contactData = {
    email: resumeData.basics.email,
    github: profileUrl(resumeData, 'GitHub'),
    linkedin: profileUrl(resumeData, 'LinkedIn'),
    footer: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
  };

  // Adapt JSON Resume-style project fields to the shape expected by existing 2D and 3D components.
  const portfolioData = featuredProjects.map((project, index) => ({
    ...project,
    id: `project-${index + 1}-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: project.name,
    subtitle: project.description,
    // Highlights render as bullet lists; description remains for components expecting a string.
    highlights: project.highlights?.length ? project.highlights : [project.description],
    description: highlightsText(project.highlights) || project.description,
    preview: projectPreviews[project.name] || null,
    tags: tidyTags(project.tags),
    links: {
      github: project.github || project.repository || '',
      liveDemo: project.url || '',
    },
    position: markerPositions[index % markerPositions.length],
    model: markerModels[index % markerModels.length],
  }));

  // Keep the portfolio career story focused on technical roles instead of showing the full resume.
  const experienceData = resumeData.work
    .filter((experience) => technicalExperienceCompanies.includes(experience.company))
    .map((experience, index) => ({
      ...experience,
      id: `experience-${index + 1}-${experience.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      dateRange: formatDateRange(experience.startDate, experience.endDate),
      highlights: experience.highlights?.length ? experience.highlights : [],
      tags: tidyTags(experience.tags),
      isCurrent: experience.endDate === 'Present',
    }));

  return {
    resumeData,
    portfolioMeta,
    contactData,
    portfolioData,
    experienceData,
  };
};

export const fallbackPortfolioViewData = createPortfolioViewData(localResumeData);

export const portfolioMeta = fallbackPortfolioViewData.portfolioMeta;
export const contactData = fallbackPortfolioViewData.contactData;
export const portfolioData = fallbackPortfolioViewData.portfolioData;
export const experienceData = fallbackPortfolioViewData.experienceData;
export const resumeData = fallbackPortfolioViewData.resumeData;
