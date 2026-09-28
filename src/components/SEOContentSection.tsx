import React, { useState } from 'react';
import { 
  Brain, 
  Repeat, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';

export const SEOContentSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does StudyFlow AI generate study material?',
      a: 'StudyFlow AI uses advanced Gemini models from Google AI Studio. It evaluates academic notes, concepts, and textbooks to extract high-yield concepts into summaries, multiple-choice quizzes with explanations, active recall flashcards, and spaced repetition schedules.'
    },
    {
      q: 'Can I use StudyFlow AI for any academic subject?',
      a: 'Yes! StudyFlow AI handles diverse disciplines including Biology, Organic Chemistry, Computer Science, Calculus, World History, Economics, Literature, Law, and Medicine. You can tailor outputs for High School, Undergraduate, or Graduate levels.'
    },
    {
      q: 'How can I deploy this website to Netlify?',
      a: 'This website is pre-packaged with a complete netlify.toml and Netlify Serverless Functions in netlify/functions/generate.ts. Simply push to GitHub, connect to Netlify, set your GEMINI_API_KEY environment variable, and hit Deploy!'
    },
    {
      q: 'Are my study notes and flashcards saved privately?',
      a: 'Yes. All study sessions and favorite items are stored locally in your browser storage (localStorage). Your personal study history remains on your device.'
    },
    {
      q: 'Is StudyFlow AI free to use for students?',
      a: 'Yes. StudyFlow AI provides completely free, unrestricted study material synthesis designed to help students worldwide study smarter and excel in exams.'
    }
  ];

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      {/* Educational Science Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Cognitive Science Backed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Engineered for Maximum Retention
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Passive re-reading leads to the illusion of competence. StudyFlow AI incorporates scientifically proven cognitive learning techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              1. Active Recall Testing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Retrieval practice through 3D interactive flashcards and randomized multiple-choice questions strengthens neural synaptic pathways far more effectively than highlighting notes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
              <Repeat className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              2. Spaced Repetition Scheduling
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Structured multi-day study plans deliberately interrupt the Ebbinghaus Forgetting Curve by scheduling periodic review checkpoints right before memory decay occurs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              3. Cognitive Chunking
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Dense paragraphs and lengthy lecture transcripts are automatically distilled into atomic key points, definitions, and formulas, lowering cognitive load.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) with Schema.org readiness */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Student Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4 text-sm sm:text-base hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-slate-500 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              StudyFlow AI
            </span>
            <span>— AI Study Assistant for Students Worldwide</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Responsive Web Application</span>
            <span>•</span>
            <span>Netlify Ready</span>
            <span>•</span>
            <span>Google Search Optimized</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
