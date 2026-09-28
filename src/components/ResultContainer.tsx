import React, { useState } from 'react';
import { StudyResult, OutputMode } from '../types';
import { SummaryCard } from './results/SummaryCard';
import { KeyPointsCard } from './results/KeyPointsCard';
import { QuizCard } from './results/QuizCard';
import { FlashcardsCard } from './results/FlashcardsCard';
import { StudyPlanCard } from './results/StudyPlanCard';
import { 
  Copy, 
  Check, 
  Download, 
  Star, 
  ArrowLeft, 
  Sparkles, 
  Share2 
} from 'lucide-react';
import { copyToClipboard, downloadTextFile, formatResultToMarkdown } from '../utils/export';

interface ResultContainerProps {
  result: StudyResult;
  mode: OutputMode;
  topic: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBackToInput: () => void;
  usedModel?: string;
}

export const ResultContainer: React.FC<ResultContainerProps> = ({
  result,
  mode,
  topic,
  isFavorite,
  onToggleFavorite,
  onBackToInput,
  usedModel,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const md = formatResultToMarkdown(result);
    const success = await copyToClipboard(md);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const md = formatResultToMarkdown(result);
    const safeTopic = (topic || 'studyflow-material')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const filename = `${safeTopic}-${mode}.md`;
    downloadTextFile(filename, md);
  };

  return (
    <div id="study-results" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onBackToInput}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Generation</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favorite Toggle */}
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isFavorite
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
            title="Save to favorites"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
            <span>{isFavorite ? 'Saved to Favorites' : 'Save Favorite'}</span>
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Copy as markdown text"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs shadow-indigo-600/20 cursor-pointer"
            title="Download as markdown / text file"
          >
            <Download className="w-4 h-4" />
            <span>Download .MD</span>
          </button>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="transition-all">
        {result.type === 'summary' && <SummaryCard data={result} />}
        {result.type === 'key_points' && <KeyPointsCard data={result} />}
        {result.type === 'quiz' && <QuizCard data={result} />}
        {result.type === 'flashcards' && <FlashcardsCard data={result} />}
        {result.type === 'study_plan' && <StudyPlanCard data={result} />}
      </div>

      {/* Model & Source Meta info */}
      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Generated by Google Gemini ({usedModel || 'gemini-3.8-flash'})</span>
        </div>
        <div>
          <span>Exportable to Markdown • Offline Saved • Verified for Academic Use</span>
        </div>
      </div>
    </div>
  );
};
