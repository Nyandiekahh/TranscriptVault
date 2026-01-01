import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, List, Users } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { useSupadata } from '../../hooks/useSupadata';
import toast from 'react-hot-toast';
import './FeaturePanel.css';

const YouTubePanel = ({ setResults, setLoading }) => {
  const [operationType, setOperationType] = useState('video');
  const [input, setInput] = useState('');
  const [limit, setLimit] = useState(10);
  
  const { getYouTubeVideo, getYouTubeChannel, getYouTubePlaylist } = useSupadata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.error('Please enter a valid YouTube URL or ID');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      let result;
      
      switch (operationType) {
        case 'video':
          result = await getYouTubeVideo(input.trim());
          toast.success('Video metadata retrieved!');
          break;
        case 'channel':
          result = await getYouTubeChannel(input.trim());
          toast.success('Channel metadata retrieved!');
          break;
        case 'playlist':
          result = await getYouTubePlaylist(input.trim());
          toast.success('Playlist metadata retrieved!');
          break;
        default:
          throw new Error('Invalid operation type');
      }
      
      setResults(result);
    } catch (error) {
      toast.error(error.message || 'Failed to retrieve data');
      console.error('YouTube error:', error);
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
          <div className="panel-icon youtube-icon">
            <Youtube size={24} />
          </div>
          <div>
            <h2 className="panel-title">YouTube Metadata Extractor</h2>
            <p className="panel-description">
              Get detailed metadata from videos, channels, and playlists
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="panel-form">
          <div className="operation-tabs">
            <button
              type="button"
              className={`tab-button ${operationType === 'video' ? 'active' : ''}`}
              onClick={() => setOperationType('video')}
            >
              <Youtube size={16} />
              Video
            </button>
            <button
              type="button"
              className={`tab-button ${operationType === 'channel' ? 'active' : ''}`}
              onClick={() => setOperationType('channel')}
            >
              <Users size={16} />
              Channel
            </button>
            <button
              type="button"
              className={`tab-button ${operationType === 'playlist' ? 'active' : ''}`}
              onClick={() => setOperationType('playlist')}
            >
              <List size={16} />
              Playlist
            </button>
          </div>

          <Input
            label={`YouTube ${operationType.charAt(0).toUpperCase() + operationType.slice(1)} URL or ID`}
            placeholder={
              operationType === 'video' 
                ? 'https://youtube.com/watch?v=...'
                : operationType === 'channel'
                ? 'https://youtube.com/@channelname'
                : 'https://youtube.com/playlist?list=...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            icon={<Youtube size={18} />}
          />

          {(operationType === 'channel' || operationType === 'playlist') && (
            <div className="form-group">
              <label className="form-label">
                <List size={16} />
                Video Limit
              </label>
              <input
                type="number"
                className="form-input"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                min="1"
                max="50"
              />
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth>
            Get {operationType.charAt(0).toUpperCase() + operationType.slice(1)} Data
          </Button>
        </form>

        <div className="panel-footer">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Video</span>
              <span className="info-value">Full metadata</span>
            </div>
            <div className="info-item">
              <span className="info-label">Channel</span>
              <span className="info-value">Stats & videos</span>
            </div>
            <div className="info-item">
              <span className="info-label">Playlist</span>
              <span className="info-value">All videos</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default YouTubePanel;