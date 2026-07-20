export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  live?: string;
  visualType: 'interior' | 'staff' | 'baxy' | 'texture';
}

export interface Skill {
  name: string;
  level: number; // 0 to 100 for animating skill bars
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
}
