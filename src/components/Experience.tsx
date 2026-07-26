import { motion } from 'motion/react';
import { experienceData } from '../data';

interface ExperienceProps {
  isDarkMode: boolean;
}

export default function Experience({ isDarkMode }: ExperienceProps) {
  const getTechIconsForExperience = (company: string) => {
    if (company.includes('Baxy')) {
      return [
        { name: 'React', color: 'bg-cyan-500/10 text-cyan-400', label: 'R' },
        { name: 'Tailwind', color: 'bg-teal-500/10 text-teal-400', label: 'T' },
        { name: 'Framer', color: 'bg-purple-500/10 text-purple-400', label: 'F' },
        { name: 'JS', color: 'bg-amber-500/10 text-amber-450', label: 'JS' },
        { name: 'TS', color: 'bg-blue-500/10 text-blue-400', label: 'TS' }
      ];
    } else {
      return [
        { name: 'Premiere', color: 'bg-violet-500/10 text-violet-400', label: 'Pr' },
        { name: 'AfterEffects', color: 'bg-indigo-500/10 text-indigo-400', label: 'Ae' },
        { name: 'Photoshop', color: 'bg-blue-500/10 text-blue-400', label: 'Ps' },
        { name: 'Illustrator', color: 'bg-amber-500/10 text-amber-455', label: 'Ai' }
      ];
    }
  };

  const renderCompanyLogo = (company: string) => {
    if (company.toLowerCase().includes('baxy')) {
      return (
        <div className="h-10 w-10 rounded-full bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-extrabold text-sm shrink-0 border border-zinc-800 shadow-sm">
          B
        </div>
      );
    }
    if (company.toLowerCase().includes('fiverr')) {
      return (
        <div className="h-10 w-10 rounded-full bg-[#1dbf73] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm">
          f
        </div>
      );
    }
    return (
      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-extrabold text-sm shrink-0">
        {company[0]}
      </div>
    );
  };

  return (
    <section id="experience" className="py-4 relative text-left">
      {/* Title block */}
      <h2 className="text-lg sm:text-xl font-extrabold font-sans text-zinc-950 dark:text-zinc-50 mb-6">
        Work Experience.
      </h2>

      {/* Cards list */}
      <div className="space-y-4">
        {experienceData.map((exp, index) => {
          const techIcons = getTechIconsForExperience(exp.company);
          const combinedDescription = exp.highlights.join(' ');

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl p-5 border flex flex-col space-y-4 transition-all ${
                isDarkMode 
                  ? 'bg-zinc-900/20 border-zinc-800/80' 
                  : 'bg-zinc-50/30 border-zinc-200/70 hover:border-zinc-250/90'
              }`}
            >
              {/* Top Row: Logo + details */}
              <div className="flex items-start space-x-3.5">
                {renderCompanyLogo(exp.company)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50">
                      {exp.company}
                    </h3>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80 px-2.5 py-0.5 rounded-full bg-white dark:bg-zinc-950 font-mono font-medium self-start sm:self-center">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {exp.role}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-350 font-sans leading-relaxed pl-1 sm:pl-13 select-text">
                {combinedDescription}
              </p>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-2 pt-1 pl-1 sm:pl-13">
                {techIcons.map((tech, tIdx) => (
                  <div
                    key={tIdx}
                    className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-[9px] font-bold ${tech.color} shadow-sm border border-zinc-200/20 dark:border-zinc-850`}
                    title={tech.name}
                  >
                    {tech.label}
                  </div>
                ))}
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
