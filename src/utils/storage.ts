import { SavedItem } from '../types';

const STORAGE_KEY = 'studyflow_history_v1';
const THEME_KEY = 'studyflow_theme';

export function getSavedHistory(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved history from localStorage', e);
    return [];
  }
}

export function saveItemToHistory(item: Omit<SavedItem, 'id' | 'timestamp'>): SavedItem {
  const history = getSavedHistory();
  const newItem: SavedItem = {
    ...item,
    id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: Date.now(),
    isFavorite: false,
  };
  const updated = [newItem, ...history.slice(0, 49)]; // keep up to 50 recent items
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  return newItem;
}

export function toggleFavoriteItem(id: string): SavedItem[] {
  const history = getSavedHistory();
  const updated = history.map((item) =>
    item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update favorite in localStorage', e);
  }
  return updated;
}

export function deleteSavedItem(id: string): SavedItem[] {
  const history = getSavedHistory();
  const updated = history.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete item from localStorage', e);
  }
  return updated;
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history from localStorage', e);
  }
}

export function getSavedTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // fallback
  }
  return 'light';
}

export function setSavedTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme', e);
  }
}
