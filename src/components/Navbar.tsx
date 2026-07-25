import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Terminal, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenCmd: () => void;
  onToggleTheme: () => void;
  theme: 'default' | 'neon';
  isDarkMode: boolean;
}

export default function Navbar({ onOpenCmd, onToggleTheme, isDarkMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education-certifications', label: 'Credentials' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 180;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBg = isDarkMode
    ? (scrolled ? 'bg-[#090909]/80 border-zinc-800/80 backdrop-blur-md border-b' : 'bg-transparent')
    : (scrolled ? 'bg-[#fcfcfc]/80 border-zinc-200/50 backdrop-blur-md border-b' : 'bg-transparent');

  const textClass = isDarkMode ? 'text-zinc-100' : 'text-zinc-900';
  const mutedTextClass = isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900';

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3.5 ${navBg}`}
      >
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center space-x-1 font-display font-extrabold text-base tracking-tight cursor-pointer select-none ${textClass}`}
          >
            Devansh<span className="text-brand-primary">.</span>
          </button>

          {/* Desktop Navigation Items */}
          <div className={`hidden md:flex items-center space-x-1.5 p-1 rounded-full border ${isDarkMode ? 'bg-[#111]/40 border-zinc-800/80' : 'bg-white/40 border-zinc-200/50'
            } backdrop-blur-md`}>
            {navItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${isActive ? textClass : mutedTextClass
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-bg"
                      className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-zinc-800/60' : 'bg-zinc-100'
                        }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">

            {/* Theme Toggle (Sleek minimalist icon) */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer ${isDarkMode
                  ? 'bg-zinc-900 border-zinc-800 text-amber-400'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900'
                }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium text-xs transition-all tracking-wide cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onToggleTheme}
              className={`p-1.5 rounded-lg border text-xs cursor-pointer ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-amber-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                }`}
            >
              {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg border cursor-pointer ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-500'
                }`}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`fixed inset-x-0 top-[56px] z-30 md:hidden border-b px-6 py-6 ${isDarkMode ? 'bg-[#090909]/95 border-zinc-800/80 text-white' : 'bg-white/95 border-zinc-200/80 text-zinc-800'
              } backdrop-blur-xl`}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-sm font-medium tracking-wide py-1 border-b border-zinc-100 dark:border-zinc-800 ${isActive ? 'text-brand-primary' : 'text-zinc-500'
                      }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <div className="pt-2 flex flex-col space-y-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-xs tracking-wide"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
