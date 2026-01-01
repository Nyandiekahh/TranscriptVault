# 🎬 TranscriptVault

**Extract. Transform. Archive.**

A beautiful, modern web application for extracting video transcripts and web content using the Supadata API. Built with React, Framer Motion, and styled with a sophisticated dark glassmorphism theme.

![TranscriptVault](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 📹 Video Transcription
- Extract transcripts from YouTube, TikTok, Instagram, and X (Twitter)
- Support for file uploads
- Multiple language support
- Choose between native captions or AI-generated transcripts
- Plain text or timestamped output

### 🎥 YouTube Operations
- Get detailed video metadata
- Fetch channel statistics and information
- Extract playlist data
- Batch processing for multiple videos

### 🌐 Web Scraping
- Convert web pages to clean markdown
- Generate complete site maps
- Crawl entire websites with configurable depth
- Extract structured content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Supadata API key ([Get one here](https://dash.supadata.ai))

### Installation

1. **Clone or download this project**

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supadata API key:
```env
VITE_SUPADATA_API_KEY=your_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🎨 UI Features

- **Glassmorphism Design**: Modern frosted glass effect with backdrop blur
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Dark Theme**: Eye-friendly dark mode with electric blue accents
- **Responsive Layout**: Works beautifully on desktop, tablet, and mobile
- **Interactive Components**: Hover effects, loading states, and micro-interactions

## 📁 Project Structure

```
transcriptvault/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Header, Sidebar, etc.)
│   │   ├── features/        # Feature panels and displays
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API service layer
│   ├── utils/               # Utility functions
│   ├── styles/              # Global styles and animations
│   ├── types/               # Type definitions
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Tech Stack

- **React 18.3** - UI library
- **Vite 5.1** - Build tool and dev server
- **Framer Motion 11** - Animation library
- **Supadata JS SDK** - API integration
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## 🎯 Usage Examples

### Transcript Extraction
1. Navigate to the "Transcript" tab
2. Enter a video URL or upload a file
3. Select your preferred language
4. Choose between auto, native, or AI-generated mode
5. Click "Extract Transcript"

### YouTube Metadata
1. Go to the "YouTube" tab
2. Select Video, Channel, or Playlist
3. Enter the URL or ID
4. Click "Get Data"

### Web Scraping
1. Select the "Web Scrape" tab
2. Choose Scrape, Map, or Crawl
3. Enter the website URL
4. For crawling, set the page limit
5. Click the action button

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 Customization

### Theme Colors
Edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --bg-primary: #0a0f1e;
  --accent-primary: #38bdf8;
  --accent-secondary: #0ea5e9;
  /* ... more variables */
}
```

### Fonts
The app uses:
- **Space Grotesk** for UI text
- **JetBrains Mono** for code/monospace

Change them in `src/styles/globals.css`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Powered by [Supadata](https://supadata.ai)
- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

If you encounter any issues or have questions:
- Check the [Supadata Documentation](https://docs.supadata.ai)
- Open an issue in this repository
- Contact Supadata support

---

**Made with ❤️ for the developer community**