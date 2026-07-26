import { Home, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenCmd: () => void;
  onToggleTheme: () => void;
  theme: 'default' | 'neon';
  isDarkMode: boolean;
}

export default function Navbar({ onToggleTheme, isDarkMode }: NavbarProps) {
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto">
      <div className={`flex items-center space-x-4 px-5 py-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
        isDarkMode 
          ? 'bg-zinc-950/80 border-zinc-800/80 shadow-black/40' 
          : 'bg-white/85 border-zinc-200/80 shadow-zinc-200/30'
      }`}>
        <button
          onClick={() => handleNavClick('home')}
          className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-115 cursor-pointer"
          title="Home"
        >
          <Home className="h-4.5 w-4.5" />
        </button>
        <a
          href="https://github.com/Infinite69"
          target="_blank"
          rel="noreferrer"
          className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-115 cursor-pointer"
          title="GitHub"
        >
          <Github className="h-4.5 w-4.5" />
        </a>
        <a
          href="https://linkedin.com/in/devanshdubeyy"
          target="_blank"
          rel="noreferrer"
          className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-115 cursor-pointer"
          title="LinkedIn"
        >
          <Linkedin className="h-4.5 w-4.5" />
        </a>
        <button
          onClick={() => handleNavClick('contact')}
          className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-115 cursor-pointer"
          title="Contact"
        >
          <Mail className="h-4.5 w-4.5" />
        </button>
        
        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
        
        <button
          onClick={onToggleTheme}
          className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-115 cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-zinc-650" />}
        </button>
      </div>
    </div>
  );
}
