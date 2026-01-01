/**
 * @typedef {Object} TranscriptParams
 * @property {string} url - Video URL or file path
 * @property {string} [lang] - Language code (default: 'en')
 * @property {boolean} [text] - Return plain text instead of timestamped chunks
 * @property {'auto'|'native'|'generate'} [mode] - Transcript extraction mode
 */

/**
 * @typedef {Object} Transcript
 * @property {string} text - Transcript text
 * @property {Array} [chunks] - Timestamped transcript chunks
 * @property {Object} [metadata] - Video metadata
 */

/**
 * @typedef {Object} JobResult
 * @property {string} jobId - Unique job identifier
 * @property {'queued'|'active'|'completed'|'failed'} status - Job status
 * @property {*} [content] - Job result content (if completed)
 * @property {string} [error] - Error message (if failed)
 */

/**
 * @typedef {Object} YouTubeVideo
 * @property {string} id - Video ID
 * @property {string} title - Video title
 * @property {string} description - Video description
 * @property {string} channelId - Channel ID
 * @property {string} channelTitle - Channel name
 * @property {number} duration - Duration in seconds
 * @property {number} viewCount - View count
 * @property {number} likeCount - Like count
 * @property {string} publishedAt - Publication date
 * @property {Object} thumbnails - Thumbnail URLs
 */

/**
 * @typedef {Object} YouTubeChannel
 * @property {string} id - Channel ID
 * @property {string} title - Channel name
 * @property {string} description - Channel description
 * @property {string} customUrl - Custom channel URL
 * @property {number} subscriberCount - Subscriber count
 * @property {number} videoCount - Total video count
 * @property {number} viewCount - Total view count
 * @property {Object} thumbnails - Channel thumbnails
 */

/**
 * @typedef {Object} YouTubePlaylist
 * @property {string} id - Playlist ID
 * @property {string} title - Playlist title
 * @property {string} description - Playlist description
 * @property {string} channelId - Channel ID
 * @property {string} channelTitle - Channel name
 * @property {number} itemCount - Number of videos
 * @property {Object} thumbnails - Playlist thumbnails
 */

/**
 * @typedef {Object} ScrapeResult
 * @property {string} markdown - Page content in markdown
 * @property {string} title - Page title
 * @property {string} url - Original URL
 * @property {Object} [metadata] - Page metadata
 */

/**
 * @typedef {Object} SiteMap
 * @property {Array<string>} urls - List of URLs found on site
 * @property {string} baseUrl - Base URL of the site
 * @property {number} totalUrls - Total number of URLs
 */

/**
 * @typedef {Object} CrawlParams
 * @property {string} url - Website URL to crawl
 * @property {number} [limit] - Maximum number of pages to crawl
 */

/**
 * @typedef {Object} CrawlJob
 * @property {string} jobId - Crawl job ID
 * @property {'queued'|'active'|'completed'|'failed'} status - Job status
 * @property {Array<ScrapeResult>} [results] - Crawled pages (if completed)
 * @property {Object} [stats] - Crawl statistics
 * @property {string} [error] - Error message (if failed)
 */

export {};