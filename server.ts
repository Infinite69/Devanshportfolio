import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client (MUST set User-Agent to 'aistudio-build' for telemetry)
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API route for Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
      }

      // Check for GEMINI_API_KEY
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: 'GEMINI_API_KEY is not configured in environment variables. Please add it via Settings > Secrets.' 
        });
      }

      // Convert history format to the format expected by SDK if provided
      // The SDK expects { role: string, parts: [{ text: string }] } format for chats.create
      const chatHistory = (history || []).map((h: any) => ({
        role: h.role,
        parts: [{ text: h.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction: `You are the friendly AI Chat assistant for Devansh Dubey's personal portfolio. 
Your goal is to represent Devansh and answer questions about him politely, professionally, and engagingly.
About Devansh:
- Name: Devansh Dubey
- Title: Curious Builder & Full Stack Engineer
- Contact: devanshd134@gmail.com, LinkedIn: https://linkedin.com/in/devansh-dubey-ece, GitHub: https://github.com/devansh-dubey
- Passion: "Obsessing Over Tiny Pixels", building high-quality, pixel-perfect full-stack web products end-to-end.
- Education:
  1. Maharaja Agrasen Institute of Technology (MAIT Delhi), B.Tech in Electronics & Communication (2023 - 2027), Grade: 7.2/10.0 CGPA.
  2. St. Mary's Public School, CBSE Class XII (Science), Year of Completion: 2023, Grade: 83.4%.
- Skills:
  - Languages/Runtimes & Foundations: C++, Python, JavaScript, TypeScript, Node.js, Data Structures & Algorithms (DSA)
  - Frontend: React.js, Next.js, Tailwind CSS, Framer Motion, Shadcn UI
  - Backend/DB: Express.js, PostgreSQL, MySQL, MongoDB, Redis, Prisma, GraphQL, Firebase, Supabase
  - Cloud/DevOps: AWS, Vercel, Docker, Git, Webpack, Figma
- Experience / Achievements: Includes verified certifications in Full Stack Web Development, UI/UX Design, and Artificial Intelligence & Machine Learning.
- Personality: Energetic, curious, detail-oriented, occasionally writes/posts online ("Shitposter").

Answer questions directly and concisely. Keep answers warm, helpful, and professional. 
If someone wants to contact Devansh, guide them to use the contact form on the website, email him directly at devanshd134@gmail.com, or check out his LinkedIn! Output clean markdown text.`,
        },
        history: chatHistory
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini API error:', error);
      res.status(500).json({ error: error.message || 'Something went wrong during generation.' });
    }
  });

  // Spotify Auth Token helper
  async function getSpotifyAccessToken() {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!client_id || !client_secret || !refresh_token) {
      throw new Error('Spotify environment variables are not fully configured.');
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh Spotify access token: ${response.statusText}`);
    }

    const data: any = await response.json();
    return data.access_token;
  }

  // Get recently played helper as fallback
  async function getRecentlyPlayed(accessToken: string) {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: any = await response.json();
    const track = data.items?.[0]?.track;
    if (!track) return null;

    const title = track.name;
    const artist = track.artists.map((_artist: any) => _artist.name).join(', ');
    const album = track.album.name;
    const albumImageUrl = track.album.images[0]?.url || '';
    const songUrl = track.external_urls.spotify;

    return {
      isPlaying: false,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    };
  }

  // Get currently playing / now playing song
  async function getNowPlaying() {
    const accessToken = await getSpotifyAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return getRecentlyPlayed(accessToken);
    }

    const song: any = await response.json();
    if (!song || !song.item) {
      return getRecentlyPlayed(accessToken);
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0]?.url || '';
    const songUrl = song.item.external_urls.spotify;

    return {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    };
  }

  // Spotify integration endpoint
  app.get('/api/spotify/now-playing', async (req, res) => {
    try {
      const data = await getNowPlaying();
      if (!data) {
        throw new Error('No song found');
      }
      res.json(data);
    } catch (error) {
      // Graceful fallback if variables aren't set or network error
      res.json({
        isPlaying: false,
        title: 'Moohfatt',
        artist: 'Rawal',
        album: 'Sab Chahiye',
        albumImageUrl: '',
        songUrl: 'https://open.spotify.com',
        isPlaceholder: true,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
