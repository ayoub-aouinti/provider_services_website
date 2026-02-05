import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, RefreshCw, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import enTranslations from '../locales/en/translation.json';
import frTranslations from '../locales/fr/translation.json';
import deTranslations from '../locales/de/translation.json';
import arTranslations from '../locales/ar/translation.json';
import './ContentEditor.css';

interface TranslationData {
  [key: string]: any;
}

const ContentEditor = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'العربية' }
  ];

  useEffect(() => {
    loadTranslations();
  }, [selectedLanguage]);

  const loadTranslations = () => {
    // First try to load from localStorage (user's customizations)
    const saved = localStorage.getItem(`translations_${selectedLanguage}`);
    if (saved) {
      try {
        setTranslations(JSON.parse(saved));
        return;
      } catch (error) {
        console.error('Error parsing saved translations:', error);
      }
    }

    // Fallback to default translations
    const defaultTranslations: { [key: string]: any } = {
      en: enTranslations,
      fr: frTranslations,
      de: deTranslations,
      ar: arTranslations,
    };

    setTranslations(defaultTranslations[selectedLanguage as keyof typeof defaultTranslations] || enTranslations);
  };

  const updateTranslation = (path: string[], value: string) => {
    const newTranslations = { ...translations };
    let current: any = newTranslations;
    
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setTranslations(newTranslations);
  };

  const saveTranslations = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem(`translations_${selectedLanguage}`, JSON.stringify(translations));
    
    // Update i18n resources
    i18n.addResourceBundle(selectedLanguage, 'translation', translations, true, true);
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const renderEditor = (obj: any, path: string[] = []): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    
    Object.keys(obj).forEach((key) => {
      const currentPath = [...path, key];
      const value = obj[key];
      
      if (typeof value === 'object' && value !== null) {
        elements.push(
          <div key={currentPath.join('.')} className="editor-section">
            <h3 className="section-title">{key}</h3>
            {renderEditor(value, currentPath)}
          </div>
        );
      } else {
        elements.push(
          <div key={currentPath.join('.')} className="editor-field">
            <label htmlFor={currentPath.join('.')}>
              {currentPath.join(' → ')}
            </label>
            <textarea
              id={currentPath.join('.')}
              value={value || ''}
              onChange={(e) => updateTranslation(currentPath, e.target.value)}
              rows={value && value.length > 50 ? 3 : 1}
              className="translation-input"
            />
          </div>
        );
      }
    });
    
    return elements;
  };

  return (
    <div className="content-editor">
      <div className="editor-header">
        <div>
          <h1>Content Editor</h1>
          <p>Manage your website content and translations</p>
        </div>
        <div className="editor-actions">
          <div className="language-selector-wrapper">
            <div className="language-selector">
              <Globe size={18} className="language-icon" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-select"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <div className="language-select-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <motion.button
            className="save-button"
            onClick={saveTranslations}
            disabled={isSaving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw size={18} className="spinning" />
                Saving...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <Check size={18} />
                Saved!
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="editor-content">
        {Object.keys(translations).length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="editor-form"
          >
            {renderEditor(translations)}
          </motion.div>
        ) : (
          <div className="editor-empty">
            <p>Loading translations...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
