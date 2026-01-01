import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Map, Layers } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { useSupadata } from '../../hooks/useSupadata';
import toast from 'react-hot-toast';
import './FeaturePanel.css';

const WebScrapePanel = ({ setResults, setLoading }) => {
  const [operationType, setOperationType] = useState('scrape');
  const [url, setUrl] = useState('');
  const [crawlLimit, setCrawlLimit] = useState(10);
  
  const { scrapeWeb, mapWebsite, crawlWebsite } = useSupadata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url.trim());
    } catch {
      toast.error('Please enter a valid URL with http:// or https://');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      let result;
      
      switch (operationType) {
        case 'scrape':
          result = await scrapeWeb(url.trim());
          toast.success('Page scraped successfully!');
          break;
        case 'map':
          result = await mapWebsite(url.trim());
          toast.success('Site map generated!');
          break;
        case 'crawl':
          result = await crawlWebsite({ url: url.trim(), limit: crawlLimit });
          toast.success('Crawl job started!');
          break;
        default:
          throw new Error('Invalid operation type');
      }
      
      setResults(result);
    } catch (error) {
      toast.error(error.message || 'Failed to process request');
      console.error('Web scrape error:', error);
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
          <div className="panel-icon web-icon">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="panel-title">Web Content Extractor</h2>
            <p className="panel-description">
              Scrape pages, map sites, or crawl entire websites
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="panel-form">
          <div className="operation-tabs">
            <button
              type="button"
              className={`tab-button ${operationType === 'scrape' ? 'active' : ''}`}
              onClick={() => setOperationType('scrape')}
            >
              <Globe size={16} />
              Scrape
            </button>
            <button
              type="button"
              className={`tab-button ${operationType === 'map' ? 'active' : ''}`}
              onClick={() => setOperationType('map')}
            >
              <Map size={16} />
              Map
            </button>
            <button
              type="button"
              className={`tab-button ${operationType === 'crawl' ? 'active' : ''}`}
              onClick={() => setOperationType('crawl')}
            >
              <Layers size={16} />
              Crawl
            </button>
          </div>

          <Input
            label="Website URL"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            icon={<Globe size={18} />}
          />

          {operationType === 'crawl' && (
            <div className="form-group">
              <label className="form-label">
                <Layers size={16} />
                Page Limit
              </label>
              <input
                type="number"
                className="form-input"
                value={crawlLimit}
                onChange={(e) => setCrawlLimit(parseInt(e.target.value))}
                min="1"
                max="100"
              />
              <p className="form-hint">Maximum number of pages to crawl</p>
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth>
            {operationType === 'scrape' && 'Scrape Page'}
            {operationType === 'map' && 'Generate Map'}
            {operationType === 'crawl' && 'Start Crawl'}
          </Button>
        </form>

        <div className="panel-footer">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Scrape</span>
              <span className="info-value">Single page to markdown</span>
            </div>
            <div className="info-item">
              <span className="info-label">Map</span>
              <span className="info-value">All site URLs</span>
            </div>
            <div className="info-item">
              <span className="info-label">Crawl</span>
              <span className="info-value">Full site content</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WebScrapePanel;