export type OutputMode = 'summary' | 'key_points' | 'quiz' | 'flashcards' | 'study_plan';

export type EducationLevel = 'General Beginner' | 'High School' | 'Undergraduate' | 'Graduate / Professional';

export interface SummaryOutput {
  type: 'summary';
  title: string;
  shortSummary: string;
  keyPoints: string[];
  vocabulary?: { term: string; definition: string }[];
  quickReviewTips?: string[];
}

export interface KeyPointsOutput {
  type: 'key_points';
  title: string;
  overview: string;
  categories: {
    categoryName: string;
    points: string[];
  }[];
  formulasOrPrinciples?: {
    name: string;
    rule: string;
    example?: string;
  }[];
  commonPitfalls?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface QuizOutput {
  type: 'quiz';
  title: string;
  difficulty: string;
  questions: QuizQuestion[];
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category?: string;
  hint?: string;
}

export interface FlashcardsOutput {
  type: 'flashcards';
  title: string;
  cards: Flashcard[];
}

export interface StudyDay {
  day: number;
  focusArea: string;
  suggestedTime: string;
  tasks: string[];
  reviewCheckpoint: string;
}

export interface StudyPlanOutput {
  type: 'study_plan';
  title: string;
  totalDurationDays: number;
  dailyCommitment: string;
  schedule: StudyDay[];
  retentionTips: string[];
}

export type StudyResult =
  | SummaryOutput
  | KeyPointsOutput
  | QuizOutput
  | FlashcardsOutput
  | StudyPlanOutput;

export interface SavedItem {
  id: string;
  timestamp: number;
  mode: OutputMode;
  topic: string;
  educationLevel: EducationLevel;
  result: StudyResult;
  isFavorite?: boolean;
}

export interface GenerateRequestPayload {
  mode: OutputMode;
  content?: string;
  topic?: string;
  educationLevel: EducationLevel;
  customOptions?: {
    numQuestions?: number;
    numFlashcards?: number;
    planDays?: number;
  };
}
