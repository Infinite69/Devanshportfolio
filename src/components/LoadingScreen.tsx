import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      
      setProgress(nextProgress);

      if (nextProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 600); // Wait for transition out
        }, 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg select-none"
        >
          {/* subtle mesh background */}
          <div className="absolute inset-0 bg-grid-subtle opacity-40" />
          
          <div className="relative flex flex-col items-center max-w-xs w-full px-6">
            {/* Title */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center space-x-1 mb-8"
            >
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                Devansh<span className="text-brand-primary">.</span>
              </span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20 text-brand-primary/90">
                2026
              </span>
            </motion.div>

            {/* Percentage counter */}
            <div className="w-full flex justify-between items-baseline mb-2 font-mono text-xs">
              <span className="text-brand-muted uppercase tracking-widest">Compiling System</span>
              <span className="text-white font-medium text-sm">{progress}%</span>
            </div>

            {/* Loading Bar */}
            <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="loading-bar-fill"
              />
              {/* Glow Tip */}
              <div 
                className="absolute h-2 w-2 rounded-full bg-brand-secondary glow-blue -translate-y-1/2 top-1/2 transition-all duration-75"
                style={{ left: `calc(${progress}% - 4px)` }}
              />
            </div>

            {/* Subtle Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
              className="mt-4 font-mono text-[10px] text-brand-muted tracking-wide text-center uppercase"
            >
              Curating architectural digital experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
