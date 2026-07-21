import { motion } from 'motion/react';
import { certificationsData } from '../data';
import { GraduationCap, Award, ChevronRight } from 'lucide-react';

interface EducationCertificationsProps {
  isDarkMode: boolean;
}

export default function EducationCertifications({ isDarkMode }: EducationCertificationsProps) {
  return (
    <section id="education-certifications" className="py-16 relative">
      
      {/* Uppercase Section Title on Left */}
      <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-8 border-b border-zinc-200/40 dark:border-zinc-800/25 pb-2 text-left">
        Education & Credentials
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        {/* Left Column: Academic block */}
        <div className="space-y-4 flex flex-col justify-stretch">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl p-6 border flex-1 ${
              isDarkMode ? 'bg-[#111111]/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            } flex flex-col justify-between`}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">
                    Maharaja Agrasen Institute of Technology
                  </h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono mt-0.5">MAIT Delhi</p>
                </div>
              </div>

              <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800/50 my-2" />

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Degree:</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 text-right">B.Tech Electronics & Communication</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Scope:</span>
                  <span className="text-zinc-600 dark:text-zinc-300">2023 – 2027</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Grade:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">7.2 <span className="text-[10px] font-normal text-zinc-400">/ 10.0 CGPA</span></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 12th Grade block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`rounded-2xl p-6 border flex-1 ${
              isDarkMode ? 'bg-[#111111]/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            } flex flex-col justify-between`}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">
                    St. Mary's Public School
                  </h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono mt-0.5">Senior Secondary</p>
                </div>
              </div>

              <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800/50 my-2" />

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Board / Course:</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 text-right">CBSE — Class XII (Science)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Year of Completion:</span>
                  <span className="text-zinc-600 dark:text-zinc-300">2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Result:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">83.4%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Certifications lists */}
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center space-x-1.5 mb-1">
            <Award className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
            <span>Verified Udemy Certifications</span>
          </h4>

          <div className="flex flex-col gap-2.5">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-xl p-3 border flex items-center justify-between transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-800 hover:bg-zinc-900/60' 
                    : 'bg-zinc-50/50 border-zinc-150 hover:border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  <div>
                    <h4 className="font-display font-semibold text-xs text-zinc-800 dark:text-zinc-200">
                      {cert.title}
                    </h4>
                    <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-3 w-3 text-zinc-400" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
