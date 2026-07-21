import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

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
    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: error.message || 'Something went wrong during generation.' });
  }
}
