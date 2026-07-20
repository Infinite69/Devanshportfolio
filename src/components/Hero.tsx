import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, User, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: 'Moohfatt',
    artist: 'Rawal',
    url: 'https://open.spotify.com'
  });

  // Simulated Spotify active waveform
  const [waveform, setWaveform] = useState<number[]>([40, 20, 60, 30, 50, 25, 45, 35, 55, 30]);
const [imgError, setImgError] = useState(false);
  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        if (response.ok) {
          const data = await response.json();
          setCurrentSong({
            title: data.title || 'Moohfatt',
            artist: data.artist || 'Rawal',
            url: data.songUrl || 'https://open.spotify.com'
          });
          setIsPlaying(data.isPlaying);
        }
      } catch (err) {
        console.error('Error fetching Spotify status:', err);
      }
    };

    fetchSpotifyData();
    // Poll every 30 seconds for live updates
    const pollInterval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setWaveform([15, 15, 15, 15, 15, 15, 15, 15, 15, 15]);
      return;
    }
    const interval = setInterval(() => {
      setWaveform(prev => prev.map(() => Math.floor(Math.random() * 45) + 15));
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="home" className="py-8 relative select-none">
      
      {/* Top Profile / Bio Section */}
      <div className="flex flex-col space-y-6 text-left">
        
        {/* Cat Avatar + Name header row */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
          {/* Cute animated hand-drawn SVG Cat Avatar inside rounded box */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -1 }}
            className={`w-20 h-20 rounded-2xl overflow-hidden shrink-0 border flex items-center justify-center transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-[#111111] border-zinc-800/80 shadow-lg shadow-black/40' 
                : 'bg-white border-zinc-200 shadow-md shadow-zinc-200/50'
            }`}
          >
             {!imgError ? (
              <img 
                src="/profile.jpg" 
                alt="Devansh Dubey" 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full p-2 flex items-center justify-center">

            <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-700 dark:text-zinc-200">
              {/* Cat Ears */}
              <path d="M15 45 L25 15 L40 38 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M85 45 L75 15 L60 38 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              {/* Inner ear pink */}
              <path d="M20 40 L26 23 L34 36 Z" fill="#fda4af" />
              <path d="M80 40 L74 23 L66 36 Z" fill="#fda4af" />
              {/* Face/Head Base */}
              <rect x="20" y="32" width="60" height="50" rx="25" fill="currentColor" stroke="currentColor" strokeWidth="2" />
              {/* Cute Cat Eyes */}
              <circle cx="38" cy="50" r="4" fill={isDarkMode ? '#000' : '#fff'} />
              <circle cx="62" cy="50" r="4" fill={isDarkMode ? '#000' : '#fff'} />
              <circle cx="39" cy="49" r="1.5" fill={isDarkMode ? '#fff' : '#000'} />
              <circle cx="63" cy="49" r="1.5" fill={isDarkMode ? '#fff' : '#000'} />
              {/* Rosy Cheeks */}
              <ellipse cx="30" cy="56" rx="4" ry="2" fill="#fda4af" />
              <ellipse cx="70" cy="56" rx="4" ry="2" fill="#fda4af" />
              {/* Nose & Whiskers */}
              <polygon points="50,54 47,51 53,51" fill="#f43f5e" />
              {/* Mouth */}
              <path d="M46 56 Q50 59 50 56 Q50 59 54 56" fill="none" stroke={isDarkMode ? '#000' : '#fff'} strokeWidth="2" strokeLinecap="round" />
              {/* Cat Whiskers */}
              <line x1="12" y1="52" x2="24" y2="54" stroke="currentColor" strokeWidth="2" />
              <line x1="10" y1="60" x2="24" y2="59" stroke="currentColor" strokeWidth="2" />
              <line x1="88" y1="52" x2="76" y2="54" stroke="currentColor" strokeWidth="2" />
              <line x1="90" y1="60" x2="76" y2="59" stroke="currentColor" strokeWidth="2" />
            </svg>
              </div>
            )}
          </motion.div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight select-text">
              Devansh Dubey
            </h1>
            <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
              Curious Builder & Full Stack Engineer
            </p>
          </div>
        </div>

        {/* Location / Email / Pronouns Information Grid (Exactly matching Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-x-8 pt-4 pb-2 border-t border-b border-zinc-200/50 dark:border-zinc-800/30">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-1">
              Location
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>Delhi, India</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-1">
              Email
            </div>
            <a 
              href="mailto:devanshd134@gmail.com"
              className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-indigo-500 transition-colors cursor-pointer select-text"
            >
              <Mail className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>devanshd134@gmail.com</span>
            </a>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-1">
              Pronouns
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-300">
              <User className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>he/him</span>
            </div>
          </div>
        </div>

        {/* Descriptive Statement Paragraph */}
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed pt-2 font-sans select-text">
          I build full-stack web products end-to-end, obsessing over small details that make software feel right to use. Currently focused on engineering beautifully responsive interfaces using <span className="font-semibold text-zinc-900 dark:text-zinc-100">TypeScript</span>, <span className="font-semibold text-zinc-900 dark:text-zinc-100">React</span>, <span className="font-semibold text-zinc-900 dark:text-zinc-100">Next.js</span>, and <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tailwind CSS</span>.
        </p>

        {/* Spotify Status Indicator Widget (Exactly matching Image 2) */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {/* Spotify Logo svg */}
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-[#1ED760]" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.782-8.893-.978-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.745 3.856-.882 7.15-.5 9.817 1.134.294.18.386.563.207.857zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.182-.413.125-.844-.107-.968-.52-.125-.413.107-.844.52-.968 3.67-1.114 8.243-.574 11.338 1.328.368.226.49.707.26 1.075zm.105-2.822C14.502 8.764 8.878 8.577 5.613 9.568c-.5.15-1.022-.13-1.173-.63-.15-.5.13-1.022.63-1.173 3.746-1.137 9.943-.92 13.882 1.42.45.267.6.845.333 1.295-.267.45-.845.6-1.295.333z" />
            </svg>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              {isPlaying ? 'Now playing —' : 'Last played —'}
            </span>
            <a 
              href={currentSong.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:text-[#1ED760] transition-colors"
            >
              {currentSong.title} · <span className="font-normal text-zinc-500">{currentSong.artist}</span>
            </a>
          </div>

          {/* Sound Wave Animation Bars */}
          <div className="flex items-end space-x-0.5 h-3">
            {waveform.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.18 }}
                className="w-[2px] bg-[#1ED760] rounded-t-sm"
              />
            ))}
          </div>
        </div>

        {/* Social media icons (Exact Image 2) */}
        <div className="flex items-center space-x-4 pt-1">
          <a 
            href="https://twitter.com/devansh-dubey" 
            target="_blank" 
            rel="noreferrer"
            className="p-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Twitter / X"
          >
            <Twitter className="h-4.5 w-4.5" />
          </a>
          <a 
            href="https://github.com/Infinite69" 
            target="_blank" 
            rel="noreferrer"
            className="p-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="GitHub"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
          <a 
            href="https://linkedin.com/in/devanshdubeyy" 
            target="_blank" 
            rel="noreferrer"
            className="p-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="LinkedIn"
          >
            <Linkedin className="h-4.5 w-4.5" />
          </a>
          <a 
            href="mailto:devanshd134@gmail.com" 
            className="p-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Email"
          >
            <Mail className="h-4.5 w-4.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
