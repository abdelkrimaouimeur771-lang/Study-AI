import React from 'react';
import { ArrowDown, BookOpen, Brain, CheckCircle2, FileText, Layers, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartStudying: () => void;
  onSelectSampleTopic: (topic: string, mode: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartStudying,
  onSelectSampleTopic,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[650px] h-80 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-emerald-400/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/70 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Next-Gen AI Study Assistant for Students Worldwide</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5">
          Study Smarter,{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
            Not Harder
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8">
          Turn your textbooks, lecture notes, and tricky topics into instant concise summaries, interactive exam questions, active-recall flashcards, and personalized study schedules in seconds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <button
            type="button"
            onClick={onStartStudying}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start Studying</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => onSelectSampleTopic('Photosynthesis & Cellular Respiration', 'summary')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-base text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Try Sample: Biology</span>
          </button>
        </div>

        {/* 5 Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">1. Summaries</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">High-yield takeaways & terms</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">2. Key Points</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Formulas & core principles</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
              <Brain className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">3. Quiz Questions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Exam-style tests & feedback</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">4. Flashcards</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">3D active recall decks</p>
          </div>

          <div className="col-span-2 md:col-span-1 p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">5. Study Plans</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Daily schedules & checkpoints</p>
          </div>
        </div>
      </div>
    </section>
  );
};
