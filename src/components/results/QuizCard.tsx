import React, { useState } from 'react';
import { QuizOutput } from '../../types';
import { CheckCircle2, XCircle, RotateCcw, Award, HelpCircle, Eye } from 'lucide-react';

interface QuizCardProps {
  data: QuizOutput;
}

export const QuizCard: React.FC<QuizCardProps> = ({ data }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const totalQuestions = data.questions?.length || 0;

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    data.questions?.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setRevealAll(false);
  };

  const score = calculateScore();
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const allAnswered = Object.keys(selectedAnswers).length === totalQuestions;

  return (
    <div className="space-y-6">
      {/* Header and Quiz Status */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Interactive Quiz
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {totalQuestions} Questions • {data.difficulty}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {data.title}
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {!isSubmitted && (
            <button
              type="button"
              onClick={() => setRevealAll(!revealAll)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>{revealAll ? 'Hide Explanations' : 'View Answer Key'}</span>
            </button>
          )}

          {isSubmitted && (
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Score Banner when Submitted */}
      {isSubmitted && (
        <div className={`p-6 rounded-2xl border shadow-xs transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
          percentage >= 80
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-100'
            : percentage >= 60
            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-100'
            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80 text-rose-900 dark:text-rose-100'
        }`}>
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              percentage >= 80 ? 'bg-emerald-600 text-white' : percentage >= 60 ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-extrabold">
                Score: {score} / {totalQuestions} ({percentage}%)
              </div>
              <p className="text-xs opacity-90">
                {percentage >= 80
                  ? '🎉 Outstanding mastery! You have a solid grasp of this material.'
                  : percentage >= 60
                  ? '👍 Good progress! Review the explanations below to seal gaps.'
                  : '📚 Keep practicing! Read through the detailed explanations below to improve.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRetake}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm shrink-0 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-5">
        {data.questions?.map((q, qIndex) => {
          const userAnswer = selectedAnswers[qIndex];
          const hasAnswered = userAnswer !== undefined;
          const showAnswerFeedback = isSubmitted || revealAll;
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id || qIndex}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-800/80 border transition-all ${
                showAnswerFeedback
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800/70'
                    : hasAnswered
                    ? 'border-rose-300 dark:border-rose-800/70'
                    : 'border-slate-200 dark:border-slate-700/80'
                  : 'border-slate-200 dark:border-slate-700/80 shadow-xs'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-800">
                  Q{qIndex + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5 ml-0 sm:ml-10">
                {q.options?.map((opt, optIndex) => {
                  const isSelected = userAnswer === optIndex;
                  const isThisCorrect = optIndex === q.correctAnswer;

                  let optionStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

                  if (showAnswerFeedback) {
                    if (isThisCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 font-medium ring-1 ring-rose-500';
                    } else {
                      optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30 text-slate-400 dark:text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-100 font-semibold ring-2 ring-indigo-500/20';
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(qIndex, optIndex)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 text-sm transition-all cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {showAnswerFeedback && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {showAnswerFeedback && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {showAnswerFeedback && q.explanation && (
                <div className="mt-4 sm:ml-10 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <HelpCircle className="w-4 h-4 text-indigo-500" />
                    <span>Explanation & Review:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Bottom Bar */}
      {!isSubmitted && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {Object.keys(selectedAnswers).length} of {totalQuestions} questions answered
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(true)}
            disabled={!allAnswered}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md cursor-pointer ${
              allAnswered
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30 active:scale-95'
                : 'bg-slate-400 dark:bg-slate-700 opacity-60 cursor-not-allowed'
            }`}
          >
            Submit Quiz & See Score
          </button>
        </div>
      )}
    </div>
  );
};
