import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Languages, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { useSupadata } from '../../hooks/useSupadata';
import toast from 'react-hot-toast';
import './FeaturePanel.css';

const TranscriptPanel = ({ setResults, setLoading }) => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [textMode, setTextMode] = useState(true);
  const [mode, setMode] = useState('auto');
  
  const { getTranscript } = useSupadata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const result = await getTranscript({
        url: url.trim(),
        lang: language,
        text: textMode,
        mode: mode
      });
      
      setResults(result);
      toast.success('Transcript extracted successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to extract transcript');
      console.error('Transcript error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="feature-panel">
        <div className="panel-header">
          <div className="panel-icon">
            <Film size={24} />
          </div>
          <div>
            <h2 className="panel-title">Video Transcript Extractor</h2>
            <p className="panel-description">
              Extract transcripts from YouTube, TikTok, Instagram, X, or upload files
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="panel-form">
          <Input
            label="Video URL or File"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            icon={<Film size={18} />}
          />

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <Languages size={16} />
                Language
              </label>
              <select 
                className="form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Sparkles size={16} />
                Mode
              </label>
              <select 
                className="form-select"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="auto">Auto</option>
                <option value="native">Native Captions</option>
                <option value="generate">AI Generate</option>
              </select>
            </div>
          </div>

          <div className="form-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={textMode}
                onChange={(e) => setTextMode(e.target.checked)}
                className="toggle-input"
              />
              <span className="toggle-switch"></span>
              <span className="toggle-text">Plain text output</span>
            </label>
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Extract Transcript
          </Button>
        </form>

        <div className="panel-footer">
          <div className="supported-platforms">
            <span className="platforms-label">Supported:</span>
            <span className="platform-badge">YouTube</span>
            <span className="platform-badge">TikTok</span>
            <span className="platform-badge">Instagram</span>
            <span className="platform-badge">X</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TranscriptPanel;