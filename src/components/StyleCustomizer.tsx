import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Check, Palette, Eye } from 'lucide-react';
import './StyleCustomizer.css';

interface StyleSettings {
  accentPrimary: string;
  accentSecondary: string;
  accentGlow: string;
  textPrimary: string;
  textSecondary: string;
  bgDark: string;
  bgCard: string;
  borderCard: string;
}

const StyleCustomizer = () => {
  const [settings, setSettings] = useState<StyleSettings>({
    accentPrimary: '#818cf8',
    accentSecondary: '#3b82f6',
    accentGlow: 'rgba(129, 140, 248, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: '#a0aec0',
    bgDark: '#0a0c10',
    bgCard: 'rgba(255, 255, 255, 0.03)',
    borderCard: 'rgba(255, 255, 255, 0.1)',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    applyStyles();
  }, [settings]);

  const loadSettings = () => {
    const saved = localStorage.getItem('styleSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      } catch (error) {
        console.error('Error loading style settings:', error);
      }
    }
  };

  const applyStyles = () => {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', settings.accentPrimary);
    root.style.setProperty('--accent-secondary', settings.accentSecondary);
    root.style.setProperty('--accent-glow', settings.accentGlow);
    root.style.setProperty('--text-primary', settings.textPrimary);
    root.style.setProperty('--text-secondary', settings.textSecondary);
    root.style.setProperty('--bg-dark', settings.bgDark);
    root.style.setProperty('--bg-card', settings.bgCard);
    root.style.setProperty('--border-card', settings.borderCard);
  };

  const updateSetting = (key: keyof StyleSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    localStorage.setItem('styleSettings', JSON.stringify(settings));
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const resetSettings = () => {
    const defaultSettings: StyleSettings = {
      accentPrimary: '#818cf8',
      accentSecondary: '#3b82f6',
      accentGlow: 'rgba(129, 140, 248, 0.3)',
      textPrimary: '#ffffff',
      textSecondary: '#a0aec0',
      bgDark: '#0a0c10',
      bgCard: 'rgba(255, 255, 255, 0.03)',
      borderCard: 'rgba(255, 255, 255, 0.1)',
    };
    setSettings(defaultSettings);
    localStorage.removeItem('styleSettings');
    applyStyles();
  };

  const colorFields = [
    { key: 'accentPrimary' as keyof StyleSettings, label: 'Primary Accent', description: 'Main brand color' },
    { key: 'accentSecondary' as keyof StyleSettings, label: 'Secondary Accent', description: 'Secondary brand color' },
    { key: 'accentGlow' as keyof StyleSettings, label: 'Accent Glow', description: 'Glow effect color' },
    { key: 'textPrimary' as keyof StyleSettings, label: 'Primary Text', description: 'Main text color' },
    { key: 'textSecondary' as keyof StyleSettings, label: 'Secondary Text', description: 'Secondary text color' },
    { key: 'bgDark' as keyof StyleSettings, label: 'Background Dark', description: 'Main background color' },
    { key: 'bgCard' as keyof StyleSettings, label: 'Card Background', description: 'Card/glass background' },
    { key: 'borderCard' as keyof StyleSettings, label: 'Border Color', description: 'Border and divider color' },
  ];

  return (
    <div className="style-customizer">
      <div className="customizer-header">
        <div>
          <h1>Style Customizer</h1>
          <p>Customize your website's colors and theme</p>
        </div>
        <div className="customizer-actions">
          <motion.button
            className="preview-button"
            onClick={() => setPreviewMode(!previewMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye size={18} />
            {previewMode ? 'Exit Preview' : 'Preview'}
          </motion.button>
          <motion.button
            className="reset-button"
            onClick={resetSettings}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw size={18} />
            Reset
          </motion.button>
          <motion.button
            className="save-button"
            onClick={saveSettings}
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

      {previewMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="preview-banner"
        >
          <Palette size={18} />
          <span>Preview Mode: Changes are applied in real-time. Save to make them permanent.</span>
        </motion.div>
      )}

      <div className="customizer-content">
        <div className="color-grid">
          {colorFields.map((field) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="color-field"
            >
              <div className="color-field-header">
                <label htmlFor={field.key}>{field.label}</label>
                <span className="color-description">{field.description}</span>
              </div>
              <div className="color-input-wrapper">
                <input
                  id={field.key}
                  type="color"
                  value={settings[field.key]}
                  onChange={(e) => updateSetting(field.key, e.target.value)}
                  className="color-picker"
                />
                <input
                  type="text"
                  value={settings[field.key]}
                  onChange={(e) => updateSetting(field.key, e.target.value)}
                  className="color-text"
                  placeholder="#000000"
                />
              </div>
              <div
                className="color-preview"
                style={{ backgroundColor: settings[field.key] }}
              />
            </motion.div>
          ))}
        </div>

        <div className="preview-section">
          <h3>Live Preview</h3>
          <div className="preview-cards">
            <div className="preview-card glass">
              <div className="preview-gradient" style={{
                background: `linear-gradient(135deg, ${settings.accentPrimary}, ${settings.accentSecondary})`
              }} />
              <h4 style={{ color: settings.textPrimary }}>Sample Heading</h4>
              <p style={{ color: settings.textSecondary }}>This is a preview of how your colors will look.</p>
              <button className="preview-btn" style={{
                background: `linear-gradient(135deg, ${settings.accentPrimary}, ${settings.accentSecondary})`
              }}>
                Button Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleCustomizer;
