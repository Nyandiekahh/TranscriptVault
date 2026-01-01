import { useState } from 'react';
import { 
  getTranscript, 
  getYouTubeVideo, 
  getYouTubeChannel, 
  getYouTubePlaylist,
  scrapeWeb,
  mapWebsite,
  crawlWebsite
} from '../services/supadataService';

export const useSupadata = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeOperation = async (operation) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    getTranscript: (params) => executeOperation(() => getTranscript(params)),
    getYouTubeVideo: (id) => executeOperation(() => getYouTubeVideo(id)),
    getYouTubeChannel: (id) => executeOperation(() => getYouTubeChannel(id)),
    getYouTubePlaylist: (id) => executeOperation(() => getYouTubePlaylist(id)),
    scrapeWeb: (url) => executeOperation(() => scrapeWeb(url)),
    mapWebsite: (url) => executeOperation(() => mapWebsite(url)),
    crawlWebsite: (params) => executeOperation(() => crawlWebsite(params)),
  };
};