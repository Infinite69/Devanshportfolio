import { Project, SkillCategory, Experience, Certification } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Interior Design Web Application',
    description: 'Responsive website built using React.js, Tailwind CSS and JavaScript featuring service pages, modern UI and contact forms.',
    longDescription: 'A premium client-facing showcase for luxury interior designers. It provides fluid gallery transitions, layout configurations, and a seamless client inquiry workflow, bringing architectural precision to the web.',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
    github: 'https://github.com/Infinite69/crestonp',
    live: 'https://interior-design-showcase.vercel.app',
    visualType: 'interior'
  },
  {
    id: '3',
    title: 'Baxy Official Front-End Model',
    description: 'High fidelity frontend redesign following modern UI/UX principles for corporate digital experience.',
    longDescription: 'A custom frontend overhaul for Baxy, featuring immersive product storytelling, 3D-like parallax vehicle specifications sheets, and streamlined business-to-business lead acquisition interfaces.',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    github: 'https://github.com/devansh-dubey/baxy-frontend-redesign',
    live: 'https://www.baxymobility.com',
    visualType: 'baxy'
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Next.js', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML', level: 98 },
      { name: 'CSS', level: 90 }
    ]
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'MySQL', level: 86 },
      { name: 'Firebase', level: 80 },
      { name: 'Firestore', level: 80 },
      { name: 'REST APIs', level: 90 }
    ]
  },
  {
    title: 'Tools & Cloud Platforms',
    skills: [
      { name: 'GitHub', level: 90 },
      { name: 'Postman', level: 85 },
      { name: 'Vercel', level: 88 },
      { name: 'Axios', level: 90 }
    ]
  },
  {
    title: 'Programming Languages & CS Fundamentals',
    skills: [
      { name: 'C++', level: 85 },
      { name: 'Data Structures & Algorithms', level: 78 },
      { name: 'Python', level: 80 },
      { name: 'Java', level: 75 },
      { name: 'SQL', level: 82 },
      { name: 'Scilab', level: 65 }
    ]
  },
  {
    title: 'Analytics & Spreadsheet Tools',
    skills: [
      { name: 'Excel', level: 85 },
      { name: 'Google Sheets', level: 82 },
      { name: 'Basic Statistics', level: 78 }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: '1',
    company: 'Baxy Official',
    role: 'Web Development Intern',
    period: 'June 2025 – August 2025',
    highlights: [
      'Built scalable responsive frontend architecture with seamless device support.',
      'Worked extensively on the core company website, improving loading speeds by 25%.',
      'Collaborated on internal digital tools to automate staff timesheet logs.',
      'Optimized the UX and overall digital branding layout following modern guidelines.'
    ]
  },
  {
    id: '2',
    company: 'Fiverr',
    role: 'Freelance Video Editor',
    period: 'June 2022 – August 2023',
    highlights: [
      'Edited promotional videos for digital products and online marketing campaigns.',
      'Worked with multiple global brands to create crisp, visual storytelling reels.',
      'Delivered premium high-quality client deliverables with high feedback scores.'
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: 'c1',
    title: 'Full Stack Web Development',
    issuer: 'Udemy'
  },
  {
    id: 'c2',
    title: 'UI/UX Design',
    issuer: 'Udemy'
  },
  {
    id: 'c3',
    title: 'Artificial Intelligence & Machine Learning',
    issuer: 'Udemy'
  }
];
