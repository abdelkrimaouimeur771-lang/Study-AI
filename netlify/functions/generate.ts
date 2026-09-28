import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: defaultHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: defaultHeaders,
      body: JSON.stringify({
        error: 'GEMINI_API_KEY environment variable is not configured in Netlify Site Settings.',
      }),
    };
  }

  try {
    const { mode, content, topic, educationLevel, customOptions } = JSON.parse(event.body || '{}');

    if (!content && !topic) {
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Please provide either study notes or a topic.' }),
      };
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' },
      },
    });

    const level = educationLevel || 'Undergraduate';
    const userSubject = topic?.trim() || 'Provided Study Material';
    const userMaterial = content?.trim() || '';

    let systemPrompt = '';
    let formatSchemaDescription = '';

    if (mode === 'summary') {
      systemPrompt = `You are StudyFlow AI, an elite educational summarizer. Your goal is to synthesize the study material into a crystal-clear, structured summary suited for an ${level} student.`;
      formatSchemaDescription = `Return ONLY a valid JSON object matching:
{
  "type": "summary",
  "title": "Clear descriptive title",
  "shortSummary": "2-3 paragraphs high-yield overview",
  "keyPoints": ["Key takeaway point 1", "Key takeaway point 2", "Key takeaway point 3", "Key takeaway point 4", "Key takeaway point 5"],
  "vocabulary": [{"term": "Term", "definition": "Clear concise definition"}],
  "quickReviewTips": ["Tip 1", "Tip 2"]
}`;
    } else if (mode === 'key_points') {
      systemPrompt = `You are StudyFlow AI, an expert academic analyst. Break down the subject into structured key points and principles for an ${level} student.`;
      formatSchemaDescription = `Return ONLY a valid JSON object matching:
{
  "type": "key_points",
  "title": "Key Points: Subject",
  "overview": "Brief orientation to subject",
  "categories": [{"categoryName": "Core Principles", "points": ["Point 1", "Point 2"]}],
  "formulasOrPrinciples": [{"name": "Law/Principle", "rule": "Rule statement", "example": "Concrete example"}],
  "commonPitfalls": ["Common student mistake to avoid"]
}`;
    } else if (mode === 'quiz') {
      const count = customOptions?.numQuestions || 5;
      systemPrompt = `You are StudyFlow AI, an expert exam designer. Create an interactive ${count}-question multiple choice quiz for an ${level} level.`;
      formatSchemaDescription = `Return ONLY a valid JSON object matching:
{
  "type": "quiz",
  "title": "Comprehensive Quiz",
  "difficulty": "${level}",
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": ["A) Choice 1", "B) Choice 2", "C) Choice 3", "D) Choice 4"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation of correct answer and why others are wrong."
    }
  ]
}`;
    } else if (mode === 'flashcards') {
      const count = customOptions?.numFlashcards || 8;
      systemPrompt = `You are StudyFlow AI, an active-recall cognitive learning expert. Create ${count} high-yield flashcards for an ${level} student.`;
      formatSchemaDescription = `Return ONLY a valid JSON object matching:
{
  "type": "flashcards",
  "title": "Flashcard Deck",
  "cards": [
    {
      "id": 1,
      "front": "Prompt or Question?",
      "back": "Answer and core takeaway",
      "category": "Subtopic",
      "hint": "Optional mnemonic"
    }
  ]
}`;
    } else if (mode === 'study_plan') {
      const days = customOptions?.planDays || 5;
      systemPrompt = `You are StudyFlow AI, a master academic coach. Design a ${days}-day study plan for an ${level} student.`;
      formatSchemaDescription = `Return ONLY a valid JSON object matching:
{
  "type": "study_plan",
  "title": "${days}-Day Study Plan",
  "totalDurationDays": ${days},
  "dailyCommitment": "45 - 60 minutes",
  "schedule": [
    {
      "day": 1,
      "focusArea": "Core Concepts",
      "suggestedTime": "45 minutes",
      "tasks": ["Task 1", "Task 2"],
      "reviewCheckpoint": "Checkpoint test"
    }
  ],
  "retentionTips": ["Tip 1", "Tip 2"]
}`;
    } else {
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Unsupported study mode.' }),
      };
    }

    const userPrompt = `
SUBJECT: ${userSubject}
LEVEL: ${level}
MATERIAL: ${userMaterial || 'Derive from subject knowledge.'}
FORMAT:
${formatSchemaDescription}
Respond ONLY in valid JSON.`;

    let rawOutput = '';
    let usedModel = 'gemini-3.8-flash';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });
      rawOutput = response.text || '';
    } catch {
      usedModel = 'gemini-3.1-flash-lite';
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });
      rawOutput = response.text || '';
    }

    let cleaned = rawOutput.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');

    const parsed = JSON.parse(cleaned);

    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify({
        success: true,
        model: usedModel,
        data: parsed,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: defaultHeaders,
      body: JSON.stringify({ error: err.message || 'Generation failed' }),
    };
  }
};

export { handler };
