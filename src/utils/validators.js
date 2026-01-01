/**
 * Validate if a string is a valid URL
 */
export const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validate YouTube URL or ID
 */
export const isValidYouTubeUrl = (string) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  
  return youtubeRegex.test(string) || videoIdRegex.test(string);
};

/**
 * Extract YouTube video ID from URL
 */
export const extractYouTubeId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : url;
};

/**
 * Validate if string is a valid YouTube playlist URL or ID
 */
export const isValidPlaylistUrl = (string) => {
  const playlistRegex = /[?&]list=([a-zA-Z0-9_-]+)/;
  const playlistIdRegex = /^[a-zA-Z0-9_-]+$/;
  
  return playlistRegex.test(string) || playlistIdRegex.test(string);
};

/**
 * Validate if string is a valid YouTube channel URL or ID
 */
export const isValidChannelUrl = (string) => {
  const channelRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|@|c\/|user\/)[a-zA-Z0-9_-]+/;
  const channelIdRegex = /^UC[a-zA-Z0-9_-]{22}$/;
  const handleRegex = /^@[a-zA-Z0-9_-]+$/;
  
  return channelRegex.test(string) || channelIdRegex.test(string) || handleRegex.test(string);
};

/**
 * Sanitize URL by trimming and removing extra spaces
 */
export const sanitizeUrl = (url) => {
  return url.trim().replace(/\s+/g, '');
};

/**
 * Check if a value is empty
 */
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

/**
 * Validate language code (ISO 639-1)
 */
export const isValidLanguageCode = (code) => {
  const validCodes = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ru', 'ar'];
  return validCodes.includes(code);
};

/**
 * Validate number range
 */
export const isInRange = (value, min, max) => {
  const num = parseInt(value);
  return !isNaN(num) && num >= min && num <= max;
};