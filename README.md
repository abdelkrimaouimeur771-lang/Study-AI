# StudyFlow AI — AI Study Assistant

> "Study Smarter, Not Harder" — Turn study material into summaries, questions, flashcards, key points, and study plans using Google Gemini AI.

## 🌟 Key Features

1. **AI Study Summarizer**: High-yield summaries, key takeaways, and essential vocabulary definitions.
2. **Interactive Multiple-Choice Quizzes**: Exam-style practice questions with automated scoring, color feedback, and detailed explanations.
3. **Active Recall 3D Flashcards**: Flip cards with front questions and back answers, deck navigation, and "Mastered" progress tracker.
4. **Key Points Breakdown**: Structured formulas, academic principles, and common student pitfalls.
5. **Spaced Repetition Study Plans**: Daily task checklists with time commitments and review checkpoints.
6. **Local Persistence**: Save favorites and view generation history locally in your browser.
7. **Export & Sharing**: One-click copy formatted Markdown or download `.md` files.
8. **Dark Mode & Accessibility**: Responsive, mobile-first design with light/dark themes.
9. **SEO Ready**: Schema.org JSON-LD structured data, Open Graph tags, Twitter card metadata, and semantic HTML for Google Search indexing.

---

## 🚀 How to Export and Deploy to Netlify

StudyFlow AI is pre-configured with a dedicated `netlify.toml` and Netlify Serverless Functions in `netlify/functions/generate.ts`.

### Step 1: Export or Push Files
- Download this project's files or initialize a Git repository:
```bash
git init
git add .
git commit -m "Deploy StudyFlow AI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/studyflow-ai.git
git push -u origin main
```

### Step 2: Import Project into Netlify
1. Log in to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Select your GitHub / GitLab repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

### Step 3: Add Environment Variable in Netlify
1. In the Netlify dashboard for your site, go to:
   **Site configuration** > **Environment variables**
2. Click **"Add a variable"**:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API Key from Google AI Studio.
3. Click **"Deploy site"**.

Your StudyFlow AI website is now live!

---

## 💻 Local Development

Run the full-stack Express + Vite server locally:

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```
