import { Supadata } from '@supadata/js';

// Initialize Supadata client
// Note: In production, use environment variables
const API_KEY = import.meta.env.VITE_SUPADATA_API_KEY || 'YOUR_API_KEY_HERE';

const supadata = new Supadata({
  apiKey: API_KEY,
});

/**
 * Get transcript from any supported platform or file
 */
export const getTranscript = async ({ url, lang = 'en', text = true, mode = 'auto' }) => {
  try {
    const result = await supadata.transcript({
      url,
      lang,
      text,
      mode,
    });

    // Handle job-based response for large files
    if ('jobId' in result) {
      return result; // Return job ID for polling
    }

    return result;
  } catch (error) {
    console.error('Transcript error:', error);
    throw new Error(error.message || 'Failed to get transcript');
  }
};

/**
 * Get YouTube video metadata
 */
export const getYouTubeVideo = async (id) => {
  try {
    const video = await supadata.youtube.video({ id });
    return video;
  } catch (error) {
    console.error('YouTube video error:', error);
    throw new Error(error.message || 'Failed to get video data');
  }
};

/**
 * Get YouTube channel metadata
 */
export const getYouTubeChannel = async (id) => {
  try {
    const channel = await supadata.youtube.channel({ id });
    return channel;
  } catch (error) {
    console.error('YouTube channel error:', error);
    throw new Error(error.message || 'Failed to get channel data');
  }
};

/**
 * Get YouTube playlist metadata
 */
export const getYouTubePlaylist = async (id) => {
  try {
    const playlist = await supadata.youtube.playlist({ id });
    return playlist;
  } catch (error) {
    console.error('YouTube playlist error:', error);
    throw new Error(error.message || 'Failed to get playlist data');
  }
};

/**
 * Get YouTube channel videos
 */
export const getChannelVideos = async (id, type = 'all', limit = 10) => {
  try {
    const videos = await supadata.youtube.channel.videos({
      id,
      type,
      limit,
    });
    return videos;
  } catch (error) {
    console.error('Channel videos error:', error);
    throw new Error(error.message || 'Failed to get channel videos');
  }
};

/**
 * Scrape a single web page
 */
export const scrapeWeb = async (url) => {
  try {
    const content = await supadata.web.scrape(url);
    return content;
  } catch (error) {
    console.error('Web scrape error:', error);
    throw new Error(error.message || 'Failed to scrape webpage');
  }
};

/**
 * Map all URLs on a website
 */
export const mapWebsite = async (url) => {
  try {
    const siteMap = await supadata.web.map(url);
    return siteMap;
  } catch (error) {
    console.error('Website map error:', error);
    throw new Error(error.message || 'Failed to map website');
  }
};

/**
 * Crawl entire website
 */
export const crawlWebsite = async ({ url, limit = 10 }) => {
  try {
    const crawlJob = await supadata.web.crawl({
      url,
      limit,
    });
    return crawlJob;
  } catch (error) {
    console.error('Website crawl error:', error);
    throw new Error(error.message || 'Failed to start crawl');
  }
};

/**
 * Get crawl job results
 */
export const getCrawlResults = async (jobId) => {
  try {
    const results = await supadata.web.getCrawlResults(jobId);
    return results;
  } catch (error) {
    console.error('Crawl results error:', error);
    throw new Error(error.message || 'Failed to get crawl results');
  }
};

/**
 * Get job status for async operations
 */
export const getJobStatus = async (jobId) => {
  try {
    const status = await supadata.transcript.getJobStatus(jobId);
    return status;
  } catch (error) {
    console.error('Job status error:', error);
    throw new Error(error.message || 'Failed to get job status');
  }
};

export default supadata;