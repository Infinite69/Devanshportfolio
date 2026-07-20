import { motion } from 'motion/react';
import { User, BookOpen, Award, GraduationCap, Heart, Terminal } from 'lucide-react';


export default function About() {
  return (
    <section id="about" className="py-24 relative bg-brand-bg px-6 overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute top-[40%] right-[5%] w-[300px] h-[300px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section title */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary font-semibold px-2.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            Profile Overview
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            About Me
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-1" />
        </div>

        {/* Premium grid card layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Main narrative block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-2 text-brand-primary">
                <Terminal className="h-4 w-4" />
                <span className="font-mono text-xs tracking-wider uppercase font-semibold">The Developer's Journey</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                Devansh Dubey
              </h3>

              <div className="space-y-4 font-sans text-brand-muted text-sm sm:text-base leading-relaxed">
                <p>
                  I'm a Full Stack Developer passionate about building responsive web applications with modern UI and scalable backend architecture. 
                </p>
                <p>
                  Currently pursuing B.Tech in Electronics & Communication Engineering at Maharaja Agrasen Institute of Technology (MAIT), Delhi.
                </p>
                <p>
                  I enjoy transforming ideas into polished digital products while continuously improving my development and design skills.
                </p>
              </div>
            </div>

            {/* Quick metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 font-mono text-left">
              <div>
                <div className="text-white font-bold text-xl sm:text-2xl tracking-tight">7.2</div>
                <div className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">Current CGPA</div>
              </div>
              <div>
                <div className="text-white font-bold text-xl sm:text-2xl tracking-tight">15+</div>
                <div className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">Projects Built</div>
              </div>
              <div>
                <div className="text-white font-bold text-xl sm:text-2xl tracking-tight">2026</div>
                <div className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">Graduation</div>
              </div>
            </div>
          </motion.div>

          {/* Core Strengths column with microcards */}
          <div className="md:col-span-5 flex flex-col gap-4">
            
            {/* College info mini card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-brand-card border border-brand-border p-5 flex items-start space-x-4 text-left hover:border-brand-primary/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white">MAIT Delhi</h4>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Maharaja Agrasen Institute of Technology. Exploring core ECE theory with strong programming foundations.
                </p>
              </div>
            </motion.div>

            {/* Craft ethos card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-brand-card border border-brand-border p-5 flex items-start space-x-4 text-left hover:border-brand-secondary/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 shrink-0">
                <Heart className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white">Ethos & Execution</h4>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Inspired by Apple's user-centric designs, Vercel's fast-loading standards, and Linear's interface precision.
                </p>
              </div>
            </motion.div>

            {/* Hobbies / Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl bg-brand-card border border-brand-border p-5 flex items-start space-x-4 text-left hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white">Continuous Growth</h4>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Continuously absorbing textbooks on modern APIs, exploring artificial intelligence paradigms, and refining visual design skills.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
