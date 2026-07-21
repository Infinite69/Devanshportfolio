import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Calendar, Mail, Linkedin, Clock, CheckCircle2, ArrowUpRight, Send, Quote } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

export default function Contact({ isDarkMode }: ContactProps) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number>(1);

  // Dynamic Visitor Counter with LocalStorage support!
  useEffect(() => {
    try {
      const storedCount = localStorage.getItem('portfolio_visitor_count_devansh');
      if (storedCount) {
        const count = parseInt(storedCount, 10);
        const newCount = count + 1;
        setVisitorCount(newCount);
        localStorage.setItem('portfolio_visitor_count_devansh', newCount.toString());
      } else {
        setVisitorCount(1);
        localStorage.setItem('portfolio_visitor_count_devansh', '1');
      }
    } catch (e) {
      // Fallback
      setVisitorCount(1);
    }
  }, []);

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const bgStyle = isDarkMode ? 'bg-[#111111]/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm';
  const inputStyle = isDarkMode 
    ? 'bg-[#161616] border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-zinc-700' 
    : 'bg-zinc-50 border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:border-zinc-300';

  return (
    <section id="contact" className="py-16 relative">
      
      {/* Uppercase section title on left */}
      <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-8 border-b border-zinc-200/40 dark:border-zinc-800/25 pb-2 text-left">
        Let's Work Together
      </div>

      {/* Two Column cards grid exactly matching Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch text-left">
        
        {/* Left Column: Get in Touch Card */}
        <div className={`rounded-2xl p-6 sm:p-8 border flex flex-col justify-between ${bgStyle}`}>
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-zinc-950 dark:text-zinc-100">
                Get in Touch
              </h3>
              <p className="text-xs text-zinc-800 dark:text-zinc-400 mt-1">
                Choose your preferred method to connect and let's discuss your project.
              </p>
            </div>

            {/* List of Outreach triggers */}
            <div className="space-y-4">
              
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group cursor-pointer bg-zinc-50/20 dark:bg-zinc-900/10"
              >
                <div className="flex items-start space-x-3">
                  <Calendar className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-450 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-850 dark:text-zinc-200 group-hover:text-brand-primary transition-colors">
                      Schedule a free call
                    </h4>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">30-minute strategy session</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </a>

              <a 
                href="mailto:devanshd134@gmail.com"
                className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group cursor-pointer bg-zinc-50/20 dark:bg-zinc-900/10"
              >
                <div className="flex items-start space-x-3">
                  <Mail className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-450 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-850 dark:text-zinc-200 group-hover:text-brand-primary transition-colors select-text">
                      devanshd134@gmail.com
                    </h4>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Quick inquiries & questions</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </a>

              <a 
                href="www.linkedin.com/in/devanshdubeyy" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group cursor-pointer bg-zinc-50/20 dark:bg-zinc-900/10"
              >
                <div className="flex items-start space-x-3">
                  <Linkedin className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-450 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-850 dark:text-zinc-200 group-hover:text-brand-primary transition-colors">
                      Connect on Linkedin
                    </h4>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Follow for updates & insights</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </a>

            </div>
          </div>

          {/* Core Response SLA */}
          <div className="mt-8 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/30 space-y-2">
            <div className="flex items-center space-x-2 text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
              <Clock className="h-3.5 w-3.5" />
              <span>REPLIES WITHIN 24 HOURS</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>OPEN TO REMOTE, FREELANCE & FULL-TIME</span>
            </div>
          </div>
        </div>

        {/* Right Column: Send a Message Card */}
        <div className={`rounded-2xl p-6 sm:p-8 border flex flex-col justify-between ${bgStyle}`}>
          <div className="space-y-6 w-full">
            <div>
              <h3 className="font-display font-bold text-xl text-zinc-950 dark:text-zinc-100">
                Send a Message
              </h3>
              <p className="text-xs text-zinc-800 dark:text-zinc-400 mt-1">
                Prefer to write? Fill out the form and I'll get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-bounce" />
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Message Transmitted!</h4>
                <p className="text-xs text-zinc-400">Thank you. Devansh will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Full Name"
                  className={`w-full px-3 py-2.5 rounded-lg border outline-none text-xs sm:text-sm font-sans transition-all ${inputStyle}`}
                />

                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  placeholder="Email Address"
                  className={`w-full px-3 py-2.5 rounded-lg border outline-none text-xs sm:text-sm font-sans transition-all ${inputStyle}`}
                />

                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Your Message"
                  className={`w-full px-3 py-2.5 rounded-lg border outline-none text-xs sm:text-sm font-sans transition-all resize-none ${inputStyle}`}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs sm:text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center justify-center space-x-2 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <Send className="h-3.5 w-3.5" />}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Quote + Interactive Visitor Counter Footer Segment (Exactly matching Image 3) */}
      <div className={`mt-12 rounded-2xl p-6 border flex flex-col md:flex-row items-stretch justify-between gap-6 ${bgStyle}`}>
        
        {/* Left Side: Charles Eames Quote */}
        <div className="flex-1 flex items-start space-x-3.5 text-left md:pr-6">
          <Quote className="h-6 w-6 text-zinc-400 dark:text-zinc-650 mt-0.5 shrink-0" />
          <div className="space-y-2">
            <p className="text-xs sm:text-sm italic text-zinc-800 dark:text-zinc-300 leading-relaxed font-sans select-text">
              "The details are not the details. They make the design."
            </p>
            <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
              — Charles Eames
            </div>
          </div>
        </div>

        {/* Right Side: Visitor Counter */}
        <div className="flex items-center justify-start md:justify-end md:pl-6 border-t md:border-t-0 md:border-l border-zinc-200/50 dark:border-zinc-800/30 pt-6 md:pt-0 shrink-0 select-none">
          <div className="text-left font-sans text-xs text-zinc-700 dark:text-zinc-400 leading-relaxed">
            You are the <span className="font-extrabold text-zinc-950 dark:text-zinc-100 text-sm font-mono">{visitorCount.toLocaleString()}</span>
            <sup className="text-[10px] font-mono lowercase">{getOrdinalSuffix(visitorCount)}</sup> visitor
          </div>
        </div>

      </div>

    </section>
  );
}
