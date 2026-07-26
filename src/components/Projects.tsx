import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';
import { Github, Globe, ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  isDarkMode: boolean;
}

export default function Projects({ isDarkMode }: ProjectsProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // States for interactive visual mockups
  const [interiorColor, setInteriorColor] = useState('#7C3AED');
  const [staffFilter, setStaffFilter] = useState('All');
  const [baxySpeed, setBaxySpeed] = useState(72);
  const [textureFinish, setTextureFinish] = useState('obsidian');

  // Interactive mockup renderers
  const renderVisualMockup = (type: string) => {
    const bgStyle = isDarkMode ? 'bg-[#111111]/90 border-zinc-800' : 'bg-white border-zinc-200';
    const textStyle = isDarkMode ? 'text-zinc-300' : 'text-zinc-600';
    const labelStyle = isDarkMode ? 'text-zinc-500' : 'text-zinc-400';

    switch (type) {
      case 'interior':
        return (
          <div className={`absolute inset-0 flex flex-col justify-between p-4 font-sans select-none overflow-hidden rounded-xl border ${bgStyle}`}>
            <div className="flex items-center justify-between border-b border-zinc-200/20 dark:border-zinc-800/20 pb-2">
              <span className={`font-mono text-[9px] tracking-wider ${labelStyle}`}>PREVIEW • INTERIOR.AI</span>
              <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50 px-1.5 py-0.5 rounded uppercase">React</span>
            </div>

            <div className="flex-1 flex items-center justify-center relative my-2">
              <div 
                className="w-full max-w-[140px] aspect-[4/3] rounded-lg border p-3 flex flex-col justify-between transition-all duration-500 relative"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(24,24,27,0.9)' : 'rgba(250,250,250,0.9)',
                  borderColor: `${interiorColor}33`,
                  boxShadow: `0 0 15px ${interiorColor}10`
                }}
              >
                <div className={`w-full h-8 rounded border flex items-center justify-center text-[9px] ${textStyle} ${isDarkMode ? 'bg-zinc-800/40 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
                  Minimalist Couch
                </div>
                <div className="flex justify-between items-center text-[8px] text-zinc-400">
                  <span>Room: Living</span>
                  <span>Scale: 1:20</span>
                </div>
                <div 
                  className="absolute bottom-2 right-2 h-2 w-2 rounded-full transition-colors duration-500" 
                  style={{ backgroundColor: interiorColor }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200/20 dark:border-zinc-800/20 pt-2">
              <span className={`text-[9px] ${labelStyle}`}>Select accent:</span>
              <div className="flex items-center space-x-1.5">
                {['#7C3AED', '#3B82F6', '#EF4444', '#10B981'].map(color => (
                  <button
                    key={color}
                    onClick={(e) => {
                      e.stopPropagation();
                      setInteriorColor(color);
                    }}
                    className="h-3 w-3 rounded-full border border-zinc-300 transition-transform hover:scale-125 cursor-pointer"
                    style={{ backgroundColor: color, transform: interiorColor === color ? 'scale(1.2)' : 'none' }}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'staff':
        const employees = [
          { name: 'Devansh D.', role: 'Admin', status: 'Online' },
          { name: 'Aarav S.', role: 'Designer', status: 'Offline' }
        ];

        return (
          <div className={`absolute inset-0 flex flex-col justify-between p-4 font-sans select-none overflow-hidden rounded-xl border ${bgStyle}`}>
            <div className="flex items-center justify-between border-b border-zinc-200/20 dark:border-zinc-800/20 pb-2">
              <span className={`font-mono text-[9px] tracking-wider ${labelStyle}`}>STAFF PORTAL CORE</span>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase">Full Stack</span>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-1.5 my-2">
              {employees
                .filter(emp => staffFilter === 'All' || emp.status === staffFilter)
                .map((emp, i) => (
                  <div key={i} className={`flex items-center justify-between p-1.5 rounded border text-left ${isDarkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                    <div className="flex items-center space-x-2">
                      <span className="h-4.5 w-4.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[8px] flex items-center justify-center font-bold">
                        {emp.name[0]}
                      </span>
                      <div>
                        <div className={`text-[9px] font-medium ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{emp.name}</div>
                        <div className="text-[7px] text-zinc-400">{emp.role}</div>
                      </div>
                    </div>
                    <span className={`text-[7px] px-1 py-0.2 rounded-full ${
                      emp.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-200/50 text-zinc-500'
                    }`}>
                      {emp.status}
                    </span>
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200/20 dark:border-zinc-800/20 pt-2">
              <span className={`text-[9px] ${labelStyle}`}>Filter:</span>
              <div className="flex space-x-1">
                {['All', 'Online'].map(f => (
                  <button
                    key={f}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStaffFilter(f);
                    }}
                    className={`text-[8px] px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                      staffFilter === f 
                        ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 font-semibold' 
                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'baxy':
        return (
          <div className={`absolute inset-0 flex flex-col justify-between p-4 font-sans select-none overflow-hidden rounded-xl border ${bgStyle}`}>
            <div className="flex items-center justify-between border-b border-zinc-200/20 dark:border-zinc-800/20 pb-2">
              <span className={`font-mono text-[9px] tracking-wider ${labelStyle}`}>BAXY VEHICLE SIM</span>
              <span className="text-[9px] bg-blue-500/10 text-blue-500 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase font-medium">B2B Redesign</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center my-2">
              <div className="relative flex items-center justify-center h-16 w-16 rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                <div className="text-center">
                  <span className={`font-mono text-base font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{baxySpeed}</span>
                  <div className="text-[7px] text-zinc-400 uppercase tracking-widest -mt-0.5">Km/h</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200/20 dark:border-zinc-800/20 pt-2">
              <span className={`text-[9px] ${labelStyle}`}>Speed:</span>
              <input
                type="range"
                min="0"
                max="120"
                value={baxySpeed}
                onChange={(e) => {
                  e.stopPropagation();
                  setBaxySpeed(Number(e.target.value));
                }}
                className="w-16 h-1 accent-zinc-900 dark:accent-zinc-100 cursor-pointer bg-zinc-200 dark:bg-zinc-800 rounded-full"
              />
            </div>
          </div>
        );

      case 'texture':
        return (
          <div className={`absolute inset-0 flex flex-col justify-between p-4 font-sans select-none overflow-hidden rounded-xl border ${bgStyle}`}>
            <div className="flex items-center justify-between border-b border-zinc-200/20 dark:border-zinc-800/20 pb-2">
              <span className={`font-mono text-[9px] tracking-wider ${labelStyle}`}>SK CATALOGUE</span>
              <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50 px-1.5 py-0.5 rounded uppercase">Luxury</span>
            </div>

            <div className="flex-1 flex items-center justify-center my-2 relative">
              <div 
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-center transition-all duration-500"
                style={{
                  backgroundImage: textureFinish === 'obsidian' 
                    ? 'radial-gradient(circle, rgba(17,17,17,1) 0%, rgba(9,9,9,1) 100%)' 
                    : textureFinish === 'slate' 
                    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                    : 'linear-gradient(45deg, #3f3f46 0%, #18181b 100%)'
                }}
              >
                <div className="px-2">
                  <div className="text-[9px] text-white font-semibold font-display tracking-wide uppercase">
                    {textureFinish === 'obsidian' ? 'Obsidian' : textureFinish === 'slate' ? 'Slate Grey' : 'Sienna'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200/20 dark:border-zinc-800/20 pt-2">
              <span className={`text-[9px] ${labelStyle}`}>Swatch:</span>
              <div className="flex space-x-1">
                {['obsidian', 'slate', 'sienna'].map(swatch => (
                  <button
                    key={swatch}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTextureFinish(swatch);
                    }}
                    className={`text-[8px] px-1.5 py-0.5 rounded border cursor-pointer transition-all ${
                      textureFinish === swatch 
                        ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 bg-zinc-900/5 dark:bg-zinc-100/5' 
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    {swatch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const allTech = Array.from(new Set(projects.flatMap(p => p.tech)));

  const filteredProjects = projects.filter(p => {
    return selectedTech === null || p.tech.includes(selectedTech);
  });

  return (
    <section id="projects" className="py-4 relative text-left">
      
      {/* Bold section title with a trailing dot */}
      <h2 className="text-lg sm:text-xl font-extrabold font-sans text-zinc-950 dark:text-zinc-50 mb-6">
        Selected Projects.
      </h2>

      {/* Quick Stack Filter list inside of a clean list row */}
      <div className="flex flex-wrap gap-2 mb-10 text-xs">
        <button
          onClick={() => setSelectedTech(null)}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
            selectedTech === null 
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-sm' 
              : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 hover:bg-zinc-200'
          }`}
        >
          ALL
        </button>
        {allTech.map(tech => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
              selectedTech === tech 
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-sm' 
                : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 hover:bg-zinc-200'
            }`}
          >
            {tech.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left"
              >
                {/* Left side: interactive custom mockup block */}
                <div className="md:col-span-4 relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                  {renderVisualMockup(project.visualType)}
                </div>

                {/* Right side: text details */}
                <div className="md:col-span-8 flex flex-col space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map(t => (
                      <span 
                        key={t}
                        className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-mono text-[9px] uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-zinc-950 dark:text-zinc-100">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-400 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Actions Links row */}
                  <div className="flex items-center space-x-4 pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors font-mono"
                      >
                        <span>Source Code</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors font-mono"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </section>
  );
}
