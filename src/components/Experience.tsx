import { motion } from 'motion/react';
import { experienceData } from '../data';

interface ExperienceProps {
  isDarkMode: boolean;
}

export default function Experience({ isDarkMode }: ExperienceProps) {
  // Let's render custom tech stack circles for each experience as shown in the screenshot!
  // In the screenshot there is a row of small circles with logo colors. Let's make custom SVG circles or neat letters.
  const getTechIconsForExperience = (company: string) => {
    if (company.includes('Baxy')) {
      return [
        { name: 'React', color: 'bg-cyan-500/10 text-cyan-400', label: 'R' },
        { name: 'Tailwind', color: 'bg-teal-500/10 text-teal-400', label: 'T' },
        { name: 'Framer', color: 'bg-purple-500/10 text-purple-400', label: 'F' },
        { name: 'JS', color: 'bg-amber-500/10 text-amber-400', label: 'JS' },
        { name: 'TS', color: 'bg-blue-500/10 text-blue-400', label: 'TS' }
      ];
    } else {
      return [
        { name: 'Premiere', color: 'bg-violet-500/10 text-violet-400', label: 'Pr' },
        { name: 'AfterEffects', color: 'bg-indigo-500/10 text-indigo-400', label: 'Ae' },
        { name: 'Photoshop', color: 'bg-blue-500/10 text-blue-400', label: 'Ps' },
        { name: 'Illustrator', color: 'bg-amber-500/10 text-amber-400', label: 'Ai' }
      ];
    }
  };

  return (
    <section id="experience" className="py-16 relative text-left">
      
      {/* Small grey section uppercase title on the left */}
      <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-8 border-b border-zinc-200/40 dark:border-zinc-800/25 pb-2">
        Experience
      </div>

      {/* Timeline core */}
      <div className="relative border-l border-zinc-200/60 dark:border-zinc-800/50 pl-6 sm:pl-8 space-y-12">
        
        {experienceData.map((exp, index) => {
          const isLatest = index === 0;
          const techIcons = getTechIconsForExperience(exp.company);

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Green/Turquoise or Grey Bullet Dot exactly as in Image 1 */}
              <span className="absolute -left-[31px] sm:-left-[39px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#fcfcfc] dark:bg-[#090909]">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  isLatest 
                    ? 'bg-emerald-400 dark:bg-emerald-500 ring-4 ring-emerald-400/20 dark:ring-emerald-500/20' 
                    : 'bg-zinc-400 dark:bg-zinc-600'
                }`} />
              </span>

              {/* Title & Date alignment row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-zinc-950 dark:text-zinc-100 leading-snug">
                    {exp.role} <span className="text-zinc-600 dark:text-zinc-400 font-normal">· {exp.company}</span>
                  </h3>
                  <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5">
                    Remote, Full-Time
                  </p>
                </div>
                
                {/* Period aligned to right */}
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 whitespace-nowrap self-start sm:self-center">
                  {exp.period}
                </span>
              </div>

              {/* Work highlights list */}
              <div className="space-y-2 mt-4">
                <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-300 font-sans leading-relaxed">
                  During my time at {exp.company}, I actively spearheaded digital enhancements and modern interfaces:
                </p>
                
                <ul className="space-y-1.5 pl-1">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-400 leading-relaxed font-sans flex items-start space-x-2">
                      <span className="text-zinc-650 dark:text-zinc-500 mt-0.5 select-none">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack badges row below the highlights exactly matching image 1 */}
              <div className="flex items-center space-x-2 mt-4 pt-1">
                {techIcons.map((tech, tIdx) => (
                  <div
                    key={tIdx}
                    className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-[9px] font-bold ${tech.color} shadow-sm border border-zinc-200/20 dark:border-zinc-800/20`}
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
