import React, { useState } from 'react';
import { SavedItem, OutputMode } from '../types';
import { 
  X, 
  Trash2, 
  Star, 
  BookOpen, 
  FileText, 
  ListOrdered, 
  HelpCircle, 
  Layers, 
  CalendarDays, 
  ArrowRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface SavedLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedItem[];
  onSelectItem: (item: SavedItem) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const SavedLibraryModal: React.FC<SavedLibraryModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onSelectItem,
  onToggleFavorite,
  onDeleteItem,
  onClearAll,
}) => {
  const [filterMode, setFilterMode] = useState<OutputMode | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  const filteredItems = savedItems.filter((item) => {
    if (onlyFavorites && !item.isFavorite) return false;
    if (filterMode !== 'all' && item.mode !== filterMode) return false;
    return true;
  });

  const getModeIcon = (mode: OutputMode) => {
    switch (mode) {
      case 'summary':
        return <FileText className="w-4 h-4 text-indigo-500" />;
      case 'key_points':
        return <ListOrdered className="w-4 h-4 text-emerald-500" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-purple-500" />;
      case 'flashcards':
        return <Layers className="w-4 h-4 text-amber-500" />;
      case 'study_plan':
        return <CalendarDays className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Saved Study Library
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {savedItems.length} stored study sessions saved on your device
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter controls */}
        <div className="px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All ({savedItems.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('summary')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'summary'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Summaries
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('quiz')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Quizzes
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('flashcards')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'flashcards'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Flashcards
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('study_plan')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'study_plan'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Plans
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium border transition-all ${
                onlyFavorites
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span>Favorites</span>
            </button>

            {savedItems.length > 0 && !showClearConfirm && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Clear all stored items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}

            {showClearConfirm && (
              <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 px-2 py-0.5 rounded-lg text-rose-700 dark:text-rose-300">
                <span>Confirm clear?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClearAll();
                    setShowClearConfirm(false);
                  }}
                  className="font-bold hover:underline"
                >
                  Yes, clear
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Items List */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-semibold text-sm">No saved sessions match this filter</p>
              <p className="text-xs mt-1">Generate study materials above and they will automatically appear here!</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-slate-800/40 p-3 rounded-2xl transition-colors"
              >
                <div 
                  className="flex items-start gap-3 flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                >
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 mt-0.5 shrink-0">
                    {getModeIcon(item.mode)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {item.mode.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        • {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.result.title || item.topic}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      Target: {item.educationLevel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                    title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-semibold text-xs flex items-center gap-1 hover:bg-indigo-100 transition-all cursor-pointer"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
