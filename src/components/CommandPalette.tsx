import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Hash, Globe, FileText, Github, Linkedin, Mail, CornerDownLeft, Sparkles, Laptop, Eye } from 'lucide-react';
import { projects } from '../data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}

export default function CommandPalette({ isOpen, onClose, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent will toggle
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const items = [
    { id: 'sec-home', label: 'Go to Home', category: 'Navigation', icon: Hash, action: () => scrollToSection('home') },
    { id: 'sec-projects', label: 'Go to Projects', category: 'Navigation', icon: Hash, action: () => scrollToSection('projects') },
    { id: 'sec-experience', label: 'Go to Experience', category: 'Navigation', icon: Hash, action: () => scrollToSection('experience') },
    { id: 'sec-education', label: 'Go to Education & Credentials', category: 'Navigation', icon: Hash, action: () => scrollToSection('education-certifications') },
    { id: 'sec-contact', label: 'Go to Contact', category: 'Navigation', icon: Hash, action: () => scrollToSection('contact') },
    
    { id: 'theme-toggle', label: 'Toggle High Contrast Neon Theme', category: 'Preferences', icon: Sparkles, action: onToggleTheme },
    { id: 'download-resume', label: 'Download Resume (PDF)', category: 'Documents', icon: FileText, action: () => window.open('#', '_blank') },
    
    { id: 'link-github', label: 'Open Devansh\'s GitHub Profile', category: 'Socials', icon: Github, action: () => window.open('https://github.com/devansh-dubey', '_blank') },
    { id: 'link-linkedin', label: 'Open Devansh\'s LinkedIn Profile', category: 'Socials', icon: Linkedin, action: () => window.open('https://linkedin.com/in/devansh-dubey-ece', '_blank') },
    { id: 'link-email', label: 'Send an Email (devanshd134@gmail.com)', category: 'Socials', icon: Mail, action: () => window.open('mailto:devanshd134@gmail.com', '_blank') },
  ];

  // Add projects to searchable items
  const projectItems = projects.map(p => ({
    id: `project-${p.id}`,
    label: `Project: ${p.title}`,
    category: 'Projects',
    icon: Globe,
    action: () => scrollToSection(`project-${p.id}`)
  }));

  const allItems = [...items, ...projectItems];

  const filteredItems = query
    ? allItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  // Keyboard navigation
  const handleListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Ensure selected item stays in view
  useEffect(() => {
    const listEl = listRef.current;
    if (listEl) {
      const selectedEl = listEl.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        const listHeight = listEl.clientHeight;
        const selectedTop = selectedEl.offsetTop;
        const selectedHeight = selectedEl.clientHeight;

        if (selectedTop + selectedHeight > listEl.scrollTop + listHeight) {
          listEl.scrollTop = selectedTop + selectedHeight - listHeight;
        } else if (selectedTop < listEl.scrollTop) {
          listEl.scrollTop = selectedTop;
        }
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cmd-palette-wrapper" className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            id="cmd-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            id="cmd-palette-dialog"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel border-brand-border shadow-2xl shadow-black/90"
            onKeyDown={handleListKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-white/5 px-4 py-3.5">
              <Search className="h-4 w-4 text-brand-muted shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search projects..."
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-white placeholder-brand-muted outline-none border-none font-sans"
              />
              <div className="hidden sm:flex items-center space-x-1.5 ml-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-brand-muted border border-white/10 uppercase">ESC</span>
              </div>
            </div>

            {/* List */}
            <div
              ref={listRef}
              className="max-h-[300px] overflow-y-auto p-2 space-y-0.5"
            >
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-brand-muted font-mono">
                  No matching actions or projects found.
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                        isSelected 
                          ? 'bg-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border-l-2 border-brand-primary' 
                          : 'text-brand-muted hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3 text-xs">
                        <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-brand-primary' : 'text-brand-muted'}`} />
                        <span className="font-sans font-medium">{item.label}</span>
                        <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : 'bg-white/5 text-brand-muted/70'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <span className="flex items-center space-x-1 text-[10px] font-mono text-brand-muted/70">
                          <span>Select</span>
                          <CornerDownLeft className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Hint Footer */}
            <div className="border-t border-white/5 bg-white/[0.01] px-4 py-2.5 flex items-center justify-between font-mono text-[10px] text-brand-muted">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1"><span className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑↓</span> <span>Navigate</span></span>
                <span className="flex items-center space-x-1"><span className="px-1 py-0.5 rounded bg-white/5 border border-white/10">Enter</span> <span>Execute</span></span>
              </div>
              <span className="flex items-center space-x-1">
                <Laptop className="h-3 w-3 mr-1 text-brand-secondary" />
                <span>Portfolio Control Deck</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
