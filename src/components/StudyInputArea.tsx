import React, { useState } from 'react';
import { 
  FileText, 
  ListOrdered, 
  HelpCircle, 
  Layers, 
  CalendarDays, 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  Settings2, 
  Eraser, 
  GraduationCap 
} from 'lucide-react';
import { EducationLevel, OutputMode } from '../types';

interface StudyInputAreaProps {
  onGenerate: (payload: {
    mode: OutputMode;
    content: string;
    topic: string;
    educationLevel: EducationLevel;
    customOptions: {
      numQuestions: number;
      numFlashcards: number;
      planDays: number;
    };
  }) => Promise<void>;
  isLoading: boolean;
  errorMessage: string | null;
  onClearError: () => void;
  initialTopic?: string;
  initialMode?: OutputMode;
}

const SAMPLE_TOPICS = [
  { name: '🧬 Cellular Respiration & ATP Cycle', topic: 'Cellular Respiration and ATP Generation', mode: 'summary' as OutputMode, notes: 'Glycolysis occurs in the cytoplasm yielding 2 ATP, 2 NADH, and 2 Pyruvate. The Krebs cycle takes place in the mitochondrial matrix generating NADH and FADH2. Oxidative phosphorylation utilizes the electron transport chain and ATP synthase across the inner mitochondrial membrane, producing approximately 30-32 ATP per glucose molecule.' },
  { name: '💻 Dijkstra Algorithm & Graphs', topic: 'Dijkstras Shortest Path Algorithm', mode: 'key_points' as OutputMode, notes: 'Dijkstra finds the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights. It uses a greedy approach maintaining a priority queue (min-heap). Time complexity with a binary heap is O((V + E) log V).' },
  { name: '📜 French Revolution (1789)', topic: 'Causes and Turning Points of the French Revolution', mode: 'quiz' as OutputMode, notes: 'Major causes included widespread debt from the Seven Years War and American Revolution, unfair taxation on the Third Estate, food shortages following poor harvests, and Enlightenment ideals questioning absolute monarchy.' },
  { name: '📈 Macroeconomics & Inflation', topic: 'Macroeconomics: Inflation, Interest Rates & Monetary Policy', mode: 'flashcards' as OutputMode, notes: 'Demand-pull inflation occurs when aggregate demand outpaces aggregate supply. Cost-push inflation happens when production costs rise. Central banks use interest rate hikes and quantitative tightening to cool down inflationary pressures.' },
  { name: '🧠 Action Potentials & Neurons', topic: 'Neurobiology: Action Potential Generation & Propagation', mode: 'study_plan' as OutputMode, notes: 'Resting membrane potential is -70mV maintained by Na+/K+ ATPase pump. Depolarization reaches -55mV threshold opening voltage-gated Na+ channels. Repolarization opens K+ channels. The refractory period ensures unidirectional impulse conduction.' }
];

