import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Shared Gemini client setup
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: Date.now(),
    });
  });

  // Main generation endpoint
  app.post('/api/generate', async (req: Request, res: Response) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please check your AI Studio secrets or environment configuration.',
        });
      }

      const { mode, content, topic, educationLevel, customOptions } = req.body;

      if (!content && !topic) {
        return res.status(400).json({
          error: 'Please provide either study notes/text or a study topic.',
        });
      }

      const level = educationLevel || 'Undergraduate';
      const userSubject = topic?.trim() || 'Provided Study Material';
      const userMaterial = content?.trim() || '';

      let systemPrompt = '';
      let formatSchemaDescription = '';

      if (mode === 'summary') {
        systemPrompt = `You are StudyFlow AI, an elite educational summarizer. Your goal is to synthesize the study material into a crystal-clear, structured summary suited for an ${level} student.`;
        formatSchemaDescription = `Return ONLY a valid JSON object matching this TypeScript structure:
{
  "type": "summary",
  "title": "Clear descriptive title for this topic",
  "shortSummary": "A comprehensive yet accessible 2 to 3 paragraph summary capturing the core concepts and importance.",
  "keyPoints": [
    "Key takeaway point 1 with actionable context",
    "Key takeaway point 2 with core nuance",
    "Key takeaway point 3...",
    "Key takeaway point 4...",
    "Key takeaway point 5..."
  ],
  "vocabulary": [
    { "term": "Technical Term 1", "definition": "Clear concise student-friendly definition" },
    { "term": "Technical Term 2", "definition": "Clear concise student-friendly definition" }
  ],
  "quickReviewTips": [
    "Tip 1 for remembering this concept easily",
    "Tip 2 for tackling exam questions about this"
  ]
}`;
      } else if (mode === 'key_points') {
        systemPrompt = `You are StudyFlow AI, an expert academic analyst. Break down the given subject into structured, categorized key points and principles for an ${level} student.`;
        formatSchemaDescription = `Return ONLY a valid JSON object matching this TypeScript structure:
{
  "type": "key_points",
  "title": "Key Points: Subject Title",
  "overview": "Brief 1-2 sentence orientation to this subject.",
  "categories": [
    {
      "categoryName": "Foundational Principles",
      "points": [
        "In-depth breakdown of principle 1",
        "In-depth breakdown of principle 2"
      ]
    },
    {
      "categoryName": "Mechanisms & Applications",
      "points": [
        "Mechanism description and how it works",
        "Real-world application or exam scenario"
      ]
    }
  ],
  "formulasOrPrinciples": [
    {
      "name": "Principle or Equation Name",
      "rule": "Exact rule, law, or relationship",
      "example": "Brief concrete scenario or calculation"
    }
  ],
  "commonPitfalls": [
    "Common student misconception or mistake to avoid in exams"
  ]
}`;
      } else if (mode === 'quiz') {
        const count = customOptions?.numQuestions || 5;
        systemPrompt = `You are StudyFlow AI, an expert exam designer. Create an interactive ${count}-question multiple choice quiz suited for an ${level} level. Test comprehension, application, and critical thinking.`;
        formatSchemaDescription = `Return ONLY a valid JSON object matching this TypeScript structure:
{
  "type": "quiz",
  "title": "Comprehensive Quiz: Subject Title",
  "difficulty": "${level}",
  "questions": [
    {
      "id": 1,
      "question": "Clear, challenging question testing fundamental understanding?",
      "options": [
        "A) Option 1",
        "B) Option 2",
        "C) Option 3",
        "D) Option 4"
      ],
      "correctAnswer": 0,
      "explanation": "Thorough explanation of why option A is correct, and why other options are incorrect."
    }
  ]
}
Note: correctAnswer must be an integer index (0, 1, 2, or 3) corresponding to the correct element in options array. Provide exactly ${count} questions.`;
      } else if (mode === 'flashcards') {
        const count = customOptions?.numFlashcards || 8;
        systemPrompt = `You are StudyFlow AI, an active-recall cognitive learning expert. Create ${count} high-yield flashcards for an ${level} student. Ensure the front has a focused question or concept prompt, and the back has an informative, memorable answer.`;
        formatSchemaDescription = `Return ONLY a valid JSON object matching this TypeScript structure:
{
  "type": "flashcards",
  "title": "Flashcard Deck: Subject Title",
  "cards": [
    {
      "id": 1,
      "front": "Focused Question or Concept Prompt?",
      "back": "Clear, complete explanation and core answer.",
      "category": "Subtopic or Category Tag",
      "hint": "Optional subtle memory cue or mnemonic"
    }
  ]
}
Provide exactly ${count} high-value flashcards.`;
      } else if (mode === 'study_plan') {
        const days = customOptions?.planDays || 5;
        systemPrompt = `You are StudyFlow AI, a master academic coach and study strategist. Design an optimized, spaced-repetition ${days}-day study plan for an ${level} student mastering this material.`;
        formatSchemaDescription = `Return ONLY a valid JSON object matching this TypeScript structure:
{
  "type": "study_plan",
  "title": "${days}-Day Mastery Study Plan: Subject Title",
  "totalDurationDays": ${days},
  "dailyCommitment": "45 - 60 minutes per day",
  "schedule": [
    {
      "day": 1,
      "focusArea": "Core Concepts & Foundational Architecture",
      "suggestedTime": "45 minutes",
      "tasks": [
        "Read introductory notes and define key terminology",
        "Create initial mental model diagram"
      ],
      "reviewCheckpoint": "Active recall: explain the primary concept without looking at notes for 3 minutes."
    }
  ],
  "retentionTips": [
    "Strategy 1 for long-term retention",
    "Strategy 2 for avoiding cramming fatigue"
  ]
}
Provide an entry for each of the ${days} days.`;
      } else {
        return res.status(400).json({ error: 'Unsupported study mode requested.' });
      }

      const userPrompt = `
SUBJECT / TOPIC:
${userSubject}

EDUCATION TARGET LEVEL:
${level}

STUDY MATERIAL / NOTES (if provided):
${userMaterial || 'No raw notes provided; generate content based on the subject and academic standards.'}

INSTRUCTIONS:
Produce the requested study output. Ensure high pedagogical value, clarity, and factual accuracy.
${formatSchemaDescription}
Respond ONLY with valid JSON. No conversational intro, no markdown codeblocks unless pure JSON.
`;

      // Helper to generate content with primary model, then fallback if rate/quota limited
      async function executeGenAI(modelName: string) {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });
        return response.text;
      }

      let rawOutput: string | undefined;
      let usedModel = 'gemini-3.8-flash';

      try {
        rawOutput = await executeGenAI('gemini-3.8-flash');
      } catch (primaryErr: any) {
        console.warn('Primary model gemini-3.8-flash failed, attempting fallback to gemini-3.1-flash-lite:', primaryErr?.message);
        try {
          usedModel = 'gemini-3.1-flash-lite';
          rawOutput = await executeGenAI('gemini-3.1-flash-lite');
        } catch (secondaryErr: any) {
          console.error('All model attempts failed:', secondaryErr);
          const errorMsg = secondaryErr?.message || primaryErr?.message || 'AI generation failed.';
          
          if (errorMsg.includes('resource_exhausted') || errorMsg.includes('Quota exceeded')) {
            return res.status(429).json({
              error: 'AI service quota temporarily exceeded. Please wait a moment before trying again, or check your API quota limits.',
            });
          }
          return res.status(500).json({
            error: `Failed to generate study materials: ${errorMsg}`,
          });
        }
      }

      if (!rawOutput) {
        return res.status(500).json({
          error: 'The AI model returned an empty response. Please try again.',
        });
      }

      // Clean response of potential markdown fences
      let cleaned = rawOutput.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      let parsedData;
      try {
        parsedData = JSON.parse(cleaned);
      } catch (parseErr) {
        console.error('JSON parsing failed. Raw response:', cleaned);
        return res.status(500).json({
          error: 'Failed to format the AI response properly. Please try again.',
          raw: cleaned,
        });
      }

      return res.json({
        success: true,
        model: usedModel,
        data: parsedData,
      });
    } catch (err: any) {
      console.error('Unexpected error in /api/generate:', err);
      return res.status(500).json({
        error: err.message || 'An unexpected internal server error occurred.',
      });
    }
  });

  // Setup Vite dev server or static file serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StudyFlow AI server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
