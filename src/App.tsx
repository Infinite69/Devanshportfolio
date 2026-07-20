import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import EducationCertifications from './components/EducationCertifications';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [themePreset, setThemePreset] = useState<'default' | 'neon'>('default');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved !== null ? saved === 'dark' : true; // Default to dark (true) on first load/reload
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync theme with document class and persist
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Track scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={isDarkMode ? 'dark bg-[#090909] text-zinc-100' : 'bg-[#fcfcfc] text-zinc-800'}>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div 
          className={`min-h-screen relative transition-all duration-700 overflow-x-hidden`}
        >
          {/* Fixed Scroll Progress Indicator */}
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-200/30 dark:bg-zinc-800/30 z-50 pointer-events-none">
            <div 
              className="h-full bg-gradient-to-r from-[#4f46e5] via-[#06b6d4] to-[#4f46e5] transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Premium Ambient Cursor Spotlights (Desktop only) */}
          <CustomCursor />

          {/* Floating Command Palette (Ctrl + K) */}
          <CommandPalette 
            isOpen={cmdOpen} 
            onClose={() => setCmdOpen(false)} 
            onToggleTheme={handleToggleTheme}
          />

          {/* Fixed Header Layout */}
          <Navbar 
            onOpenCmd={() => setCmdOpen(true)} 
            onToggleTheme={handleToggleTheme} 
            theme={themePreset} 
            isDarkMode={isDarkMode}
          />

          {/* Modular sections restricted to elegant centered ratio */}
          <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 pb-12 pt-28">
            <Hero isDarkMode={isDarkMode} />
            <Projects isDarkMode={isDarkMode} />
            <Skills isDarkMode={isDarkMode} />
            <Experience isDarkMode={isDarkMode} />
            <EducationCertifications isDarkMode={isDarkMode} />
            <Contact isDarkMode={isDarkMode} />
          </main>

          {/* Footer controls */}
          <Footer isDarkMode={isDarkMode} />

          {/* Floating AI Chatbot */}
          <AIChatbot isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
}

