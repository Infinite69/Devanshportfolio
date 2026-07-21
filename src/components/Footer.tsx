import { useEffect, useState } from 'react';
import { ChevronUp, Sparkles } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerBorder = isDarkMode ? 'border-zinc-850' : 'border-zinc-200/60';
  const textClass = isDarkMode ? 'text-zinc-500' : 'text-zinc-400';
  const linkClass = isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900';

  return (
    <footer className={`border-t ${footerBorder} py-12 px-6 relative z-10 select-none`}>
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding name */}
        <div className={`flex items-center space-x-2 text-xs ${textClass}`}>
          <span className={`font-display font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Devansh Dubey</span>
          <span className="opacity-40">•</span>
          <span className="font-mono">© 2026</span>
        </div>

        {/* Middle: Brief message/ethos */}
        <p className="font-mono text-[9px] text-zinc-400/60 uppercase tracking-widest flex items-center space-x-1">
          <Sparkles className="h-3 w-3 text-brand-primary" />
          <span>Obsessing Over Tiny Pixels</span>
        </p>

        {/* Right: Quick action links and social shortcuts */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Infinite69"
            target="_blank"
            rel="noreferrer"
            className={`text-xs font-mono transition-colors ${linkClass}`}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/devanshdubeyy"
            target="_blank"
            rel="noreferrer"
            className={`text-xs font-mono transition-colors ${linkClass}`}
          >
            LinkedIn
          </a>
          <a
            href="mailto:devanshd134@gmail.com"
            className={`text-xs font-mono transition-colors ${linkClass}`}
          >
            Email
          </a>
        </div>

      </div>

      {/* Elegant Floating Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-45 p-2.5 rounded-full border transition-all cursor-pointer shadow-lg flex items-center justify-center group ${
            isDarkMode 
              ? 'bg-[#111111] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700' 
              : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:shadow-zinc-200/60'
          }`}
          title="Back to Top"
        >
          <ChevronUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}

    </footer>
  );
}
