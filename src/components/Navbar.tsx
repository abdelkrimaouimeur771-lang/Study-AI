import React from 'react';
import { Sparkles, Moon, Sun, Bookmark, Rocket, BookOpen } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenLibrary: () => void;
  onOpenNetlifyGuide: () => void;
  onScrollToStudio: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenLibrary,
  onOpenNetlifyGuide,
  onScrollToStudio,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={onScrollToStudio}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-900 dark:from-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">
                StudyFlow
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none hidden sm:block">
              AI Study Assistant
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onScrollToStudio}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Study Studio
          </button>

          <button
            type="button"
            onClick={onOpenLibrary}
            className="relative inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Saved study materials and history"
          >
            <Bookmark className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Saved Library</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-indigo-600 text-white leading-tight">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenNetlifyGuide}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors px-3 py-1.5 rounded-lg"
          >
            <Rocket className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">Deploy to Netlify</span>
            <span className="sm:hidden">Netlify</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onScrollToStudio}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Start Studying</span>
          </button>
        </div>
      </div>
    </header>
  );
};
