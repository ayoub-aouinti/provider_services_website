import { useEffect } from 'react';

export const useStyleSettings = () => {
  useEffect(() => {
    const saved = localStorage.getItem('styleSettings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        const root = document.documentElement;
        
        root.style.setProperty('--accent-primary', settings.accentPrimary);
        root.style.setProperty('--accent-secondary', settings.accentSecondary);
        root.style.setProperty('--accent-glow', settings.accentGlow);
        root.style.setProperty('--text-primary', settings.textPrimary);
        root.style.setProperty('--text-secondary', settings.textSecondary);
        root.style.setProperty('--bg-dark', settings.bgDark);
        root.style.setProperty('--bg-card', settings.bgCard);
        root.style.setProperty('--border-card', settings.borderCard);
      } catch (error) {
        console.error('Error loading style settings:', error);
      }
    }
  }, []);
};
