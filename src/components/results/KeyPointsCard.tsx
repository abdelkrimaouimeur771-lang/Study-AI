import React from 'react';
import { KeyPointsOutput } from '../../types';
import { AlertTriangle, BookMarked, Calculator, CheckCircle2 } from 'lucide-react';

interface KeyPointsCardProps {
  data: KeyPointsOutput;
}

export const KeyPointsCard: React.FC<KeyPointsCardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-3 inline-block">
          Core Breakdown
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {data.title}
        </h3>
        {data.overview && (
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {data.overview}
          </p>
        )}
      </div>

      {/* Categories */}
      {data.categories && data.categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-700/50">
                <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {cat.categoryName}
                </h4>
              </div>
              <ul className="space-y-2.5 flex-1">
                {cat.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Formulas & Principles (if any) */}
      {data.formulasOrPrinciples && data.formulasOrPrinciples.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Rules, Laws & Formulas
            </h4>
          </div>
          <div className="space-y-3">
            {data.formulasOrPrinciples.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40"
              >
                <div className="font-bold text-sm text-indigo-900 dark:text-indigo-200 mb-1">
                  {item.name}
                </div>
                <div className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 mb-1">
                  {item.rule}
                </div>
                {item.example && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Example: {item.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Pitfalls / Misconceptions */}
      {data.commonPitfalls && data.commonPitfalls.length > 0 && (
        <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Common Student Pitfalls & Misconceptions
            </h4>
          </div>
          <ul className="space-y-2">
            {data.commonPitfalls.map((pitfall, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
