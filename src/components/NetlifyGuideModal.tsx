import React, { useState } from 'react';
import { 
  X, 
  Rocket, 
  Check, 
  Copy, 
  FileCode, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  Sparkles,
  Download
} from 'lucide-react';
import { copyToClipboard, downloadTextFile } from '../utils/export';

interface NetlifyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifyGuideModal: React.FC<NetlifyGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedToml, setCopiedToml] = useState(false);

  if (!isOpen) return null;

  const tomlContent = `[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

# Proxy /api requests to Netlify serverless functions
[[redirects]]
  from = "/api/generate"
  to = "/.netlify/functions/generate"
  status = 200

[[redirects]]
  from = "/api/health"
  to = "/.netlify/functions/health"
  status = 200

# SPA catch-all for client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

  const handleCopyToml = async () => {
    const success = await copyToClipboard(tomlContent);
    if (success) {
      setCopiedToml(true);
      setTimeout(() => setCopiedToml(false), 2000);
    }
  };

  const handleDownloadGuide = () => {
    const guideContent = `# StudyFlow AI — Netlify Deployment Guide

This project is 100% pre-configured for Netlify deployment with Vite and Netlify Functions.

## 🚀 Quick 3-Step Netlify Deployment

### Step 1: Push your Code to GitHub / GitLab
1. Initialize a git repository:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit for StudyFlow AI"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/studyflow-ai.git
   git push -u origin main
   \`\`\`

### Step 2: Import into Netlify
1. Log into your [Netlify Dashboard](https://app.netlify.com).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Select your GitHub / GitLab repository.
4. Netlify will auto-detect the settings from \`netlify.toml\`:
   - **Build command:** \`npm run build\`
   - **Publish directory:** \`dist\`
   - **Functions directory:** \`netlify/functions\`

### Step 3: Add Environment Variable
1. In Netlify Site Settings, go to **Site configuration** > **Environment variables**.
2. Click **"Add a variable"**.
3. Key: \`GEMINI_API_KEY\`
4. Value: Your Google Gemini API Key from Google AI Studio.
5. Click **"Deploy site"**.

Your StudyFlow AI website is now live, blazing fast, and indexed for search engines!
`;
    downloadTextFile('StudyFlow-Netlify-Deployment-Guide.md', guideContent);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Deploy StudyFlow AI to Netlify
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pre-configured with Netlify Functions & optimized Vite build
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {/* Feature Badge */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3 text-emerald-900 dark:text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold block mb-0.5">Netlify Serverless Ready</span>
              <span>All files, including <code>netlify.toml</code> and serverless endpoint <code>netlify/functions/generate.ts</code>, are already integrated into this repository.</span>
            </div>
          </div>

          {/* 3 Step Deployment */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Simple 3-Step Deployment Workflow:
            </h3>

            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <span>Export & Push to GitHub</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-8">
                Download the workspace files or initialize a Git repository and push to GitHub or GitLab.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <span>Connect to Netlify</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-8">
                In Netlify Dashboard, select <strong>"Add new site" &gt; "Import from Git"</strong>. Netlify will automatically read <code>netlify.toml</code> and set Build command: <code>npm run build</code> and Publish directory: <code>dist</code>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <span>Set Environment Variable in Netlify</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-8">
                Under <strong>Site configuration &gt; Environment variables</strong>, add:
                <br />
                <code className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs">
                  GEMINI_API_KEY = your_gemini_api_key
                </code>
              </p>
            </div>
          </div>

          {/* netlify.toml snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Included netlify.toml configuration
              </span>
              <button
                type="button"
                onClick={handleCopyToml}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {copiedToml ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
              {tomlContent}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDownloadGuide}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Deployment Guide (.md)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all cursor-pointer"
          >
            Got it, ready to deploy!
          </button>
        </div>
      </div>
    </div>
  );
};
