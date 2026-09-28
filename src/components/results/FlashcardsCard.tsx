import React, { useState } from 'react';
import { FlashcardsOutput } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Check, 
  RefreshCcw, 
  Layers, 
  LayoutGrid, 
  Eye, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface FlashcardsCardProps {
  data: FlashcardsOutput;
}

export const FlashcardsCard: React.FC<FlashcardsCardProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [masteredCards, setMasteredCards] = useState<Record<number, boolean>>({});

  const cards = data.cards || [];
  const totalCards = cards.length;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const toggleMastered = (cardIndex: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMasteredCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  const masteredCount = Object.values(masteredCards).filter(Boolean).length;

  if (totalCards === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <p className="text-slate-500">No flashcards available in this deck.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Deck Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Active Recall Deck
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {totalCards} Flashcards • {masteredCount} Mastered
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {data.title}
          </h3>
        </div>

        {/* View Toggle (Single card flip vs Grid) */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Practice Deck</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'single' ? (
        /* Single Card Interactive Practice Mode */
        <div className="space-y-4">
          {/* Progress Bar & Status */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Card {currentIndex + 1} of {totalCards}</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> {masteredCount} Mastered
              </span>
              <span>•</span>
              <span>{Math.round(((currentIndex + 1) / totalCards) * 100)}% through deck</span>
            </div>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            />
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={toggleFlip}
            className="perspective-1000 w-full min-h-[300px] sm:min-h-[340px] cursor-pointer select-none group"
          >
            <div
              className={`relative w-full min-h-[300px] sm:min-h-[340px] transition-transform duration-500 transform-style-3d rounded-3xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD (Question) */}
              <div className="absolute inset-0 backface-hidden w-full h-full p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-950/80 shadow-md group-hover:border-indigo-400 dark:group-hover:border-indigo-600 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      {currentCard?.category || 'Question'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleMastered(currentIndex, e)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-all ${
                        masteredCards[currentIndex]
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{masteredCards[currentIndex] ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                  </div>

                  <div className="my-auto py-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
                      Front Side:
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                      {currentCard?.front}
                    </h4>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                  {currentCard?.hint ? (
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <HelpCircle className="w-3.5 h-3.5" /> Hint: {currentCard.hint}
                    </span>
                  ) : (
                    <span>Click anywhere to flip</span>
                  )}
                  <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip to Answer</span>
                  </div>
                </div>
              </div>

              {/* BACK OF CARD (Answer) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full p-8 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/30 dark:from-slate-800 dark:via-slate-850 dark:to-indigo-950/40 border-2 border-indigo-400 dark:border-indigo-600 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Answer & Explanation
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleMastered(currentIndex, e)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-all ${
                        masteredCards[currentIndex]
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{masteredCards[currentIndex] ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                  </div>

                  <div className="my-auto py-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
                      Back Side:
                    </span>
                    <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed font-medium whitespace-pre-line">
                      {currentCard?.back}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span className="text-slate-500 dark:text-slate-400">Click to flip back</span>
                  <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip to Question</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls: Previous / Next / Flip */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={toggleFlip}
              className="px-5 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 font-semibold text-sm flex items-center gap-1.5 transition-all border border-indigo-200 dark:border-indigo-800 cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>Flip Card</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-sm flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-600/30 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Grid Mode: View all flashcards side-by-side */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Card #{idx + 1} {card.category ? `• ${card.category}` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleMastered(idx, e)}
                    className={`text-xs px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                      masteredCards[idx]
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{masteredCards[idx] ? 'Mastered' : 'Mark'}</span>
                  </button>
                </div>
                <div className="mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                    Front:
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {card.front}
                  </h4>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                    Back:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {card.back}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
