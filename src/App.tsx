import React, { useState, useEffect } from 'react';
import { 
  EducationLevel, 
  OutputMode, 
  SavedItem, 
  StudyResult 
} from './types';
import { 
  getSavedHistory, 
  saveItemToHistory, 
  toggleFavoriteItem, 
  deleteSavedItem, 
  clearAllHistory, 
  getSavedTheme, 
  setSavedTheme 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudyInputArea } from './components/StudyInputArea';
import { ResultContainer } from './components/ResultContainer';
import { SavedLibraryModal } from './components/SavedLibraryModal';
import { NetlifyGuideModal } from './components/NetlifyGuideModal';
import { SEOContentSection } from './components/SEOContentSection';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => getSavedTheme() === 'dark');
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isNetlifyGuideOpen, setIsNetlifyGuideOpen] = useState(false);

  // Active generation state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<StudyResult | null>(null);
  const [currentMode, setCurrentMode] = useState<OutputMode>('summary');
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [currentEducationLevel, setCurrentEducationLevel] = useState<EducationLevel>('Undergraduate');
  const [currentSavedId, setCurrentSavedId] = useState<string | null>(null);
  const [usedModel, setUsedModel] = useState<string>('gemini-3.8-flash');

  // Load saved history on mount
  useEffect(() => {
    setSavedItems(getSavedHistory());
  }, []);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      setSavedTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setSavedTheme('light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const scrollToStudio = () => {
    const el = document.getElementById('study-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = async (payload: {
    mode: OutputMode;
    content: string;
    topic: string;
    educationLevel: EducationLevel;
    customOptions: {
      numQuestions: number;
      numFlashcards: number;
      planDays: number;
    };
  }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to generate study materials.');
      }

      const generatedData: StudyResult = resData.data;
      const modelName: string = resData.model || 'gemini-3.8-flash';

      setCurrentResult(generatedData);
      setCurrentMode(payload.mode);
      setCurrentTopic(payload.topic || generatedData.title || 'Study Material');
      setCurrentEducationLevel(payload.educationLevel);
      setUsedModel(modelName);

      // Save to localStorage history
      const saved = saveItemToHistory({
        mode: payload.mode,
        topic: payload.topic || generatedData.title || 'Study Material',
        educationLevel: payload.educationLevel,
        result: generatedData,
      });

      setCurrentSavedId(saved.id);
      setSavedItems(getSavedHistory());

      // Smooth scroll down to result container
      setTimeout(() => {
        const resultsEl = document.getElementById('study-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(
        err.message || 'An error occurred while contacting the AI service. Please check your connection or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!currentSavedId) return;
    const updated = toggleFavoriteItem(currentSavedId);
    setSavedItems(updated);
  };

  const handleSelectSavedItem = (item: SavedItem) => {
    setCurrentResult(item.result);
    setCurrentMode(item.mode);
    setCurrentTopic(item.topic);
    setCurrentEducationLevel(item.educationLevel);
    setCurrentSavedId(item.id);

    setTimeout(() => {
      const resultsEl = document.getElementById('study-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDeleteSavedItem = (id: string) => {
    const updated = deleteSavedItem(id);
    setSavedItems(updated);
    if (currentSavedId === id) {
      setCurrentSavedId(null);
    }
  };

  const handleClearAllHistory = () => {
    clearAllHistory();
    setSavedItems([]);
    setCurrentSavedId(null);
  };

  const isCurrentItemFavorite = Boolean(
    savedItems.find((item) => item.id === currentSavedId)?.isFavorite
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        onOpenNetlifyGuide={() => setIsNetlifyGuideOpen(true)}
        onScrollToStudio={scrollToStudio}
        savedCount={savedItems.length}
      />

      <main className="flex-1">
        {/* Landing Hero Section */}
        <HeroSection
          onStartStudying={scrollToStudio}
          onSelectSampleTopic={(sampleTopic, sampleMode) => {
            setCurrentTopic(sampleTopic);
            setCurrentMode(sampleMode as OutputMode);
            scrollToStudio();
          }}
        />

        {/* Main Study Input Area */}
        <StudyInputArea
          onGenerate={handleGenerate}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onClearError={() => setErrorMessage(null)}
          initialTopic={currentTopic}
          initialMode={currentMode}
        />

        {/* Results Area (visible once generated or selected) */}
        {currentResult && (
          <ResultContainer
            result={currentResult}
            mode={currentMode}
            topic={currentTopic}
            isFavorite={isCurrentItemFavorite}
            onToggleFavorite={handleToggleFavorite}
            onBackToInput={scrollToStudio}
            usedModel={usedModel}
          />
        )}

        {/* Educational Content & FAQ for SEO */}
        <SEOContentSection />
      </main>

      {/* Saved Library Modal */}
      <SavedLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        savedItems={savedItems}
        onSelectItem={handleSelectSavedItem}
        onToggleFavorite={(id) => setSavedItems(toggleFavoriteItem(id))}
        onDeleteItem={handleDeleteSavedItem}
        onClearAll={handleClearAllHistory}
      />

      {/* Netlify Deployment Instructions Modal */}
      <NetlifyGuideModal
        isOpen={isNetlifyGuideOpen}
        onClose={() => setIsNetlifyGuideOpen(false)}
      />
    </div>
  );
}
