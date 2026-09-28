import React from 'react';
import { SummaryOutput } from '../../types';
import { BookOpen, CheckCircle, Lightbulb, Sparkles } from 'lucide-react';

interface SummaryCardProps {
  data: SummaryOutput;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Title & Short Summary Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Executive Summary
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
          {data.title}
        </h3>
        <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed whitespace-pre-line">
          {data.shortSummary}
        </p>
      </div>

      {/* Key Points */}
      {data.keyPoints && data.keyPoints.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Key Points & Takeaways
            </h4>
          </div>

          <ul className="space-y-3">
            {data.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-xs shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
                  {index + 1}
                </span>
                <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-normal">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Vocabulary / Essential Definitions (if present) */}
      {data.vocabulary && data.vocabulary.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Essential Vocabulary & Definitions
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {data.vocabulary.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60"
              >
                <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm block mb-1">
                  {item.term}
                </span>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Review / Exam Tips */}
      {data.quickReviewTips && data.quickReviewTips.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 dark:border-amber-900/50 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Exam & Memory Recall Tips
            </h4>
          </div>
          <ul className="space-y-2">
            {data.quickReviewTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-1" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
