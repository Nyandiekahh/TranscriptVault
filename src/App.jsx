import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import TranscriptPanel from './components/features/TranscriptPanel';
import WebScrapePanel from './components/features/WebScrapePanel';
import YouTubePanel from './components/features/YouTubePanel';
import ResultsDisplay from './components/features/ResultsDisplay';
import { Toaster } from 'react-hot-toast';
import './styles/globals.css';
import './styles/animations.css';

function App() {
  const [activeTab, setActiveTab] = useState('transcript');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'transcript', label: 'Transcript', icon: '🎬' },
    { id: 'youtube', label: 'YouTube', icon: '📺' },
    { id: 'web', label: 'Web Scrape', icon: '🌐' }
  ];

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs}>
      <div className="app-container">
        <motion.div 
          className="content-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'transcript' && (
              <TranscriptPanel 
                key="transcript"
                setResults={setResults}
                setLoading={setLoading}
              />
            )}
            {activeTab === 'youtube' && (
              <YouTubePanel 
                key="youtube"
                setResults={setResults}
                setLoading={setLoading}
              />
            )}
            {activeTab === 'web' && (
              <WebScrapePanel 
                key="web"
                setResults={setResults}
                setLoading={setLoading}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {(results || loading) && (
          <ResultsDisplay results={results} loading={loading} />
        )}
      </div>
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'custom-toast',
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#e0f2fe',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }
        }}
      />
    </Layout>
  );
}

export default App;