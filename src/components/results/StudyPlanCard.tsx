import React, { useState } from 'react';
import { StudyPlanOutput } from '../../types';
import { 
  Calendar, 
  Clock, 
  CheckSquare, 
  Square, 
  Lightbulb, 
  Target, 
  Flag,
  Sparkles
} from 'lucide-react';

interface StudyPlanCardProps {
  data: StudyPlanOutput;
}

export const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ data }) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (dayIndex: number, taskIndex: number) => {
    const key = `${dayIndex}-${taskIndex}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalTasks = data.schedule?.reduce((acc, curr) => acc + (curr.tasks?.length || 0), 0) || 0;
  const doneTasks = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header and Progress Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                Spaced Repetition Schedule
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {data.totalDurationDays} Days • {data.dailyCommitment}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {data.title}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Plan Progress
            </span>
            <span className="text-lg font-extrabold text-sky-600 dark:text-sky-400">
              {doneTasks} / {totalTasks} Tasks ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-700/60 h-2 rounded-full overflow-hidden">
          <div
            className="bg-sky-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Days Schedule */}
      <div className="space-y-4">
        {data.schedule?.map((day, dIdx) => (
          <div
            key={day.day || dIdx}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs"
          >
            {/* Day Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-extrabold text-sm border border-sky-200 dark:border-sky-800">
                  Day {day.day}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {day.focusArea}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>{day.suggestedTime}</span>
              </div>
            </div>

            {/* Daily Tasks */}
            <div className="space-y-2.5 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Daily Focus Tasks:
              </span>
              {day.tasks?.map((task, tIdx) => {
                const key = `${dIdx}-${tIdx}`;
                const isChecked = !!completedTasks[key];

                return (
                  <div
                    key={tIdx}
                    onClick={() => toggleTask(dIdx, tIdx)}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-slate-500 line-through'
                        : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-sky-600 dark:text-sky-400 focus:outline-none"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <span className="text-sm leading-relaxed">{task}</span>
                  </div>
                );
              })}
            </div>

            {/* Review Session Checkpoint */}
            {day.reviewCheckpoint && (
              <div className="p-3.5 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 flex items-start gap-2.5 text-xs sm:text-sm text-sky-900 dark:text-sky-200">
                <Flag className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold mr-1">Spaced Repetition Checkpoint:</span>
                  <span>{day.reviewCheckpoint}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Long-term retention tips */}
      {data.retentionTips && data.retentionTips.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-transparent dark:from-slate-800/80 dark:via-slate-800/40 border border-indigo-100 dark:border-indigo-900/50 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Cognitive Retention Strategies
            </h4>
          </div>
          <ul className="space-y-2">
            {data.retentionTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
