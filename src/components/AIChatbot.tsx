import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Sparkles, Bot, User, Trash2, ArrowRight } from 'lucide-react';

interface AIChatbotProps {
  isDarkMode: boolean;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIChatbot({ isDarkMode }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('portfolio_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        role: 'model',
        text: "Hi! I'm Devansh's AI Companion. Ask me anything about his skills, projects, education, or how you can collaborate with him!"
      }
    ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist messages
  useEffect(() => {
    localStorage.setItem('portfolio_chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Create history payload (excluding initial greeting to save tokens / align format)
      const chatHistory = messages
        .filter((_, idx) => idx > 0) // Skip first static greeting
        .map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          text: msg.text
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: chatHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Connection lost. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        text: "Hi! I'm Devansh's AI Companion. Ask me anything about his skills, projects, education, or how you can collaborate with him!"
      }
    ]);
    setError(null);
  };

  const suggestedQuestions = [
    'What are Devansh\'s core skills?',
    'Tell me about his B.Tech studies.',
    'What projects has he built?',
    'How can I contact or hire him?'
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 select-none">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-colors duration-300 group ${
            isOpen 
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/35'
          }`}
          title="Chat with AI"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`fixed bottom-24 right-6 left-6 md:left-auto md:w-96 h-[500px] rounded-2xl border shadow-2xl z-40 flex flex-col overflow-hidden transition-all duration-300 ${
              isDarkMode 
                ? 'bg-[#0a0a0c] border-zinc-900 text-zinc-100' 
                : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-3.5 border-b flex items-center justify-between ${
              isDarkMode ? 'border-zinc-900 bg-[#121215]/80' : 'border-zinc-100 bg-zinc-50'
            }`}>
              <div className="flex items-center space-x-2.5 text-left">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wide flex items-center space-x-1.5">
                    <span>Devansh AI</span>
                    <Sparkles className="h-3 w-3 text-indigo-500 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-emerald-500 font-mono flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    <span>Ready to help</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {messages.length > 1 && (
                  <button 
                    onClick={clearChat}
                    className="p-1.5 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-400 hover:text-red-500 transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-2.5`}
                >
                  {msg.role === 'model' && (
                    <div className="h-6 w-6 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-left whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : isDarkMode 
                        ? 'bg-[#18181b] border border-zinc-800 text-zinc-300 rounded-tl-none' 
                        : 'bg-zinc-100 text-zinc-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="h-6 w-6 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start items-start space-x-2.5">
                  <div className="h-6 w-6 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 animate-bounce" />
                  </div>
                  <div className={`rounded-2xl px-3.5 py-2.5 rounded-tl-none ${
                    isDarkMode ? 'bg-[#18181b] border border-zinc-800' : 'bg-zinc-100'
                  }`}>
                    <div className="flex space-x-1.5 items-center py-1">
                      <div className="h-1.5 w-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-1.5 w-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-1.5 w-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center py-2 px-3 rounded-lg border border-red-500/25 bg-red-500/5 text-red-500 text-[10px] font-mono leading-relaxed">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Footer */}
            {messages.length === 1 && (
              <div className={`px-4 py-3 border-t flex flex-wrap gap-1.5 ${
                isDarkMode ? 'border-zinc-900' : 'border-zinc-100'
              }`}>
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className={`text-[10px] px-2.5 py-1 rounded-full border text-left cursor-pointer transition-colors ${
                      isDarkMode 
                        ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-[#18181b]' 
                        : 'border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className={`p-3.5 border-t flex items-center space-x-2 ${
                isDarkMode ? 'border-zinc-900 bg-[#0e0e11]' : 'border-zinc-100 bg-zinc-50'
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className={`flex-1 px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500' 
                    : 'bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400'
                }`}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-2.5 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  input.trim() && !isLoading
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