export const StudyInputArea: React.FC<StudyInputAreaProps> = ({
  onGenerate,
  isLoading,
  errorMessage,
  onClearError,
  initialTopic = '',
  initialMode = 'summary',
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<OutputMode>(initialMode);
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('Undergraduate');
  const [inputTab, setInputTab] = useState<'both' | 'topic' | 'text'>('both');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Custom parameters
  const [numQuestions, setNumQuestions] = useState(5);
  const [numFlashcards, setNumFlashcards] = useState(8);
  const [planDays, setPlanDays] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClearError();
    onGenerate({
      mode,
      content,
      topic,
      educationLevel,
      customOptions: {
        numQuestions,
        numFlashcards,
        planDays,
      },
    });
  };

  const handleApplySample = (sample: typeof SAMPLE_TOPICS[0]) => {
    setTopic(sample.topic);
    setContent(sample.notes);
    setMode(sample.mode);
    onClearError();
  };

  const handleClear = () => {
    setTopic('');
    setContent('');
    onClearError();
  };

  return (
    <div id="study-studio" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-950/5 overflow-hidden transition-all">
        {/* Header bar */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                StudyFlow Studio
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transform materials into structured learning tools
              </p>
            </div>
          </div>

          {/* Quick Clear & Education Level */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span className="hidden sm:inline font-medium">Target Level:</span>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-lg px-2.5 py-1 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="General Beginner">General Beginner</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate / Professional">Graduate / Professional</option>
              </select>
            </div>

            {(topic || content) && (
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors px-2 py-1 rounded"
                title="Clear input fields"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Quick Sample Topics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Quick Sample Topics
              </label>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Click any to test instantly
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TOPICS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(sample)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left"
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area (Topic & Notes) */}
          <div className="space-y-4">
            {/* Topic Input */}
            <div>
              <label htmlFor="topic-input" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Study Topic or Subject
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (errorMessage) onClearError();
                }}
                placeholder="e.g. Mitosis vs Meiosis, Calculus Integrals, American Civil War, Microeconomics..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            {/* Notes / Text Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="content-input" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Study Notes, Textbook Excerpt, or Lecture Content{' '}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    (optional if topic is entered)
                  </span>
                </label>
                <span className="text-xs text-slate-400">
                  {content.length > 0 ? `${content.length} characters` : 'Paste any text'}
                </span>
              </div>
              <textarea
                id="content-input"
                rows={4}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errorMessage) onClearError();
                }}
                placeholder="Paste lecture transcript, reading excerpts, chapter notes, formulas, or bullet points here..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all resize-y min-h-[100px]"
              />
            </div>
          </div>

          {/* Output Mode Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2.5">
              Choose Study Output Mode:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* 1. Summary */}
              <button
                type="button"
                onClick={() => setMode('summary')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  mode === 'summary'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${mode === 'summary' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Summary</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Concise overview, key points & vocabulary
                </p>
              </button>

              {/* 2. Key Points */}
              <button
                type="button"
                onClick={() => setMode('key_points')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  mode === 'key_points'
                    ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${mode === 'key_points' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <ListOrdered className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Key Points</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Core principles, rules & common pitfalls
                </p>
              </button>

              {/* 3. Quiz Questions */}
              <button
                type="button"
                onClick={() => setMode('quiz')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  mode === 'quiz'
                    ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 ring-2 ring-purple-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${mode === 'quiz' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Quiz</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Interactive multiple-choice with grading
                </p>
              </button>

              {/* 4. Flashcards */}
              <button
                type="button"
                onClick={() => setMode('flashcards')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  mode === 'flashcards'
                    ? 'border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${mode === 'flashcards' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Flashcards</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  3D active recall deck with prompts & hints
                </p>
              </button>

              {/* 5. Study Plan */}
              <button
                type="button"
                onClick={() => setMode('study_plan')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  mode === 'study_plan'
                    ? 'border-sky-600 bg-sky-50/70 dark:bg-sky-950/40 ring-2 ring-sky-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${mode === 'study_plan' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Study Plan</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Day-by-day tasks, time & review schedule
                </p>
              </button>
            </div>
          </div>

          {/* Advanced Mode-specific Settings Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showAdvanced ? 'Hide Custom Options' : 'Configure Quantities & Duration'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mode === 'quiz' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Number of Questions:
                    </label>
                    <select
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <option value={3}>3 Questions (Quick check)</option>
                      <option value={5}>5 Questions (Standard)</option>
                      <option value={8}>8 Questions (Deep test)</option>
                      <option value={10}>10 Questions (Exam prep)</option>
                    </select>
                  </div>
                )}

                {mode === 'flashcards' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Deck Size:
                    </label>
                    <select
                      value={numFlashcards}
                      onChange={(e) => setNumFlashcards(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <option value={5}>5 Flashcards</option>
                      <option value={8}>8 Flashcards (Recommended)</option>
                      <option value={12}>12 Flashcards</option>
                      <option value={16}>16 Flashcards (Mastery)</option>
                    </select>
                  </div>
                )}

                {mode === 'study_plan' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Plan Duration:
                    </label>
                    <select
                      value={planDays}
                      onChange={(e) => setPlanDays(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <option value={3}>3-Day Intensive</option>
                      <option value={5}>5-Day Standard Schedule</option>
                      <option value={7}>7-Day Deep Retention Plan</option>
                      <option value={14}>14-Day Comprehensive Review</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Pedagogical Tone:
                  </label>
                  <div className="text-xs text-slate-500 dark:text-slate-400 py-1.5">
                    Rigorous, exam-aligned, and structured for active recall.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3 text-rose-800 dark:text-rose-200 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Generation Failed</p>
                <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
              <button
                type="button"
                onClick={onClearError}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || (!topic.trim() && !content.trim())}
              className={`w-full py-4 rounded-xl font-bold text-base text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                isLoading || (!topic.trim() && !content.trim())
                  ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-80'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-indigo-600/30'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                  <span>Synthesizing with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>
                    Generate {mode === 'summary' ? 'Summary' : mode === 'key_points' ? 'Key Points' : mode === 'quiz' ? 'Quiz' : mode === 'flashcards' ? 'Flashcards' : 'Study Plan'}
                  </span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
              Powered by real-time Google AI Studio services • Instant active recall synthesis
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
