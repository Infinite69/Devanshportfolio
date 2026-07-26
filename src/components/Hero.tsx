import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

function ClockWidget() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

export default function Hero({ isDarkMode }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: 'wy@',
    artist: 'Brent Faiyaz',
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
            title: data.title || 'wy@',
            artist: data.artist || 'Brent Faiyaz',
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
    <section id="home" className="pb-4 relative select-none">
      {/* Top Profile / Bio Section */}
      <div className="flex flex-col space-y-5 text-left">
        
        {/* Top greeting and time line */}
        <div className="flex justify-between items-center text-xs text-zinc-400 dark:text-zinc-500 font-mono">
          <span>hi there, I'm</span>
          <ClockWidget />
        </div>

        {/* Circular Avatar + Name Row */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm shrink-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/60">
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
                <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-650 dark:text-zinc-300">
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
                  {/* Rosy Cheeks */}
                  <ellipse cx="30" cy="56" rx="4" ry="2" fill="#fda4af" />
                  <ellipse cx="70" cy="56" rx="4" ry="2" fill="#fda4af" />
                  {/* Nose & Whiskers */}
                  <polygon points="50,54 47,51 53,51" fill="#f43f5e" />
                  {/* Mouth */}
                  <path d="M46 56 Q50 59 50 56 Q50 59 54 56" fill="none" stroke={isDarkMode ? '#000' : '#fff'} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
            Devansh Dubey
          </h1>
        </div>

        {/* Subtitle location details */}
        <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-450 font-sans font-medium">
          he/him &nbsp;||&nbsp; Full Stack Engineer from Delhi, India.
        </div>

        {/* Capsule Resume button + squared social buttons */}
        <div className="flex items-center space-x-3 pt-1">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-1.5 rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 font-semibold text-xs tracking-wide transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm"
          >
            Resume
          </a>

          <div className="flex items-center space-x-2">
            <a
              href="mailto:devanshd134@gmail.com"
              className="w-8.5 h-8.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
              title="Email"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://github.com/Infinite69"
              target="_blank"
              rel="noreferrer"
              className="w-8.5 h-8.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
              title="GitHub"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://linkedin.com/in/devanshdubeyy"
              target="_blank"
              rel="noreferrer"
              className="w-8.5 h-8.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
              title="LinkedIn"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Biography Paragraph */}
        <p className="text-sm sm:text-base text-zinc-850 dark:text-zinc-300 leading-relaxed pt-2 font-sans select-text">
          I build full-stack web products end-to-end, obsessing over small details that make software feel right to use. Currently focused on engineering beautifully responsive, high-performance interfaces using React, Next.js, and Tailwind CSS.
        </p>

        {/* Spotify Status Indicator Widget */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/25">
          <div className="flex items-center space-x-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#1ED760]" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.782-8.893-.978-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.745 3.856-.882 7.15-.5 9.817 1.134.294.18.386.563.207.857zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.182-.413.125-.844-.107-.968-.52-.125-.413.107-.844.52-.968 3.67-1.114 8.243-.574 11.338 1.328.368.226.49.707.26 1.075zm.105-2.822C14.502 8.764 8.878 8.577 5.613 9.568c-.5.15-1.022-.13-1.173-.63-.15-.5.13-1.022.63-1.173 3.746-1.137 9.943-.92 13.882 1.42.45.267.6.845.333 1.295-.267.45-.845.6-1.295.333z" />
            </svg>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wider">
              {isPlaying ? 'Now playing —' : 'Last played —'}
            </span>
            <a
              href={currentSong.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 hover:text-[#1ED760] transition-colors"
            >
              {currentSong.title} · <span className="font-normal text-zinc-500 dark:text-zinc-400">{currentSong.artist}</span>
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

      </div>
    </section>
  );
}
