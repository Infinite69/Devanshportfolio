import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, Code2, Database, Flame, Zap, Globe, Cpu, Server, Wind, Sparkles, 
  Triangle, GitBranch, Github, Box, Cloud, Network, Layers, ShieldCheck, 
  LayoutTemplate, HardDrive, Hexagon, PenTool, Twitter, MessageSquare, Laptop
} from 'lucide-react';

interface SkillsProps {
  isDarkMode: boolean;
}

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function Skills({ isDarkMode }: SkillsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skillsList: SkillItem[] = [
    { name: 'C++', icon: Code2, color: 'hover:text-blue-500' },
    { name: 'DSA', icon: Layers, color: 'hover:text-amber-500' },
    { name: 'Python', icon: Terminal, color: 'hover:text-amber-400' },
    { name: 'JavaScript', icon: Code2, color: 'hover:text-yellow-400' },
    { name: 'TypeScript', icon: Code2, color: 'hover:text-blue-400' },
    { name: 'React.js', icon: Sparkles, color: 'hover:text-cyan-400' },
    { name: 'PostgreSQL', icon: Database, color: 'hover:text-indigo-400' },
    { name: 'MySQL', icon: Database, color: 'hover:text-sky-500' },
    { name: 'Firebase', icon: Flame, color: 'hover:text-red-500' },
    { name: 'Supabase', icon: Zap, color: 'hover:text-emerald-400' },
    { name: 'Next.js', icon: Globe, color: 'hover:text-white' },
    { name: 'Node.js', icon: Cpu, color: 'hover:text-green-500' },
    { name: 'Express.js', icon: Server, color: 'hover:text-zinc-300' },
    { name: 'Tailwind CSS', icon: Wind, color: 'hover:text-sky-400' },
    { name: 'Framer Motion', icon: Sparkles, color: 'hover:text-pink-500' },
    { name: 'MongoDB', icon: Database, color: 'hover:text-emerald-500' },
    { name: 'Vercel', icon: Triangle, color: 'hover:text-white' },
    { name: 'Git', icon: GitBranch, color: 'hover:text-orange-600' },
    { name: 'GitHub', icon: Github, color: 'hover:text-zinc-300' },
    { name: 'Docker', icon: Box, color: 'hover:text-blue-500' },
    { name: 'Socket.io', icon: Zap, color: 'hover:text-white' },
    { name: 'AWS', icon: Cloud, color: 'hover:text-amber-500' },
    { name: 'Neo4j', icon: Network, color: 'hover:text-blue-400' },
    { name: 'Streamlit', icon: Layers, color: 'hover:text-red-400' },
    { name: 'Postman API', icon: Globe, color: 'hover:text-orange-500' },
    { name: 'Clerk', icon: ShieldCheck, color: 'hover:text-blue-500' },
    { name: 'Shadcn UI', icon: LayoutTemplate, color: 'hover:text-white' },
    { name: 'Redis', icon: HardDrive, color: 'hover:text-red-500' },
    { name: 'Prisma', icon: Layers, color: 'hover:text-teal-400' },
    { name: 'GraphQL', icon: Hexagon, color: 'hover:text-pink-600' },
    { name: 'Webpack', icon: Box, color: 'hover:text-blue-400' },
    { name: 'Figma', icon: PenTool, color: 'hover:text-purple-400' },
    { name: 'Shitposter', icon: Twitter, color: 'hover:text-sky-400' },
  ];

  const cardBg = isDarkMode 
    ? 'bg-[#09090b] border-zinc-900 shadow-xl' 
    : 'bg-white border-zinc-200 shadow-md shadow-zinc-100/50';

  const pillBg = isDarkMode
    ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-[#27272a] hover:text-white hover:border-zinc-700'
    : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950 hover:border-zinc-300';

  return (
    <section id="skills" className="py-12 relative text-left">
      
      {/* Uppercase section category text */}
      <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-6 border-b border-zinc-200/40 dark:border-zinc-800/25 pb-2">
        Expertise & Stack
      </div>

      {/* Main Container Card styled exactly like Screenshot 2 */}
      <div className={`rounded-2xl p-6 border transition-all duration-300 ${cardBg}`}>
        
        {/* Header line inside the box */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-extrabold text-xl text-zinc-950 dark:text-white">
            Skills
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono flex items-center space-x-1">
            <span>hover on this</span>
            <span>🤭</span>
          </span>
        </div>

        {/* Flex grid list of badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {skillsList.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${pillBg}`}
              >
                <IconComponent className={`h-3.5 w-3.5 transition-colors duration-200 ${
                  hoveredIndex === index ? skill.color.split(' ')[0].replace('hover:', '') : 'text-zinc-400 dark:text-zinc-500'
                }`} />
                <span>{skill.name}</span>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
